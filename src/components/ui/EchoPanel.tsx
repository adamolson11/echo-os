"use client";
import { ReactNode } from "react";

export function EchoPanel({ children, header, actions, footer, padding = "p-5", className = "", ...props }: {
  children: ReactNode;
  header?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  padding?: "p-4" | "p-5" | "p-8";
  className?: string;
}) {
  return (
    <div className={`bg-echo-surface rounded-echo-lg border border-echo-border/60 shadow-echo-soft ${padding} ${className}`} {...props}>
      {header && <div className="mb-2 font-semibold text-echo-text">{header}</div>}
      {actions && <div className="mb-2 flex gap-2">{actions}</div>}
      <div>{children}</div>
      {footer && <div className="mt-4 text-xs text-echo-text-muted">{footer}</div>}
    </div>
  );
}
