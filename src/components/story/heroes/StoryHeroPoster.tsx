"use client";
import { ReactNode } from "react";

export function StoryHeroPoster({ image, title, subtitle, ctas }: {
  image: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  ctas?: ReactNode;
}) {
  return (
    <section className="relative min-h-[60vh] flex flex-col justify-end items-center bg-black">
      {image && <div className="absolute inset-0 w-full h-full object-cover object-center z-0">{image}</div>}
      <div className="relative z-10 pb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-echo-text mb-4 drop-shadow-lg">{title}</h1>
        {subtitle && <div className="max-w-xl mx-auto text-lg leading-relaxed text-echo-text-muted mb-6 drop-shadow">{subtitle}</div>}
        {ctas && <div className="flex flex-col gap-3 items-center justify-center">{ctas}</div>}
      </div>
    </section>
  );
}
