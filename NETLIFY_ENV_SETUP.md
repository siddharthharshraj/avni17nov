# Netlify Environment Variables Setup

## 🚨 Required for CMS to Work

Add these environment variables in **Netlify Dashboard → Site settings → Environment variables**:

### **CMS-Specific Variables (MISSING)**

```bash
# Upstash Redis for CMS (different from URL shortener)
UPSTASH_REDIS_URL=https://worthy-chicken-33115.upstash.io
UPSTASH_REDIS_TOKEN=AYFbAAIncDI3ZWNiOTk5YWU0NTc0ZjkxOWJmMGViMWU5OTljZDE0NHAyMzMxMTU
```

### **Already Configured ✅**

These are already in Netlify:
- ✅ CLEANUP_SECRET
- ✅ CMS_ADMIN_EMAILS
- ✅ FORMSPREE_FORM_ID
- ✅ GITHUB_OWNER
- ✅ GITHUB_PROJECT_NUMBER
- ✅ GITHUB_TOKEN
- ✅ GOOGLE_CLIENT_ID
- ✅ GOOGLE_SERVICE_ACCOUNT_EMAIL
- ✅ GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
- ✅ JWT_SECRET
- ✅ MAILCHIMP_API_KEY
- ✅ MAILCHIMP_AUDIENCE_ID
- ✅ MAILCHIMP_SERVER_PREFIX
- ✅ NEXT_PUBLIC_GA_MEASUREMENT_ID
- ✅ UMAMI_API_URL
- ✅ UMAMI_WEBSITE_ID
- ✅ UPSTASH_REDIS_REST_TOKEN (for URL shortener)
- ✅ UPSTASH_REDIS_REST_URL (for URL shortener)

---

## 📝 Why Two Sets of Redis Variables?

**URL Shortener** uses:
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

**CMS** uses:
- `UPSTASH_REDIS_URL` (same value as REST_URL)
- `UPSTASH_REDIS_TOKEN` (same value as REST_TOKEN)

Both point to the **same Redis database** but use different variable names.

---

## 🔧 How to Add Missing Variables

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Select your site
3. **Site settings** → **Environment variables**
4. Click **Add a variable**
5. Add each variable:

### Variable 1:
- **Key**: `UPSTASH_REDIS_URL`
- **Value**: `https://worthy-chicken-33115.upstash.io`
- **Scopes**: All scopes

### Variable 2:
- **Key**: `UPSTASH_REDIS_TOKEN`
- **Value**: `AYFbAAIncDI3ZWNiOTk5YWU0NTc0ZjkxOWJmMGViMWU5OTljZDE0NHAyMzMxMTU`
- **Scopes**: All scopes

6. Click **Save**
7. **Trigger a new deploy** (or wait for auto-deploy)

---

## ✅ After Adding Variables

The build should succeed and you'll be able to:
- Access CMS at: `https://your-site.netlify.app/cms`
- Login with Google OAuth
- Create and publish blogs
- View analytics
- View audit trail

---

## 🐛 If Build Still Fails

Check the build logs for the actual error:
1. Netlify Dashboard → Deploys → Click failed deploy
2. Scroll to find the actual error (not just "exit code 1")
3. Look for TypeScript errors or missing imports

Common issues:
- Missing environment variables (now fixed)
- TypeScript compilation errors
- Import path issues
- Missing dependencies
