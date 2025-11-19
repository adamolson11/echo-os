import Link from 'next/link';
{/* Floating badge */}
<div className="absolute top-3 right-3 z-10 rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-white/80 backdrop-blur-sm border border-white/10">
  Room
</div>

type DoorCardProps = {
  label: string;
  eyebrow: string;
  tagline: string;
  href: string;
  glow: 'cyan' | 'violet' | 'ice' | 'amber';
};

const glowClasses: Record<DoorCardProps['glow'], string> = {
  cyan: 'hover:shadow-[0_0_25px_rgba(34,211,238,0.7)]',
  violet: 'hover:shadow-[0_0_25px_rgba(139,92,246,0.7)]',
  ice: 'hover:shadow-[0_0_25px_rgba(191,219,254,0.85)]',
  amber: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.85)]',
};

export default function DoorCard({
  label,
  eyebrow,
  tagline,
  href,
  glow,
}: DoorCardProps) {
  const glowClass = glowClasses[glow];

  return (
    <Link
      href={href}
      className={`group relative block aspect-[3/5] overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-lg transition duration-200 ${glowClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black`}
    >
      {/* Background gradient / subtle door vibe */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black">
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-white/5" />
      </div>

      {/* Bottom overlay for legible text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end p-4 sm:p-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-300/80">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-lg font-semibold sm:text-xl">
          {label}
        </h2>
        <p className="mt-1 text-xs text-slate-200/85 line-clamp-2">
          {tagline}
        </p>
      </div>

      {/* Hover sheen */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-200 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_60%)]" />
      </div>
    </Link>
  );
}
