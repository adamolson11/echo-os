import { notFound } from "next/navigation";
import { chapterMetaBySlug } from "@/config/story";
import { GraphNotesPanel } from "@/components/story/GraphNotesPanel";
import { ChapterTOC } from "@/components/story/ChapterTOC";
import { ChapterLayout } from "@/components/story/ChapterLayout";
import { PrologueStub } from "@/components/story/PrologueStub";

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
    <ChapterLayout
      title={chapter.title}
      subtitle={chapter.notes}
      intensity={isPrologue ? "Haunting" : undefined}
    >
      {isPrologue ? (
        <PrologueStub />
      ) : (
        <p>
          This is a placeholder for the chapter text. The full prose for this
          chapter will live here once it&apos;s drafted, using this same reading
          layout.
        </p>
      )}

      <div className="mt-8 space-y-4">
        <GraphNotesPanel chapter={chapter} />
        <ChapterTOC currentSlug={slug} />
      </div>
    </ChapterLayout>
  );
}
