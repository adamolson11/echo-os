"use client";

import Image from "next/image";
import Link from "next/link";

export default function GatewayHall() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/hallway-art.png"  // <-- Rename your file to this for consistency
        alt="Echo House Hallway"
        fill
        priority
        className="object-cover"
      />

      {/* STORY Door Hotspot */}
      <Link
        href="/story"
        className="absolute block"
        style={{
          left: "7%",
          top: "28%",
          width: "18%",
          height: "45%",
        }}
      >
        <div className="w-full h-full hover:ring-4 hover:ring-orange-400/60 transition-all duration-200 cursor-pointer" />
      </Link>

      {/* CODEX Door Hotspot */}
      <Link
        href="/codex"
        className="absolute block"
        style={{
          left: "33%",
          top: "30%",
          width: "21%",
          height: "48%",
        }}
      >
        <div className="w-full h-full hover:ring-4 hover:ring-cyan-400/60 transition-all duration-200 cursor-pointer" />
      </Link>

      {/* ARCHIVE Door Hotspot */}
      <Link
        href="/archive"
        className="absolute block"
        style={{
          left: "62%",
          top: "33%",
          width: "14%",
          height: "40%",
        }}
      >
        <div className="w-full h-full hover:ring-4 hover:ring-blue-300/50 transition-all duration-200 cursor-pointer" />
      </Link>

      {/* LAB Door Hotspot */}
      <Link
        href="/lab"
        className="absolute block"
        style={{
          left: "79%",
          top: "25%",
          width: "16%",
          height: "52%",
        }}
      >
        <div className="w-full h-full hover:ring-4 hover:ring-indigo-400/60 transition-all duration-200 cursor-pointer" />
      </Link>
    </div>
  );
}
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

        {/* ----- GLOW + FX LAYERS (no pointer events) ----- */}
        <div className="pointer-events-none absolute inset-0">
          {/* STORY warm glow */}
          <div
            className="absolute door-glow-warm"
            style={{
              left: "7%",
              top: "18%",
              width: "12%",
              height: "55%",
            }}
          />

          {/* CODEX cyan glow */}
          <div
            className="absolute door-glow-cyan"
            style={{
              left: "36%",
              top: "22%",
              width: "12%",
              height: "58%",
            }}
          />

          {/* ARCHIVE cool glow */}
          <div
            className="absolute door-glow-archive"
            style={{
              left: "60%",
              top: "28%",
              width: "9%",
              height: "45%",
            }}
          />

          {/* LAB glitchy glow */}
          <div
            className="absolute door-glow-lab"
            style={{
              left: "79%",
              top: "20%",
              width: "10%",
              height: "60%",
            }}
          />

          {/* ===== CODEX VOLUMETRIC LIGHT RAY ===== */}
          <div
            className="absolute codex-ray"
            style={{
              left: "35%",
              top: "40%",
              width: "28%",
              height: "45%",
            }}
          />

          {/* ===== LAB GLITCH STRIPS ===== */}
          <div
            className="absolute lab-glitch-strip"
            style={{
              left: "83%",
              top: "18%",
              width: "3%",
              height: "40%",
            }}
          />
          <div
            className="absolute lab-glitch-strip"
            style={{
              left: "81%",
              top: "30%",
              width: "2%",
              height: "32%",
            }}
          />
          <div
            className="absolute lab-glitch-strip"
            style={{
              left: "85%",
              top: "25%",
              width: "2%",
              height: "36%",
            }}
          />

          {/* ===== FLOOR SHADOW + REFLECTION ===== */}
          <div
            className="absolute floor-shadow"
            style={{
              left: "0%",
              bottom: "0%",
              width: "100%",
              height: "35%",
            }}
          />
          <div
            className="absolute floor-reflect"
            style={{
              left: "32%",
              bottom: "0%",
              width: "30%",
              height: "30%",
            }}
          />

        {/* ===== LAB CHROMATIC ABERRATION AURA ===== */}
        <div
          className="absolute lab-aberration"
          style={{
            left: "76%",
            top: "18%",
            width: "16%",
            height: "60%",
          }}
        />

        {/* ===== DUST MOTES IN LIGHT BEAMS ===== */}
        <div
          className="absolute dust-mote dust-mote-1"
          style={{
            left: "40%",
            top: "28%",
            width: "6%",
            height: "12%",
          }}
        />
        <div
          className="absolute dust-mote dust-mote-2"
          style={{
            left: "52%",
            top: "32%",
            width: "5%",
            height: "10%",
          }}
        />
        <div
          className="absolute dust-mote dust-mote-3"
          style={{
            left: "32%",
            top: "35%",
            width: "7%",
            height: "14%",
          }}
        />

        {/* ===== NOIR SHADOW SLICE ACROSS HALLWAY ===== */}
        <div
          className="absolute noir-slice"
          style={{
            left: "-10%",
            top: "8%",
            width: "120%",
            height: "28%",
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
          <div className="w-full h-full cursor-pointer transition-transform duration-300 hover:scale-[1.03]" />
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
          <div className="w-full h-full cursor-pointer transition-transform duration-300 hover:scale-[1.03]" />
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
          <div className="w-full h-full cursor-pointer transition-transform duration-300 hover:scale-[1.03]" />
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
          <div className="w-full h-full cursor-pointer transition-transform duration-300 hover:scale-[1.03]" />
        </Link>
      </div>
    </div>
  );
}
