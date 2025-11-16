# MDX / Markdown Authoring Guide

This document explains the recommended authoring workflow and frontmatter for chapters and Codex nodes.

Purpose

- Keep frontmatter consistent so the static site generators and helpers can read metadata deterministically.
- Provide a simple, reviewable workflow for adding content (PRs recommended for collaboration).

Frontmatter (recommended)

Each content file should start with YAML frontmatter. Fields below are recommended for both `content/chapters` and `content/codex` files.

---
title: "The Chapter or Node Title"
slug: "optional-custom-slug"  # optional; otherwise filename (kebab-case) is used
bookLabel: "Wolves in the Echo House"  # optional for chapters
order: 1  # optional numeric order for chapters
type: "story"  # codex: index|story|character|theory|log|meta
tags: ["tag1","tag2"]
obsidianFile: "Original Obsidian Filename"
obsidianVault: "Wolves In The Echo House"
---

Notes

- `title` is required. The reader will throw an error if missing.
- `slug` is optional; prefer explicit slugs for canonical URLs when possible.
- `order` is useful for building spines and previous/next navigation.
- `obsidianFile` / `obsidianVault` are optional and used to build obsidian:// links from the Codex.

Filename conventions

- Use kebab-case for filenames: `chapter-01-the-yard.md` or `silas-palesmith.md`.
- Place story chapters in `src/content/chapters/` (or `content/chapters/` depending on your setup) and Codex nodes in `content/codex/`.

Authoring workflows

1) Single-author, quick edits (recommended for Phase 1)
- Edit files locally in your Obsidian vault or in a text editor.
- Copy/Export selected `.md` files into `content/codex/` or `src/content/chapters/`.
- Run `npm run dev` locally to verify rendering.
- Commit and push to `main` (or create a branch + PR if you prefer review).

2) Collaborative / review-based (recommended when multiple contributors)
- Create a feature branch and submit a PR with new/updated files.
- Add a short description of the changes and request review from @adam (default owner).

Formatting & tooling

- Use `gray-matter` to parse frontmatter and `remark`/`remark-html` to convert Markdown → HTML.
- Optional: add `prettier` or `remark` formatting steps to keep Markdown consistent.

Safety & validation

- Validate required fields before committing. Consider adding a small script to check for missing `title` and invalid slugs.
- Do not commit files that contain private data.

Next steps

- Optionally implement `scripts/sync-obsidian.js` to automate safe copying from a configured Obsidian folder into `content/`.
- Consider migrating to MDX when you need JSX components in content.
