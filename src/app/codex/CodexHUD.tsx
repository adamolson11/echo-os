"use client";

import React from "react";
import { seriesColorMap } from "../../config/codexColors";

type Props = {
  activeTypes: Record<string, boolean>;
  setActiveTypes: (v: any) => void;
  seriesLegend: { id: string; label: string; color: string }[];
  activeSeries: Record<string, boolean>;
  setActiveSeries: (v: any) => void;
  fgRef?: any;
  hoverNode?: any;
  nodeColor?: (n: any) => string;
};

export default function CodexHUD({
  activeTypes,
  setActiveTypes,
  seriesLegend,
  activeSeries,
  setActiveSeries,
  fgRef,
  hoverNode,
  nodeColor,
}: Props) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-4 text-xs uppercase tracking-[0.24em] text-gray-400">
      <span className="pointer-events-auto rounded-full border border-white/10 bg-black/60 px-3 py-1">
        Echo OS / Living Codex
      </span>

      <div className="pointer-events-auto flex flex-col gap-2 text-[10px]">
        <div className="flex gap-2">
          {["chapter", "character", "theme", "location", "event", "symbol", "stub"].map((type) => {
            const isOn = activeTypes[type] ?? true;
            return (
              <button
                key={type}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTypes((prev: any) => ({ ...prev, [type]: !isOn }));
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

        <div className="pointer-events-auto mt-2 flex flex-wrap gap-2 text-[10px]">
          {seriesLegend.map((item) => {
            const isOn = activeSeries[item.id] ?? true;
            return (
              <button
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSeries((prev: any) => ({ ...prev, [item.id]: !isOn }));
                }}
                className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 transition ${
                  isOn
                    ? "border-white/40 bg-white/10 text-gray-100"
                    : "border-white/10 bg-black/30 text-gray-500"
                }`}
              >
                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
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
            if (!fgRef?.current) return;
            try {
              const current = fgRef.current.zoom();
              fgRef.current.zoom(current * 1.2, 200);
            } catch (err) {}
          }}
          className="rounded-full border border-white/20 bg-white/5 px-2 py-1"
          title="Zoom in"
        >
          +
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!fgRef?.current) return;
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
            if (!fgRef?.current) return;
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

      {hoverNode && nodeColor && (
        <div className="pointer-events-auto rounded-xl border border-white/10 bg-black/80 px-3 py-2 text-[11px] max-w-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: nodeColor(hoverNode) }} />
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
  );
}
