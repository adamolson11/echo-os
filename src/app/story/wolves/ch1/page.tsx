import React from "react";

export default function Page() {
  return (
    <div className="mt-28 px-4 lg:px-8">
      <div className="mx-auto max-w-3xl text-slate-200">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-2">Wolves in the Echo House</p>
        <h1 className="text-3xl font-semibold mb-4">Chapter 1 — Placeholder</h1>
        <p className="text-slate-400">Story text will dock here later. For now this is a placeholder reading view wired to the Story Hub.</p>
        <p className="mt-6 text-sm text-slate-500">
          <a href="/story" className="underline underline-offset-4">
            ← Back to Story Hub
          </a>
        </p>
      </div>
    </div>
  );
}
