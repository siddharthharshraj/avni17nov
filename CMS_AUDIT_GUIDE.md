# Audit Trail System - Complete Guide

## Overview

The CMS includes a comprehensive, **immutable audit trail** system that tracks all user logins and activities. Audit logs are automatically retained for **30 days** and cannot be modified or deleted through the UI.

---

## Features

### ✅ What's Tracked

**Authentication:**
- Login (successful)
- Login failed attempts
- Logout

**Blog Actions:**
- Blog created
- Blog updated
- Blog deleted
- Blog viewed

**Workflow Actions:**
- Blog submitted for internal review
- Blog submitted for admin review
- Blog approved (IR/Admin)
- Changes requested (IR/Admin)
- Blog published
- Blog unpublished
- Blog republished

**Comment Actions:**
- Comment added
- Comment resolved
- Comment unresolved
- Comment deleted

**Image Actions:**
- Image uploaded
- Image deleted

**Analytics:**
- Analytics viewed

### ✅ Data Captured

For each action, the system logs:
- **Timestamp** - Exact date and time (ISO 8601)
- **User Info** - Email, name, role
- **Action Type** - What was done
- **Resource** - What was affected (blog title, comment, etc.)
- **Resource ID** - Unique identifier
- **Metadata** - Additional context (JSON)
- **IP Address** - User's IP
- **User Agent** - Browser/device info

---

## Accessing Audit Trail

### Via CMS Dashboard

1. Log in to CMS: `https://your-site.com/cms`
2. Click **Audit Trail** in navigation
3. View at: `https://your-site.com/cms/audit`

### Permissions

- **Authors**: Can view their own audit logs only
- **Internal Reviewers**: Can view their own audit logs only
- **Admins**: Can view all audit logs

---

## Dashboard Features

### 1. Filters

**Action Type:**
- All Actions
- Login
- Logout
- Blog Created
- Blog Updated
- Blog Published
- Blog Unpublished
- Comment Added

**User Email:**
- Filter by specific user (admin only)
- Auto-filtered to own email for non-admins

**Date Range:**
- Last 24 hours
- Last 7 days
- Last 14 days
- Last 30 days

### 2. Statistics View

Click **Statistics** button to see:

**Summary Cards:**
- Total logs in period
- Unique users active

**Top Actions:**
- Most frequent actions with counts
- Sorted by frequency

**Most Active Users:**
- Top 10 users by activity count
- Shows email and action count

### 3. Export Functionality

Click **Export** button to download:
- JSON file with all logs in selected period
- Filename: `audit-logs-YYYY-MM-DD-to-YYYY-MM-DD.json`
- Use for compliance, backup, or analysis

### 4. Audit Log Table

Shows all logs with:
- **Timestamp** - When action occurred
- **User** - Name, email, role badge
- **Action** - Color-coded action type
- **Resource** - What was affected
- **IP Address** - Where action came from

**Color Coding:**
- 🔵 Blue - Login/Logout
- 🟢 Green - Created
- 🔴 Red - Deleted
- 🟣 Purple - Published
- 🟦 Teal - Approved
- ⚪ Gray - Other actions

---

## API Endpoints

### Get Audit Logs

```bash
GET /api/cms/audit
Authorization: Bearer {JWT_TOKEN}
```

**Query Parameters:**
- `action` - Filter by action type
- `userEmail` - Filter by user (admin only)
- `resourceId` - Filter by resource
- `startDate` - ISO date string
- `endDate` - ISO date string
- `limit` - Max results (default: 100)
- `offset` - Pagination offset

**Response:**
```json
{
  "success": true,
  "logs": [
    {
      "id": "audit-1234567890-abc123",
      "timestamp": "2025-12-23T17:30:00.000Z",
      "userEmail": "john@samanvayfoundation.org",
      "userName": "John Doe",
      "userRole": "author",
      "action": "blog_created",
      "resource": "My New Blog Post",
      "resourceId": "blog-123",
      "metadata": {
        "slug": "my-new-blog-post"
      },
      "ipAddress": "192.168.1.1",
      "userAgent": "Mozilla/5.0..."
    }
  ],
  "count": 1
}
```

### Get Statistics

```bash
GET /api/cms/audit?stats=true&days=30
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalLogs": 1250,
    "uniqueUsers": 15,
    "actionCounts": {
      "login": 145,
      "blog_created": 23,
      "blog_published": 18,
      "comment_added": 67
    },
    "topUsers": [
      {
        "email": "admin@samanvayfoundation.org",
        "count": 342
      }
    ]
  }
}
```

### Export Logs

```bash
GET /api/cms/audit?export=true&startDate=2025-12-01&endDate=2025-12-31
Authorization: Bearer {JWT_TOKEN}
```

**Permissions:** Admin only

---

## Immutability

### How It Works

1. **Write-Only**: Logs can only be created, never updated
2. **Append-Only**: New logs are appended to sorted sets
3. **No Delete UI**: No UI option to delete logs
4. **Auto-Cleanup**: Only automatic deletion after 30 days

### Storage

**Redis Sorted Sets:**
- Global log: `cms:audit:global`
- Per-user logs: `cms:audit:user:{email}`
- Sorted by timestamp (score)

