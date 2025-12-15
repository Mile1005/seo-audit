"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
type Mode = "light" | "dark";
type ThemeContextValue = {
  mode: Mode;
  setMode: (m: Mode) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved =
      typeof window !== "undefined" ? (localStorage.getItem("theme-mode") as Mode | null) : null;
    const preferredDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextMode: Mode = saved ?? (preferredDark ? "dark" : "light");
    apply(nextMode);
  }, []);

  const apply = (m: Mode) => {
    setModeState(m);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", m === "dark");
    }
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme-mode", m);
    }
  };

  const setMode = (m: Mode) => apply(m);

  return <ThemeContext.Provider value={{ mode, setMode }}>{children}</ThemeContext.Provider>;
}

export function ThemeSwitcher() {
  const { mode, setMode } = useTheme();
  return (
    <button
      type="button"
      aria-label="Toggle color mode"
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
      className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm"
      style={{ minWidth: 44, minHeight: 44 }}
    >
      {mode === "light" ? "Dark" : "Light"}
    </button>
  );
}
