import React, { ReactNode } from "react";
import { Section } from "@/components/ui/sections/Section";
import { SectionAlt } from "@/components/ui/sections/SectionAlt";
import { EchoPanel } from "@/components/ui/EchoPanel";

interface StoryRoomTemplateProps {
  Hero: ReactNode;
  intro?: ReactNode;
  lore?: ReactNode;
  characters?: ReactNode;
  timeline?: ReactNode;
  codexTeaser?: ReactNode;
  footerNav?: ReactNode;
}

export function StoryRoomTemplate({
  Hero,
  intro,
  lore,
  characters,
  timeline,
  codexTeaser,
  footerNav,
}: StoryRoomTemplateProps) {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Hero */}
      <div className="border-b border-white/5">{Hero}</div>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {intro && (
            <Section>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <EchoPanel className="space-y-3">{intro}</EchoPanel>
            </Section>
          )}

          {lore && (
            <Section>
              <h2 className="text-2xl font-bold mb-4">Lore</h2>
              <EchoPanel className="space-y-3">{lore}</EchoPanel>
            </Section>
          )}

          {characters && (
            <Section>
              <h2 className="text-2xl font-bold mb-4">Characters</h2>
              <EchoPanel className="space-y-3">{characters}</EchoPanel>
            </Section>
          )}

          {timeline && (
            <SectionAlt>
              <h2 className="text-2xl font-bold mb-4">Timeline</h2>
              <EchoPanel className="space-y-3">{timeline}</EchoPanel>
            </SectionAlt>
          )}

          {codexTeaser && (
            <SectionAlt>
              <h2 className="text-2xl font-bold mb-4">Codex Teaser</h2>
              <EchoPanel className="space-y-3">{codexTeaser}</EchoPanel>
            </SectionAlt>
          )}
        </div>
      </main>

      {/* Footer nav */}
      {footerNav && (
        <footer className="border-t border-white/10 bg-black/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {footerNav}
          </div>
        </footer>
      )}
    </div>
  );
}

export default StoryRoomTemplate;
