"use client";

import Link from "next/link";
import { EchoPanel } from "@/components/ui/EchoPanel";

import { useEffect, useRef } from "react";

export default function GatewayHall() {
  const panelRef = useRef<HTMLDivElement>(null);

  // Fade-in animation on mount
  useEffect(() => {
    const el = panelRef.current;
    if (el) {
      el.classList.add("motion-fade-in");
    }
  }, []);

  // Parallax effect on mouse move
  function handleMouseMove(e: React.MouseEvent) {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    el.style.setProperty("--parallax-x", `${x}px`);
    el.style.setProperty("--parallax-y", `${y}px`);
  }
  function handleMouseLeave() {
    const el = panelRef.current;
    if (!el) return;
    el.style.setProperty("--parallax-x", `0px`);
    el.style.setProperty("--parallax-y", `0px`);
  }

  return (
    <div className="text-gray-100 flex items-center justify-center w-full">
      <EchoPanel
        ref={panelRef}
        className="flex flex-col items-center justify-center w-[320px] h-[400px] bg-slate-950/70 fade-in"
        style={{
          transform: "translate3d(var(--parallax-x, 0px), var(--parallax-y, 0px), 0)",
          transition: "transform 0.3s cubic-bezier(.4,0,.2,1), opacity 0.15s ease-out",
          animation: "fadeIn 1.2s cubic-bezier(.4,0,.2,1)"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          href="/codex"
          className="group relative flex h-80 w-64 items-center justify-center rounded-xl border border-cyan-400/70 bg-black/40
                     transition-all duration-150 hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(34,211,238,0.55)] hover:shadow-cyan-400/40
                     hover:bg-cyan-500/5 cursor-pointer"
        >
          {/* Glowing inner frame */}
          <div className="absolute inset-4 rounded-lg border border-cyan-300/60 opacity-60 group-hover:opacity-90 transition-all duration-150" />

          {/* Door label */}
          <span className="relative text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100/90">
            Codex Room
          </span>
        </Link>
        <div className="mt-6 text-xs text-echo-text-muted text-center">
          Gateway to the Echo House Codex. Explore story connections and universe doors.
        </div>
      </EchoPanel>
    </div>
  );
}
