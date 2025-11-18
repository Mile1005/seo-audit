// Lightweight i18n configuration for middleware (no message imports)
// This file is used in middleware to avoid bloating the Edge Function

export const locales = ['en', 'fr', 'it', 'es', 'id', 'de'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
