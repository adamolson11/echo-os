"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

type TunnelOverlayProps = {
  targetRoute: string;
  variant?: "story" | "codex" | "archive" | "lab";
  onFinish?: () => void;
};

export default function TunnelOverlay({ targetRoute, variant = "story", onFinish }: TunnelOverlayProps) {
  const router = useRouter();

  useEffect(() => {
    const id = setTimeout(() => {
      if (onFinish) onFinish();
      router.push(targetRoute);
    }, 1500);

    return () => clearTimeout(id);
  }, [router, targetRoute, onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="text-center text-white">
        <div className="mb-4 text-2xl font-semibold">Entering {variant}…</div>
        <div className="w-40 h-40 mx-auto rounded-full border border-white/20 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
}
