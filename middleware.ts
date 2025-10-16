import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Minimal middleware that only excludes /api/auth routes to prevent OAuth interference
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hostname = req.headers.get('host') || ''

  // Skip all auth routes to prevent OAuth callback interference
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // Redirect non-www to www for SEO consistency (301 Permanent Redirect)
  if (hostname === 'aiseoturbo.com') {
    const url = req.nextUrl.clone()
    url.host = 'www.aiseoturbo.com'
    return NextResponse.redirect(url, { status: 301 })
  }

  // For all other routes, just continue normally
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)'],
}
