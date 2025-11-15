export type PrimarySectionId = "story" | "blog" | "lab";

export interface PrimarySection {
  id: PrimarySectionId;
  href: string;
  title: string;
  subtitle: string;
  body: string;
  tags: string[];
}

export const primarySections: PrimarySection[] = [
  {
    id: "story",
    href: "/story",
    title: "Story // Wolves in the Echo House",
    subtitle: "Enter the coma. Navigate the Echo House.",
    body: "Prologue, 44 chapters, echo interludes, and optional audio transmissions.",
    tags: ["Arc: Devils Trilogy", "Status: Drafting"],
  },
  {
    id: "blog",
    href: "/blog",
    title: "Blog // Life & Study",
    subtitle: "Notes from the edge of turning things around.",
    body: "Google IT cert notes, hardware diagrams, finance experiments, and progress logs.",
    tags: ["Track: Survival", "Status: Ongoing"],
  },
  {
    id: "lab",
    href: "/lab",
    title: "Lab // Agents & Experiments",
    subtitle: "Workstation for Echo OS, Unity, and Future Farm.",
    body: "Agent workflows, prototype tools, Unity experiments, and strange OS utilities.",
    tags: ["Track: R&D", "Status: In Progress"],
  },
];

export interface RecentActivityItem {
  kind: "story" | "lab" | "study" | "theory";
  label: string;
  href?: string;
}

export const recentActivity: RecentActivityItem[] = [
  {
    kind: "story",
    label: "Opened: Prologue  The House That Hears You Back",
    href: "/story/chapters/prologue",
  },
  {
    kind: "lab",
    label: "Echo OS skeleton deployed (Next.js + Tailwind)",
    href: "/lab",
  },
  {
    kind: "study",
    label: "Power supplies & hardware flowchart  Google IT Cert",
    href: "/blog/google-it-notes-module-1",
  },
  {
    kind: "theory",
    label: "Unselfish Gene // Law of Recursive Genesis note updated",
    href: "/archive",
  },
];

export interface EchoNodePreview {
  name: string;
  href?: string;
}

export const echoNodes: EchoNodePreview[] = [
  { name: "Silas Palesmith" },
  { name: "Echo House" },
  { name: "Project Halcyon" },
  { name: "MindVault" },
  { name: "Tech Noir Transmission" },
];
