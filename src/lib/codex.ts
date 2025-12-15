import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { CodexGraphData, CodexNode as GraphNode, CodexLink } from "@/types/codexGraph";

export type CodexNode = {
  id: string;
  slug: string;
  title: string;
  type?: string;
  tags: string[];
  obsidianFile?: string;
  obsidianVault?: string;
  contentHtml: string;
  backlinks: Array<{ id: string; slug: string; title: string }>;
};

const rootDir = process.cwd();
const graphPath = path.join(rootDir, "public", "codex.json");

function readCodexGraph(): CodexGraphData {
  if (!fs.existsSync(graphPath)) {
    throw new Error('codex.json not found. Run "npm run build:codex" first.');
  }
  const raw = fs.readFileSync(graphPath, "utf8");
  return JSON.parse(raw) as CodexGraphData;
}

function nodeSlug(node: GraphNode): string {
  return (typeof node.slug === "string" && node.slug) || node.id;
}

function resolveNodeBySlug(graph: CodexGraphData, slug: string): GraphNode | undefined {
  const normalized = String(slug);
  return graph.nodes.find((n) => nodeSlug(n) === normalized || n.id === normalized);
}

function linkEndpointId(value: CodexLink["source"] | CodexLink["target"]): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return value.id;
}

function replaceWikiLinks(markdown: string, idToSlug: Map<string, string>): string {
  // Supports:
  // - [[Target]]
  // - [[Target|Alias]]
  const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  return markdown.replace(regex, (_full, rawTarget: string, rawAlias: string | undefined) => {
    const targetId = String(rawTarget).trim();
    const alias = typeof rawAlias === "string" ? rawAlias.trim() : "";

    const slug = idToSlug.get(targetId) || targetId;
    const href = `/codex/${encodeURIComponent(slug)}`;
    const label = alias || targetId;

    return `[${label}](${href})`;
  });
}

export function getCodexSlugs(): string[] {
  const graph = readCodexGraph();
  return graph.nodes
    .filter((n) => !!n.path)
    .map((n) => nodeSlug(n));
}

export async function getCodexNode(slug: string): Promise<CodexNode> {
  if (!slug) {
    return {
      id: "unknown",
      slug: "unknown",
      title: "Untitled",
      type: "meta",
      tags: [],
      contentHtml: "",
      backlinks: [],
    };
  }

  const graph = readCodexGraph();
  const graphNode = resolveNodeBySlug(graph, slug);
  if (!graphNode) throw new Error(`Codex node not found: ${slug}`);

  if (!graphNode.path) {
    throw new Error(`Codex node "${graphNode.id}" has no file path associated.`);
  }

  const absPath = path.join(rootDir, graphNode.path);
  if (!fs.existsSync(absPath)) {
    throw new Error(`Markdown file not found for path "${graphNode.path}"`);
  }

  const rawMd = fs.readFileSync(absPath, "utf8");
  const { data, content } = matter(rawMd);

  const idToSlug = new Map<string, string>();
  for (const n of graph.nodes) idToSlug.set(n.id, nodeSlug(n));

  const preprocessed = replaceWikiLinks(content || "", idToSlug);
  const processedContent = await remark().use(html).process(preprocessed);
  const contentHtml = processedContent.toString();

  const fm = (data || {}) as Record<string, unknown>;
  const fmTitle = typeof fm.title === "string" ? fm.title : undefined;
  const fmType = typeof fm.type === "string" ? fm.type : undefined;
  const fmTags = fm.tags;
  const obsidianFile = typeof fm.obsidianFile === "string" ? fm.obsidianFile : undefined;
  const obsidianVault = typeof fm.obsidianVault === "string" ? fm.obsidianVault : undefined;

  let normalizedTags: string[] = [];
  if (Array.isArray(fmTags)) {
    normalizedTags = fmTags.map((t) => String(t).trim()).filter(Boolean);
  } else if (typeof fmTags === "string") {
    normalizedTags = fmTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  } else if (Array.isArray(graphNode.tags)) {
    normalizedTags = graphNode.tags.map((t) => String(t).trim()).filter(Boolean);
  }

  const backlinks = graph.links
    .filter((l) => linkEndpointId(l.target) === graphNode.id)
    .map((l) => linkEndpointId(l.source))
    .map((sourceId) => graph.nodes.find((n) => n.id === sourceId))
    .filter((n): n is GraphNode => !!n && !!n.path)
    .map((n) => ({ id: n.id, slug: nodeSlug(n), title: n.label || n.id }));

  const uniqueBacklinks = Array.from(
    new Map(backlinks.map((b) => [b.id, b])).values()
  ).sort((a, b) => a.title.localeCompare(b.title));

  return {
    id: graphNode.id,
    slug: nodeSlug(graphNode),
    title: fmTitle || graphNode.label || graphNode.id,
    type: fmType || (typeof graphNode.type === "string" ? graphNode.type : undefined),
    tags: normalizedTags,
    obsidianFile,
    obsidianVault,
    contentHtml,
    backlinks: uniqueBacklinks,
  };
}

export async function getAllCodexNodes(): Promise<CodexNode[]> {
  const slugs = getCodexSlugs();
  const nodes: CodexNode[] = [];

  for (const slug of slugs) {
    try {
      nodes.push(await getCodexNode(slug));
    } catch (err) {
      console.warn(`[codex] skipping node during getAllCodexNodes: ${slug}`, err);
    }
  }

  return nodes.sort((a, b) => a.title.localeCompare(b.title));
}
