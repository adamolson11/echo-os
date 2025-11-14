import Link from "next/link";

const hubCards = [
  {
    href: "/story",
    title: "Story // Wolves in the Echo House",
    subtitle: "Enter the fiction universe",
    body: "Prologue, 44 chapters, and the echoes around them. Start with the linear book now; wander the graph later.",
    accent: "skyblue",
  },
  {
    href: "/blog",
    title: "Blog // Life & Study",
    subtitle: "Notes from the lab",
    body: "Google IT cert notes, finance experiments, build logs, reflections. A simple, honest feed.",
    accent: "zinc",
  },
  {
    href: "/lab",
    title: "Lab // Agents & Experiments",
    subtitle: "Projects in motion",
    body: "Echo OS experiments, Unity attempts, AI agents (Orange, Green, Pink), and the tools behind the stories.",
    accent: "neonpink",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
          Welcome to Echo OS
        </h1>
        <p className="text-sm text-zinc-400 max-w-xl">
          Im Adam, sometimes Mr. Skyblue. This is my quiet control room:
          part blog, part story archive, part lab for strange experiments.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {hubCards.map((card) => (
          <Link key={card.href} href={card.href}>
            <div className="group border border-white/10 rounded-2xl bg-black/30 p-4 h-full flex flex-col justify-between hover:border-skyblue/50 hover:bg-black/50 transition">
              <div className="space-y-1">
                <h2 className="text-sm font-semibold">{card.title}</h2>
                <p className="text-xs text-zinc-400">{card.subtitle}</p>
              </div>
              <p className="mt-3 text-xs text-zinc-400 group-hover:text-zinc-200">
                {card.body}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
