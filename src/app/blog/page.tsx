import Link from "next/link";

const posts = [
  {
    slug: "google-it-notes-module-1",
    title: "Google IT Cert – Technical Support Fundamentals (Module 1)",
    date: "2025-11-10",
    tag: "study",
    summary:
      "High-level notes on hardware, OS basics, and how everything plugs together for the Google IT cert.",
  },
  {
    slug: "swing-trading-sanity-check",
    title: "Swing Trading and Sanity",
    date: "2025-11-08",
    tag: "finance",
    summary:
      "Thinking through risk, time horizons, and why I keep coming back to NVDA and SOXL.",
  },
  {
    slug: "building-echo-os-mvp",
    title: "Building Echo OS – MVP Shell",
    date: "2025-11-14",
    tag: "build-log",
    summary:
      "Spinning up the first version of my Narrative OS: Hub, Story shell, and a dark control room layout.",
  },
];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function BlogIndexPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight">Blog // Life &amp; Study</h1>
        <p className="text-sm text-zinc-400 max-w-2xl">
          Notes from the lab: cert study, finance experiments, build logs, and whatever else I&apos;m
          trying to make sense of.
        </p>
      </header>

      <section className="space-y-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <article className="border border-white/10 rounded-2xl bg-black/25 p-4 hover:border-skyblue/60 hover:bg-black/40 transition">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h2 className="text-sm font-semibold">{post.title}</h2>
                <span className="text-[10px] text-zinc-500">{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/15 text-zinc-300">
                  {post.tag}
                </span>
              </div>
              <p className="text-xs text-zinc-400 max-w-2xl">{post.summary}</p>
            </article>
          </Link>
        ))}
      </section>
    </div>
  );
}
