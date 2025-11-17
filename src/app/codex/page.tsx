"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CodexHUD from "./CodexHUD";
import CodexGraph from "./CodexGraph";
import CodexSidebar from "./CodexSidebar";
import { seriesColorMap } from "../../config/codexColors";

type CodexNodeType = "chapter" | "character" | "symbol" | "event" | "theme" | "location" | "stub";

type CodexNode = {
  id: string;
  label?: string;
  type?: string;
  series?: string;
  path?: string;
  tags?: string[];
  weight?: number;
  meta?: Record<string, any>;
  x?: number;
  y?: number;
};

type CodexLink = { source: string; target: string; type?: string; strength?: number };

type CodexGraphData = { nodes: CodexNode[]; links: CodexLink[] } | null;

export default function CodexPage() {
  const [data, setData] = useState<CodexGraphData>(null);
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

  const [activeSeries, setActiveSeries] = useState<Record<string, boolean>>({
    "Wolves in the Echo House": true,
    "The Devil's Palimpsest": true,
    "The Devil's Codex": true,
    "The Devil's Manuscript": true,
    "Future Farm I": true,
    "Future Farm II": true,
    "Future Farm III": true,
    __Unknown: true,
  });

  const [indexSearch, setIndexSearch] = useState("");
  const [selectedNoteMarkdown, setSelectedNoteMarkdown] = useState<string | null>(null);
  const [isLoadingNote, setIsLoadingNote] = useState(false);
  const [noteError, setNoteError] = useState<string | null>(null);

  const fgRef = useRef<any>(null);

  useEffect(() => {
    fetch("/codex.json")
      .then((r) => r.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load codex.json", err));
  }, []);

  const nodeColor = (node: CodexNode | null) => {
    if (!node) return seriesColorMap.Default;
    if (node.series) return seriesColorMap[node.series] || seriesColorMap.Default;
    switch (node.type) {
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

  const graphData = useMemo(() => {
    if (!data) return null;
    const allowedTypes = activeTypes;
    const allowedSeries = activeSeries;

    const nodes = data.nodes.filter((n) => {
      const t = (n.type as string) || "chapter";
      if (allowedTypes[t] === false) return false;
      const seriesKey = n.series || "__Unknown";
      if (allowedSeries[seriesKey] === false) return false;
      return true;
    });

    const nodeIds = new Set(nodes.map((n) => n.id));
    const links = data.links.filter((l) => nodeIds.has(l.source as string) && nodeIds.has(l.target as string));
    return { nodes: nodes.map((n) => ({ ...n })), links: links.map((l) => ({ ...l })) };
  }, [data, activeTypes, activeSeries]);

  const seriesLegend = [
    { id: "Wolves in the Echo House", label: "Wolves", color: seriesColorMap["Wolves in the Echo House"] },
    { id: "The Devil's Palimpsest", label: "Palimpsest", color: seriesColorMap["The Devil's Palimpsest"] },
    { id: "The Devil's Codex", label: "Codex", color: seriesColorMap["The Devil's Codex"] },
    { id: "The Devil's Manuscript", label: "Manuscript", color: seriesColorMap["The Devil's Manuscript"] },
    { id: "Future Farm I", label: "Future I", color: seriesColorMap["Future Farm I"] },
    { id: "Future Farm II", label: "Future II", color: seriesColorMap["Future Farm II"] },
    { id: "Future Farm III", label: "Future III", color: seriesColorMap["Future Farm III"] },
  ];

  const indexedNodes = useMemo(() => {
    if (!graphData) return [] as CodexNode[];
    const q = indexSearch.toLowerCase().trim();
    return graphData.nodes
      .slice()
      .sort((a, b) => (a.label || a.id).localeCompare(b.label || b.id))
      .filter((n) => {
        if (!q) return true;
        const hay = `${n.label || n.id} ${n.series || ""} ${(n.type as string) || ""}`.toLowerCase();
        return hay.includes(q);
      });
  }, [graphData, indexSearch]);

  async function loadFullNote(node: CodexNode | null) {
    if (!node?.id) return;
    setIsLoadingNote(true);
    setNoteError(null);
    try {
      const res = await fetch(`/api/codex?id=${encodeURIComponent(node.id)}`);
      if (!res.ok) throw new Error(`Request failed ${res.status}`);
      const body = await res.json();
      setSelectedNoteMarkdown(body.markdown || "");
    } catch (err: any) {
      setNoteError(err?.message || String(err));
      setSelectedNoteMarkdown(null);
    } finally {
      setIsLoadingNote(false);
    }
  }

  function handleSelectNode(node: CodexNode) {
    setSelectedNode(node);
    setHoverNode(node);
    if (fgRef.current && node.x != null && node.y != null) {
      try {
        fgRef.current.centerAt(node.x, node.y, 400);
        fgRef.current.zoom(4, 400);
      } catch (err) {}
    }
  }

  return (
    <main className="min-h-screen bg-[#05050a] text-gray-100 relative">
      <CodexHUD
        activeTypes={activeTypes}
        setActiveTypes={setActiveTypes}
        seriesLegend={seriesLegend}
        activeSeries={activeSeries}
        setActiveSeries={setActiveSeries}
        fgRef={fgRef}
        hoverNode={hoverNode}
        nodeColor={nodeColor}
      />

      <div className="mt-20 px-4">
        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,2.4fr)_260px]">
          <div className="hidden lg:block">{/* left nav placeholder */}</div>

          <div className="min-w-0">
            <div className="h-[calc(100vh-6rem)] w-full">
              <CodexGraph
                ref={fgRef}
                graphData={graphData}
                hoverNode={hoverNode}
                selectedNode={selectedNode}
                onNodeHover={(n) => setHoverNode(n || null)}
                onNodeClick={(n) => {
                  setSelectedNode(n || null);
                  setSelectedNoteMarkdown(null);
                  setNoteError(null);
                }}
              />
            </div>
          </div>

          <CodexSidebar
            selectedNode={selectedNode}
            onSelectNode={(n) => handleSelectNode(n)}
            indexedNodes={indexedNodes}
            indexSearch={indexSearch}
            setIndexSearch={setIndexSearch}
            loadFullNote={loadFullNote}
            isLoadingNote={isLoadingNote}
            noteError={noteError}
            selectedNoteMarkdown={selectedNoteMarkdown}
            nodeColor={nodeColor}
            fgRef={fgRef}
          />
        </div>
      </div>
    </main>
  );
}
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CodexHUD from "./CodexHUD";
import CodexGraph from "./CodexGraph";
import CodexSidebar from "./CodexSidebar";
import { seriesColorMap } from "../../config/codexColors";

type CodexNodeType = "chapter" | "character" | "symbol" | "event" | "theme" | "location" | "stub";

type CodexNode = {
  id: string;
  label?: string;
  type?: string;
  series?: string;
  path?: string;
  tags?: string[];
  weight?: number;
  meta?: Record<string, any>;
  x?: number;
  y?: number;
};

type CodexLink = { source: string; target: string; type?: string; strength?: number };

type CodexGraphData = { nodes: CodexNode[]; links: CodexLink[] } | null;

export default function CodexPage() {
  const [data, setData] = useState<CodexGraphData>(null);
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

  const [activeSeries, setActiveSeries] = useState<Record<string, boolean>>({
    "Wolves in the Echo House": true,
    "The Devil's Palimpsest": true,
    "The Devil's Codex": true,
    "The Devil's Manuscript": true,
    "Future Farm I": true,
    "Future Farm II": true,
    "Future Farm III": true,
    __Unknown: true,
  });

  const [indexSearch, setIndexSearch] = useState("");
  const [selectedNoteMarkdown, setSelectedNoteMarkdown] = useState<string | null>(null);
  const [isLoadingNote, setIsLoadingNote] = useState(false);
  const [noteError, setNoteError] = useState<string | null>(null);

  const fgRef = useRef<any>(null);

  useEffect(() => {
    fetch("/codex.json")
      .then((r) => r.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load codex.json", err));
  }, []);

  const nodeColor = (node: CodexNode | null) => {
    if (!node) return seriesColorMap.Default;
    if (node.series) return seriesColorMap[node.series] || seriesColorMap.Default;
    switch (node.type) {
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

  const graphData = useMemo(() => {
    if (!data) return null;
    const allowedTypes = activeTypes;
    const allowedSeries = activeSeries;

    const nodes = data.nodes.filter((n) => {
      const t = (n.type as string) || "chapter";
      if (allowedTypes[t] === false) return false;
      const seriesKey = n.series || "__Unknown";
      if (allowedSeries[seriesKey] === false) return false;
      return true;
    });

    const nodeIds = new Set(nodes.map((n) => n.id));
    const links = data.links.filter((l) => nodeIds.has(l.source as string) && nodeIds.has(l.target as string));
    return { nodes: nodes.map((n) => ({ ...n })), links: links.map((l) => ({ ...l })) };
  }, [data, activeTypes, activeSeries]);

  const seriesLegend = [
    { id: "Wolves in the Echo House", label: "Wolves", color: seriesColorMap["Wolves in the Echo House"] },
    { id: "The Devil's Palimpsest", label: "Palimpsest", color: seriesColorMap["The Devil's Palimpsest"] },
    { id: "The Devil's Codex", label: "Codex", color: seriesColorMap["The Devil's Codex"] },
    { id: "The Devil's Manuscript", label: "Manuscript", color: seriesColorMap["The Devil's Manuscript"] },
    { id: "Future Farm I", label: "Future I", color: seriesColorMap["Future Farm I"] },
    { id: "Future Farm II", label: "Future II", color: seriesColorMap["Future Farm II"] },
    { id: "Future Farm III", label: "Future III", color: seriesColorMap["Future Farm III"] },
  ];

  const indexedNodes = useMemo(() => {
    if (!graphData) return [] as CodexNode[];
    const q = indexSearch.toLowerCase().trim();
    return graphData.nodes
      .slice()
      .sort((a, b) => (a.label || a.id).localeCompare(b.label || b.id))
      .filter((n) => {
        if (!q) return true;
        const hay = `${n.label || n.id} ${n.series || ""} ${(n.type as string) || ""}`.toLowerCase();
        return hay.includes(q);
      });
  }, [graphData, indexSearch]);

  async function loadFullNote(node: CodexNode | null) {
    if (!node?.id) return;
    setIsLoadingNote(true);
    setNoteError(null);
    try {
      const res = await fetch(`/api/codex?id=${encodeURIComponent(node.id)}`);
      if (!res.ok) throw new Error(`Request failed ${res.status}`);
      const body = await res.json();
      setSelectedNoteMarkdown(body.markdown || "");
    } catch (err: any) {
      setNoteError(err?.message || String(err));
      setSelectedNoteMarkdown(null);
    } finally {
      setIsLoadingNote(false);
    }
  }

  function handleSelectNode(node: CodexNode) {
    setSelectedNode(node);
    setHoverNode(node);
    // center + zoom
    if (fgRef.current && node.x != null && node.y != null) {
      try {
        fgRef.current.centerAt(node.x, node.y, 400);
        fgRef.current.zoom(4, 400);
      } catch (err) {}
    }
  }

  return (
    <main className="min-h-screen bg-[#05050a] text-gray-100 relative">
      <CodexHUD
        activeTypes={activeTypes}
        setActiveTypes={setActiveTypes}
        seriesLegend={seriesLegend}
        activeSeries={activeSeries}
        setActiveSeries={setActiveSeries}
        fgRef={fgRef}
        hoverNode={hoverNode}
        nodeColor={nodeColor}
      />

      <div className="mt-20 px-4">
        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,2.4fr)_260px]">
          <div className="hidden lg:block">{/* left nav placeholder */}</div>

          <div className="min-w-0">
            <div className="h-[calc(100vh-6rem)] w-full">
              <CodexGraph
                ref={fgRef}
                graphData={graphData}
                hoverNode={hoverNode}
                selectedNode={selectedNode}
                onNodeHover={(n) => setHoverNode(n || null)}
                onNodeClick={(n) => {
                  setSelectedNode(n || null);
                  setSelectedNoteMarkdown(null);
                  setNoteError(null);
                }}
              />
            </div>
          </div>

          <CodexSidebar
            selectedNode={selectedNode}
            onSelectNode={(n) => handleSelectNode(n)}
            indexedNodes={indexedNodes}
            indexSearch={indexSearch}
            setIndexSearch={setIndexSearch}
            loadFullNote={loadFullNote}
            isLoadingNote={isLoadingNote}
            noteError={noteError}
            selectedNoteMarkdown={selectedNoteMarkdown}
            nodeColor={nodeColor}
            fgRef={fgRef}
          />
        </div>
      </div>
    </main>
  );
}
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CodexHUD from "./CodexHUD";
import CodexGraph from "./CodexGraph";
import CodexSidebar from "./CodexSidebar";
import { seriesColorMap } from "../../config/codexColors";

type CodexNodeType = "chapter" | "character" | "symbol" | "event" | "theme" | "location" | "stub";

type CodexNode = {
  id: string;
  label?: string;
  type?: string;
  series?: string;
  path?: string;
  tags?: string[];
  weight?: number;
  meta?: Record<string, any>;
  x?: number;
  y?: number;
};

type CodexLink = { source: string; target: string; type?: string; strength?: number };

type CodexGraphData = { nodes: CodexNode[]; links: CodexLink[] } | null;

export default function CodexPage() {
  const [data, setData] = useState<CodexGraphData>(null);
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

  const [activeSeries, setActiveSeries] = useState<Record<string, boolean>>({
    "Wolves in the Echo House": true,
    "The Devil's Palimpsest": true,
    "The Devil's Codex": true,
    "The Devil's Manuscript": true,
    "Future Farm I": true,
    "Future Farm II": true,
    "Future Farm III": true,
    __Unknown: true,
  });

  const [indexSearch, setIndexSearch] = useState("");
  const [selectedNoteMarkdown, setSelectedNoteMarkdown] = useState<string | null>(null);
  const [isLoadingNote, setIsLoadingNote] = useState(false);
  const [noteError, setNoteError] = useState<string | null>(null);

  const fgRef = useRef<any>(null);

  useEffect(() => {
    fetch("/codex.json")
      .then((r) => r.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load codex.json", err));
  }, []);

  const nodeColor = (node: CodexNode | null) => {
    if (!node) return seriesColorMap.Default;
    if (node.series) return seriesColorMap[node.series] || seriesColorMap.Default;
    switch (node.type) {
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

  const graphData = useMemo(() => {
    if (!data) return null;
    const allowedTypes = activeTypes;
    const allowedSeries = activeSeries;

    const nodes = data.nodes.filter((n) => {
      const t = (n.type as string) || "chapter";
      if (allowedTypes[t] === false) return false;
      const seriesKey = n.series || "__Unknown";
      if (allowedSeries[seriesKey] === false) return false;
      return true;
    });

    const nodeIds = new Set(nodes.map((n) => n.id));
    const links = data.links.filter((l) => nodeIds.has(l.source as string) && nodeIds.has(l.target as string));
    return { nodes: nodes.map((n) => ({ ...n })), links: links.map((l) => ({ ...l })) };
  }, [data, activeTypes, activeSeries]);

  const seriesLegend = [
    { id: "Wolves in the Echo House", label: "Wolves", color: seriesColorMap["Wolves in the Echo House"] },
    { id: "The Devil's Palimpsest", label: "Palimpsest", color: seriesColorMap["The Devil's Palimpsest"] },
    { id: "The Devil's Codex", label: "Codex", color: seriesColorMap["The Devil's Codex"] },
    { id: "The Devil's Manuscript", label: "Manuscript", color: seriesColorMap["The Devil's Manuscript"] },
    { id: "Future Farm I", label: "Future I", color: seriesColorMap["Future Farm I"] },
    { id: "Future Farm II", label: "Future II", color: seriesColorMap["Future Farm II"] },
    { id: "Future Farm III", label: "Future III", color: seriesColorMap["Future Farm III"] },
  ];

  const indexedNodes = useMemo(() => {
    if (!graphData) return [] as CodexNode[];
    const q = indexSearch.toLowerCase().trim();
    return graphData.nodes
      .slice()
      .sort((a, b) => (a.label || a.id).localeCompare(b.label || b.id))
      .filter((n) => {
        if (!q) return true;
        const hay = `${n.label || n.id} ${n.series || ""} ${(n.type as string) || ""}`.toLowerCase();
        return hay.includes(q);
      });
  }, [graphData, indexSearch]);

  async function loadFullNote(node: CodexNode | null) {
    if (!node?.id) return;
    setIsLoadingNote(true);
    setNoteError(null);
    try {
      const res = await fetch(`/api/codex?id=${encodeURIComponent(node.id)}`);
      if (!res.ok) throw new Error(`Request failed ${res.status}`);
      const body = await res.json();
      setSelectedNoteMarkdown(body.markdown || "");
    } catch (err: any) {
      setNoteError(err?.message || String(err));
      setSelectedNoteMarkdown(null);
    } finally {
      setIsLoadingNote(false);
    }
  }

  function handleSelectNode(node: CodexNode) {
    setSelectedNode(node);
    setHoverNode(node);
    // center + zoom
    if (fgRef.current && node.x != null && node.y != null) {
      try {
        fgRef.current.centerAt(node.x, node.y, 400);
        fgRef.current.zoom(4, 400);
      } catch (err) {}
    }
  }

  return (
    <main className="min-h-screen bg-[#05050a] text-gray-100 relative">
      <CodexHUD
        activeTypes={activeTypes}
        setActiveTypes={setActiveTypes}
        seriesLegend={seriesLegend}
        activeSeries={activeSeries}
        setActiveSeries={setActiveSeries}
        fgRef={fgRef}
        hoverNode={hoverNode}
        nodeColor={nodeColor}
      />

      <div className="mt-20 px-4">
        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,2.4fr)_260px]">
          <div className="hidden lg:block">{/* left nav placeholder */}</div>

          <div className="min-w-0">
            <div className="h-[calc(100vh-6rem)] w-full">
              <CodexGraph
                ref={fgRef}
                graphData={graphData}
                hoverNode={hoverNode}
                selectedNode={selectedNode}
                onNodeHover={(n) => setHoverNode(n || null)}
                onNodeClick={(n) => {
                  setSelectedNode(n || null);
                  setSelectedNoteMarkdown(null);
                  setNoteError(null);
                }}
              />
            </div>
          </div>

          <CodexSidebar
            selectedNode={selectedNode}
            onSelectNode={(n) => handleSelectNode(n)}
            indexedNodes={indexedNodes}
            indexSearch={indexSearch}
            setIndexSearch={setIndexSearch}
            loadFullNote={loadFullNote}
            isLoadingNote={isLoadingNote}
            noteError={noteError}
            selectedNoteMarkdown={selectedNoteMarkdown}
            nodeColor={nodeColor}
            fgRef={fgRef}
          />
        </div>
      </div>
    </main>
  );
}
"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import CodexHUD from "./CodexHUD";
import CodexSidebar from "./CodexSidebar";
import CodexGraph from "./CodexGraph";
import { seriesColorMap } from "../../config/codexColors";

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
      </div>

      {/* Page layout: left placeholder (nav), main graph, right sidebar */}
      <div className="mt-20 px-4">
        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,2.4fr)_260px]">
          <div className="hidden lg:block">{/* left nav placeholder */}</div>

          <div className="min-w-0">
            <div className="h-[calc(100vh-6rem)] w-full">{/* graph area */}
              <CodexGraph
                ref={fgRef}
                graphData={graphData}
                hoverNode={hoverNode}
                selectedNode={selectedNode}
                onNodeHover={(node: any) => setHoverNode(node || null)}
                onNodeClick={(node: any) => {
                  setSelectedNode(node || null);
                  setSelectedNoteMarkdown(null);
                  setNoteError(null);
                }}
              />
            </div>
          </div>

          <div>
            {/* Sidebar will be mounted here as CodexSidebar */}
            <div id="codex-sidebar-root" />
          </div>
        </div>
      </div>
    const nodes = data.nodes.filter((n) => {
      const t = (n.type as string) || "chapter";
      {/* HUD (extracted to CodexHUD) */}
      <div>
        {/* placeholder for HUD component mount */}
      </div>
                      : "border-white/10 bg-black/30 text-gray-500"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>

          {/* Series legend / filters */}
          <div className="pointer-events-auto mt-2 flex flex-wrap gap-2 text-[10px]">
            {seriesLegend.map((item) => {
              const isOn = activeSeries[item.id] ?? true;
              return (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSeries((prev) => ({ ...prev, [item.id]: !isOn }));
                  }}
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 transition ${
                    isOn
                      ? "border-white/40 bg-white/10 text-gray-100"
                      : "border-white/10 bg-black/30 text-gray-500"
                  }`}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pointer-events-auto flex gap-2 text-[10px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!fgRef.current) return;
              try {
                const current = fgRef.current.zoom();
                fgRef.current.zoom(current * 1.2, 200);
              } catch (err) {
                // some versions expose camera methods differently; ignore silently
              }
            }}
            className="rounded-full border border-white/20 bg-white/5 px-2 py-1"
            title="Zoom in"
          >
            +
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!fgRef.current) return;
              try {
                const current = fgRef.current.zoom();
                fgRef.current.zoom(current / 1.2, 200);
              } catch (err) {}
            }}
            className="rounded-full border border-white/20 bg-white/5 px-2 py-1"
            title="Zoom out"
          >
            −
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!fgRef.current) return;
              try {
                fgRef.current.zoomToFit(400, 40);
              } catch (err) {}
            }}
            className="rounded-full border border-white/20 bg-white/5 px-2 py-1"
            title="Reset zoom / fit"
          >
            Reset
          </button>
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
      <aside className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-64 flex-col border-l border-white/10 bg-black/70 backdrop-blur">
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

          {/* Node Index */}
          <div className="mt-6 border-t border-white/10 pt-3">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-500">
              Index
            </div>

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
                    setSelectedNode(node as any);
                    setHoverNode(node as any);
                    if (fgRef.current && (node as any).x != null && (node as any).y != null) {
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
                    <span
                      className="ml-2 inline-block h-2 w-2 flex-shrink-0 rounded-full"
                      style={{
                        backgroundColor: seriesColorMap[node.series] || seriesColorMap.Default,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>
      </aside>

      {/* Graph */}
      <div className="h-screen w-full pr-64"> {/* leave room for sidebar */}
        <CodexGraph
          ref={fgRef}
          graphData={graphData}
          hoverNode={hoverNode}
          selectedNode={selectedNode}
          onNodeHover={(node: any) => setHoverNode(node || null)}
          onNodeClick={(node: any) => {
            setSelectedNode(node || null);
            setSelectedNoteMarkdown(null);
            setNoteError(null);
          }}
        />
      </div>
    </main>
  );
}

