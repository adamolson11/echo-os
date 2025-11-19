import GatewayHero from "@/components/gateway/GatewayHero";
import DoorHallway from "@/components/gateway/DoorHallway";

export default function GatewayPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-50">
      {/* Top hero section */}
      <section className="border-b border-zinc-800/80 bg-gradient-to-b from-zinc-950 via-zinc-950/90 to-black">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
          <GatewayHero />
        </div>
      </section>

      {/* Door hallway */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14 lg:py-16">
        <DoorHallway />
      </section>
    </main>
  );
}
