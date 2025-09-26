import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Minimal middleware that only excludes /api/auth routes to prevent OAuth interference
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  // Skip all auth routes to prevent OAuth callback interference
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }
  
  // For all other routes, just continue normally
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)'],
}
