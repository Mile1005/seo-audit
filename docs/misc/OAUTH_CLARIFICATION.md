# 🔐 OAuth Setup Clarification - Same Client, Different Callbacks

## ✅ You're Correct! Same OAuth Client

Your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are used for **BOTH**:
1. **NextAuth Login** - When users click "Sign in with Google"
2. **GSC Integration** - When users connect Google Search Console

---

## 🎯 How It Works (Different Redirect URIs)

```
┌─────────────────────────────────────────────────────────┐
│         Google OAuth 2.0 Client                          │
│         (GOOGLE_CLIENT_ID: your-client-id)              │
└─────────────────────────────────────────────────────────┘
                          │
                          │ Has Multiple Redirect URIs
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
        ▼                                   ▼
┌──────────────────┐              ┌──────────────────┐
│  NextAuth Login  │              │ GSC Integration  │
│                  │              │                  │
│  Redirect URI:   │              │  Redirect URI:   │
│  /api/auth/      │              │  /api/gsc/       │
│  callback/google │              │  callback        │
└──────────────────┘              └──────────────────┘
```

---

## 📋 What You Need to Add (Safe!)

### Current Setup (Don't Delete These!)
Your OAuth client **already has** these redirect URIs for login:
```
✅ https://www.aiseoturbo.com/api/auth/callback/google
✅ http://localhost:3000/api/auth/callback/google
```

### Add These New URIs (For GSC)
```
➕ https://www.aiseoturbo.com/api/gsc/callback
➕ http://localhost:3000/api/gsc/callback
```

### Final Configuration
```
Your Google OAuth Client should have:

Authorized redirect URIs:
  1. https://www.aiseoturbo.com/api/auth/callback/google    ← Login (existing)
  2. https://www.aiseoturbo.com/api/gsc/callback            ← GSC (new)
  3. http://localhost:3000/api/auth/callback/google         ← Local login
  4. http://localhost:3000/api/gsc/callback                 ← Local GSC
```

---

## 🔒 Why This is Safe

✅ **Login Won't Break** - NextAuth uses `/api/auth/callback/google`  
✅ **GSC Will Work** - GSC integration uses `/api/gsc/callback`  
✅ **Same Scopes** - Both use Google APIs with different scopes:
   - Login: `profile`, `email`
   - GSC: `webmasters.readonly`

---

## 🚨 What NOT to Do

❌ **DON'T** delete existing redirect URIs  
❌ **DON'T** create a new OAuth client (unnecessary)  
❌ **DON'T** change the Client ID or Secret  

---

## ✅ Step-by-Step (Safe Instructions)

### 1. Open Google Cloud Console
- Go to: https://console.cloud.google.com/
- Navigate to: **APIs & Services** → **Credentials**

### 2. Find Your OAuth Client
- Look for "OAuth 2.0 Client IDs"
- Find the one with your `GOOGLE_CLIENT_ID`
- Click the **pencil icon** (edit)

### 3. Check Existing URIs
You should see something like:
```
Authorized redirect URIs:
  https://www.aiseoturbo.com/api/auth/callback/google
  http://localhost:3000/api/auth/callback/google
```

### 4. Click "ADD URI" Button
Add these **TWO** new URIs (one at a time):
```
https://www.aiseoturbo.com/api/gsc/callback
http://localhost:3000/api/gsc/callback
```

### 5. Save
Click **Save** at the bottom

### 6. Wait 5 Minutes
Google needs time to propagate the changes

---

## 🧪 Test Both Features Work

### Test 1: Login (Should Still Work)
1. Go to: https://www.aiseoturbo.com/login
2. Click "Sign in with Google"
3. ✅ Should work normally

### Test 2: GSC Connection (New)
1. Go to: https://www.aiseoturbo.com/dashboard
2. Click "Connect" in Google Integration section
3. ✅ Should redirect to Google OAuth consent screen
4. Grant permissions
5. ✅ Should redirect back with "Connected" status

---

## 🎯 Summary

**Q:** Will adding GSC redirect URI break my login?  
**A:** **NO!** They use different callback URLs. Both will work.

**Q:** Do I need a separate OAuth client?  
**A:** **NO!** Same client can handle multiple redirect URIs.

**Q:** What if something breaks?  
**A:** Just remove the GSC URIs - login will still work with the original URIs.

---

**You're good to go!** Just **ADD** the new URIs, don't **DELETE** the old ones! 🚀
