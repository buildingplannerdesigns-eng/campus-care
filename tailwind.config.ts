import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base — light sanctuary (remapped for light theme)
        sanctuary: {
          950: "#e4ede8",
          900: "#dce8e2",
          800: "#cfdcd6",
          700: "#b7c8c0",
        },
        // Page canvas — light teal green (Patrice Washington–style sage)
        sage: {
          DEFAULT: "#e4ede8",
          deep: "#d7e2df",
        },
        // Display type on text-only pages — pale sage green
        moss: {
          DEFAULT: "#5f8a76",
          muted: "#7aa090",
          deep: "#3f5f52",
        },
        // Five Core Elements — pulled from the ACT Healing mark
        water: {
          DEFAULT: "#1F5C73",
          light: "#4A8FA8",
          glow: "#7FC4DE",
        },
        fire: {
          DEFAULT: "#C4471E",
          light: "#E8763F",
          glow: "#FF9D4D",
        },
        earth: {
          DEFAULT: "#5B4230",
          light: "#8A6A4C",
          glow: "#C99A66",
        },
        mineral: {
          DEFAULT: "#2E3548",
          light: "#5B6584",
          glow: "#A8B3D6",
        },
        nature: {
          DEFAULT: "#3D5A3A",
          light: "#6B8F5E",
          glow: "#A3C98A",
        },
        // Signal / accent
        ember: "#E8B04B",
        parchment: "#374151",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        hero: ["var(--font-hero)", "var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        script: ["var(--font-script)", "cursive"],
      },
      backgroundImage: {
        "twilight-gradient":
          "linear-gradient(135deg, #046076 0%, #05879b 100%)",
      },
      borderRadius: {
        sanctuary: "1.75rem",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
      animation: {
        blink: "blink 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
