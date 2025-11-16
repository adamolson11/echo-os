import { notFound } from "next/navigation";
import Link from "next/link";
import { portals } from "@/data/portals";

interface BookPageProps {
  params: { slug: string };
}

const FIRST_CHAPTER_BY_PORTAL: Record<string, string | undefined> = {
  wolves: "prologue",
};

export default function BookPage({ params }: BookPageProps) {
  const portal = portals.find((p) => p.slug === params.slug);

  if (!portal) return notFound();

  const firstChapterSlug = FIRST_CHAPTER_BY_PORTAL[portal.slug];
  const isLive = portal.slug === "wolves";

  return (
    <main className="min-h-screen bg-black text-slate-200">
      <div className="mx-auto max-w-2xl p-6">
        <nav className="mb-4">
          <Link href="/hub" className="text-slate-400 hover:text-slate-200">← Back to Portal Hub</Link>
        </nav>

        <header className="mb-6">
          <h1 className="text-3xl font-semibold">{portal.title}</h1>
          <p className="mt-2 text-sm text-slate-400">{portal.tagline}</p>
        </header>

        <section>
          {isLive ? (
            <>
              <p className="text-slate-200">This book is live. You can start reading now.</p>
              {firstChapterSlug && (
                <p className="mt-3">
                  <Link href={`/read/${firstChapterSlug}`} className="inline-flex rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-sky-300 hover:bg-white/2">Start Reading</Link>
                </p>
              )}

              <h2 className="mt-6 text-sm font-semibold text-slate-300">Main Spine</h2>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link href="/read/prologue" className="text-slate-100 hover:underline">Prologue — The Hurricane Yard</Link>
                </li>
                <li>
                  <Link href="/read/chapter-one" className="text-slate-100 hover:underline">Chapter One — Wolves in the Echo House</Link>
                </li>
                {/* Future: more chapters */}
              </ul>
            </>
          ) : (
            <p className="text-slate-400">This portal is not live yet. The book is still being written and structured in the Codex.</p>
          )}
        </section>
      </div>
    </main>
  );
}
