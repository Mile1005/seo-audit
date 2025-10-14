# 🚨 LOCALHOST SETUP FIX

## The Problem

Your `.env.local` is configured for **production**, not localhost:
- `NEXTAUTH_URL="https://www.aiseoturbo.com"` (should be localhost)
- Database is production PostgreSQL

## Quick Fix for Localhost

### Option 1: Use `.env` for Local Development (Recommended)

Create a `.env` file (not `.env.local`) with local settings:

```bash
# Local Development Settings
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-local-secret-key-here"

# Copy these from .env.local if needed for features:
GOOGLE_CLIENT_ID="your-google-client-id-here"
GOOGLE_CLIENT_SECRET="your-google-client-secret-here"
```

### Option 2: Temporarily Edit `.env.local`

Change these lines in `.env.local`:

```bash
# FROM:
NEXTAUTH_URL="https://www.aiseoturbo.com"

# TO:
NEXTAUTH_URL="http://localhost:3000"
```

## Database Setup for Localhost

### Step 1: Generate Prisma Client
```bash
npx prisma generate
```

### Step 2: Create Database Migration
```bash
npx prisma migrate dev --name add_crawl_type_field
```

### Step 3: Push Schema to Database (Alternative)
```bash
npx prisma db push
```

## Login Options

### Option A: Google OAuth (if configured for localhost)
1. Go to Google Cloud Console
2. Add `http://localhost:3000/api/auth/callback/google` to authorized redirects
3. Restart server
4. Login with Google

### Option B: Create a Test User Directly

Run this in Prisma Studio:
```bash
npx prisma studio
```

Then manually create a user in the `User` table.

### Option C: Disable Authentication for Testing

Temporarily comment out the auth check in:
`app/api/dashboard/page-crawler/start/route.ts`

```typescript
// Comment out these lines for testing:
// const session = await auth()
// const userId = session?.user?.id
// if (!userId) {
//   return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
// }

// Use a test user ID:
const userId = 'test-user-id'
```

## Recommended Steps

1. **Stop your dev server** (Ctrl+C)

2. **Update NEXTAUTH_URL**:
   ```bash
   # In .env.local, change:
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Run Database Setup**:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name add_crawl_type_field
   ```

4. **Restart Server**:
   ```bash
   npm run dev
   ```

5. **Try to Login**:
   - Go to http://localhost:3000/login
   - Use Google OAuth (if redirects are configured)
   - Or use Option C above to bypass auth temporarily

## Quick Test Without Login

If you just want to test the Page Crawler UI without authentication:

1. Open `app/dashboard/page-crawler/page.tsx`
2. Comment out the authentication check:

```typescript
// Comment this out:
// useEffect(() => {
//   if (status === 'unauthenticated') {
//     router.push('/login?callbackUrl=/dashboard/page-crawler');
//   }
// }, [status, router]);

// And this:
// if (status === 'loading') {
//   return (...)
// }
// if (!session) {
//   return null;
// }
```

3. Restart server
4. Go directly to http://localhost:3000/dashboard/page-crawler

---

## What You Should Do Right Now

**Easiest Path:**

```bash
# 1. Stop the server (Ctrl+C in terminal)

# 2. Edit .env.local - change this one line:
NEXTAUTH_URL="http://localhost:3000"

# 3. Run database migration
npx prisma generate
npx prisma migrate dev

# 4. Restart server
npm run dev

# 5. Try to access the page
# Go to: http://localhost:3000/dashboard/page-crawler
```

If you still can't login, we can temporarily disable authentication just for testing the UI.
