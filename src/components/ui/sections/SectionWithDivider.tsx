"use client";
import { ReactNode } from "react";

export function SectionWithDivider({ children, className = "", ...props }: { children: ReactNode; className?: string }) {
  return (
    <section className={`py-8 md:py-12 border-t border-echo-border/40 ${className}`} {...props}>
      {children}
    </section>
  );
}
