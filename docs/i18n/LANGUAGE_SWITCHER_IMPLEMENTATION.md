# Language Switcher & User Preferences Implementation

## 📋 Overview

Complete implementation of a user-friendly language switcher with persistent preferences for both authenticated users (via database) and guests (via cookies).

---

## 🎯 Features Implemented

### ✅ Core Functionality
- **Radix UI Dropdown** - Accessible, keyboard-navigable dropdown menu
- **6 Supported Locales** - English, French, Italian, Spanish, Indonesian, German
- **Visual Indicators** - Flag emojis and locale names with checkmark for current language
- **Smooth Transitions** - React transitions for seamless switching
- **Toast Notifications** - User feedback on language change

### ✅ Persistence Layer
- **Authenticated Users** - Preferences saved to PostgreSQL via Prisma
- **Guest Users** - Preferences saved to cookies (1-year expiration)
- **Session Integration** - User's preferred locale included in NextAuth session
- **Middleware Detection** - Automatic redirect to preferred locale on navigation

### ✅ Integration Points
- **Dashboard Header** - Language switcher positioned in top navigation
- **Auth Flows** - Locale preserved across login/logout
- **Multi-tenant Projects** - Language preference respected per user
- **Email Templates** - Ready for locale-aware Resend integration

---

## 📁 Files Created/Modified

### 1. **Enhanced Language Switcher Component**
**File:** `components/layout/language-switcher.tsx`

```typescript
'use client';

import { usePathname, useRouter } from '@/lib/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { Languages, Check } from 'lucide-react';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
```

**Key Features:**
- Uses `useTranslations()` for i18n button labels
- Calls API to update user preference in database
- Sets `NEXT_LOCALE` cookie for guest persistence
- Shows loading state during transition
- Toast notifications for success/error

**Usage Example:**
```tsx
import { LanguageSwitcher } from '@/components/layout/language-switcher';

<LanguageSwitcher />
```

---

### 2. **User Preferences API Route**
**File:** `app/api/user/preferences/route.ts`

**Endpoints:**

#### `GET /api/user/preferences`
Fetches user preferences from database with fallback to Redis/memory.

**Response:**
```json
{
  "preferences": {
    "company": "",
    "timezone": "UTC",
    "preferredLocale": "en",
    "emailNotifications": true,
    "marketingEmails": false
  }
}
```

#### `PATCH /api/user/preferences`
Updates user's preferred locale (used by language switcher).

**Request:**
```json
{
  "preferredLocale": "fr"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "clx...",
    "email": "user@example.com",
    "name": "John Doe",
    "preferredLocale": "fr"
  }
}
```

#### `PUT /api/user/preferences`
Updates all user preferences (company, timezone, locale).

**Request:**
```json
{
  "company": "Acme Corp",
  "timezone": "America/New_York",
  "preferredLocale": "es"
}
```

---

### 3. **Prisma Schema Update**
**File:** `prisma/schema.prisma`

**Migration:**
```prisma
model User {
  // ... existing fields ...
  
  // Profile fields
  company         String?
  timezone        String?   @default("UTC")
  bio             String?
  website         String?
  preferredLocale String?   @default("en") // ✅ NEW FIELD
  
  // ... rest of schema ...
}
```

**Generate Migration:**
```powershell
# For production (with existing data)
pnpm prisma migrate deploy

# For development (generate types only)
pnpm prisma generate
```

**SQL Migration (if applying manually):**
```sql
-- Add preferredLocale column to User table
ALTER TABLE "User" ADD COLUMN "preferredLocale" TEXT DEFAULT 'en';

-- Create index for faster lookups (optional)
CREATE INDEX "User_preferredLocale_idx" ON "User"("preferredLocale");
```

---

### 4. **Middleware Enhancement**
**File:** `middleware.ts`

**Key Changes:**
```typescript
// Check for locale preference cookie (set by language switcher)
const localeCookie = req.cookies.get('NEXT_LOCALE');

// If user has a preferred locale cookie and is not already on that locale, redirect
if (localeCookie?.value && locales.includes(localeCookie.value as Locale)) {
  const preferredLocale = localeCookie.value as Locale;
  
  // Extract current locale from pathname
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // If current locale differs from preferred, redirect to preferred locale
  if (pathnameLocale && pathnameLocale !== preferredLocale) {
    const newPathname = pathname.replace(`/${pathnameLocale}`, `/${preferredLocale}`);
    return NextResponse.redirect(new URL(newPathname, req.url));
  }
}
```

**Flow:**
1. User visits site → Middleware checks `NEXT_LOCALE` cookie
2. Cookie exists → Redirect to preferred locale path
3. Cookie doesn't exist → Use browser's Accept-Language header

---

### 5. **Auth Session Update**
**File:** `auth.ts`

**Session Callback Enhancement:**
```typescript
session: async ({ session, token }) => {
  if (session?.user && token.sub) {
    // ... existing code ...
    
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        status: true,
        preferredLocale: true, // ✅ Include user's preferred language
      }
    })
    
    if (dbUser) {
      // ... existing code ...
      
      // @ts-ignore - Add preferred locale to session
      session.user.preferredLocale = dbUser.preferredLocale || 'en'
    }
  }
  return session
},
```

