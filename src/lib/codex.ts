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
  // NOTE: temporary debug logging removed. Keep the minimal falsy-slug
  // guard below to avoid hard prerender failures if runtime unexpectedly
  // calls this with an undefined slug during metadata collection.

  // Minimal guard: if slug is falsy, return a harmless stub node so
  // prerendering doesn't fail hard. This avoids build breakages when
  // the app runtime unexpectedly calls this with undefined during
  // metadata collection. Keep this minimal and safe.
  if (!slug) {
    return {
      slug: "unknown",
      title: "Untitled",
      type: "meta",
      tags: [],
      contentHtml: "",
    } as CodexNode;
  }
  const fullPathMd = path.join(codexDirectory, `${slug}.md`);
  const fullPathMdx = path.join(codexDirectory, `${slug}.mdx`);

  const fullPath = fs.existsSync(fullPathMd) ? fullPathMd : fullPathMdx;

  let resolvedPath = fullPath;

  // If the direct path doesn't exist (for example when frontmatter defines
  // a different slug than the filename), try to find a matching file by
  // scanning the directory for a file whose frontmatter `slug` or
  // filename (case-insensitive) matches the requested slug.
  if (!resolvedPath || !fs.existsSync(resolvedPath)) {
    const filenames = getAllCodexFilenames();
    for (const filename of filenames) {
      const candidatePath = path.join(codexDirectory, filename);
      try {
        const fileContents = fs.readFileSync(candidatePath, "utf8");
        const { data } = matter(fileContents);
        const fmSlug = data?.slug;
        const filenameSlug = filename.replace(/\.mdx?$/, "");

        if (
          (typeof fmSlug === "string" && fmSlug === slug) ||
          filenameSlug.toLowerCase() === String(slug).toLowerCase()
        ) {
          resolvedPath = candidatePath;
          break;
        }
      } catch (err) {
        // ignore parse errors here; we'll skip malformed files
        continue;
      }
    }
  }

  if (!resolvedPath || !fs.existsSync(resolvedPath)) {
    throw new Error(`Codex node not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(resolvedPath, "utf8");
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

  const nodes: CodexNode[] = [];
  for (const filename of filenames) {
    const slug = filename.replace(/\.mdx?$/, "");
    try {
      const node = await getCodexNode(slug);
      nodes.push(node);
    } catch (err) {
      // Skip malformed files instead of failing the entire build.
      // eslint-disable-next-line no-console
      console.warn(`[codex] skipping file during getAllCodexNodes: ${filename}`, err);
      continue;
    }
  }

  return nodes.sort((a, b) => a.title.localeCompare(b.title));
}
