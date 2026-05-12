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
        // CSS Variables for easy theming
        surface: {
          DEFAULT: "var(--surface)",
          dim: "var(--surface-dim)",
          bright: "var(--surface-bright)",
          container: {
            lowest: "var(--surface-container-lowest)",
            low: "var(--surface-container-low)",
            DEFAULT: "var(--surface-container)",
            high: "var(--surface-container-high)",
            highest: "var(--surface-container-highest)",
          },
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--on-primary)",
          container: "var(--primary-container)",
          "container-foreground": "var(--on-primary-container)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--on-secondary)",
        },
        accent: {
          DEFAULT: "#22f0ff", // Cyberpunk Cyan
          foreground: "#0a0f1c",
        },
        purple: {
          DEFAULT: "var(--primary)",
          light: "#d6baff",
          dark: "#5f2da6",
        },
        moss: "#4ade80", // Deep Moss accent
      },

      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
      },

      borderRadius: {
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
      },

      boxShadow: {
        glow: "0 10px 40px -10px rgba(95, 45, 166, 0.35)",
        "glow-cyan": "0 10px 40px -10px rgba(34, 240, 255, 0.3)",
      },
    },
  },

  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        ".glass": {
          background: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(40px)",
          border: "1px solid rgba(139, 101, 191, 0.25)",
          boxShadow: "0 8px 32px -12px rgba(95, 45, 166, 0.3)",
        },
        ".glass-cyan": {
          background: "rgba(34, 240, 255, 0.06)",
          backdropFilter: "blur(40px)",
          border: "1px solid rgba(34, 240, 255, 0.25)",
        },
      });
    },
  ],
};

export default config;