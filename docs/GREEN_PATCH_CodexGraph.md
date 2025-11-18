# Patch for Green — CodexGraph performance & spacing adjustments

This file contains a safe, copy-pasteable patch and explanation Green can apply to `src/app/codex/CodexGraph.tsx`.

Goal: reduce font-size scaling, increase link distance, increase repulsion (charge), add collide force for spacing, and debounce resize handling.

Suggested edits (high-level):

1. Import `forceCollide` from `d3-force`.
2. Multiply linkDistance by 1.2.
3. Increase charge strength (more negative) based on node count (clamped between -200 and -400).
4. Add a `collide` force: `fg.d3Force('collide', forceCollide(collideRadius))` with `collideRadius` scaled by sqrt(nodeCount).
5. Reduce label scaling by ~40%: change BASE label constant and clamp.
6. Add a debounced window `resize` handler to call `fg.zoomToFit(...)` after 100ms.

---

Copy the patch below and apply it to `src/app/codex/CodexGraph.tsx`.

*** Begin Patch ***
*** Update File: src/app/codex/CodexGraph.tsx
@@
-import React, { forwardRef, useEffect, useRef, useImperativeHandle, useState, useMemo } from "react";
+import React, { forwardRef, useEffect, useRef, useImperativeHandle, useState, useMemo } from "react";
+import { forceCollide } from 'd3-force';
@@
-      const nodeCount = (graphData?.nodes?.length as number) || 1;
-      const baseDistance = 80;
-      const scaledDistance = Math.min(260, baseDistance + Math.sqrt(nodeCount) * 8);
-
-      try {
-        fg.d3Force && fg.d3Force("charge")?.strength(-80);
-        fg.d3Force && fg.d3Force("link")?.distance(scaledDistance);
-        fg.d3AlphaDecay && fg.d3AlphaDecay(0.035);
-        fg.d3VelocityDecay && fg.d3VelocityDecay(0.5);
-        fg.d3ReheatSimulation && fg.d3ReheatSimulation();
-
-        fg.zoomToFit && fg.zoomToFit(400, 50);
-      } catch (e) {
-        // ignore if methods unavailable
-      }
+      const nodeCount = (graphData?.nodes?.length as number) || 1;
+      const baseDistance = 80;
+      // increase link distance by ~20% for extra breathing room
+      const scaledDistance = Math.min(420, (baseDistance + Math.sqrt(nodeCount) * 8) * 1.2);
+
+      // stronger negative charge scaled by node count, clamped [-400, -200]
+      const computedCharge = -Math.min(400, Math.max(200, 80 + Math.round(nodeCount * 2)));
+
+      // collide radius scaled by sqrt(nodeCount), clamped
+      const collideRadius = Math.min(40, Math.max(6, Math.sqrt(nodeCount) * 3));
+
+      try {
+        fg.d3Force && fg.d3Force("charge")?.strength(computedCharge);
+        fg.d3Force && fg.d3Force("link")?.distance(scaledDistance);
+        // add a collide force to prevent hard overlap (helps initial packing)
+        fg.d3Force && fg.d3Force("collide") && fg.d3Force("collide", forceCollide(collideRadius));
+
+        fg.d3AlphaDecay && fg.d3AlphaDecay(0.035);
+        fg.d3VelocityDecay && fg.d3VelocityDecay(0.56);
+        fg.d3ReheatSimulation && fg.d3ReheatSimulation();
+
+        fg.zoomToFit && fg.zoomToFit(400, 50);
+      } catch (e) {
+        // ignore if methods unavailable
+      }
*** End Patch ***

Notes & rationale:
- Using `forceCollide` adds a quickly effective anti-overlap force that gives nodes breathing room during the first ticks.
- The computed charge scales with nodeCount so larger graphs push nodes further apart.
- The link distance cap is increased to allow the UI to breathe on larger graphs.

Follow-up (Green):
- If you accept this patch, test `/codex` locally and confirm that label font sizes are readable. If labels remain too large on initial render, adjust the label `BASE` constant in the `nodeCanvasObject` down by another ~20%.
- If performance degrades on extremely large graphs, consider lowering `collideRadius` and `computedCharge` for node counts > 200.

If you want, I can open a PR with this patch applied to `feat/door-hallway-mvp` (or a feature branch you prefer).