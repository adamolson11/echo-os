# 🟩 FINAL INSTRUCTIONS FOR GREEN (Paste This Into Green)

**Task: Implement the stable, centered, glowy Codex Graph.**

Please complete the following:

---

### 1. Overwrite the CodexGraph component

Replace the entire file at:

```
src/app/codex/CodexGraph.tsx
```

with the CodexGraph code I provided earlier (glowy nodes, series/type colors, link particles, cooldownTicks=80, full-bleed `<ForceGraph2D>` container).

---

### 2. Add graph centering logic to `codex/page.tsx`

Inside:

```
src/app/codex/page.tsx
```

do the following:

* Ensure the page is a **client component** (`"use client";` at the top).
* Add:

```tsx
const fgRef = useRef<ForceGraphMethods | null>(null);
```

* After `filteredGraphData` is computed, add:

```tsx
useEffect(() => {
  if (!fgRef.current) return;
  if (!filteredGraphData?.nodes?.length) return;

  const handle = setTimeout(() => {
    try {
      fgRef.current?.zoomToFit(400);
    } catch (e) {
      console.warn("zoomToFit failed:", e);
    }
  }, 150);

  return () => clearTimeout(handle);
}, [filteredGraphData]);
```

This ensures the graph visually centers after filtering or initial load.

---

### 3. Replace the middle panel wrapper

In the JSX layout of `codex/page.tsx`, update the **middle graph panel** to:

```tsx
<div className="mt-6 h-[640px] w-full rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden">
  <CodexGraph
    ref={fgRef as any}
    graphData={filteredGraphData ?? { nodes: [], links: [] }}
    hoverNode={hoverNode}
    selectedNode={selectedNode}
    onNodeHover={setHoverNode}
    onNodeClick={handleGraphNodeClick}
  />
</div>
```

Do **not** modify the left sidebar or right sidebar — only replace this center block.

---

### 4. Build + test

Run:

```
node scripts/buildCodex.cjs
npm run dev
```

Then go to:

```
http://localhost:3000/codex
```

Confirm:

* Graph fills the middle column
* Nodes glow & show labels
* Physics settles after ~1 second
* `zoomToFit` centers the graph automatically

---

# ✔️ End of Instructions

Let me know when this is done so the Director can merge the next phase.
