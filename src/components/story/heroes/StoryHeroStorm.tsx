"use client";
import { ReactNode } from "react";

export function StoryHeroStorm({ eyebrow, title, subtitle, ctas, image }: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  ctas?: ReactNode;
  image?: ReactNode;
}) {
  return (
    <section className="pt-12 pb-8 md:pt-20 md:pb-12 grid lg:grid-cols-2 gap-8 items-center">
      <div>
        {eyebrow && <div className="mb-2 text-xs md:text-sm uppercase tracking-[0.2em] text-echo-text-muted font-semibold">{eyebrow}</div>}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-echo-text mb-4">{title}</h1>
        {subtitle && <div className="max-w-xl text-base leading-relaxed text-echo-text-muted mb-6">{subtitle}</div>}
        {ctas && <div className="flex flex-col gap-3 items-start">{ctas}</div>}
      </div>
      {image && <div className="relative h-64 w-full max-w-md overflow-hidden rounded-echo-lg border border-echo-border/60 bg-echo-surface shadow-echo-soft">{image}</div>}
    </section>
  );
}
