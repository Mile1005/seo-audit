import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Supported locales for AI SEO Turbo
export const locales = ["en", "fr", "it", "es", "id", "de"] as const;
export const defaultLocale = "en" as const;

// TypeScript type for locale
export type Locale = (typeof locales)[number];

// Locale names for display in language switcher
export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  it: "Italiano",
  es: "Español",
  id: "Bahasa Indonesia",
  de: "Deutsch",
};

// Locale flags for visual representation
export const localeFlags: Record<Locale, string> = {
  en: "��",
  fr: "🇫🇷",
  it: "🇮🇹",
  es: "🇪🇸",
  id: "🇮🇩",
  de: "🇩🇪",
};

// RTL support (none of our current locales use RTL, but ready for future expansion)
export const rtlLocales: Locale[] = [];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// next-intl configuration
export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !isValidLocale(locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: "UTC",
    now: new Date(),
  };
});
