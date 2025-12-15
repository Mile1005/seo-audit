@echo off
echo 🔧 Setting up Google Search Console Environment Variables...

REM Check if .env.local exists
if exist .env.local (
    echo ⚠️  .env.local already exists. Backing up...
    copy .env.local .env.local.backup
) else (
    echo 📝 Creating new .env.local file...
)

REM Create new .env.local with GSC credentials
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

echo ✅ GSC environment variables configured successfully!
echo.
echo 📋 Configuration Summary:
echo   - GSC Client ID: [YOUR_GSC_CLIENT_ID]
echo   - GSC Client Secret: [YOUR_GSC_CLIENT_SECRET]
echo   - GSC Redirect URI: https://seo-audit-seven.vercel.app/api/auth/gsc/callback
echo   - PSI API Key: YOUR_PSI_API_KEY
echo.
echo 🚀 Next steps:
echo 1. Restart your development server
echo 2. Test GSC integration by running an audit
echo 3. Check /api/debug/gsc-config to verify configuration
echo.
pause
