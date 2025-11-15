// src/components/story/StoryCarousel.tsx

import { STORY_ARCS } from "@/data/storyArcs";
import { StoryCarouselCard } from "./StoryCarouselCard";

type StoryCarouselProps = {
  variant?: "full" | "teaser";
};

export default function StoryCarousel({ variant = "full" }: StoryCarouselProps) {
  const arcs = variant === "teaser" ? STORY_ARCS.slice(0, 3) : STORY_ARCS;

  return (
    <section className="space-y-4">
      {variant === "full" ? (
        <header className="space-y-1">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-300">
            Story Arcs · Echo OS
          </h2>
          <p className="text-xs text-zinc-400 max-w-2xl">
            Each arc is a different process running inside the same haunted machine.
            Start with Wolves in the Echo House if you want the core detective myth,
            or wander into the other timelines when you&apos;re ready to branch.
          </p>
        </header>
      ) : (
        <header className="space-y-1">
          <h2 className="text-sm font-semibold text-zinc-200">
            Echo OS Arcs (Preview)
          </h2>
          <p className="text-xs text-zinc-500">
            A few active processes in this universe. Open Story Mode to see the
            full map.
          </p>
        </header>
      )}

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-ink via-ink/40 to-transparent" />

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pt-4">
          {arcs.map((arc) => (
            <StoryCarouselCard key={arc.slug} arc={arc} />
          ))}
        </div>
      </div>
    </section>
  );
}
