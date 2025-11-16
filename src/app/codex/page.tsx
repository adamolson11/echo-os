"use client";

import { useEffect, useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import dynamic from "next/dynamic";

// react-force-graph uses window, so load it on client only
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

type CodexNodeType =
  | "chapter"
  | "character"
  | "symbol"
  | "event"
  | "theme"
  | "location"
  | "stub";

interface CodexNode {
  id: string;
  label: string;
  type: CodexNodeType | string;
  series?: string;
  slug?: string;
  path?: string;
  tags?: string[];
  weight?: number;
  meta?: Record<string, any>;
}

interface CodexLink {
  source: string;
  target: string;
  type?: string;
  strength?: number;
}

interface CodexGraphData {
  nodes: CodexNode[];
  links: CodexLink[];
}

export default function CodexPage() {
  const [data, setData] = useState<CodexGraphData | null>(null);
  const [hoverNode, setHoverNode] = useState<CodexNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<CodexNode | null>(null);
  const [activeTypes, setActiveTypes] = useState<Record<string, boolean>>({
    chapter: true,
    character: true,
    symbol: true,
    event: true,
    theme: true,
    location: true,
    stub: true,
  });
  const [selectedNoteMarkdown, setSelectedNoteMarkdown] = useState<string | null>(null);
  const [isLoadingNote, setIsLoadingNote] = useState(false);
  const [noteError, setNoteError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/codex.json")
      .then((res) => res.json())
      .then((json: CodexGraphData) => setData(json))
      .catch((err) => console.error("Failed to load codex.json", err));
  }, []);

  const nodeColor = (node: CodexNode): string => {
    switch (node.type) {
      case "chapter":
        return "#4fc3f7"; // blue
      case "character":
        return "#26c6da"; // teal
      case "symbol":
        return "#ffd54f"; // gold
      case "event":
        return "#f48fb1"; // magenta
      case "theme":
        return "#ce93d8"; // purple
      case "location":
        return "#a5d6a7"; // green
      case "stub":
        return "#9e9e9e"; // gray for stubs
      default:
        return "#ffffff";
    }
  };

  const graphData = useMemo(() => {
    if (!data) return null;

    const allowed = activeTypes;

    const nodes = data.nodes.filter((n) => {
      const t = (n.type as string) || "chapter";
      return allowed[t] !== false;
    });

    const nodeIds = new Set(nodes.map((n) => n.id));

    const links = data.links.filter((l) => nodeIds.has(l.source as string) && nodeIds.has(l.target as string));

    return { nodes: nodes.map((n) => ({ ...n })), links: links.map((l) => ({ ...l })) };
  }, [data, activeTypes]);

  async function loadFullNote(node: CodexNode) {
    if (!node?.id) return;
    setIsLoadingNote(true);
    setNoteError(null);

    try {
      const res = await fetch(`/api/codex?id=${encodeURIComponent(node.id)}`);
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `Request failed with ${res.status}`);
      }
      const data = await res.json();
      setSelectedNoteMarkdown(data.markdown || "");
    } catch (err: any) {
      console.error("Failed to load note", err);
      setNoteError(err?.message ?? "Failed to load note");
      setSelectedNoteMarkdown(null);
    } finally {
      setIsLoadingNote(false);
    }
  }

  if (!graphData) {
    return (
      <main className="min-h-screen bg-[#05050a] text-gray-200 flex items-center justify-center">
        <p className="text-sm tracking-wide text-gray-400">Loading Living Codex…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#05050a] text-gray-100 relative">
      {/* HUD */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-4 text-xs uppercase tracking-[0.24em] text-gray-400">
        <span className="pointer-events-auto rounded-full border border-white/10 bg-black/60 px-3 py-1">
          Echo OS / Living Codex
        </span>

        <div className="pointer-events-auto flex gap-2 text-[10px]">
          {["chapter", "character", "theme", "location", "event", "symbol", "stub"].map((type) => {
            const isOn = activeTypes[type] ?? true;
            return (
              <button
                key={type}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTypes((prev) => ({ ...prev, [type]: !isOn }));
                }}
                className={`rounded-full border px-2 py-1 capitalize ${
                  isOn
                    ? "border-white/40 bg-white/10 text-gray-100"
                    : "border-white/10 bg-black/30 text-gray-500"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {hoverNode && (
          <div className="pointer-events-auto rounded-xl border border-white/10 bg-black/80 px-3 py-2 text-[11px] max-w-xs">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: nodeColor(hoverNode) }}
              />
              <span className="font-medium truncate">{hoverNode.label}</span>
            </div>
            <div className="mt-1 text-[10px] text-gray-400">
              <span className="uppercase">
                {hoverNode.type} {hoverNode.series ? `· ${hoverNode.series}` : ""}
              </span>
              {hoverNode.tags && hoverNode.tags.length > 0 && (
                <span className="ml-2 text-gray-500">
                  {hoverNode.tags.slice(0, 3).join(" · ")}
                  {hoverNode.tags.length > 3 ? " +" : ""}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right-side details panel */}
      <aside className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-80 flex-col border-l border-white/10 bg-black/70 backdrop-blur">
        <div className="pointer-events-auto flex-1 overflow-y-auto px-4 py-4 text-xs">
          <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500">
            Node Details
          </div>
          {selectedNode ? (
            <>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: nodeColor(selectedNode) }}
                />
                <h2 className="text-sm font-semibold">{selectedNode.label || selectedNode.id}</h2>
              </div>
              <p className="mt-1 text-[11px] text-gray-400">
                {selectedNode.type}
                {selectedNode.series ? ` · ${selectedNode.series}` : ""}
              </p>

              {selectedNode.tags && selectedNode.tags.length > 0 && (
                <p className="mt-2 text-[10px] text-gray-500">Tags: {selectedNode.tags.join(", ")}</p>
              )}

              {selectedNode.path && (
                <p className="mt-2 text-[10px] text-gray-600">
                  File: <span className="font-mono">{selectedNode.path}</span>
                </p>
              )}

              {selectedNode.meta?.summary && (
                <p className="mt-3 text-[11px] text-gray-300">{selectedNode.meta.summary}</p>
              )}

              {selectedNode.meta && (
                <div className="mt-3 space-y-1 text-[10px] text-gray-500">
                  {Object.entries(selectedNode.meta)
                    .filter(([key, v]) => key !== "summary" && v != null && v !== "")
                    .map(([key, value]) => (
                      <div key={key}>
                        <span className="uppercase text-gray-600">{key}:</span> <span>{String(value)}</span>
                      </div>
                    ))}
                </div>
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
        </div>
      </aside>

      {/* Graph */}
      <div className="h-screen w-full pr-80"> {/* leave room for sidebar */}
          <ForceGraph2D
          graphData={graphData}
          backgroundColor="#05050a"
          cooldownTime={3000}
          linkDistance={40}
          nodeRelSize={4}
          linkWidth={() => 0.4}
          linkColor={() => "rgba(255,255,255,0.08)"}
          onNodeHover={(node: any) => setHoverNode(node || null)}
          onNodeClick={(node: any) => {
            setSelectedNode(node || null);
            setSelectedNoteMarkdown(null);
            setNoteError(null);
          }}
          nodeCanvasObjectMode={() => "before"}
          nodeCanvasObject={(
            node: any,
            ctx: CanvasRenderingContext2D,
            globalScale: number
          ) => {
            const typedNode = node as CodexNode & { x?: number; y?: number };

            const isHovered = hoverNode && hoverNode.id === typedNode.id;
            const isSelected = selectedNode && selectedNode.id === typedNode.id;

            const isNeighbor =
              hoverNode &&
              graphData.links.some(
                (l: any) =>
                  (l.source.id === hoverNode.id && l.target.id === typedNode.id) ||
                  (l.target.id === hoverNode.id && l.source.id === typedNode.id)
              );

            let alpha = 0.35;
            if (hoverNode || selectedNode) {
              if (isHovered || isSelected) alpha = 1;
              else if (isNeighbor) alpha = 0.8;
              else alpha = 0.07;
            }

            const radiusBase = 2.5;
            const weight = typedNode.weight ?? 1;
            const radius =
              radiusBase *
              weight *
              (isHovered || isSelected ? 1.8 : isNeighbor ? 1.3 : 1);

            const color = nodeColor(typedNode);

            if (typedNode.x == null || typedNode.y == null) return;

            // Glow halo
            const gradientRadius = radius * 4;
            const gradient = ctx.createRadialGradient(
              typedNode.x,
              typedNode.y,
              radius,
              typedNode.x,
              typedNode.y,
              gradientRadius
            );
            gradient.addColorStop(0, `${color}aa`);
            gradient.addColorStop(1, "rgba(0,0,0,0)");

            ctx.save();
            ctx.globalAlpha = alpha * 0.7;
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(typedNode.x, typedNode.y, gradientRadius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();

            // Core node
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(typedNode.x, typedNode.y, radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();

            // Tiny labels when zoomed in
            const label = typedNode.label || typedNode.id;
            const fontSize = 10 / globalScale;
            if (globalScale > 3) {
              ctx.save();
              ctx.globalAlpha = alpha;
              ctx.font = `${fontSize}px system-ui, -apple-system, BlinkMacSystemFont, sans-serif`;
              ctx.textAlign = "left";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "rgba(255,255,255,0.8)";
              ctx.fillText(label, typedNode.x + radius + 2, typedNode.y);
              ctx.restore();
            }
          }}
        />
      </div>
    </main>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
import { getAllCodexNodes } from "@/lib/codex";

export const metadata: Metadata = {
  title: "Codex | Echo OS",
};

export default async function CodexIndexPage() {
  const nodes = await getAllCodexNodes();

  return (
    <main className="min-h-screen bg-black text-slate-200">
      <section className="mx-auto max-w-3xl px-4 py-16 space-y-6">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Echo OS · Living Codex
          </p>
          <h1 className="text-3xl font-semibold tracking-wide">The Echo House Codex</h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            These are the public nodes of the Wolves in the Echo House Codex.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {nodes.map((node) => (
            <Link
              key={node.slug}
              href={`/codex/${node.slug}`}
              className="group rounded-2xl border border-white/10 bg-black/40 p-4 hover:border-white/30 transition"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-medium group-hover:text-white">{node.title}</h2>
                {node.type && (
                  <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-white/60">
                    {node.type}
                  </span>
                )}
              </div>

              {node.tags?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {node.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/60">#{tag}</span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>

        <footer className="mt-8 text-xs text-slate-500">
          <Link href="/" className="underline-offset-4 hover:underline">← Back to Launch</Link>
        </footer>
      </section>
    </main>
  );
}
