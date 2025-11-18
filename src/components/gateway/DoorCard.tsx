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
      data-testid="doorcard"
    >

      {/* background image (CSS background fallback) */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div
          aria-hidden
            className={`pointer-events-none absolute inset-0 h-full w-full bg-cover transform transition-transform duration-500 ease-out ${cutout ? '' : 'opacity-60 group-hover:opacity-80 group-focus:opacity-90 group-hover:scale-105 group-focus:scale-102'}`}
            style={{ backgroundImage: `url(${src})`, backgroundPosition: bgPosition || 'center', backgroundSize: 'cover', willChange: 'transform' }}
        />
          {/* subtle glow when hovering (md+) to emphasize portal) */}
          {!cutout && (
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-70 group-focus:opacity-70"
              style={{ background: 'radial-gradient(closest-side, rgba(125,211,252,0.08), transparent 40%)', mixBlendMode: 'screen' }}
            />
          )}
      </div>

      {/* subtle overlay so text stays legible */}
      {!cutout && (
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-black/44" />
        </div>
      )}

      {/* door frame */}
      {!cutout && (
        <div className="pointer-events-none absolute inset-[8%] rounded-2xl border border-slate-600/30 group-hover:border-sky-400/50" />
      )}

      {/* knob */}
      {!cutout && (
        <div className="pointer-events-none absolute right-[12%] bottom-[18%] h-3 w-3 rounded-full border border-slate-400/80 bg-slate-900 shadow-[0_0_0_4px_rgba(15,23,42,0.9)] transition-transform duration-300 group-hover:scale-110 group-hover:border-sky-300 group-hover:bg-sky-400 group-hover:shadow-[0_0_12px_rgba(125,211,252,0.18)]" />
      )}

      {/* labels */}
      <div className="relative z-10 space-y-1 text-center sm:text-left px-3 py-3">
        {eyebrow && (
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400/80">{eyebrow}</p>
        )}
        <p className="text-sm font-semibold text-slate-100 group-hover:text-sky-50">{label}</p>
        {tagline && (
          <p className="text-[11px] text-slate-300/80 group-hover:text-slate-100/90">{tagline}</p>
        )}
      </div>
    </Link>
  );
}
