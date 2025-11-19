"use client";

import DoorCard from "./DoorCard";

const DOORS = [
  {
    key: "story",
    label: "Story Room",
    eyebrow: "The Heart",
    tagline: "Enter the storm-lit narrative core.",
    href: "/story",
    glow: "cyan",
  },
  {
    key: "codex",
    label: "Codex Room",
    eyebrow: "The Mind",
    tagline: "View the living map of meaning.",
    href: "/codex",
    glow: "violet",
  },
  {
    key: "lab",
    label: "Lab",
    eyebrow: "The Body",
    tagline: "Experiment with dangerous ideas.",
    href: "/lab",
    glow: "ice",
  },
  {
    key: "archive",
    label: "Archive",
    eyebrow: "The Soul",
    tagline: "Descend into the memory stacks.",
    href: "/archive",
    glow: "amber",
  },
];

export default function DoorHallway() {
  return (
    <div className="space-y-6 pt-0 pb-8">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Rooms</p>

      {/* 🟦 Light falloff wrapper */}
      <div className="relative">
        {/* Soft atmospheric glow behind the doors */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.04),_transparent_70%)] opacity-80" />

        {/* Actual door grid */}
        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DOORS.map((door) => (
            <DoorCard key={door.key} {...door} />
          ))}
        </div>
      </div>
    </div>
  );
}
