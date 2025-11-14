import Link from "next/link";

const chapters = [
  { slug: "prologue", label: "Prologue" },
  // later: generate programmatically for 1–44
  // { slug: "chapter-1", label: "Chapter 1" },
  // ...
  { slug: "epilogue", label: "Epilogue" },
];

export default function StoryPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight">
          Wolves in the Echo House
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl">
          This is the linear reading order for the novel. Right now its a
          simple list of chapters. Later, it becomes a web of echoes and alternate
          paths.
        </p>
      </header>

      <section className="border border-white/10 rounded-2xl bg-black/20 p-4">
        <h2 className="text-xs font-semibold text-zinc-300 mb-2">
          Reading Order
        </h2>
        <ul className="space-y-1 text-sm">
          {chapters.map((ch) => (
            <li key={ch.slug}>
              <Link
                href={`/story/chapters/${ch.slug}`}
                className="text-skyblue hover:underline"
              >
                {ch.label}
              </Link>
            </li>
          ))}
          <li className="mt-2 text-xs text-zinc-500">
            Chapters 144 will appear here as placeholders once we wire them.
          </li>
        </ul>
      </section>
    </div>
  );
}
