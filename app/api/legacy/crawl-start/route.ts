// Legacy API compatibility shim
// Redirects old Pages Router API routes to new App Router equivalents

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  // Forward to new crawl start endpoint
  return NextResponse.redirect(
    new URL('/api/crawl/start?' + searchParams.toString(), request.url),
    { status: 301 }
  )
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Forward POST requests to new endpoint
  const response = await fetch(
    new URL('/api/crawl/start', request.url),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
  
  return response
}
