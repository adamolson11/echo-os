"use client";
import { ReactNode } from "react";

export function EchoFrame({
  hero,
  children,
  bottomNav,
  vignette = false,
  theme = "default",
}: {
  hero?: ReactNode;
  children: ReactNode;
  bottomNav?: ReactNode;
  vignette?: boolean;
  theme?: "default" | "wolves" | "futureFarm" | "psyntuum" | "hudsonBlue";
}) {
  return (
    <div className={`relative min-h-screen bg-echo-bg` + (theme !== "default" ? ` theme-${theme}` : "") }>
      {/* Optional vignette overlay */}
      {vignette && (
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.18)_0%,_transparent_80%)]" />
      )}
      <div className="max-w-7xl mx-auto px-6">
        {hero && <div className="pt-8 pb-4">{hero}</div>}
        <div>{children}</div>
        {bottomNav && <div className="pt-8">{bottomNav}</div>}
      </div>
    </div>
  );
}
