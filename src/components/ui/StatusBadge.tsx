"use client";
import { ReactNode } from "react";

const statusStyles = {
  published: "bg-green-500 text-white border-green-500",
  draft: "bg-yellow-400 text-black border-yellow-400",
  prototype: "bg-echo-surface-soft text-echo-text border-echo-border",
};

export function StatusBadge({ children, status = "published", className = "", ...props }: {
  children: ReactNode;
  status?: "published" | "draft" | "prototype";
  className?: string;
}) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-echo-pill border text-[10px] font-bold uppercase tracking-wide ${statusStyles[status]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
