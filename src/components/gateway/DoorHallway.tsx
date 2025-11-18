import DoorCard from "./DoorCard";

export default function DoorHallway() {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Choose a door</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
          <DoorCard label="Story Room" eyebrow="Narrative" href="/story" image="/images/portal-doors.jpg" />
          <DoorCard label="Living Codex" eyebrow="Graph" href="/codex" image="/images/portal-doors.jpg" />
          <DoorCard label="Lab" eyebrow="Experiments" href="/lab" image="/images/portal-doors.jpg" />
          <DoorCard label="Archive" eyebrow="Records" href="/archive" image="/images/portal-doors.jpg" />
      </div>
    </section>
  );
}
