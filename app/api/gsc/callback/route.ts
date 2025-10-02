import { NextRequest, NextResponse } from 'next/server'
import { handleGscCallback } from '@/lib/gsc'
import { prisma } from '@/lib/db'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

/**
 * GET /api/gsc/callback { NextRequest, NextResponse } from 'next/server'
import { handleGscCallback } from '@/lib/gsc'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/gsc/callback
 * Handles the OAuth callback from Google Search Console
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    console.log('🔄 GSC Callback received:', {
      hasCode: !!code,
      hasState: !!state,
      error: error || 'none'
    })

    // Handle OAuth errors
    if (error) {
      console.error('❌ OAuth error:', error)
      return NextResponse.redirect(
        new URL(`/dashboard?gsc_error=${encodeURIComponent(error)}`, req.url)
      )
    }

    // Validate required parameters
    if (!code || !state) {
      console.error('❌ Missing code or state parameter')
      return NextResponse.redirect(
        new URL('/dashboard?gsc_error=missing_parameters', req.url)
      )
    }

    // Extract userId from state (format: userId:randomToken)
    const [userId, ...rest] = state.split(':')
    if (!userId) {
      console.error('❌ Invalid state format')
      return NextResponse.redirect(
        new URL('/dashboard?gsc_error=invalid_state', req.url)
      )
    }

    console.log('👤 Extracting user from state:', {
      userId,
      statePreview: state.substring(0, 20) + '...'
    })

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      console.error('❌ User not found:', userId)
      return NextResponse.redirect(
        new URL('/dashboard?gsc_error=user_not_found', req.url)
      )
    }

    console.log('✅ User verified:', user.email)

    // Handle the OAuth callback and get tokens
    const success = await handleGscCallback(code, state)

    if (!success) {
      console.error('❌ Failed to get GSC tokens')
      return NextResponse.redirect(
        new URL('/dashboard?gsc_error=token_exchange_failed', req.url)
      )
    }

    // Update the GscToken record with userId
    await (prisma.gscToken as any).update({
      where: { state },
      data: { userId }
    })

    // Create a notification for successful GSC connection
    try {
      await (prisma as any).notification.create({
        data: {
          userId,
          type: 'GSC_CONNECTED',
          title: 'Google Search Console Connected',
          message: 'You can now view your Google Search Console data in your dashboard.',
          data: { timestamp: new Date().toISOString() }
        }
      })
      console.log('✅ Created GSC connection notification')
    } catch (notifError) {
      console.error('⚠️ Failed to create notification:', notifError)
      // Don't fail the whole flow if notification fails
    }

    console.log('✅ GSC connected successfully for user:', user.email)

    // Redirect back to dashboard with success message
    return NextResponse.redirect(
      new URL('/dashboard?gsc_success=true', req.url)
    )
  } catch (error) {
    console.error('❌ GSC Callback error:', error)
    return NextResponse.redirect(
      new URL(
        `/dashboard?gsc_error=${encodeURIComponent('callback_failed')}`,
        req.url
      )
    )
  }
}
