"use client";

import React, { forwardRef, useEffect, useRef, useImperativeHandle, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import type { ForceGraphMethods } from "react-force-graph-2d";
import { forceCollide } from 'd3-force';

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

type CodexGraphProps = {
  graphData: any;
  hoverNode?: any;
  selectedNode?: any;
  onNodeHover?: (n: any) => void;
  onNodeClick?: (n: any) => void;
};

const CodexGraph = forwardRef<ForceGraphMethods | null, CodexGraphProps>(
  ({ graphData, hoverNode, onNodeHover, onNodeClick }, ref) => {
    const internalRef = useRef<ForceGraphMethods | null>(null);
    useImperativeHandle(ref, () => internalRef.current as any, [internalRef]);
    const [localHover, setLocalHover] = useState<any | null>(null);
    const hoverThrottleRef = useRef<number>(0);
    
    // activeHover: prefer local hover (from canvas events), fall back to prop
    const activeHover = localHover || hoverNode;
    
    // compute neighbor id set for the active hovered node so we can highlight its thread
    const neighborIds = useMemo(() => {
      const set = new Set<string | number>();
      if (!activeHover || !graphData?.links) return set;
      const getId = (v: any) => (typeof v === "string" || typeof v === "number" ? v : v?.id);
      for (const l of graphData.links) {
        const s = getId(l.source);
        const t = getId(l.target);
        if (s === activeHover.id) {
          set.add(t);
          set.add(s);
        } else if (t === activeHover.id) {
          set.add(s);
          set.add(t);
        }
      }
      return set;
    }, [graphData, activeHover]);

    useEffect(() => {
      const fg = internalRef.current as any;
      if (!fg) return;

      const nodeCount = (graphData?.nodes?.length as number) || 1;
      // Physics rebalance (Director): stronger repulsion, larger link spacing
      // Link distance target in the 120-140 range (adjusts with node count)
      const baseDistance = 120;
      const scaledDistance = Math.min(420, baseDistance + Math.sqrt(nodeCount) * 4);

      // Computed charge: encourage more separation. Clamp to [-500, -400]
      // Default to -400 for small graphs, allow up to -500 for larger graphs.
      const computedCharge = -Math.min(500, Math.max(400, Math.round(nodeCount * 2)));

      // collide radius scaled by sqrt(nodeCount), clamped
      const collideRadius = Math.min(40, Math.max(6, Math.sqrt(nodeCount) * 3));

      try {
        fg.d3Force && fg.d3Force("charge")?.strength(computedCharge);
        fg.d3Force && fg.d3Force("link")?.distance(scaledDistance);
        // add a collide force to prevent hard overlap (helps initial packing)
        try {
          fg.d3Force && fg.d3Force("collide") && fg.d3Force("collide", forceCollide(collideRadius));
        } catch (err) {
          // some versions of react-force-graph expose d3Force differently; ignore if unavailable
        }

        // Director-recommended decay values for faster stabilization but stable motion
        fg.d3AlphaDecay && fg.d3AlphaDecay(0.03);
        fg.d3VelocityDecay && fg.d3VelocityDecay(0.4);
        fg.d3ReheatSimulation && fg.d3ReheatSimulation();

        fg.zoomToFit && fg.zoomToFit(400, 50);
      } catch (e) {
        // ignore if methods unavailable
      }

      // debounce resize -> zoomToFit
      let resizeTimer: any = null;
      const onResize = () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          try { fg.zoomToFit && fg.zoomToFit(400, 50); } catch (e) {}
        }, 150);
      };

      if (typeof window !== 'undefined') {
        window.addEventListener('resize', onResize);
      }

      return () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('resize', onResize);
        }
        if (resizeTimer) clearTimeout(resizeTimer);
      };
    }, [graphData]);

    return (
      <div className="absolute inset-0 w-full h-full">
        <ForceGraph2D
          ref={internalRef as any}
          graphData={graphData}
          backgroundColor="#05060a"

          // store hovered node upstream and locally for more reliable rendering
          onNodeHover={(n, prev) => {
            // throttle hover updates to ~30fps to avoid excessive re-renders/paint
            const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
            if (now - (hoverThrottleRef.current || 0) > 33) {
              hoverThrottleRef.current = now as number;
              setLocalHover(n || null);
              onNodeHover?.(n || null, prev || null as any);
            }
          }}
          onNodeClick={(n) => onNodeClick?.(n)}

          // make links clearly visible and highlight hovered thread
          linkColor={(link: any) => {
            const getId = (v: any) => (typeof v === "string" || typeof v === "number" ? v : v?.id);
            const s = getId(link.source);
            const t = getId(link.target);
            const hover = localHover || hoverNode;
            if (!hover) return "rgba(56, 189, 248, 0.25)";
            // highlight links attached to the hovered node
            if (s === hover.id || t === hover.id) return "rgba(56,189,248,0.7)";
            // de-emphasize unrelated links
            return "rgba(56,189,248,0.12)";
          }}
          linkWidth={(link: any) => {
            const getId = (v: any) => (typeof v === "string" || typeof v === "number" ? v : v?.id);
            const s = getId(link.source);
            const t = getId(link.target);
            const hover = localHover || hoverNode;
            if (!hover) return 0.5;
            if (s === hover.id || t === hover.id) return 1.2;
            return 0.25;
          }}
          linkOpacity={1}

          // custom node rendering: always-on tiny labels that scale inversely with zoom

            nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
              // compute hovered/neighbour status
              const hover = localHover || hoverNode;
              const isHovered = hover?.id === node.id;
              const isNeighbor = hover ? neighborIds.has(node.id) : false;

              // radius: hovered > neighbor > default (slightly reduced to avoid billboard-size)
              const radius = isHovered ? 6 : isNeighbor ? 5 : 4;

              // color
              const color = isHovered ? "rgba(45,212,191,0.95)" : isNeighbor ? "rgba(56,189,248,0.95)" : "rgba(37,99,235,0.9)";

              // subtle time-based wobble to make hovered nodes 'dance'
              const now = (typeof performance !== 'undefined' ? performance.now() : Date.now());
              // micro-perf: lower wobble frequency and amplitude to reduce paint churn
              const freq = 0.002; // slower wobble
              const idStr = String(node.id ?? '0');
              let idHash = 0;
              for (let i = 0; i < idStr.length; i++) idHash = (idHash * 31 + idStr.charCodeAt(i)) >>> 0;
              const phase = idHash % 1000;
              // reduce amplitude to lower motion and paint cost
              const ampBase = isHovered ? 1.6 : isNeighbor ? 0.6 : 0;
              const amp = ampBase * 0.5 * Math.min(1, globalScale);
              const dx = Math.sin(now * freq + phase) * amp;
              const dy = Math.cos(now * freq + phase) * amp * 0.8;

              // --- draw node circle (with wobble) ---
              ctx.beginPath();
              ctx.arc(node.x! + dx, node.y! + dy, radius, 0, 2 * Math.PI);
              ctx.fillStyle = color;
              ctx.fill();

              // subtle halo stroke for hovered node
              if (isHovered) {
                ctx.beginPath();
                const haloRadius = radius + 3 + Math.sin(now * (freq * 1.2) + phase) * 0.9;
                ctx.arc(node.x! + dx, node.y! + dy, haloRadius, 0, 2 * Math.PI);
                ctx.strokeStyle = "rgba(45,212,191,0.10)";
                ctx.lineWidth = 4;
                ctx.stroke();
              }

              // --- label: always-on, but small and only when zoomed in enough ---
              const label = node.name ?? node.id;
              if (!label) return;

              // clamp label rendering: skip labels when zoomed out to save paint
              if (globalScale < 0.85) return;

              const BASE = 8;
              const rawSize = BASE / globalScale;
              const fontSize = Math.max(6, Math.min(12, rawSize));

              ctx.font = `${fontSize}px system-ui, -apple-system, BlinkMacSystemFont, sans-serif`;
              ctx.fillStyle = "rgba(255,255,255,0.75)";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";

                // minimize shadow blur unless hovered and zoomed-in (expensive on some browsers)
                const isFirefox = typeof navigator !== 'undefined' && /Firefox/.test(navigator.userAgent || '');
                ctx.shadowColor = "rgba(0,0,0,0.45)";
                ctx.shadowBlur = isHovered && globalScale > 0.9 && !isFirefox ? 3 : 0;
              ctx.fillText(label, node.x! + dx, node.y! + dy);
              ctx.shadowBlur = 0;
          }}
        />
      </div>
    );
  }
);

export default CodexGraph;
