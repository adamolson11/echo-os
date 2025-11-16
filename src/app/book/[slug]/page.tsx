import Link from "next/link";
import { notFound } from "next/navigation";
import { portals, type Portal } from "@/data/portals";
import {
  chapters,
  type ChapterMeta,
  getChaptersForPortal,
} from "@/data/chapters";
import ChapterCard from "@/components/story/ChapterCard";

type BookPageProps = {
  params: Promise<{ slug: string }>;
};

function getFirstChapterForPortal(slug: string): ChapterMeta | undefined {
  if (slug === "wolves") {
    return chapters[0];
  }

  return undefined;
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params;
  const portal: Portal | undefined = portals.find((p) => p.slug === slug);

  if (!portal) {
    return notFound();
  }

  const firstChapter: ChapterMeta | undefined = getFirstChapterForPortal(
    portal.slug,
  );

  const bookChapters = getChaptersForPortal(portal.slug);

  return (
    <main className="min-h-screen bg-black text-slate-100">
      <section className="mx-auto max-w-3xl px-4 py-16 space-y-6">
        <header className="space-y-2">
          <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-500">
            Echo OS · Story Portal
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {portal.title}
          </h1>
          {portal.bookLabel && (
            <p className="text-xs font-medium text-slate-400">
              {portal.bookLabel}
            </p>
          )}
          <p className="text-sm text-slate-300 md:text-base">{portal.tagline}</p>
        </header>

        <section className="space-y-3 text-sm text-slate-300">
          <p>
            This is a portal landing page for this arc. As the universe
            expands, this screen will collect chapters, codex entries, and
            related media for this book.
          </p>
          {firstChapter && (
            <p>
              You can start reading at the beginning of this arc:
              <br />
              <Link
                href={`/read/${firstChapter.slug}`}
                className="mt-1 inline-flex text-sky-300 hover:text-sky-200 hover:underline"
              >
                Start with {firstChapter.title}
              </Link>
            </p>
          )}
        </section>

        {bookChapters.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Chapters in this book
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {bookChapters.map((chapter) => (
                <ChapterCard key={chapter.slug} chapter={chapter} />
              ))}
            </div>
          </section>
        )}

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
