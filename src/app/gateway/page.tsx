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
              className="rounded-lg py-8 px-4 bg-zinc-800/60 hover:bg-zinc-700/70 transition-shadow shadow-sm flex flex-col items-center justify-center focus:outline-none"
            >
              <div className="text-xl font-medium mb-1">{d.label}</div>
              <div className="text-sm text-zinc-400">Enter</div>
            </button>
          ))}
        </div>
      </div>

      {overlay && <TunnelOverlay targetRoute={overlay.route} variant={overlay.variant} onFinish={() => setOverlay(null)} />}
    </main>
  );
}
