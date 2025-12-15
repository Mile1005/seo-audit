import { NextResponse } from "next/server";
import { getRedisHealth } from "@/lib/redis";

export async function GET() {
  const health = getRedisHealth();

  return NextResponse.json(
    {
      redis: {
        connected: health.connected,
        error: health.error || null,
        fallback: !health.connected ? "Using memory store" : null,
      },
      timestamp: new Date().toISOString(),
    },
    {
      status: health.connected ? 200 : 503,
    }
  );
}
