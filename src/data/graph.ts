// src/data/graph.ts

export type NodeType = "portal" | "chapter" | "codex";

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  portalSlug?: string;
  route: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  relation?: string;
}

export interface StoryGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export const storyGraph: StoryGraph = {
  nodes: [
    {
      id: "portal-wolves",
      label: "The Wolves in the Echo House",
      type: "portal",
      route: "/book/wolves",
    },
    {
      id: "portal-devils-palimpsest",
      label: "The Devil's Palimpsest",
      type: "portal",
      route: "/book/devils-palimpsest",
    },
    {
      id: "wolves-prologue",
      label: "Prologue — The Hurricane Yard",
      type: "chapter",
      portalSlug: "wolves",
      route: "/read/prologue",
    },
    {
      id: "codex-hurricane-yard",
      label: "Codex: The Hurricane Yard",
      type: "codex",
      portalSlug: "wolves",
      route: "/codex/hurricane-yard",
    },
  ],
  edges: [
    { source: "portal-wolves", target: "wolves-prologue", relation: "starts-with" },
    { source: "wolves-prologue", target: "codex-hurricane-yard", relation: "codex" },
    {
      source: "portal-wolves",
      target: "portal-devils-palimpsest",
      relation: "meta-link",
    },
  ],
};
