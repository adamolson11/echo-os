import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#05070b] via-[#020309] to-black text-white flex items-center justify-center px-6">
      <section className="mx-auto w-full max-w-4xl text-center py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
          STORYWORLD OS
        </p>

        <h1 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight uppercase">
          Echo OS
        </h1>

        <p className="mt-4 text-sm md:text-base text-white/80 max-w-2xl mx-auto">
          A haunted operating system for Wolves in the Echo House.
        </p>

        <div className="mt-10 flex items-center justify-center gap-6">
          <Link href="/gateway" className="relative z-10">
            <span className="relative inline-flex items-center rounded-full bg-skyblue px-8 py-3 text-sm font-semibold text-black shadow-lg hover:brightness-105 transition">
              Enter the House
            </span>
          </Link>

          <Link href="/codex" className="text-sm text-white/70 hover:text-white">
            View Codex
          </Link>
        </div>

        {/* soft portal glow */}
        <div className="pointer-events-none mt-6 flex justify-center">
          <div className="absolute bottom-24 h-36 w-36 rounded-full bg-gradient-to-t from-[#0ea5a4]/10 to-transparent blur-3xl opacity-60" />
        </div>
      </section>
    </main>
  );
}
