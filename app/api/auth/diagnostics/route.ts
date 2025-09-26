import { NextResponse } from 'next/server'

export async function GET() {
  const diagnostics = {
    hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
    hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasAuthSecret: !!(process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET),
    nextauthUrl: process.env.NEXTAUTH_URL || null,
    runtimeHostExample: 'Will be enforced to www.aiseoturbo.com by middleware',
    timestamp: new Date().toISOString(),
  }
  return NextResponse.json(diagnostics)
}
