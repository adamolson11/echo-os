import Image from "next/image";
import StoryCarousel from "@/components/story/StoryCarousel";
import Link from "next/link";

const hubCards = [
  {
    href: "/story",
    title: "Story Mode",
    subtitle: "Wolves in the Echo House",
    body: "Enter the core detective myth and read the book in linear order, from Prologue to Epilogue.",
  },
  {
    href: "/blog",
    title: "Log / Blog",
    subtitle: "Life, study, money, builds",
    body: "Notes from the lab: Google IT cert, markets, Echo OS dev logs, and the quieter timelines.",
  },
  {
    href: "/lab",
    title: "Lab",
    subtitle: "Experiments & Agents",
    body: "Echo OS experiments, Unity prototypes, agents (Orange, Green, Pink, Purple), and tools in progress.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Cinematic hero */}
      <section className="relative flex min-h-screen flex-col md:flex-row">
        {/* LEFT: MAIN CINEMATIC VIDEO */}
        <div className="relative flex-1 overflow-hidden">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            src="/motion2Fast_A_lone_detective_stands_on_a_ruined_Florida_coastl_0.mp4"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* LOGO / TITLE / CTA */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14">
            <div className="max-w-xl space-y-4 md:space-y-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-slate-300">
                A NARRATIVE OPERATING SYSTEM
              </p>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
                Wolves in the <span className="font-light">Echo House</span>
              </h1>
              <p className="max-w-md text-sm text-slate-200 md:text-base lg:text-lg">
                A hurricane, a prison yard, and two men who can&apos;t escape each
                other. Enter the Codex that&apos;s writing you back.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/story/chapters/prologue"
                  className="rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-[0.18em] backdrop-blur-sm hover:bg-white hover:text-black transition"
                >
                  Enter Echo OS
                </Link>
                <Link
                  href="/story"
                  className="rounded-full border border-white/10 px-6 py-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-200 hover:bg-white/5 transition"
                >
                  Open Story Mode
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: STACKED MEDIA COLUMN */}
        <aside className="flex-1 bg-gradient-to-b from-black via-slate-950 to-black p-4 md:p-6 lg:p-8">
          <div className="mx-auto flex h-full max-w-md flex-col gap-4 md:gap-6">
            {/* Top tile: secondary video */}
            <figure className="relative flex-1 overflow-hidden rounded-3xl border border-white/10">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                src="/motion2Fast_LEONARDO_VIDEO_PROMPT__Silas_at_the_Edge_of_the_Ec_0.mp4"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-xs tracking-wide text-slate-200">
                Psyntuum Logs · Prison Yard Feed
              </figcaption>
            </figure>

            {/* Bottom tile: sharp still image */}
            <figure className="relative flex-1 overflow-hidden rounded-3xl border border-white/10">
              <Image
                src="/images/echo-hero.jpg"
                alt="Silas and Davinci facing off in the hurricane-lit yard"
                fill
                className="object-cover"
                priority
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-xs tracking-wide text-slate-200">
                Chapter One · The Hurricane Yard
              </figcaption>
            </figure>
          </div>
        </aside>
      </section>

      {/* Story arcs carousel + hub cards below hero */}
      <section className="space-y-8 px-4 py-10 md:px-8 lg:px-12">
        <StoryCarousel variant="full" />

        <div className="grid gap-4 md:grid-cols-3">
          {hubCards.map((card) => (
            <Link key={card.href} href={card.href}>
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-black/40 p-4 transition hover:border-skyblue/60 hover:bg-black/70">
                <div className="space-y-1">
                  <h2 className="text-sm font-semibold text-zinc-50">
                    {card.title}
                  </h2>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    {card.subtitle}
                  </p>
                </div>
                <p className="mt-3 text-xs text-zinc-300 group-hover:text-zinc-100">
                  {card.body}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
