import Link from "next/link";
import { portals } from "@/data/portals";

export default function PortalHubPage() {
  return (
    <main className="min-h-screen bg-black text-slate-100">
      <header className="mx-auto max-w-3xl px-4 py-8 text-center">
        <h1 className="text-2xl font-semibold">Echo OS · Portal Hub</h1>
        <nav className="mt-3">
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-200">
            Back to Home
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-3xl px-4 pb-16">
        <p className="text-center text-sm text-slate-400 mb-6">Choose a book-world to enter.</p>
        <ul className="space-y-3">
          {portals.map((portal) => (
            <li key={portal.slug} className="rounded-md border border-slate-800 bg-slate-900/50 p-4">
              <Link href={`/book/${portal.slug}`} className="block">
                <strong className="text-slate-100">{portal.title}</strong>
                <div className="mt-1 text-sm text-slate-400">{portal.tagline}</div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
