-- EXPAND PHASE: Additive-only migration for authentication and multi-tenancy
-- This migration is designed to be compatible with existing data

-- CreateSchema (safe - creates if not exists)
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum (additive - new types)
DO $$ BEGIN
    CREATE TYPE "public"."ProjectRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER', 'VIEWER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "public"."CrawlStatus" AS ENUM ('queued', 'running', 'completed', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "public"."RunStatus" AS ENUM ('queued', 'running', 'ready', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- CreateTable: Auth.js tables (additive - new functionality)
CREATE TABLE IF NOT EXISTS "public"."Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "public"."Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "public"."VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable: Multi-tenancy tables (additive - new feature)
CREATE TABLE IF NOT EXISTS "public"."Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "public"."ProjectMember" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "public"."ProjectRole" NOT NULL DEFAULT 'MEMBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProjectMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable: Enhanced existing tables with optional multi-tenancy (backward compatible)
CREATE TABLE IF NOT EXISTS "public"."Run" (
    "id" TEXT NOT NULL,
    "pageUrl" TEXT NOT NULL,
    "targetKeyword" TEXT,
    "email" TEXT,
    "status" "public"."RunStatus" NOT NULL DEFAULT 'queued',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Run_pkey" PRIMARY KEY ("id")
);

-- Add optional columns to existing tables (backward compatible)
DO $$ BEGIN
    ALTER TABLE "public"."Audit" ADD COLUMN IF NOT EXISTS "projectId" TEXT;
    ALTER TABLE "public"."Audit" ADD COLUMN IF NOT EXISTS "createdBy" TEXT;
EXCEPTION
    WHEN others THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "public"."Crawl" ADD COLUMN IF NOT EXISTS "projectId" TEXT;
    ALTER TABLE "public"."Crawl" ADD COLUMN IF NOT EXISTS "createdBy" TEXT;
EXCEPTION
    WHEN others THEN null;
END $$;

-- CreateTable: Additional tables if they don't exist
CREATE TABLE IF NOT EXISTS "public"."Crawl" (
    "id" TEXT NOT NULL,
    "startUrl" TEXT NOT NULL,
    "results" JSONB NOT NULL,
    "status" "public"."CrawlStatus" NOT NULL DEFAULT 'queued',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT,
    "createdBy" TEXT,
    CONSTRAINT "Crawl_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "public"."Audit" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "json" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" TEXT,
    "createdBy" TEXT,
    CONSTRAINT "Audit_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "public"."GscToken" (
    "id" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "tokens" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GscToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex (safe - creates if not exists)
CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "public"."Account"("provider", "providerAccountId");
CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "public"."Session"("sessionToken");
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "public"."User"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "public"."VerificationToken"("token");
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_identifier_token_key" ON "public"."VerificationToken"("identifier", "token");
CREATE INDEX IF NOT EXISTS "Project_ownerId_idx" ON "public"."Project"("ownerId");
CREATE UNIQUE INDEX IF NOT EXISTS "Project_ownerId_name_key" ON "public"."Project"("ownerId", "name");
CREATE INDEX IF NOT EXISTS "ProjectMember_userId_idx" ON "public"."ProjectMember"("userId");
CREATE UNIQUE INDEX IF NOT EXISTS "ProjectMember_projectId_userId_key" ON "public"."ProjectMember"("projectId", "userId");
CREATE INDEX IF NOT EXISTS "Audit_projectId_createdAt_idx" ON "public"."Audit"("projectId", "createdAt");
CREATE INDEX IF NOT EXISTS "Crawl_projectId_createdAt_idx" ON "public"."Crawl"("projectId", "createdAt");
CREATE UNIQUE INDEX IF NOT EXISTS "GscToken_state_key" ON "public"."GscToken"("state");

-- AddForeignKey (safe - only adds if tables exist)
DO $$ BEGIN
    ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "public"."ProjectMember" ADD CONSTRAINT "ProjectMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "public"."ProjectMember" ADD CONSTRAINT "ProjectMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "public"."Audit" ADD CONSTRAINT "Audit_runId_fkey" FOREIGN KEY ("runId") REFERENCES "public"."Run"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "public"."Audit" ADD CONSTRAINT "Audit_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "public"."Audit" ADD CONSTRAINT "Audit_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "public"."Crawl" ADD CONSTRAINT "Crawl_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    ALTER TABLE "public"."Crawl" ADD CONSTRAINT "Crawl_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
