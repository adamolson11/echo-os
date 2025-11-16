# Obsidian → Echo OS sync plan (draft)

Goal

Provide a minimal, safe, and reversible workflow to move selected Obsidian notes into the site as Markdown/MDX content that is statically built at deploy-time.

Principles

- Start simple: prefer local scripts and manual commits for Phase 1.
- Keep the repo as the single source of truth for published content (no runtime access to user files).
- Use predictable frontmatter so the reader/codex helpers can rely on fields.
- Automate later via CI/GitHub Actions when the workflow is validated.

Options (brief)

1) Local CLI sync (recommended first step)
- Author in Obsidian locally.
- Run a script that copies/exports selected notes to `content/codex/` (sanitizes filenames, ensures frontmatter fields exist, optionally converts to MDX). The script can also run remark/formatting and create a git commit.
- Pros: simple, offline-friendly, safe. Cons: manual commits until automated.

2) PR-based workflow
- Contributors add files directly under `content/codex/` via PRs. Good for collaboration and review.
- Pros: reviewable, auditable. Cons: manual for single-author flows.

3) CI-driven sync (advanced)
- A service or action picks up notes from a canonical source (e.g., a shared repo or a cloud-synced folder) and commits to `main` or a branch.
- Pros: fully automated. Cons: complexity, secrets, potential for accidental overwrites.

Recommended Phase 1: Local CLI sync + PRs

- Implement a simple Node script `scripts/sync-obsidian.js` that:
  - Reads files from a configured `OBS_CONTENT_DIR` or from a specified path.
  - For each `.md`/`.mdx` file, parse frontmatter (using `gray-matter`).
  - Validate required frontmatter: `title` (required), `type` (defaults to `meta`), `tags` (array), optional `obsidianFile`, `obsidianVault`, `slug`.
  - If `slug` is missing, derive slug from filename (kebab-case).
  - Sanitize and write content to `content/codex/${slug}.md` (do NOT overwrite existing files unless `--force` is supplied).
  - Optionally run `prettier` or `remark` transforms.
  - Optionally call `git` to add/commit the new files with a descriptive message (requires the author to have git configured locally).

Frontmatter schema (recommended)

---
title: "My Note Title"
type: "index" # index | story | log | theory | character | meta
tags: ["tag1", "tag2"]
obsidianFile: "Original Obsidian Filename"
obsidianVault: "Vault Name"
slug: "optional-slug"
---

- `title` — required
- `type` — optional, default `meta`
- `tags` — optional
- `obsidianFile`/`obsidianVault` — optional, used to build `obsidian://` links
- `slug` — optional, fallback to filename

Security & safety

- The script should never read files outside the configured `content` or user-supplied source dir without confirmation.
- Avoid automatic force-overwrites; require `--force` for destructive behavior.
- Keep transformations idempotent.

Developer notes & sample commands

Install dependencies used by the codex helper:

```bash
npm install gray-matter remark remark-html
```

Sample sync command (local):

```bash
node scripts/sync-obsidian.js --source "/path/to/obsidian/vault/notes" --dest "content/codex"
```

Next steps (Phase 2)

- Add a GitHub Action to run the sync from a shared source (if desired).
- Switch to MDX conversion for richer components.
- Add validation CI that runs the codex helper and checks for missing required frontmatter.

Questions for the group

- Do we want `scripts/sync-obsidian.js` to auto-commit to git, or should it only write files and leave commits to authors?
- Do we want a canonical vault or expect contributors to manage their own vaults and PR changes?


— End of draft
