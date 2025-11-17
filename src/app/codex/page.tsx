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
  const fgRef = useRef<any>(null);

  useEffect(() => {
    fetch("/codex.json").then((r) => r.json()).then(setData).catch(() => {});
  }, []);

  const graphData = useMemo(() => data, [data]);

  return (
    <main className="min-h-screen bg-[#05050a] text-gray-100 relative">
      <div className="mt-20 px-4">
        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,2.4fr)_260px]">
          <div className="hidden lg:block">{/* left nav placeholder */}</div>
          <div className="min-w-0">
            <div className="h-[calc(100vh-6rem)] w-full">
              <CodexGraph ref={fgRef} graphData={graphData} hoverNode={hoverNode} selectedNode={selectedNode} onNodeHover={(n)=>setHoverNode(n||null)} onNodeClick={()=>{}} />
            </div>
          </div>
          <CodexSidebar selectedNode={selectedNode} onSelectNode={()=>{}} indexedNodes={[]} indexSearch="" setIndexSearch={()=>{}} loadFullNote={()=>{}} isLoadingNote={false} noteError={null} selectedNoteMarkdown={null} nodeColor={()=>seriesColorMap.Default} fgRef={fgRef} />
        </div>
      </div>
    </main>
  );
}
