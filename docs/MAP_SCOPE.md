# Map / Graph Scope (Proposal)

Goal

Define a narrow, deliverable Phase 2 scope for `/map` that gets useful functionality quickly without requiring a large engineering effort.

Proposal (Phase 2)

- Deliver an interactive node/edge viewer using a lightweight client library (e.g., vis-network or cytoscape) OR a simple interactive D3 view — optional, can be deferred.
- Minimum viable functionality (deliverable now):
  - `/map` lists nodes and provides links to pages (already implemented as a stub).
  - Add simple filters (by `type` or `tag`).
  - Allow clicking a node to expand a small detail panel (title, type, tags, link to node page).

Defer to Phase 3

- Full live sync with Obsidian graph/topology.
- Complex graph visualizations with pan/zoom/cluster.

Implementation notes

- Keep the server-side data source as `src/data/graph.ts` or generate from `content/codex` if desired.
- Start with client-side rendering of a JSON nodes+edges structure serialized at build time.

Questions for the team

- Do we want an interactive graph in Phase 2 or just an enhanced node list with filters?
- Which library (if any) do we prefer for graph rendering?
