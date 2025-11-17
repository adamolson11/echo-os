"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { seriesColorMap } from "../../config/codexColors";

type Props = {
  selectedNode: any;
  onSelectNode: (node: any) => void;
  indexedNodes: any[];
  indexSearch: string;
  setIndexSearch: (v: string) => void;
  loadFullNote: (n: any) => void;
  isLoadingNote?: boolean;
  noteError?: string | null;
  selectedNoteMarkdown?: string | null;
  nodeColor?: (n: any) => string;
  fgRef?: any;
};

export default function CodexSidebar({
  selectedNode,
  onSelectNode,
  indexedNodes,
  indexSearch,
  setIndexSearch,
  loadFullNote,
  isLoadingNote,
  noteError,
  selectedNoteMarkdown,
  nodeColor,
  fgRef,
}: Props) {
  return (
    <aside className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-64 flex-col border-l border-white/10 bg-black/70 backdrop-blur">
      <div className="pointer-events-auto flex-1 overflow-y-auto px-4 py-4 text-xs">
        <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500">Node Details</div>

        {selectedNode ? (
          <>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: nodeColor ? nodeColor(selectedNode) : "#fff" }} />
              <h2 className="text-sm font-semibold">{selectedNode.label || selectedNode.id}</h2>
            </div>

            <p className="mt-1 text-[11px] text-gray-400">{selectedNode.type}{selectedNode.series ? ` · ${selectedNode.series}` : ""}</p>

            {selectedNode.tags && selectedNode.tags.length > 0 && (
              <p className="mt-2 text-[10px] text-gray-500">Tags: {selectedNode.tags.join(", ")}</p>
            )}

            {selectedNode.path && (
              <p className="mt-2 text-[10px] text-gray-600">File: <span className="font-mono">{selectedNode.path}</span></p>
            )}

            {selectedNode.meta?.summary && (
              <p className="mt-3 text-[11px] text-gray-300">{selectedNode.meta.summary}</p>
            )}

            <div className="mt-4 flex items-center gap-2">
              <button
                className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em]"
                onClick={() => selectedNode && loadFullNote(selectedNode)}
                disabled={isLoadingNote}
              >
                {isLoadingNote ? "Loading…" : "Open full note"}
              </button>
              {noteError && <span className="text-[10px] text-red-400">{noteError}</span>}
            </div>

            {selectedNoteMarkdown && (
              <div className="mt-3 max-h-64 overflow-y-auto rounded-lg border border-white/10 bg-black/50 p-3 text-[11px] leading-relaxed prose prose-invert prose-p:my-1 prose-li:my-0">
                <ReactMarkdown>{selectedNoteMarkdown}</ReactMarkdown>
              </div>
            )}
          </>
        ) : (
          <p className="text-[11px] text-gray-500">Click a node in the graph to see its details here.</p>
        )}

        {/* Node Index */}
        <div className="mt-6 border-t border-white/10 pt-3">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500">Index</div>

          <input
            value={indexSearch}
            onChange={(e) => setIndexSearch(e.target.value)}
            placeholder="Search nodes…"
            className="mb-2 w-full rounded-md border border-white/10 bg-black/40 px-2 py-1 text-[11px] text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-300"
          />

          <div className="max-h-48 space-y-1 overflow-y-auto text-[11px]">
            {indexedNodes.map((node) => (
              <button
                key={node.id}
                onClick={() => {
                  onSelectNode(node);
                  if (fgRef && fgRef.current && (node as any).x != null && (node as any).y != null) {
                    const { x, y } = node as any;
                    try {
                      fgRef.current.centerAt(x, y, 400);
                      fgRef.current.zoom(4, 400);
                    } catch (err) {}
                  }
                }}
                className="flex w-full items-center justify-between rounded-md px-2 py-1 text-left transition hover:bg-white/5"
              >
                <span className="truncate">{node.label || node.id}</span>
                {node.series && (
                  <span className="ml-2 inline-block h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: seriesColorMap[node.series] || seriesColorMap.Default }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
