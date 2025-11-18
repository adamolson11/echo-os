"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { forceManyBody, forceCenter, forceLink } from "d3-force";
import type { ForceGraphMethods } from "react-force-graph-2d";
import dynamic from "next/dynamic";
import { seriesColorMap } from "../../config/codexColors";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

type Props = {
  graphData: any;
  hoverNode?: any;
  selectedNode?: any;
  onNodeHover?: (n: any) => void;
  onNodeClick?: (n: any) => void;
};

const CodexGraph = forwardRef<ForceGraphMethods, Props>(
  ({ graphData, hoverNode, selectedNode, onNodeHover = () => {}, onNodeClick = () => {} }, ref) => {
    // measure container and provide explicit width/height to the canvas
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
      if (!containerRef.current) return;

      const el = containerRef.current;
      const updateSize = () => {
        const rect = el.getBoundingClientRect();
        const w = Math.max(0, Math.floor(rect.width));
        const h = Math.max(0, Math.floor(rect.height));
        setSize((prev) => (prev.width !== w || prev.height !== h ? { width: w, height: h } : prev));
      };

      // Use ResizeObserver for robust measurement (handles layout changes, overlays)
      const ro = new ResizeObserver(() => updateSize());
      ro.observe(el);

      // Also run once immediately
      updateSize();

      // log initial size for dev correlation with Yellow
      console.debug("[CodexGraph] initial container size", { width: el.clientWidth, height: el.clientHeight });

      // cleanup
      return () => ro.disconnect();
    }, []);

    // inner ref so we can call zoomToFit when the engine stops
    const innerRef = useRef<ForceGraphMethods | null>(null);

    // forward innerRef into the external ref prop when available
    useEffect(() => {
      if (!ref) return;
      try {
        if (typeof ref === "function") {
          (ref as any)(innerRef.current);
        } else if (ref && typeof ref === "object") {
          (ref as React.MutableRefObject<ForceGraphMethods | null>).current = innerRef.current;
        }
      } catch (e) {
        // ignore forward errors
      }
    }, [ref, innerRef.current]);

    // Configure d3 forces once we have a reference to the graph and a measured size
    useEffect(() => {
      if (!innerRef.current) return;
      if (size.width === 0 || size.height === 0) return;

      try {
        // link distance to reduce clustering
        // increase link distance to give nodes more breathing room
        innerRef.current.d3Force && innerRef.current.d3Force("link", forceLink().distance(100).id((d: any) => d.id));

        // soften node charge to reduce jitter (less aggressive repulsion)
        innerRef.current.d3Force && innerRef.current.d3Force("charge", forceManyBody().strength(-15));

        // center force to improve centering behavior
        innerRef.current.d3Force && innerRef.current.d3Force("center", forceCenter(size.width / 2, size.height / 2));

        // small debug note
        console.debug("[CodexGraph] applied d3 forces", { linkDistance: 60, charge: -25 });
      } catch (e) {
        console.warn("[CodexGraph] failed to apply d3 forces:", e);
      }
    }, [innerRef.current, size.width, size.height]);

    // Debugging info to the browser console
    const safeData = graphData ?? { nodes: [], links: [] };

    if (typeof window !== "undefined") {
      console.log("[CodexGraph] graphData:", {
        hasData: !!(safeData && safeData.nodes && safeData.nodes.length),
        nodeCount: safeData?.nodes?.length ?? 0,
        linkCount: safeData?.links?.length ?? 0,
      });
    }

    // Log size changes for Yellow correlation
    useEffect(() => {
      console.debug("[CodexGraph] measured size", size);
    }, [size]);

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

    return (
      <div ref={containerRef} className="absolute inset-0 w-full h-full">
        {size.width > 0 && size.height > 0 && (
          <ForceGraph2D
          ref={innerRef as any}
          graphData={safeData}
          width={size.width}
          height={size.height}
          backgroundColor="#05050a"
          cooldownTicks={120}
          // Dev: ensure the sim runs long enough to settle on complex graphs
          // (will be tuned further if needed)
          
          nodeRelSize={4}
          linkDirectionalParticles={0}
          onEngineStop={() => {
            if (!innerRef.current) return;
            if (!safeData?.nodes?.length) return;
            try {
              innerRef.current.zoomToFit(400, 40);
            } catch (e) {
              console.warn("zoomToFit failed (engine stop):", e);
            }
          }}
          // When the inner ref is ready, configure d3 forces for better separation
          onEngineTick={() => {
            // noop: placeholder so the engine ticks are available for future telemetry
          }}
          linkWidth={(link: any) => {
            const s = (link.source as any)?.id;
            const t = (link.target as any)?.id;
            const isActive =
              (hoverNode && (s === hoverNode.id || t === hoverNode.id)) ||
              (selectedNode && (s === selectedNode.id || t === selectedNode.id));

            return isActive ? 2.4 : 0.8;
          }}
          linkColor={(link: any) => {
            const sourceNode = (link.source as any) || {};
            const targetNode = (link.target as any) || {};
            const base = seriesColorMap[sourceNode.series] || seriesColorMap.Default;

            const s = sourceNode.id;
            const t = targetNode.id;
            const isActive =
              (hoverNode && (s === hoverNode.id || t === hoverNode.id)) ||
              (selectedNode && (s === selectedNode.id || t === selectedNode.id));

            if (isActive) return base;
            return base + "55";
          }}
          onNodeHover={(node: any) => onNodeHover(node || null)}
          onNodeClick={(node: any) => onNodeClick(node || null)}
          nodeCanvasObjectMode={() => "before"}
          nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
            const typedNode = node as any;

            const isHovered = hoverNode && hoverNode.id === typedNode.id;
            const isSelected = selectedNode && selectedNode.id === typedNode.id;

            const isNeighbor =
              hoverNode &&
              (safeData?.links ?? []).some(
                (l: any) =>
                  (l.source?.id === hoverNode.id && l.target?.id === typedNode.id) ||
                  (l.target?.id === hoverNode.id && l.source?.id === typedNode.id)
              );

            let alpha = 0.35;
            if (hoverNode || selectedNode) {
              if (isHovered || isSelected) alpha = 1;
              else if (isNeighbor) alpha = 0.8;
              else alpha = 0.07;
            }

            const radiusBase = 2.5;
            const weight = typedNode.weight ?? 1;
            const radius = radiusBase * weight * (isHovered || isSelected ? 1.8 : isNeighbor ? 1.3 : 1);

            const color = nodeColor(typedNode);

            if (typedNode.x == null || typedNode.y == null) return;

            const gradientRadius = radius * 4;
            const gradient = ctx.createRadialGradient(typedNode.x, typedNode.y, radius, typedNode.x, typedNode.y, gradientRadius);
            gradient.addColorStop(0, `${color}aa`);
            gradient.addColorStop(1, "rgba(0,0,0,0)");

            ctx.save();
            ctx.globalAlpha = alpha * 0.7;
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(typedNode.x, typedNode.y, gradientRadius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();

            // Colored stroke halo
            ctx.save();
            ctx.beginPath();
            const haloRadius = radius + 6;
            ctx.arc(typedNode.x, typedNode.y, haloRadius, 0, 2 * Math.PI);
            ctx.strokeStyle = color + "33";
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.restore();

            // Core node
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(typedNode.x, typedNode.y, radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();

            // Labels: dynamic opacity and font scaling based on zoom and distance
            const label = typedNode.label || typedNode.id;
            // compute distance from viewport center (approx)
            const dx = typedNode.x - size.width / 2;
            const dy = typedNode.y - size.height / 2;
            const dist = Math.hypot(dx, dy);
            const maxDist = Math.max(size.width, size.height) * 0.6;
            const distanceFactor = Math.min(1, dist / maxDist);

            // label visibility scales with zoom (globalScale) and distance from center
            const zoomFactor = Math.min(2, Math.max(0.6, globalScale));
            // tighten fade-in: require slightly larger zoom to show labels
            const fadeThreshold = 1.4; // labels start to appear above this globalScale
            const rawOpacity = (globalScale - fadeThreshold) / (2 - fadeThreshold);
            const labelOpacity = Math.min(1, Math.max(0, rawOpacity * (1 - distanceFactor)));
            // clamp font size so labels remain legible but not huge
            const fontSize = Math.min(18, Math.max(10, Math.round(12 * zoomFactor)));

            if (labelOpacity > 0.02) {
              ctx.save();
              ctx.globalAlpha = alpha * labelOpacity;
              ctx.font = `${fontSize}px system-ui, -apple-system, BlinkMacSystemFont, sans-serif`;
              ctx.textAlign = "left";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "rgba(255,255,255,0.9)";
              ctx.fillText(label, typedNode.x + radius + 4, typedNode.y);
              ctx.restore();
            }
          }}
          
          />
        )}
      </div>
    );
  }
);

CodexGraph.displayName = "CodexGraph";

export default CodexGraph;
