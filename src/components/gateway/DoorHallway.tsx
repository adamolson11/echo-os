import DoorCard from "./DoorCard";

const DOORS = [
  {
    key: "story",
    label: "Story Room",
    eyebrow: "Narrative",
    href: "/story",
    image: "/images/doors/story-door.jpg",
    tagline: "Enter the canon chapters.",
  },
  {
    key: "codex",
    label: "Living Codex",
    eyebrow: "Graph",
    href: "/codex",
    image: "/images/doors/codex-door.jpg",
    tagline: "See the brain behind the stories.",
  },
  {
    key: "lab",
    label: "Lab",
    eyebrow: "Experiments",
    href: "/lab",
    image: "/images/doors/lab-door.jpg",
    tagline: "Prototype, test, and break things.",
  },
  {
    key: "archive",
    label: "Archive",
    eyebrow: "Records",
    href: "/archive",
    image: "/images/doors/archive-door.jpg",
    tagline: "Echoes, logs, and artifacts.",
  },
];

export default function DoorHallway() {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Choose a door</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4 md:px-0">
        {DOORS.map((door) => (
          <DoorCard
            key={door.key}
            href={door.href}
            label={door.label}
            eyebrow={door.eyebrow}
            tagline={door.tagline}
            image={door.image || "/images/portal-doors.jpg"}
          />
        ))}
      </div>
    </section>
  );
}
