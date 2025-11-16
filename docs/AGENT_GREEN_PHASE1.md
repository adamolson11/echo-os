MASTER DIRECTIVE FOR AGENT GREEN — PHASE 1

Agent Green — Studio Sync Update

All teams (Orange, Pink, Purple, Black) agree the next milestone is:
Make Obsidian → EchoOS Codex drag-and-drop simple.
Before ANY launch-page or tunnel effects, we need a solid content pipeline.
You have full autonomy for minor lint issues, cleanup, and implementation details.
Only halt if the build breaks or routing fails.

Phase 1 Goal (High Priority)

I should be able to write a note in Obsidian → drag it into `content/codex/` → push → and see it live on the site.
That is the only objective for this phase.

NEW TODO LIST FOR AGENT GREEN

1. Create a “Public Codex” folder in the repo
Location:
`content/codex/`

This is where exported `.md` files from Obsidian will be dropped manually.
(Purpose: MVP does NOT require automation yet. Start with drag-and-drop.)

2. Ensure `lib/codex.ts` loads markdown files correctly
Requirements:
- Read `.md` files from `content/codex/`
- Parse frontmatter: `title`, `type`, `tags`, `obsidianFile`, `obsidianVault`, `slug`
- Convert markdown to HTML
- Auto-generate slugs when missing
- Export `getAllCodexNodes()` and `getCodexNode(slug)`

3. Validate the `/codex` index page
Requirements:
- List all codex nodes
- Display `title`, `type` badge, and `tags`
- Link to dynamic pages at `/codex/[slug]`

4. Validate each `/codex/[slug]` page
Requirements:
- Render markdown correctly
- Show Obsidian deep link:
  `obsidian://open?vault=<vault>&file=<file>`
- Show type badge & tags
- Show “Back to Codex” link

5. Test with 3 real Obsidian notes
Files to test with (Agent will supply):
- `Book Index.md`
- `Chapter 1.md`
- `Silas Profile.md`

Verify:
- All three render correctly
- No build errors
- Slugs work
- Frontmatter is accepted
- Site updates immediately after commit/push

6. Light styling polish (minimal)
- Use `prose` typography
- Ensure spacing and layout match EchoOS style
- Keep styling minimal — just readable

7. Confirm MVP Pipeline
The following must be functional and solid:
- Write in Obsidian
- Drag into `content/codex/`
- Push
- Appears on `/codex`
- Opens correctly
- Obsidian link works

Once this works, Phase 1 is COMPLETE.

Phase 2 (queued for later — NOT NOW)
Only begin AFTER the drag-and-drop Codex pipeline is confirmed working.
Phase 2 will include portals, animations, launch pages, and deeper UI—defer until Phase 1 is confirmed.

FINAL DIRECTIVE
Focus entirely on making the Obsidian drag-and-drop workflow work.
Do not begin any launch page, animation, or UI experiments until after Phase 1 is complete.

When you finish these tasks, report back and we will proceed to the dream interface.
