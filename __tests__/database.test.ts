import { test, expect, vi, beforeEach } from "vitest";

// Mock Prisma client (must be hoisted because vi.mock is hoisted)
const mockPrisma = vi.hoisted(() => ({
  $queryRaw: vi.fn(),
  $connect: vi.fn(),
  $disconnect: vi.fn(),
}));

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn().mockImplementation(() => mockPrisma),
}));

// Import the actual functions after mocking PrismaClient
import { checkDatabaseHealth, getPerformanceMetrics, connectDatabase, disconnectDatabase } from "../lib/database";

beforeEach(() => {
  vi.clearAllMocks();
});

test("checkDatabaseHealth returns healthy status on successful query", async () => {
  mockPrisma.$queryRaw.mockResolvedValue([{ result: 1 }]);
  const result = await checkDatabaseHealth();

  expect(result.status).toBe('healthy');
  expect(result.timestamp).toBeInstanceOf(Date);
  expect('error' in result).toBe(false);
});

test("checkDatabaseHealth returns unhealthy status on query failure", async () => {
  mockPrisma.$queryRaw.mockRejectedValue(new Error('Connection failed'));

  const result = await checkDatabaseHealth();

  expect(result.status).toBe('unhealthy');
  expect(result.error).toBe('Connection failed');
  expect(result.timestamp).toBeInstanceOf(Date);
});

test("getPerformanceMetrics measures query performance", async () => {
  mockPrisma.$queryRaw.mockResolvedValue([{ result: 1 }]);

  const result = await getPerformanceMetrics();

  expect(result.queryTime).toBeDefined();
  expect(result.queryTime).toBeGreaterThanOrEqual(0);
  expect(['fast', 'moderate', 'slow']).toContain(result.status);
  expect(result.timestamp).toBeInstanceOf(Date);
});

test("connectDatabase handles successful connection", async () => {
  mockPrisma.$connect.mockResolvedValue(undefined);

  const result = await connectDatabase();

  expect(result).toBe(true);
  expect(mockPrisma.$connect).toHaveBeenCalled();
});

test("connectDatabase handles connection failure", async () => {
  mockPrisma.$connect.mockRejectedValue(new Error('Connection failed'));

  const result = await connectDatabase();

  expect(result).toBe(false);
});

test("disconnectDatabase handles successful disconnection", async () => {
  mockPrisma.$disconnect.mockResolvedValue(undefined);

  await disconnectDatabase();

  expect(mockPrisma.$disconnect).toHaveBeenCalled();
});