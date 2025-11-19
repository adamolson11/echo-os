"use client";
import { ReactNode } from "react";

export function Section({ children, className = "", ...props }: { children: ReactNode; className?: string }) {
  return (
    <section className={`py-8 md:py-12 ${className}`} {...props}>
      {children}
    </section>
  );
}
