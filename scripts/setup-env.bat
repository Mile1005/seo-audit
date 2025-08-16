@echo off
echo 🔧 Setting up Environment Variables for SEO Audit Tool...

echo # PageSpeed Insights API Key > .env.local
echo PSI_API_KEY=AIzaSyA9x1N0poqiewfF6YL2Cyqcty57MhzrMPU >> .env.local
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

echo ✅ Environment variables configured successfully!
echo.
echo 📋 Configuration Summary:
echo   - PSI API Key: AIzaSyA9x1N0poqiewfF6YL2Cyqcty57MhzrMPU
echo   - GSC Client ID: [YOUR_GSC_CLIENT_ID]
echo   - GSC Client Secret: [YOUR_GSC_CLIENT_SECRET]
echo   - GSC Redirect URI: https://seo-audit-seven.vercel.app/api/auth/gsc/callback
echo.
echo 🚀 Next steps:
echo 1. Run: pnpm install
echo 2. Run: pnpm dev
echo 3. Test the application
echo.
pause
