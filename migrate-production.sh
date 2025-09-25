#!/bin/bash
# Production Database Migration Script
# This script applies Prisma migrations to the production database

echo "🚀 Starting production database migration..."

# Apply all pending migrations
npx prisma migrate deploy

# Generate the Prisma client
npx prisma generate

echo "✅ Database migration completed successfully!"