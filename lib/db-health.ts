import { prisma } from "./prisma";

let dbHealthy = true;
let lastHealthCheck = 0;
const HEALTH_CHECK_INTERVAL = 30000; // 30 seconds

export async function checkDatabaseHealth(): Promise<boolean> {
  const now = Date.now();

  // Only check every 30 seconds to avoid performance issues
  if (now - lastHealthCheck < HEALTH_CHECK_INTERVAL && dbHealthy !== null) {
    return dbHealthy;
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    dbHealthy = true;
    lastHealthCheck = now;
    return true;
  } catch (error) {
    console.error("Database health check failed:", error);
    dbHealthy = false;
    lastHealthCheck = now;
    return false;
  }
}

export async function safeDbOperation<T>(
  operation: () => Promise<T>,
  fallback?: T
): Promise<T | null> {
  try {
    const isHealthy = await checkDatabaseHealth();
    if (!isHealthy) {
      console.warn("Database unhealthy, skipping operation");
      return fallback || null;
    }

    return await operation();
  } catch (error) {
    console.error("Database operation failed:", error);
    return fallback || null;
  }
}
