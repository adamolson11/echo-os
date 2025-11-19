NOTIFICATION: Yellow — QA / Review Request

Branch: sandbox/codex-layout-v2
PR Draft: https://github.com/adamolson11/echo-os/compare/main...sandbox/codex-layout-v2?expand=1

Summary:
Green has prepared the visual MVP and run initial checks. Please run the Yellow QA phase following the checklist in `lab_sys/v1/READY_FOR_QA.md` and the PR notes in `docs/PR_NOTES/sandbox-codex-layout-v2.md`.

Required actions for Yellow:
1. Pull branch and open the site
   ```bash
   git fetch origin
   git checkout sandbox/codex-layout-v2
   git pull origin sandbox/codex-layout-v2
   npm install
   npm run dev
   # open http://localhost:3000 in Chrome and Firefox
   ```

2. Run the full Yellow QA checklist (focus areas):
   - Cross-browser rendering (Chrome + Firefox)
   - Door hallway alignment and cutouts across breakpoints
   - StoryRoom full-screen behavior
   - Codex graph stability, label rendering, and performance
   - Accessibility checks (keyboard navigation / focus outlines)

3. Report findings using the format in `lab_sys/v1/READY_FOR_QA.md` (one issue per report). Include screenshots and severity.

4. For any blocking or major issues, add a comment on the PR with the issue report and tag @team-rainbow and @team-director (or list users) so they can respond with copy or assets.

5. If you accept the build for Director review, mark `lab_sys/v1/READY_FOR_QA.md` as "Yellow Approved" and create the READY_FOR_DIRECTOR.md report summary.

Notes:
- If you need copy or new images, ping Rainbow (see `lab_sys/v1/NOTIFY_RAINBOW.md`).
- Agent Blue is on standby to apply minimal visual/code fixes and push them to the branch.
