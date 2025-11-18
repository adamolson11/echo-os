import React from 'react'
import EchoPanel from '../../../../components/ui/EchoPanel'
import { Section } from '../../../../components/ui/Section'

export const metadata = { title: 'Sandbox — Wolves' }

export default function Page() {
  return (
    <div className="min-h-screen p-8 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Wolves — Sandbox Story Room</h1>

        <Section title="About this story">
          <EchoPanel>
            <p className="text-slate-300">A Floridian Gothic story — prologue and tone-setting content here.</p>
          </EchoPanel>
        </Section>

        <Section title="Chapters">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1,2,3,4].map(i => (
              <EchoPanel key={i} className="p-4">
                <div className="font-semibold">Chapter {i}</div>
                <div className="text-sm text-slate-400 mt-2">Short blurb describing chapter {i}.</div>
              </EchoPanel>
            ))}
          </div>
        </Section>

        <Section title="Codex Teaser">
          <EchoPanel>
            <div className="text-slate-300">Teaser strip: small node list / excerpt</div>
          </EchoPanel>
        </Section>
      </div>
    </div>
  )
}
