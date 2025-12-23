# Avni CMS Authentication Backend

Dedicated Express.js backend for Google OAuth authentication, deployed on Render.

## Purpose

This backend handles all authentication logic for the Avni CMS, solving Netlify serverless limitations with OAuth flows.

## Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────┐
│  Netlify        │         │  Render Backend  │         │   Google    │
│  (Frontend)     │────────▶│  (Auth Server)   │────────▶│   OAuth     │
│                 │         │                  │         │             │
│  - UI only      │         │  - OAuth flow    │         │  - Identity │
│  - Login button │         │  - JWT creation  │         │  - Verify   │
│  - Token store  │◀────────│  - User validate │◀────────│             │
└─────────────────┘         └──────────────────┘         └─────────────┘
```

## Endpoints

### `GET /health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "service": "avni-auth-backend",
  "timestamp": "2025-12-24T00:00:00.000Z"
}
```

### `GET /auth/google`
Initiates Google OAuth flow. Redirects user to Google login.

**Usage:**
```html
<a href="https://your-backend.onrender.com/auth/google">
  Sign in with Google
</a>
```

### `GET /auth/google/callback`
Handles Google OAuth callback.

**Flow:**
1. Validates user email domain (@samanvayfoundation.org)
2. Determines user role (admin or author)
3. Creates JWT token
4. Sets HttpOnly cookie
5. Redirects to frontend dashboard

**Success:** Redirects to `https://avni-2.netlify.app/cms/dashboard?auth=success`  
**Failure:** Redirects to `https://avni-2.netlify.app/cms?error=auth_failed`

### `GET /auth/me`
Returns authenticated user information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```
OR cookie: `cms_session=<jwt_token>`

**Response (200):**
```json
{
  "user": {
    "email": "user@samanvayfoundation.org",
    "name": "User Name",
    "picture": "https://...",
    "role": "admin"
  }
}
```

**Response (401):**
```json
{
  "error": "Not authenticated"
}
```

### `POST /auth/logout`
Clears authentication cookie.

**Response:**
```json
{
  "success": true
}
```

## Environment Variables

Required on Render:

```bash
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
JWT_SECRET=your-jwt-secret-min-32-chars
FRONTEND_URL=https://avni-2.netlify.app
BACKEND_URL=https://your-app.onrender.com
ALLOWED_DOMAIN=samanvayfoundation.org
ADMIN_EMAILS=email1@samanvayfoundation.org,email2@samanvayfoundation.org
NODE_ENV=production
PORT=10000
```

## Local Development

1. **Install dependencies:**
   ```bash
   cd auth-backend
   npm install
   ```

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Run server:**
   ```bash
   npm run dev
   ```

4. **Test endpoints:**
   ```bash
   curl http://localhost:10000/health
   ```

## Deployment to Render

### 1. Create New Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select `auth-backend` directory as root

### 2. Configure Service

**Settings:**
- **Name:** `avni-auth-backend`
- **Environment:** `Node`
- **Region:** Choose closest to users
- **Branch:** `main`
- **Root Directory:** `auth-backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Instance Type:** Free or Starter

### 3. Add Environment Variables

Add all variables from `.env.example` with production values.

**Critical:**
- `BACKEND_URL` must match your Render URL: `https://avni-auth-backend.onrender.com`
- `FRONTEND_URL` must be: `https://avni-2.netlify.app`
- `JWT_SECRET` must be strong (32+ characters)

### 4. Deploy

Click "Create Web Service" and wait for deployment.

### 5. Update Google OAuth

In [Google Cloud Console](https://console.cloud.google.com/):

1. Go to APIs & Services → Credentials
2. Edit your OAuth 2.0 Client ID
3. Add to **Authorized redirect URIs:**
   ```
   https://avni-auth-backend.onrender.com/auth/google/callback
   ```
4. Save

## Security

✅ **Email Domain Restriction:** Only @samanvayfoundation.org  
✅ **HttpOnly Cookies:** Prevents XSS attacks  
✅ **Secure Cookies:** HTTPS only in production  
✅ **SameSite:** CSRF protection  
✅ **JWT Expiry:** 7 days  
✅ **No Secrets Logged:** Clean error handling  

## Troubleshooting

### "Unauthorized domain" error
- Check `ALLOWED_DOMAIN` environment variable
- Verify user email ends with correct domain

### "Invalid or expired token" error
- Token expired (7 days)
- JWT_SECRET mismatch
- Clear cookies and login again

### OAuth redirect fails
- Verify `BACKEND_URL` matches Render URL
- Check Google OAuth redirect URI configuration
- Ensure no trailing slashes in URLs

### CORS errors
- Verify `FRONTEND_URL` matches Netlify URL
- Check CORS configuration in server.js

## Testing

### Test Health Check
```bash
curl https://avni-auth-backend.onrender.com/health
```

### Test Auth Flow
1. Visit: `https://avni-auth-backend.onrender.com/auth/google`
2. Login with @samanvayfoundation.org email
3. Should redirect to Netlify dashboard

### Test Auth Endpoint
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://avni-auth-backend.onrender.com/auth/me
```

## Monitoring

Render provides:
- **Logs:** Real-time server logs
- **Metrics:** CPU, memory, response times
- **Alerts:** Downtime notifications

Access via Render Dashboard → Your Service → Logs/Metrics

## Support

For issues or questions, contact the Samanvay Foundation tech team.
