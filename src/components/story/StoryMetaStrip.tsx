// src/components/story/StoryMetaStrip.tsx

export default function StoryMetaStrip() {
  return (
    <section className="border-t border-b border-white/10 bg-gradient-to-r from-slate-950 via-black to-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 text-xs text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:text-[11px]">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="rounded-full border border-amber-400/60 bg-amber-400/10 px-3 py-1 font-semibold tracking-[0.2em] text-amber-200 uppercase">
            Wolves // Prologue
          </span>
          <span className="hidden h-3 w-px bg-slate-600 sm:inline-block" />
          <span className="uppercase tracking-[0.18em] text-slate-400">
            Location:{" "}
            <span className="font-medium text-slate-100">
              Echo House, Gulf Coast
            </span>
          </span>
          <span className="hidden h-3 w-px bg-slate-600 sm:inline-block" />
          <span className="uppercase tracking-[0.18em] text-slate-400">
            Weather:{" "}
            <span className="font-medium text-cyan-200">
              Category 4 Hurricane
            </span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <span className="uppercase tracking-[0.18em] text-slate-400">
            Timeline:{" "}
            <span className="font-medium text-slate-100">
              Night of the First Investigation
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
