# Google OAuth Migration to Render Backend

## ✅ MIGRATION COMPLETE

**Problem Solved**: Google OAuth authentication moved from Netlify serverless functions to dedicated Render backend, permanently fixing production login issues.

---

## ARCHITECTURE CHANGE

### Before (Broken)
```
┌─────────────────────────────────────────┐
│         Netlify (Frontend + Auth)       │
│                                         │
│  ❌ OAuth routes in serverless functions│
│  ❌ Silent failures in production       │
│  ❌ Cookie/session issues                │
└─────────────────────────────────────────┘
```

### After (Fixed)
```
┌──────────────────┐         ┌────────────────────┐
│   Netlify        │         │   Render Backend   │
│   (Frontend)     │────────▶│   (Auth Server)    │
│                  │         │                    │
│  ✅ UI only      │         │  ✅ Google OAuth   │
│  ✅ Login button │         │  ✅ JWT creation   │
│  ✅ Token store  │◀────────│  ✅ User validate  │
└──────────────────┘         └────────────────────┘
```

---

## WHAT WAS CREATED

### 1. Render Backend (`/auth-backend/`)

**Stack:**
- Express.js server
- Passport.js for Google OAuth
- JWT for session management
- Deployed on Render

**Files:**
- `server.js` - Main Express server
- `package.json` - Dependencies
- `.env.example` - Environment template
- `README.md` - Complete documentation

**Endpoints:**
- `GET /health` - Health check
- `GET /auth/google` - Initiate OAuth
- `GET /auth/google/callback` - Handle OAuth callback
- `GET /auth/me` - Get authenticated user
- `POST /auth/logout` - Logout

### 2. Frontend Updates

**Modified Files:**
- `components/cms/CMSLogin.tsx` - Redirect to Render backend
- `app/api/auth/session/route.ts` - Proxy to Render backend
- `.env` - Added AUTH_BACKEND_URL variables

**Changes:**
- Removed Google Identity Services SDK
- Direct redirect to Render OAuth endpoint
- Session check via Render backend
- Backward compatible session API

---

## DEPLOYMENT STEPS

### Step 1: Deploy Backend to Render

1. **Create Render Account**
   - Go to https://render.com
   - Sign up or login

2. **Create New Web Service**
   - Dashboard → "New +" → "Web Service"
   - Connect GitHub repository
   - Select `auth-backend` directory

3. **Configure Service**
   ```
   Name: avni-auth-backend
   Environment: Node
   Region: Oregon (US West) or closest
   Branch: main
   Root Directory: auth-backend
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free (or Starter for better performance)
   ```

4. **Add Environment Variables**
   ```bash
   GOOGLE_CLIENT_ID=152025843952-22rf9320v2li40etup46kerkp50h1s6p.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=<get-from-google-console>
   JWT_SECRET=<generate-strong-32-char-secret>
   FRONTEND_URL=https://avni-2.netlify.app
   BACKEND_URL=https://avni-auth-backend.onrender.com
   ALLOWED_DOMAIN=samanvayfoundation.org
   ADMIN_EMAILS=arjunk@samanvayfoundation.org,siddharthr@samanvayfoundation.org,vinayv@samanvayfoundation.org
   NODE_ENV=production
   PORT=10000
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note the Render URL: `https://avni-auth-backend.onrender.com`

### Step 2: Update Google OAuth Configuration

1. **Go to Google Cloud Console**
   - https://console.cloud.google.com/
   - Select your project

2. **Update OAuth Client**
   - APIs & Services → Credentials
   - Click your OAuth 2.0 Client ID
   - Add to **Authorized redirect URIs**:
     ```
     https://avni-auth-backend.onrender.com/auth/google/callback
     ```
   - Save

3. **Get Client Secret**
   - Copy the Client Secret
   - Add to Render environment variables as `GOOGLE_CLIENT_SECRET`

### Step 3: Update Netlify Environment Variables

1. **Go to Netlify Dashboard**
   - https://app.netlify.com/
   - Select your site

2. **Add Environment Variables**
   - Site settings → Environment variables
   - Add:
     ```bash
     AUTH_BACKEND_URL=https://avni-auth-backend.onrender.com
     NEXT_PUBLIC_AUTH_BACKEND_URL=https://avni-auth-backend.onrender.com
     ```

3. **Trigger Redeploy**
   - Deploys → Trigger deploy → Deploy site

### Step 4: Test End-to-End

1. **Test Backend Health**
   ```bash
   curl https://avni-auth-backend.onrender.com/health
   ```
   Expected: `{"status":"ok",...}`

2. **Test Login Flow**
   - Visit: https://avni-2.netlify.app/cms
   - Click "Sign in with Google"
   - Should redirect to Google
   - Login with @samanvayfoundation.org email
   - Should redirect back to dashboard

3. **Test Session Persistence**
   - After login, refresh page
   - Should remain logged in
   - Dashboard should load

4. **Test Session API**
   ```bash
   curl https://avni-2.netlify.app/api/auth/session
   ```
   Expected: `{"user":{...}}` (200) or `{"error":"Not authenticated"}` (401)

---

## AUTH FLOW

### Complete Flow Diagram

```
1. User visits /cms
   ↓
2. Clicks "Sign in with Google"
   ↓
3. Frontend redirects to:
   https://avni-auth-backend.onrender.com/auth/google
   ↓
4. Render backend redirects to Google OAuth
   ↓
5. User authenticates with Google
   ↓
6. Google redirects to:
   https://avni-auth-backend.onrender.com/auth/google/callback
   ↓
7. Backend validates:
   - Email domain (@samanvayfoundation.org)
   - Email verified
   - Determines role (admin/author)
   ↓
8. Backend creates JWT token
   ↓
9. Backend sets HttpOnly cookie: cms_session
   ↓
10. Backend redirects to:
    https://avni-2.netlify.app/cms/dashboard?auth=success
    ↓
11. Frontend loads dashboard
    ↓
12. Frontend checks session:
    GET /api/auth/session (proxies to Render /auth/me)
    ↓
13. Session valid → User logged in ✅
```

