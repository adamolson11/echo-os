import HeroEchoOS from "@/components/hero/HeroEchoOS";
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
    <div className="space-y-12">
      <HeroEchoOS />

      <div className="space-y-8">
        <section className="space-y-4">
          <StoryCarousel variant="teaser" />
        </section>

        <section className="grid gap-4 md:grid-cols-3">
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
        </section>
      </div>
    </div>
  );
}