**Retention:**
- Automatic cleanup of logs older than 30 days
- Runs during each new log creation
- Ensures compliance with data retention policies

---

## Use Cases

### 1. Security Monitoring

**Track failed login attempts:**
```bash
GET /api/cms/audit?action=login_failed
```

**Identify suspicious activity:**
- Multiple failed logins from same IP
- Login from unusual location
- Unusual activity patterns

### 2. Compliance & Auditing

**Export logs for compliance:**
```bash
GET /api/cms/audit?export=true&startDate=2025-01-01&endDate=2025-12-31
```

**Track who did what:**
- Who published which blog
- Who approved content
- Who made changes

### 3. User Activity Analysis

**View user's activity:**
```bash
GET /api/cms/audit?userEmail=john@samanvayfoundation.org
```

**Identify most active users:**
- Check statistics view
- See top contributors
- Measure engagement

### 4. Debugging & Support

**Track blog lifecycle:**
```bash
GET /api/cms/audit?resourceId=blog-123
```

**See all actions on a blog:**
- When created
- Who edited
- When published
- All comments added

### 5. Performance Monitoring

**Track system usage:**
- Login patterns
- Peak activity times
- Most common actions
- User distribution

---

## Best Practices

### For All Users

1. **Review regularly** - Check your activity weekly
2. **Report anomalies** - Alert admin of suspicious entries
3. **Understand actions** - Know what gets logged

### For Admins

1. **Monitor failed logins** - Watch for security threats
2. **Export monthly** - Backup logs for compliance
3. **Review statistics** - Understand usage patterns
4. **Investigate anomalies** - Check unusual activity
5. **Train users** - Educate on audit trail

### For Compliance

1. **Regular exports** - Monthly or quarterly
2. **Secure storage** - Store exports securely
3. **Access control** - Limit who can view logs
4. **Retention policy** - 30 days in system, longer in backups
5. **Audit the audit** - Periodically verify logging works

---

## Technical Details

### Data Model

```typescript
interface AuditLog {
  id: string;                    // Unique identifier
  timestamp: string;             // ISO 8601 timestamp
  userEmail: string;             // User's email
  userName: string;              // User's display name
  userRole: string;              // User's role
  action: AuditAction;           // Action type
  resource?: string;             // Resource name
  resourceId?: string;           // Resource ID
  metadata?: Record<string, any>; // Additional data
  ipAddress?: string;            // User's IP
  userAgent?: string;            // Browser info
}
```

### Automatic Logging

Audit logs are automatically created for:
- All authentication endpoints
- All blog CRUD operations
- All workflow state changes
- All comment operations
- All publish/unpublish actions

**Example in code:**
```typescript
await createAuditLog(user, 'blog_created', {
  resource: blog.title,
  resourceId: blog.id,
  metadata: { slug: blog.slug },
  ipAddress,
  userAgent,
});
```

---

## Troubleshooting

### No Logs Showing

**Possible causes:**
1. No activity in selected period
2. Filters too restrictive
3. Redis connection issue

**Solutions:**
1. Expand date range
2. Clear filters
3. Check Redis connection

### Export Fails

**Cause:** Not admin or invalid date range

**Solution:**
1. Ensure admin role
2. Provide valid startDate and endDate
3. Check date format (ISO 8601)

### Statistics Not Loading

**Cause:** Too many logs to process

**Solution:**
1. Reduce date range
2. Wait for processing
3. Try again

---

## Security Considerations

### Access Control

- Non-admins can only see their own logs
- Admins can see all logs
- No one can modify or delete logs (except auto-cleanup)

### Data Privacy

- IP addresses logged for security
- User agents logged for debugging
- Metadata may contain sensitive info
- Export carefully

### Compliance

- 30-day retention meets most requirements
- Export for longer retention if needed
- Immutable logs ensure integrity
- Timestamps prove when actions occurred

---

## FAQ

**Q: Can I delete audit logs?**  
A: No, logs are immutable. Only automatic cleanup after 30 days.

**Q: Can I see other users' logs?**  
A: Only if you're an admin.

**Q: How long are logs kept?**  
A: 30 days in the system. Export for longer retention.

**Q: What if I need logs older than 30 days?**  
A: Export logs monthly and store securely.

**Q: Can logs be tampered with?**  
A: No, they're immutable and stored in append-only mode.

**Q: Do failed actions get logged?**  
A: Yes, including failed login attempts.

**Q: Can I search logs?**  
A: Yes, by action, user, resource, and date range.

**Q: How much storage do logs use?**  
A: Minimal. ~1KB per log, ~30MB for 30K logs.

---

## Summary

✅ **Immutable** - Cannot be modified or deleted  
✅ **Comprehensive** - Tracks all user activities  
✅ **30-day retention** - Automatic cleanup  
✅ **Exportable** - JSON export for compliance  
✅ **Searchable** - Filter by action, user, date  
✅ **Secure** - Role-based access control  
✅ **Zero cost** - Uses existing Redis storage  

**Access:** `https://your-site.com/cms/audit`

**Cost:** $0 (uses Upstash Redis free tier)
