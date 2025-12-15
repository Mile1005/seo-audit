/**
 * Design tokens for the glassmorphic SEO Audit Dashboard.
 *
 * These tokens are the single source of truth for color, typography, spacing,
 * and glass effects used throughout the redesign.
 */

export const colors = {
  // Base Neutrals (Glassmorphic Dark Theme)
  background: {
    primary: "#0A0E1A",
    secondary: "#111827",
    elevated: "#1F2937",
    glass: "rgba(255, 255, 255, 0.05)",
  },

  // Text Hierarchy
  text: {
    primary: "#F9FAFB",
    secondary: "#D1D5DB",
    tertiary: "#9CA3AF",
    disabled: "#6B7280",
  },

  // Accent Colors (Minimal Use)
  accent: {
    primary: "#3B82F6",
    secondary: "#8B5CF6",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
  },

  // Status Colors (Subtle, not bright)
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

  // Glass Morphism Effects
  glass: {
    light: "rgba(255, 255, 255, 0.05)",
    medium: "rgba(255, 255, 255, 0.08)",
    heavy: "rgba(255, 255, 255, 0.12)",
  },

  // Borders
  border: {
    subtle: "rgba(255, 255, 255, 0.08)",
    medium: "rgba(255, 255, 255, 0.12)",
    strong: "rgba(255, 255, 255, 0.2)",
  },
} as const;

/** Typography scale + families used across the redesigned dashboard. */
export const typography = {
  fontFamily: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },

  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

/** Glassmorphism presets that can be mirrored in Tailwind utilities. */
export const glassmorphism = {
  card: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(16px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
  },

  cardHover: {
    background: "rgba(255, 255, 255, 0.08)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxShadow: "0 12px 40px 0 rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)",
  },

  navigation: {
    background: "rgba(17, 24, 39, 0.8)",
    backdropFilter: "blur(24px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
} as const;

/** Spacing scale for consistent paddings/margins. */
export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
} as const;

/** Border radius presets aligned with the design system. */
export const borderRadius = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
} as const;
