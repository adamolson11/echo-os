"use client";

export function CodexHUD() {
  return (
    <div className="bg-echo-surface rounded-echo-lg shadow-echo-soft border border-echo-border/60 p-6 max-w-4xl mx-auto mt-10">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-bold text-echo-text">Echo House Codex</div>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-echo-pill bg-echo-accent text-black text-xs font-semibold">Story Mode</button>
          <button className="px-3 py-1 rounded-echo-pill border border-echo-accent text-echo-accent text-xs font-semibold">Codex Mode</button>
        </div>
      </div>
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select className="bg-echo-surface-soft border border-echo-border/40 rounded-echo-pill px-3 py-1 text-xs text-echo-text-muted">
          <option>Universes</option>
        </select>
        <select className="bg-echo-surface-soft border border-echo-border/40 rounded-echo-pill px-3 py-1 text-xs text-echo-text-muted">
          <option>Characters</option>
        </select>
        <select className="bg-echo-surface-soft border border-echo-border/40 rounded-echo-pill px-3 py-1 text-xs text-echo-text-muted">
          <option>Events</option>
        </select>
      </div>
      {/* Controls */}
      <div className="flex gap-3 mb-4">
        <button className="p-2 rounded-full bg-echo-surface-soft text-echo-text-muted">🔍</button>
        <button className="p-2 rounded-full bg-echo-surface-soft text-echo-text-muted">➖</button>
        <button className="p-2 rounded-full bg-echo-surface-soft text-echo-text-muted">➕</button>
        <button className="p-2 rounded-full bg-echo-surface-soft text-echo-text-muted">⤢</button>
      </div>
      {/* Legend */}
      <div className="flex gap-4 items-center mb-4">
        <span className="inline-block w-4 h-4 rounded-full bg-echo-accent mr-1" /> <span className="text-xs text-echo-text-muted">Universe</span>
        <span className="inline-block w-4 h-4 rounded-full bg-echo-gold mr-1" /> <span className="text-xs text-echo-text-muted">Character</span>
        <span className="inline-block w-4 h-4 rounded-full bg-echo-surface-soft mr-1" /> <span className="text-xs text-echo-text-muted">Event</span>
      </div>
      {/* Placeholder for graph */}
      <div className="bg-echo-bg rounded-echo-lg h-48 flex items-center justify-center text-echo-text-muted border border-echo-border/40">
        [Graph visualization placeholder]
      </div>
    </div>
  );
}
