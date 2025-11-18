import Link from "next/link";

export default function GatewayHero() {
  return (
    <section className="relative flex min-h-[60vh] flex-col justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-8 py-10">
      {/* background layer (placeholder) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-slate-900/40 to-black/40" />

      <div className="relative z-10 max-w-xl space-y-4 mx-auto text-center sm:text-left">
        <p className="text-xs font-semibold tracking-[0.3em] text-sky-400/80">ECHO OS // LIVING CODEX</p>
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-50">
          Step into the brain of your universes.
        </h1>
        <p className="text-sm md:text-base text-slate-300/80">
          Enter the Codex graph, step through the Wolves doorway, or descend into the Lab.
        </p>

        <div className="mt-4 flex flex-col sm:flex-row gap-3 items-center sm:items-start">
          <Link
            href="/codex"
            className="inline-flex items-center rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400 transition"
          >
            Enter the Codex
          </Link>

          <Link
            href="/story/wolves"
            className="inline-flex items-center rounded-full border border-slate-500/70 px-4 py-2 text-sm font-medium text-slate-200 hover:border-sky-400/70 hover:text-sky-200 transition"
          >
            Read Wolves in the Echo House
          </Link>
        </div>
      </div>
    </section>
  );
}
