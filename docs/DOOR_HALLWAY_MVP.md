# Door Hallway MVP Playbook

This document is an authored copy of the Door Hallway MVP Playbook (Green + Yellow).

Follow the phases below in order. Green implements; Yellow verifies after each phase.

---

(Full playbook content supplied by Director was pasted here.)

## PHASE 0 — Setup & Branch
- Green: Pull latest `main`.
- Green: Create `feat/door-hallway-mvp`.
- Green: Confirm `DoorHallway` and `DoorCard` build without runtime errors.

## PHASE 1 — Audit Current Door Hallway
- Green: Audit files and leave a `// TODO:` block summarizing plan.
- Yellow: Baseline verification.

## PHASE 2 — Layout & Spacing Polish
- Green: Polish grid, spacing, add hallway background.
- Yellow: Test layout across breakpoints.

## PHASE 3 — DoorCard Visual Polish
- Green: Use `next/image` + overlay, hover/focus, keyboard focus, ensure whole card clickable.
- Yellow: Test hover/focus, keyboard navigation.

## PHASE 4 — Per-Door Identity (Visual Feel)
- Green: Make DOORS config support per-door styling, add placeholders with alt text and aria labels.
- Yellow: Confirm per-door differences and accessibility basics.

## PHASE 5 — Motion & Transitions
- Green: Add lightweight motion (hover transitions, optional entrance animation).
- Yellow: Test smoothness/performance.

## PHASE 6 — Mobile & Edge Cases
- Green: Test narrow/mobile/tablet/desktop and adjust typography/tap targets.
- Yellow: Mobile tap tests and edge cases.

## PHASE 7 — Cleanup & Ready-for-Director
- Green: Remove dead code, lint, build, and post summary for Director.
- Yellow: Final QA verdict.

---

Reporting protocol:
- After each phase, Green posts: "Phase X ready for QA. Focus on: [ ... ]".
- Yellow replies with either "Phase X OK" or "Phase X issues: ...".

Director will be pulled in only when Green+Yellow agree "MVP ready".
