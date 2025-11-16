"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { storyGraph, type GraphNode } from "@/data/graph";

function getNodeColor(node: GraphNode): string {
  if (node.type === "portal") return "#38bdf8"; // sky-400
  if (node.type === "chapter") return "#a855f7"; // purple-500
  return "#22c55e"; // green-500 for codex
}

export default function MapPage() {
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const layout = useMemo(() => {
    const radius = 180;
    const centerX = 320;
    const centerY = 220;

    const nodesWithPos = storyGraph.nodes.map((node, index) => {
      if (node.type === "portal") {
        const portalNodes = storyGraph.nodes.filter((n) => n.type === "portal");
        const portalIndex = portalNodes.findIndex((p) => p.id === node.id);
        const angle = (portalIndex / portalNodes.length) * Math.PI * 2;
        return {
          node,
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
        };
      }

      if (node.type === "chapter") {
        return {
          node,
          x: centerX - 120,
          y: centerY + 100,
        };
      }

      return {
        node,
        x: centerX + 120,
        y: centerY + 100,
      };
    });

    const getPos = (id: string) => {
      const found = nodesWithPos.find((n) => n.node.id === id);
      return found ?? { node: storyGraph.nodes[0], x: centerX, y: centerY };
    };

    const edges = storyGraph.edges.map((edge) => {
      const source = getPos(edge.source);
      const target = getPos(edge.target);
      return {
        edge,
        x1: source.x,
        y1: source.y,
        x2: target.x,
        y2: target.y,
      };
    });

    return { nodes: nodesWithPos, edges };
  }, []);

  return (
    <main className="min-h-screen bg-black text-slate-100">
      <section className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        <header className="mb-4 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-500">
              Echo OS · Graph Mode
            </p>
            <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
              Brain Map · Story Graph Prototype
            </h1>
            <p className="text-xs text-slate-400 md:text-sm">
              Hover to see neighbors. Click a node to jump into that part of
              the universe.
            </p>
          </div>
          <Link
            href="/story"
            className="rounded-full border border-slate-700 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-300 hover:border-skyblue/70 hover:text-sky-100"
          >
            ← Doorway Hub
          </Link>
        </header>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-950 via-black to-slate-950 p-4 md:p-6">
          <svg
            viewBox="0 0 640 440"
            className="h-[420px] w-full text-slate-500"
          >
            <defs>
              <radialGradient id="edgeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </radialGradient>
            </defs>

            {layout.edges.map(({ edge, x1, y1, x2, y2 }) => {
              const isActive =
                focusedId &&
                (edge.source === focusedId || edge.target === focusedId);
              return (
                <g key={`${edge.source}-${edge.target}`}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#edgeGlow)"
                    strokeWidth={isActive ? 1.6 : 0.9}
                    strokeOpacity={isActive ? 0.9 : 0.4}
                  />
                </g>
              );
            })}

            {layout.nodes.map(({ node, x, y }) => {
              const color = getNodeColor(node);
              const isFocused = focusedId === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${x}, ${y})`}
                  className="cursor-pointer"
                  onMouseEnter={() => setFocusedId(node.id)}
                  onMouseLeave={() => setFocusedId(null)}
                >
                  <Link href={node.route}>
                    <circle
                      r={node.type === "portal" ? 20 : node.type === "chapter" ? 14 : 10}
                      fill={color}
                      fillOpacity={isFocused ? 0.35 : 0.18}
                      stroke={color}
                      strokeWidth={1.2}
                      className="transition-transform duration-150 hover:scale-[1.05]"
                    />
                    <text
                      x={0}
                      y={node.type === "portal" ? -30 : -24}
                      textAnchor="middle"
                      className="pointer-events-none select-none text-[9px] font-medium"
                      fill="#e5e7eb"
                    >
                      {node.label}
                    </text>
                  </Link>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            <span>Portals (books)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-purple-500" />
            <span>Chapters</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Codex entries</span>
          </div>
        </div>
      </section>
    </main>
  );
}
