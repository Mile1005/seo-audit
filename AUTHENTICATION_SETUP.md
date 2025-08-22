# Authentication Setup Guide

This guide will help you set up Google OAuth authentication for the SEO Audit application.

## Prerequisites

- A Google Cloud Console account
- A PostgreSQL database (or SQLite for development)

## Step 1: Set up Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application" as the application type
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://yourdomain.com/api/auth/callback/google` (for production)
   - Copy the Client ID and Client Secret

## Step 2: Environment Variables

Create a `.env.local` file in your project root and add the following variables:

```env
# Database
DATABASE_URL="your-database-url"

# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Generating NEXTAUTH_SECRET

You can generate a secure secret using:

```bash
openssl rand -base64 32
```

Or use an online generator and make sure it's at least 32 characters long.

## Step 3: Database Setup

1. Run the database migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

2. Verify the database tables are created:
   ```bash
   npx prisma studio
   ```

## Step 4: Testing the Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000`
3. You should see a login form with a "Continue with Google" button
4. Click the button and complete the OAuth flow
5. After successful authentication, you should be redirected to the main page with your user dashboard

## Features Included

### Authentication Features
- ✅ Google OAuth integration
- ✅ User session management
- ✅ Protected API routes
- ✅ User-specific audit history
- ✅ Beautiful login/logout UI
- ✅ Responsive design

### User Dashboard
- ✅ Personal audit history
- ✅ Audit status tracking
- ✅ Quick statistics
- ✅ Direct links to audit results

### Security Features
- ✅ JWT-based sessions
- ✅ Protected API endpoints
- ✅ User data isolation
- ✅ Secure password handling

## File Structure

```
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts    # NextAuth API routes
│   │   └── user/audits/route.ts           # User audit history API
│   ├── auth/signin/page.tsx               # Sign-in page
│   └── layout.tsx                         # Root layout with SessionProvider
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx                  # Login/logout component
│   │   ├── SessionProvider.tsx            # NextAuth provider
│   │   └── UserDashboard.tsx              # User dashboard
│   └── common/
│       └── Header.tsx                     # Header with auth status
├── lib/
│   ├── auth.ts                            # NextAuth configuration
│   ├── db.ts                              # Database helpers (updated)
│   └── schemas.ts                         # API schemas (updated)
├── prisma/
│   └── schema.prisma                      # Database schema (updated)
└── middleware.ts                          # Route protection
```

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**
   - Make sure your redirect URI in Google Cloud Console matches exactly
   - Check that you're using the correct domain (localhost vs production)

2. **"NEXTAUTH_SECRET is not set" error**
   - Ensure you have set the NEXTAUTH_SECRET environment variable
   - Make sure it's at least 32 characters long

3. **Database connection issues**
   - Verify your DATABASE_URL is correct
   - Run `npx prisma db push` to ensure tables are created
   - Check that your database is accessible

4. **"Unauthorized" errors on API calls**
   - Ensure the user is authenticated
   - Check that the middleware is properly configured
   - Verify the session is valid

### Development vs Production

For production deployment:

1. Update the redirect URIs in Google Cloud Console
2. Set production environment variables
3. Use a production database
4. Generate a new NEXTAUTH_SECRET
5. Update NEXTAUTH_URL to your production domain

## API Endpoints

### Protected Endpoints
- `GET /api/user/audits` - Get user's audit history
- Additional user-specific endpoints can be added here

### Public Endpoints
- `POST /api/audit/start` - Start a new audit (now includes user ID when authenticated)
- All existing audit endpoints remain public

## User Experience Flow

1. **Unauthenticated User**
   - Sees login form on homepage
   - Can sign in with Google
   - Redirected to main application after authentication

2. **Authenticated User**
   - Sees personalized dashboard with audit history
   - Can start new audits (linked to their account)
   - Can view all their previous audit results
   - Can sign out from header

3. **Session Management**
   - Sessions persist across browser sessions
   - Automatic logout on session expiry
   - Secure token handling

## Security Considerations

- All user data is isolated by user ID
- API routes are protected with middleware
- Sessions use secure JWT tokens
- Google OAuth provides secure authentication
- No sensitive data is stored in client-side code

## Next Steps

You can extend this authentication system by:

1. Adding more OAuth providers (GitHub, Microsoft, etc.)
2. Implementing user roles and permissions
3. Adding email verification
4. Creating user profile management
5. Adding audit sharing between users
6. Implementing audit export functionality