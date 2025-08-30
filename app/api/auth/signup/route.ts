import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '../../../../lib/prisma'
import { generateRandomToken } from '../../../../lib/utils'
import { sendEmailVerification } from '../../../../lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'A user with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate email verification token
    const verificationToken = generateRandomToken(32)
    const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Create user
    const user = await (prisma.user as any).create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name || null,
        emailVerificationToken: verificationToken,
        emailVerificationExpiry: verificationExpiry,
        emailVerificationSentAt: new Date()
      }
    })

    // Send verification email
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`
    
    try {
      await sendEmailVerification({
        to: user.email,
        verificationUrl,
        userName: user.name || undefined
      })
      
      if (process.env.NODE_ENV === 'development') {
        console.log('🔗 Email Verification Link:', verificationUrl)
        console.log('📧 Verification email sent to:', email)
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Continue anyway - user is created, they can resend verification later
    }

    return NextResponse.json(
      { 
        message: 'User created successfully. Please check your email to verify your account.',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerified: false
        },
        requiresVerification: true
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'An error occurred during signup' },
      { status: 500 }
    )
  }
}
