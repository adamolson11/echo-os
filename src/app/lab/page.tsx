export default function LabRoomPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
      <div className="max-w-3xl space-y-4 text-center px-6 py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Room: Lab</p>
        <h1 className="text-4xl font-semibold">Lab Room</h1>
        <p className="text-sm text-slate-400">Placeholder room. This will later host experimentation tools and utilities.</p>
      </div>
    </main>
  );
}
const experiments = [
  {
    name: "Echo OS MVP",
    status: "In progress",
    summary:
      "Building the core shell: Hub, Story, Blog, Lab, Archive, and a calm control-room layout.",
  },
  {
    name: "Potential Potato",
    status: "Active",
    summary:
      "A playground app for notes, content experiments, and a Studio Chat room for my agents.",
  },
  {
    name: "Unity / Future Farm",
    status: "On deck",
    summary:
      "Early experiments in turning Future Farm and Echo House concepts into interactive experiences.",
  },
];

export default function LabPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight">
          Lab // Agents &amp; Experiments
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl">
          This is where I keep track of what I&apos;m building, breaking, and learning. Some projects ship,
          some just echo forward into the fiction.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-4">
        {experiments.map((exp) => (
          <div
            key={exp.name}
            className="border border-white/10 rounded-2xl bg-black/25 p-4 flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h2 className="text-sm font-semibold">{exp.name}</h2>
              <p className="text-[11px] text-zinc-500">
                Status:{" "}
                <span className="text-skyblue">{exp.status}</span>
              </p>
            </div>
            <p className="mt-2 text-xs text-zinc-400">{exp.summary}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
