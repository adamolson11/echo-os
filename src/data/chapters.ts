// src/data/chapters.ts

import type { PortalSlug } from "./portals";

export type ChapterStatus = "draft" | "stub" | "published";

export type ChapterSlug =
  | "prologue"
  | "chapter-one"
  | "chapter-two"
  | "interlude-fire-that-dreamed"
  | "psyntuum-logs-01"
  | "hudson-blue-codex-01";

export interface ChapterMeta {
  slug: ChapterSlug;
  order: number;
  title: string;
  subtitle?: string;
  bookLabel?: string; // e.g. "Book I · Wolves in the Echo House"
  status: ChapterStatus;
  blurb: string; // short description for cards / lists
  portalSlug: PortalSlug;
}

/**
 * Master list of chapters in reading order.
 * This is the spine the reader + Story Hub should use.
 */
export const chapters: ChapterMeta[] = [
  {
    slug: "prologue",
    order: 1,
    title: "Prologue — The Hurricane Yard",
    subtitle: "Two men, one storm, and a prison that remembers.",
    bookLabel: "Book I · Wolves in the Echo House",
    status: "published", // canonical once wired to PrologueStub
    blurb:
      "Silas Palesmith and Paulo Davinci face each other in a prison yard as a hurricane tears the sky apart, and the Echo House begins to wake.",
    portalSlug: "wolves",
  },
  {
    slug: "chapter-one",
    order: 2,
    title: "Chapter One — Wolves in the Echo House",
    subtitle: "The house that edits memories, and the man who hunts ghosts.",
    bookLabel: "Book I · Wolves in the Echo House",
    status: "stub",
    blurb: "Silas leaves the yard behind and walks into the Echo House proper, where memories are currency.",
    portalSlug: "wolves",
  },
  {
    slug: "chapter-two",
    order: 3,
    title: "Chapter Two — The Sheepdog and the Wolves",
    subtitle: "Every city has sheep, wolves, and something in between.",
    bookLabel: "Book I · Wolves in the Echo House",
    status: "stub",
    blurb:
      "Silas walks the threshold between protector and predator as the case pulls him deeper into Davinci’s theology of entropy.",
    portalSlug: "wolves",
  },
  {
    slug: "interlude-fire-that-dreamed",
    order: 4,
    title: "Interlude — The Fire That Dreamed",
    subtitle: "A vision between futures.",
    bookLabel: "Bridge · Echo House ⇄ Future Farm",
    status: "draft",
    blurb:
      "Somewhere between timelines, a fire dreams of a farm that does not yet exist, and the Codex flickers with a possible future.",
    portalSlug: "devils-palimpsest",
  },
  {
    slug: "psyntuum-logs-01",
    order: 5,
    title: "Psyntuum Log 01 — Patient: Palesmith, Silas",
    subtitle: "Session notes from the dream camera.",
    bookLabel: "Appendix · Psyntuum Archives",
    status: "stub",
    blurb:
      "Redacted clinical notes trace Silas’s first sessions with the dream camera, hinting at the true cost of edited memory.",
    portalSlug: "devils-codex",
  },
  {
    slug: "hudson-blue-codex-01",
    order: 6,
    title: "Codex Entry — Hudson Blue / Future Farm Node",
    subtitle: "A possible exit from the Echo House.",
    bookLabel: "Codex · Living OS",
    status: "stub",
    blurb:
      "An early Codex entry links the Echo House to a regenerative farm on another branch of the tree, where entropy is negotiated rather than worshiped.",
    portalSlug: "devils-manuscript",
  },
];

/**
 * Look up a chapter by slug.
 */
export function getChapterBySlug(slug: string): ChapterMeta | undefined {
  return chapters.find((chapter) => chapter.slug === slug);
}

/**
 * Get previous and next chapter metadata for navigation.
 */
export function getAdjacentChapters(slug: string): {
  previous?: ChapterMeta;
  next?: ChapterMeta;
} {
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  if (index === -1) return {};

  const previous = index > 0 ? chapters[index - 1] : undefined;
  const next = index < chapters.length - 1 ? chapters[index + 1] : undefined;

  return { previous, next };
}

/**
 * Convenience: chapters that are truly "live" for readers.
 * (You can use this to hide drafts later if you want.)
 */
export function getPublishedChapters(): ChapterMeta[] {
  return chapters.filter((chapter) => chapter.status === "published");
}

export function getChaptersForPortal(slug: PortalSlug): ChapterMeta[] {
  return chapters
    .filter((chapter) => chapter.portalSlug === slug)
    .sort((a, b) => a.order - b.order);
}
