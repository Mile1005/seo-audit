const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

console.log('Available models:', Object.keys(prisma))
console.log('Checking backlink model:', !!prisma.backlink)
console.log('Checking keyword model:', !!prisma.keyword)
