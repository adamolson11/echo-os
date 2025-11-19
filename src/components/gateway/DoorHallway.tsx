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
    "use client";

    import DoorCard from "./DoorCard";

    const DOORS = [
      {
        key: "story",
        label: "Story Room",
        eyebrow: "Enter the Wolves",
        tagline: "Where the Echo House starts whispering.",
        href: "/story",
        image: "/images/gateway/story-door.jpg",
      },
      {
        key: "codex",
        label: "Codex",
        eyebrow: "Brain of the House",
        tagline: "The living map of memory and myth.",
        href: "/codex",
        image: "/images/gateway/codex-door.jpg",
      },
      {
        key: "lab",
        label: "Lab",
        eyebrow: "Echo Lab",
        tagline: "Experiment. Iterate. Break reality safely.",
        href: "/lab",
        image: "/images/gateway/lab-door.jpg",
      },
      {
        key: "archive",
        label: "Archive",
        eyebrow: "Dead Files",
        tagline: "What remains after memory lets go.",
        href: "/archive",
        image: "/images/gateway/archive-door.jpg",
      },
    ];

    export default function DoorHallway() {
      return (
        <section className="w-full py-8 sm:py-12 lg:py-16">
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
