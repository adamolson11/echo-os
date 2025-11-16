// src/data/portals.ts

export type PortalSlug =
  | "wolves"
  | "devils-palimpsest"
  | "devils-codex"
  | "devils-manuscript"
  | "future-farm-1"
  | "future-farm-2"
  | "future-farm-3";

export type PortalTheme = "noir" | "devil" | "future-farm";

export interface Portal {
  slug: PortalSlug;
  title: string;
  tagline: string;
  videoSrc: string;
  theme: PortalTheme;
}

export const portals: Portal[] = [
  {
    slug: "wolves",
    title: "The Wolves in the Echo House",
    tagline: "Glitch-noir hurricane prison reality.",
    videoSrc: "/videos/portals/wolves-door.mp4",
    theme: "noir",
  },
  {
    slug: "devils-palimpsest",
    title: "The Devil's Palimpsest",
    tagline: "Red ink, ruined scripture, and fire.",
    videoSrc: "/videos/portals/devils-palimpsest-door.mp4",
    theme: "devil",
  },
  {
    slug: "devils-codex",
    title: "The Devil's Codex",
    tagline: "A forbidden handbook that teaches systems how to sin.",
    videoSrc: "/videos/portals/devils-codex-door.mp4",
    theme: "devil",
  },
  {
    slug: "devils-manuscript",
    title: "The Devil's Manuscript",
    tagline: "An unfinished book that keeps rewriting anyone who reads it.",
    videoSrc: "/videos/portals/devils-manuscript-door.mp4",
    theme: "devil",
  },
  {
    slug: "future-farm-1",
    title: "Future Farm — Part I",
    tagline: "A small farm tries to out-cooperate the collapse.",
    videoSrc: "/videos/portals/future-farm-1-door.mp4",
    theme: "future-farm",
  },
  {
    slug: "future-farm-2",
    title: "Future Farm — Part II",
    tagline: "The farm learns to negotiate with storms, markets, and ghosts.",
    videoSrc: "/videos/portals/future-farm-2-door.mp4",
    theme: "future-farm",
  },
  {
    slug: "future-farm-3",
    title: "Future Farm — Part III",
    tagline: "A last attempt to grow a gentler operating system for the world.",
    videoSrc: "/videos/portals/future-farm-3-door.mp4",
    theme: "future-farm",
  },
];
