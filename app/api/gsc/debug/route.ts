import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

/**
 * GET /api/gsc/debug
 * Debug endpoint to check GSC OAuth configuration
 * Only accessible when logged in
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

    const redirectUri = process.env.GSC_REDIRECT_URI || `${process.env.NEXTAUTH_URL}/api/gsc/callback`;
    const clientId = process.env.GOOGLE_CLIENT_ID || process.env.GSC_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || process.env.GSC_CLIENT_SECRET;

    const diagnostics = {
      timestamp: new Date().toISOString(),
      user: {
        id: session.user.id,
        email: session.user.email,
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        nextauthUrl: process.env.NEXTAUTH_URL,
      },
      oauth: {
        hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
        hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
        hasGscClientId: !!process.env.GSC_CLIENT_ID,
        hasGscClientSecret: !!process.env.GSC_CLIENT_SECRET,
        usingClientIdSource: process.env.GOOGLE_CLIENT_ID ? 'GOOGLE_CLIENT_ID' : 'GSC_CLIENT_ID',
        clientIdLength: clientId?.length || 0,
        clientIdPreview: clientId ? `${clientId.substring(0, 15)}...` : 'MISSING',
      },
      redirectUri: {
        configured: redirectUri,
        isProduction: redirectUri.includes('aiseoturbo.com'),
        isLocalhost: redirectUri.includes('localhost'),
      },
      requiredScopes: [
        'https://www.googleapis.com/auth/webmasters.readonly'
      ],
      status: {
        configured: !!(clientId && clientSecret && redirectUri),
        ready: !!(clientId && clientSecret && redirectUri && !clientId.includes('your-')),
      }
    };

    // Add warnings
    const warnings: string[] = [];
    if (!clientId || clientId.includes('your-')) {
      warnings.push('GOOGLE_CLIENT_ID is not configured or using placeholder value');
    }
    if (!clientSecret || clientSecret.includes('your-')) {
      warnings.push('GOOGLE_CLIENT_SECRET is not configured or using placeholder value');
    }
    if (!redirectUri.includes('aiseoturbo.com') && process.env.NODE_ENV === 'production') {
      warnings.push('Redirect URI should use production domain (aiseoturbo.com) in production');
    }

    return NextResponse.json({
      success: true,
      diagnostics,
      warnings: warnings.length > 0 ? warnings : undefined,
      nextSteps: !diagnostics.status.ready ? [
        '1. Add GOOGLE_CLIENT_ID to environment variables',
        '2. Add GOOGLE_CLIENT_SECRET to environment variables',
        '3. Ensure redirect URI (https://www.aiseoturbo.com/api/gsc/callback) is added to Google Cloud Console',
        '4. Redeploy application after setting environment variables'
      ] : [
        'Configuration looks good! Try connecting again.',
        'If issues persist, check Google Cloud Console authorized redirect URIs'
      ]
    })
  } catch (error) {
    console.error('❌ GSC Debug error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate diagnostics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
