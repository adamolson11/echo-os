export default function AboutPage() {
  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight">About // Mr. Skyblue</h1>
        <p className="text-sm text-zinc-400 max-w-2xl">
          I&apos;m Adam, sometimes Mr. Skyblue. Echo OS is my front door: a place where real life,
          study, and the Wolves in the Echo House universe overlap.
        </p>
      </header>

      <section className="space-y-3 text-sm text-zinc-300 max-w-2xl">
        <p>
          On the surface, this site is just a simple blog and project log. Underneath, it&apos;s
          scaffolding for a much bigger story: Wolves in the Echo House, Project Halcyon, Future
          Farm, and whatever comes after.
        </p>
        <p className="text-zinc-400">
          I&apos;m using this as a Narrative OS: a way to track my learning, build small tools,
          and slowly publish a universe in public. The agents you see referenced (Orange, Green,
          Pink) are just different ways of thinking, given names.
        </p>
        <p className="text-zinc-500 text-xs">
          If you&apos;re reading this, thanks for stopping by. You&apos;re catching the system in
          an early, messy, but honest phase.
        </p>
      </section>
    </div>
  );
}
