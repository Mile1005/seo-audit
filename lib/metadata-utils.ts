import { locales, defaultLocale } from '../i18n';

export function generateAlternates(pathname: string) {
  const baseUrl = 'https://www.aiseoturbo.com';
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;

  const languages: Record<string, string> = {};

  for (const locale of locales) {
    if (locale === defaultLocale) {
      languages[locale] = `${baseUrl}${cleanPath}`;
    } else {
      languages[locale] = `${baseUrl}/${locale}${cleanPath}`;
    }
  }

  languages['x-default'] = `${baseUrl}${cleanPath}`;

  return { languages };
}

export function getCanonicalUrl(pathname: string, locale: string): string {
  const baseUrl = 'https://www.aiseoturbo.com';
  const cleanPath = pathname.replace(new RegExp(`^/${locale}`), '') || '/';

  if (locale === defaultLocale) {
    return `${baseUrl}${cleanPath}`;
  }

  return `${baseUrl}/${locale}${cleanPath}`;
}