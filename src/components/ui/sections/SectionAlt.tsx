"use client";
import { ReactNode } from "react";

export function SectionAlt({ children, className = "", ...props }: { children: ReactNode; className?: string }) {
  return (
    <section className={`py-8 md:py-12 bg-echo-surface-soft rounded-echo-lg ${className}`} {...props}>
      {children}
    </section>
  );
}
