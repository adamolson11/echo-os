import Link from "next/link";
import { chaptersInOrder } from "@/config/story";

export default function StoryPage() {
  const numbered = chaptersInOrder.filter((ch) => ch.kind === "chapter");
  const prologue = chaptersInOrder.find((ch) => ch.kind === "prologue");
  const epilogue = chaptersInOrder.find((ch) => ch.kind === "epilogue");

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight">
          Wolves in the Echo House
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl">
          This is the linear reading order for the novel. For now, it&apos;s
          a simple list. Later, it becomes a web of echoes and alternate paths.
        </p>
      </header>

      <section className="border border-white/10 rounded-2xl bg-black/20 p-4 space-y-3">
        <h2 className="text-xs font-semibold text-zinc-300 mb-1">
          Reading Order
        </h2>
        <ul className="space-y-1 text-sm">
          {prologue && (
            <li>
              <Link
                href={`/story/chapters/${prologue.slug}`}
                className="text-skyblue hover:underline"
              >
                {prologue.title}
              </Link>
            </li>
          )}

          {numbered.map((ch) => (
            <li key={ch.slug}>
              <Link
                href={`/story/chapters/${ch.slug}`}
                className="text-skyblue hover:underline"
              >
                {ch.title}
              </Link>
            </li>
          ))}

          {epilogue && (
            <li>
              <Link
                href={`/story/chapters/${epilogue.slug}`}
                className="text-skyblue hover:underline"
              >
                {epilogue.title}
              </Link>
            </li>
          )}
        </ul>

        <p className="mt-2 text-xs text-zinc-500">
          As Echo OS evolves, each chapter will gain links to characters,
          artifacts, and alternate paths.
        </p>
      </section>
    </div>
  );
}
