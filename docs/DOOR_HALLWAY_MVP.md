# Door Hallway MVP Playbook

This document is an authored copy of the Door Hallway MVP Playbook (Green + Yellow).

Follow the phases below in order. Green implements; Yellow verifies after each phase.

> **Note to Yellow — quick reminder:**
>
> - You are *Yellow* on this playbook. If you feel confused, pause and remember your role: **verify, report, and provide clear acceptance or issues**.
> - When Green posts "Phase X ready for QA", reply with either:
>   - `Phase X OK` — and optionally a 1-line confirmation, or
>   - `Phase X issues:` followed by a short bulleted list of problems and at least one screenshot or console log if available.
> - If something seems wrong and you're unsure whether it's a bug or intended, mark it as `Phase X issues` and ask Green for clarification — err on the side of reporting.
> - If you want a checklist to copy/paste for each phase, use: `loads`, `render count`, `visual sanity`, `keyboard-focus`, `console-errors`.


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

## Phase 1 - Audit Notes

**How many doors are currently rendered?**
- Four doors are rendered: Story Room, Living Codex, Lab, Archive.

**What props does each door receive?**
- `key` (string) — unique id used as React key.
- `label` (string) — primary door label shown as bold text.
- `eyebrow` (string) — small uppercase category text above the label.
- `href` (string) — link destination (e.g. `/story`, `/codex`).
- `image` (string) — image path used as background (falls back to `/images/portal-doors.jpg` in `DoorCard`).
- `tagline` (string) — short descriptive line under the label.

**Current layout grid classes**
- Container uses `grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 md:px-0`.
- Each card uses responsive aspect ratio `aspect-[9/16] sm:aspect-[2/3]` and `w-full` so cards fill their grid cell.

**Obvious accessibility gaps**
- `DoorCard` currently sets `aria-hidden` on the background image container (good for screen readers), but the Link does not include an explicit `aria-label` (the `href` is present). Consider adding `aria-label` to the Link with a short accessible name (e.g. `"Enter Story Room"`).
- Background images are decorative but should have an accessible alternative where appropriate; adding `aria-label` or screen-reader-only text describing the door destination is recommended.
- Keyboard focus styles exist in some forms (cards rely on `:focus` via Link) but explicit `focus-visible` utility classes would improve clarity.
- Contrast: overlay is present (`bg-black/44`) but some combinations of placeholder art + overlay may reduce readability — test with Yellow for contrast problems.

**Files inspected**
- `src/components/gateway/DoorHallway.tsx` — centralized `DOORS` array and grid mapping
- `src/components/gateway/DoorCard.tsx` — card component; background set via inline CSS `backgroundImage`, overlay, frame, knob, labels.

**Quick notes / TODOs for Phase 2**
- Add `aria-label` to the Link in `DoorCard`.
- Ensure `next/image` usage is considered for better performance (but keep a fallback if image files missing).
- Tune overlay opacity for legibility across placeholder images.

Phase 1 audit complete.
