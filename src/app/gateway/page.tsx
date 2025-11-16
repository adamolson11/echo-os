"use client";

import Link from "next/link";

const doors = [
  {
    id: "story",
    label: "STORY",
    subtitle: "Enter the narrative.",
    href: "/story",
    variant: "story",
  },
  {
    id: "codex",
    label: "CODEX",
    subtitle: "See the mind-map.",
    href: "/codex",
    variant: "codex",
  },
  {
    id: "archive",
    label: "ARCHIVE",
    subtitle: "Evidence & logs.",
    href: "/archive",
    variant: "archive",
  },
  {
    id: "lab",
    label: "LAB",
    subtitle: "Experiments & tech.",
    href: "/lab",
    variant: "lab",
  },
];

function doorVariantStyles(variant: string) {
  switch (variant) {
    case "story":
      return {
        panel: "from-amber-700 to-amber-900",
        glow: "bg-gradient-to-t from-amber-400/40 to-transparent",
      };
    case "codex":
      return {
        panel: "from-cyan-700 to-sky-900",
        glow: "bg-gradient-to-t from-cyan-400/40 to-transparent",
      };
    case "archive":
      return {
        panel: "from-slate-700 to-slate-900",
        glow: "bg-gradient-to-t from-white/20 to-transparent",
      };
    case "lab":
      return {
        panel: "from-emerald-800 to-emerald-900",
        glow: "bg-gradient-to-t from-emerald-400/30 to-transparent",
      };
    default:
      return {
        panel: "from-white/5 to-black/80",
        glow: "bg-gradient-to-t from-white/10 to-transparent",
      };
  }
}

export default function GatewayPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,#101623_0,#05070b_45%,#020309_100%)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/60">THE ECHO HOUSE</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Choose a door</h2>
            <p className="mt-2 text-sm text-white/60">Choose a door. Each path leads deeper into the system.</p>
          </div>
        </div>

        <div className="mt-12 flex w-full items-end justify-center">
          <div className="flex -mx-3 items-end">
            {doors.map((door) => {
              const styles = doorVariantStyles(door.variant);
              return (
                <div key={door.id} className="px-3">
                  <Link
                    href={door.href}
                    aria-label={`${door.label} door — ${door.subtitle}`}
                    className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                  >
                    {/* door frame */}
                    <div className="relative rounded-2xl p-3 bg-black/40 shadow-inner border border-black/40">
                      <div
                        className={`relative flex h-96 w-56 flex-col items-center justify-end overflow-hidden rounded-xl border-2 border-white/5 bg-gradient-to-b ${styles.panel} shadow-[0_40px_80px_rgba(0,0,0,0.7)] transform transition duration-220 ease-out will-change-transform group-hover:scale-103 group-hover:-translate-y-3 group-hover:shadow-2xl focus-visible:scale-105`}
                      >
                        {/* door label */}
                        <div className="absolute inset-x-0 top-8 flex items-center justify-center">
                          <span className="text-sm tracking-widest text-white/90">{door.label}</span>
                        </div>

                        {/* subtitle */}
                        <div className="absolute inset-x-0 bottom-10 px-3 text-center">
                          <p className="text-sm text-white/80">{door.subtitle}</p>
                        </div>

                        {/* doorknob */}
                        <div className="absolute right-6 bottom-44 flex items-center justify-center">
                          <div className="h-6 w-6 rounded-full bg-yellow-400/90 shadow-md ring-1 ring-black/30 transform transition duration-200 group-hover:scale-110" />
                        </div>

                        {/* subtle door seam line */}
                        <div className="absolute right-0 top-6 h-[80%] w-px bg-white/5" />

                        {/* floor glow */}
                        <div className={`absolute -bottom-8 h-28 w-full ${styles.glow} blur-3xl opacity-60 transition-opacity duration-200 group-hover:opacity-100`} />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
