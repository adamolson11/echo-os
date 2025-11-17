import React from "react";
import SeriesCard from "./components/SeriesCard";

export default function StoryPage() {
  return (
    <div className="mt-20 px-4 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-semibold text-slate-100">Story Hub</h1>
          <p className="mt-2 text-slate-400">
            Entry point into Wolves in the Echo House and the larger Echo OS universe.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SeriesCard
              title="Wolves in the Echo House"
              description="A cyber-noir hurricane mystery where memory, identity, and recursion collide."
              href="/story/wolves/ch1"
              accentColor="#3B7FFF"
            />
          </div>

          <div className="space-y-4">
            <SeriesCard
              title="The Devil's Trilogy"
              description="Three infernal tales interleaving guilt, redemption, and ink-stained secrets."
              href="/story/devils"
              accentColor="#D10023"
              comingSoon
            />

            <SeriesCard
              title="Future Farm Trilogy"
              description="Optimistic, strange pastoral futures and bio-tech folk tales."
              href="/story/future-farm"
              accentColor="#00D97E"
              comingSoon
            />
          </div>
        </section>
      </div>
    </div>
  );
}
import StoryBookshelf from "@/components/StoryBookshelf";
import StoryRoomFX from "@/components/StoryRoomFX";

export default function StoryRoom() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background video */}
      <video
        src="/images/storyroom.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />

      {/* Ambient FX (grain, subtle storm pulse, etc.) */}
      <StoryRoomFX />

      {/* Bookshelf UI */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl p-10">
        <StoryBookshelf />
      </div>
    </div>
  );
}
