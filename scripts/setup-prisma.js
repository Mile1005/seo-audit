#!/usr/bin/env node

/**
 * Setup script for Prisma in production environments
 * This ensures Prisma Client is properly generated for Vercel deployments
 */

const { execSync } = require('child_process');
const path = require('path');

async function setupPrisma() {
  try {
    console.log('🔄 Setting up Prisma...');
    
    // Ensure we're in the right directory
    const projectRoot = path.resolve(__dirname, '..');
    process.chdir(projectRoot);
    
    // Generate Prisma client
    console.log('📦 Generating Prisma Client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    console.log('✅ Prisma setup completed successfully!');
  } catch (error) {
    console.error('❌ Error setting up Prisma:', error.message);
    process.exit(1);
  }
}

// Run only if this script is executed directly
if (require.main === module) {
  setupPrisma();
}

module.exports = { setupPrisma };
