# Authentication Setup Guide

This guide will help you set up both Google OAuth and credentials-based (email/password) authentication for the SEO Audit application.

## Prerequisites

- A Google Cloud Console account (for Google OAuth)
- A PostgreSQL database (or SQLite for development)

## Authentication Methods

This application supports **two authentication methods**:

1. **Google OAuth** - Sign in with Google account
2. **Email/Password** - Traditional credentials-based authentication

Users can choose either method, and both integrate seamlessly with the same user database.

## Step 1: Set up Google OAuth (Optional but Recommended)

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

# Google OAuth (Optional - leave empty to disable Google auth)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Generating NEXTAUTH_SECRET

You can generate a secure secret using:

```bash
openssl rand -base64 32
```

Or use an online generator and make sure it's at least 32 characters long.

### Note about Google OAuth

If you don't want to set up Google OAuth, you can leave `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` empty. The application will still work with email/password authentication only.

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
3. You should see a login form with both email/password fields and a "Continue with Google" button
4. Test both authentication methods:
   - **Email/Password**: Click "Don't have an account? Create one" to register, then sign in
   - **Google OAuth**: Click "Continue with Google" and complete the OAuth flow
5. After successful authentication, you should be redirected to the main page with your user dashboard

## Features Included

### Authentication Features
- ✅ **Dual Authentication**: Email/password AND Google OAuth
- ✅ **User Registration**: Create accounts with email/password
- ✅ **Secure Password Hashing**: Using bcryptjs with salt rounds
- ✅ **Form Validation**: Client and server-side validation
- ✅ **User session management**
- ✅ **Protected API routes**
- ✅ **User-specific audit history**
- ✅ **Beautiful login/logout UI**
- ✅ **Responsive design**

### User Experience
- ✅ **Unified Login Form**: Toggle between login and register modes
- ✅ **Separate Registration Page**: Direct link to create account
- ✅ **Smart Redirects**: Automatic redirect after authentication
- ✅ **Error Handling**: Clear error messages for all scenarios
- ✅ **Loading States**: Visual feedback during authentication

### Security Features
- ✅ **Password Requirements**: Minimum 8 characters
- ✅ **Secure Hashing**: bcryptjs with 12 salt rounds
- ✅ **JWT-based sessions**
- ✅ **Protected API endpoints**
- ✅ **User data isolation**
- ✅ **Input validation and sanitization**

## File Structure

```
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts      # NextAuth API routes
│   │   │   └── register/route.ts           # User registration API
│   │   └── user/audits/route.ts            # User audit history API
│   ├── auth/
│   │   ├── signin/page.tsx                 # Sign-in page
│   │   └── register/page.tsx               # Registration page
│   └── layout.tsx                          # Root layout with SessionProvider
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx                   # Unified login/register form
│   │   ├── SessionProvider.tsx             # NextAuth provider
│   │   └── UserDashboard.tsx               # User dashboard
│   └── common/
│       └── Header.tsx                      # Header with auth status
├── lib/
│   ├── auth.ts                             # NextAuth configuration (updated)
│   ├── db.ts                               # Database helpers (updated)
│   └── schemas.ts                          # API schemas (updated)
├── prisma/
│   └── schema.prisma                       # Database schema (updated)
└── middleware.ts                           # Route protection
```

## User Registration Flow

### Email/Password Registration
1. User clicks "Don't have an account? Create one"
2. Form switches to registration mode
3. User enters name, email, and password
4. Client-side validation checks:
   - Name: minimum 2 characters
   - Email: valid format
   - Password: minimum 8 characters
5. Server creates user with hashed password
6. User is automatically signed in after registration

### Google OAuth Registration
1. User clicks "Continue with Google"
2. Redirected to Google OAuth flow
3. User authorizes the application
4. Google returns user profile information
5. User account is created automatically
6. User is signed in immediately

