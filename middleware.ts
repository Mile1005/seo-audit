import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Enforce canonical www host to avoid OAuth redirect mismatches
const CANONICAL_HOST = 'www.aiseoturbo.com'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  if (host && host !== CANONICAL_HOST) {
    const url = new URL(req.url)
    url.host = CANONICAL_HOST
    return NextResponse.redirect(url, 308)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)'],
}
