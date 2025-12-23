# Blog Unpublish System - Complete Guide

## Overview

The CMS implements a **soft unpublish** system with a **48-hour grace period** before permanent deletion.

---

## How It Works

### 1. Unpublish Action (Admin Only)

When an admin unpublishes a blog:

```
PUBLISHED → UNPUBLISHED
```

**What happens:**
- ✅ Blog status changes to `unpublished`
- ✅ `unpublishedAt` timestamp is recorded
- ✅ Blog **remains in GitHub repository** (still visible on website)
- ✅ 48-hour countdown starts
- ⚠️ Warning message shown: "Will be permanently deleted after 48 hours"

**API Endpoint:**
```bash
POST /api/cms/blogs/{id}/unpublish
```

**Response:**
```json
{
  "success": true,
  "message": "Blog unpublished successfully. Will be permanently deleted after 48 hours if not republished.",
  "gracePeriodHours": 48,
  "deleteAt": "2025-12-25T10:57:00.000Z"
}
```

---

### 2. Grace Period (48 Hours)

During the 48-hour window:

**Admin can:**
- ✅ **Republish** the blog (restores to `published` status)
- ✅ **View** the blog in CMS
- ✅ **Edit** the blog (if within 4-blog limit)

**Blog remains:**
- ✅ In GitHub repository
- ✅ Visible on website
- ✅ Indexed by search engines

**Republish Endpoint:**
```bash
POST /api/cms/blogs/{id}/republish
```

**Response:**
```json
{
  "success": true,
  "message": "Blog republished successfully"
}
```

---

### 3. Automatic Deletion (After 48 Hours)

**Scheduled Job** runs every 6 hours:

```
UNPUBLISHED (48+ hours) → DELETED
```

**What happens:**
- ✅ Blog deleted from GitHub repository
- ✅ Blog deleted from Redis (CMS database)
- ✅ Netlify build triggered
- ✅ Blog removed from website

**Cleanup runs at:**
- 00:00 UTC
- 06:00 UTC
- 12:00 UTC
- 18:00 UTC

**Manual Cleanup (Admin):**
```bash
POST /api/cms/cleanup
Authorization: Bearer {CLEANUP_SECRET}
```

---

## 4-Blog Limit with Notifications

### Scenario: Admin Publishes 4 New Blogs

When an author has **4 editable blogs** and creates/publishes a new one:

**What happens:**
1. ✅ New blog is created/published
2. ✅ Oldest blog is **automatically locked** (read-only)
3. ✅ **Notification shown on screen:**

```
⚠️ 1 older blog(s) have been locked: "Old Blog Title"
```

**If unpublished blog exists:**
- Unpublished blogs **do NOT count** toward the 4-blog limit
- They remain in grace period
- After deletion, they free up a slot

**Example Timeline:**

```
Day 1: Admin unpublishes "Blog A"
  - Status: unpublished
  - Counts: 0/4 (doesn't count)
  - In repo: YES

Day 2: Admin publishes 4 new blogs
  - New blogs: 4/4
  - Oldest gets locked
  - Notification: "1 blog locked: [title]"
  - "Blog A" still in grace period

Day 3 (48 hours): Cleanup job runs
  - "Blog A" deleted from GitHub
  - "Blog A" deleted from CMS
  - Netlify rebuild triggered
  - "Blog A" removed from website
```

---

## API Endpoints

### Unpublish Blog
```http
POST /api/cms/blogs/{id}/unpublish
Authorization: Bearer {JWT_TOKEN}
```

**Permissions:** Admin only (`publish` permission)

**Response:**
```json
{
  "success": true,
  "message": "Blog unpublished successfully...",
  "gracePeriodHours": 48,
  "deleteAt": "2025-12-25T10:57:00.000Z"
}
```

---

### Republish Blog
```http
POST /api/cms/blogs/{id}/republish
Authorization: Bearer {JWT_TOKEN}
```

**Permissions:** Admin only (`publish` permission)

**Conditions:**
- Blog must be in `unpublished` status
- Must be within 48-hour grace period

**Response:**
```json
{
  "success": true,
  "message": "Blog republished successfully"
}
```

**Error (after 48 hours):**
```json
{
  "error": "Cannot republish: 48-hour grace period has expired. Blog will be deleted soon."
}
```

---

### Cleanup (Scheduled)
```http
POST /api/cms/cleanup
Authorization: Bearer {CLEANUP_SECRET}
```

