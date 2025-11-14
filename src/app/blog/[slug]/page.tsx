import { notFound } from "next/navigation";

const postsMeta: Record<
  string,
  { title: string; date: string; tag: string; summary: string }
> = {
  "google-it-notes-module-1": {
    title: "Google IT Cert – Technical Support Fundamentals (Module 1)",
    date: "2025-11-10",
    tag: "study",
    summary: "High-level notes on the first module of the Google IT cert.",
  },
  "swing-trading-sanity-check": {
    title: "Swing Trading and Sanity",
    date: "2025-11-08",
    tag: "finance",
    summary:
      "Thinking about risk, discipline, and not blowing up my Roth IRA.",
  },
  "building-echo-os-mvp": {
    title: "Building Echo OS – MVP Shell",
    date: "2025-11-14",
    tag: "build-log",
    summary:
      "How Im assembling the first version of my Narrative OS.",
  },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const meta = postsMeta[params.slug];
  if (!meta) return notFound();

  return (
    <article className="space-y-4">
      <header className="space-y-1">
        <p className="text-xs text-zinc-500 uppercase tracking-wide">Blog</p>
        <h1 className="text-xl font-semibold">{meta.title}</h1>
        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
          <span>{formatDate(meta.date)}</span>
          <span className="px-2 py-0.5 rounded-full border border-white/15 text-zinc-300">
            {meta.tag}
          </span>
        </div>
        <p className="text-xs text-zinc-500 max-w-2xl">{meta.summary}</p>
      </header>

      <section className="prose prose-invert prose-sm max-w-none">
        <p className="text-zinc-400 text-sm">
          This is a placeholder for the full post content. I&apos;ll paste real notes or essays
          here later, or migrate to MDX when the Narrative OS grows up.
        </p>
      </section>
    </article>
  );
}
