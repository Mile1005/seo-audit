-- Migration: Add preferredLocale field to User table
-- Generated: 2025-11-01
-- Purpose: Store user's preferred language for i18n system

-- Add preferredLocale column with default value
ALTER TABLE "User" 
ADD COLUMN IF NOT EXISTS "preferredLocale" TEXT DEFAULT 'en';

-- Create index for faster lookups (optional but recommended)
CREATE INDEX IF NOT EXISTS "User_preferredLocale_idx" ON "User"("preferredLocale");

-- Update existing users to have 'en' as default if NULL
UPDATE "User" 
SET "preferredLocale" = 'en' 
WHERE "preferredLocale" IS NULL;

-- Add check constraint to ensure valid locales
ALTER TABLE "User"
ADD CONSTRAINT "User_preferredLocale_check" 
CHECK ("preferredLocale" IN ('en', 'fr', 'it', 'es', 'id', 'de'));

-- Verify migration
SELECT COUNT(*) as total_users, 
       "preferredLocale", 
       COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() as percentage
FROM "User"
GROUP BY "preferredLocale"
ORDER BY COUNT(*) DESC;
