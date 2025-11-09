// Password Reset Script for test@example.com
// Run this with: node scripts/reset-password.cjs

import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetPassword() {
  const email = 'test@example.com';
  const newPassword = 'password123'; // Change this to your desired password
  
  try {
    console.log('🔍 Looking for user:', email);
    
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      console.log('❌ User not found');
      return;
    }
    
    console.log('✅ User found:', user.email);
    console.log('🔐 Current password hash:', user.password ? 'EXISTS' : 'NULL');
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    console.log('🔐 New password hash:', hashedPassword);
    
    // Update the user's password
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    });
    
    console.log('✅ Password updated successfully for:', updatedUser.email);
    console.log('🔑 New password is:', newPassword);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetPassword();
