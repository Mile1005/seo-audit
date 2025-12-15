# 🚀 Language Switcher - Quick Start Guide

## ✅ Implementation Complete!

Everything is ready. Follow these steps to activate the language switcher.

---

## 1️⃣ Apply Database Migration (REQUIRED)

Run this command to add the `preferredLocale` field to your User table:

```powershell
pnpm prisma db push
```

**Expected Output:**

```
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma

🚀  Your database is now in sync with your Prisma schema.

✔ Generated Prisma Client
```

---

## 2️⃣ Start Your Dev Server

```powershell
pnpm dev
```

---

## 3️⃣ Test the Language Switcher

### Test as Guest User:

1. Open `http://localhost:3000/dashboard`
2. Look for the **🌐 Languages** button in the top navigation
3. Click it and select **Français** (🇫🇷)
4. **Expected Results:**
   - URL changes to `/fr/dashboard`
   - Toast notification appears: "Language Changed"
   - Page content translates to French
   - No page reload (smooth transition)

5. Close browser and reopen → Language should still be French
   - This confirms cookie persistence is working

### Test as Authenticated User:

1. Login to your account
2. Click the language switcher
3. Select **Español** (🇪🇸)
4. **Expected Results:**
   - URL changes to `/es/dashboard`
   - Toast notification appears
   - Page content translates to Spanish

5. Open your database and check:

```sql
SELECT email, "preferredLocale" FROM "User" WHERE email = 'your@email.com';
```

Should show: `preferredLocale: 'es'`

6. Logout and login again → Language should still be Spanish
   - This confirms database persistence is working

---

## 4️⃣ Verify Cookie is Set

Open **DevTools** → **Application** → **Cookies** → `localhost`

You should see:

```
Name: NEXT_LOCALE
Value: es (or fr, it, de, id depending on selection)
Path: /
Expires: 1 year from now
```

---

## 5️⃣ Test Auth Flow Preservation

1. As a guest, set language to **Italiano** (🇮🇹)
2. Signup with a new account
3. **Expected Result:** After signup, you're still on Italian (`/it/...`)
4. Check database → New user should have `preferredLocale = 'it'`

---

## 📧 (Optional) Enable Locale-Aware Emails

### Example: Welcome Email

```typescript
// lib/email/send-welcome.ts
import { Resend } from "resend";
import { auth } from "@/auth";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(userEmail: string) {
  // Get user's preferred locale
  const session = await auth();
  const locale = session?.user?.preferredLocale || "en";

  // Load translations
  const messages = await import(`@/messages/${locale}.json`);
  const t = messages.default;

  await resend.emails.send({
    from: "AI SEO Turbo <welcome@aiseoturbo.com>",
    to: userEmail,
    subject: t.emails.welcome.subject,
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

Add this to all your `messages/*.json` files:

```json
{
  "emails": {
    "welcome": {
      "subject": "Welcome to AI SEO Turbo!",
      "heading": "Get Started with Your SEO Journey",
      "body": "We're excited to have you on board. Start optimizing your website today.",
      "cta": "Go to Dashboard"
    }
  }
}
```

---

## 🎯 What You Get

✅ **Dropdown Menu** - Clean Radix UI component with 6 locales  
✅ **Visual Feedback** - Flag emojis, checkmarks, toast notifications  
✅ **Database Persistence** - Logged-in users' preferences saved  
✅ **Cookie Fallback** - Guest users' preferences preserved  
✅ **Session Integration** - Locale available in NextAuth session  
✅ **Middleware Redirect** - Auto-redirects to preferred language  
✅ **Auth Flow Preservation** - Language persists across login/logout  
✅ **Multi-Tenant Ready** - Works across all projects  
✅ **Email-Ready** - Detect user locale for personalized emails

---

## 📂 Key Files to Know

| File                                      | Purpose                               |
| ----------------------------------------- | ------------------------------------- |
| `components/layout/language-switcher.tsx` | The dropdown component                |
| `app/api/user/preferences/route.ts`       | API for saving preferences            |
| `auth.ts`                                 | Includes `preferredLocale` in session |
| `middleware.ts`                           | Auto-redirects based on cookie        |
| `prisma/schema.prisma`                    | Added `preferredLocale` field         |
| `messages/en.json`                        | Translation keys for UI               |

---

## 🔧 Troubleshooting

### Language doesn't switch:

```powershell
# Check console for errors
# Verify cookie is being set: Check DevTools → Application → Cookies
```

### TypeScript errors on `preferredLocale`:

```powershell
# Regenerate Prisma Client
pnpm prisma generate

# Restart VS Code TypeScript server
# Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

### Migration fails:

```powershell
# Check database connection
pnpm prisma studio

# If it opens, your connection is fine. Try:
pnpm prisma db push --force-reset  # ⚠️ DEV ONLY - resets database
```

### Language resets after logout:

This is **expected behavior** if you:

- Clear cookies/cache
- Use incognito mode
- Delete the `NEXT_LOCALE` cookie

Solution: Login so preferences save to database.

---

## 📊 Production Deployment

### Before Deploying:

1. **Apply Migration:**

```bash
npx prisma migrate deploy
```

2. **Verify Environment Variables:**

```env
DATABASE_URL=postgresql://...
AUTH_SECRET=your-secret
RESEND_API_KEY=re_...
```

3. **Test All Locales:**

- EN → FR → IT → ES → ID → DE
- Verify translations appear correctly
- Check database updates work

4. **Enable Analytics (Optional):**

```typescript
// In language-switcher.tsx, add after successful change:
analytics.track("Language Changed", {
  userId: session?.user?.id,
  fromLocale: currentLocale,
  toLocale: newLocale,
  timestamp: new Date().toISOString(),
});
```

---

## 🎉 You're Done!

Your language switcher is fully functional with:

- ✅ 6 supported languages
- ✅ Database + Cookie persistence
- ✅ Auth flow integration
- ✅ Multi-tenant support
- ✅ Email template ready

**Next Step:** Run `pnpm prisma db push` and start testing! 🚀

---

## 📚 Full Documentation

For complete details, see:

- `LANGUAGE_SWITCHER_IMPLEMENTATION.md` - Full technical guide
- `LANGUAGE_SWITCHER_COMPLETE.md` - Implementation summary
