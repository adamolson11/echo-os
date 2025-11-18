# Director Notes — Codex v2 (sandbox/codex-layout-v2)

Summary of work completed by Green:

- Applied physics rebalance:
  - Link distance base ~120 (scales with node count)
  - Computed repulsive charge clamped in the -400 to -500 range for better separation
  - d3AlphaDecay set to 0.03, d3VelocityDecay set to 0.4; simulation reheated
- Micro-performance tweaks:
  - Lowered wobble frequency and amplitude
  - Reduced halo stroke sizes and disabled shadow blur on Firefox
  - Raised label render threshold: labels only render when zoom > ~0.85
- Label flash fix:
  - Labels now render only after the force simulation completes (using `onEngineStop` → `engineSettled` flag)
- Story route split and door placeholder SVGs added to eliminate routing errors and 404s
- QA checklist and PR notes added: `docs/QA_CHECKLISTS/door-hallway-phase1.md` and `docs/PR_NOTES/sandbox-codex-layout-v2.md`

Current status:
- Branch: `sandbox/codex-layout-v2` (pushed)
- Green has completed H1 and the Director-requested physics rebalance; micro-perf tweaks applied.
- Micro perf and initial H2 investigation applied; further H2 fixes pending Yellow's QA.

Next recommended actions for Director:
1. Ask Yellow to run Phase 1 QA using the checklist (file above). A prepared ping exists at `docs/TEAM_PINGS/phase1_ping.md`.
2. If Yellow reports no blockers, approve a PR for `sandbox/codex-layout-v2` → `main` for Director review.
3. If Firefox hover lag remains, allow Green to further reduce canvas stroke/halo or convert hover highlighting to a lightweight DOM overlay for Firefox.

Request for Director:
- Please confirm whether we should:
  - Proceed to open a PR and request formal review, or
  - Run another Green iteration focused on Firefox-specific fixes before PR.

(End of notes)
