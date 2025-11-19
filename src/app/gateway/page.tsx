import GatewayHall from "./GatewayHall";
import { Section } from "@/components/ui/sections/Section";

export default function GatewayPage() {
  return (
    <Section className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-indigo-900 via-slate-950 to-slate-900 flex items-center justify-center">
      <GatewayHall />
    </Section>
  );
}
