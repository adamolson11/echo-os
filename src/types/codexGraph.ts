export type CodexNodeType =
  | "chapter"
  | "character"
  | "theme"
  | "location"
  | "event"
  | "symbol"
  | "stub"
  | (string & {});

export type CodexNode = {
  id: string;
  label: string;
  type: CodexNodeType;
  series?: string;
  slug?: string;
  path?: string;
  tags?: string[];
  weight?: number;
  meta?: Record<string, unknown>;
  // Coordinates populated by the force engine.
  x?: number;
  y?: number;
  // Some renderers may use `name`.
  name?: string;
};

export type CodexLink = {
  source: string | number | CodexNode;
  target: string | number | CodexNode;
  type?: string;
  strength?: number;
};

export type CodexGraphData = {
  nodes: CodexNode[];
  links: CodexLink[];
};
