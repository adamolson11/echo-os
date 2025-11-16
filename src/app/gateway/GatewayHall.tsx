"use client";

import Link from "next/link";

export default function GatewayHall() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#05050a] text-gray-100 flex items-center justify-center">
      {/* Single Codex door in the hallway */}
      <Link
        href="/codex"
        className="group relative flex h-80 w-64 items-center justify-center rounded-xl border border-cyan-400/70 bg-black/40
                   transition-all duration-300 hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(34,211,238,0.55)]
                   hover:bg-cyan-500/5 cursor-pointer"
      >
        {/* Glowing inner frame */}
        <div className="absolute inset-4 rounded-lg border border-cyan-300/60 opacity-60 group-hover:opacity-90" />

        {/* Door label */}
        <span className="relative text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100/90">
          Codex Room
        </span>
      </Link>
    </div>
  );
}
