// Metrics endpoint for monitoring application performance and statistics
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const metrics = await gatherMetrics()
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      metrics
    }, { status: 200 })
    
  } catch (error) {
    console.error('Metrics collection failed:', error)
    
    return NextResponse.json({
      error: 'Failed to collect metrics',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

async function gatherMetrics() {
  const metrics: any = {
    database: {
      connection_pool: {
        // These would be available in a full Prisma setup
        active_connections: 'N/A',
        idle_connections: 'N/A'
      }
    },
    application: {
      uptime_seconds: process.uptime(),
      memory_usage: process.memoryUsage(),
      node_version: process.version,
      environment: process.env.NODE_ENV || 'development'
    }
  }
  
  try {
    // Safely try to get database metrics
    const runCount = await prisma.$queryRaw`SELECT COUNT(*) as count FROM "Run"` as any[]
    metrics.database.tables = {
      runs: parseInt(runCount[0]?.count || '0')
    }
    
    // Try to get auth tables metrics if they exist
    try {
      const userCount = await prisma.$queryRaw`SELECT COUNT(*) as count FROM "User"` as any[]
      const projectCount = await prisma.$queryRaw`SELECT COUNT(*) as count FROM "Project"` as any[]
      
      metrics.database.tables.users = parseInt(userCount[0]?.count || '0')
      metrics.database.tables.projects = parseInt(projectCount[0]?.count || '0')
    } catch {
      // Auth tables don't exist yet - this is expected during expand phase
      metrics.database.tables.users = 'pending_migration'
      metrics.database.tables.projects = 'pending_migration'
    }
    
  } catch (error) {
    metrics.database.error = error instanceof Error ? error.message : 'Unknown error'
  }
  
  return metrics
}
