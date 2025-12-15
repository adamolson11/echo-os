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
    bgPosition: "50% 20%",
    cutout: true,
  },
  {
    key: "codex",
    label: "Codex",
    eyebrow: "Living Brain",
    tagline: "The graph of memory, myth, and recursion.",
    href: "/codex",
    image: "/images/gateway/codex-door.jpg",
    bgPosition: "50% 30%",
  },
  {
    key: "lab",
    label: "Echo Lab",
    eyebrow: "Experiment Zone",
    tagline: "Prototypes, dangerous ideas, and systems tests.",
    href: "/lab",
    image: "/images/gateway/lab-door.jpg",
    bgPosition: "50% 40%",
  },
  {
    key: "archive",
    label: "Archive",
    eyebrow: "Dead Files",
    tagline: "Cases, records, and branches that didn’t make it.",
    href: "/archive",
    image: "/images/gateway/archive-door.jpg",
    bgPosition: "50% 35%",
  },
];

export default function DoorHallway() {
  return (
    <section className="w-full">
      <div className="mx-auto grid gap-6 justify-center items-start sm:grid-cols-2 lg:grid-cols-4">
        {DOORS.map((door) => (
          <div key={door.key} className="flex justify-center">
            <DoorCard
              href={door.href}
              label={door.label}
              subtitle={door.tagline}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
