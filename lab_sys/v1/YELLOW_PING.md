# Yellow QA Ping

Branch: `sandbox/codex-layout-v2`
PR: Draft PR -> `main` (see `docs/PR_NOTES/sandbox-codex-layout-v2.md`)

Hi Yellow team,

Green has applied the Rainbow visual spec and stabilized the Codex graph for the MVP. Please run Phase 1 QA now using the checklist at `lab_sys/v1/READY_FOR_QA.md` (or `docs/QA_CHECKLISTS/door-hallway-phase1.md` if preferred).

Scope to cover:
- Routes: `/gateway`, `/story`, `/lab`, `/archive`, `/codex`
- Browsers: Chrome (stable) and Firefox (latest), desktop + mobile emulation
- Checks: visual alignment, door cutout positions, responsive behavior, label flicker/jitter, hover interactions, console errors

Report format (one line per issue):
- **Route**: `/gateway` — **Browser/viewport**: Chrome desktop — **Severity**: Minor — **Description**: door background misaligned at 1280px — **Steps to reproduce**: open page, resize — **Suggestion**: tweak `bgPosition` for `codex` door

Please respond here (commit to repo by adding a short report file under `lab_sys/v1/reports/` or paste findings as a GitHub PR comment). If you need screenshots, add them under `lab_sys/v1/reports/screenshots/`.

Thanks — Green is standing by to apply quick fixes.

Timestamp: 2025-11-19T00:00:00Z