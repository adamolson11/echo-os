import { notFound } from "next/navigation";
import { chapterMetaBySlug } from "@/config/story";
import { GraphNotesPanel } from "@/components/story/GraphNotesPanel";
import { PrologueContent } from "@/components/story/PrologueContent";
import { ChapterTOC } from "@/components/story/ChapterTOC";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const chapter = chapterMetaBySlug[slug];

  if (!chapter) {
    return notFound();
  }

  const isPrologue = chapter.kind === "prologue";
  const isNumbered = chapter.kind === "chapter";

  return (
    <article className="space-y-4">
      <header className="space-y-1">
        <p className="text-xs text-zinc-500 uppercase tracking-wide">
          Wolves in the Echo House
        </p>
        <h1 className="text-xl font-semibold">
          {chapter.title}
          {isNumbered && chapter.number
            ? ` (Chapter ${chapter.number})`
            : null}
        </h1>
        {chapter.notes && (
          <p className="text-xs text-zinc-500 max-w-xl">{chapter.notes}</p>
        )}
      </header>

      <section className="prose prose-invert prose-sm max-w-none">
        {isPrologue ? (
          <PrologueContent />
        ) : (
          <p className="text-zinc-400 text-sm">
            This is a placeholder for the chapter text. Adam will paste the
            actual prose here later, and we&apos;ll attach echo graph links once the
            Narrative OS evolves.
          </p>
        )}
      </section>

      <GraphNotesPanel chapter={chapter} />
      <ChapterTOC currentSlug={slug} />
    </article>
  );
}
