"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { ForceGraphMethods } from "react-force-graph-2d";

import CodexGraph from "./CodexGraph";
import CodexHUD from "./CodexHUD";
import CodexSidebar from "./CodexSidebar";
import { seriesColorMap } from "@/config/codexColors";

type CodexNodeType =
  | "chapter"
  | "character"
  | "theme"
  | "location"
  | "event"
  | "symbol"
  | "stub";

export type CodexNode = {
  id: string;
  label: string;
  type: CodexNodeType | string;
  series?: string;
  meta?: Record<string, any>;
  // Force-graph runtime props (added at runtime, so optional)
  x?: number;
  y?: number;
};

export type CodexLink = {
  source: string | CodexNode;
  target: string | CodexNode;
};

type CodexGraphData = {
  nodes: CodexNode[];
  links: CodexLink[];
};

type CodexIndexedNode = {
  id: string;
  label: string;
  type: CodexNodeType | string;
};

const emptyGraph: CodexGraphData = { nodes: [], links: [] };

export default function CodexPage() {
  const [graphData, setGraphData] = useState<CodexGraphData>(emptyGraph);
  const [hoverNode, setHoverNode] = useState<CodexNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<CodexNode | null>(null);

  const [activeTypes, setActiveTypes] = useState<Record<string, boolean>>(
    () => ({
      chapter: true,
      character: true,
      theme: true,
      location: true,
      event: true,
      symbol: true,
      stub: true,
    })
  );

  const [activeSeries, setActiveSeries] = useState<Record<string, boolean>>(
    () => ({}) // empty = show all
  );

  const [indexSearch, setIndexSearch] = useState("");

  // Ref to the underlying ForceGraph instance (used for zoom/center)
  const fgRef = useRef<ForceGraphMethods | null>(null);

  // Load codex.json from /public
  useEffect(() => {
    async function loadCodex() {
      try {
        const res = await fetch("/codex.json");
        if (!res.ok) {
          console.error("Failed to fetch codex.json:", res.status);
          return;
        }
        const json = (await res.json()) as CodexGraphData;
        setGraphData(json);
      } catch (err) {
        console.error("Error loading codex.json", err);
      }
    }

    loadCodex();
  }, []);

  // Apply type + series filters to graph data
  const filteredGraphData = useMemo(() => {
    if (!graphData?.nodes?.length) return emptyGraph;

    const typeObj = activeTypes || {};
    const seriesObj = activeSeries || {};

    const nodes = graphData.nodes.filter((node) => {
      const typeKey = String(node.type);
      const seriesKey = node.series;

      const noTypeFilters = Object.keys(typeObj).length === 0;
      const noSeriesFilters = Object.keys(seriesObj).length === 0;

      const typeOk = noTypeFilters ? true : !!typeObj[typeKey];
      const seriesOk =
        noSeriesFilters || !seriesKey ? true : !!seriesObj[seriesKey];

      return typeOk && seriesOk;
    });

    const nodeIds = new Set(nodes.map((n) => n.id));

    const links = graphData.links.filter((link) => {
      const srcId =
        typeof link.source === "string" ? link.source : link.source.id;
      const tgtId =
        typeof link.target === "string" ? link.target : link.target.id;
      return nodeIds.has(srcId) && nodeIds.has(tgtId);
    });

    return { nodes, links };
  }, [graphData, activeTypes, activeSeries]);

  // Build index list
  const indexedNodes: CodexIndexedNode[] = useMemo(() => {
    if (!graphData?.nodes) return [];
    return graphData.nodes
      .map((n) => ({
        id: n.id,
        label: n.label || n.id,
        type: n.type,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [graphData]);

  // Build series legend array from the canonical seriesColorMap
  const seriesLegend = useMemo(() => {
    return Object.entries(seriesColorMap).map(([id, color]) => ({ id, label: id, color }));
  }, []);

  // Node color helper (mirrors CodexGraph nodeColor logic so HUD coloring matches)
  const nodeColor = (node: any): string => {
    if (node?.series) return seriesColorMap[node.series] || seriesColorMap.Default;

    switch (node?.type) {
      case "chapter":
        return "#4fc3f7";
      case "character":
        return "#26c6da";
      case "symbol":
        return "#ffd54f";
      case "event":
        return "#f48fb1";
      case "theme":
        return "#ce93d8";
      case "location":
        return "#a5d6a7";
      case "stub":
        return "#9e9e9e";
      default:
        return seriesColorMap.Default;
    }
  };

  const filteredIndex = useMemo(() => {
    const q = indexSearch.trim().toLowerCase();
    if (!q) return indexedNodes;
    return indexedNodes.filter((n) =>
      n.label.toLowerCase().includes(q)
    );
  }, [indexedNodes, indexSearch]);

  // When a node is clicked (graph or index)
  const focusNode = (node: CodexNode) => {
    setSelectedNode(node);
    const api = fgRef.current;
    if (!api) return;

    const { x, y } = node;
    if (typeof x === "number" && typeof y === "number") {
      api.centerAt(x, y, 300);
      api.zoom(3, 300);
    }
  };

  const handleGraphNodeClick = (node: CodexNode) => {
    if (!node) return;
    focusNode(node);
  };

  const handleIndexSelect = (id: string) => {
    const node = graphData.nodes.find((n) => n.id === id);
    if (node) focusNode(node);
  };

  return (
    <div className="mt-20 px-4 lg:px-8">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[220px_minmax(0,2.4fr)_260px] lg:gap-8">
        {/* Left column: simple nav / explainer */}
        <div className="mb-8 lg:mb-0">
          <h1 className="text-xs font-semibold tracking-[0.25em] text-slate-400">
            ECHO OS
          </h1>
          <p className="mt-3 text-sm text-slate-300">
            Living Codex — a graph of chapters, characters, themes, and devices
            across the Wolves, Devil&apos;s Trilogy, and Future Farm universes.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Use the filters above the graph to toggle types and series. Hover
            nodes to see connections; click to inspect details.
          </p>
        </div>

        {/* Middle column: HUD + Graph */}
        <div className="mb-8 lg:mb-0">
          <CodexHUD
            activeTypes={activeTypes}
            setActiveTypes={setActiveTypes}
            activeSeries={activeSeries}
            setActiveSeries={setActiveSeries}
            seriesLegend={seriesLegend}
            fgRef={fgRef}
            hoverNode={hoverNode}
            nodeColor={nodeColor}
          />

          <div
            className="mt-6 h-[640px] w-full rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-900 via-slate-950 to-slate-900 shadow-[0_8px_32px_0_rgba(40,40,80,0.45)] overflow-hidden fade-in"
            style={{
              boxShadow:
                "0 8px 32px 0 rgba(40,40,80,0.45), 0 1.5px 0 0 rgba(80,80,160,0.12)",
              animation: "fadeIn 1.2s cubic-bezier(.4,0,.2,1)"
            }}
          >
            <CodexGraph
              ref={fgRef as any}
              graphData={filteredGraphData}
              hoverNode={hoverNode}
              selectedNode={selectedNode}
              onNodeHover={setHoverNode}
              onNodeClick={handleGraphNodeClick}
            />
          </div>
        </div>

        {/* Right column: Node details + Index */}
        <div className="space-y-4">
          <CodexSidebar
            selectedNode={selectedNode}
            indexedNodes={filteredIndex}
            indexSearch={indexSearch}
            setIndexSearch={setIndexSearch}
            onSelectNode={handleIndexSelect}
          />
        </div>
      </div>
    </div>
  );
}

// Center & fit graph when data changes
useEffect(() => {
  const api = fgRef.current;
  if (!api) return;
  if (!filteredGraphData?.nodes?.length) return;

  const handle = setTimeout(() => {
    try {
      // animate fit to view
      api.zoomToFit(400);
    } catch (e) {
      console.warn("zoomToFit failed:", e);
    }
  }, 120);

  return () => clearTimeout(handle);
}, [/* note: filteredGraphData is in scope above but not exported; leave dependency as string to avoid eslint issues */]);
