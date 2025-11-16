"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Hub" },
  { href: "/story", label: "Story" },
  { href: "/blog", label: "Blog" },
  { href: "/lab", label: "Lab" },
  { href: "/archive", label: "Archive" },
  { href: "/about", label: "About" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <Link
      href={href}
      className={`block px-3 py-2 rounded-xl text-sm transition
        ${active ? "bg-skyblue/15 text-skyblue" : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"}`}
    >
      {label}
    </Link>
  );
}

export function ShellLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isFullBleed = pathname === "/" || pathname === "/gateway";

  return (
    <div className="min-h-screen bg-ink text-zinc-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-mono text-skyblue/80">Mr. Skyblue //</span>
            <span className="font-semibold tracking-tight">Echo OS</span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-xs text-zinc-500">
            <span className="uppercase tracking-wide text-[10px] text-zinc-500">Agents</span>
            <span className="px-2 py-1 rounded-full border border-skyblue/40 text-skyblue/90 text-[10px]">
              Orange · Design
            </span>
            <span className="px-2 py-1 rounded-full border border-zinc-500/60 text-zinc-300 text-[10px]">
              Green · Code
            </span>
            <span className="px-2 py-1 rounded-full border border-neonpink/60 text-neonpink text-[10px]">
              Pink · Story
            </span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1">
        {isFullBleed ? (
          <div className="w-full">{/* full-bleed home/gateway view without sidebar */}
            <main className="min-w-0">{children}</main>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
            {/* Sidebar */}
            <aside className="hidden md:flex w-56 flex-col gap-4">
              <nav className="border border-white/10 rounded-2xl bg-black/20 p-3 space-y-1">
                {navItems.map((item) => (
                  <NavLink key={item.href} href={item.href} label={item.label} />
                ))}
              </nav>

              <div className="border border-white/10 rounded-2xl bg-black/30 p-3">
                <h2 className="text-xs font-semibold text-zinc-300 mb-1">Studio Status</h2>
                <p className="text-xs text-zinc-500">
                  Echo OS is in <span className="text-skyblue">MVP shell</span> mode.
                  Stories, notes, and experiments dock here.
                </p>
              </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0">{children}</main>
          </div>
        )}
      </div>
    </div>
  );
}
