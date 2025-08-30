import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function createTestUser() {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    })

    if (existingUser) {
      console.log('✅ Test user already exists:', existingUser.email)
      return existingUser
    }

    // Create test user
    const hashedPassword = await bcrypt.hash('TestPassword123', 12)
    
    const user = await (prisma.user as any).create({
      data: {
        email: 'test@example.com',
        password: hashedPassword,
        name: 'Test User',
      }
    })

    console.log('✅ Test user created successfully:', user.email)
    return user
  } catch (error) {
    console.error('❌ Error creating test user:', error)
  }
}

createTestUser()
  .then(() => {
    console.log('🎉 Test user setup complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Error:', error)
    process.exit(1)
  })
