import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function test() {
  console.log('🧪 Testing database connection...')
  
  try {
    const userCount = await prisma.user.count()
    const projectCount = await prisma.project.count()
    const keywordCount = await prisma.keyword.count()
    
    console.log('✅ Database connection successful!')
    console.log(`📊 Stats: ${userCount} users, ${projectCount} projects, ${keywordCount} keywords`)
    
    // Test a complex query
    const projects = await prisma.project.findMany({
      include: {
        owner: true,
        keywords: true,
      }
    })
    
    console.log(`🔍 Found ${projects.length} projects with relationships`)
    
    if (projects.length > 0) {
      console.log(`   - Project: ${projects[0].name} (${projects[0].domain})`)
      console.log(`   - Owner: ${projects[0].owner.name}`)
      console.log(`   - Keywords: ${projects[0].keywords.length}`)
    }
    
  } catch (error) {
    console.error('❌ Database test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

test()
