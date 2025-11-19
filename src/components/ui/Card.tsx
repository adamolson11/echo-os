"use client";
import { cn } from "@/lib/codex";

export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={cn(
        "bg-echo-surface border border-echo-border/60 rounded-echo-lg shadow-echo-soft hover:bg-white/5 hover:shadow-echo-soft transition",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
