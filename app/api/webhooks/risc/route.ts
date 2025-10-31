import { NextRequest, NextResponse } from 'next/server'
import { createRemoteJWKSet, jwtVerify } from 'jose'
import { prisma } from '@/lib/prisma'

// Google RISC JWKS
const jwks = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'))

export async function POST(request: NextRequest) {
  try {
    // Get JWT from request body
    const jwt = await request.text()

    if (!jwt) {
      console.error('RISC Webhook: No JWT in request body')
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Verify JWT
    const { payload } = await jwtVerify(jwt, jwks, {
      issuer: 'https://accounts.google.com',
      audience: process.env.GOOGLE_CLIENT_ID!,
    })

    console.log('RISC Webhook: Received valid JWT', {
      iss: payload.iss,
      aud: payload.aud,
      sub: payload.sub,
      events: payload.events,
    })

    // Process events asynchronously
    processEvents(payload).catch(error => {
      console.error('RISC Webhook: Error processing events', error)
    })

    // Return 200 OK immediately
    return NextResponse.json({ status: 'ok' })

  } catch (error) {
    console.error('RISC Webhook: JWT verification failed', error)
    return NextResponse.json({ error: 'Invalid JWT' }, { status: 400 })
  }
}

async function processEvents(payload: any) {
  const events = payload.events_requested || payload.events || []

  for (const event of events) {
    const eventType = event.type || event['@type']

    if (eventType === 'https://schemas.openid.net/secevent/risc/event-type/tokens-revoked' ||
        eventType === 'https://schemas.openid.net/secevent/risc/event-type/account-disabled') {

      const googleUserId = payload.sub

      console.log(`RISC Event: ${eventType} for Google user ${googleUserId}`)

      // Find user via Account
      const account = await prisma.account.findFirst({
        where: {
          provider: 'google',
          providerAccountId: googleUserId,
        },
        include: {
          user: true,
        },
      })

      if (account?.user) {
        // Revoke user session by suspending account
        await prisma.user.update({
          where: { id: account.user.id },
          data: { status: 'SUSPENDED' },
        })

        console.log(`RISC: Suspended user ${account.user.email} due to ${eventType}`)

        // TODO: Clear any active sessions if needed
        // For JWT strategy, sessions are stateless, but we can add session invalidation logic
      } else {
        console.warn(`RISC: No user found for Google ID ${googleUserId}`)
      }
    }
  }
}