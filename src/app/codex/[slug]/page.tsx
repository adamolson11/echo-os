import type { Metadata } from "next";
import Link from "next/link";
import { getCodexSlugs, getCodexNode } from "@/lib/codex";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const slugs = getCodexSlugs();
  const params: { slug: string }[] = [];

  for (const s of slugs) {
    try {
      const node = await getCodexNode(s);
      if (node && node.slug) {
        params.push({ slug: node.slug });
      }
    } catch (err) {
      // Skip files that fail to parse; they won't be prerendered.
      // This keeps the build resilient to malformed frontmatter.
      console.warn(`Skipping codex file for static params: ${s}`, err);
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const node = await getCodexNode(params.slug);
  return {
    title: `${node.title} | Codex`,
  };
}

export default async function CodexNodePage({ params }: Props) {
  const node = await getCodexNode(params.slug);

  const obsidianHref =
    node.obsidianFile && node.obsidianVault
      ? `obsidian://open?vault=${encodeURIComponent(node.obsidianVault)}&file=${encodeURIComponent(
          node.obsidianFile
        )}`
      : null;

  return (
    <main className="min-h-screen bg-black text-slate-200">
      <section className="max-w-3xl mx-auto p-6 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-3xl font-semibold tracking-wide">{node.title}</h1>
            {node.type && (
              <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-white/60">
                {node.type}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
            <Link href="/codex" className="underline-offset-4 hover:underline">
              ← Back to Codex
            </Link>

            {obsidianHref && (
              <a href={obsidianHref} className="underline-offset-4 hover:underline">
                Open in Obsidian
              </a>
            )}

            {node.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {node.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/60">#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:underline-offset-4 prose-a:hover:underline"
          dangerouslySetInnerHTML={{ __html: node.contentHtml }}
        />

        {node.backlinks.length > 0 && (
          <section className="border-t border-white/10 pt-6">
            <h2 className="text-sm font-semibold tracking-[0.14em] uppercase text-white/60">Backlinks</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {node.backlinks.map((b) => (
                <li key={b.id}>
                  <Link href={`/codex/${encodeURIComponent(b.slug)}`} className="underline-offset-4 hover:underline">
                    {b.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>
    </main>
  );
}
