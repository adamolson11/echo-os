"use client";

import React, { forwardRef, useEffect, useRef, useImperativeHandle, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import CodexPerfOverlay from "@/components/codex/CodexPerfOverlay";
import type { ForceGraphMethods } from "react-force-graph-2d";
import { forceCollide } from 'd3-force';

const ForceGraph2D: any = dynamic(() => import("react-force-graph-2d"), { ssr: false });

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
    const [engineSettled, setEngineSettled] = useState<boolean>(false);
    const hoverThrottleRef = useRef<number>(0);
    const hoverRAFRef = useRef<number | null>(null);
    const pendingHoverRef = useRef<any | null>(null);
    const [hoverOverlayPos, setHoverOverlayPos] = useState<{ x: number; y: number; node: any } | null>(null);
    // compute node-count based tuning values so we can pass them as props
    const nodeCount = (graphData?.nodes?.length as number) || 1;
    const scaledDistance = Math.min(420, 120 + Math.sqrt(nodeCount) * 4);
    const computedCharge = -Math.max(400, Math.min(500, Math.round(nodeCount * 2)));
    
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
      // whenever graph data changes, mark engine unsettled until simulation finishes
      setEngineSettled(false);

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

    // onEngineStop will be called when the force simulation stabilizes
    const handleEngineStop = () => {
      setEngineSettled(true);
      try {
        const fg = internalRef.current as any;
        fg && fg.zoomToFit && fg.zoomToFit(400, 50);
      } catch (e) {}
    };

    return (
      <div className="absolute inset-0 w-full h-full">
        <ForceGraph2D
          ref={internalRef as any}
          graphData={graphData}
          backgroundColor="#05060a"

          // get notified when the force simulation finishes so we can enable labels
          onEngineStop={handleEngineStop}

          // store hovered node upstream and locally for more reliable rendering
          onNodeHover={(n: any, prev: any) => {
            // Batch hover updates via requestAnimationFrame for smoother rendering
            // (reduces jank in Firefox by aligning to paint)
            pendingHoverRef.current = n || null;
            if (hoverRAFRef.current == null) {
              const schedule = typeof window !== 'undefined' ? window.requestAnimationFrame : (cb: any) => setTimeout(cb, 16);
              hoverRAFRef.current = (schedule(() => {
                hoverRAFRef.current = null;
                const value = pendingHoverRef.current;
                pendingHoverRef.current = null;
                setLocalHover(value);
                onNodeHover?.(value || null);
                // If Firefox, compute screen coords for a lightweight DOM overlay
                try {
                  const fg = internalRef.current as any;
                  const isFirefox = typeof navigator !== 'undefined' && /Firefox/.test(navigator.userAgent || '');
                  if (isFirefox && value && fg && typeof fg.graph2ScreenCoords === 'function') {
                    const p = fg.graph2ScreenCoords(value.x, value.y);
                    setHoverOverlayPos({ x: p.x, y: p.y, node: value });
                  } else {
                    setHoverOverlayPos(null);
                  }
                } catch (e) {
                  setHoverOverlayPos(null);
                }
              }) as unknown as number);
            }
          }}
          onNodeClick={(n: any) => onNodeClick?.(n)}

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
          

          // physics/spacing tuned per node count
          linkDistance={scaledDistance}
          nodeRelSize={4}
          nodeVal={(n: any) => 1}
          cooldownTicks={80}

          // custom node rendering: Obsidian-style tiny labels that scale with zoom
            // and avoid drawing until nodes and engine are stable.
            nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
              // compute hovered/neighbour status
              const hover = localHover || hoverNode;
              const isHovered = hover?.id === node.id;
              const isNeighbor = hover ? neighborIds.has(node.id) : false;

              // detect Firefox once per paint callback to avoid redeclaring
              const isFirefox = typeof navigator !== 'undefined' && /Firefox/.test(navigator.userAgent || '');

              // radius: hovered > neighbor > default (slightly reduced to avoid billboard-size)
              const radius = isHovered ? 6 : isNeighbor ? 5 : 4;

              // color
              const color = isHovered ? "rgba(45,212,191,0.95)" : isNeighbor ? "rgba(56,189,248,0.95)" : "rgba(37,99,235,0.9)";

              // subtle time-based wobble to make hovered nodes 'dance'
              const now = (typeof performance !== 'undefined' ? performance.now() : Date.now());
              // micro-perf: even lower wobble frequency and amplitude
              const freq = 0.0015;
              // memoize per-node phase to avoid hash work every paint
              let phase = (node as any).__wobblePhase;
              if (phase == null) {
                const idStr = String(node.id ?? '0');
                let idHash = 0;
                for (let i = 0; i < idStr.length; i++) idHash = (idHash * 31 + idStr.charCodeAt(i)) >>> 0;
                phase = idHash % 1000;
                (node as any).__wobblePhase = phase;
              }
              // reduce amplitude strongly; only small motion for hovered nodes
              const ampBase = isHovered ? 1.0 : isNeighbor ? 0.35 : 0;
              const amp = ampBase * 0.35 * Math.min(1, globalScale);
              const dx = Math.sin(now * freq + phase) * amp;
              const dy = Math.cos(now * freq + phase) * amp * 0.8;

              // --- draw node circle (with wobble) ---
              ctx.beginPath();
              ctx.arc(node.x! + dx, node.y! + dy, radius, 0, 2 * Math.PI);
              ctx.fillStyle = color;
              ctx.fill();

              // subtle halo stroke for hovered node — skip complex halo in Firefox
              if (isHovered) {
                if (!isFirefox) {
                  ctx.beginPath();
                  const haloRadius = radius + 2.5; // simple halo
                  ctx.arc(node.x! + dx, node.y! + dy, haloRadius, 0, 2 * Math.PI);
                  ctx.strokeStyle = "rgba(45,212,191,0.08)";
                  ctx.lineWidth = 3;
                  ctx.stroke();
                } else {
                  // Firefox: keep hover visuals minimal (color change only)
                  ctx.beginPath();
                  ctx.arc(node.x! + dx, node.y! + dy, radius + 1, 0, 2 * Math.PI);
                  ctx.strokeStyle = "rgba(45,212,191,0.09)";
                  ctx.lineWidth = 1.5;
                  ctx.stroke();
                }
              }

                  // --- label: always-on-ish, but small and only when zoomed in enough ---
              const label = node.name ?? node.id;
                  if (!label) return;

                  // Prevent label flash: only render labels after physics engine has settled
                  if (!engineSettled) return;

                  // guard: ensure node coordinates are valid
                  if (typeof node.x !== 'number' || typeof node.y !== 'number') return;

                  // clamp label rendering: skip labels when zoomed out to save paint
                  // use a slightly lower threshold so labels appear when reasonably zoomed
                  if (globalScale < 0.7) return;

                  // label scaling: prefer using the graph zoom state (if available) to compute a scale
                  const currentZoom = (internalRef.current && typeof (internalRef.current as any).zoom === 'function') ? (internalRef.current as any).zoom() : 1;
                  const labelScale = Math.max(currentZoom * 0.6, 0.8);
                  const fontSize = Math.max(6, Math.min(14, 8 * labelScale));

                  ctx.font = `${fontSize}px system-ui, -apple-system, BlinkMacSystemFont, sans-serif`;
              ctx.fillStyle = "rgba(255,255,255,0.75)";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";

                // minimize shadow blur unless hovered and zoomed-in (expensive on some browsers)
                ctx.shadowColor = "rgba(0,0,0,0.45)";
                ctx.shadowBlur = isHovered && globalScale > 0.9 && !isFirefox ? 3 : 0;
              ctx.fillText(label, node.x! + dx, node.y! + dy);
              ctx.shadowBlur = 0;
          }}
        />
        {/* Dev-only perf overlay for QA */}
        {typeof process !== 'undefined' && process.env.NODE_ENV !== 'production' ? (
          <CodexPerfOverlay nodeCount={(graphData?.nodes?.length as number) || 0} />
        ) : null}

        {/* DOM overlay fallback for Firefox hover to avoid expensive canvas halos */}
        {hoverOverlayPos ? (
          <div
            style={{
              position: 'absolute',
              left: hoverOverlayPos.x,
              top: hoverOverlayPos.y,
              transform: 'translate(-50%, -150%)',
              pointerEvents: 'none',
              zIndex: 60,
            }}
          >
            <div className="bg-black/70 text-white text-xs rounded px-2 py-1 font-mono">
              {String(hoverOverlayPos.node?.name ?? hoverOverlayPos.node?.id)}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);

export default CodexGraph;
