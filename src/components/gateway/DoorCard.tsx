import Link from "next/link";

interface DoorCardProps {
  label: string;
  href: string;
  eyebrow?: string;
  image?: string;
  tagline?: string;
};

export default function DoorCard({ href, label, eyebrow, tagline, image }: DoorCardProps) {
  const src = image || "/images/portal-doors.jpg";
  return (
    <Link
      href={href}
      className="group relative flex aspect-[2/3] items-end overflow-hidden rounded-3xl border border-slate-700/60 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-4 pb-4 shadow-[0_20px_60px_rgba(0,0,0,0.75)] transition hover:-translate-y-1 hover:border-sky-400/80 hover:shadow-[0_30px_80px_rgba(15,23,42,0.95)]"
    >

      {/* background image (CSS background fallback) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full bg-cover bg-center opacity-60 group-hover:opacity-80 transition"
        style={{ backgroundImage: `url(${src})` }}
      />

      {/* subtle overlay so text stays legible */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black/44" />
      </div>

      {/* door frame */}
      <div className="pointer-events-none absolute inset-[8%] rounded-2xl border border-slate-600/30 group-hover:border-sky-400/50" />

      {/* knob */}
      <div className="pointer-events-none absolute right-[12%] bottom-[18%] h-3 w-3 rounded-full border border-slate-400/80 bg-slate-900 shadow-[0_0_0_4px_rgba(15,23,42,0.9)] group-hover:border-sky-300 group-hover:bg-sky-400" />

      {/* label */}
      <div className="relative z-10 space-y-1">
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
