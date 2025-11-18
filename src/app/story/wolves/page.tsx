import StoryBookshelf from "@/components/StoryBookshelf";
import StoryRoomFX from "@/components/StoryRoomFX";

export default function StoryRoom() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background video */}
      <video
        src="/images/storyroom.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px]" />

      {/* Ambient FX (grain, subtle storm pulse, etc.) */}
      <StoryRoomFX />

      {/* Bookshelf UI */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl p-10">
        <StoryBookshelf />
      </div>
    </div>
  );
}
export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">Wolves in the Echo House</h1>
        <p className="text-white/70">
          Story reader coming soon. This page will host the chapter reading
          experience powered by Markdown Codex files.
        </p>
      </div>
    </main>
  );
}
