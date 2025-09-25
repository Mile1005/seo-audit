@echo off
REM Production Database Migration Script for Windows
REM This script applies Prisma migrations to the production database

echo 🚀 Starting production database migration...

REM Apply all pending migrations
npx prisma migrate deploy

REM Generate the Prisma client
npx prisma generate

echo ✅ Database migration completed successfully!