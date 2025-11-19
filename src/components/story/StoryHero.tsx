// src/components/story/StoryHero.tsx

export default function StoryHero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden border-b border-white/5 bg-gradient-to-b from-slate-950 via-black to-slate-950">
      {/* Cyan lightning band */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.24),_transparent_75%)]" />

      {/* Subtle rain / noise texture suggestion via columns */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-8 opacity-[0.06]">
        <div className="bg-white/10" />
        <div />
        <div className="bg-white/10" />
        <div />
        <div className="bg-white/10" />
        <div />
        <div className="bg-white/10" />
        <div />
      </div>

      {/* Floor vignette */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-4 py-20">
        <div className="max-w-2xl space-y-4">
          <p className="text-xs font-medium tracking-[0.25em] text-amber-300/80">
            STORY ROOM // WOLVES IN THE ECHO HOUSE
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
            The storm starts here.
          </h1>
          <p className="text-base sm:text-lg text-slate-200/85 leading-relaxed">
            A Floridian gothic entrance into the Wolves chronology. Outside, a
            hurricane tears at the coast. Inside, the house waits with its own
            weather of guilt, memory, and recursion.
          </p>

          <div className="pt-4 border-t border-white/10 mt-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400/80">
              PROLOGUE
            </p>
            <p className="mt-2 text-sm text-slate-200/85">
              Tonight is the night Silas Palesmith steps back into the Echo
              House—and nothing he remembers about it is quite true.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
