export default function ArchiveRoomPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
      <div className="max-w-3xl space-y-4 text-center px-6 py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Room: Archive</p>
        <h1 className="text-4xl font-semibold">Archive Room</h1>
        <p className="text-sm text-slate-400">Placeholder room. This will later host archival content and artifacts.</p>
      </div>
    </main>
  );
}
export default function ArchivePage() {
  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight">Archive // Echo Graph</h1>
        <p className="text-sm text-zinc-400 max-w-2xl">
          This will become the lore vault: character nodes, timelines, artifacts, and strange
          forward-like essays that don&apos;t sit neatly in the chapter order.
        </p>
      </header>

      <section className="border border-dashed border-white/15 rounded-2xl bg-black/10 p-4">
        <p className="text-xs text-zinc-500">
          For now, this is just a placeholder. Soon, it will list artifacts and echo nodes
          with links into the story and blog.
        </p>
      </section>
    </div>
  );
}
