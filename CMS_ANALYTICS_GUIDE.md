# Blog Analytics Dashboard - Complete Guide

## Overview

The CMS includes a comprehensive analytics dashboard that shows performance metrics for **all published blogs** (not just the 4 editable ones) using the **Umami Analytics API**.

---

## Features

### ✅ What You Can See

1. **Total Statistics**
   - Total number of published blogs
   - Total pageviews across all blogs
   - Total unique visitors
   - Average bounce rate
   - Average time on page

2. **Per-Blog Metrics**
   - Pageviews
   - Unique visitors
   - Bounce rate
   - Average time on page
   - Social shares
   - CTA clicks
   - Scroll depth (25%, 50%, 75%, 100%)

3. **Sorting & Filtering**
   - Sort by pageviews, visitors, or avg time
   - Filter by time period (7, 30, 90, 365 days)
   - Real-time data refresh

---

## Setup

### 1. Umami Configuration

**Required Environment Variables:**

```bash
# Umami Analytics
UMAMI_WEBSITE_ID=your-website-id
UMAMI_API_URL=https://analytics.umami.is
UMAMI_API_KEY=your-api-key  # Optional but recommended
```

### 2. Get Umami Credentials

**Option A: Umami Cloud (Recommended)**

1. Go to [Umami Cloud](https://cloud.umami.is/)
2. Create account and add your website
3. Copy **Website ID** from settings
4. Generate **API Key** from account settings

**Option B: Self-Hosted Umami**

1. Deploy Umami to your server
2. Add your website
3. Copy Website ID
4. Generate API key

### 3. Verify Setup

Test the API connection:

```bash
curl -X GET \
  "https://analytics.umami.is/api/websites/YOUR_WEBSITE_ID/metrics" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## Accessing Analytics

### Via CMS Dashboard

1. Log in to CMS: `https://your-site.com/cms`
2. Click **Analytics** in navigation
3. View dashboard at: `https://your-site.com/cms/analytics`

### Via API

**Get all blogs analytics:**
```bash
GET /api/cms/analytics?days=30
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "period": {
    "days": 30,
    "startDate": "2025-11-23T...",
    "endDate": "2025-12-23T..."
  },
  "totalStats": {
    "totalPageviews": 15420,
    "totalVisitors": 8932,
    "totalBlogs": 47,
    "avgBounceRate": 42.3,
    "avgTimeOnPage": 185
  },
  "blogs": [
    {
      "id": "blog-123",
      "slug": "my-blog-post",
      "title": "My Blog Post",
      "author": "John Doe",
      "publishedAt": "2025-12-01T...",
      "tags": ["tech", "tutorial"],
      "analytics": {
        "pageviews": 1250,
        "visitors": 892,
        "bounceRate": 38.5,
        "avgTime": 245,
        "events": {
          "shares": 45,
          "ctaClicks": 23,
          "scrollDepth": {
            "25%": 892,
            "50%": 745,
            "75%": 523,
            "100%": 312
          }
        }
      }
    }
  ]
}
```

**Get specific blog analytics:**
```bash
GET /api/cms/analytics/{slug}?days=30
Authorization: Bearer {JWT_TOKEN}
```

---

## Dashboard Features

### 1. Summary Cards

Top row shows 5 key metrics:

```
┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│ Total Blogs │  Pageviews  │  Visitors   │ Bounce Rate │  Avg Time   │
│     47      │    15.4K    │    8.9K     │    42.3%    │   3m 5s     │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘
```

### 2. Time Period Selector

Choose analysis period:
- Last 7 days
- Last 30 days (default)
- Last 90 days
- Last year

### 3. Sort Options

Sort blogs by:
- **Pageviews** (most popular first)
- **Visitors** (most unique visitors)
- **Avg Time** (highest engagement)

### 4. Detailed Table

Shows all published blogs with:
- Rank (#1, #2, etc.)
- Blog title (clickable link)
- Author name
- Tags (first 3)
- Pageviews (highlighted in green)
- Unique visitors
- Bounce rate (color-coded: green < 50%, orange 50-70%, red > 70%)
- Average time on page
- Social shares count
- CTA clicks count

---

## Metrics Explained

### Pageviews
Total number of times the blog page was loaded.

**Good:** > 1000/month  
**Average:** 100-1000/month  
**Needs improvement:** < 100/month

### Visitors
Number of unique visitors (based on IP/cookie).

**Calculation:** Unique users who viewed the page

### Bounce Rate
Percentage of visitors who left without interacting.

**Good:** < 40%  
**Average:** 40-60%  
**Needs improvement:** > 60%

**How to improve:**
- Add internal links
- Improve content quality
- Optimize page load speed
- Add clear CTAs

### Average Time on Page
How long visitors spend reading.

**Good:** > 3 minutes  
**Average:** 1-3 minutes  
**Needs improvement:** < 1 minute

**Indicates:**
- Content engagement
- Reading depth
- Content quality

### Social Shares
Number of times blog was shared on social media.

**Tracked platforms:**
- Twitter/X
- LinkedIn
- Facebook
- WhatsApp
- Copy link

### CTA Clicks
Clicks on Call-to-Action buttons.

**Tracked CTAs:**
- "Get Started"
- "Contact Us"
- "Sign Up"

### Scroll Depth
How far down the page visitors scroll.

**Percentages:**
- **25%**: Saw intro
- **50%**: Read half
- **75%**: Almost finished
- **100%**: Read everything

**Good engagement:** > 50% reach 75%

---

## Use Cases

### 1. Identify Top Performers

**Question:** Which blogs drive the most traffic?

**Action:**
1. Sort by Pageviews
2. Look at top 10 blogs
3. Analyze what makes them successful
4. Replicate in future content

### 2. Find Low Performers

**Question:** Which blogs need improvement?

**Action:**
1. Sort by Pageviews (ascending)
2. Check bounce rate and avg time
3. Improve content or SEO
4. Add internal links

### 3. Optimize for Engagement

**Question:** Are readers finishing blogs?

**Action:**
1. Check scroll depth
2. If < 50% reach 75%, content too long
3. Break into sections
4. Add visuals

### 4. Measure Author Performance

**Question:** Which authors write best content?

**Action:**
1. Group by author
2. Compare avg pageviews
3. Compare avg time on page
4. Share best practices

### 5. Track Campaign Success

**Question:** Did our promotion work?

**Action:**
1. Set period to campaign dates
2. Check pageview spike
3. Check share count
4. Measure CTA clicks

---

## API Integration

### Custom Queries

**Get top 10 blogs:**
```bash
GET /api/cms/analytics?days=30&limit=10
```

**Get last 7 days:**
```bash
GET /api/cms/analytics?days=7
```

**Get specific blog:**
```bash
GET /api/cms/analytics/my-blog-slug?days=30
```

### Response Format

All endpoints return:
```json
{
  "success": true,
  "period": { ... },
  "totalStats": { ... },
  "blogs": [ ... ]
}
```

### Error Handling

**401 Unauthorized:**
```json
{
  "error": "Unauthorized"
}
```

**500 Server Error:**
```json
{
  "error": "Failed to fetch analytics",
  "message": "Umami API error: ..."
}
```

---

## Troubleshooting

### No Data Showing

**Possible causes:**
1. Umami not configured
2. Wrong Website ID
3. No published blogs
4. No traffic yet

**Solutions:**
1. Check environment variables
2. Verify Umami tracking script on blog pages
3. Wait 24 hours for data to populate
4. Check Umami dashboard directly

### "Failed to fetch analytics"

**Cause:** Umami API error

**Solutions:**
1. Check `UMAMI_API_KEY` is correct
2. Verify API key has read permissions
3. Check Umami service status
4. Try without API key (public data only)

### Incorrect Numbers

**Cause:** Time zone mismatch or cache

**Solutions:**
1. Refresh dashboard
2. Check Umami dashboard for comparison
3. Clear browser cache
4. Wait for next data sync

### Slow Loading

**Cause:** Fetching data for many blogs

**Solutions:**
1. Reduce time period (7 days instead of 365)
2. Limit number of blogs shown
3. Add caching layer (future enhancement)

---

## Best Practices

### For Authors

1. **Check weekly** - Monitor your blog performance
2. **Compare to average** - See how you stack up
3. **Learn from top performers** - Study successful blogs
4. **Improve low performers** - Update old content

### For Admins

1. **Review monthly** - Track overall trends
2. **Share insights** - Report to team
3. **Set goals** - Target metrics for authors
4. **Optimize strategy** - Focus on what works

### For Content Strategy

1. **Topic analysis** - Which topics get most views?
2. **Length optimization** - Correlate length with engagement
3. **Publishing schedule** - When do blogs perform best?
4. **Promotion effectiveness** - Track campaign ROI

---

## Future Enhancements

Planned features:
- [ ] Export to CSV
- [ ] Email reports
- [ ] Trend graphs
- [ ] Comparison charts
- [ ] Author leaderboard
- [ ] Tag performance
- [ ] Traffic sources
- [ ] Device breakdown
- [ ] Geographic data

---

## FAQ

**Q: Does analytics work for unpublished blogs?**  
A: No, only published blogs are tracked.

**Q: How often does data update?**  
A: Real-time (Umami updates every few minutes).

**Q: Can I see historical data?**  
A: Yes, up to 1 year (or Umami retention limit).

**Q: Does this cost extra?**  
A: No, Umami free tier supports unlimited events.

**Q: Can authors see all blogs or just their own?**  
A: Currently all users see all blogs. Role-based filtering coming soon.

**Q: What if Umami is down?**  
A: Dashboard shows error message. Blog site still works.

---

## Summary

✅ **All published blogs** - Not limited to 4 editable blogs  
✅ **Real-time data** - Powered by Umami API  
✅ **Comprehensive metrics** - Pageviews, visitors, engagement  
✅ **Easy filtering** - By time period and sort order  
✅ **Zero cost** - Uses Umami free tier  
✅ **API access** - Programmatic data retrieval  

**Access:** `https://your-site.com/cms/analytics`

**Cost:** $0 (Umami free tier)
