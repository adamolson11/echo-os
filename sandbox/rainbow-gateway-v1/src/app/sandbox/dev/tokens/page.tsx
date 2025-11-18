import React from 'react'

export const metadata = { title: 'Sandbox — Tokens' }

const colors = [
  ['echo-bg', '#0f1724'],
  ['echo-surface', '#0b1220'],
  ['echo-accent', '#f59e0b'],
  ['wolves-accent', '#ef4444']
]

export default function Page() {
  return (
    <div className="min-h-screen p-8 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Token Preview — Sandbox</h1>

        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {colors.map(([name, hex]) => (
            <div key={name} className="p-4 rounded" style={{ background: hex }}>
              <div className="text-xs font-mono">{name}</div>
              <div className="text-sm">{hex}</div>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Radii</h2>
          <div className="flex gap-4">
            <div className="p-4 bg-slate-800 rounded-sm">radius-sm</div>
            <div className="p-4 bg-slate-800 rounded">radius-md</div>
            <div className="p-4 bg-slate-800 rounded-lg">radius-lg</div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Typography</h2>
          <div className="space-y-2">
            <div className="text-3xl font-bold">H1 — Heading</div>
            <div className="text-2xl font-semibold">H2 — Heading</div>
            <div className="text-base">Body — Lorem ipsum dolor sit amet.</div>
          </div>
        </section>

      </div>
    </div>
  )
}
