"use client";

import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";

type DoorCardProps = {
  label: string;
  eyebrow?: string;
  tagline?: string;
  href: string;
  image?: string;
  bgPosition?: string;
  style?: CSSProperties;
  cutout?: boolean;
};

export default function DoorCard({
  label,
  eyebrow,
  tagline,
  href,
  image,
  bgPosition,
  style,
  cutout,
}: DoorCardProps) {
  const src = image || "/images/doors/placeholder-noir.jpg";
  return (
    <Link
      href={href}
      className={`group relative flex aspect-[3/5] items-end overflow-hidden rounded-3xl transform transition-transform duration-200 hover:-translate-y-0.5 hover:scale-102 w-full sm:w-[220px] md:w-[260px] lg:w-[300px] focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
        cutout ? "" : "border border-slate-700/60 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 shadow-lg"
      }`}
      style={style}
      role="link"
      aria-label={label}
    >
      <div className="relative h-48 sm:h-52 lg:h-56 w-full">
        <Image
          src={src}
          alt={label}
          fill
          priority
          style={bgPosition ? { objectPosition: bgPosition } : undefined}
          className="object-cover object-center opacity-80 group-hover:opacity-95 transition-opacity duration-300 filter group-hover:brightness-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/55" />
        <div className="absolute inset-0 transition-all duration-200 ease-out pointer-events-none opacity-0 group-hover:opacity-100 bg-white/10" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 md:p-5">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80 mb-1">{eyebrow}</p>
        )}
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-zinc-50">{label}</h3>
        {tagline && (
          <p className="mt-1 text-xs sm:text-sm text-zinc-300/80 leading-snug">{tagline}</p>
        )}
      </div>
    </Link>
  );
}
