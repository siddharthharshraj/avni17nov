# Avni Blog CMS - Installation Guide

## Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0
- Google Cloud Console account
- Upstash Redis account (free tier)
- GitHub account with repo access
- Netlify account (optional, for deployment)

---

## Step 1: Install Dependencies

```bash
# Install required packages
npm install jose @octokit/rest
```

**New dependencies:**
- `jose` - JWT signing and verification
- `@octokit/rest` - GitHub API client (optional, for enhanced GitHub integration)

---

## Step 2: Set Up Google Authentication

### 2.1 Create OAuth 2.0 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen:
   - User type: **Internal** (for Google Workspace)
   - App name: **Avni Blog CMS**
   - Authorized domains: `samanvayfoundation.org`
6. Create OAuth client:
   - Application type: **Web application**
   - Authorized JavaScript origins:
     - `http://localhost:3000` (development)
     - `https://your-domain.com` (production)
   - Authorized redirect URIs:
     - `http://localhost:3000/cms` (development)
     - `https://your-domain.com/cms` (production)
7. Copy **Client ID** (you'll need this)

### 2.2 Configure Google Workspace Domain Restriction

1. In Google Cloud Console → **APIs & Services** → **OAuth consent screen**
2. Under **Authorized domains**, add: `samanvayfoundation.org`
3. Save changes

---

## Step 3: Set Up Upstash Redis

### 3.1 Create Free Redis Database

1. Go to [Upstash Console](https://console.upstash.com/)
2. Click **Create Database**
3. Choose:
   - Name: `avni-cms`
   - Type: **Regional**
   - Region: Choose closest to your users
   - TLS: **Enabled**
4. Click **Create**

### 3.2 Get Connection Details

1. In database dashboard, copy:
   - **UPSTASH_REDIS_REST_URL**
   - **UPSTASH_REDIS_REST_TOKEN**

**Free tier limits:**
- 10,000 commands/day
- 256 MB storage
- Perfect for CMS with ~20 active users

---

## Step 4: Set Up GitHub Access

### 4.1 Create Personal Access Token

1. Go to [GitHub Settings](https://github.com/settings/tokens)
2. Click **Generate new token** → **Generate new token (classic)**
3. Configure:
   - Note: `Avni CMS Publishing`
   - Expiration: **No expiration** (or set custom)
   - Scopes: Check `repo` (full control of private repositories)
4. Click **Generate token**
5. Copy token immediately (you won't see it again)

### 4.2 Test Repository Access

```bash
# Test with curl
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.github.com/repos/samanvayfoundation/avninew-v2-PROD
```

---

## Step 5: Configure Environment Variables

Create `.env.local` file in project root:

```bash
# Google Authentication
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com

# Upstash Redis
UPSTASH_REDIS_URL=https://your-redis.upstash.io
UPSTASH_REDIS_TOKEN=your-token-here

# GitHub Publishing
GITHUB_TOKEN=ghp_your_personal_access_token
GITHUB_OWNER=samanvayfoundation
GITHUB_REPO=avninew-v2-PROD
GITHUB_BRANCH=main

# CMS Configuration
CMS_ADMIN_EMAILS=admin@samanvayfoundation.org,another@samanvayfoundation.org
JWT_SECRET=your-secret-key-minimum-32-characters-long-change-this

# Umami Analytics (optional)
UMAMI_WEBSITE_ID=your-website-id
UMAMI_API_URL=https://analytics.umami.is

# Netlify Build Webhook (optional)
NETLIFY_BUILD_HOOK=https://api.netlify.com/build_hooks/your-hook-id
```

### Environment Variable Details

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_CLIENT_ID` | ✅ | OAuth 2.0 client ID from Google Cloud Console |
| `UPSTASH_REDIS_URL` | ✅ | Upstash Redis REST URL |
| `UPSTASH_REDIS_TOKEN` | ✅ | Upstash Redis REST token |
| `GITHUB_TOKEN` | ✅ | GitHub personal access token with `repo` scope |
| `GITHUB_OWNER` | ✅ | GitHub repository owner (org or user) |
| `GITHUB_REPO` | ✅ | GitHub repository name |
| `GITHUB_BRANCH` | ✅ | Target branch for commits (usually `main`) |
| `CMS_ADMIN_EMAILS` | ✅ | Comma-separated list of admin emails |
| `JWT_SECRET` | ✅ | Secret key for JWT signing (min 32 chars) |
| `UMAMI_WEBSITE_ID` | ❌ | Umami analytics website ID |
| `UMAMI_API_URL` | ❌ | Umami API endpoint |
| `NETLIFY_BUILD_HOOK` | ❌ | Webhook URL to trigger Netlify builds |

---

## Step 6: Update package.json

Add the new dependencies to `package.json`:

```json
{
  "dependencies": {
    "@upstash/redis": "^1.35.6",
    "jose": "^5.2.0",
    "@octokit/rest": "^20.0.2"
  }
}
```

Then run:

```bash
npm install
```

---

## Step 7: Run Development Server

```bash
npm run dev
```

Visit:
- Blog: `http://localhost:3000/blog`
- CMS: `http://localhost:3000/cms`
- CMS Dashboard: `http://localhost:3000/cms/dashboard`

---

## Step 8: Test Authentication

1. Go to `http://localhost:3000/cms`
2. Click **Sign in with Google**
3. Select your `@samanvayfoundation.org` account
4. You should be redirected to the dashboard

**Troubleshooting:**
- If login fails, check browser console for errors
- Verify `GOOGLE_CLIENT_ID` is correct
- Ensure authorized origins are configured in Google Cloud Console
- Check that email domain is `@samanvayfoundation.org`

---

## Step 9: Verify Redis Connection

Create a test script `scripts/test-redis.js`:

```javascript
const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

async function test() {
  try {
    await redis.set('test', 'Hello from Avni CMS');
    const value = await redis.get('test');
    console.log('✅ Redis connection successful:', value);
    await redis.del('test');
  } catch (error) {
    console.error('❌ Redis connection failed:', error);
  }
}

test();
```

Run:
```bash
node scripts/test-redis.js
```

---

## Step 10: Verify GitHub Access

Create a test script `scripts/test-github.js`:

```javascript
const GITHUB_API = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

async function test() {
  try {
    const response = await fetch(
      `${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ GitHub access successful:', data.full_name);
    } else {
      console.error('❌ GitHub access failed:', response.status);
    }
  } catch (error) {
    console.error('❌ GitHub connection failed:', error);
  }
}

test();
```

Run:
```bash
node scripts/test-github.js
```

---

## Step 11: Deploy to Netlify

### 11.1 Configure Netlify

1. Connect your GitHub repository to Netlify
2. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Functions directory: (leave empty, Next.js handles this)

### 11.2 Add Environment Variables

In Netlify dashboard → **Site settings** → **Environment variables**, add all variables from `.env.local`:

- `GOOGLE_CLIENT_ID`
- `UPSTASH_REDIS_URL`
- `UPSTASH_REDIS_TOKEN`
- `GITHUB_TOKEN`
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_BRANCH`
- `CMS_ADMIN_EMAILS`
- `JWT_SECRET`
- `UMAMI_WEBSITE_ID` (optional)
- `UMAMI_API_URL` (optional)
- `NETLIFY_BUILD_HOOK` (optional)

### 11.3 Update Google OAuth

Add your Netlify domain to Google Cloud Console:
- Authorized JavaScript origins: `https://your-site.netlify.app`
- Authorized redirect URIs: `https://your-site.netlify.app/cms`

### 11.4 Deploy

```bash
git add .
git commit -m "Add CMS system"
git push origin main
```

Netlify will automatically build and deploy.

---

## Step 12: Set Up Umami Analytics (Optional)

### 12.1 Create Umami Account

1. Go to [Umami Cloud](https://cloud.umami.is/) or self-host
2. Create a new website
3. Copy **Website ID**

### 12.2 Add Tracking Script

The CMS already includes Umami tracking in `components/blog/BlogAnalyticsTracker.tsx`.

Just add the environment variables:
```bash
UMAMI_WEBSITE_ID=your-website-id
UMAMI_API_URL=https://analytics.umami.is
```

---

## Step 13: Create First Admin User

1. Add your email to `CMS_ADMIN_EMAILS` in environment variables
2. Restart the development server
3. Log in with your `@samanvayfoundation.org` account
4. You should see admin-specific options in the dashboard

---

## Verification Checklist

- [ ] Dependencies installed (`jose`, `@octokit/rest`)
- [ ] Google OAuth configured and working
- [ ] Upstash Redis connected
- [ ] GitHub access token working
- [ ] Environment variables set
- [ ] Development server running
- [ ] Can log in with Google
- [ ] Admin role assigned correctly
- [ ] Can create a draft blog
- [ ] Can submit for internal review
- [ ] Can add inline comments
- [ ] Can approve and publish
- [ ] Blog appears in Git repository

---

## Troubleshooting

### "Cannot find module 'jose'"
```bash
npm install jose
```

### "Unauthorized" when logging in
- Check `GOOGLE_CLIENT_ID` is correct
- Verify email domain is `@samanvayfoundation.org`
- Check authorized origins in Google Cloud Console

### "Redis connection failed"
- Verify `UPSTASH_REDIS_URL` and `UPSTASH_REDIS_TOKEN`
- Check Upstash dashboard for database status
- Ensure TLS is enabled

### "GitHub API error: 401"
- Verify `GITHUB_TOKEN` is correct
- Check token has `repo` scope
- Ensure token hasn't expired

### "Blog failed quality checks"
- Ensure all required fields are filled
- Resolve all inline comments
- Add featured image
- Add at least 3 tags

---

## Cost Breakdown

| Service | Plan | Monthly Cost |
|---------|------|--------------|
| Upstash Redis | Free tier | $0 |
| Google OAuth | Free | $0 |
| GitHub | Free tier | $0 |
| Netlify | Free tier | $0 |
| Umami Analytics | Free tier | $0 |
| **Total** | | **$0** |

**Free tier limits:**
- Upstash: 10K commands/day, 256MB storage
- Netlify: 100GB bandwidth, 300 build minutes
- GitHub: Unlimited public repos, 500MB storage

---

## Next Steps

1. Read `CMS_ARCHITECTURE.md` for system design
2. Read `CMS_USER_GUIDE.md` for usage instructions
3. Customize blog editor components in `components/cms/`
4. Configure internal reviewers
5. Train team on workflow

---

## Support

For issues or questions:
- Check logs in browser console
- Check Netlify function logs
- Check Upstash Redis logs
- Review `CMS_ARCHITECTURE.md` for technical details
