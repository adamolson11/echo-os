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
  const src = image || "/images/portal-doors.jpg";
  return (
    <Link
      href={href}
      className={`group relative flex aspect-[9/14] sm:aspect-[9/16] items-end overflow-hidden rounded-3xl px-4 pb-6 transform transition-transform duration-200 hover:-translate-y-0.5 hover:scale-102 w-full sm:w-[220px] md:w-[260px] lg:w-[300px] focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
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
          style={bgPosition ? { objectPosition: bgPosition } : undefined}
          className="object-cover object-center opacity-80 group-hover:opacity-95 transition-opacity duration-300"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/20" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80 mb-1">{eyebrow}</p>
        )}
        <h3 className="text-lg sm:text-xl font-semibold text-zinc-50">{label}</h3>
        {tagline && (
          <p className="mt-1 text-xs sm:text-sm text-zinc-300/80 leading-snug">{tagline}</p>
        )}
      </div>
    </Link>
  );
}
import Link from "next/link";
import type { CSSProperties } from "react";

interface DoorCardProps {
  label: string;
  href: string;
  eyebrow?: string;
  image?: string;
  // optional background position to show the correct slice of a shared hallway image
  bgPosition?: string;
  // optional style for absolute placement (left/right) when used in hallway overlay
  style?: CSSProperties;
  // if true, render as a transparent cutout (no frame/knob/overlay)
  cutout?: boolean;
  tagline?: string;
};

export default function DoorCard({ href, label, eyebrow, tagline, image, bgPosition, style, cutout }: DoorCardProps) {
  const src = image || "/images/portal-doors.jpg";
  return (
    <Link
      href={href}
      className={`group relative flex aspect-[9/14] sm:aspect-[9/16] items-end overflow-hidden rounded-3xl px-4 pb-6 transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 w-full sm:w-[200px] md:w-[240px] focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${cutout ? '' : 'border border-slate-700/60 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 shadow-[0_20px_60px_rgba(0,0,0,0.75)] hover:border-sky-400/80 hover:shadow-[0_30px_90px_rgba(15,23,42,0.95)]'}`}
      style={style}
      role="link"
      aria-label={label}
      tabIndex={0}
      // better keyboard focus styling
      "use client";

      import Link from "next/link";
      import Image from "next/image";
      // `cn` helper is optional; if your project doesn't export it, the className below
      // is a plain string. Adjust import if you have a lib/utils with `cn`.
      const cn = (...args: any[]) => args.filter(Boolean).join(" ");

      type DoorCardProps = {
        label: string;
        eyebrow?: string;
        tagline?: string;
        href: string;
        image: string;
      };

      export default function DoorCard({
        label,
        eyebrow,
        tagline,
        href,
        image,
      }: DoorCardProps) {
        return (
          <Link
            href={href}
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-zinc-800/70",
              "bg-zinc-950/80 shadow-lg hover:shadow-xl",
              "transition-transform transition-shadow duration-300 hover:-translate-y-1",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            )}
          >
            {/* Background image */}
            <div className="relative h-48 sm:h-52 lg:h-56 w-full">
              <Image
                src={image}
                alt={label}
                fill
                className="object-cover object-center opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/20" />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
              {eyebrow && (
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80 mb-1">
                  {eyebrow}
                </p>
              )}
              <h3 className="text-lg sm:text-xl font-semibold text-zinc-50">{label}</h3>
              {tagline && (
                <p className="mt-1 text-xs sm:text-sm text-zinc-300/80 leading-snug">{tagline}</p>
              )}
            </div>
          </Link>
        );
      }
