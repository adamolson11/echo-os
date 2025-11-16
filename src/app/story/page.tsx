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
