import { test, expect, vi, beforeEach, afterEach } from "vitest";
import { checkDatabaseHealth, getPerformanceMetrics, connectDatabase, disconnectDatabase, prisma } from "../lib/database";

// Mock Prisma client
vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn().mockImplementation(() => ({
    $queryRaw: vi.fn(),
    $connect: vi.fn(),
    $disconnect: vi.fn(),
  })),
}));

test("checkDatabaseHealth returns healthy status on successful query", async () => {
  const result = await checkDatabaseHealth();

  expect(result.status).toBe('healthy');
  expect(result.timestamp).toBeInstanceOf(Date);
  expect('error' in result).toBe(false);
});

test("checkDatabaseHealth returns unhealthy status on query failure", async () => {
  // Mock a database error by temporarily changing the prisma instance
  const originalQueryRaw = prisma.$queryRaw;
  prisma.$queryRaw = vi.fn().mockRejectedValue(new Error('Connection failed'));

  try {
    const result = await checkDatabaseHealth();

    expect(result.status).toBe('unhealthy');
    expect(result.error).toBe('Connection failed');
    expect(result.timestamp).toBeInstanceOf(Date);
  } finally {
    // Restore original function
    prisma.$queryRaw = originalQueryRaw;
  }
});

test("getPerformanceMetrics measures query performance", async () => {
  const mockPrisma = {
    $queryRaw: vi.fn().mockResolvedValue([{ result: 1 }]),
  };

  vi.doMock('../lib/database', () => ({
    prisma: mockPrisma,
  }));

  const result = await getPerformanceMetrics();

  expect(result.queryTime).toBeDefined();
  expect(result.queryTime).toBeGreaterThanOrEqual(0);
  expect(['fast', 'moderate', 'slow']).toContain(result.status);
  expect(result.timestamp).toBeInstanceOf(Date);
});

test("connectDatabase handles successful connection", async () => {
  const mockPrisma = {
    $connect: vi.fn().mockResolvedValue(undefined),
  };

  vi.doMock('../lib/database', () => ({
    prisma: mockPrisma,
  }));

  const result = await connectDatabase();

  expect(result).toBe(true);
  expect(mockPrisma.$connect).toHaveBeenCalled();
});

test("connectDatabase handles connection failure", async () => {
  const mockPrisma = {
    $connect: vi.fn().mockRejectedValue(new Error('Connection failed')),
  };

  vi.doMock('../lib/database', () => ({
    prisma: mockPrisma,
  }));

  const result = await connectDatabase();

  expect(result).toBe(false);
});

test("disconnectDatabase handles successful disconnection", async () => {
  const mockPrisma = {
    $disconnect: vi.fn().mockResolvedValue(undefined),
  };

  vi.doMock('../lib/database', () => ({
    prisma: mockPrisma,
  }));

  await disconnectDatabase();

  expect(mockPrisma.$disconnect).toHaveBeenCalled();
});