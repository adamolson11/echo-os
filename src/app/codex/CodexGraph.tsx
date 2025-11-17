"use client";

import React, { forwardRef } from "react";
import dynamic from "next/dynamic";
import { seriesColorMap } from "../../config/codexColors";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

type Props = {
  graphData: any;
  hoverNode: any;
  selectedNode: any;
  onNodeHover: (n: any) => void;
  onNodeClick: (n: any) => void;
};

const CodexGraph = forwardRef<any, Props>(({ graphData, hoverNode, selectedNode, onNodeHover, onNodeClick }, ref) => {
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
    <ForceGraph2D
      ref={ref}
      graphData={graphData}
      backgroundColor="#05050a"
      cooldownTime={3000}
      linkDistance={40}
      nodeRelSize={4}
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
  );
});

export default CodexGraph;
