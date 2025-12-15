# 🔧 GSC OAuth Fix - Google Cloud Console Setup

## ⚠️ IMPORTANT: Using Same OAuth Client for Login AND GSC

**You're using ONE OAuth client for TWO purposes:**

1. ✅ NextAuth login (existing)
2. ✅ Google Search Console integration (new)

**This is FINE!** You just need to add an **additional redirect URI** to your **existing** OAuth client.

---

## ✅ What Was Fixed

**Problem:** Google OAuth was returning 400 error due to redirect URI mismatch

**Root Cause:**

- Old hardcoded redirect URI: `https://seo-audit-seven.vercel.app/api/auth/gsc/callback`
- Should be: `https://www.aiseoturbo.com/api/gsc/callback`

**Solution Applied:**

- ✅ Changed to use `NEXTAUTH_URL` environment variable
- ✅ Fixed callback path from `/api/auth/gsc/callback` to `/api/gsc/callback`
- ✅ Added `prompt: "consent"` to force refresh token
- ✅ Improved logging to show generated URL

---

## 🔑 Google Cloud Console Setup (SAFE - WON'T BREAK LOGIN)

### **Step 1: Go to Google Cloud Console**

1. Visit: https://console.cloud.google.com/
2. Select your project
3. Go to **APIs & Services** → **Credentials**

### **Step 2: Find Your OAuth Client**

1. Find the OAuth 2.0 Client ID you're using
2. Click on it to edit

### **Step 3: Add New Redirect URI (Keep Existing Ones!)**

**IMPORTANT:** You should already have this URI for NextAuth login:

```
https://www.aiseoturbo.com/api/auth/callback/google
```

**ADD this new one (for GSC integration):**

```
https://www.aiseoturbo.com/api/gsc/callback
```

**Your final list should have BOTH:**

```
✅ https://www.aiseoturbo.com/api/auth/callback/google  (NextAuth login)
✅ https://www.aiseoturbo.com/api/gsc/callback          (GSC integration)
✅ http://localhost:3000/api/auth/callback/google       (Local dev - login)
✅ http://localhost:3000/api/gsc/callback               (Local dev - GSC)
```

**Make sure:**

- ✅ DON'T delete existing URIs (or login will break!)
- ✅ ADD the new GSC callback URI
- ✅ No trailing slashes
- ✅ Exactly matching your domain

### **Step 4: Enable Google Search Console API**

1. Go to **APIs & Services** → **Library**
2. Search for "Google Search Console API"
3. Click **Enable**

---

## 🔍 Verify Vercel Environment Variables

Make sure these are set in Vercel → Your Project → Settings → Environment Variables:

```bash
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
GSC_REDIRECT_URI=https://www.aiseoturbo.com/api/gsc/callback
NEXTAUTH_URL=https://www.aiseoturbo.com
```

**Important:** After changing environment variables in Vercel, you need to **redeploy**!

---

## 🧪 Testing Steps (After Fix Deploys)

### **Step 1: Wait for Deployment**

- Wait 2-3 minutes for Vercel to deploy the fix
- Check Vercel dashboard for deployment status

### **Step 2: Clear Browser Cache**

- Press `Ctrl + Shift + Delete`
- Clear cached images and files
- Or use incognito mode

### **Step 3: Test Connection**

1. Go to: `https://www.aiseoturbo.com/dashboard`
2. Scroll to "Google Integration" section
3. Click **"Connect"** button
4. **Expected:** Redirected to Google OAuth consent screen
5. **Expected:** URL should start with `https://accounts.google.com/o/oauth2/v2/auth`

### **Step 4: Check Vercel Logs**

Look for these log messages:

```
✅ GSC Auth URL generated successfully
✅ Generated Auth URL: https://accounts.google.com/...
```

### **Step 5: Grant Permissions**

1. Select your Google account
2. Review permissions (Search Console access)
3. Click **"Allow"**
4. **Expected:** Redirected back to `https://www.aiseoturbo.com/dashboard`
5. **Expected:** See "Connected" status with green indicator

---

## ❌ Troubleshooting

### **Error: "Redirect URI mismatch"**

**Solution:**

- Make sure redirect URI in Google Cloud Console exactly matches:
  ```
  https://www.aiseoturbo.com/api/gsc/callback
  ```
- No trailing slash!
- Wait 5 minutes after adding URI (Google needs to propagate changes)

### **Error: "invalid_client"**

**Solution:**

- Check `GOOGLE_CLIENT_ID` in Vercel matches the one in Google Cloud Console
- Check `GOOGLE_CLIENT_SECRET` is correct
- Redeploy after changing environment variables

### **Error: "Access blocked"**

**Solution:**

- Make sure your Google Cloud Console project is verified
- Or add your test email to the OAuth consent screen test users

### **Error: "API has not been used"**

**Solution:**

- Enable Google Search Console API in Google Cloud Console
- Go to APIs & Services → Library → Search Console API → Enable

---

## 📝 What Changed in This Fix

**File: `lib/gsc.ts`**

### Before:

```typescript
const redirectUri =
  process.env.GSC_REDIRECT_URI || "https://seo-audit-seven.vercel.app/api/auth/gsc/callback";
```

### After:

```typescript
const redirectUri = process.env.GSC_REDIRECT_URI || `${process.env.NEXTAUTH_URL}/api/gsc/callback`;
```

### Added:

```typescript
prompt: "consent", // Force consent screen to ensure refresh token
```

---

## ✅ Deployment Checklist

- [x] Code fixed and pushed to GitHub
- [x] Vercel auto-deploy started
- [ ] Google Cloud Console redirect URI added
- [ ] Google Search Console API enabled
- [ ] Vercel environment variables verified
- [ ] Test OAuth flow
- [ ] Verify connection status shows correctly

---

## 🎯 Expected Result After Fix

When you click "Connect":

1. ✅ Page redirects to Google OAuth
2. ✅ You see consent screen
3. ✅ After granting permission, redirected back to dashboard
4. ✅ "Connected" status shows with green indicator
5. ✅ No errors in browser console or Vercel logs

---

## 🆘 If Still Not Working

Share:

1. Screenshot of Google Cloud Console → Authorized redirect URIs
2. Screenshot of Vercel environment variables (hide secrets)
3. Full error message from browser console
4. Vercel logs from the callback request

I'll help debug further! 🔍
