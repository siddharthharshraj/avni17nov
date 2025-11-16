# Netlify Deployment Guide

## Pre-Deployment Checklist

- [x] Clean unused code and test files
- [x] Update .gitignore (docs folder excluded)
- [x] Minimal README created
- [x] netlify.toml configured
- [x] Environment variables documented

## Deploy to Netlify

### 1. Connect Repository

1. Login to [Netlify](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Choose your Git provider (GitHub/GitLab/Bitbucket)
4. Select the `avninew-v2` repository
5. Netlify will auto-detect Next.js settings

### 2. Configure Build Settings

**Build command:** `npm run build`  
**Publish directory:** `out`  
**Node version:** `20`

These are already configured in `netlify.toml`

### 3. Add Environment Variables

Go to **Site settings** → **Environment variables** and add:

```bash
# Required
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_AUDIENCE_ID=your_audience_id
MAILCHIMP_SERVER_PREFIX=us21

# Optional
NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY=your_google_api_key
FORMSPREE_FORM_ID=your_formspree_id
GITHUB_TOKEN=your_github_token
```

### 4. Deploy

Click **Deploy site** - Netlify will:
- Install dependencies
- Run build command
- Deploy to CDN
- Generate preview URL

### 5. Custom Domain (Optional)

1. Go to **Domain settings**
2. Add custom domain: `avniproject.org`
3. Configure DNS:
   - Add A record: `75.2.60.5`
   - Add CNAME: `www` → `your-site.netlify.app`
4. Enable HTTPS (automatic with Let's Encrypt)

## Post-Deployment

### Verify

- [ ] Homepage loads correctly
- [ ] Blog posts display properly
- [ ] Newsletter subscription works
- [ ] Contact form works
- [ ] All images load
- [ ] Dropdowns function
- [ ] Mobile responsive
- [ ] Performance score 90+

### Monitor

- Check Netlify deploy logs for errors
- Test all major pages
- Verify analytics tracking
- Check SEO meta tags

## Troubleshooting

### Build Fails

```bash
# Check build logs in Netlify dashboard
# Common issues:
- Missing environment variables
- Node version mismatch
- Dependency conflicts
```

### Images Not Loading

```bash
# Ensure images are in public/ folder
# Check image paths are absolute: /images/...
```

### API Routes Not Working

```bash
# Verify environment variables are set
# Check API route files are in app/api/
```

## Rollback

If deployment fails:
1. Go to **Deploys** tab
2. Find last successful deploy
3. Click **Publish deploy**

## Support

- Netlify Docs: https://docs.netlify.com/
- Next.js Docs: https://nextjs.org/docs
- Avni GitHub: https://github.com/avniproject
