"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme } from "@/types/theme";
import { getTheme, setTheme as saveTheme, resolveCssVars } from "@/lib/theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<Theme | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme | undefined>(undefined);

  useEffect(() => {
    const savedTheme = getTheme();
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (theme) {
      saveTheme(theme);
      const cssVars = resolveCssVars(theme);
      Object.entries(cssVars).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
      document.documentElement.classList.toggle("dark", theme.mode === "dark");
    }
  }, [theme]);

  if (!theme) {
    return null; // Or a loading spinner
  }

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function ThemeSwitcher() {
    const theme = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const toggleTheme = () => {
        const newTheme = {
            ...theme,
            mode: theme.mode === 'light' ? 'dark' : 'light',
        };
        // In a real app, you'd call a function to update the theme state
        // For now, we'll just log it.
        console.log('Switching to', newTheme.mode, 'mode');
    };

    return (
        <button onClick={toggleTheme} style={{ minWidth: '44px', minHeight: '44px' }}>
            Switch to {theme.mode === 'light' ? 'dark' : 'light'} mode
        </button>
    );
}