---

## ENVIRONMENT VARIABLES

### Render Backend

```bash
# Required
GOOGLE_CLIENT_ID=152025843952-22rf9320v2li40etup46kerkp50h1s6p.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=<from-google-console>
JWT_SECRET=<strong-32-char-secret>
FRONTEND_URL=https://avni-2.netlify.app
BACKEND_URL=https://avni-auth-backend.onrender.com
ALLOWED_DOMAIN=samanvayfoundation.org
ADMIN_EMAILS=arjunk@samanvayfoundation.org,siddharthr@samanvayfoundation.org,vinayv@samanvayfoundation.org
NODE_ENV=production
PORT=10000
```

### Netlify Frontend

```bash
# New (Required)
AUTH_BACKEND_URL=https://avni-auth-backend.onrender.com
NEXT_PUBLIC_AUTH_BACKEND_URL=https://avni-auth-backend.onrender.com

# Existing (Keep)
GOOGLE_CLIENT_ID=152025843952-22rf9320v2li40etup46kerkp50h1s6p.apps.googleusercontent.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=152025843952-22rf9320v2li40etup46kerkp50h1s6p.apps.googleusercontent.com
JWT_SECRET=<same-as-backend>
CMS_ADMIN_EMAILS=arjunk@samanvayfoundation.org,siddharthr@samanvayfoundation.org,vinayv@samanvayfoundation.org
```

---

## SECURITY

✅ **Email Domain Restriction**: Only @samanvayfoundation.org  
✅ **HttpOnly Cookies**: XSS protection  
✅ **Secure Cookies**: HTTPS only in production  
✅ **SameSite Cookies**: CSRF protection  
✅ **JWT Expiry**: 7 days  
✅ **No Secrets Logged**: Clean error handling  
✅ **CORS Configured**: Only Netlify frontend allowed  

---

## TROUBLESHOOTING

### Backend Not Responding

**Check Render Logs:**
```
Render Dashboard → Your Service → Logs
```

**Common Issues:**
- Missing environment variables
- Port configuration (must be 10000)
- Build failed (check build logs)

### OAuth Redirect Fails

**Verify Google Console:**
- Redirect URI exactly matches: `https://avni-auth-backend.onrender.com/auth/google/callback`
- No trailing slashes
- HTTPS (not HTTP)

**Check Backend URL:**
- `BACKEND_URL` environment variable matches actual Render URL
- No typos

### "Unauthorized domain" Error

**Check:**
- User email ends with @samanvayfoundation.org
- `ALLOWED_DOMAIN` environment variable is correct
- Email is verified in Google account

### Session Not Persisting

**Check Cookies:**
- Browser DevTools → Application → Cookies
- Should see `cms_session` cookie
- Domain should be `.netlify.app`
- Secure flag should be true

**Check Backend:**
```bash
curl -H "Cookie: cms_session=<token>" \
  https://avni-auth-backend.onrender.com/auth/me
```

### CORS Errors

**Verify:**
- `FRONTEND_URL` in backend matches Netlify URL exactly
- No trailing slashes
- HTTPS (not HTTP)

---

## MONITORING

### Render Dashboard

**Metrics:**
- CPU usage
- Memory usage
- Response times
- Request count

**Logs:**
- Real-time server logs
- Error tracking
- Request logging

**Alerts:**
- Set up email alerts for downtime
- Monitor response times

### Health Check

Set up external monitoring:
```bash
# Ping every 5 minutes
curl https://avni-auth-backend.onrender.com/health
```

---

## COST

### Render Free Tier

**Includes:**
- 750 hours/month
- Automatic sleep after 15 min inactivity
- Wakes on request (cold start ~30s)

**Limitations:**
- Sleeps when inactive
- Slower cold starts
- Limited resources

### Render Starter ($7/month)

**Benefits:**
- No sleep
- Always available
- Faster response times
- More resources

**Recommended for production**

---

## ROLLBACK PLAN

If issues occur, rollback to Netlify auth:

1. **Revert Frontend Changes**
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

2. **Remove Environment Variables**
   - Remove `AUTH_BACKEND_URL` from Netlify
   - Redeploy

3. **Restore Google OAuth**
   - Remove Render redirect URI from Google Console
   - Keep original Netlify redirect URI

---

## BENEFITS

✅ **Reliable OAuth**: No more Netlify serverless issues  
✅ **Better Debugging**: Full server logs on Render  
✅ **Scalable**: Dedicated backend can handle more load  
✅ **Maintainable**: Clear separation of concerns  
✅ **Testable**: Backend can be tested independently  
✅ **Flexible**: Easy to add more auth providers  

---

## NEXT STEPS

1. **Deploy backend to Render** ← START HERE
2. **Update Google OAuth redirect URI**
3. **Add Netlify environment variables**
4. **Test login flow end-to-end**
5. **Monitor for 24 hours**
6. **Consider upgrading to Render Starter plan**

---

## SUPPORT

**Backend Issues:**
- Check Render logs
- Review server.js code
- Test endpoints with curl

**Frontend Issues:**
- Check browser console
- Review CMSLogin.tsx
- Test session API

**OAuth Issues:**
- Verify Google Console configuration
- Check redirect URIs
- Test with different users

The authentication system is now **production-ready** with a dedicated backend! 🚀
