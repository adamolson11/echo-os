export default function WolvesReader() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Wolves in the Echo House — Reader</h1>
        <p className="text-white/70">
          This view will eventually load chapter content from Markdown files in
          the <code>/codex/wolves</code> directory and support navigation between
          chapters, symbols, and Codex nodes.
        </p>
      </div>
    </main>
  );
}
