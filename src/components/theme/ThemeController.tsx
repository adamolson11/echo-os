import React, { ReactNode } from "react";
import clsx from "clsx";

export type ThemeMode = "wolves" | "futureFarm" | "psyntuum" | "hudsonBlue";

interface ThemeControllerProps {
  mode: ThemeMode;
  children: ReactNode;
}

const themeClasses: Record<ThemeMode, string> = {
  wolves:
    "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100",
  futureFarm:
    "bg-gradient-to-b from-emerald-950 via-emerald-900 to-amber-950 text-emerald-50",
  psyntuum:
    "bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 text-slate-100",
  hudsonBlue:
    "bg-gradient-to-b from-slate-950 via-slate-900 to-sky-950 text-slate-50",
};

export function ThemeController({ mode, children }: ThemeControllerProps) {
  return (
    <div
      className={clsx(
        "min-h-screen w-full transition-colors duration-500",
        themeClasses[mode]
      )}
    >
      {/* simple grain / overlay hook */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.07] mix-blend-soft-light bg-[radial-gradient(circle_at_top,_#fff_0,_transparent_55%),radial-gradient(circle_at_bottom,_#fff_0,_transparent_60%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default ThemeController;
