Codex - Phase 1 (Obsidian Drop Zone)
===================================

Drop exported Obsidian `.md` files here. Files will be read at build time and appear under `/codex`.

Frontmatter recommended fields:

- `title`: (required) Display title for the node
- `type`: (optional) One of `index`, `story`, `log`, `theory`, `character`, `meta` (defaults to `meta`)
- `tags`: (optional) array of strings or comma-separated string
- `obsidianFile`: (optional) the exact Obsidian filename (used for deep-links)
- `obsidianVault`: (optional) the Obsidian vault name (used for deep-links)
- `slug`: (optional) custom slug override (otherwise filename is used)

Example:

```
---
title: "Book Index"
type: "index"
tags: [book, index]
obsidianFile: "Book Index.md"
obsidianVault: "Studio"
---

Your markdown content here.
```

Keep filenames unique and use Markdown (`.md`) or MDX (`.mdx`).

Phase 1 objective: drag a note here, commit, push — it should appear on `/codex`.
