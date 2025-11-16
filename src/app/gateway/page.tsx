"use client";

import React, { useState } from "react";
import TunnelOverlay from "../../components/TunnelOverlay";

type Door = { label: string; route: string; variant: "story" | "codex" | "archive" | "lab" };

const DOORS: Door[] = [
  { label: "Story", route: "/story", variant: "story" },
  { label: "Codex", route: "/codex", variant: "codex" },
  { label: "Archive", route: "/archive", variant: "archive" },
  { label: "Lab", route: "/lab", variant: "lab" },
];

export default function GatewayPage() {
  const [overlay, setOverlay] = useState<{ route: string; variant: Door["variant"] } | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white flex items-center justify-center">
      <div className="w-full max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-semibold text-center mb-10">Door Hallway</h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {DOORS.map((d) => (
            <button
              key={d.label}
              onClick={() => setOverlay({ route: d.route, variant: d.variant })}
              disabled={!!overlay}
              className={`group relative rounded-xl border border-white/15 bg-black/40 px-6 py-8 backdrop-blur-md transition-all duration-200 ease-out
                 hover:border-cyan-300/70 hover:bg-cyan-500/10 hover:shadow-[0_0_40px_rgba(34,211,238,0.18)]
                 flex flex-col items-center justify-center focus:outline-none ${overlay ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              <span className="text-sm uppercase tracking-[0.2em] text-slate-200 group-hover:text-cyan-100">{d.label}</span>
              <div className="mt-3 text-xs text-zinc-400">Enter</div>
            </button>
          ))}
        </div>
      </div>

      {overlay && <TunnelOverlay targetRoute={overlay.route} variant={overlay.variant} onFinish={() => setOverlay(null)} />}
    </main>
  );
}
