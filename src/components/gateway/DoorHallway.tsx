"use client";

import DoorCard from "./DoorCard";

const DOORS = [
  {
    key: "story",
    label: "Story Room",
    eyebrow: "Enter the Wolves",
    tagline: "The mainline narrative and its echoes.",
    href: "/story",
    image: "/images/gateway/story-door.jpg",
  },
  {
    key: "codex",
    label: "Codex",
    eyebrow: "Living Brain",
    tagline: "The graph of memory, myth, and recursion.",
    href: "/codex",
    image: "/images/gateway/codex-door.jpg",
  },
  {
    key: "lab",
    label: "Echo Lab",
    eyebrow: "Experiment Zone",
    tagline: "Prototypes, dangerous ideas, and systems tests.",
    href: "/lab",
    image: "/images/gateway/lab-door.jpg",
  },
  {
    key: "archive",
    label: "Archive",
    eyebrow: "Dead Files",
    tagline: "Cases, records, and branches that didn’t make it.",
    href: "/archive",
    image: "/images/gateway/archive-door.jpg",
  },
];

export default function DoorHallway() {
  return (
    <section className="w-full">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {DOORS.map((door) => (
          <DoorCard
            key={door.key}
            label={door.label}
            eyebrow={door.eyebrow}
            tagline={door.tagline}
            href={door.href}
            image={door.image}
          />
        ))}
      </div>
    </section>
  );
}
