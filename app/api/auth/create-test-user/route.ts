import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '../../../../lib/prisma'

export async function POST(request: NextRequest) {
  try {
    console.log('🔧 Creating test user...')
    
    const email = 'test@example.com'
    const password = 'password123'
    const name = 'Test User'
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      console.log('🔐 User exists, updating password...')
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12)
      
      // Update existing user with new password
      const updatedUser = await prisma.user.update({
        where: { email },
        data: { 
          password: hashedPassword,
          emailVerified: new Date() // Mark as verified
        }
      })
      
      return NextResponse.json({
        message: 'Test user password updated',
        user: { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name },
        credentials: { email, password }
      })
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        emailVerified: new Date() // Mark as verified
      }
    })
    
    console.log('✅ Test user created:', user.email)
    
    return NextResponse.json({
      message: 'Test user created successfully',
      user: { id: user.id, email: user.email, name: user.name },
      credentials: { email, password }
    })
    
  } catch (error) {
    console.error('❌ Error creating test user:', error)
    return NextResponse.json(
      { message: 'Failed to create test user', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
