import Link from "next/link";

export default function GatewayHero() {
  return (
    <section className="py-16 px-6 sm:px-12 lg:px-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1">
          <p className="text-xs font-semibold tracking-[0.3em] text-amber-300/80">ECHO OS // LIVING CODEX</p>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">Step into the brain of your universes.</h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-300">Cinematic entry to stories, codex, lab and archives — choose a door and begin.</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/gateway" className="inline-block bg-amber-400 text-slate-900 font-semibold px-5 py-3 rounded-md shadow hover:scale-105 transition-transform">Enter the Hall</Link>
            <Link href="/read/wolves" className="inline-block border border-slate-300 text-white px-5 py-3 rounded-md hover:bg-slate-700 transition-colors">Read Wolves</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
