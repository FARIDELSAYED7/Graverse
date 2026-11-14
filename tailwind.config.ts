import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      // The `/NN` opacity modifier resolves against this scale. Tailwind's
      // default scale stops at 5-step increments, so utilities like
      // `bg-[#07111f]/98` or `border-white/12` silently generate no CSS at
      // all (the element ends up with no background/border). These are the
      // extra steps the codebase actually authors.
      opacity: {
        2: "0.02",
        3: "0.03",
        4: "0.04",
        6: "0.06",
        8: "0.08",
        9: "0.09",
        11: "0.11",
        12: "0.12",
        13: "0.13",
        92: "0.92",
        94: "0.94",
        96: "0.96",
        98: "0.98",
      },
      colors: {
        // Token colours are driven by CSS variables so the Academy can switch
        // to a light surface without overriding every utility class. The RGB
        // triplets let Tailwind keep opacity modifiers such as `bg-accent/10`.
        bg: "rgb(var(--bg-rgb) / <alpha-value>)",
        "bg-elevated": "rgb(var(--bg-elevated-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        border: "rgb(var(--border-rgb) / <alpha-value>)",
        "text-primary": "rgb(var(--text-primary-rgb) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary-rgb) / <alpha-value>)",
        "text-muted": "rgb(var(--text-muted-rgb) / <alpha-value>)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        "accent-bright": "rgb(var(--accent-bright-rgb) / <alpha-value>)",
        // GRAVERSE identity: warm archive, not a rainbow. Teal and sky are the
        // cool accents; gold and coral are the warm ones. The legacy token
        // names are kept so existing semantic classes keep working.
        "brand-ink": "#14213B",
        "brand-cream": "#FFF8EC",
        "brand-orange": "#9C4321",
        "brand-teal": "#5EEAD4",
        "brand-cyan": "#7DD3FC",
        "brand-violet": "#F2B33D",
        "brand-magenta": "#F08A6A",
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
        glow: "0 0 40px rgba(94, 234, 212, 0.16)",
        "glow-strong": "0 0 70px rgba(94, 234, 212, 0.26)",
        "glow-teal": "0 0 50px -12px rgba(94, 234, 212, 0.5)",
        "glow-violet": "0 0 60px -14px rgba(242, 179, 61, 0.45)",
        "glow-magenta": "0 0 60px -14px rgba(240, 138, 106, 0.4)",
        brand:
          "0 24px 70px -30px rgba(0, 0, 0, 0.9), 0 0 50px -18px rgba(94, 234, 212, 0.38)",
        card: "0 18px 50px -20px rgba(0, 0, 0, 0.9)",
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
        "spin-reverse": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.5s ease both",
        "pulse-ring": "pulse-ring 3.5s ease-in-out infinite",
        drift: "drift 7s ease-in-out infinite alternate",
        shimmer: "shimmer 1.8s infinite",
        "spin-reverse": "spin-reverse 120s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
