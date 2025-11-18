'use client'

import React from 'react'
import EchoPanel from '../ui/EchoPanel'
import { Section } from '../ui/Section'

export default function CodexHUD() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded bg-slate-700 text-sm">CodexHUD (Sandbox)</div>
            <div className="text-sm text-slate-400">Preview shell only — no live data</div>
          </div>
          <div className="flex gap-3">
            <button className="px-3 py-2 bg-slate-700 rounded hover:bg-slate-600">Sync</button>
            <button className="px-3 py-2 bg-slate-700 rounded hover:bg-slate-600">Settings</button>
            <button className="px-3 py-2 bg-amber-400 text-slate-900 rounded">Open Codex</button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-2">
            <EchoPanel>
              <Section title="Filters">
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2"><input type="checkbox" /> Universe A</label>
                  <label className="flex items-center gap-2"><input type="checkbox" /> Universe B</label>
                  <label className="flex items-center gap-2"><input type="checkbox" /> Scenes</label>
                </div>
              </Section>

              <SectionWithDividerPlaceholder />
            </EchoPanel>
          </div>

          <div className="col-span-7">
            <EchoPanel className="h-[460px] flex items-center justify-center">
              <div className="text-slate-400">Graph will render here.</div>
            </EchoPanel>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <EchoPanel className="p-3">Mini stat 1</EchoPanel>
              <EchoPanel className="p-3">Mini stat 2</EchoPanel>
              <EchoPanel className="p-3">Mini stat 3</EchoPanel>
            </div>
          </div>

          <div className="col-span-3">
            <EchoPanel>
              <h4 className="font-medium">Selected Node</h4>
              <div className="mt-3">
                <div className="text-sm text-slate-400">Title</div>
                <div className="font-semibold">Mock Node Name</div>
                <div className="mt-2 text-sm text-slate-300">Tags: world, character</div>
                <div className="mt-4 text-xs text-slate-400">Mock summary and metadata appear here.</div>
              </div>
            </EchoPanel>

            <div className="mt-4">
              <EchoPanel>
                <div className="text-sm text-slate-400">Actions</div>
                <div className="mt-2 flex flex-col gap-2">
                  <button className="py-2 px-3 bg-slate-700 rounded">Inspect</button>
                  <button className="py-2 px-3 bg-slate-700 rounded">Open Story</button>
                </div>
              </EchoPanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionWithDividerPlaceholder() {
  return (
    <div className="mt-6 text-sm text-slate-500">Placeholder: more filters or UI kit pieces</div>
  )
}
