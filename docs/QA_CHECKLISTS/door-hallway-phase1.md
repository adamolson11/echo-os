# Door Hallway & Codex Phase 1 QA Checklist

Purpose: baseline QA for `sandbox/codex-layout-v2` — validate Codex physics/labels and Door Hallway placeholders before Director review.

How to run:
- Checkout branch: `git fetch && git checkout sandbox/codex-layout-v2`
- Start dev server: `npm run dev`
- Open these pages:
  - `/codex` — Codex graph
  - `/story` — Story hub (door hallway)
  - `/story/wolves` — Story room

Checklist
- **Graph stability**: load `/codex`, wait 10s after force settles.
  - Labels do not flash on load.
  - Nodes stop large-scale motion within ~5s (alpha decay applied).
  - Clusters have visible breathing room vs baseline (links not overlapping nodes).

- **Hover interactions**:
  - Hovering a node highlights incident links and neighbor nodes.
  - Highlight halo is visible but not jittery.
  - Hover response feels immediate (Chrome) and acceptable (Firefox).
  - No console errors while hovering.

- **Label rendering & readability**:
  - Labels are hidden when zoomed out (globalScale threshold ~0.85).
  - When zoomed in, labels are legible and do not overlap their node.

- **Performance**:
  - Observe CPU / FPS while panning and zooming (for a medium graph of ~300 nodes): should be reasonable; compare to prior baseline.
  - Expensive shadow blur should be disabled in Firefox.

- **Door Hallway**:
  - `/story` renders without compile errors.
  - Door images load (placeholders present) and do not 404.
  - Clicking a door navigates to the expected route.

- **Accessibility & a11y quick checks**:
  - All interactive items are keyboard-focusable.
  - Hover-only information has a keyboard-accessible equivalent.

Report template
- Browser (Chrome/Firefox + versions):
- Machine / CPU (brief):
- Notes (passes/fails + reproduction steps):
- Screenshots (attach if possible):

If any blocking issues found (console errors, infinite motion, major layout regressions), mark as BLOCKER and post in the PR thread with `screenshot`, `console` and steps to reproduce.
