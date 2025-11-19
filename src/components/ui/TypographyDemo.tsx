"use client";

export default function TypographyDemo() {
  return (
    <div className="bg-echo-bg min-h-screen text-echo-text p-10 space-y-8">
      <div>
        <div className="text-xs md:text-sm uppercase tracking-[0.2em] text-echo-text-muted mb-2">Eyebrow</div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">H1: The night the hurricane found a conscience.</h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-2">H2: Wolves in the Echo House</h2>
        <p className="text-base leading-relaxed text-echo-text-muted mb-2">Body: Echo OS is a living story machine — a hallway of doors into hurricanes, prison yards, future farms, and broken saints.</p>
        <p className="text-xs text-echo-text-muted">Caption: You can still hear the windows scream when the lightning hits just right.</p>
      </div>
    </div>
  );
}
