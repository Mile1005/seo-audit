import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

/**
 * GET /api/auth/gsc/callback
 * Compatibility redirect to the canonical GSC callback route.
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const target = new URL('/api/gsc/callback', url.origin)
  target.search = url.search
  return NextResponse.redirect(target)
}
