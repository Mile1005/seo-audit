import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getGscAuthUrl } from '@/lib/gsc'
import crypto from 'crypto'

/**
 * GET /api/gsc/connect
 * Initiates the Google Search Console OAuth flow
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Please log in' },
        { status: 401 }
      )
    }

    // Check if credentials are configured
    const clientId = process.env.GOOGLE_CLIENT_ID || process.env.GSC_CLIENT_ID;
    if (!clientId || clientId.includes('your-')) {
      console.error('❌ GSC Connect: Google OAuth credentials not configured');
      return NextResponse.json(
        { 
          success: false, 
          error: 'GSC OAuth not configured',
          details: 'GOOGLE_CLIENT_ID environment variable is missing or using placeholder value. Please configure Google OAuth credentials in Vercel.'
        },
        { status: 500 }
      )
    }

    // Generate a unique state token for CSRF protection
    // Format: userId:randomToken
    const randomToken = crypto.randomBytes(32).toString('hex')
    const state = `${session.user.id}:${randomToken}`

    console.log('🔐 GSC Connect initiated for user:', {
      userId: session.user.id,
      email: session.user.email,
      state: state.substring(0, 20) + '...',
      clientIdSource: process.env.GOOGLE_CLIENT_ID ? 'GOOGLE_CLIENT_ID' : 'GSC_CLIENT_ID'
    })

    // Generate the OAuth URL
    const authUrl = await getGscAuthUrl(state)

    console.log('✅ GSC Auth URL generated successfully')

    // Return the auth URL for the frontend to redirect to
    return NextResponse.json({
      success: true,
      authUrl,
      message: 'Redirect to this URL to authenticate'
    })
  } catch (error) {
    console.error('❌ GSC Connect error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to initiate GSC connection',
        details: error instanceof Error ? error.message : 'Unknown error',
        hint: 'Try visiting /api/gsc/debug for diagnostic information'
      },
      { status: 500 }
    )
  }
}
