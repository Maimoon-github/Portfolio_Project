import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        surface: "var(--surface)",
        surface_container_low: "var(--surface_container_low)",
        surface_container: "var(--surface_container)",
        surface_container_high: "var(--surface_container_high)",
        surface_container_highest: "var(--surface_container_highest)",
        surface_variant: "var(--surface_variant)",
        on_surface: "var(--on_surface)",
        outline: "var(--outline)",
        outline_variant: "var(--outline_variant)",
        primary: {
          DEFAULT: "var(--primary)",
          container: "var(--primary_container)",
          foreground: "var(--on_primary_fixed)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
        },
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
};

export default config;