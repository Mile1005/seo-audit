import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, type Locale } from "./lib/i18n-config";
import { routing } from "./lib/navigation";

// Create next-intl middleware with routing configuration
const intlMiddleware = createMiddleware(routing);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip all API routes including auth - they should not be localized
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Skip other non-localized pages
  // NOTE: keep this list minimal; localized pages live under app/[locale]/*
  const nonLocalizedPaths = ["/share"];
  if (nonLocalizedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Skip static files and assets
  if (
    pathname.includes("/_next/") ||
    pathname.includes("/favicon.ico") ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot|otf)$/)
  ) {
    return NextResponse.next();
  }

  // Handle /en/* paths for English - redirect 301 to root paths to eliminate duplicates
  if (pathname.startsWith("/en/") || pathname === "/en") {
    // For /en root, redirect to /
    if (pathname === "/en") {
      return NextResponse.redirect(new URL("/", req.url), 301);
    }
    // For /en/path, redirect 301 to /path to eliminate duplicate hreflang entries
    const newPathname = pathname.replace(/^\/en/, "") || "/";
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
  const intlResponse = intlMiddleware(req);

  // CRITICAL: If next-intl returns a redirect (e.g., 307 to locale-prefixed path),
  // we must return it as-is. Only inject headers for non-redirect responses.
  const isRedirect = intlResponse.status >= 300 && intlResponse.status < 400;
  if (isRedirect) {
    // Still add our custom headers to the redirect response
    intlResponse.headers.set("x-detected-locale", detectedLocale);
    intlResponse.headers.set("x-current-pathname", pathname);
    return intlResponse;
  }

  // For non-redirect responses, inject locale into request headers for Server Components.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-aiseo-locale", detectedLocale);
  requestHeaders.set("x-aiseo-pathname", pathname);

  // Preserve any rewrite performed by next-intl.
  const rewrite = intlResponse.headers.get("x-middleware-rewrite");
  const response = rewrite
    ? NextResponse.rewrite(new URL(rewrite), { request: { headers: requestHeaders } })
    : NextResponse.next({ request: { headers: requestHeaders } });

  // Preserve cookies set by next-intl (e.g. NEXT_LOCALE).
  for (const cookie of intlResponse.cookies.getAll()) {
    response.cookies.set(cookie);
  }

  // Improve bfcache eligibility: avoid `Cache-Control: no-store` on public pages.
  // Keep responses non-cacheable in shared caches by using `private`.
  const withoutLocale = pathname.replace(/^\/(en|fr|it|es|id|de)(?=\/|$)/, "");
  const isSensitiveRoute =
    withoutLocale.startsWith("/dashboard") ||
    withoutLocale.startsWith("/login") ||
    withoutLocale.startsWith("/signup") ||
    withoutLocale.startsWith("/reset-password") ||
    withoutLocale.startsWith("/forgot-password") ||
    withoutLocale.startsWith("/verify-email") ||
    withoutLocale.startsWith("/onboarding") ||
    withoutLocale.startsWith("/share");
  if (!isSensitiveRoute) {
    response.headers.set("Cache-Control", "private, no-cache, max-age=0, must-revalidate");
  }

  // Add custom header with detected locale
  response.headers.set("x-detected-locale", detectedLocale);
  response.headers.set("x-current-pathname", pathname);

  return response;
}

export const config = {
  // Match all pathnames except API routes, static files, and assets
  // Include /en/* paths for English handling
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
