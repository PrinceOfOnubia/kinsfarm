import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        skyGame: "#36aef2",
        deepSky: "#157ad1",
        readableBlue: "#005ecb",
        grass: "#5ed052",
        grassDark: "#26933a",
        dirt: "#8a5c34",
        gold: "#ffc45b",
        orangeCta: "#ff8d32",
        orangeDark: "#b95816",
        ink: "#1d2530",
        night: "#07121a",
        panel: "#10283a",
      },
      boxShadow: {
        pixel: "0 5px 0 #8f4316, 0 12px 24px rgba(6, 14, 20, 0.45)",
        rune: "0 0 0 2px rgba(255,196,91,0.24), 0 0 28px rgba(94,208,82,0.22)",
      },
      fontFamily: {
        fantasy: ["Georgia", "Times New Roman", "serif"],
        pixel: ["var(--font-pixel)", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
