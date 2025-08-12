import { NextResponse } from "next/server";
import { dbHelpers } from "../../../lib/db";

export async function GET() {
  try {
    // Test database connection by getting recent runs
    await dbHelpers.getRecentRuns();
    
    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        database: "connected",
        api: "running"
      }
    });
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: "Database connection failed"
      },
      { status: 503 }
    );
  }
}


