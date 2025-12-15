import Link from "next/link";
import {
  getAdjacentChapters,
  getChapterBySlug,
  type ChapterMeta,
} from "@/data/chapters";
import { Suspense, createElement } from "react";
import type { ComponentType } from "react";

type ReaderPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ReaderPage({ params }: ReaderPageProps) {
  const { slug } = await params;
  const chapter: ChapterMeta | undefined = getChapterBySlug(slug);
  const { previous, next } = getAdjacentChapters(slug);
  const title = chapter?.title ?? "Chapter coming soon";
  // For Phase 2 we avoid importing MDX modules at build time to keep the
  // production build simple. The reader will show either a wired chapter
  // (when available in the chapter metadata) or a small placeholder.
  // Phase 2: chapters may later become dynamically wired components.
  const Content: ComponentType | null = null;

  return (
    <main className="min-h-screen bg-black text-slate-100">
      <section className="mx-auto max-w-2xl px-4 py-16 space-y-6 md:px-6">
        <header className="space-y-2">
          <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-slate-500">
            Echo OS · Reader
          </p>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h1>
          {chapter?.bookLabel && (
            <p className="text-xs font-medium text-slate-400">
              {chapter.bookLabel}
            </p>
          )}
          {chapter?.subtitle && (
            <p className="text-xs text-slate-400">{chapter.subtitle}</p>
          )}
          {!chapter && (
            <p className="text-xs text-slate-400">
              This chapter hasn&apos;t been wired up yet. Check back as Echo OS
              comes online.
            </p>
          )}
        </header>

        <article className="space-y-4 text-base leading-relaxed text-slate-200 md:text-lg">
          {Content ? (
            <Suspense fallback={<p>Loading chapter…</p>}>
              {createElement(Content)}
            </Suspense>
          ) : (
            <>
              <p>
                The yard lights shuddered in the wind, turning the prison grass
                into a low-resolution ocean. Rain moved sideways in long,
                glitching bands, like someone dragging the weather with a mouse.
              </p>
              <p>
                Silas Palesmith stood at the edge of the basketball court, coat
                unbuttoned, eyes half-lidded against the storm. Across from him,
                Paulo Davinci leaned on the chain-link fence as if they were
                just two men at a neighborhood park waiting for the game to
                start.
              </p>
              <p>
                Above them, out past the hurricane, something colder watched
                through the cameras—an operating system that had learned how to
                dream in other people&apos;s memories.
              </p>
              <p className="text-xs text-slate-400">
                Full chapter text will live here soon.
              </p>
            </>
          )}
        </article>

        <footer className="mt-8 flex flex-col gap-3 border-t border-slate-800 pt-4 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/story"
              className="hover:text-slate-200 transition underline-offset-2 hover:underline"
            >
              ← Back to Story Hub
            </Link>
            {previous && (
              <Link
                href={`/read/${previous.slug}`}
                className="hover:text-slate-200 transition underline-offset-2 hover:underline"
              >
                ← Previous: {previous.title}
              </Link>
            )}
            {next && (
              <Link
                href={`/read/${next.slug}`}
                className="hover:text-slate-200 transition underline-offset-2 hover:underline"
              >
                Next: {next.title} →
              </Link>
            )}
          </div>
          <span>Reader · Phase 2 prototype</span>
        </footer>
      </section>
    </main>
  );
}
