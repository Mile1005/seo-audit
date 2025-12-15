@echo off
echo 🚀 SEO Audit Tool - Complete Setup and Deployment
echo ================================================

echo.
echo 📦 Step 1: Installing dependencies...
call pnpm install

echo.
echo 🔧 Step 2: Setting up environment variables...
if exist .env.local (
    echo ⚠️  .env.local already exists. Backing up...
    copy .env.local .env.local.backup
)

echo # PageSpeed Insights API Key > .env.local
echo PSI_API_KEY=YOUR_PSI_API_KEY >> .env.local
echo. >> .env.local
echo # Google Search Console OAuth >> .env.local
echo GSC_CLIENT_ID=[YOUR_GSC_CLIENT_ID] >> .env.local
echo GSC_CLIENT_SECRET=[YOUR_GSC_CLIENT_SECRET] >> .env.local
echo GSC_REDIRECT_URI=https://seo-audit-seven.vercel.app/api/auth/gsc/callback >> .env.local
echo. >> .env.local
echo # App Configuration >> .env.local
echo NEXT_PUBLIC_APP_URL=http://localhost:3000 >> .env.local
echo. >> .env.local
echo # Development Settings >> .env.local
echo NEXT_TELEMETRY_DISABLED=1 >> .env.local
echo FAST_REFRESH=false >> .env.local
echo. >> .env.local
echo # Feature flags >> .env.local
echo FEATURE_PLAYWRIGHT_FALLBACK=false >> .env.local
echo. >> .env.local
echo # Database (SQLite by default for dev) >> .env.local
echo DATABASE_URL=file:./dev.db >> .env.local
echo. >> .env.local
echo # Redis >> .env.local
echo REDIS_URL=redis://localhost:6379 >> .env.local
echo. >> .env.local
echo # Worker Configuration >> .env.local
echo WORKER_CONCURRENCY=3 >> .env.local

echo ✅ Environment variables configured!

echo.
echo 🔍 Step 3: Running TypeScript type check...
call pnpm typecheck

echo.
echo 🧹 Step 4: Running linter...
call pnpm lint

echo.
echo 🏗️  Step 5: Building the application...
call pnpm build

echo.
echo ✅ Setup completed successfully!
echo.
echo 📋 Configuration Summary:
echo   - PSI API Key: YOUR_PSI_API_KEY
echo   - GSC Client ID: [YOUR_GSC_CLIENT_ID]
echo   - GSC Client Secret: [YOUR_GSC_CLIENT_SECRET]
echo   - GSC Redirect URI: https://seo-audit-seven.vercel.app/api/auth/gsc/callback
echo.
echo 🚀 Ready for deployment!
echo.
echo 📝 Next steps:
echo 1. Commit changes to git
echo 2. Push to GitHub
echo 3. Vercel will automatically deploy
echo 4. Test the live application
echo.
echo 🧪 To test locally:
echo   pnpm dev
echo.
pause
