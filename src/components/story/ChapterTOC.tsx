import Link from "next/link";
import { chaptersInOrder, type ChapterMeta } from "@/config/story";

interface ChapterTOCProps {
  currentSlug: string;
}

export function ChapterTOC({ currentSlug }: ChapterTOCProps) {
  const index = chaptersInOrder.findIndex((ch) => ch.slug === currentSlug);
  if (index === -1) return null;

  const prev = index > 0 ? chaptersInOrder[index - 1] : null;
  const next =
    index < chaptersInOrder.length - 1 ? chaptersInOrder[index + 1] : null;

  const renderLink = (chapter: ChapterMeta | null, label: string) => {
    if (!chapter) return <span className="text-zinc-600">{label}</span>;
    return (
      <Link
        href={`/story/chapters/${chapter.slug}`}
        className="text-skyblue hover:underline"
      >
        {label}: {chapter.title}
      </Link>
    );
  };

  return (
    <nav className="mt-4 flex items-center justify-between text-xs text-zinc-400">
      {renderLink(prev, "Previous")}
      {renderLink(next, "Next")}
    </nav>
  );
}
