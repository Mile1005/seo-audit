import { test, expect, vi, beforeEach, afterEach } from "vitest";
import { checkDatabaseHealth, getPerformanceMetrics, connectDatabase, disconnectDatabase, prisma } from "../lib/database";

// Mock Prisma client
const mockPrisma = {
  $queryRaw: vi.fn(),
  $connect: vi.fn(),
  $disconnect: vi.fn(),
};

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn().mockImplementation(() => mockPrisma),
}));

vi.mock('../lib/database', () => ({
  prisma: mockPrisma,
  checkDatabaseHealth: vi.fn(),
  getPerformanceMetrics: vi.fn(),
  connectDatabase: vi.fn(),
  disconnectDatabase: vi.fn(),
}));

// Import the actual functions after mocking
import { checkDatabaseHealth as actualCheckDatabaseHealth, getPerformanceMetrics as actualGetPerformanceMetrics, connectDatabase as actualConnectDatabase, disconnectDatabase as actualDisconnectDatabase } from "../lib/database";

test("checkDatabaseHealth returns healthy status on successful query", async () => {
  mockPrisma.$queryRaw.mockResolvedValue([{ result: 1 }]);
  const result = await actualCheckDatabaseHealth();

  expect(result.status).toBe('healthy');
  expect(result.timestamp).toBeInstanceOf(Date);
  expect('error' in result).toBe(false);
});

test("checkDatabaseHealth returns unhealthy status on query failure", async () => {
  mockPrisma.$queryRaw.mockRejectedValue(new Error('Connection failed'));

  const result = await actualCheckDatabaseHealth();

  expect(result.status).toBe('unhealthy');
  expect(result.error).toBe('Connection failed');
  expect(result.timestamp).toBeInstanceOf(Date);
});

test("getPerformanceMetrics measures query performance", async () => {
  mockPrisma.$queryRaw.mockResolvedValue([{ result: 1 }]);

  const result = await actualGetPerformanceMetrics();

  expect(result.queryTime).toBeDefined();
  expect(result.queryTime).toBeGreaterThanOrEqual(0);
  expect(['fast', 'moderate', 'slow']).toContain(result.status);
  expect(result.timestamp).toBeInstanceOf(Date);
});

test("connectDatabase handles successful connection", async () => {
  mockPrisma.$connect.mockResolvedValue(undefined);

  const result = await actualConnectDatabase();

  expect(result).toBe(true);
  expect(mockPrisma.$connect).toHaveBeenCalled();
});

test("connectDatabase handles connection failure", async () => {
  mockPrisma.$connect.mockRejectedValue(new Error('Connection failed'));

  const result = await actualConnectDatabase();

  expect(result).toBe(false);
});

test("disconnectDatabase handles successful disconnection", async () => {
  mockPrisma.$disconnect.mockResolvedValue(undefined);

  await actualDisconnectDatabase();

  expect(mockPrisma.$disconnect).toHaveBeenCalled();
});