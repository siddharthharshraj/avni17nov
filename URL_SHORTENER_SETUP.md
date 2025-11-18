# URL Shortener Setup Guide

## ✅ What's Included

A free, instant URL shortener built into the `/kit` page using Netlify Blobs storage.

- **Short URLs**: `avniproject.org/s/[5-char-code]`
- **Storage**: Netlify Blobs (10GB free, unlimited reads/writes)
- **Cost**: $0.00 forever
- **Capacity**: Unlimited URLs (perfect for 50-100/month)

---

## 🚀 One-Time Setup (5 minutes)

### Step 1: Deploy to Netlify

The code is already ready! Just push to GitHub and Netlify will auto-deploy.

```bash
git push origin main
```

### Step 2: Enable Netlify Blobs (Automatic)

Netlify Blobs is automatically enabled when you use the `@netlify/blobs` package. No manual configuration needed!

The package is already installed in `package.json`:
```json
"@netlify/blobs": "^8.1.0"
```

### Step 3: Verify It Works

1. Go to `https://avni-2.netlify.app/kit` (or your production domain)
2. Scroll to **URL Shortener** section
3. Enter a long URL (e.g., `https://avniproject.org/blog/some-article`)
4. Click **Shorten URL**
5. You'll get: `https://avni-2.netlify.app/s/abc12`
6. Click **Copy Shortened URL**
7. Test the short URL - it should redirect to your long URL!

---

## 📖 How to Use

### Creating Short URLs

1. Go to `/kit` page
2. Find the **URL Shortener** section
3. Paste your long URL
4. Click **Shorten URL**
5. Copy the generated short URL
6. Share it on social media!

### Short URL Format

- **Staging**: `https://avni-2.netlify.app/s/abc12`
- **Production**: `https://avniproject.org/s/abc12`

The domain auto-detects based on where you create the URL.

---

## 🔧 Technical Details

### Storage

- **Provider**: Netlify Blobs
- **Store Name**: `short-urls`
- **Data Format**: Key-value pairs (code → URL)
- **Limits**: 10GB storage, unlimited reads/writes

### API Endpoints

**Create Short URL**:
```
POST /api/shorten
Body: { "url": "https://example.com" }
Response: { "success": true, "code": "abc12", "shortUrl": "https://avniproject.org/s/abc12" }
```

**Redirect**:
```
GET /s/[code]
→ Redirects to original URL
```

### Code Generation

- 5 random characters (lowercase letters + numbers)
- 36^5 = 60,466,176 possible combinations
- Collision detection (retries up to 10 times)

---

## 💰 Cost Breakdown

| Service | Free Tier | Your Usage | Cost |
|---------|-----------|------------|------|
| Netlify Blobs | 10GB storage | ~1KB per URL = 10M URLs | $0 |
| Netlify Functions | 125K invocations/month | ~200/month | $0 |
| Netlify Bandwidth | 100GB/month | Minimal | $0 |
| **Total** | | | **$0/month** |

---

## 🛡️ Features

✅ **Auto-detects domain** (staging vs production)
✅ **Instant creation** (no Git commits needed)
✅ **Copy to clipboard** button
✅ **Error handling** (invalid URLs, network errors)
✅ **Unique codes** (collision detection)
✅ **SEO-friendly** (noindex on redirect pages)
✅ **Forever free** (within Netlify limits)

---

## 🔍 Monitoring

### View All Short URLs

Currently, there's no admin UI to view all URLs. If needed, you can:

1. Use Netlify CLI:
```bash
netlify blobs:list short-urls
```

2. Or create an admin page (optional future enhancement)

### Analytics

Short URLs don't have built-in analytics. For tracking:
- Use UTM parameters in your original URLs
- Or integrate Google Analytics on the redirect page

---

## 🚨 Troubleshooting

### "Failed to create short URL"

**Cause**: Netlify Blobs not initialized
**Fix**: Make sure you've deployed to Netlify (doesn't work on localhost)

### Short URL returns 404

**Cause**: Code not found in storage
**Fix**: The short URL might have been created on a different deployment. Try creating a new one.

### "Network error"

**Cause**: API endpoint not accessible
**Fix**: Check that `/api/shorten` route is deployed correctly

---

## 📝 Notes

- Short URLs are **permanent** (no expiration)
- Codes are **case-sensitive** (abc12 ≠ ABC12)
- Works on **staging and production** domains
- **No maintenance required** - runs forever!

---

## 🎉 You're All Set!

The URL shortener is ready to use. Just deploy and start creating short links!

For questions, contact the Avni development team.
