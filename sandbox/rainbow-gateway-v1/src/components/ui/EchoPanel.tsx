'use client'
import React from 'react'

export default function EchoPanel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-slate-800 rounded-lg p-4 shadow-lg ${className}`}>
      {children}
    </div>
  )
}