**Permissions:** Scheduled function only (secret-based auth)

**Response:**
```json
{
  "success": true,
  "checked": 5,
  "deleted": 2,
  "failed": 0,
  "results": [
    {
      "id": "blog-123",
      "title": "Old Blog",
      "success": true
    }
  ]
}
```

---

## Environment Variables

Add to `.env.local` and Netlify:

```bash
# Cleanup secret for scheduled function
CLEANUP_SECRET=your-random-secret-min-32-chars
```

---

## Netlify Scheduled Function

**File:** `netlify/functions/scheduled-cleanup.ts`

**Schedule:** Every 6 hours (configured in `netlify.toml`)

**Configuration:**
```toml
[[functions]]
  name = "scheduled-cleanup"
  schedule = "0 */6 * * *"  # Cron: every 6 hours
```

**Manual trigger (for testing):**
```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/scheduled-cleanup
```

---

## User Interface

### Admin Dashboard

**Unpublished Blogs Section:**
```
┌─────────────────────────────────────────────┐
│ Unpublished Blogs (Grace Period)            │
├─────────────────────────────────────────────┤
│ "Blog Title"                                │
│ Unpublished: 2 hours ago                    │
│ Deletes in: 46 hours                        │
│ [Republish] [Delete Now]                    │
└─────────────────────────────────────────────┘
```

**Notification on Create:**
```
┌─────────────────────────────────────────────┐
│ ✅ Blog created successfully                │
│ ⚠️ 1 older blog locked: "Previous Blog"    │
└─────────────────────────────────────────────┘
```

---

## State Machine

```
PUBLISHED
    ↓ (Admin unpublishes)
UNPUBLISHED
    ├─→ (Admin republishes within 48h) → PUBLISHED
    └─→ (48 hours pass) → DELETED (from GitHub + Redis)
```

---

## Best Practices

### For Admins

1. **Before unpublishing:**
   - Confirm you want to remove the blog
   - Check if it's referenced elsewhere
   - Consider archiving instead

2. **During grace period:**
   - Review unpublished blogs daily
   - Republish if needed
   - Delete immediately if certain

3. **After deletion:**
   - Blog is permanently removed
   - Cannot be recovered
   - Backup if needed before unpublishing

### For Authors

- **Unpublished blogs don't count** toward your 4-blog limit
- You'll see a notification when older blogs get locked
- Locked blogs are read-only but still visible

---

## Monitoring

### Check Unpublished Blogs

```bash
GET /api/cms/blogs?status=unpublished
```

### Check Cleanup Logs

View in Netlify Functions logs:
1. Go to Netlify Dashboard
2. Functions → `scheduled-cleanup`
3. View logs for deletion history

---

## Troubleshooting

### "Cannot republish: grace period expired"

**Cause:** More than 48 hours since unpublish

**Solution:** Blog will be deleted soon. Create a new blog if needed.

---

### Cleanup not running

**Check:**
1. Netlify scheduled functions enabled
2. `CLEANUP_SECRET` environment variable set
3. Function logs for errors

**Manual trigger:**
```bash
curl -X POST \
  https://your-site.netlify.app/api/cms/cleanup \
  -H "Authorization: Bearer YOUR_CLEANUP_SECRET"
```

---

### Blog still visible after deletion

**Cause:** Netlify build not triggered or cached

**Solution:**
1. Trigger manual Netlify build
2. Clear CDN cache
3. Wait 2-5 minutes for propagation

---

## FAQ

**Q: Can I unpublish multiple blogs at once?**  
A: Not yet. Unpublish one at a time.

**Q: What happens to images when blog is deleted?**  
A: Images remain in GitHub unless manually deleted.

**Q: Can I change the grace period?**  
A: Yes, modify the 48-hour check in `/api/cms/cleanup/route.ts`

**Q: Does unpublish affect SEO?**  
A: During grace period, no. After deletion, yes (404 error).

**Q: Can authors unpublish their own blogs?**  
A: No, only admins can unpublish.

---

## Summary

✅ **Soft unpublish** - Blog stays in GitHub for 48 hours  
✅ **Grace period** - Can republish within 48 hours  
✅ **Auto-cleanup** - Scheduled job deletes after 48 hours  
✅ **Notifications** - Screen alerts for 4-blog limit  
✅ **No data loss** - Unpublished blogs don't count toward limit  

**Cost:** $0 (uses Netlify scheduled functions - free tier)
