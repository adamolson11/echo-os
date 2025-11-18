# PR Draft: sandbox/codex-layout-v2 → main

Title: feat(codex): physics rebalance + micro-perf tweaks (Codex v2)

Summary
- Applies Director-requested physics rebalance and micro-performance improvements to the Codex force graph.
- Moves StoryRoom into `/story/wolves` to eliminate duplicate exports and adds SVG placeholders for door images to avoid 404s during dev.
- Adds Phase 1 QA checklist for Yellow: `docs/QA_CHECKLISTS/door-hallway-phase1.md`.

Key changes
- `src/app/codex/CodexGraph.tsx`
  - Link distance increased (base ~120), computed charge clamped to -400..-500, `d3AlphaDecay=0.03`, `d3VelocityDecay=0.4`, reheated simulation
  - Micro-perf: lower wobble frequency/amplitude, reduce halo stroke, raise label render threshold, disable shadow blur on Firefox
- `src/app/story/page.tsx` and `src/app/story/wolves/page.tsx` — split StoryRoom into its own page to fix duplicate default export
- `public/images/doors/*.svg` — lightweight placeholders for development
- `docs/QA_CHECKLISTS/door-hallway-phase1.md` — QA checklist for Yellow

How to test (quick)
1. Checkout branch: `git fetch && git checkout sandbox/codex-layout-v2`
2. Install deps: `npm install`
3. Start dev: `npm run dev`
4. Open pages: `/codex`, `/story`, `/story/wolves`
5. Follow `docs/QA_CHECKLISTS/door-hallway-phase1.md`

Notes for reviewers
- This is a Green -> Yellow handoff. Please run the QA checklist and report any regressions.
- If Firefox shows hover lag, note console output and performance metrics; consider reducing canvas shadow/stroke further.

Request
- Assign Yellow for Phase 1 QA. Tag Director when Yellow marks READY FOR DIRECTOR REVIEW.
