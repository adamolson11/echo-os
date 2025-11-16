"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function GatewayHall() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div className="relative w-full h-screen overflow-hidden" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* background image with subtle parallax using the attached art */}
      <Image
        src="/images/hallway-art.png"
        alt="Echo House Hallway"
        fill
        priority
        className="object-cover transition-transform duration-200"
        style={{ transform: `translate(${offset.x * 8}px, ${offset.y * 6}px)` }}
      />

      {/* clickable hotspots - exact percentage positioning */}
      {/* STORY */}
      <Link
        href="/story"
        className="absolute block"
        style={{ left: "7%", top: "28%", width: "18%", height: "45%", zIndex: 10 }}
        aria-label="Story door"
      >
        <div className="w-full h-full bg-transparent transition-all duration-200 hover:ring-4 hover:ring-orange-400/60 cursor-pointer" />
      </Link>

      {/* CODEX */}
      <Link
        href="/codex"
        className="absolute block"
        style={{ left: "33%", top: "30%", width: "21%", height: "48%", zIndex: 10 }}
        aria-label="Codex door"
      >
        <div className="w-full h-full bg-transparent transition-all duration-200 hover:ring-4 hover:ring-cyan-400/60 cursor-pointer" />
      </Link>

      {/* ARCHIVE */}
      <Link
        href="/archive"
        className="absolute block"
        style={{ left: "62%", top: "33%", width: "14%", height: "40%", zIndex: 10 }}
        aria-label="Archive door"
      >
        <div className="w-full h-full bg-transparent transition-all duration-200 hover:ring-4 hover:ring-blue-300/50 cursor-pointer" />
      </Link>

      {/* LAB */}
      <Link
        href="/lab"
        className="absolute block"
        style={{ left: "79%", top: "25%", width: "16%", height: "52%", zIndex: 10 }}
        aria-label="Lab door"
      >
        <div className="w-full h-full bg-transparent transition-all duration-200 hover:ring-4 hover:ring-indigo-400/60 cursor-pointer" />
      </Link>
    </div>
  );
}
