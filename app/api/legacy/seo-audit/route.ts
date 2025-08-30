// Legacy SEO audit API compatibility shim
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  // Forward to new seo-audit results endpoint
  return NextResponse.redirect(
    new URL('/api/seo-audit/results?' + searchParams.toString(), request.url),
    { status: 301 }
  )
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Forward POST requests to new endpoint
  const response = await fetch(
    new URL('/api/seo-audit/start', request.url),
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