## API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/[...nextauth]` - NextAuth authentication handlers
- `GET /api/user/audits` - Get user's audit history (protected)

### Registration API

**Endpoint**: `POST /api/auth/register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response** (Success):
```json
{
  "message": "User created successfully",
  "user": {
    "id": "clx1234567890",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response** (Error):
```json
{
  "error": "User already exists with this email"
}
```

## Validation Rules

### Client-Side Validation
- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format
- **Password**: Required, minimum 8 characters

### Server-Side Validation
- **Name**: 2-100 characters, no special validation
- **Email**: Valid email format, unique in database
- **Password**: Minimum 8 characters, hashed with bcryptjs

## Troubleshooting

### Common Issues

1. **"User already exists" error**
   - This email is already registered
   - Try signing in instead of registering
   - Use the "Already have an account? Sign in" link

2. **"Invalid email or password" error**
   - Check email spelling and password
   - Remember passwords are case-sensitive
   - Try the "Forgot password" feature (if implemented)

3. **Google OAuth issues**
   - Check Google Client ID and Secret are correct
   - Verify redirect URIs in Google Cloud Console
   - Ensure Google+ API is enabled

4. **Password requirements not met**
   - Password must be at least 8 characters
   - Use a mix of letters, numbers, and symbols for security

5. **Database connection issues**
   - Verify DATABASE_URL is correct
   - Ensure the User table has a password column
   - Run `npx prisma db push` to update schema

## Security Considerations

### Password Security
- Passwords are hashed using bcryptjs with 12 salt rounds
- Original passwords are never stored in the database
- Password validation enforces minimum length requirements

### Session Security
- JWT tokens are securely signed with NEXTAUTH_SECRET
- Sessions automatically expire and refresh
- User data is isolated by user ID

### Data Protection
- All user input is validated on both client and server
- SQL injection protection through Prisma ORM
- XSS protection through proper input sanitization

## User Experience Flow

### For New Users
1. **Registration Options**:
   - Fill out email/password form
   - OR click "Continue with Google"
2. **Account Creation**: Automatic account setup
3. **Immediate Access**: Signed in after registration
4. **Dashboard**: See personalized audit history

### For Returning Users
1. **Sign In Options**:
   - Email/password form
   - OR Google OAuth (if previously used)
2. **Session Restoration**: Return to previous state
3. **Audit History**: Access all previous audits

### Account Flexibility
- Users can sign in with either method if they used Google initially
- Consistent user experience regardless of authentication method
- Profile information synced across authentication methods

## Production Deployment

### Environment Setup
1. Update redirect URIs in Google Cloud Console for production domain
2. Set production environment variables:
   ```env
   NEXTAUTH_URL=https://yourdomain.com
   NEXTAUTH_SECRET=new-production-secret
   GOOGLE_CLIENT_ID=production-client-id
   GOOGLE_CLIENT_SECRET=production-client-secret
   DATABASE_URL=production-database-url
   ```
3. Ensure database is accessible from production environment
4. Test both authentication methods in production

### Security Checklist
- [ ] Use strong NEXTAUTH_SECRET (32+ characters)
- [ ] Enable HTTPS in production
- [ ] Configure proper CORS settings
- [ ] Set up rate limiting for registration endpoint
- [ ] Monitor for failed login attempts
- [ ] Regular security audits

## Next Steps

You can extend this authentication system by:

1. **Additional Features**:
   - Password reset functionality
   - Email verification
   - Two-factor authentication
   - Social logins (GitHub, Microsoft, etc.)

2. **User Management**:
   - User profile editing
   - Account deletion
   - Data export

3. **Administrative Features**:
   - User roles and permissions
   - Admin dashboard
   - User analytics

4. **Enhanced Security**:
   - Account lockout after failed attempts
   - Suspicious activity detection
   - Security notifications

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Check the browser developer console for errors
4. Review server logs for authentication errors

The authentication system is now fully functional with both Google OAuth and credentials-based authentication!