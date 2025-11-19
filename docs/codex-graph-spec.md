# Codex Graph – "Obsidian Parity" Spec

## Context
Codex graph is the interactive story/character map for Echo OS. Goal: match Obsidian's clarity and usability for node graphs.

## Goal
- Graph is cinematic, but always readable.
- Node labels are small, never overlap, and only show when zoomed in.
- Nodes naturally space out, no pile-up.
- Layout is stable after a short settling period.
- Responsive to window size and zoom.

## Structure
- Uses `ForceGraph2D` (react-force-graph-2d)
- Custom node label rendering (small, dark background box)
- D3 forces tuned for spacing and stability
- Resize debounce for layout stability

## Definition of Done
- [ ] Labels are small, readable, and never overlap at default zoom
- [ ] Labels only appear when zoomed in (not when zoomed way out)
- [ ] Nodes are spaced out, no visual pile-up
- [ ] Graph centers and fits on initial load
- [ ] Layout remains stable after settling (no jitter on resize)
- [ ] Responsive on mobile and desktop
- [ ] RAM usage is reasonable (no runaway memory)

## Acceptance Criteria
1. Initial load: graph is centered, labels are legible, no overlap
2. Zoom out: labels disappear, graph remains readable
3. Node spacing: no clusters or pile-up
4. Resize: graph re-centers smoothly, no jumpiness
5. QA report from Yellow confirms RAM, layout, and label behavior

---

## Notes for Green & Yellow
- Use the patch pattern for node labels and D3 forces
- Fill out the QA report template after each test pass
- Director will sign off when all acceptance criteria are met
