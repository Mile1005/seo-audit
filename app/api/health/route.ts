import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Basic health checks
    const healthChecks = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      checks: {
        database: await checkDatabase(),
        api: true,
        static: true
      }
    };

    // Return appropriate status based on checks
    const allHealthy = Object.values(healthChecks.checks).every(check => check === true);
    const status = allHealthy ? 200 : 503;

    return NextResponse.json(healthChecks, { status });
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 503 });
  }
}

async function checkDatabase(): Promise<boolean> {
  try {
    // Simple database connectivity check
    // This would typically involve a lightweight query
    // For now, just check if DATABASE_URL exists
    return !!process.env.DATABASE_URL;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}
