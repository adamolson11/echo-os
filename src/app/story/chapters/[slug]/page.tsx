import { notFound } from "next/navigation";

const chapterMeta: Record<
  string,
  { title: string; number?: number; notes?: string }
> = {
  prologue: {
    title: "Prologue",
    notes: "Opening fracture of Wolves in the Echo House.",
  },
  epilogue: {
    title: "Epilogue",
    notes: "Where the echoes settle, for now.",
  },
  // later: "chapter-1": { title: "Chapter 1", number: 1, ... }
};

export default function ChapterPage({
  params,
}: {
  params: { slug: string };
}) {
  const meta = chapterMeta[params.slug];
  if (!meta) return notFound();

  return (
    <article className="space-y-4">
      <header className="space-y-1">
        <p className="text-xs text-zinc-500 uppercase tracking-wide">
          Wolves in the Echo House
        </p>
        <h1 className="text-xl font-semibold">
          {meta.title}
          {meta.number ? ` (Chapter ${meta.number})` : null}
        </h1>
        {meta.notes && (
          <p className="text-xs text-zinc-500 max-w-xl">{meta.notes}</p>
        )}
      </header>

      <section className="prose prose-invert prose-sm max-w-none">
        <p className="text-zinc-400 text-sm">
          This is a placeholder for the chapter text. Adam will paste the actual
          prose here, and later well add cross-links and echo graph notes.
        </p>
      </section>

      <aside className="border border-white/10 rounded-2xl bg-black/20 p-3">
        <h2 className="text-xs font-semibold text-zinc-300 mb-1">
          Links & Notes
        </h2>
        <p className="text-xs text-zinc-500">
          Future: connections to characters, locations, and artifacts will appear
          here as graph-like links.
        </p>
      </aside>
    </article>
  );
}
