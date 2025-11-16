import Link from "next/link";
import { storyGraph } from "@/data/graph";

export default function MapPage() {
  return (
    <main className="min-h-screen bg-black text-slate-200">
      <div className="mx-auto max-w-3xl p-6">
        <header className="mb-4">
          <h1 className="text-2xl font-semibold tracking-wide">Graph Mode (Stub)</h1>
          <nav className="mt-2">
            <Link href="/hub" className="text-slate-400 hover:text-slate-200">Back to Portal Hub</Link>
          </nav>
        </header>

        <section>
          <p className="text-slate-400 mb-4">This is a placeholder for the interactive brain-map. For now, it lists nodes and their routes.</p>
          <ul className="grid gap-3">
            {storyGraph.nodes.map((node) => (
              <li key={node.id} className="rounded-md border border-slate-800 bg-slate-900/50 p-3">
                <div className="text-sm text-slate-100 font-medium">{node.label}</div>
                <div className="text-xs text-slate-400">[{node.type}] — <Link href={node.route} className="text-sky-300 hover:underline">{node.route}</Link></div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