**Benefits:**
- User's preferred locale available in session throughout app
- Can be used for server-side rendering with correct locale
- Passed to email templates for locale-aware content

---

### 6. **Dashboard Integration**
**File:** `components/dashboard/DashboardHeader.tsx`

**Integration:**
```tsx
import { LanguageSwitcher } from "@/components/layout/language-switcher"

<div className="flex items-center space-x-4">
  {/* Language Switcher */}
  <LanguageSwitcher />
  
  {/* Project Switcher */}
  <div className="relative">
    {/* ... existing project switcher ... */}
  </div>
  
  {/* User Menu */}
  <div className="relative">
    {/* ... existing user menu ... */}
  </div>
</div>
```

---

### 7. **UI Components (Radix)**

Created the following shadcn/ui-style components:

#### `components/ui/dropdown-menu.tsx`
- Full Radix UI dropdown implementation
- Keyboard navigation support
- Accessibility features

#### `components/ui/toast.tsx`
- Toast notification component
- Variants: default, destructive
- Auto-dismiss functionality

#### `components/ui/use-toast.ts`
- Toast state management hook
- Queue system for multiple toasts
- Programmatic dismiss

#### `components/ui/toaster.tsx`
- Toast container/provider
- Renders active toasts

---

## 🚀 Usage Guide

### Basic Usage

```tsx
// Import the component
import { LanguageSwitcher } from '@/components/layout/language-switcher';

// Add to your header/nav
<header>
  <nav>
    {/* Other nav items */}
    <LanguageSwitcher />
  </nav>
</header>
```

### Access User's Preferred Locale

#### Client Component:
```tsx
'use client';
import { useLocale } from 'next-intl';

export function MyComponent() {
  const locale = useLocale(); // 'en', 'fr', 'it', etc.
  
  return <div>Current locale: {locale}</div>;
}
```

#### Server Component:
```tsx
import { cookies } from 'next/headers';

export default function MyPage() {
  const cookieStore = cookies();
  const preferredLocale = cookieStore.get('NEXT_LOCALE')?.value || 'en';
  
  return <div>Preferred locale: {preferredLocale}</div>;
}
```

#### From Session (Server):
```tsx
import { auth } from '@/auth';

export default async function MyPage() {
  const session = await auth();
  const preferredLocale = session?.user?.preferredLocale || 'en';
  
  return <div>User prefers: {preferredLocale}</div>;
}
```

---

## 📧 Email Integration (Resend)

### Making Email Templates Locale-Aware

```typescript
// lib/email/send-welcome-email.ts
import { Resend } from 'resend';
import { auth } from '@/auth';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(userEmail: string) {
  // Get user's preferred locale from session or database
  const session = await auth();
  const locale = session?.user?.preferredLocale || 'en';
  
  // Load translations for email
  const messages = await import(`@/messages/${locale}.json`);
  const t = messages.default;
  
  // Send email with localized content
  await resend.emails.send({
    from: 'AI SEO Turbo <noreply@aiseoturbo.com>',
    to: userEmail,
    subject: t.emails.welcome.subject, // Localized subject
    html: `
      <h1>${t.emails.welcome.heading}</h1>
      <p>${t.emails.welcome.body}</p>
      <a href="https://aiseoturbo.com/${locale}/dashboard">
        ${t.emails.welcome.cta}
      </a>
    `,
  });
}
```

### Add Email Translations

**File:** `messages/en.json`
```json
{
  "emails": {
    "welcome": {
      "subject": "Welcome to AI SEO Turbo!",
      "heading": "Get Started with Your SEO Audit",
      "body": "We're excited to have you on board. Click below to run your first audit.",
      "cta": "Start Your First Audit"
    }
  }
}
```

---

## 🧪 Testing Checklist

### ✅ Language Switching (Guest Users)
- [ ] Switch from EN → FR → IT → ES → ID → DE
- [ ] Verify cookie is set: `document.cookie` includes `NEXT_LOCALE=fr`
- [ ] Verify URL updates: `/en/dashboard` → `/fr/dashboard`
- [ ] Verify content translates correctly
- [ ] Verify no page reload (smooth transition)
- [ ] Close browser and reopen → language persists

### ✅ Language Switching (Authenticated Users)
- [ ] Login as user
- [ ] Switch language (e.g., EN → FR)
- [ ] Verify database update: Check `User.preferredLocale` in DB
- [ ] Verify cookie is also set
- [ ] Logout and login again → preferred language loads
- [ ] Verify session includes `preferredLocale`

### ✅ Multi-Device Persistence
- [ ] Set language on Desktop → Login on Mobile → Language matches
- [ ] Set language on Mobile → Login on Desktop → Language matches

### ✅ Auth Flow Preservation
- [ ] Set language to FR as guest
- [ ] Login → Verify still on FR
- [ ] Logout → Verify still on FR
- [ ] Signup with FR selected → Verify user created with `preferredLocale='fr'`

