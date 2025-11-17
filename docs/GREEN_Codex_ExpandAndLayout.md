# Director → Green: Expand Codex Dataset + Layout Polish

## Part 1 — Expand Codex Dataset (show *all* codex notes)

**Task: Expand codex.json so the graph shows the full dataset (not just 4 nodes).**

1. Open `scripts/buildCodex.cjs` (or whichever script writes `codex.json`).
   Locate the part where we skip notes based on frontmatter (e.g. `publish`, `draft`, `codex`, or similar). It will look roughly like:

   ```js
   if (meta.draft) return;
   if (!meta.codex || meta.codex === "skip") return;
   // or: if (!meta.publish) return;
   ```

2. Temporarily **relax the filters** so we include any note in the codex folder. For now, use:

   ```js
   // TEMP: include all notes under codex/ for visualization
   // Comment out any strict publish/draft gating:
   // if (meta.draft) return;
   // if (!meta.publish) return;
   ```

   Make sure we’re including all `.md` files under the root codex directory (e.g. `codex/**/**/*.md`).

3. Add a quick log so we see how many nodes we write:

   ```js
   console.log(
     `[buildCodex] included ${nodes.length} nodes and ${links.length} links`,
   );
   ```

4. Run the builder and dev server:

   ```bash
   node scripts/buildCodex.cjs
   npm run dev
   ```

5. Open `/codex` and check:

   * Console should log something like:
     `[buildCodex] included 18 nodes and 42 links`
   * `[CodexGraph] graphData` should show the larger nodeCount.
   * The graph should now show a more complex network, not just 4 nodes.

We’ll tighten filters later (using a `codex: true` or `publish: true` flag), but for now the goal is **max visibility** of existing notes.

---

## Part 2 — Make the graph big, text smaller, top less jumbled

**Task: Adjust Codex layout so the graph is bigger and the text is lighter.**

1. In `src/app/codex/page.tsx`, locate the **center content section** where the Echo OS text + graph live.

2. Change the structure to a **vertical stack** inside the center column:

   * Echo OS title + description at top
   * Graph panel directly below, large and wide

   For the graph wrapper, replace the current div with:

   ```tsx
   <div className="mt-6 w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden h-[520px]">
     <CodexGraph
       ref={fgRef as any}
       graphData={graphDataForView ?? { nodes: [], links: [] }}
       hoverNode={hoverNode}
       selectedNode={selectedNode}
       onNodeHover={setHoverNode}
       onNodeClick={handleGraphNodeClick}
     />
   </div>
   ```

   Notes:

   * `max-w-3xl` centers the brain nicely and makes it **wider** than before.
   * `h-[520px]` gives it a solid height without taking over the entire viewport.

3. Make sure the filters row at the very top uses:

   ```tsx
   className="flex flex-wrap gap-3"
   ```

   so the chips don’t feel jumbled when they wrap.

4. Keep left nav and right node-details panels as they are; this is **center layout only**.

5. Run `npm run dev` and open `/codex`. Confirm:

   * The graph is **visibly larger** and more central.
   * Top filters wrap cleanly.
   * Text block feels like a header, not the main event.

---

### After both tasks

* The graph will pull in **many more nodes** (whatever’s in your codex folder).
* The canvas will be **wide and solid**, not a tiny pill.
* The **text is secondary**, just explaining what Codex is.

When done, report back with the updated console logs (e.g. `[CodexGraph] graphData: { nodeCount: X, linkCount: Y }`) and a screenshot if possible. We’ll do one final micro-tune afterwards.
