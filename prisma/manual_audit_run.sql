-- Manual, non-destructive DDL to add AuditRun & AuditIssueSnapshot tables to existing SQLite DB
-- Use when you want to avoid full prisma migrate reset due to drift.
-- Safe to run multiple times (IF NOT EXISTS).

PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS "AuditRun" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "url" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'completed',
  "score" INTEGER,
  "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "completedAt" DATETIME,
  "result" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "AuditIssueSnapshot" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "auditRunId" TEXT NOT NULL,
  "severity" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "category" TEXT,
  "type" TEXT,
  "location" TEXT,
  "selector" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AuditIssueSnapshot_auditRunId_fkey" FOREIGN KEY ("auditRunId") REFERENCES "AuditRun" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "AuditRun_url_idx" ON "AuditRun"("url");
CREATE INDEX IF NOT EXISTS "AuditRun_status_idx" ON "AuditRun"("status");
CREATE INDEX IF NOT EXISTS "AuditRun_createdAt_idx" ON "AuditRun"("createdAt");

CREATE INDEX IF NOT EXISTS "AuditIssueSnapshot_auditRunId_idx" ON "AuditIssueSnapshot"("auditRunId");
CREATE INDEX IF NOT EXISTS "AuditIssueSnapshot_severity_idx" ON "AuditIssueSnapshot"("severity");
CREATE INDEX IF NOT EXISTS "AuditIssueSnapshot_category_idx" ON "AuditIssueSnapshot"("category");
