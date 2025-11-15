// src/data/storyArcs.ts

export type Intensity = "Haunting" | "Hopeful" | "Mixed";

export type StoryArc = {
  slug: string;
  title: string;
  tag: string;
  intensity: Intensity;
  blurb: string;
  imageUrl: string;
  href: string;
};

export const STORY_ARCS: StoryArc[] = [
  {
    slug: "wolves-in-the-echo-house-book-1",
    title: "Wolves in the Echo House – Book I",
    tag: "Core Canon",
    intensity: "Haunting",
    blurb:
      "Silas Palesmith hunts truth inside a haunted operating system where every memory is evidence.",
    imageUrl: "/images/arcs/wolves-echo-house.jpg",
    href: "/story/chapters/prologue",
  },
  {
    slug: "devils-palimpsest",
    title: "Devil’s Palimpsest",
    tag: "Virus Text",
    intensity: "Haunting",
    blurb:
      "Paulo Davinci rewrites scripture as malware and uploads it into the human mind-machine.",
    imageUrl: "/images/arcs/devils-palimpsest.jpg",
    href: "/story/chapters/devils-palimpsest", // TODO: create this route later
  },
  {
    slug: "future-farm-book-1",
    title: "Future Farm – Book I",
    tag: "Counterspell",
    intensity: "Hopeful",
    blurb:
      "Nolan \"Blue\" Bleauson grows a community that tries to out-cooperate the collapse.",
    imageUrl: "/images/arcs/future-farm.jpg",
    href: "/story/chapters/future-farm", // TODO
  },
  {
    slug: "the-fire-that-dreamed",
    title: "The Fire That Dreamed",
    tag: "Interlude",
    intensity: "Mixed",
    blurb:
      "A prophetic blaze that remembers every version of you that almost existed.",
    imageUrl: "/images/arcs/fire-that-dreamed.jpg",
    href: "/story/chapters/the-fire-that-dreamed", // TODO
  },
  {
    slug: "hudson-blue-codex",
    title: "Hudson Blue Codex",
    tag: "Archive",
    intensity: "Hopeful",
    blurb:
      "Recipes, rituals, and blueprints for a gentler timeline where you almost made it.",
    imageUrl: "/images/arcs/hudson-blue-codex.jpg",
    href: "/story/chapters/hudson-blue-codex", // TODO
  },
  {
    slug: "psyntuum-dream-camera-logs",
    title: "Psyntuum / Dream Camera Logs",
    tag: "Case Files",
    intensity: "Mixed",
    blurb:
      "Redacted recordings from the machine that captures nightmares as evidence.",
    imageUrl: "/images/arcs/psyntuum-logs.jpg",
    href: "/story/chapters/psyntuum-logs", // TODO
  },
];
