import Link from 'next/link';
import React from 'react';

export default function DoorCard({ href, label, subtitle }: { href: string; label: string; subtitle?: string }) {
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
