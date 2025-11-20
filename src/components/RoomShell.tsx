import React from 'react';
import Link from 'next/link';

export default function RoomShell({ title, kicker, description }: { title?: string; kicker?: string; description?: string }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {kicker && <p className="text-sm text-slate-400">{kicker}</p>}
        {title && <h1 className="text-3xl font-semibold mt-2">{title}</h1>}
        {description && <p className="mt-4 text-slate-300">{description}</p>}
        <div className="mt-8">
          <Link href="/gateway" className="text-cyan-300 underline">Exit to Gateway</Link>
        </div>
      </div>
    </main>
  );
}
