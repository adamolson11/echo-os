// scripts/buildCodex.cjs
// Build Living Codex graph from ./codex/**/*.md into ./public/codex.json

const fs = require("fs");
const path = require("path");
const glob = require("glob");
const matter = require("gray-matter");

const ROOT_DIR = process.cwd();
const CODEX_DIR = path.join(ROOT_DIR, "codex");
const OUTPUT_PATH = path.join(ROOT_DIR, "public", "codex.json");

function idFromFile(filePath, frontmatterId) {
  if (frontmatterId && typeof frontmatterId === "string") return frontmatterId;
  const base = path.basename(filePath, path.extname(filePath));
  return base;
}

function extractWikiLinks(content) {
  const links = [];
  const regex = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const target = match[1].trim();
    if (target) links.push(target);
  }
  return links;
}

function writeJson(filePath, data) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function buildCodex() {
  if (!fs.existsSync(CODEX_DIR)) {
    console.error('[buildCodex] codex directory not found:', CODEX_DIR);
    process.exit(1);
  }

  const files = glob.sync('codex/**/*.md', { cwd: ROOT_DIR, absolute: true });

  const nodesById = {};
  const links = [];

  files.forEach((absPath) => {
    const relPath = path.relative(ROOT_DIR, absPath).replace(/\\/g, "/");
    const raw = fs.readFileSync(absPath, "utf8");
    const { data: frontmatter, content } = matter(raw);

    const id = idFromFile(relPath, frontmatter && frontmatter.id);
    const label = (frontmatter && frontmatter.title) || id;
    const type = (frontmatter && frontmatter.type) || "chapter";
    const series = frontmatter && frontmatter.series;
    const tags = Array.isArray(frontmatter && frontmatter.tags) ? frontmatter.tags : [];
    const weight = typeof (frontmatter && frontmatter.weight) === "number" ? frontmatter.weight : 1;
    const publish = !!(frontmatter && frontmatter.publish);
    const isPrivate = !!(frontmatter && frontmatter.private);

    // Merge or overwrite any existing stub node so real frontmatter takes precedence
    const existing = nodesById[id] || {};
    nodesById[id] = Object.assign({}, existing, {
      id,
      label,
      type,
      series,
      slug: (frontmatter && frontmatter.slug) || id,
      path: relPath,
      tags,
      weight,
      meta: Object.assign({}, (existing.meta || {}), {
        status: frontmatter && frontmatter.status,
        arc: frontmatter && frontmatter.arc,
        createdAt: frontmatter && frontmatter.createdAt,
        summary: frontmatter && frontmatter.summary,
        publish: publish,
        private: isPrivate,
      }),
    });

    const wikiLinks = extractWikiLinks(content || "");

    wikiLinks.forEach((targetIdRaw) => {
      const targetId = targetIdRaw.trim();
      if (!targetId) return;
      if (targetId === id) return;

      if (!nodesById[targetId]) {
        nodesById[targetId] = {
          id: targetId,
          label: targetId,
          type: "stub",
          series: undefined,
          slug: targetId,
          path: undefined,
          tags: ["stub"],
          weight: 0.8,
          meta: { stub: true },
        };
      }

      links.push({ source: id, target: targetId, type: "wikilink", strength: 1 });
    });
  });

  const nodes = Object.values(nodesById);

  // Filter nodes: TEMPORARILY include all non-private nodes for visualization
  // (was: only include nodes with meta.publish === true)
  const publishedNodes = nodes.filter((n) => (n.meta && n.meta.private) !== true);

  const publishedIds = new Set(publishedNodes.map((n) => n.id));

  // Filter links so both ends exist in the published set
  const publishedLinks = links.filter((l) => publishedIds.has(l.source) && publishedIds.has(l.target));

  const graphData = { nodes: publishedNodes, links: publishedLinks };

  writeJson(OUTPUT_PATH, graphData);

  // Logging summary
  const totalFiles = files.length;
  // Skipped files: those with a path and not in publishedIds
  const skipped = nodes.filter((n) => n.path && !publishedIds.has(n.id));
  const skippedCount = skipped.length;
  const skippedPaths = skipped.slice(0, 25).map((s) => s.path).filter(Boolean);

  console.log(`[buildCodex] Scanned ${totalFiles} files`);
  console.log(`[buildCodex] included ${publishedNodes.length} nodes and ${publishedLinks.length} links`);
  console.log(`[buildCodex] Wrote ${publishedNodes.length} nodes and ${publishedLinks.length} links to ${OUTPUT_PATH}`);
  console.log(`[buildCodex] Skipped ${skippedCount} files (private/unpublished). ${
    skippedPaths.length ? "Examples: " + skippedPaths.join(", ") : "No skipped paths to show"
  }`);
}

buildCodex();
