import type { ChapterMeta } from "@/config/story";

interface GraphNotesPanelProps {
  chapter: ChapterMeta;
}

export function GraphNotesPanel({ chapter }: GraphNotesPanelProps) {
  return (
    <aside className="border border-white/10 rounded-2xl bg-black/20 p-3 space-y-2 mt-4">
      <h2 className="text-xs font-semibold text-zinc-300">Echo Notes</h2>
      <p className="text-xs text-zinc-500">
        This card will eventually list related nodes, characters, timeline
        markers, and other echoes in the system.
      </p>

      <div className="grid md:grid-cols-3 gap-3 text-[11px] text-zinc-400">
        <div>
          <h3 className="font-semibold text-zinc-300 text-[11px] mb-1">
            Chapter
          </h3>
          <p>
            {chapter.kind === "prologue" && "Prologue"}
            {chapter.kind === "epilogue" && "Epilogue"}
            {chapter.kind === "chapter" && chapter.number
              ? `Chapter ${chapter.number}`
              : null}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-zinc-300 text-[11px] mb-1">
            Characters (soon)
          </h3>
          <p>Silas, Gould, and others will appear here.</p>
        </div>

        <div>
          <h3 className="font-semibold text-zinc-300 text-[11px] mb-1">
            Timeline (soon)
          </h3>
          <p>Where this scene sits in the larger chronology.</p>
        </div>
      </div>
    </aside>
  );
}
