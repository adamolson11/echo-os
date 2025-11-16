# Group Questions

High-level questions, decisions, and TODOs for the EchoOS project.
Use this as a living document to track open questions and their owners.

---

## 1. Approve Obsidian sync plan

**Question**  
Decide how Obsidian notes become MDX: preferred sync method (local script, Git push, CI job, or external service), frequency, frontmatter schema, and filename/slug conventions.

**Context**  
We want a simple authoring flow from Obsidian into the site. Choosing the sync method affects automation, access control, and CI complexity.

**Owner**  
@adam

**Status**  
- [ ] Open
- [ ] In progress
- [ ] Answered

**Notes / Proposed Answer**  
- Consider a simple CLI/script that converts and commits MDX to `src/content/` as a first step.

---

## 2. Image handling strategy

**Question**  
Confirm where images live and how to serve them: keep in `public/images`, add real assets (replace empty placeholders), use Next `Image` with `sizes`/dimensions, or use plain `<img>`; naming and optimization policy.

**Context**  
Current placeholder `public/images/echo-hero.jpg` is empty and causing Next image warnings in dev. Decide on a policy for images so dev logs stay clean and site performance is predictable.

**Owner**  
@adam

**Status**  
- [ ] Open
- [ ] In progress
- [ ] Answered

**Notes / Proposed Answer**  
- Replace empty placeholders with real images. Use `public/images/` for static assets. Restore Next `Image` with explicit `width`/`height` or `sizes` once real assets are in place.

---

## 3. Portal live statuses

**Question**  
Confirm which portals should be 'live' now and final hrefs for each portal; define copy for not-yet-live portals (e.g., 'Not live yet').

**Context**  
Currently `wolves` is live; others are placeholders. We need to decide which to mark live and where they should link.

**Owner**  
@adam

**Status**  
- [ ] Open
- [ ] In progress
- [ ] Answered

**Notes / Proposed Answer**  
- Keep `wolves` live; other portals should show "Not live yet" and link to `#` or to a hub page with comms.

---

## 4. Approve hub/book styling

**Question**  
Sign off on the minimal dark-themed Tailwind look for `/hub`, `/book/[slug]`, and `/map`.

**Context**  
We added lightweight Tailwind styling for readability and minimal visual polish. Need a quick review for spacing and responsiveness.

**Owner**  
@adam

**Status**  
- [ ] Open
- [ ] In progress
- [ ] Answered

**Notes / Proposed Answer**  
- Default OK. Request minor spacing tweaks on mobile if needed.

---

## 5. MDX content workflow

**Question**  
Agree on the authoring workflow: create chapters via PR or direct commits, required frontmatter fields (title, slug, bookLabel, order), and naming guidance for new MDX files.

**Context**  
Authoring choices affect review, CI, and content integrity. Frontmatter should be consistent for reader navigation.

**Owner**  
@adam

**Status**  
- [ ] Open
- [ ] In progress
- [ ] Answered

**Notes / Proposed Answer**  
- Start with PR-based authoring for traceability. Required frontmatter: `title`, `slug`, `bookLabel`, `order`.

---

## 6. Questions stored in-repo?

**Question**  
Decide whether group questions should live in the repository (e.g., `docs/GROUP_QUESTIONS.md`) versus GitHub Issues/Discussions or an in-app UI. State preferred format and whether answers should be versioned.

**Context**  
The user wants offline-friendly, simple storage. Markdown is preferred here.

**Owner**  
@adam

**Status**  
- [ ] Open
- [ ] In progress
- [ ] Answered

**Notes / Proposed Answer**  
- Use plain Markdown in `docs/GROUP_QUESTIONS.md` as the canonical source. If programmatic access is needed later, add JSON/YAML export.

---

## 7. Map/Graph feature scope

**Question**  
Clarify intended scope for `/map`: simple node list, interactive graph, sync with Obsidian graph, and priority for Phase 2 features.

**Context**  
Graph features can be complex; choosing a narrow scope will help deliver Phase 2 quickly.

**Owner**  
@adam

**Status**  
- [ ] Open
- [ ] In progress
- [ ] Answered

**Notes / Proposed Answer**  
- Phase 2: Simple interactive node/edge viewer with node metadata; sync with Obsidian later.

---

## 8. Reviewers & release cadence

**Question**  
Who reviews content and UI changes? Define merge policy, branch protection/CI checks required, and cadence for publishing new chapters or portals.

**Context**  
A small team currently; we need to standardize for future contributors.

**Owner**  
@adam

**Status**  
- [ ] Open
- [ ] In progress
- [ ] Answered

**Notes / Proposed Answer**  
- Start with PR review by @adam. Use PRs for content and UI changes. Add CI checks later as needed.
