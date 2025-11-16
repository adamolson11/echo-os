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

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      {/* Fixed-aspect container so hotspots stay aligned with the image */}
      <div
        className="relative w-full max-w-6xl aspect-[21/9] overflow-hidden rounded-2xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background image with subtle parallax */}
        <Image
          src="/images/portal-doors.jpg"
          alt="Echo OS hallway of doors"
          fill
          priority
          className="object-cover transition-transform duration-200"
          style={{
            transform: `scale(1.03) translate(${offset.x * 10}px, ${
              offset.y * 6
            }px)`,
          }}
        />

        {/* ----- GLOW LAYERS (TV-style light from each doorway) ----- */}
        <div className="pointer-events-none absolute inset-0">
          {/* STORY warm glow */}
          <div
            className="absolute door-glow-warm"
            style={{
              left: "3%",
              top: "5%",
              width: "22%",
              height: "90%",
            }}
          />

          {/* CODEX cyan glow */}
          <div
            className="absolute door-glow-cyan"
            style={{
              left: "30%",
              top: "8%",
              width: "24%",
              height: "88%",
            }}
          />

          {/* ARCHIVE cool glow */}
          <div
            className="absolute door-glow-archive"
            style={{
              left: "56%",
              top: "15%",
              width: "18%",
              height: "75%",
            }}
          />

          {/* LAB glitchy glow */}
          <div
            className="absolute door-glow-lab"
            style={{
              left: "75%",
              top: "8%",
              width: "20%",
              height: "88%",
            }}
          />
        </div>

        {/* ----- CLICKABLE HOTSPOTS ----- */}

        {/* STORY */}
        <Link
          href="/story"
          className="absolute block"
          style={{
            left: "6%",
            top: "15%",
            width: "17%",
            height: "73%",
          }}
        >
          <div className="w-full h-full cursor-pointer transition-transform duration-150 hover:scale-[1.02] hover:ring-2 hover:ring-orange-400/80" />
        </Link>

        {/* CODEX */}
        <Link
          href="/codex"
          className="absolute block"
          style={{
            left: "32%",
            top: "17%",
            width: "20%",
            height: "76%",
          }}
        >
          <div className="w-full h-full cursor-pointer transition-transform duration-150 hover:scale-[1.02] hover:ring-2 hover:ring-cyan-400/80" />
        </Link>

        {/* ARCHIVE */}
        <Link
          href="/archive"
          className="absolute block"
          style={{
            left: "59%",
            top: "20%",
            width: "13%",
            height: "65%",
          }}
        >
          <div className="w-full h-full cursor-pointer transition-transform duration-150 hover:scale-[1.02] hover:ring-2 hover:ring-sky-300/80" />
        </Link>

        {/* LAB */}
        <Link
          href="/lab"
          className="absolute block"
          style={{
            left: "77%",
            top: "14%",
            width: "15%",
            height: "74%",
          }}
        >
          <div className="w-full h-full cursor-pointer transition-transform duration-150 hover:scale-[1.02] hover:ring-2 hover:ring-indigo-400/80" />
        </Link>
      </div>
    </div>
  );
}
