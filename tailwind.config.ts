import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050B18",
        "bg-elevated": "#0A1426",
        surface: "#0D192D",
        border: "#263A56",
        "text-primary": "#F4F7FC",
        "text-secondary": "#AAB8CF",
        "text-muted": "#74849D",
        accent: "#43B9FF",
        "accent-bright": "#83D7FF",
        "brand-teal": "#5EEAD4",
        "brand-cyan": "#67E8F9",
        "brand-violet": "#A78BFA",
        "brand-magenta": "#F472D0",
        "brand-amber": "#FBBF24",
        "brand-emerald": "#34D399",
        success: "#55C99A",
        warning: "#F0BD67",
        danger: "#F17D83",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1440px",
      },
      borderRadius: {
        card: "16px",
        control: "999px",
      },
      boxShadow: {
        glow: "0 0 40px rgba(55, 174, 255, 0.18)",
        "glow-strong": "0 0 70px rgba(55, 174, 255, 0.32)",
        "glow-teal": "0 0 50px -12px rgba(94, 234, 212, 0.5)",
        "glow-violet": "0 0 60px -14px rgba(167, 139, 250, 0.55)",
        "glow-magenta": "0 0 60px -14px rgba(244, 114, 208, 0.45)",
        brand:
          "0 24px 70px -30px rgba(0, 0, 0, 0.9), 0 0 50px -18px rgba(167, 139, 250, 0.5)",
        card: "0 18px 50px -20px rgba(0, 0, 0, 0.9)",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(ellipse at center, rgba(67,185,255,0.14), transparent 65%)",
        brand:
          "linear-gradient(110deg, #5EEAD4 0%, #67E8F9 24%, #A78BFA 56%, #F472D0 82%, #FBBF24 100%)",
        "brand-soft":
          "linear-gradient(135deg, rgba(94,234,212,0.14), rgba(167,139,250,0.16) 48%, rgba(244,114,208,0.14))",
        aurora:
          "conic-gradient(from 180deg at 50% 50%, rgba(94,234,212,0.28), rgba(103,232,249,0.18), rgba(167,139,250,0.3), rgba(244,114,208,0.24), rgba(251,191,36,0.16), rgba(94,234,212,0.28))",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "pulse-ring": {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" },
        },
        drift: {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(0,-14px,0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        aurora: {
          "0%": { transform: "translate3d(-3%, -2%, 0) rotate(-4deg) scale(1.02)" },
          "50%": { transform: "translate3d(2%, 3%, 0) rotate(3deg) scale(1.1)" },
          "100%": { transform: "translate3d(4%, -3%, 0) rotate(-2deg) scale(1.05)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.5s ease both",
        "pulse-ring": "pulse-ring 3.5s ease-in-out infinite",
        drift: "drift 7s ease-in-out infinite alternate",
        shimmer: "shimmer 1.8s infinite",
        aurora: "aurora 26s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
