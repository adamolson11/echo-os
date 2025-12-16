"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import type { ForceGraphMethods } from "react-force-graph-2d";
import { useRouter } from "next/navigation";
import CodexGraph from "./CodexGraph";
import CodexHUD from "./CodexHUD";
import CodexSidebar from "./CodexSidebar";
import { seriesColorMap } from "@/config/codexColors";
import ExitDoor from "@/components/rooms/ExitDoor";

import type { CodexGraphData, CodexNode } from "@/types/codexGraph";

type CodexIndexedNode = Pick<CodexNode, "id" | "label" | "type" | "series">;

const emptyGraph: CodexGraphData = { nodes: [], links: [] };

export default function CodexPage() {
  const router = useRouter();
  const [graphData, setGraphData] = useState<CodexGraphData>(emptyGraph);
  const [hoverNode, setHoverNode] = useState<CodexNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<CodexNode | null>(null);

  const [activeTypes, setActiveTypes] = useState<Record<string, boolean>>(() => ({
    chapter: true,
    character: true,
    theme: true,
    location: true,
    event: true,
    symbol: true,
    stub: true,
  }));

  const [activeSeries, setActiveSeries] = useState<Record<string, boolean>>(() => ({}));
  const [indexSearch, setIndexSearch] = useState("");

  const fgRef = useRef<ForceGraphMethods | null>(null);

  // Load codex.json from /public
  useEffect(() => {
    const controller = new AbortController();
    let isPageHiding = false;

    const handlePageHide = () => {
      isPageHiding = true;
    };

    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("beforeunload", handlePageHide);

    async function loadCodex() {
      try {
        const res = await fetch("/codex.json", { signal: controller.signal });
        if (!res.ok) {
          console.error("Failed to fetch codex.json:", res.status);
          return;
        }
        const json = (await res.json()) as CodexGraphData;
        if (!controller.signal.aborted) setGraphData(json);
      } catch (err: unknown) {
        if (controller.signal.aborted || isPageHiding) return;
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error("Error loading codex.json", err);
      }
    }

    loadCodex();

    return () => {
      isPageHiding = true;
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("beforeunload", handlePageHide);
      controller.abort();
    };
  }, []);

  const seriesLegend = useMemo(() => {
    return Object.entries(seriesColorMap).map(([id, color]) => ({ id, label: id, color }));
  }, []);

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
      const seriesOk = noSeriesFilters || !seriesKey ? true : !!seriesObj[seriesKey];

      return typeOk && seriesOk;
    });

    const nodeIds = new Set(nodes.map((n) => n.id));

    const links = graphData.links.filter((link) => {
      const srcId =
        typeof link.source === "string"
          ? link.source
          : typeof link.source === "number"
            ? String(link.source)
            : link.source.id;
      const tgtId =
        typeof link.target === "string"
          ? link.target
          : typeof link.target === "number"
            ? String(link.target)
            : link.target.id;
      return nodeIds.has(srcId) && nodeIds.has(tgtId);
    });

    return { nodes, links };
  }, [graphData, activeTypes, activeSeries]);

  const fullGraphData = graphData;
  const graphDataForView = filteredGraphData && filteredGraphData.nodes?.length ? filteredGraphData : fullGraphData;

  const nodeColor = (node: CodexNode): string => {
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

  const indexedNodes: CodexIndexedNode[] = useMemo(() => {
    if (!graphData?.nodes) return [];
    return graphData.nodes
      .map((n) => ({ id: n.id, label: n.label || n.id, type: n.type }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [graphData]);

  const filteredIndex = useMemo(() => {
    const q = indexSearch.trim().toLowerCase();
    if (!q) return indexedNodes;
    return indexedNodes.filter((n) => n.label.toLowerCase().includes(q));
  }, [indexedNodes, indexSearch]);

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
    const slug = node.slug || node.id;
    router.push(`/codex/${encodeURIComponent(slug)}`);
  };

  const handleIndexSelect = (id: string) => {
    const node = graphData.nodes.find((n) => n.id === id);
    if (node) focusNode(node);
  };

  return (
    <div className="flex min-h-[100vh]">
      <ExitDoor />
      {/* LEFT NAV */}
      <aside className="w-64 shrink-0 p-6 border-r border-white/5">
        <h1 className="text-xs font-semibold tracking-[0.25em] text-slate-400">ECHO OS</h1>
      </aside>

      {/* MIDDLE STACKED COLUMN (hero text on top, graph card below) */}
      <main className="flex-1 px-8 py-8">
        <section className="flex flex-col gap-6">
          {/* Hero text + filters */}
          <div className="space-y-3">
            <p className="text-sm font-medium tracking-[0.25em] text-slate-400 uppercase">Echo OS</p>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
              Living Codex — a graph of chapters,
              characters, themes, and devices across your universes.
            </h1>
            <p className="text-sm text-slate-400">Hover nodes to see connections. Click nodes to pull up details.</p>

            {/* Filter chips / HUD (keeps existing controls) */}
            <div className="mt-4">
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
            </div>
          </div>

          {/* Graph card below the hero text */}
          <div className="mt-2">
            {/* Make the graph container intentionally large so the canvas feels like a viewport */}
            <div className="w-full overflow-hidden h-screen md:h-[85vh]">
              <CodexGraph
                key={`${graphDataForView?.nodes?.length ?? 0}:${graphDataForView?.links?.length ?? 0}`}
                ref={fgRef}
                graphData={graphDataForView ?? { nodes: [], links: [] }}
                hoverNode={hoverNode}
                selectedNode={selectedNode}
                onNodeHover={setHoverNode}
                onNodeClick={handleGraphNodeClick}
              />
            </div>
          </div>
        </section>
      </main>

      {/* RIGHT-HAND HUD (unchanged) */}
      <aside className="w-80 shrink-0 px-6 py-6 border-l border-white/10 bg-black/80">
        <CodexSidebar
          selectedNode={selectedNode}
          indexedNodes={filteredIndex}
          indexSearch={indexSearch}
          setIndexSearch={setIndexSearch}
          onSelectNode={handleIndexSelect}
          loadFullNote={() => {
            // note loading wired later
          }}
          nodeColor={nodeColor}
        />
      </aside>
    </div>
  );
}

