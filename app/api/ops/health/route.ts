// Health check endpoint for monitoring database and application status
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// Force dynamic rendering for this route since it needs database access
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Basic database connectivity check
    const dbCheck = await prisma.$queryRaw`SELECT 1 as healthy`
    const dbLatency = Date.now() - startTime
    
    // Check if migration tables exist
    const migrationStatus = await checkMigrationStatus()
    
    // Check backfill status
    const backfillStatus = await checkBackfillStatus()
    
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      checks: {
        database: {
          status: 'healthy',
          latency_ms: dbLatency,
          connected: !!dbCheck
        },
        migration: migrationStatus,
        backfill: backfillStatus,
        application: {
          status: 'healthy',
          version: process.env.npm_package_version || 'unknown',
          environment: process.env.NODE_ENV || 'development'
        }
      }
    }
    
    return NextResponse.json(healthData, { status: 200 })
    
  } catch (error) {
    console.error('Health check failed:', error)
    
    const errorData = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      checks: {
        database: {
          status: 'unhealthy',
          latency_ms: Date.now() - startTime,
          connected: false
        }
      }
    }
    
    return NextResponse.json(errorData, { status: 503 })
  } finally {
    await prisma.$disconnect()
  }
}

async function checkMigrationStatus() {
  try {
    // Check if new tables exist
    const authTables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('User', 'Account', 'Session', 'Project', 'ProjectMember')
    ` as any[]
    
    return {
      status: authTables.length >= 5 ? 'completed' : 'pending',
      tables_created: authTables.length,
      tables_expected: 5,
      details: authTables.map((t: any) => t.table_name)
    }
  } catch (error) {
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown migration error'
    }
  }
}

async function checkBackfillStatus() {
  try {
    // Check if backfill data exists
    const defaultUser = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM "User" WHERE email = 'legacy@system.local'
    ` as any[]
    
    const defaultProject = await prisma.$queryRaw`
      SELECT COUNT(*) as count FROM "Project" WHERE name = 'Legacy Data'
    ` as any[]
    
    return {
      status: (defaultUser[0]?.count > 0 && defaultProject[0]?.count > 0) ? 'completed' : 'pending',
      default_user_exists: defaultUser[0]?.count > 0,
      default_project_exists: defaultProject[0]?.count > 0
    }
  } catch (error) {
    return {
      status: 'not_applicable',
      reason: 'Migration tables not yet available'
    }
  }
}
