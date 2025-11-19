"use client";
import { ReactNode } from "react";

export function SectionHeroContainer({ children, className = "", ...props }: { children: ReactNode; className?: string }) {
  return (
    <section className={`pt-12 pb-8 md:pt-20 md:pb-12 ${className}`} {...props}>
      {children}
    </section>
  );
}
