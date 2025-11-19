"use client";
import { ReactNode, useState } from "react";

export function Tooltip({ children, content, className = "", ...props }: {
  children: ReactNode;
  content: ReactNode;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  let timeout: NodeJS.Timeout;
  function handleMouseEnter() {
    timeout = setTimeout(() => setVisible(true), 250);
  }
  function handleMouseLeave() {
    clearTimeout(timeout);
    setVisible(false);
  }
  return (
    <span className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {visible && (
        <span className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1 rounded-echo-lg bg-echo-surface text-xs text-echo-text shadow-echo-soft z-50 ${className}`} {...props}>
          {content}
        </span>
      )}
    </span>
  );
}
