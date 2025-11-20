import { locales, defaultLocale } from '../i18n';

export function generateAlternates(pathname: string) {
  const baseUrl = 'https://www.aiseoturbo.com';

  // Remove trailing slash AND ensure leading slash
  let cleanPath = pathname.replace(/\/+$/, ''); // Remove trailing slashes
  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`;
  }
  if (cleanPath === '/') {
    cleanPath = ''; // Root path should be empty string for URL construction
  }

  const languages: Record<string, string> = {};

  for (const locale of locales) {
    if (locale === defaultLocale) {
      // English at root: https://www.aiseoturbo.com (no trailing slash)
      languages[locale] = `${baseUrl}${cleanPath || ''}`;
    } else {
      // Other locales: https://www.aiseoturbo.com/fr (no trailing slash)
      languages[locale] = `${baseUrl}/${locale}${cleanPath}`;
    }
  }

  // x-default points to English
  languages['x-default'] = `${baseUrl}${cleanPath || ''}`;

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