"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = { nodeCount?: number };

export default function CodexPerfOverlay({ nodeCount = 0 }: Props) {
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const framesRef = useRef(0);
  const [fps, setFps] = useState(0);

  useEffect(() => {
    const loop = (t: number) => {
      if (lastRef.current == null) lastRef.current = t;
      framesRef.current += 1;
      const delta = t - (lastRef.current || 0);
      if (delta >= 500) {
        setFps(Math.round((framesRef.current / delta) * 1000));
        framesRef.current = 0;
        lastRef.current = t;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed left-3 top-3 z-50">
      <div className="bg-black/60 text-white text-xs rounded-md px-2 py-1 font-mono">
        <div>Codex · nodes: {nodeCount}</div>
        <div>FPS: {fps}</div>
      </div>
    </div>
  );
}
