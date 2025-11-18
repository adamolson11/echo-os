import DoorCard from "./DoorCard";

const DOORS = [
  {
    key: "story",
    label: "Story Room",
    eyebrow: "Narrative",
    href: "/story",
    // approximate horizontal position (used for absolute placement)
    left: "14%",
    // background position so the card shows the matching portion of the hallway photo
    bgPosition: "14% 48%",
    tagline: "Enter the canon chapters.",
  },
  {
    key: "codex",
    label: "Living Codex",
    eyebrow: "Graph",
    href: "/codex",
    left: "36%",
    bgPosition: "36% 48%",
    tagline: "See the brain behind the stories.",
  },
  {
    key: "lab",
    label: "Lab",
    eyebrow: "Experiments",
    href: "/lab",
    left: "60%",
    bgPosition: "60% 48%",
    tagline: "Prototype, test, and break things.",
  },
  {
    key: "archive",
    label: "Archive",
    eyebrow: "Records",
    href: "/archive",
    left: "82%",
    bgPosition: "82% 48%",
    tagline: "Echoes, logs, and artifacts.",
  },
];

export default function DoorHallway() {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between px-4 md:px-0">
        <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Choose a door</h2>
      </div>

      {/* Hallway hero: single photo background with positioned door cards (md+), and stacked grid on small screens */}
      {/* Small screens: show a stacked grid of door cards for easier touch targets */}
      <div className="mt-6 mx-4 md:mx-0">
        <div className="md:hidden grid grid-cols-2 gap-4">
          {DOORS.map((door) => (
            <DoorCard
              key={door.key}
              href={door.href}
              label={door.label}
              eyebrow={door.eyebrow}
              tagline={door.tagline}
              image={`/images/portal-doors.jpg`}
              bgPosition={door.bgPosition}
            />
          ))}
        </div>

        {/* md+ view: photo hero with transparent cutouts overlaid */}
        <div className="hidden md:block relative rounded-2xl overflow-hidden border border-slate-700/40 shadow-lg">
          <div
            aria-hidden
            className="w-full h-[520px] bg-cover bg-center sm:h-[560px] md:h-[640px]"
            style={{ backgroundImage: `url('/images/portal-doors.jpg')` }}
          />

          <div className="absolute inset-0 pointer-events-none">
            {DOORS.map((door) => (
              <div
                key={door.key}
                className="absolute -translate-x-1/2 bottom-[12%] pointer-events-auto"
                style={{ left: door.left }}
              >
                <DoorCard
                  href={door.href}
                  label={door.label}
                  eyebrow={door.eyebrow}
                  tagline={door.tagline}
                  image={`/images/portal-doors.jpg`}
                  bgPosition={door.bgPosition}
                  cutout
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
