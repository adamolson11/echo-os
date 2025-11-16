// src/data/portals.ts

export type PortalSlug =
  | "wolves"
  | "devils-palimpsest"
  | "devils-codex"
  | "devils-manuscript"
  | "future-farm-1"
  | "future-farm-2"
  | "future-farm-3";

export interface Portal {
  slug: PortalSlug;
  title: string;
  tagline: string;
  live?: boolean;
}

export const portals: Portal[] = [
  {
    slug: "wolves",
    title: "The Wolves in the Echo House",
    tagline: "Glitch-noir hurricane prison and echoing minds.",
    live: true,
  },
  {
    slug: "devils-palimpsest",
    title: "The Devil's Palimpsest",
    tagline: "Red ink, burned scripture, haunted margins.",
  },
  {
    slug: "devils-codex",
    title: "The Devil's Codex",
    tagline: "Entropy carved into the bones of language.",
  },
  {
    slug: "devils-manuscript",
    title: "The Devil's Manuscript",
    tagline: "An unfinished book that keeps rewriting you.",
  },
  {
    slug: "future-farm-1",
    title: "Future Farm — Part I",
    tagline: "A blue-sky experiment in growing a different world.",
  },
  {
    slug: "future-farm-2",
    title: "Future Farm — Part II",
    tagline: "Where hope and recursion collide in the soil.",
  },
  {
    slug: "future-farm-3",
    title: "Future Farm — Part III",
    tagline: "The last harvest before everything changes.",
  },
];
