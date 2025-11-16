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
      {/* Fixed-aspect container so hotspots always match the image */}
      <div
        className="relative w-full max-w-6xl aspect-[934/425] overflow-hidden rounded-2xl"
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

        {/* STORY door */}
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
          <div className="w-full h-full cursor-pointer transition-all duration-200 hover:ring-4 hover:ring-orange-400/70 hover:shadow-[0_0_40px_rgba(251,146,60,0.7)]" />
        </Link>

        {/* CODEX door – gets a faint breathing glow */}
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
          <div className="w-full h-full cursor-pointer transition-all duration-200 hover:ring-4 hover:ring-cyan-400/80 hover:shadow-[0_0_45px_rgba(34,211,238,0.8)] animate-pulse" />
        </Link>

        {/* ARCHIVE door */}
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
          <div className="w-full h-full cursor-pointer transition-all duration-200 hover:ring-4 hover:ring-sky-300/70 hover:shadow-[0_0_35px_rgba(125,211,252,0.7)]" />
        </Link>

        {/* LAB door – slight glitchy feel via faster pulse */}
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
          <div className="w-full h-full cursor-pointer transition-all duration-150 hover:ring-4 hover:ring-indigo-400/80 hover:shadow-[0_0_45px_rgba(129,140,248,0.9)] animate-pulse" />
        </Link>
      </div>
    </div>
  );
}
