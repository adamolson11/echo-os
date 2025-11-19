"use client";

import { WolvesRoomHero } from "@/components/story/WolvesRoomHero";
import { EchoFrame } from "@/components/layout/EchoFrame";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Section, SectionWithDivider } from "@/components/ui/sections/Section";
import { EchoPanel } from "@/components/ui/EchoPanel";

export default function Page() {
  return (
    <EchoFrame hero={<WolvesRoomHero />}>
      {/* About This Story Section */}
      <Section className="mx-auto max-w-3xl py-10 bg-gradient-to-br from-slate-900/80 via-indigo-950/60 to-slate-950/80 rounded-2xl shadow-echo-soft">
        <h2 className="text-3xl md:text-4xl font-semibold text-echo-accent mb-2">What is Wolves in the Echo House?</h2>
        <p className="text-base leading-relaxed text-echo-text-muted">
          Wolves in the Echo House is a hurricane-night psychological noir, where Silas Palesmith and Paulo Davinci confront the haunted mind-map of the Echo House. Each chapter peels back the layers of memory, guilt, and survival.
        </p>
        <p className="text-base leading-relaxed text-echo-text-muted">
          The Echo House itself is a living character, its rooms and doors mapping the storm inside every soul that enters. Follow the story as the house teaches, tests, and transforms its guests.
        </p>
      </Section>

      {/* Chapters Section */}
      <SectionWithDivider className="mx-auto max-w-7xl py-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-echo-accent mb-4">Chapters</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Chapter 1 */}
          <EchoPanel className="flex flex-col justify-between p-5 fade-in" style={{animation: "fadeIn 1.1s cubic-bezier(.4,0,.2,1)"}}>
            <div>
              <h3 className="text-lg font-bold text-echo-text mb-1">The Windows Remember</h3>
              <p className="text-sm text-echo-text-muted mb-2">A storm’s memory lingers in every pane. Silas faces the first locked door.</p>
            </div>
            <Link href="/story/wolves/chapters/01" className="mt-2 inline-block bg-echo-accent text-black rounded-echo-pill px-4 py-2 text-sm font-semibold shadow-echo-soft hover:shadow-echo-glow hover:bg-cyan-400 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-echo-accent">Read</Link>
          </EchoPanel>
          {/* Chapter 2 */}
          <EchoPanel className="flex flex-col justify-between p-5 fade-in" style={{animation: "fadeIn 1.3s cubic-bezier(.4,0,.2,1)"}}>
            <div>
              <h3 className="text-lg font-bold text-echo-text mb-1">Hunger in the Floodlights</h3>
              <p className="text-sm text-echo-text-muted mb-2">Davinci finds what the storm left behind. The house grows restless.</p>
            </div>
            <Link href="/story/wolves/chapters/02" className="mt-2 inline-block bg-echo-accent text-black rounded-echo-pill px-4 py-2 text-sm font-semibold shadow-echo-soft hover:shadow-echo-glow hover:bg-cyan-400 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-echo-accent">Read</Link>
          </EchoPanel>
          {/* Chapter 3 */}
          <EchoPanel className="flex flex-col justify-between p-5 fade-in" style={{animation: "fadeIn 1.5s cubic-bezier(.4,0,.2,1)"}}>
            <div>
              <h3 className="text-lg font-bold text-echo-text mb-1">The House Teaches You Its Name</h3>
              <p className="text-sm text-echo-text-muted mb-2">Every room is a lesson. Every lesson is a storm. The truth waits behind the last door.</p>
            </div>
            <Link href="/story/wolves/chapters/03" className="mt-2 inline-block bg-echo-accent text-black rounded-echo-pill px-4 py-2 text-sm font-semibold shadow-echo-soft hover:shadow-echo-glow hover:bg-cyan-400 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-echo-accent">Read</Link>
          </EchoPanel>
        </div>
      </SectionWithDivider>

      {/* Codex Teaser Strip */}
      <SectionWithDivider className="mx-auto max-w-7xl py-6 mt-10 flex items-center justify-between">
        <EchoPanel className="flex items-center justify-between w-full bg-slate-950/60 fade-in" style={{animation: "fadeIn 1.7s cubic-bezier(.4,0,.2,1)"}}>
          <div>
            <h3 className="text-base font-semibold text-echo-accent">See how Wolves connects in the Codex</h3>
            <p className="text-sm text-echo-text-muted">Follow Silas, Davinci, and the Echo House across timelines in the interactive graph.</p>
          </div>
          <Link href="/codex?tag=wolves" className="ml-4 inline-block rounded-echo-pill border border-echo-accent bg-echo-accent px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-echo-accent">Open Codex</Link>
        </EchoPanel>
      </SectionWithDivider>
    </EchoFrame>
    </EchoFrame>
  );
}
