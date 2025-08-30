import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { valid: false, message: 'Token is required' },
        { status: 400 }
      )
    }

    // Find user with this reset token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date() // Token must not be expired
        }
      } as any
    })

    if (!user) {
      return NextResponse.json(
        { valid: false, message: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { valid: true, message: 'Token is valid' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
      { valid: false, message: 'An error occurred while verifying the token' },
      { status: 500 }
    )
  }
}
