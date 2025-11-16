export default function StoryRoomFX() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Optional: static grain overlay (safe even if noise.png is missing) */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.06] mix-blend-overlay" />

      {/* Noir shadow sweep across top third */}
      <div
        className="absolute top-0 left-0 w-full h-1/3
                   bg-gradient-to-b from-black/60 to-transparent
                   animate-storyDarkSweep"
      />

      {/* Occasional storm brightness pulse */}
      <div
        className="absolute inset-0 bg-white/5 mix-blend-overlay
                   animate-storyStormPulse"
      />
    </div>
  );
}
