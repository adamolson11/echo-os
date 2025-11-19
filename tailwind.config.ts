import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050814",
        ocean: "#071018",
        skyblue: "#4fd1ff",
        neonpink: "#ff6ea8",
        echo: {
          bg: "#080b10",
          surface: "#10141c",
          surfaceSoft: "#181c24",
          accent: "#38bdf8",
          gold: "#ffc478",
          text: "#f1f5fa",
          textMuted: "#b6c2d6",
          border: "#23304a",
        },
      },
      borderRadius: {
        'echo-lg': '1.25rem',
        'echo-pill': '9999px',
      },
      boxShadow: {
        'echo-soft': '0 4px 24px 0 rgba(56,189,248,0.10)',
        'echo-glow': '0 0 30px 0 rgba(56,189,248,0.45)',
      },
    },
  },
  plugins: [],
};

export default config;
