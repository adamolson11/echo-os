"use client";
import { cn } from "@/lib/codex";

export function Tag({ children, className = "", ...props }) {
  return (
    <span
      className={cn(
        "inline-block bg-echo-surface-soft text-echo-text-muted px-3 py-1 rounded-echo-pill text-xs font-semibold tracking-wide border border-echo-border/40", className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
