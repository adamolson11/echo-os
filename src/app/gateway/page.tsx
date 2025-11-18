import GatewayHall from "./GatewayHall";

import GatewayHero from "@/components/gateway/GatewayHero";
import DoorHallway from "@/components/gateway/DoorHallway";

export default function GatewayPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <GatewayHero />

        <DoorHallway />
      </div>
    </main>
  );
}
