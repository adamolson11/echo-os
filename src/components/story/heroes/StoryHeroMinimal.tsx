"use client";
import { ReactNode } from "react";

export function StoryHeroMinimal({ title }: { title: ReactNode }) {
  return (
    <section className="pt-12 pb-8 md:pt-20 md:pb-12 text-center">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-echo-text mb-4">{title}</h1>
    </section>
  );
}
