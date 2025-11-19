"use client";
import { ReactNode } from "react";

const variantStyles = {
  info: "bg-echo-surface border-echo-accent text-echo-text",
  success: "bg-green-50 border-green-400 text-green-900",
  warning: "bg-yellow-50 border-yellow-400 text-yellow-900",
  error: "bg-red-50 border-red-400 text-red-900",
};
const icons = {
  info: "ℹ️",
  success: "✅",
  warning: "⚠️",
  error: "❌",
};

export function Alert({ title, children, variant = "info", className = "", ...props }: {
  title?: ReactNode;
  children?: ReactNode;
  variant?: "info" | "success" | "warning" | "error";
  className?: string;
}) {
  return (
    <div className={`flex items-start gap-3 border-l-4 rounded-echo-lg p-4 shadow-echo-soft ${variantStyles[variant]} ${className}`} {...props}>
      <span className="text-xl mt-0.5">{icons[variant]}</span>
      <div>
        {title && <div className="font-bold mb-1">{title}</div>}
        {children && <div className="text-sm">{children}</div>}
      </div>
    </div>
  );
}