### ✅ Project Context
- [ ] Switch projects → Language persists
- [ ] Create new project → Language remains same
- [ ] Invite team member → They see their own preferred language

### ✅ Edge Cases
- [ ] Invalid locale in cookie → Fallback to EN
- [ ] Database error → Cookie fallback works
- [ ] Rapid language switches → No race conditions
- [ ] Network offline → Toast error shown

---

## 📊 Performance Considerations

### Optimizations Implemented

1. **React Transitions** - Non-blocking UI updates
2. **Cookie First** - Fast client-side reads
3. **Debounced Updates** - Prevent rapid API calls
4. **Lazy Loading** - Dropdown menu loaded on demand
5. **Session Caching** - Preferred locale cached in JWT

### Monitoring

Track these metrics in production:

```typescript
// Add to analytics
analytics.track('Language Changed', {
  userId: session?.user?.id,
  fromLocale: currentLocale,
  toLocale: newLocale,
  userType: session ? 'authenticated' : 'guest',
  timestamp: new Date().toISOString(),
});
```

---

## 🔧 Troubleshooting

### Issue: Language doesn't persist after login

**Solution:**
1. Check database migration applied: `pnpm prisma migrate deploy`
2. Verify Prisma Client regenerated: `pnpm prisma generate`
3. Check auth.ts session callback includes `preferredLocale`

### Issue: Cookie not being set

**Solution:**
1. Verify path is `/` in cookie: `document.cookie = 'NEXT_LOCALE=fr; path=/;'`
2. Check SameSite policy: Should be `Lax` or `None; Secure`
3. Verify no CSP blocking cookies

### Issue: Middleware not redirecting

**Solution:**
1. Check middleware config matcher includes your routes
2. Verify `NEXT_LOCALE` cookie exists: `req.cookies.get('NEXT_LOCALE')`
3. Check locale is valid: Must be in `locales` array

### Issue: TypeScript errors on `preferredLocale`

**Solution:**
```powershell
# Regenerate Prisma types
pnpm prisma generate

# Restart TypeScript server in VS Code
# Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

---

## 🎨 Customization

### Change Dropdown Styling

```tsx
// components/layout/language-switcher.tsx

<DropdownMenuContent align="end" className="w-48 bg-gray-900 border-gray-700">
  {/* Custom styles */}
</DropdownMenuContent>
```

### Add More Locales

```typescript
// i18n.ts
export const locales = ['en', 'fr', 'it', 'es', 'id', 'de', 'pt', 'ja'] as const;

export const localeNames: Record<Locale, string> = {
  // ... existing ...
  pt: 'Português',
  ja: '日本語',
};

export const localeFlags: Record<Locale, string> = {
  // ... existing ...
  pt: '🇵🇹',
  ja: '🇯🇵',
};
```

### Custom Toast Messages

```tsx
// components/layout/language-switcher.tsx

toast({
  title: `🎉 ${t('languageChanged')}`,
  description: `You're now viewing the site in ${localeNames[newLocale]}`,
  duration: 3000,
  className: 'bg-green-50 border-green-200',
});
```

---

## 📦 Dependencies Installed

```json
{
  "@radix-ui/react-dropdown-menu": "^2.1.16",
  "@radix-ui/react-toast": "^1.2.15",
  "class-variance-authority": "latest"
}
```

**Install Command:**
```powershell
pnpm add @radix-ui/react-dropdown-menu @radix-ui/react-toast class-variance-authority
```

---

## 🔐 Security Considerations

### Cookie Security
```typescript
// Secure cookie settings
document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax; Secure`;
```

### API Route Protection
- All endpoints use `auth()` to verify session
- Locale validation prevents injection attacks
- Rate limiting recommended for production

### CSRF Protection
- NextAuth CSRF tokens protect all mutations
- API routes use POST/PATCH/PUT methods
- No GET-based mutations

---

## 📚 Related Documentation

- [next-intl Docs](https://next-intl-docs.vercel.app/)
- [Radix UI Dropdown](https://www.radix-ui.com/docs/primitives/components/dropdown-menu)
- [NextAuth Session](https://next-auth.js.org/getting-started/client#usesession)
- [Prisma Migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate)

---

## ✅ Implementation Checklist

- [x] Create enhanced LanguageSwitcher component
- [x] Add Radix UI Dropdown and Toast components
- [x] Update Prisma schema with `preferredLocale` field
- [x] Create/update `/api/user/preferences` route
- [x] Enhance middleware for cookie detection
- [x] Update auth.ts session callback
- [x] Integrate into DashboardHeader
- [x] Add translation keys for UI labels
- [x] Install required dependencies
- [x] Document usage and integration patterns
- [ ] Apply database migration in production
- [ ] Test across all supported locales
- [ ] Implement email template locale detection
- [ ] Add analytics tracking
- [ ] Performance monitoring in production

---

**Status:** ✅ **Complete** - Ready for testing and deployment

**Next Steps:**
1. Apply Prisma migration: `pnpm prisma migrate deploy`
2. Test language switching as guest user
3. Test language switching as authenticated user
4. Implement locale-aware email templates
5. Add analytics tracking for language changes

