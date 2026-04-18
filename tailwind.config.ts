import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0B0B0F",
          surface: "#131319",
          elevated: "#1A1A22",
          hover: "#22222C",
        },
        border: {
          subtle: "#24242E",
          strong: "#2E2E3A",
        },
        brand: {
          DEFAULT: "#7C5CFF",
          soft: "#9F85FF",
          muted: "#2A2344",
        },
        text: {
          primary: "#F4F4F6",
          secondary: "#A8A8B3",
          muted: "#6B6B78",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0,0,0,0.25)",
        glow: "0 8px 30px -4px rgba(124,92,255,0.35)",
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pop": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.25)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fade-in 0.2s ease-out",
        "scale-in": "scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "pop": "pop 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
