import DoorHallway from "@/components/gateway/DoorHallway";
import GatewayHero from "@/components/gateway/GatewayHero";

export default function GatewayPage() {
  return (
    <main className="relative min-h-screen bg-black text-zinc-50">
      {/* Full-page cinematic background */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src="/images/arcs/motion2Fast_A_hyperrealistic_cinematic_interior_hallway_inside_0_b5b29445-22dd-40bb-9624-ec2b3c03ab8e.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="pointer-events-none absolute inset-0 bg-black/60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />

      <div className="relative z-10">
        {/* Top hero section */}
        <section className="border-b border-zinc-800/80">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
            <GatewayHero />
          </div>
        </section>

        {/* Door hallway */}
        <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14 lg:py-16">
          <DoorHallway />
        </section>
      </div>
    </main>
  );
}
