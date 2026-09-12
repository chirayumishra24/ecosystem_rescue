import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        explorers: {
          light: "#60a5fa",
          DEFAULT: "#2563eb",
          dark: "#1e40af",
          accent: "#38bdf8",
        },
        guardians: {
          light: "#fb923c",
          DEFAULT: "#ea580c",
          dark: "#9a3412",
          accent: "#f59e0b",
        },
        eco: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)" },
          "50%": { boxShadow: "0 0 30px rgba(16, 185, 129, 0.9)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        flowLine: {
          "0%": { strokeDashoffset: "24" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "flow-line": "flowLine 1.5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
