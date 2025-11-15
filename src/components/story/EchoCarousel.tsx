"use client";

import { useState } from "react";
import Link from "next/link";
import { storyArcs } from "@/data/storyArcs";

export function EchoCarousel() {
  const [current, setCurrent] = useState(0);
  const total = storyArcs.length;

  const next = () => setCurrent((i) => (i + 1) % total);
  const prev = () => setCurrent((i) => (i - 1 + total) % total);

  return (
    <section className="mt-10 rounded-3xl border border-white/10 bg-ocean/80 overflow-hidden relative min-h-[380px] md:min-h-[460px] lg:min-h-[520px]">
      {/* Desktop stacking */}
      <div className="hidden md:block relative h-full">
        {storyArcs.map((arc, index) => {
          const offset = (index - current + total) % total;

          let classes =
            "absolute top-1/2 -translate-y-1/2 rounded-2xl bg-cover bg-center shadow-xl transition-all duration-500 ease-out";
          let style = { backgroundImage: `url(${arc.imageUrl})` };

          if (offset === 0) {
            classes +=
              " left-0 w-full h-full md:w-[60%] md:h-[80%] lg:w-[55%] lg:h-[80%] z-30";
          } else if (offset === 1) {
            classes +=
              " left-[60%] w-[30%] h-[55%] lg:left-[58%] lg:w-[28%] lg:h-[60%] opacity-90 z-20";
          } else if (offset === 2) {
            classes += " left-[75%] w-[22%] h-[45%] opacity-60 z-10";
          } else {
            classes += " opacity-0 pointer-events-none";
          }

          return (
            <article key={arc.id} className={classes} style={style}>
              {offset === 0 && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl" />
                  <div className="relative h-full flex items-end">
                    <div className="p-6 md:p-8 space-y-3 max-w-md">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-skyblue/80">
                        {arc.label}
                      </p>
                      <h3 className="text-lg md:text-2xl font-semibold">
                        {arc.title}
                      </h3>
                      <p className="text-xs md:text-sm text-zinc-200">
                        {arc.description}
                      </p>
                      <Link
                        href={arc.href}
                        className="inline-flex items-center gap-2 rounded-full bg-skyblue text-ink text-xs md:text-sm font-medium px-4 py-2 shadow-lg shadow-skyblue/30 hover:bg-skyblue/90 transition"
                      >
                        Enter Arc
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </article>
          );
        })}

        {/* Nav */}
        <nav className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-4 z-40">
          <button
            onClick={prev}
            className="h-10 w-10 rounded-full border border-white/20 bg-black/50 text-zinc-100 hover:border-skyblue/70 hover:text-skyblue"
          >
            ◀
          </button>
          <button
            onClick={next}
            className="h-10 w-10 rounded-full border border-white/20 bg-black/50 text-zinc-100 hover:border-skyblue/70 hover:text-skyblue"
          >
            ▶
          </button>
        </nav>
      </div>

      {/* Mobile swipe */}
      <div className="md:hidden h-full px-4 py-6 overflow-x-auto flex gap-4 snap-x snap-mandatory">
        {storyArcs.map((arc) => (
          <article
            key={arc.id}
            className="snap-center shrink-0 w-[80%] rounded-2xl bg-cover bg-center relative overflow-hidden"
            style={{ backgroundImage: `url(${arc.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative h-full flex items-end p-4 space-y-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-skyblue/80">
                  {arc.label}
                </p>
                <h3 className="text-sm font-semibold">{arc.title}</h3>
                <p className="text-[11px] text-zinc-200 line-clamp-3">
                  {arc.description}
                </p>
                <Link
                  href={arc.href}
                  className="inline-flex items-center gap-2 rounded-full bg-skyblue text-ink text-[11px] font-medium px-3 py-1.5 mt-1"
                >
                  Enter Arc
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
