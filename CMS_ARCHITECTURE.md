# Avni Blog CMS - Zero-Cost Architecture

## System Overview

Production-grade CMS enabling authors to write blogs on the real blog layout, pass through Internal Review (IR) and Admin Review stages with inline comments, and publish to GitHub as markdown.

**Cost**: $0/month forever (Upstash Redis free tier: 10K commands/day, Google Auth: free, GitHub: free, Netlify: free)

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION LAYER                         │
│  Google Identity Services → JWT Cookie → Role-based Access      │
│  Allowed: @samanvayfoundation.org only                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        CMS APPLICATION                           │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   AUTHOR     │  │ INT. REVIEWER│  │    ADMIN     │         │
│  │   Dashboard  │  │   Dashboard  │  │   Dashboard  │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│         ↓                 ↓                  ↓                  │
│  ┌────────────────────────────────────────────────────┐        │
│  │         BLOG EDITOR (Real Layout Renderer)         │        │
│  │  • Reuses existing blog components                 │        │
│  │  • Pixel-identical to published blogs              │        │
│  │  • Inline editing with content blocks              │        │
│  └────────────────────────────────────────────────────┘        │
│         ↓                 ↓                  ↓                  │
│  ┌────────────────────────────────────────────────────┐        │
│  │       INLINE COMMENT SYSTEM (Text Selection)       │        │
│  │  • Anchor-based positioning (prefix/suffix/exact)  │        │
│  │  • Assigned to author by reviewer                  │        │
│  │  • Resolve/unresolve workflow                      │        │
│  └────────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      DATA STORAGE LAYER                          │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐           │
│  │              UPSTASH REDIS (Free Tier)            │           │
│  │                                                   │           │
│  │  cms:blog:{id}          → Draft content + meta   │           │
│  │  cms:blogs:{email}      → Author's blog list     │           │
│  │  cms:comments:{blogId}  → Inline comments        │           │
│  │  cms:snapshots:{blogId} → Version history        │           │
│  │  cms:sessions:{token}   → JWT sessions           │           │
│  └──────────────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    PUBLISHING PIPELINE                           │
│                                                                  │
│  Draft → Validate → Markdown → GitHub Commit → Netlify Build   │
│                                                                  │
│  Output: content/blogs/{yyyy-mm-dd}-{slug}.md                   │
│          public/images/blog/{slug}/*.webp                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      ANALYTICS LAYER                             │
│  Umami: Page views, read time, scroll depth, social clicks      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Blog Lifecycle State Machine

```
┌─────────┐
│  DRAFT  │ ← Author creates/edits
└────┬────┘
     │ Submit for IR
     ↓
┌──────────────────┐
│ INTERNAL_REVIEW  │ ← Internal reviewer adds comments
└────┬─────────────┘
     │ Approve / Request Changes
     ↓
┌─────────────────────┐     ┌──────────────────────┐
│ CHANGES_REQUESTED_IR│ →   │   ADMIN_REVIEW       │
└─────────────────────┘     └──────┬───────────────┘
     ↑ Author fixes              │ Admin adds comments
     │                           ↓
     │                  ┌──────────────────────────┐
     └──────────────────│ CHANGES_REQUESTED_ADMIN  │
                        └──────────┬───────────────┘
                                   │ Author fixes
                                   ↓
                        ┌──────────────────┐
                        │    APPROVED      │
                        └──────┬───────────┘
                               │ Publish
                               ↓
                        ┌──────────────────┐
                        │   PUBLISHED      │
                        └──────┬───────────┘
                               │ After 4 newer blogs
                               ↓
                        ┌──────────────────┐
                        │     LOCKED       │ (Read-only)
                        └──────────────────┘
```

---

## Data Models

### Blog Draft Schema

```typescript
interface BlogDraft {
  id: string;                    // UUID
  authorEmail: string;
  authorName: string;
  
  // Content
  title: string;
  slug: string;                  // Locked after internal_review
  description: string;
  featuredImage: string;         // URL to uploaded image
  tags: string[];
  
  // Content blocks (structured for editing)
  contentBlocks: ContentBlock[];
  
  // Metadata
  status: BlogStatus;
  version: number;               // Incremented on each save
  createdAt: string;             // ISO timestamp
  updatedAt: string;
  
  // Review tracking
  submittedForIRAt?: string;
  submittedForAdminAt?: string;
  approvedAt?: string;
  publishedAt?: string;
}

type BlogStatus = 
  | 'draft'
  | 'internal_review'
  | 'changes_requested_ir'
  | 'admin_review'
  | 'changes_requested_admin'
  | 'approved'
  | 'published'
  | 'locked';

interface ContentBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'list' | 'quote' | 'code';
  content: string | ImageContent;
  level?: number;                // For headings (h2, h3, etc.)
  order: number;
}

interface ImageContent {
  src: string;
  alt: string;
  caption?: string;
}
```

### Inline Comment Schema

```typescript
interface InlineComment {
  id: string;
  blogId: string;
  draftVersion: number;          // Version when comment was added
  
  // Text anchor (for precise positioning)
  anchor: {
    exact: string;               // Exact text selected
    prefix: string;              // 20 chars before
    suffix: string;              // 20 chars after
    blockId: string;             // Content block ID
  };
  
  // Comment data
  comment: string;
  assignedTo: string;            // Author email
  createdBy: string;             // Reviewer email
  reviewStage: 'internal_review' | 'admin_review';
  
  // Status
  resolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
  
  createdAt: string;
}
```

### Redis Keys Structure

```
cms:blog:{blogId}                    → Hash (BlogDraft)
cms:blogs:{authorEmail}              → Sorted Set (score=updatedAt, value=blogId)
cms:comments:{blogId}                → List (InlineComment[])
cms:snapshots:{blogId}:{version}     → Hash (BlogDraft snapshot)
cms:session:{sessionToken}           → Hash (Session data)
cms:images:{blogId}                  → Set (image URLs for cleanup)
```

---

## Component Architecture

### 1. Authentication (`/app/api/auth/`)

- `POST /api/auth/google` - Verify Google ID token
- `POST /api/auth/logout` - Clear session
- `GET /api/auth/session` - Get current user

**Flow**:
1. Frontend uses Google Identity Services
2. Backend verifies token with Google
3. Check email domain = `@samanvayfoundation.org`
4. Create JWT, store in httpOnly cookie
5. Determine role (admin via env var, else author)

### 2. Blog Editor (`/app/cms/editor/[blogId]`)

**Reuses existing components**:
- `components/ui/MarkdownContent.tsx` (read-only preview)
- `components/blog/BlogContent.tsx`
- Blog layout from `app/blog/[slug]/page.tsx`

**New components**:
- `components/cms/BlogEditor.tsx` - Main editor wrapper
- `components/cms/ContentBlockEditor.tsx` - Editable blocks
- `components/cms/EditorToolbar.tsx` - Add blocks, formatting
- `components/cms/ImageUploader.tsx` - Upload to GitHub

**Editing modes**:
- **Draft mode**: Inline editing, add/remove blocks
- **Review mode**: Read-only with comment overlay
- **Preview mode**: Exact published appearance

### 3. Inline Comment System

**Components**:
- `components/cms/CommentOverlay.tsx` - Highlight commented text
- `components/cms/CommentThread.tsx` - Show/resolve comments
- `components/cms/TextSelector.tsx` - Select text to comment

**Implementation**:
- Use `window.getSelection()` for text selection
- Store anchor with prefix/suffix for robustness
- Render highlights using `<mark>` with absolute positioning
- Comments sidebar shows all threads

### 4. Review Dashboards

**Author Dashboard** (`/app/cms/dashboard`):
- My drafts (max 4 editable)
- Blogs in review (read-only)
- Comments assigned to me
- Publish history

**Internal Reviewer Dashboard** (`/app/cms/review/internal`):
- Blogs pending IR
- Add inline comments
- Approve → Admin Review
- Request changes → Author

**Admin Dashboard** (`/app/cms/review/admin`):
- Blogs pending admin review
- Add inline comments
- Approve → Ready to publish
- Request changes → Author
- Force publish (emergency)

### 5. Publishing Pipeline

**API Route**: `POST /api/cms/publish`

**Steps**:
1. Validate all comments resolved
2. Validate featured image exists
3. Convert content blocks → Markdown
4. Generate frontmatter
5. Upload images to `public/images/blog/{slug}/`
6. Commit markdown to `content/blogs/{date}-{slug}.md`
7. Update blog status → `published`
8. Trigger Netlify build webhook (optional)

**GitHub Integration**:
- Use GitHub API with personal access token
- Create file via `/repos/{owner}/{repo}/contents/{path}`
- Atomic commits with proper messages

---

## API Routes

### Authentication
- `POST /api/auth/google` - Login with Google
- `POST /api/auth/logout` - Logout
- `GET /api/auth/session` - Get session

### Blog CRUD
- `GET /api/cms/blogs` - List user's blogs
- `POST /api/cms/blogs` - Create new blog
- `GET /api/cms/blogs/[id]` - Get blog by ID
- `PUT /api/cms/blogs/[id]` - Update blog
- `DELETE /api/cms/blogs/[id]` - Delete draft (if not in review)

### Workflow
- `POST /api/cms/blogs/[id]/submit-ir` - Submit for internal review
- `POST /api/cms/blogs/[id]/submit-admin` - Submit for admin review
- `POST /api/cms/blogs/[id]/approve` - Approve (IR or Admin)
- `POST /api/cms/blogs/[id]/request-changes` - Request changes
- `POST /api/cms/blogs/[id]/publish` - Publish to GitHub

### Comments
- `GET /api/cms/blogs/[id]/comments` - Get all comments
- `POST /api/cms/blogs/[id]/comments` - Add comment
- `PUT /api/cms/comments/[id]/resolve` - Resolve comment
- `DELETE /api/cms/comments/[id]` - Delete comment (admin only)

### Images
- `POST /api/cms/images/upload` - Upload image to GitHub
- `DELETE /api/cms/images/[path]` - Delete draft image

### Analytics
- `GET /api/cms/analytics/[slug]` - Get blog analytics from Umami

---

## Security & Permissions

### Role-Based Access Control

```typescript
const permissions = {
  author: [
    'create_blog',
    'edit_own_draft',
    'view_own_blogs',
    'respond_to_comments',
    'submit_for_ir',
  ],
  
  internal_reviewer: [
    'view_ir_queue',
    'add_comments',
    'approve_for_admin',
    'request_changes',
  ],
  
  admin: [
    'view_all_blogs',
    'add_comments',
    'approve_final',
    'request_changes',
    'publish',
    'force_publish',
    'delete_any_blog',
  ],
};
```

### Middleware Protection

```typescript
// app/api/cms/[...]/route.ts
export async function GET(req: Request) {
  const session = await getSession(req);
  if (!session) return unauthorized();
  
  // Check permissions
  if (!hasPermission(session.role, 'view_blogs')) {
    return forbidden();
  }
  
  // Proceed...
}
```

---

## Failure Modes & Resilience

### Redis Down
- CMS disabled (show maintenance message)
- Published blogs still readable (from Git)
- No data loss (Redis is cache, Git is source of truth)

### GitHub API Down
- Publishing blocked
- Queue publish requests in Redis
- Retry with exponential backoff
- Admin can force retry

### Netlify Build Failure
- Do NOT mark blog as published
- Show error to admin
- Allow manual retry
- Rollback option

---

## Migration Path: Netlify → AWS EC2

**No architecture changes required**:
- Same Next.js app
- Same Redis connection
- Same GitHub integration
- Change: Serverless functions → Node.js server
- Change: Add PM2 for process management
- Change: Add Nginx reverse proxy

**Environment variables remain identical**

---

## Analytics Integration (Umami)

### Setup
1. Add Umami script to `app/layout.tsx`
2. Track custom events via `umami.track()`

### Events Tracked
- `blog_view` - Page view with slug, author, tags
- `blog_read_time` - Time spent reading (no upper limit)
- `blog_scroll_depth` - 10%, 25%, 50%, 75%, 90%, 100%
- `social_share` - Twitter, LinkedIn, WhatsApp, Copy Link
- `cta_click` - Get Started, Contact Us

### Implementation
```typescript
// components/blog/BlogAnalyticsTracker.tsx
useEffect(() => {
  umami.track('blog_view', {
    slug,
    author,
    tags: tags.join(','),
  });
  
  // Track read time
  const startTime = Date.now();
  const trackReadTime = () => {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    umami.track('blog_read_time', { slug, duration });
  };
  
  window.addEventListener('beforeunload', trackReadTime);
  return () => window.removeEventListener('beforeunload', trackReadTime);
}, []);
```

---

## Quality Gates (Pre-Publish Validation)

```typescript
interface QualityCheck {
  check: string;
  passed: boolean;
  message?: string;
}

async function validateBlogForPublish(blog: BlogDraft): Promise<QualityCheck[]> {
  return [
    {
      check: 'All comments resolved',
      passed: await allCommentsResolved(blog.id),
      message: 'Resolve all reviewer comments before publishing',
    },
    {
      check: 'Featured image present',
      passed: !!blog.featuredImage,
      message: 'Add a featured image',
    },
    {
      check: 'SEO description present',
      passed: !!blog.description && blog.description.length >= 50,
      message: 'Add a description (min 50 characters)',
    },
    {
      check: 'At least 3 tags',
      passed: blog.tags.length >= 3,
      message: 'Add at least 3 tags',
    },
    {
      check: 'Title length',
      passed: blog.title.length >= 10 && blog.title.length <= 100,
      message: 'Title should be 10-100 characters',
    },
  ];
}
```

---

## Environment Variables

```bash
# Google Authentication
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com

# Upstash Redis
UPSTASH_REDIS_URL=https://your-redis.upstash.io
UPSTASH_REDIS_TOKEN=your-token

# GitHub Publishing
GITHUB_TOKEN=ghp_your_personal_access_token
GITHUB_OWNER=samanvayfoundation
GITHUB_REPO=avninew-v2-PROD
GITHUB_BRANCH=main

# CMS Configuration
CMS_ADMIN_EMAILS=admin1@samanvayfoundation.org,admin2@samanvayfoundation.org
JWT_SECRET=your-secret-key-min-32-chars

# Umami Analytics
UMAMI_WEBSITE_ID=your-website-id
UMAMI_API_URL=https://analytics.umami.is

# Optional: Netlify Build Webhook
NETLIFY_BUILD_HOOK=https://api.netlify.com/build_hooks/your-hook-id
```

---

## Deployment Checklist

### Netlify
- [x] Add environment variables
- [x] Enable serverless functions
- [x] Set build command: `npm run build`
- [x] Set publish directory: `.next`

### Upstash Redis
- [x] Create free Redis instance
- [x] Copy connection URL and token
- [x] Test connection

### Google Cloud Console
- [x] Create OAuth 2.0 credentials
- [x] Add authorized JavaScript origins
- [x] Add authorized redirect URIs

### GitHub
- [x] Create personal access token
- [x] Grant `repo` scope
- [x] Test write access

### Umami
- [x] Create website
- [x] Copy website ID
- [x] Add tracking script

---

## Success Metrics

- ✅ UI parity: Pixel-identical to published blogs
- ✅ Inline comments: Working with author assignment
- ✅ Internal review: Enforced before admin review
- ✅ Git source of truth: All published content in repo
- ✅ Analytics: Complete tracking
- ✅ Monthly cost: $0

---

## Next Steps

1. Implement authentication layer
2. Build Redis data layer
3. Create blog editor with real layout
4. Implement inline comment system
5. Build review workflows
6. Create publishing pipeline
7. Integrate analytics
8. Add quality gates
9. Test end-to-end
10. Deploy to Netlify
