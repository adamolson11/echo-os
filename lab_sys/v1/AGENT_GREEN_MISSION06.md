# AGENT GREEN — MISSION 06 (Local QA + Safety Net + Pair Programming Support)

Branch: `iron-gateway-hallway-mvp`

Goal: Validate Iron’s glow + alignment work on local dev server, fix only runtime/blocking issues, and prepare branch for merge-readiness.

Steps (exact):

1) Pull latest

```bash
git fetch
git checkout iron-gateway-hallway-mvp
git pull
```

2) Run dev server

```bash
# optional: clean first if you hit stale build artifacts
rm -rf .next
npm install
npm run dev
```

3) Quick checks (open `/gateway`)

- Confirm the page loads (no blank page)
- No hydration errors in console
- No TypeScript failures in terminal
- No Tailwind missing class errors in console
- No layout explosions or content shifting

4) Fix ONLY blocking issues

Allowed fixes (small, surgical):
- missing imports / exports
- naming mismatches (prop names, function names)
- type mismatches that produce runtime crashes
- undefined variables used in JSX (eg. `GlowClass`)
- container/layout wrapper mismatches that break rendering
- runtime crashes

Not allowed:
- visual design changes
- glow tuning / style adjustments
- copy changes
- creative refactors

5) Tag visual issues for Platinum

If you see glow or spacing problems that are design-related (not breaking), annotate them and leave for Agent Platinum to patch. Use `lab_sys/v1/reports/green-visual-issues.md` for screenshots and notes.

6) Pair with Iron

- If Iron has build or runtime errors, help fix the code-level issues only.
- If Platinum's patches create breakage, stabilize them.

7) Report (structured reply)

Respond with:

🟢 Agent Green — Mission 06 Report

Branch: iron-gateway-hallway-mvp
Dev server: succeeded / failed (paste terminal logs)
Gateway load: OK / Broken (describe)
Glow behavior: working / undefined / broken
Hallway spacing: OK / needs Platinum (describe)
Errors fixed: (list only essentials — filenames & short desc)
Branch stability: stable / unstable
Ready for next: yes / no

Timestamp: (ISO)

---

Place any generated logs or screenshots under `lab_sys/v1/reports/` and commit them to the branch so Iron can see them.
