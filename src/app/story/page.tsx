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
}
