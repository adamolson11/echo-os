"use client";
export default function ArchivePage() {
  return (
    <main className="min-h-screen bg-black text-zinc-50">
      <section className="mx-auto max-w-5xl px-4 py-16 space-y-6">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/80 mb-2">Archive</p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Dead Files & Redacted Branches</h1>
          <p className="text-zinc-300 mt-3">Old cases, abandoned timelines, and artifacts the Echo House refuses to forget.</p>
        </header>

        <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-800/60 flex items-center justify-center">
          <span className="text-zinc-500 text-sm">Archive shelves / file grid visual placeholder.</span>
        </div>
      </section>
    </main>
  );
}
