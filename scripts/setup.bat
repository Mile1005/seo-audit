@echo off
echo 🚀 Setting up SEO Audit Tool...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check if pnpm is installed
pnpm --version >nul 2>&1
if errorlevel 1 (
    echo 📦 Installing pnpm...
    npm install -g pnpm
)

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed. Please install Docker first.
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
pnpm install

echo 🔧 Setting up environment...
if not exist .env.local (
    copy env.example .env.local
    echo ✅ Created .env.local from template
) else (
    echo ⚠️  .env.local already exists, skipping...
)

echo 🐳 Starting Redis...
docker compose up -d redis

echo ✅ Setup complete!
echo.
echo 🎉 To start the application:
echo 1. Terminal 1: pnpm dev
echo 2. Terminal 2: pnpm worker
echo 3. Open http://localhost:3000
echo.
echo 📚 For more information, see README.md
pause
