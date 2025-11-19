"use client";
import { CodexHUD } from "@/components/codex/CodexHUD";
import { EchoPanel } from "@/components/ui/EchoPanel";

export default function CodexHUDDemoPage() {
  return (
    <div className="min-h-screen bg-echo-bg py-12 px-4">
      {/* HUD Top Bar */}
      <EchoPanel className="max-w-4xl mx-auto mb-8 p-4 flex items-center justify-between">
        <span className="text-lg font-bold text-echo-text">Echo House Codex</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-echo-pill bg-echo-accent text-black text-xs font-semibold hover:bg-cyan-400 transition">Story Mode</button>
          <button className="px-3 py-1 rounded-echo-pill border border-echo-accent text-echo-accent text-xs font-semibold hover:bg-cyan-400 hover:text-black transition">Codex Mode</button>
        </div>
      </EchoPanel>

      {/* HUD Controls & Legend */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between">
        <div className="flex gap-3">
          <button className="p-2 rounded-full bg-echo-surface-soft text-echo-text-muted hover:bg-echo-accent hover:text-black transition">🔍</button>
          <button className="p-2 rounded-full bg-echo-surface-soft text-echo-text-muted hover:bg-echo-accent hover:text-black transition">➖</button>
          <button className="p-2 rounded-full bg-echo-surface-soft text-echo-text-muted hover:bg-echo-accent hover:text-black transition">➕</button>
          <button className="p-2 rounded-full bg-echo-surface-soft text-echo-text-muted hover:bg-echo-accent hover:text-black transition">⤢</button>
        </div>
        <div className="flex gap-4 items-center">
          <span className="inline-block px-3 py-1 rounded-echo-pill bg-echo-accent text-black text-xs font-semibold">Universe</span>
          <span className="inline-block px-3 py-1 rounded-echo-pill bg-echo-gold text-black text-xs font-semibold">Character</span>
          <span className="inline-block px-3 py-1 rounded-echo-pill bg-echo-surface-soft text-echo-text-muted text-xs font-semibold">Event</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Graph Placeholder */}
        <EchoPanel header={<span>Graph Area</span>} className="col-span-2">
          <div className="h-64 flex items-center justify-center text-echo-text-muted text-lg">
            Graph will render here.
          </div>
        </EchoPanel>
        {/* Selected Node Panel */}
        <EchoPanel header={<span>Selected Node</span>} className="">
          <div className="space-y-2">
            <div className="font-bold text-echo-accent">Character: Paulo Davinci</div>
            <div className="text-xs text-echo-text-muted">Role: Prisoner, Hurricane Prophet</div>
            <div className="text-xs text-echo-text-muted">Universe: Wolves</div>
            <div className="mt-2 text-sm text-echo-text">“The night the hurricane found a conscience.”</div>
            <div className="mt-4 flex gap-2">
              <span className="inline-block px-2 py-0.5 rounded-echo-pill bg-echo-accent text-black text-xs font-semibold">Wolves</span>
              <span className="inline-block px-2 py-0.5 rounded-echo-pill bg-echo-gold text-black text-xs font-semibold">Protagonist</span>
            </div>
          </div>
        </EchoPanel>
      </div>
    </div>
  );
}
