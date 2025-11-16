import Link from "next/link";
import { portals } from "@/data/portals";

export default function PortalHubPage() {
  return (
    <main className="min-h-screen bg-black text-slate-100">
      <header className="mx-auto max-w-3xl px-4 py-8 text-center">
        <h1 className="text-2xl font-semibold">Echo OS · Portal Hub</h1>
        <nav className="mt-3">
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-200">
            Back to Home
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <p className="text-center text-sm text-slate-400 mb-6">Choose a book-world to enter.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portals.map((portal) => (
            <Link key={portal.slug} href={`/book/${portal.slug}`} className="block">
              <div className="h-full rounded-xl border border-slate-800 bg-slate-900/50 p-4 hover:border-slate-300 transition">
                <div className="flex items-start justify-between">
                  <div>
                    <strong className="text-slate-100">{portal.title}</strong>
                    <div className="mt-1 text-sm text-slate-400">{portal.tagline}</div>
                  </div>
                  <div>
                    {portal.live ? (
                      <span className="inline-block rounded-full bg-emerald-600/80 px-2 py-0.5 text-[11px] font-medium text-black">Live</span>
                    ) : (
                      <span className="inline-block rounded-full bg-slate-700 px-2 py-0.5 text-[11px] text-slate-300">Not live</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
