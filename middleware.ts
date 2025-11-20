import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, type Locale } from './lib/i18n-config';
import { routing } from './lib/navigation';

// Create next-intl middleware with routing configuration
const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip all API routes including auth - they should not be localized
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Skip other non-localized pages
  const nonLocalizedPaths = ['/share', '/onboarding'];
  if (nonLocalizedPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Skip static files and assets
  if (
    pathname.includes('/_next/') ||
    pathname.includes('/favicon.ico') ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot|otf)$/)
  ) {
    return NextResponse.next();
  }

  // Handle /en/* paths for English - redirect 301 to root paths to eliminate duplicates
  if (pathname.startsWith('/en/') || pathname === '/en') {
    // For /en root, redirect to /
    if (pathname === '/en') {
      return NextResponse.redirect(new URL('/', req.url), 301);
    }
    // For /en/path, redirect 301 to /path to eliminate duplicate hreflang entries
    const newPathname = pathname.replace(/^\/en/, '') || '/';
    return NextResponse.redirect(new URL(newPathname, req.url), 301);
  }

  // Extract locale from pathname
  let locale: Locale = defaultLocale;
  for (const loc of locales) {
    if (pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`) {
      locale = loc;
      break;
    }
  }

  // Debug log
  console.log('[MIDDLEWARE] pathname:', pathname, 'locale:', locale);

  // Set locale in headers for use in layout
  req.headers.set('x-locale', locale);

  // Check if path starts with a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If path has locale prefix, use intl middleware for proper routing
  if (pathnameHasLocale) {
    // Note: Cookie-based redirects are disabled for now to allow manual testing
    // When you're ready, uncomment the code below to auto-redirect based on user preference

    /*
    const localeCookie = req.cookies.get('NEXT_LOCALE');

    if (localeCookie?.value && locales.includes(localeCookie.value as Locale)) {
      const preferredLocale = localeCookie.value as Locale;
      const pathnameLocale = locales.find(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
      );

      // If user is on a different locale than their preference, redirect
      if (pathnameLocale && pathnameLocale !== preferredLocale) {
        const newPathname = pathname.replace(`/${pathnameLocale}`, `/${preferredLocale}`);
        return NextResponse.redirect(new URL(newPathname, req.url));
      }
    }
    */

    req.headers.set('x-locale', locale);
    return intlMiddleware(req);
  }

  // For all other paths (without locale), let intl middleware handle it
  // It will serve English content at root (/) and redirect non-English to /locale
  req.headers.set('x-locale', locale);
  return intlMiddleware(req);
}

export const config = {
  // Match all pathnames except API routes, static files, and assets
  // Include /en/* paths for English handling
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
