"use client";

import Link from "next/link";

export default function GatewayHall() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image (plain <img> so page renders even if image isn't present yet) */}
      <img src="/images/hallway-art.png" alt="Echo House Hallway" className="object-cover absolute inset-0 w-full h-full" />

      {/* STORY Door Hotspot */}
      <Link
        href="/story"
        className="absolute block z-10"
        style={{
          left: "7%",
          top: "28%",
          width: "18%",
          height: "45%",
        }}
      >
        <div className="w-full h-full bg-transparent hover:ring-4 hover:ring-orange-400/60 transition-all duration-200 cursor-pointer" />
      </Link>

      {/* CODEX Door Hotspot */}
      <Link
        href="/codex"
        className="absolute block z-10"
        style={{
          left: "33%",
          top: "30%",
          width: "21%",
          height: "48%",
        }}
      >
        <div className="w-full h-full bg-transparent hover:ring-4 hover:ring-cyan-400/60 transition-all duration-200 cursor-pointer" />
      </Link>

      {/* ARCHIVE Door Hotspot */}
      <Link
        href="/archive"
        className="absolute block z-10"
        style={{
          left: "62%",
          top: "33%",
          width: "14%",
          height: "40%",
        }}
      >
        <div className="w-full h-full bg-transparent hover:ring-4 hover:ring-blue-300/50 transition-all duration-200 cursor-pointer" />
      </Link>

      {/* LAB Door Hotspot */}
      <Link
        href="/lab"
        className="absolute block z-10"
        style={{
          left: "79%",
          top: "25%",
          width: "16%",
          height: "52%",
        }}
      >
        <div className="w-full h-full bg-transparent hover:ring-4 hover:ring-indigo-400/60 transition-all duration-200 cursor-pointer" />
      </Link>
    </div>
  );
}
