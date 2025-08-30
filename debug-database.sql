-- Check if user exists and view user data
-- Run this in Prisma Studio SQL console or copy for reference

-- 1. Check if your user exists
SELECT id, email, name, password, "emailVerified", "createdAt" 
FROM "User" 
WHERE email = 'milestoev@hotmail.com';

-- 2. If no users exist, check all users
SELECT id, email, name, password IS NOT NULL as has_password, "emailVerified", "createdAt" 
FROM "User";

-- 3. Check accounts (OAuth logins)
SELECT "userId", "provider", "type", "createdAt"
FROM "Account";

-- 4. Check audits
SELECT id, url, score, "userId", "createdAt"
FROM "Audit";
