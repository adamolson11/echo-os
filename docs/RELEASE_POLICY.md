# Reviewers & Release Cadence (Draft)

Purpose

Define a lightweight process for reviews and publishing new content or UI changes.

Recommendations

- Default reviewer: `@adam` for content and UI changes during Phase 1 (solo/team lead).
- Workflow:
  - Content edits: prefer PRs for review when more than one person is involved. Single-author quick edits can be committed directly, but a PR is still recommended for traceability.
  - UI/feature changes: always use a branch + PR with a short description and screenshots where relevant.
- Branch protection (future): enable `main` protection and require at least one approving review for UI or infrastructure changes.
- CI checks: add lint + typecheck and a static content validator (ensure required frontmatter fields are present) before merging.

Publishing cadence

- For content updates: merge when ready (no strict schedule). For major content drops (e.g., new book release), coordinate a scheduled deployment and announce in the project notes.
- For UI/feature releases: group small changes and release weekly or on-demand for important fixes.

Ownership & escalation

- `@adam` is responsible for final approvals. If unavailable, designate a backup reviewer.

Next steps

- Implement a basic CI check that runs `npm run lint` and a small script validating frontmatter for new content files.
