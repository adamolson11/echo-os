export type StorySlug = "prologue" | `chapter-${string}` | "epilogue";

export type ChapterKind = "prologue" | "chapter" | "epilogue";

export interface ChapterMeta {
  slug: StorySlug;
  title: string;
  kind: ChapterKind;
  number?: number; // 1–44 for numbered chapters
  notes?: string;
}

const NUMBER_OF_CHAPTERS = 44;

const prologue: ChapterMeta = {
  slug: "prologue",
  title: "Prologue",
  kind: "prologue",
  notes: "Opening fracture of Wolves in the Echo House.",
};

const epilogue: ChapterMeta = {
  slug: "epilogue",
  title: "Epilogue",
  kind: "epilogue",
  notes: "Where the echoes settle, for now.",
};

const numberedChapters: ChapterMeta[] = Array.from(
  { length: NUMBER_OF_CHAPTERS },
  (_, index) => {
    const number = index + 1;
    const slugNumber = String(number).padStart(2, "0");

    return {
      slug: `chapter-${slugNumber}` as StorySlug,
      title: `Chapter ${number}`,
      kind: "chapter" as const,
      number,
      notes: "Placeholder chapter. Text coming soon.",
    } satisfies ChapterMeta;
  }
);

export const chaptersInOrder: ChapterMeta[] = [
  prologue,
  ...numberedChapters,
  epilogue,
];

export const chapterMetaBySlug: Record<string, ChapterMeta> =
  chaptersInOrder.reduce((acc, chapter) => {
    acc[chapter.slug] = chapter;
    return acc;
  }, {} as Record<string, ChapterMeta>);
