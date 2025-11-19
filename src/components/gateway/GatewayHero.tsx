// src/components/gateway/GatewayHero.tsx

export default function GatewayHero() {
  return (
    <section className="relative min-h-[60vh] w-full border-b border-white/5 overflow-hidden">
      {/* Background base */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-black to-slate-950" />

      {/* Cyan storm band at the top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_70%)]" />

      {/* Subtle vertical pillars to imply hallway depth */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-6 opacity-[0.08]">
        <div className="bg-white/10" />
        <div />
        <div className="bg-white/10" />
        <div />
        <div className="bg-white/10" />
        <div />
      </div>

      {/* Soft fog layer */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

      {/* Floor vignette */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[60vh] max-w-6xl items-center px-4 py-20">
        <div className="max-w-xl space-y-4">
          <p className="text-xs font-medium tracking-[0.2em] text-cyan-300/70">
            THE HOUSE OF ECHO
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold">
            Choose Your Door.
          </h1>
          <p className="text-base sm:text-lg text-slate-200/80 leading-relaxed">
            A storm-battered coastal house. Every room remembers you differently.
            The doors below lead to story, codex, lab, and archive.
          </p>
        </div>
      </div>
    </section>
  );
}
