"use client";
import { ReactNode } from "react";

export function StoryHeroStandard({ eyebrow, title, subtitle, ctas }: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  ctas?: ReactNode;
}) {
  return (
    <section className="pt-12 pb-8 md:pt-20 md:pb-12 text-center">
      {eyebrow && <div className="mb-2 text-xs md:text-sm uppercase tracking-[0.2em] text-echo-text-muted font-semibold">{eyebrow}</div>}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-echo-text mb-4">{title}</h1>
      {subtitle && <div className="max-w-xl mx-auto text-base leading-relaxed text-echo-text-muted mb-6">{subtitle}</div>}
      {ctas && <div className="flex flex-col gap-3 items-center justify-center">{ctas}</div>}
    </section>
  );
}
