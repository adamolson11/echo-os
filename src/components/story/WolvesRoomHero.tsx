"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function WolvesRoomHero() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-16 lg:py-24 lg:grid lg:grid-cols-2 lg:gap-12 bg-echo-bg">
      {/* Cinematic video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 rounded-echo-lg opacity-60"
        src="/images/storyroom.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="Echo House cinematic background"
      />
      {/* Left: Text Stack */}
      <div className="space-y-6 max-w-xl relative z-10">
        <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-echo-text-muted font-semibold">
          Wolves in the Echo House
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-echo-text">
          The night the hurricane found a conscience.
        </h1>
        <p className="text-base leading-relaxed text-echo-text-muted">
          A storm clawed the coastline and tore through a Florida mansion on stilts — the wrong night for Silas Palesmith to be sober, and the worst night for Paulo Davinci to be free. Inside the Echo House, thunder walked the halls like a memory, and every locked door whispered a different version of the truth.
        </p>
        <p className="italic text-echo-text-muted">
          Two men. One storm. A house full of ghosts.
        </p>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
          <Button
            variant="primary"
            href="/story/wolves/chapters/01"
          >
            Read the Opening Chapter
          </Button>
          <Button
            variant="ghost"
            href="/codex?tag=wolves"
          >
            Explore the Wolves Codex
          </Button>
        </div>
        <p className="pt-2 text-xs text-echo-text-muted">
          You can still hear the windows scream when the lightning hits just right.
        </p>
      </div>
      {/* Right: Image Portal */}
      <div className="relative mx-auto mt-10 h-64 w-full max-w-md overflow-hidden rounded-echo-lg lg:mt-0 border border-echo-border/60 bg-echo-surface shadow-echo-soft z-10">
        <Image
          src="/images/arcs/wolves-echo-house.jpg"
          alt="Wolves Echo House Mansion"
          fill
          className="object-cover object-center opacity-80"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-echo-bg/80 to-echo-surface-soft/40" />
        {/* Lightning flicker animation overlay */}
        <div className="absolute inset-0 bg-white/5 pointer-events-none animate-lightning-flicker" />
        {/* Faint vertical door hints */}
        <div className="absolute inset-y-[18%] left-[28%] w-px bg-gradient-to-b from-echo-accent/40 via-echo-accent/10 to-transparent" />
        <div className="absolute inset-y-[18%] left-1/2 w-px bg-gradient-to-b from-echo-accent/40 via-echo-accent/10 to-transparent" />
        <div className="absolute inset-y-[18%] right-[28%] w-px bg-gradient-to-b from-echo-accent/40 via-echo-accent/10 to-transparent" />
      </div>
    </section>
  );
}
