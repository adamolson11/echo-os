export default function LabPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-50">
      <section className="mx-auto max-w-5xl px-4 py-16 space-y-6">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300/80 mb-2">
            Echo Lab
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Experimental Systems
          </h1>
          <p className="text-zinc-300 mt-3">
            Where new mechanics, Codex engines, and Echo OS prototypes get
            stress-tested.
          </p>
        </header>

        <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-sky-900/60 to-emerald-800/50 border border-sky-800/70 flex items-center justify-center">
          <span className="text-zinc-500 text-sm">
            Lab monitors / console visualization placeholder.
          </span>
        </div>
      </section>
    </main>
  );
}
export default function LabRoomPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
      <div className="max-w-3xl space-y-4 text-center px-6 py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Room: Lab</p>
        <h1 className="text-4xl font-semibold">Lab Room</h1>
        <p className="text-sm text-slate-400">Placeholder room. This will later host experimentation tools and utilities.</p>
      </div>
    </main>
  );
}

