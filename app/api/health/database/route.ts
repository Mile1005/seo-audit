import { NextResponse } from "next/server";
import { checkDatabaseHealth, getPerformanceMetrics, getDatabaseStats } from "@/lib/database";

export async function GET() {
  try {
    // Run all health checks in parallel
    const [health, performance, stats] = await Promise.all([
      checkDatabaseHealth(),
      getPerformanceMetrics(),
      getDatabaseStats().catch(() => null), // Stats might fail in some environments
    ]);

    const response = {
      status: health.status === "healthy" ? "healthy" : "unhealthy",
      timestamp: new Date().toISOString(),
      database: {
        ...health,
        performance,
        stats: stats || null,
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        databaseUrl: process.env.DATABASE_URL ? "configured" : "missing",
        prismaAccelerate: process.env.DATABASE_URL?.includes("prisma") || false,
      },
    };

    return NextResponse.json(response, {
      status: health.status === "healthy" ? 200 : 503,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
