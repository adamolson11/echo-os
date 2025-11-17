import Link from "next/link";
import React from "react";

type SeriesCardProps = {
  title: string;
  description: string;
  href: string;
  accentColor: string;
  comingSoon?: boolean;
};

export default function SeriesCard({ title, description, href, accentColor, comingSoon }: SeriesCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 transition hover:border-slate-500">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
        </div>

        {comingSoon ? (
          <span className="rounded-full bg-black/30 px-3 py-1 text-xs text-slate-300">Coming soon</span>
        ) : null}
      </div>

      <p className="mt-4 text-slate-400">{description}</p>

      <div className="mt-6">
        {!comingSoon ? (
          <Link href={href} className="inline-block rounded-full bg-white/6 px-4 py-2 text-sm text-slate-100">
            Start at Chapter 1
          </Link>
        ) : (
          <button className="inline-block rounded-full border border-white/6 px-4 py-2 text-sm text-slate-400" disabled>
            Coming soon
          </button>
        )}
      </div>
    </div>
  );
}
