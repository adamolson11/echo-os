import Link from 'next/link';
import React from 'react';

function DoorCard({ href, label, subtitle }: { href: string; label: string; subtitle?: string }) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-slate-700/70 bg-gradient-to-b from-slate-900/70 to-black/80 backdrop-blur-sm shadow-lg flex flex-col justify-between p-5 h-52"
    >
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Door</p>
        <h2 className="text-xl font-semibold group-hover:translate-x-1 transition-transform">{label}</h2>
        {subtitle && <p className="text-xs text-slate-300">{subtitle}</p>}
      </div>
      <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-700/60">
        <span>Enter</span>
        <span className="group-hover:translate-x-1 transition-transform">↳</span>
      </div>
    </Link>
  );
}

export default function GatewayPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-slate-100 flex items-center justify-center px-4">
      <div className="max-w-6xl w-full space-y-10">
        <header className="text-center space-y-4">
          <p className="text-xs tracking-[0.3em] uppercase text-slate-400">House of Echo</p>
          <h1 className="text-3xl md:text-5xl font-semibold">Walk the Hallway.</h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto">Three doors. Three rooms. One storm-battered house on the coast of your mind.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DoorCard href="/story" label="Story Room" subtitle="The narrative heart." />
          <DoorCard href="/codex" label="Codex Room" subtitle="The living meaning-map." />
          <DoorCard href="/archive" label="Archive" subtitle="Server-church memory vault." />
        </section>
      </div>
    </main>
  );
}
