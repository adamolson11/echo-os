export default function StoryRoomPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
      <div className="max-w-3xl space-y-4 text-center px-6 py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Room: Story</p>
        <h1 className="text-4xl font-semibold">Story Wing</h1>
        <p className="text-sm text-slate-400">Placeholder room. This will later host the arcs / chapters index.</p>
      </div>
    </main>
  );
}
import Link from "next/link";
import StoryCarousel from "@/components/story/StoryCarousel";
import { chapters } from "@/data/chapters";
import { portals } from "@/data/portals";
import ChapterCard from "@/components/story/ChapterCard";

const chapterCards = chapters.slice(0, 2);

export default function StoryPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-skyblue/80">
          Story Mode · Echo OS
        </p>
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Portal Graph · Echo OS Arcs
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl">
          Seven major processes run inside this haunted operating system.
          Choose a portal to step into a book, then follow the chapters and
          codex entries as they light up.
        </p>
      </header>

      <section className="space-y-3 text-xs text-zinc-400">
        <p className="font-semibold text-zinc-300">How to read this:</p>
        <ul className="list-disc space-y-1 pl-4">
          <li>
            Start with the Wolves portal if you want the core detective myth.
          </li>
          <li>
            Visit the Future Farm portals when you want to glimpse the
            counterspell.
          </li>
          <li>
            Open the Devil&apos;s books when you&apos;re ready for the virus text and
            its commentaries.
          </li>
        </ul>
      </section>

      {/* Portal nodes + Graph Mode */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6 md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.08),transparent_60%),radial-gradient(circle_at_bottom,_rgba(147,51,234,0.08),transparent_55%)]" />
        <div className="relative mb-4 flex justify-end">
          <Link
            href="/map"
            className="inline-flex items-center gap-1 rounded-full border border-skyblue/40 bg-black/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-skyblue/80 shadow-[0_0_30px_rgba(56,189,248,0.25)] transition hover:border-skyblue/80 hover:text-sky-100"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-skyblue/80 shadow-[0_0_12px_rgba(56,189,248,0.9)]" />
            Graph Mode
          </Link>
        </div>
        <div className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {portals.map((portal) => (
            <Link
              key={portal.slug}
              href={`/book/${portal.slug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-4 shadow-[0_0_40px_rgba(0,0,0,0.7)] transition hover:border-skyblue/70 hover:bg-black/80 hover:shadow-[0_0_60px_rgba(56,189,248,0.3)]"
            >
              <div className="absolute inset-0 opacity-40 mix-blend-screen">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(147,51,234,0.3),transparent_55%)]" />
              </div>
              <div className="relative space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-skyblue/80">
                  {portal.bookLabel ?? "Echo OS Arc"}
                </p>
                <h2 className="text-sm font-semibold tracking-tight text-zinc-50 md:text-base">
                  {portal.title}
                </h2>
                <p className="text-[11px] text-zinc-300 line-clamp-2">
                  {portal.tagline}
                </p>
              </div>
              <div className="relative mt-4 flex items-center justify-between text-[11px] font-medium text-skyblue/80">
                <span className="inline-flex items-center gap-1">
                  Open portal
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  Story Portal
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {chapterCards.map((chapter) => (
          <ChapterCard key={chapter.slug} chapter={chapter} />
        ))}
      </section>

      <StoryCarousel variant="full" />

      <section className="border border-white/10 bg-black/30 p-4 rounded-2xl mt-4 space-y-2">
        <h2 className="text-xs font-semibold text-zinc-300 uppercase tracking-[0.2em]">
          Grounding
        </h2>
        <p className="text-xs text-zinc-400">
          You are reading words on a screen. You can pause, breathe, and come
          back anytime.
        </p>
      </section>
    </div>
  );
}
