Mad Scientist — Experiments & Feedback Loop
=========================================

Purpose
-------
This document formalizes the "Mad Scientist" feedback-loop used to run fast experiments, synthesize QA findings, and convert them into minimal, reversible code changes.

Process (1–2 hour micro-loop)
-------------------------------
1. Input (Yellow/Green)
   - Short report: one-line problem, repro steps, URL, browser, device, nodeCount (if Codex), and attachments (screenshots/console/fps).

2. Triage (Mad Scientist)
   - Classify severity: Blocking / High / Medium / Low.
   - If Blocking: issue an immediate hotfix (single-file patch).
   - Otherwise: define 1–2 minimal experiments (30–90 minutes each).

3. Experiment (Green)
   - Implement a single, small, reversible change (<=5 files, ideally 1).
   - Commit with a clear message: `experiment/<short>-desc` and open PR or push to branch.

4. Verify (Yellow)
   - Run targeted checklist for the experiment and report metrics (fps, node count, time-to-interactive).

5. Decide (Mad Scientist)
   - Accept (merge), Iterate (new experiment), or Revert (rollback).

6. Document
   - Append results to this file or add a short note in the PR: hypothesis, action, result, recommendation.

Templates
---------

Triage note (short):

Problem: [one-line]
Repro: [url + browser + device + minimal steps]
Severity: [Blocking|High|Medium|Low]
Attach: [console/screenshot/fps]

Experiment PR template (brief):

Title: [Experiment] <short description>

Body:
- Problem: <one-line>
- Hypothesis: <what you expect>
- Change: <files touched, brief summary>
- Test steps: <exact steps for Yellow>
- Metrics to capture: <fps, nodeCount, screenshots>

Reporting (Mad Scientist → Director):

- Subject: [Experiment][PASS/FAIL] <short>
- Problem: <one-line>
- Hypothesis: <one-line>
- Action: link to commit/PR
- Result: <metrics + one-sentence conclusion>
- Recommendation: merge / iterate / revert

Wiring
------
- Label experimental PRs with `experiment` and `needs-qa`.
- Use short-lived branches: `experiment/mad-<short>`.
- Keep commits tiny and reversible.

Where to report
---------------
- Add QA results as comments on the PR.
- For Blocking issues, open an issue or ping the Director with the `Blocking` tag.

This document is intentionally compact — the goal is to move from discovery to a code action within 1–2 hours.
