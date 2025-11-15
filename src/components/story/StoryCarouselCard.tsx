// src/components/story/StoryCarouselCard.tsx

import Link from "next/link";
import type { StoryArc } from "@/data/storyArcs";

type Props = {
  arc: StoryArc;
};

export function StoryCarouselCard({ arc }: Props) {
  return (
    <article className="group relative flex w-[260px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:border-skyblue/60 md:w-[320px]">
      <div
        className="relative aspect-video w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${arc.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-3">
          <div className="flex items-center justify-between text-[10px]">
            <span className="rounded-full bg-black/60 px-2 py-0.5 font-mono uppercase tracking-[0.15em] text-skyblue">
              {arc.tag}
            </span>
            <span className="rounded-full bg-black/50 px-2 py-0.5 text-[9px] text-zinc-200">
              {arc.intensity}
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-zinc-50 line-clamp-2">
              {arc.title}
            </h3>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-3">
        <p className="text-xs text-zinc-300 line-clamp-3">{arc.blurb}</p>
        <div className="mt-3 flex items-center justify-between text-[11px]">
          <Link
            href={arc.href}
            className="inline-flex items-center gap-1 text-skyblue hover:text-skyblue/80"
          >
            Open Arc
            <span className="text-[10px]">
              
            </span>
          </Link>
          <span className="text-[10px] text-zinc-500">Story Mode</span>
        </div>
      </div>
    </article>
  );
}
