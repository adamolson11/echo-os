READY FOR QA — Green Checklist

Branch: `sandbox/codex-layout-v2`

Purpose: This file instructs Green to run the visual QA pass before Yellow proceeds. It references the Execution Pack in `README.md`.

Steps for Green

1. Pull the latest branch and confirm you're on `sandbox/codex-layout-v2`:

```bash
git fetch origin
git checkout sandbox/codex-layout-v2
git pull origin sandbox/codex-layout-v2
```

2. Install and run dev server:

```bash
npm install
npm run dev
# open http://localhost:3000 in Chrome and Firefox
```

3. Pages to inspect
- `/gateway` — gateway hero and hallway of portal doors
- `/story` and `/story/wolves` — Story room and full-screen story reader
- `/lab` — Echo Lab
- `/archive` — Archive landing
- `/codex` and a few codex nodes (e.g., `/codex/Chapter 1`)

4. QA checklist (Chrome + Firefox, desktop + mobile emulation)
- Navigation: each door routes correctly (/story, /codex, /lab, /archive)
- Hero & Hallway visuals: no unintended cropping, doors align, cutouts look right
- Door image focal points: check at small/medium/large breakpoints
- StoryRoom: full-bleed background/video and expected scrolling/viewport behavior
- Codex Graph: labels stable (no flash), minimal jitter, hover highlights and DOM overlay in Firefox
- Performance: no severe FPS drops during interaction
- Console/Network: no runtime errors, no missing assets (404s)
- Accessibility: keyboard focus rings on door links, touch hit targets are large enough

5. Reporting format (required for each issue)
- Route: `/gateway`
- Browser/OS: Chrome 120 / Windows 11
- Severity: Blocker / Major / Minor
- Description: One-sentence summary + steps to reproduce
- Console errors: paste stack trace if present
- Screenshot(s): attach desktop + mobile screenshot
- Suggested minimal fix: (optional) e.g., `Adjust bgPosition for story door`

If you find issues, post the report here. If you want me to apply any minimal fixes, paste one example report and say `Fix these` and I will implement the change, run `npm run build` to validate, commit, and push.

Notes
- The Execution Pack (the message to Green) is available in `README.md` in this folder if you need the original copy/paste text.
- I committed the current local edits and this `READY_FOR_QA.md` to `sandbox/codex-layout-v2`. Pull before starting QA.
