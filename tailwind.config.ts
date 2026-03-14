import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        brand: ["var(--font-brand)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        bg: {
          1: "var(--bg-1)",
          2: "var(--bg-2)",
          3: "var(--bg-3)",
          4: "var(--bg-4)",
          5: "var(--bg-5)",
        },
        border: {
          1: "var(--border-1)",
          2: "var(--border-2)",
        },
        fg: {
          1: "var(--fg-1)",
          2: "var(--fg-2)",
          3: "var(--fg-3)",
          4: "var(--fg-4)",
        },
        purple: {
          1: "var(--purple-1)",
          2: "var(--purple-2)",
          3: "var(--purple-3)",
          4: "var(--purple-4)",
        },
        blue: {
          1: "var(--blue-1)",
          2: "var(--blue-2)",
          3: "var(--blue-3)",
          4: "var(--blue-4)",
        },
        gho: {
          1: "var(--gho-1)",
        },
        accent: {
          red: "var(--red)",
          blue: "var(--blue)",
          purple: "var(--purple)",
          green: "var(--green)",
          yellow: "var(--yellow)",
        },
        focus: "var(--focus)",
      },
      letterSpacing: {
        tighter: "-0.075rem",
        tight: "-0.48px",
        snug: "-0.33px",
        normal: "-0.18px",
        caption: "-0.00563rem",
        body: "-0.09px",
      },
      lineHeight: {
        prose: "150%",
        heading: "135%",
        tight: "125%",
        display: "105%",
      },
      borderRadius: {
        pill: "6.1875rem",
        card: "1rem",
      },
      boxShadow: {
        card: "0 0 0 1px var(--shadow-stroke-2), 0 8px 40px var(--shadow-high)",
        overlay: "0 0 0 1px var(--shadow-stroke-2), 0 6px 32px var(--shadow-high)",
        btn: "0 0 0 1.5px var(--shadow-stroke-1)",
        "btn-hover": "0 0 0 1.5px var(--shadow-stroke-2)",
      },
      keyframes: {
        pulse: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "35%": { opacity: "0.7" },
          "70%": { transform: "scale(2.5)", opacity: "0" },
          "100%": { transform: "scale(0)", opacity: "0" },
        },
        pulseDot: {
          "0%": { transform: "scale(1)" },
          "35%": { transform: "scale(1.2)" },
          "70%": { transform: "scale(1)" },
          "100%": { transform: "scale(1)" },
        },
        slide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        slideFooterLine: {
          "0%": { backgroundPosition: "0 0" },
          "70%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "100% 0" },
        },
      },
      animation: {
        pulse: "pulse 2s ease-out infinite both",
        pulseDot: "pulseDot 2s ease-out infinite both",
        slide: "slide 20s linear infinite both",
        slideFooterLine: "slideFooterLine 6s ease-in-out infinite",
      },
      screens: {
        xs: "520px",
      },
    },
  },
  plugins: [],
} satisfies Config;
