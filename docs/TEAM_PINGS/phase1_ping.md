# Team Ping - Phase 1 QA (Yellow)

Hi team — quick ping to run Phase 1 QA on `sandbox/codex-layout-v2`.

Purpose
- Validate the Codex graph physics and Door Hallway baseline so we can move to a Director review.

Instructions (copy/paste)
```
git fetch && git checkout sandbox/codex-layout-v2
npm install
npm run dev
# Open these pages and follow the checklist:
#  - http://localhost:3000/codex
#  - http://localhost:3000/story
#  - http://localhost:3000/story/wolves

# QA checklist: docs/QA_CHECKLISTS/door-hallway-phase1.md
```

Please report:
- Browser + versions used
- Pass/Fail summary for each checklist item
- Any console errors, screenshots, and repro steps

If you mark anything BLOCKER, tag `@Director` and include the screenshot + console log.

Thanks — Green completed the physics rebalance and micro-perf tweaks and pushed them to `sandbox/codex-layout-v2`.
