# Deploy Auth Backend to Render - Quick Start

## Prerequisites

- Render account (https://render.com)
- GitHub repository access
- Google OAuth credentials
- 10 minutes

---

## Step 1: Create Render Web Service

1. **Go to Render Dashboard**
   - https://dashboard.render.com/

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `siddharthharshraj/avni17nov`
   - Click "Connect"

3. **Configure Service**
   ```
   Name: avni-auth-backend
   Environment: Node
   Region: Oregon (US West)
   Branch: main
   Root Directory: auth-backend
   Build Command: npm install
   Start Command: npm start
   ```

4. **Select Plan**
   - Free tier: OK for testing (sleeps after 15 min)
   - Starter ($7/month): Recommended for production

---

## Step 2: Add Environment Variables

Click "Environment" tab and add these variables:

```bash
GOOGLE_CLIENT_ID=152025843952-22rf9320v2li40etup46kerkp50h1s6p.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=<GET_FROM_GOOGLE_CONSOLE>
JWT_SECRET=<GENERATE_STRONG_32_CHAR_SECRET>
FRONTEND_URL=https://avni-2.netlify.app
BACKEND_URL=https://avni-auth-backend.onrender.com
ALLOWED_DOMAIN=samanvayfoundation.org
ADMIN_EMAILS=arjunk@samanvayfoundation.org,siddharthr@samanvayfoundation.org,vinayv@samanvayfoundation.org
NODE_ENV=production
PORT=10000
```

**How to get GOOGLE_CLIENT_SECRET:**
1. Go to https://console.cloud.google.com/
2. Select your project
3. APIs & Services → Credentials
4. Click your OAuth 2.0 Client ID
5. Copy "Client secret"

**How to generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Step 3: Deploy

1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. Note your Render URL: `https://avni-auth-backend.onrender.com`

---

## Step 4: Update Google OAuth

1. **Go to Google Cloud Console**
   - https://console.cloud.google.com/
   - Select your project

2. **Update OAuth Client**
   - APIs & Services → Credentials
   - Click your OAuth 2.0 Client ID
   - Under "Authorized redirect URIs", add:
     ```
     https://avni-auth-backend.onrender.com/auth/google/callback
     ```
   - Click "Save"

---

## Step 5: Update Netlify

1. **Go to Netlify Dashboard**
   - https://app.netlify.com/
   - Select your site (avni-2)

2. **Add Environment Variables**
   - Site settings → Environment variables
   - Add:
     ```
     AUTH_BACKEND_URL=https://avni-auth-backend.onrender.com
     NEXT_PUBLIC_AUTH_BACKEND_URL=https://avni-auth-backend.onrender.com
     ```

3. **Trigger Redeploy**
   - Deploys → Trigger deploy → Deploy site
   - Wait 3-5 minutes

---

## Step 6: Test

### Test Backend Health
```bash
curl https://avni-auth-backend.onrender.com/health
```
Expected: `{"status":"ok",...}`

### Test Login Flow
1. Visit: https://avni-2.netlify.app/cms
2. Click "Sign in with Google"
3. Login with @samanvayfoundation.org email
4. Should redirect to dashboard

### Test Session
```bash
curl https://avni-2.netlify.app/api/auth/session
```
Expected: `{"user":{...}}` (if logged in) or `{"error":"Not authenticated"}` (if not)

---

## Troubleshooting

### Backend Not Responding
- Check Render logs: Dashboard → Your Service → Logs
- Verify all environment variables are set
- Check build logs for errors

### OAuth Redirect Fails
- Verify redirect URI in Google Console exactly matches
- Check `BACKEND_URL` environment variable
- Ensure no trailing slashes

### "Unauthorized domain" Error
- User email must end with @samanvayfoundation.org
- Check `ALLOWED_DOMAIN` environment variable

### Session Not Persisting
- Check browser cookies (DevTools → Application → Cookies)
- Verify `cms_session` cookie exists
- Check cookie domain is `.netlify.app`

---

## Monitoring

**Render Dashboard:**
- Logs: Real-time server logs
- Metrics: CPU, memory, response times
- Alerts: Set up email notifications

**Health Check:**
Set up external monitoring (e.g., UptimeRobot):
- URL: https://avni-auth-backend.onrender.com/health
- Interval: 5 minutes

---

## Cost

**Free Tier:**
- 750 hours/month
- Sleeps after 15 min inactivity
- Cold start: ~30 seconds

**Starter Plan ($7/month):**
- No sleep
- Always available
- Faster response times
- **Recommended for production**

---

## Support

**Issues?**
- Check Render logs first
- Review RENDER_AUTH_MIGRATION.md
- Test endpoints with curl
- Verify environment variables

**Success Criteria:**
✅ Backend health check returns 200
✅ Google login redirects correctly
✅ Session persists after refresh
✅ No 401 errors after login
✅ Dashboard loads successfully

---

## Next Steps

After successful deployment:

1. **Monitor for 24 hours**
   - Check Render logs for errors
   - Test login multiple times
   - Verify session persistence

2. **Consider Upgrading**
   - Free tier sleeps (cold starts)
   - Starter plan recommended for production

3. **Set Up Alerts**
   - Render: Email notifications for downtime
   - External: UptimeRobot or similar

4. **Document Credentials**
   - Save environment variables securely
   - Document Google OAuth setup
   - Keep JWT_SECRET backed up

---

**Deployment Complete!** 🚀

Your authentication is now running on a dedicated backend, solving Netlify limitations permanently.
