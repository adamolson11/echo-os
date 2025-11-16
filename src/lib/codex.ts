import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type CodexNodeType =
  | "index"
  | "story"
  | "log"
  | "theory"
  | "character"
  | "meta";

export type CodexNode = {
  slug: string;
  title: string;
  type: CodexNodeType;
  tags: string[];
  obsidianFile?: string;
  obsidianVault?: string;
  contentHtml: string;
};

const codexDirectory = path.join(process.cwd(), "content", "codex");

function getAllCodexFilenames(): string[] {
  if (!fs.existsSync(codexDirectory)) return [];
  return fs
    .readdirSync(codexDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

export function getCodexSlugs(): string[] {
  const filenames = getAllCodexFilenames();
  return filenames.map((filename) => filename.replace(/\.mdx?$/, ""));
}

export async function getCodexNode(slug: string): Promise<CodexNode> {
  const fullPathMd = path.join(codexDirectory, `${slug}.md`);
  const fullPathMdx = path.join(codexDirectory, `${slug}.mdx`);

  const fullPath = fs.existsSync(fullPathMd) ? fullPathMd : fullPathMdx;

  if (!fullPath || !fs.existsSync(fullPath)) {
    throw new Error(`Codex node not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  const {
    title,
    type = "meta",
    tags = [],
    obsidianFile,
    obsidianVault,
    slug: frontmatterSlug,
  } = data as {
    title?: string;
    type?: CodexNodeType;
    tags?: string[] | string;
    obsidianFile?: string;
    obsidianVault?: string;
    slug?: string;
  };

  const effectiveSlug = frontmatterSlug || slug;

  // Normalize tags: accept array or comma-separated string
  let normalizedTags: string[] = [];
  if (Array.isArray(tags)) {
    normalizedTags = tags.map((t) => String(t).trim()).filter(Boolean);
  } else if (typeof tags === "string") {
    normalizedTags = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }

  // Validate type; default to 'meta' if unknown
  const allowedTypes: CodexNodeType[] = [
    "index",
    "story",
    "log",
    "theory",
    "character",
    "meta",
  ];
  const effectiveType: CodexNodeType = allowedTypes.includes(type as CodexNodeType)
    ? (type as CodexNodeType)
    : "meta";

  if (!title) {
    throw new Error(`Codex node "${slug}" is missing a 'title' in frontmatter.`);
  }

  return {
    slug: effectiveSlug,
    title,
    type: effectiveType,
    tags: normalizedTags,
    obsidianFile,
    obsidianVault,
    contentHtml,
  };
}

export async function getAllCodexNodes(): Promise<CodexNode[]> {
  const filenames = getAllCodexFilenames();

  const nodes = await Promise.all(
    filenames.map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      return getCodexNode(slug);
    })
  );

  return nodes.sort((a, b) => a.title.localeCompare(b.title));
}
