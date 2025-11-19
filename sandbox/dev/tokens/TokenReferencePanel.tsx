"use client";

import { useState } from "react";

const themes = [
  {
    key: "wolves",
    label: "Wolves",
    bg: "bg-echo-bg",
    accent: "bg-echo-accent",
    panel: "bg-echo-surface",
  },
  {
    key: "futureFarm",
    label: "Future Farm",
    bg: "bg-green-950",
    accent: "bg-green-400",
    panel: "bg-green-900",
  },
  {
    key: "psyntuum",
    label: "Psyntuum",
    bg: "bg-fuchsia-950",
    accent: "bg-fuchsia-400",
    panel: "bg-fuchsia-900",
  },
  {
    key: "hudsonBlue",
    label: "Hudson Blue",
    bg: "bg-blue-950",
    accent: "bg-blue-400",
    panel: "bg-blue-900",
  },
];

export default function TokenReferencePanel() {
  const [theme, setTheme] = useState(themes[0]);
  return (
    <div className={`min-h-screen ${theme.bg} transition-all duration-300`}>
      <div className="max-w-3xl mx-auto py-10 space-y-8">
        <h2 className={`text-2xl font-bold mb-4 ${theme.accent}`}>Echo OS Token Reference</h2>
        {/* Theme Mode Toggle */}
        <div className="flex gap-2 mb-6">
          {themes.map((t) => (
            <button
              key={t.key}
              className={`px-4 py-1 rounded-echo-pill text-xs font-semibold border ${theme.key === t.key ? t.accent + " text-black" : "border-echo-border text-echo-text-muted"} transition`}
              onClick={() => setTheme(t)}
            >
              {t.label}
            </button>
          ))}
        </div>
        {/* Preview Panel */}
        <div className={`rounded-echo-lg border shadow-echo-soft p-6 mb-8 ${theme.panel}`}>
          <div className="text-lg font-bold mb-2">Panel Preview ({theme.label})</div>
          <div className="flex gap-4 mb-4">
            <div className={`w-10 h-10 rounded-full ${theme.accent}`} />
            <div className={`w-10 h-10 rounded-lg ${theme.panel} border border-echo-border`} />
            <div className={`w-10 h-10 rounded-lg bg-echo-surface-soft border border-echo-border`} />
          </div>
          <div className="text-xs text-echo-text-muted">Accent, Panel, Surface Soft</div>
        </div>
        {/* Color Swatches */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { name: "echo-bg", color: "bg-echo-bg" },
            { name: "echo-surface", color: "bg-echo-surface" },
            { name: "echo-surface-soft", color: "bg-echo-surface-soft" },
            { name: "echo-accent", color: "bg-echo-accent" },
            { name: "echo-gold", color: "bg-echo-gold" },
            { name: "echo-text", color: "bg-echo-text" },
            { name: "echo-text-muted", color: "bg-echo-text-muted" },
            { name: "echo-border", color: "bg-echo-border" },
          ].map(({ name, color }) => (
            <div key={name} className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-echo-lg border border-echo-border/40 ${color}`} />
              <span className="mt-2 text-xs text-echo-text-muted">{name}</span>
            </div>
          ))}
        </div>
        {/* Radii & Shadows */}
        <div className="flex gap-8 mb-8">
          <div className="w-24 h-12 bg-echo-surface rounded-echo-lg shadow-echo-soft flex items-center justify-center text-xs text-echo-text-muted">rounded-echo-lg</div>
          <div className="w-24 h-12 bg-echo-surface rounded-echo-pill shadow-echo-glow flex items-center justify-center text-xs text-echo-text-muted">rounded-echo-pill</div>
        </div>
        {/* Shadows */}
        <div className="flex gap-8 mb-8">
          <div className="w-24 h-12 bg-echo-surface rounded-echo-lg shadow-echo-soft flex items-center justify-center text-xs text-echo-text-muted">shadow-echo-soft</div>
          <div className="w-24 h-12 bg-echo-surface rounded-echo-lg shadow-echo-glow flex items-center justify-center text-xs text-echo-text-muted">shadow-echo-glow</div>
        </div>
        {/* Typography Scale */}
        <div className="space-y-2 mb-8">
          <div className="text-xs md:text-sm uppercase tracking-[0.2em] text-echo-text-muted font-semibold">Eyebrow</div>
          <div className="text-4xl md:text-5xl font-bold tracking-tight text-echo-text">H1: The night the hurricane found a conscience.</div>
          <div className="text-3xl md:text-4xl font-semibold text-echo-accent">H2: Wolves in the Echo House</div>
          <div className="text-base leading-relaxed text-echo-text-muted">Body: Echo OS is a living story machine — a hallway of doors into hurricanes, prison yards, future farms, and broken saints.</div>
          <div className="text-xs text-echo-text-muted">Caption: You can still hear the windows scream when the lightning hits just right.</div>
        </div>
        {/* Animations Demo */}
        <div className="flex gap-4">
          <button className="bg-echo-accent text-black rounded-echo-pill px-6 py-3 shadow-echo-soft hover:shadow-echo-glow animate-echo-glow">Echo Glow</button>
          <div className="w-24 h-12 bg-echo-surface rounded-echo-lg animate-lightning-flicker flex items-center justify-center text-xs text-echo-text-muted">Lightning Flicker</div>
        </div>
      </div>
    </div>
  );
}
