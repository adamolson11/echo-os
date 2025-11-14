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
      },
    },
  },
  plugins: [],
};

export default config;
