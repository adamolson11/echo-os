import Link from "next/link";
import StoryCarousel from "@/components/story/StoryCarousel";

export default function StoryPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-skyblue/80">
          Story Mode · Echo OS
        </p>
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
          Wolves in the Echo House & Other Processes
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl">
          Echo OS is a living bookshelf disguised as an operating system. Each
          arc is a different process running in the same haunted machine —
          detectives, farmers, priests, and insurgent AIs all sharing memory
          space.
        </p>
      </header>

      <section className="space-y-3 text-xs text-zinc-400">
        <p className="font-semibold text-zinc-300">How to read this:</p>
        <ul className="list-disc space-y-1 pl-4">
          <li>
            Start with{" "}
            <Link
              href="/story/chapters/prologue"
              className="text-skyblue hover:underline"
            >
              Wolves in the Echo House – Book I
            </Link>{" "}
            if you want the core detective myth.
          </li>
          <li>
            Visit <span className="text-zinc-200">Future Farm</span> when you
            want to glimpse the utopian counterspell.
          </li>
          <li>
            Open <span className="text-zinc-200">Devil&apos;s Palimpsest</span>{" "}
            if you want to read the virus itself.
          </li>
        </ul>
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
