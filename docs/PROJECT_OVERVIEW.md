# Project Overview — Echo OS

Purpose
-------
Echo OS is an experimental narrative workspace that surfaces story elements (chapters, characters, themes, locations, symbols) in a single interactive codex. The immediate aim is to build a usable, discoverable graph that helps editors and authors navigate story webs.

Current Focus
-------------
- Codex Graph: polish physics, label legibility, and viewport layout so the graph feels calm and readable (priority).
- Scaffolding: basic Hero component and Door components created as foundations for later UI work.

Scope for this Sprint
---------------------
- Single feature cluster: Codex Graph polish (render reliably, settle quickly, readable labels, near-viewport canvas).
- No new product features — only small, targeted tuning.

Done Criteria (Simple)
----------------------
- Graph renders reliably on dev (no runtime errors).
- Nodes settle within ~5–10s and do not visibly jitter at rest.
- Labels are readable at normal zoom and do not constantly flicker.
- Canvas fills the viewport (not small or clipped by site wrappers).

Next Steps
----------
1. Finalize small physics/label/layout tuning on `feature/codex-physics`.
2. Yellow performs quick feel-based QA on `http://localhost:3001/codex`.
3. If PASS, merge and move to Hero + Door refinement sprints.

Who to contact
--------------
- Green: feature work + fixes.
- Yellow: visual QA and feel testing.
- Orange: UX consult for final visual polish when needed.
