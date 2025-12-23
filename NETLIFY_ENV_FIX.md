# 🚨 URGENT: Fix Authentication Error

## Problem
"Authentication failed" error when clicking "Sign in with Google"

## Root Cause
The Google Client ID is not accessible to the client-side code because it's missing the `NEXT_PUBLIC_` prefix.

## Solution

### **Add to Netlify Environment Variables**

Go to **Netlify Dashboard → Site settings → Environment variables** and add:

**Variable:**
- **Key**: `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- **Value**: `152025843952-22rf9320v2li40etup46kerkp50h1s6p.apps.googleusercontent.com`
- **Scopes**: All scopes

### **Why This is Needed**

Next.js requires environment variables used in **client-side code** (browser) to be prefixed with `NEXT_PUBLIC_`.

- `GOOGLE_CLIENT_ID` - Used by server-side API routes ✅
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` - Used by client-side login button ❌ (MISSING)

Without this, the Google OAuth button can't initialize properly, causing "Authentication failed".

### **After Adding**

1. Save the environment variable in Netlify
2. Trigger a new deploy (or wait for auto-deploy)
3. Try logging in again - should work! ✅

---

## Complete Environment Variables Needed

Make sure you have ALL of these in Netlify:

```bash
# Server-side only
GOOGLE_CLIENT_ID=your-google-client-id
UPSTASH_REDIS_URL=your-redis-url
UPSTASH_REDIS_TOKEN=your-redis-token
GITHUB_TOKEN=your-github-token
CMS_ADMIN_EMAILS=admin@samanvayfoundation.org
JWT_SECRET=your-jwt-secret-min-32-chars
CLEANUP_SECRET=your-cleanup-secret-min-32-chars

# Client-side (NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

---

## Testing

After adding the variable and deploying:

1. Visit `https://your-site.netlify.app/cms`
2. Click "Sign in with Google"
3. Google OAuth popup should appear
4. Login with @samanvayfoundation.org email
5. Should redirect to dashboard ✅

If it still fails, check browser console for errors.
