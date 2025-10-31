import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    // Parse service account JSON
    const serviceAccountJson = process.env.RISC_SERVICE_ACCOUNT_JSON
    if (!serviceAccountJson) {
      return NextResponse.json({ error: 'RISC_SERVICE_ACCOUNT_JSON not set' }, { status: 500 })
    }

    const serviceAccount = JSON.parse(serviceAccountJson)

    // Create JWT payload
    const payload = {
      iss: serviceAccount.client_email,
      sub: serviceAccount.client_email,
      aud: 'https://risc.googleapis.com/google.identity.risc.v1beta.RiscManagementService',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
    }

    // Sign JWT
    const privateKey = serviceAccount.private_key.replace(/\\n/g, '\n') // Ensure newlines
    const signedJwt = jwt.sign(payload, privateKey, { algorithm: 'RS256' })

    // Prepare request body
    const body = {
      delivery: {
        delivery_method: 'https://schemas.openid.net/secevent/risc/delivery-method/push',
        url: `https://www.aiseoturbo.com/api/webhooks/risc`, // Update to your domain
      },
      events_requested: [
        'https://schemas.openid.net/secevent/risc/event-type/tokens-revoked',
        'https://schemas.openid.net/secevent/risc/event-type/account-disabled',
      ],
    }

    // Make request to Google RISC API
    const response = await fetch('https://risc.googleapis.com/v1beta/stream:update', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${signedJwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('RISC Setup failed:', response.status, errorText)
      return NextResponse.json({ error: 'Failed to register webhook', details: errorText }, { status: 500 })
    }

    const result = await response.json()
    console.log('RISC Setup successful:', result)

    return NextResponse.json({ success: true, message: 'RISC webhook registered successfully', data: result })

  } catch (error) {
    console.error('RISC Setup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}