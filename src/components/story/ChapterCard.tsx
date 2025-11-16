import Link from "next/link";
import type { ChapterMeta } from "@/data/chapters";

interface ChapterCardProps {
  chapter: ChapterMeta;
}

export default function ChapterCard({ chapter }: ChapterCardProps) {
  return (
    <Link
      href={`/read/${chapter.slug}`}
      className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-black/40 p-4 text-left shadow-[0_0_40px_rgba(0,0,0,0.7)] transition hover:border-skyblue/70 hover:bg-black/70 hover:shadow-[0_0_60px_rgba(56,189,248,0.3)]"
    >
      <div className="space-y-1">
        {chapter.bookLabel && (
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-skyblue/80">
            {chapter.bookLabel}
          </p>
        )}
        <h3 className="text-sm font-semibold tracking-tight text-zinc-50 md:text-base">
          {chapter.title}
        </h3>
        {chapter.subtitle && (
          <p className="text-[11px] text-zinc-300 line-clamp-2">
            {chapter.subtitle}
          </p>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400">
        <span className="inline-flex items-center gap-1 text-skyblue/80">
          Read chapter
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
          {chapter.status === "published" ? "Live" : "Draft"}
        </span>
      </div>
    </Link>
  );
}
