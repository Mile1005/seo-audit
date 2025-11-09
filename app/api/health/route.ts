import { NextRequest, NextResponse } from 'next/server';
import { checkDatabaseHealth } from '@/lib/database';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Comprehensive health checks
    const [databaseHealth] = await Promise.all([
      checkDatabaseHealth(),
    ]);

    const healthChecks = {
      status: databaseHealth.status === 'healthy' ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      checks: {
        database: databaseHealth.status === 'healthy',
        api: true,
        static: true
      },
      database: {
        status: databaseHealth.status,
        latency: 'latency' in databaseHealth ? databaseHealth.latency : undefined,
        error: databaseHealth.error,
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
