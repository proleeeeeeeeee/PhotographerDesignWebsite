import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // A near-black cinematic palette with a warm-cool tension.
        ink: {
          DEFAULT: "#0a0a0b",
          50: "#f6f6f7",
          900: "#141416",
          950: "#0a0a0b",
        },
        bone: "#ece7df", // warm off-white for text
        ash: "#8a8780", // muted captions
        ember: "#c8a06a", // restrained gold accent
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      letterSpacing: {
        widest: "0.35em",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "grain-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "30%": { transform: "translate(3%, -15%)" },
          "50%": { transform: "translate(-7%, 5%)" },
          "70%": { transform: "translate(5%, 12%)" },
          "90%": { transform: "translate(-3%, 8%)" },
        },
        "ken-burns": {
          from: { transform: "scale(1.04)" },
          to: { transform: "scale(1.14)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(1.5rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "grain-shift": "grain-shift 0.6s steps(2) infinite",
        "ken-burns": "ken-burns 16s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
