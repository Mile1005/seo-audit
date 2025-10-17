import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Minimal middleware - let next.config.js handle redirects for better performance
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Skip all auth routes to prevent OAuth callback interference
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // All other redirects (www/non-www) are handled in next.config.mjs
  // This keeps middleware lightweight and fast
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)'],
}
