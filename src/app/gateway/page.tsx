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
                  <Link href={door.href} className="group block">
                    <div className={`relative flex h-72 w-48 flex-col items-center justify-end overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b ${styles.panel} shadow-[0_30px_60px_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-2`}> 
                      <div className="absolute inset-x-0 top-6 flex items-center justify-center">
                        <span className="text-sm tracking-widest text-white/90">{door.label}</span>
                      </div>

                      <div className="absolute inset-x-0 bottom-8 px-3 text-center">
                        <p className="text-xs text-white/80">{door.subtitle}</p>
                      </div>

                      {/* floor glow */}
                      <div className={`absolute -bottom-8 h-24 w-full ${styles.glow} blur-3xl opacity-80`} />
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
