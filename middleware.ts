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

  // Detect locale from pathname
  let detectedLocale: Locale = defaultLocale;
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      detectedLocale = locale;
      break;
    }
  }

  // Run intl middleware
  const response = intlMiddleware(req);

  // Add custom header with detected locale
  response.headers.set('x-detected-locale', detectedLocale);

  return response;
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
