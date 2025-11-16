"use client";

import Link from "next/link";

const doorPositions = [
  { id: "story", label: "STORY", href: "/story", variant: "story", className: "left-[8%] top-[20%]" },
  { id: "codex", label: "CODEX", href: "/codex", variant: "codex", className: "left-[32%] top-[18%]" },
  { id: "archive", label: "ARCHIVE", href: "/archive", variant: "archive", className: "left-[58%] top-[24%]" },
  { id: "lab", label: "LAB", href: "/lab", variant: "lab", className: "left-[78%] top-[20%]" },
];

const doorStyles = {
  story: { bg: "from-[#b46b1b] to-[#3b260f]", glow: "rgba(255,180,100,0.7)" },
  codex: { bg: "from-[#16d2ff] to-[#093b48]", glow: "rgba(80,220,255,0.9)" },
  archive: { bg: "from-[#485a72] to-[#151b24]", glow: "rgba(160,180,200,0.6)" },
  lab: { bg: "from-[#15c484] to-[#0a2b23]", glow: "rgba(80,255,170,0.8)" },
} as const;

type DoorProps = {
  variant: keyof typeof doorStyles;
  className?: string;
  label: string;
};

function Door({ variant, className = "", label }: DoorProps) {
  const { bg, glow } = doorStyles[variant];

  return (
    <div
      className={`
        ${className}
        group
        w-[180px] h-[320px]
        rounded-md
        border border-white/10
        bg-gradient-to-b ${bg}
        shadow-[0_0_40px_rgba(0,0,0,0.9)]
        relative
        cursor-pointer
        transition
        duration-200
        ease-out
        group-hover:scale-105
      `}
      style={{ boxShadow: `0 0 40px ${glow}` }}
    >
      <div className="absolute inset-[10px] border border-white/10 bg-black/10 rounded-sm" />

      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-sm tracking-[0.3em] text-white/85">
        {label}
      </div>

      <div className="absolute inset-y-10 left-1/2 w-px bg-white/10" />

      <div className="absolute left-[62%] top-1/2 w-2.5 h-2.5 rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.7)]" />

      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[140%] h-4 rounded-full blur-xl opacity-70 group-hover:opacity-100"
        style={{ background: glow }}
      />
    </div>
  );
}

export default function GatewayPage() {
  return (
    <main className="min-h-screen w-full relative bg-[#05070b] flex items-center justify-center overflow-hidden text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-black/80 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div className="relative w-full max-w-6xl h-[520px]">
        <div className="absolute left-6 top-6">
          <p className="text-xs uppercase tracking-wider text-white/60">THE ECHO HOUSE</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Choose a door</h2>
          <p className="mt-2 text-sm text-white/60">Choose a door. Each path leads deeper into the system.</p>
        </div>

        {doorPositions.map((d) => (
          <Link key={d.id} href={d.href} aria-label={`${d.label} door`}>
            <div className={`absolute ${d.className}`}>
              <Door variant={d.variant as any} className="" label={d.label} />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
