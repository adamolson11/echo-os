// src/components/story/ChapterLayout.tsx

import Link from "next/link";

type ChapterLayoutProps = {
  title: string;
  subtitle?: string;
  intensity?: string;
  children: React.ReactNode;
};

export function ChapterLayout({ title, subtitle, intensity, children }: ChapterLayoutProps) {
  return (
    <div className="space-y-6">
      <header className="space-y-2 border-b border-white/10 pb-4">
        <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-skyblue/80">
          Story Mode · Echo OS
        </p>
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h1>
        {subtitle && (
          <p className="text-xs text-zinc-400 max-w-2xl">{subtitle}</p>
        )}
        {intensity && (
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            Intensity: <span className="text-amber-300">{intensity}</span>
          </p>
        )}
      </header>

      <main className="grid gap-8 lg:grid-cols-[minmax(0,2.5fr),minmax(0,1fr)]">
        <article className="space-y-4 text-sm leading-relaxed text-zinc-200">
          {children}

          <div className="mt-6 border-t border-white/10 pt-4 text-xs text-zinc-400 flex flex-wrap items-center justify-between gap-2">
            <p>
              You are reading words on a screen. You can pause, breathe, and come
              back anytime.
            </p>
            <Link
              href="/story"
              className="text-skyblue hover:text-skyblue/80 underline-offset-2 hover:underline"
            >
              ← Back to Story Mode
            </Link>
          </div>
        </article>

        <aside className="space-y-3 rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-zinc-400">
          <p className="font-semibold text-zinc-300 uppercase tracking-[0.2em]">
            Echo Notes
          </p>
          <p>
            This is an imagined universe. None of this is happening to you. The
            goal is to give your mind a safe haunted house to walk through
            deliberately.
          </p>
          <p>
            If any scene feels too intense, you can always close the tab, take
            a walk, or jump back to the Hub.
          </p>
        </aside>
      </main>
    </div>
  );
}
