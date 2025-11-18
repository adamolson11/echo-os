# AGENT YELLOW — PERFORMANCE OPTIMIZATION DIRECTIVES (v2.0)

Role: Browser QA, Runtime Performance, DevTools Diagnostics
Objective: Reduce RAM usage, smooth out the dev server, fix graph jitter/overlap behavior, and identify any browser-specific bottlenecks.

---

## 1. Reduce Browser RAM Usage (Immediate Actions)

A. Disable heavy Chrome features

In Chrome DevTools console run:

```js
performance.disableResourceTiming();
```

Then disable flags:

- `chrome://flags/#enable-gpu-rasterization` → Disabled
- `chrome://flags/#heavy-ad-trial` → Disabled
- `chrome://flags/#back-forward-cache` → Disabled

B. Close background viewport renderers

In DevTools → Performance → check for:

- Canvas recording (turn OFF)
- WebGPU (turn OFF)
- Layers panel auto-refresh (turn OFF)

C. Force reduced FPS for dev graph

In the console on the Codex page:

```js
window.requestAnimationFrame = (cb) => setTimeout(cb, 32) // ~30 FPS cap
```

---

## 2. Reduce Next.js Dev Memory Consumption

A. Disable React Dev Overlay

In localhost URL bar append:

```
?reactDevTools=false
```

B. Turn off Next.js Fast Refresh temporarily

In Chrome Console:

```js
localStorage.setItem('next.disableFastRefresh', 'true');
```

Then hard reload.

C. Close duplicated dev servers

Yellow must verify in Task Manager → Details:

- `node.exe` (ensure only ONE dev server)
- `chrome.exe` (ensure no more than 3–5 processes)

If multiple Node processes exist → kill all → restart `npm run dev`.

---

## 3. Codex Graph Optimization (Yellow + Green coordination)

A. Check for oversized text nodes

- Compare Chrome vs Firefox for font-size, overlapping edges and initial flash.
- Report: "Text flashes for X ms", "Font size is X px in Chrome, Y px in Firefox", "Scroll smoothing differences".

B. Disable GPU acceleration for D3 (testing)

- Settings → System → Use hardware acceleration (toggle OFF). Restart browser and re-test.

---

## 4. Node-Cluster Spacing Diagnosis

A. Validate bounding box

DevTools → Elements → hover Codex canvas → check width, height, overflow.

B. Inspect physics timing

DevTools → Performance → record 4s and look for d3 tick spikes and forced reflow.

Report:

- Avg tick rate: ___
- Number of layout shifts: ___
- Nodes overlap: yes/no
- Canvas resize events: ___

---

## 5. Lighthouse Browser Audit

Run Lighthouse (Performance only, mobile + desktop) and report:

- Largest bottleneck
- JS execution time
- Layout shift warnings
- GPU rasterization warnings

---

## OUTPUT FORMAT FOR YELLOW

```
[Browser QA Report - Timestamp]

RAM Usage:
- Chrome: ___ GB
- Firefox: ___ GB

Dev Server:
- Active Node processes: ___

Codex Graph:
- Font-size difference? yes/no
- Flash of letters on load: ___ ms
- Cluster spacing: good / too tight / too spread

Performance Notes:
- Major blocking tasks: ___
- GPU issues: ___
- Suggestions for Green: ___
```

---

## Instructions for Green (brief)

Green must adjust:

- node font-size scaling → reduce 40%
- increase linkDistance by +20%
- increase chargeStrength (negative) by -200 → -400
- add automatic margin spacing on initial tick
- debounce canvas resize to 100ms


---

When you're done, paste the report in the playbook and tag Green. If you want, I can also generate a ready-to-apply patch for Green with the exact code edits to `src/app/codex/CodexGraph.tsx`.
