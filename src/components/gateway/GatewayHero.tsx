"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import TunnelOverlay from "@/components/TunnelOverlay";

import React, { useEffect, useRef, useState } from "react";

export function GatewayHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [showTunnel, setShowTunnel] = useState(false);
  const [tunnelRoute, setTunnelRoute] = useState<string>("");
  const [tunnelVariant, setTunnelVariant] = useState<"story" | "codex" | "archive" | "lab">("story");

  // Fade-in animation on mount
  useEffect(() => {
    const el = heroRef.current;
    if (el) {
      el.classList.add("motion-fade-in");
    }
  }, []);

  // Gentle storm parallax effect
  function handleMouseMove(e: React.MouseEvent) {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    el.style.setProperty("--storm-x", `${x}px`);
    el.style.setProperty("--storm-y", `${y}px`);
  }
  function handleMouseLeave() {
    const el = heroRef.current;
    if (!el) return;
    el.style.setProperty("--storm-x", `0px`);
    el.style.setProperty("--storm-y", `0px`);
  }

  // Door click handler
  function handleDoor(route: string, variant: "story" | "codex" | "archive" | "lab") {
    setTunnelRoute(route);
    setTunnelVariant(variant);
    setShowTunnel(true);
  }

  return (
    <section
      ref={heroRef}
      id="gateway-hero"
      className="relative mx-auto w-full max-w-7xl px-4 pt-12 pb-12 lg:pt-20 lg:pb-16 bg-echo-bg motion-fade-in"
      style={{
        transform: "translate3d(var(--storm-x, 0px), var(--storm-y, 0px), 0)",
        transition: "transform 0.4s cubic-bezier(.4,0,.2,1), opacity 0.7s cubic-bezier(.4,0,.2,1)"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* background gradient and glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-echo-bg via-echo-surface to-echo-surface-soft animate-storm-bg" />
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-64 w-2/5 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.22),_transparent_70%)] animate-storm-bg" />
      <div className="pointer-events-none absolute left-0 bottom-0 -z-10 h-32 w-1/3 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,196,120,0.10),_transparent_70%)] animate-storm-bg" />

      {/* Minimal cinematic launch: just the four portal doors, no extra text */}
      <div className="relative mx-auto w-full max-w-4xl px-2 py-12 flex items-center justify-center">
        <div className="relative w-full h-[420px] rounded-echo-lg overflow-hidden border border-echo-border/60 bg-echo-surface shadow-echo-soft flex items-center justify-center">
          {/* Main portal doors image */}
          <img
            src="/images/portal-doors.jpg"
            alt="Echo House Portal Doors"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-90 z-0"
          />
          {/* Overlay for contrast */}
          <div className="absolute inset-0 bg-echo-bg/40 z-10" />
          {/* Four interactive door cards */}
          <div className="relative z-20 flex w-full h-full items-end justify-between px-8 pb-8 gap-4">
            <DoorButton label="STORY" color="yellow-400" variant="story" route="/story" subtitle="Narrative" title="Story Room" desc="Enter the canon chapters." onClick={handleDoor} />
            <DoorButton label="CODEX" color="cyan-400" variant="codex" route="/codex" subtitle="Graph" title="Living Codex" desc="See the brain behind the stories." onClick={handleDoor} />
            <DoorButton label="LAB" color="pink-400" variant="lab" route="/lab" subtitle="Experiments" title="Lab" desc="Prototype, test, and break things." onClick={handleDoor} />
            <DoorButton label="ARCHIVE" color="blue-400" variant="archive" route="/archive" subtitle="Records" title="Archive" desc="Echoes, logs, and artifacts." onClick={handleDoor} />
          </div>
        </div>
        {showTunnel && <TunnelOverlay targetRoute={tunnelRoute} variant={tunnelVariant} onFinish={() => setShowTunnel(false)} />}
      </div>
    </section>
  );
}

interface DoorButtonProps {
  label: string;
  color: string;
  variant: "story" | "codex" | "archive" | "lab";
  route: string;
  subtitle: string;
  title: string;
  desc: string;
  onClick: (route: string, variant: "story" | "codex" | "archive" | "lab") => void;
}

function DoorButton({ label, color, variant, route, subtitle, title, desc, onClick }: DoorButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(route, variant)}
      className={`group relative w-1/4 h-[320px] rounded-echo-lg bg-black/0 hover:bg-black/10 transition border-0 flex flex-col justify-end shadow-echo-soft cursor-pointer`}
    >
      <div className={`absolute inset-0 rounded-echo-lg border-2 border-${color}/80 shadow-echo-glow group-hover:shadow-echo-glow ${variant === 'story' ? 'animate-lightning-flicker' : variant === 'codex' ? 'animate-echo-glow' : ''}`} />
      <div className={`absolute left-0 right-0 top-8 text-2xl font-bold text-${color} text-center drop-shadow`}>{label}</div>
      <div className="relative z-10 px-6 pb-6">
        <div className="text-xs uppercase tracking-wide text-echo-text-muted mb-1">{subtitle}</div>
        <div className="text-lg font-semibold text-white mb-1">{title}</div>
        <div className="text-xs text-echo-text-muted">{desc}</div>
      </div>
    </button>
  );
}
