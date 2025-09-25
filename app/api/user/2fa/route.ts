import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import speakeasy from 'speakeasy'
import QRCode from 'qrcode'
import { getRedis } from '@/lib/redis'

// Keys
function keyStatus(email: string) {
  return `user:2fa:${email}`
}
function keyTmp(email: string) {
  return `user:2fa:tmp:${email}`
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const redis = getRedis()
    const statusRaw = await redis.get(keyStatus(session.user.email))
    const status = statusRaw ? JSON.parse(statusRaw) : { enabled: false }
    return NextResponse.json({ enabled: !!status.enabled })
  } catch (error) {
    console.error('Error getting 2FA status:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { action, token } = body
    const email = session.user.email
    const redis = getRedis()

    if (action === 'setup') {
      // Generate a new secret
      const secret = speakeasy.generateSecret({
        name: `SEOTurbo (${email})`,
        issuer: 'SEOTurbo',
        length: 32
      })

      // Generate QR code
      const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!)

      // Store the temporary secret (TTL 10 minutes)
      await redis.set(keyTmp(email), secret.base32, 'EX', 600)

      // Also return it to the client for immediate verification
      return NextResponse.json({
        secret: secret.base32,
        qrCode: qrCodeUrl,
        manualEntryKey: secret.base32
      })
    }

    if (action === 'verify') {
      const { secret } = body
      
      if (!secret || !token) {
        // Try to use temporary secret from Redis if not provided
        const tmp = await redis.get(keyTmp(email))
        if (!tmp) {
          return NextResponse.json({ error: 'Secret and token are required' }, { status: 400 })
        }
        body.secret = tmp
      }

      // Verify the token
      const verified = speakeasy.totp.verify({
        secret: body.secret,
        encoding: 'base32',
        token,
        window: 2
      })

      if (!verified) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
      }

      // Persist 2FA status and secret in Redis
      await redis.set(keyStatus(email), JSON.stringify({ enabled: true, secret: body.secret }))
      // Clear temporary secret
      await redis.del(keyTmp(email))

      return NextResponse.json({ 
        message: '2FA enabled successfully',
        enabled: true 
      })
    }

    if (action === 'disable') {
      const { password } = body
      
      if (!password) {
        return NextResponse.json({ error: 'Password is required to disable 2FA' }, { status: 400 })
      }

      // In a real implementation, verify the password here
      // Disable 2FA in Redis
      await redis.set(keyStatus(email), JSON.stringify({ enabled: false }))
      await redis.del(keyTmp(email))

      return NextResponse.json({ 
        message: '2FA disabled successfully',
        enabled: false 
      })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error with 2FA:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}