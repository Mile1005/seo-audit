import { colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";

extend([mixPlugin]);

export function getTheme() {
  // For now, we'll just return a default theme.
  // We'll implement localStorage persistence later.
  return {
    mode: "light",
    primary: "#3B82F6",
    accent: "#8B5CF6",
    radius: "md",
  };
}

export function setTheme(theme: any) {
  // For now, we'll just log the theme to the console.
  // We'll implement localStorage persistence later.
  console.log("Setting theme:", theme);
}

export function resolveCssVars(theme: any) {
  const cssVars: { [key: string]: string } = {};
  for (const [key, value] of Object.entries(theme)) {
    cssVars[`--theme-${key}`] = value as string;
  }
  return cssVars;
}

export function prefersDarkMode() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function tint(color: string, amount: number) {
  return colord(color)
    .mix("white", amount)
    .toHex();
}

export function shade(color: string, amount: number) {
  return colord(color)
    .mix("black", amount)
    .toHex();
}
