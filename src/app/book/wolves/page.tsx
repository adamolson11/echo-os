import Link from "next/link";
import { portals } from "@/data/portals";
import { getChaptersForPortal } from "@/data/chapters";

const wolvesPortal = portals.find((p) => p.slug === "wolves");
const chapters = getChaptersForPortal("wolves");

export default function WolvesPortalPage() {
  if (!wolvesPortal) return <div>Portal not found.</div>;
  return (
    <main className="min-h-screen bg-black text-slate-100">
      <section className="mx-auto max-w-3xl px-4 py-16 space-y-6">
        <header className="space-y-2">
          <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-500">
            Echo OS · Book Portal
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {wolvesPortal.title}
          </h1>
          <p className="text-sm text-slate-300 md:text-base">{wolvesPortal.tagline}</p>
        </header>
        <section className="space-y-3">
          <Link
            href={`/read/prologue`}
            className="inline-block rounded-lg bg-sky-700 px-4 py-2 text-white font-semibold shadow hover:bg-sky-600"
          >
            Start Reading (Prologue)
          </Link>
        </section>
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Chapters in this book
          </h2>
          <ul className="list-disc pl-4">
            {chapters.map((chapter) => (
              <li key={chapter.slug}>
                <Link href={`/read/${chapter.slug}`} className="text-sky-300 hover:underline">
                  {chapter.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <footer className="mt-8 flex justify-between border-t border-slate-800 pt-4 text-xs text-slate-500">
          <Link href="/story" className="hover:text-slate-200 transition">
            ← Back to Portal Hub
          </Link>
          <span>Book portal · Early draft</span>
        </footer>
      </section>
    </main>
  );
}
