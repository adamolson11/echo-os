'use client'
import React from 'react'

export function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="my-6">
      {title && <h2 className="text-xl font-semibold mb-3">{title}</h2>}
      <div>{children}</div>
    </section>
  )
}

export function SectionWithDivider({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="py-6 border-t border-slate-700">
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      <div>{children}</div>
    </div>
  )
}
