import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        /**
         * Glassmorphism redesign palette (Phase 1).
         * Prefer these tokens for the redesigned audit dashboard surfaces.
         */
        seo: {
          background: {
            primary: "#0A0E1A",
            secondary: "#111827",
            elevated: "#1F2937",
            glass: "rgba(255, 255, 255, 0.05)",
          },
          text: {
            primary: "#F9FAFB",
            secondary: "#D1D5DB",
            tertiary: "#9CA3AF",
            disabled: "#6B7280",
          },
          accent: {
            primary: "#3B82F6",
            secondary: "#8B5CF6",
            success: "#10B981",
            warning: "#F59E0B",
            error: "#EF4444",
          },
          status: {
            excellent: {
              bg: "rgba(16, 185, 129, 0.1)",
              border: "rgba(16, 185, 129, 0.3)",
              text: "#10B981",
            },
            good: {
              bg: "rgba(59, 130, 246, 0.1)",
              border: "rgba(59, 130, 246, 0.3)",
              text: "#3B82F6",
            },
            warning: {
              bg: "rgba(245, 158, 11, 0.1)",
              border: "rgba(245, 158, 11, 0.3)",
              text: "#F59E0B",
            },
            error: {
              bg: "rgba(239, 68, 68, 0.1)",
              border: "rgba(239, 68, 68, 0.3)",
              text: "#EF4444",
            },
          },
          glass: {
            light: "rgba(255, 255, 255, 0.05)",
            medium: "rgba(255, 255, 255, 0.08)",
            heavy: "rgba(255, 255, 255, 0.12)",
          },
          border: {
            subtle: "rgba(255, 255, 255, 0.08)",
            medium: "rgba(255, 255, 255, 0.12)",
            strong: "rgba(255, 255, 255, 0.2)",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        gradient: "gradientShift 15s ease infinite",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },

      // Tailwind includes `backdrop-saturate-*`; this adds the 180% preset
      // used by the redesign plan (saturate(180%)).
      backdropSaturate: {
        180: "180%",
      },
    },
  },
  plugins: [],
} satisfies Config;
