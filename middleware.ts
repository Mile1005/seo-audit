import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Enforce canonical www host to avoid OAuth redirect mismatches
// but DO NOT touch /api/auth/* routes to prevent potential double redirects or code reuse causing invalid_grant.
const CANONICAL_HOST = 'www.aiseoturbo.com'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  // Skip auth routes entirely
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }
  const host = req.headers.get('host') || ''
  if (host && host !== CANONICAL_HOST) {
    const url = new URL(req.url)
    url.host = CANONICAL_HOST
    if (process.env.NODE_ENV === 'production') {
      console.log('[middleware] redirecting to canonical host', { from: host, to: CANONICAL_HOST, path: pathname })
    }
    return NextResponse.redirect(url, 308)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)'],
}
