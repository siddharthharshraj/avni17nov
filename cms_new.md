# Avni CMS - Zero-Cost Architecture Specification

## Executive Summary

A lightweight Content Management System (CMS) for the Avni website that enables Workspace-only team members to create, review, and publish blog posts. Built with **100% free forever** technology stack using existing Upstash Redis, Google APIs, and GitHub integration. Supports draft review with inline comments, shareable preview links, immutable audit logging, and automatic publishing to the repository.

## UI Compatibility Requirements

### Critical: Never Break Existing UI
- **Reuse existing components only**: All CMS UI must use existing `components/ui/*` and `components/layout/*` components
- **Maintain design system**: Use existing `COLORS`, `ANIMATIONS`, `LAYOUT` constants from `/lib/constants/index.ts`
- **Follow existing patterns**: Use same responsive breakpoints, spacing, and typography as current site
- **No new dependencies**: CMS must not introduce any new UI libraries or frameworks

### Critical: Blog Rendering Must Remain Identical
- **Every blog must look exactly the same as it is built now**
- **No changes to blog rendering pipeline**: Use existing `lib/markdown.ts` and `components/ui/MarkdownContent.tsx`
- **No changes to blog layout**: Use existing `components/blog/BlogContent.tsx` structure
- **No changes to blog styling**: Maintain exact same typography, spacing, colors, and responsive behavior
- **No changes to image handling**: Use existing image optimization and display logic
- **No changes to metadata**: Use existing frontmatter processing and display
- **Draft previews use same rendering**: Preview pages must use identical `MarkdownContent.tsx` component
- **Published blogs identical**: CMS-published blogs must be indistinguishable from existing blogs

### Existing UI Components to Reuse
- **Button**: Use `/components/ui/Button.tsx` with variants (primary, secondary, outline)
- **Container**: Use `/components/ui/Container.tsx` for responsive layout
- **Section**: Use `/components/ui/Section.tsx` for consistent spacing
- **MarkdownContent**: Use `/components/ui/MarkdownContent.tsx` for blog rendering
- **Header/Footer**: Use existing layout components for consistent navigation
- **Typography**: Use `font-anek` for headings, existing font sizes and weights
- **Colors**: Use existing color palette (`#419372` primary, `#0b2540` darkNavy, etc.)
- **Spacing**: Follow existing padding/margin patterns from components

### CMS UI Pages Structure
All CMS pages must follow this exact structure:
```tsx
// Use existing Container and Section components
<Container size="full">
  <Section spacing="lg" bg="white">
    {/* CMS content using existing Button, typography, colors */}
  </Section>
</Container>
```

### Responsive Design Requirements
- **Mobile-first**: Follow existing responsive patterns from `BlogCard.tsx` and `Header.tsx`
- **Breakpoints**: Use existing Tailwind breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- **Layout**: Use existing flex/grid patterns and spacing utilities
- **Navigation**: Integrate with existing header/navigation system

## System Overview

### Current State
- Next.js 16 static website with markdown-based blogs in `/content/blogs/`
- 100+ existing blog posts rendered via `lib/markdown.ts` and `MarkdownContent.tsx`
- Upstash Redis already configured for URL shortener
- Google APIs already configured for calendar events
- No existing authentication or admin system

### Target State
- Workspace-only login via Google Sign-In
- Draft creation and management with Upstash Redis
- Admin review workflow with Google Docs-style inline comments
- Shareable draft preview links (no login required)
- Immutable audit logging via git commits
- Automatic publishing to `content/blogs/` via GitHub API

## UI Design Specifications

### CMS Dashboard Layout
```tsx
// Exact structure following existing patterns
<Container size="full">
  <Section spacing="lg" bg="white">
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar - following existing responsive patterns */}
      <div className="lg:col-span-1">
        <nav className="space-y-2">
          <Button variant="primary" size="md" className="w-full justify-start">
            Create New Draft
          </Button>
          <Button variant="outline" size="md" className="w-full justify-start">
            My Drafts
          </Button>
          <Button variant="outline" size="md" className="w-full justify-start">
            Review Queue
          </Button>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="lg:col-span-3">
        {/* Content using existing typography and spacing */}
      </div>
    </div>
  </Section>
</Container>
```

### Draft Editor UI
- **Editor container**: Use existing `Section` with proper spacing
- **Typography**: Use `font-anek` for headings, existing text colors
- **Buttons**: Use existing `Button` component with proper variants
- **Forms**: Follow form patterns from `SignupForm.tsx`
- **Responsive**: Use existing responsive classes and breakpoints

### Admin Review Interface
- **Layout**: Same grid structure as dashboard
- **Comments panel**: Use existing card patterns from `BlogCard.tsx`
- **Status badges**: Use existing badge patterns from blog components
- **Actions**: Use existing `Button` variants for approve/reject

### Preview Page
- **Header**: Use existing `Header.tsx` component
- **Content**: Use existing `MarkdownContent.tsx` component - **EXACTLY SAME AS PUBLISHED BLOGS**
- **Styling**: Same as published blog pages - **NO DIFFERENCES WHATSOEVER**
- **Navigation**: Integrate with existing navigation system
- **Critical**: Preview pages must be visually identical to published blogs

## Technical Architecture

### API Routes Structure
All API routes follow existing patterns:
- `/api/cms/auth/*` - Authentication endpoints
- `/api/cms/drafts/*` - Draft CRUD operations
- `/api/cms/review/*` - Admin review endpoints
- `/api/cms/comments/*` - Comment management
- `/api/cms/preview/*` - Draft preview links
- `/api/cms/publish/*` - Publishing to GitHub

### Component Architecture
- **Server Components**: For static content and initial data loading
- **Client Components**: For interactive features (editor, comments)
- **API Integration**: Following existing API patterns from `events/route.ts`
- **Error Handling**: Consistent with existing API routes

### Data Flow
1. **Authentication**: Google Sign-In → JWT cookie → API verification
2. **Draft Operations**: Client → API → Redis → Client
3. **Review Process**: Draft → Comments → Status updates → Notifications
4. **Publishing**: Ready draft → GitHub API → Git commit → Live blog

## Functional Requirements

### 1. Authentication (Workspace Only)

#### 1.1 Google Workspace Login
- **Google Sign-In** with ID token verification
- **Domain restriction**: Only `@samanvayfoundation.org` emails allowed
- **Verification**: Use existing `googleapis` to verify ID tokens
- **Session management**: Server-issued signed JWT cookies
- **Roles**: Admins (via env var `CMS_ADMIN_EMAILS`) and Authors

#### 1.2 Session Management
- HttpOnly, secure cookies for session tokens
- Automatic token refresh on API calls
- No external auth provider dependencies

### 2. Draft Management (Last 3 in DB)

#### 2.1 Draft Creation & Storage
- Rich text editor with markdown support
- Auto-save functionality
- **Storage constraint**: Only last 3 drafts per user in Upstash Redis
- Automatic eviction of oldest draft when limit exceeded

#### 2.2 Draft Storage Schema
```typescript
interface Draft {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  authorEmail: string;
  status: 'draft' | 'pending_review' | 'ready_to_publish' | 'rejected';
  version: number;
  createdAt: string;
  updatedAt: string;
}
```

#### 2.3 Redis Key Structure
- `cms:draft:<id>` → Draft JSON
- `cms:drafts:<authorEmail>` → Ordered list of draft IDs (newest first)
- `cms:draft:counter` → Auto-increment counter for draft IDs

### 3. Admin Review Workflow

#### 3.1 Review Process
1. **Author submits draft** → Status: `pending_review`
2. **Admin reviews with inline comments** → Can approve, reject, or request changes
3. **Admin sets status to `ready_to_publish`**
4. **Author publishes** → Status moves to published (stored in repo)

#### 3.2 Google Docs-Style Inline Comments
- **Text selection**: Users select text to comment on
- **Comment storage**: Each comment stores:
  ```typescript
  interface Comment {
    id: string;
    draftId: string;
    exact: string;           // Selected text
    prefix: string;          // Context before selection
    suffix: string;          // Context after selection
    comment: string;         // Admin comment
    adminEmail: string;
    createdAt: string;
    resolved: boolean;
    draftVersion: number;    // For re-finding after edits
  }
  ```
- **Rendering**: Highlight text in editor and show comments in side panel
- **Orphaned comments**: Still visible if text can't be located after edits

#### 3.3 Comment Storage
- Comments stored with draft in Redis
- Also included in immutable audit log

### 4. Draft Preview Links

#### 4.1 Shareable Preview
- **Route**: `/blog/preview/<secretToken>`
- **Access**: Link-only, no login required
- **Security**: Cryptographically strong tokens (128-bit random, ~22+ chars)
- **UI**: Same layout as published blog posts

#### 4.2 Preview Implementation
- Reuse existing blog page layout
- Load draft data from Redis instead of markdown files
- Support for images and markdown rendering

### 5. Publishing to Repository

#### 5.1 Publish Process
- Author can only publish if status is `ready_to_publish`
- Server generates final markdown with frontmatter
- Commits to GitHub repository via API
- Images uploaded to `public/images/blog/`
- **Critical**: Published blogs must be identical to existing blogs in every way
- **No visual differences**: CMS-published blogs must be indistinguishable from manual blogs

#### 5.2 GitHub Integration
- **Token**: Separate `GITHUB_WRITE_TOKEN` with repo write scope
- **Commit flow**:
  1. Generate markdown file with proper frontmatter
  2. Upload images to appropriate paths
  3. Create commit with author attribution
  4. Trigger Netlify rebuild

#### 5.3 Frontmatter Format
```yaml
---
title: "Blog Title"
description: "SEO description"
featuredImage: "/images/blog/slug/featured.jpg"
date: "2025-12-18"
author: "Author Name"
published: true
---
```

### 6. Immutable Audit Logging

#### 6.1 Audit Trail Design
- **Storage**: Git-based append-only log in `content/cms-audit/`
- **Format**: JSON Lines files by month: `2025-12.jsonl`
- **Events**: Create, edit, submit, comment, status change, publish

#### 6.2 Audit Event Schema
```typescript
interface AuditEvent {
  timestamp: string;
  event: string;
  userEmail: string;
  draftId?: string;
  oldValues?: any;
  newValues?: any;
  metadata?: any;
}
```

#### 6.3 Logging Process
- Every action appends to current month's JSONL file
- File committed to git via GitHub API
- Provides "forever" retention with git history

## Technical Architecture

### Technology Stack (100% Free Forever)

#### Authentication
- **Google Sign-In**: ID token verification via `googleapis`
- **Session management**: JWT via `jose`
- **Domain restriction**: `@samanvayfoundation.org` only

#### Database & Storage
- **Upstash Redis**: Draft storage, comments, preview tokens
- **Redis limits**: 10,000 requests/day free
- **GitHub**: Published content storage and audit log

#### File Storage
- **Draft images**: Temporary storage in Upstash or GitHub
- **Published images**: `public/images/blog/` in repository
- **CDN**: Netlify's built-in CDN

#### Frontend
- **Next.js 16**: App Router, Server Components
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Existing styling system
- **Markdown**: Existing `react-markdown` pipeline

#### Rich Text Editor
- **Tiptap**: Extensible rich text editor
- **Markdown support**: Seamless import/export
- **Comment system**: Custom annotation layer

## API Design

### Authentication Endpoints
```
POST /api/cms/auth/signin     # Verify Google ID token
POST /api/cms/auth/signout    # Clear session cookie
GET  /api/cms/auth/me         # Get current user info
```

### Draft Management Endpoints
```
GET    /api/cms/drafts           # List user's drafts
POST   /api/cms/drafts           # Create new draft
GET    /api/cms/drafts/[id]      # Get specific draft
PUT    /api/cms/drafts/[id]      # Update draft
DELETE /api/cms/drafts/[id]      # Delete draft (soft delete)
POST   /api/cms/drafts/[id]/submit # Submit for review
```

### Admin Endpoints
```
GET    /api/cms/admin/drafts     # List all drafts for review
POST   /api/cms/admin/drafts/[id]/review # Review draft
PUT    /api/cms/admin/drafts/[id]/status # Update status
```

### Comments Endpoints
```
GET    /api/cms/drafts/[id]/comments     # Get draft comments
POST   /api/cms/drafts/[id]/comments     # Add comment
PUT    /api/cms/comments/[id]             # Update comment
DELETE /api/cms/comments/[id]             # Delete comment
POST   /api/cms/comments/[id]/resolve     # Resolve comment
```

### Preview Endpoints
```
GET    /api/cms/preview/[token]           # Get draft for preview
POST   /api/cms/drafts/[id]/share        # Create share link
```

### Publishing Endpoints
```
POST   /api/cms/drafts/[id]/publish       # Publish to repository
GET    /api/cms/publish/status/[id]       # Check publish status
```

## Database Schema (Redis)

### Draft Storage
```
cms:draft:123456 → {
  id: "123456",
  title: "My Blog Post",
  slug: "my-blog-post",
  content: "# My Blog Post\n\nContent...",
  excerpt: "Brief excerpt...",
  featuredImage: "/images/blog/my-blog-post/featured.jpg",
  authorEmail: "user@samanvayfoundation.org",
  status: "draft",
  version: 1,
  createdAt: "2025-12-18T10:00:00Z",
  updatedAt: "2025-12-18T10:00:00Z"
}

cms:drafts:user@samanvayfoundation.org → ["123456", "123455", "123454"]
cms:draft:counter → "123457"
```

### Comments Storage
```
cms:comment:789 → {
  id: "789",
  draftId: "123456",
  exact: "selected text",
  prefix: "context before",
  suffix: "context after",
  comment: "Please clarify this point",
  adminEmail: "admin@samanvayfoundation.org",
  createdAt: "2025-12-18T10:30:00Z",
  resolved: false,
  draftVersion: 1
}

cms:comments:123456 → ["789", "790", "791"]
```

### Preview Tokens
```
cms:preview:abc123def456 → {
  draftId: "123456",
  createdAt: "2025-12-18T10:00:00Z",
  expiresAt: "2025-12-25T10:00:00Z"
}
```

## User Interface Design

### Dashboard Layout
- **Navigation**: Drafts, Review Queue, Published
- **Main Content**: Draft editor or review interface
- **Sidebar**: Draft metadata, comments panel
- **Top Bar**: User profile, notifications

### Draft Editor Interface
- **Rich text editor**: Tiptap with markdown support
- **Preview mode**: Live markdown preview
- **Comments panel**: Show inline comments
- **Status bar**: Word count, save status, version

### Admin Review Interface
- **Review queue**: List of pending drafts
- **Content view**: Full draft with comment highlights
- **Comment tools**: Add, edit, resolve comments
- **Actions**: Approve, reject, request changes

### Preview Page
- **Same layout**: Reuse existing blog page design
- **No admin UI**: Clean reading experience
- **Share controls**: Copy link button

## Security Requirements

### Authentication Security
- Google ID token verification
- Domain restriction enforcement
- Secure session cookies
- CSRF protection

### Data Security
- Input validation and sanitization
- XSS protection in rich text
- SQL injection prevention (not applicable to Redis)
- Secure file upload handling

### Access Control
- Role-based permissions
- Draft ownership verification
- Admin-only review actions
- Preview token security

## Performance Requirements

### Response Times
- Page loads: < 2 seconds
- API responses: < 500ms
- Draft saves: < 1 second
- Preview loads: < 2 seconds

### Scalability
- Support 20+ concurrent users
- Handle 100+ active drafts
- Image storage for 500+ files
- 99.9% uptime availability

### Optimization
- Redis caching for draft data
- Image optimization via Sharp
- Lazy loading for content
- Efficient audit log queries

## Implementation Timeline

### Week 1: Authentication & Draft Storage
- Google Sign-In integration
- Redis draft storage
- Basic draft CRUD operations
- Draft editor interface

### Week 2: Review System
- Admin review workflow
- Inline comment system
- Review queue interface
- Status management

### Week 3: Preview & Publishing
- Shareable preview links
- GitHub publishing integration
- Image upload handling
- Audit logging system

### Week 4: Polish & Testing
- UI/UX improvements
- Error handling
- Performance optimization
- Security testing

## Cost Analysis

### Free Tier Usage
- **Upstash Redis**: 10,000 requests/day (need ~1,000) ✅
- **Google APIs**: 50,000 requests/day (need ~100) ✅
- **GitHub API**: 5,000 requests/hour (need ~100) ✅
- **Netlify**: 100GB bandwidth (need ~10GB) ✅

### Total Cost: $0/month forever

### Storage Breakdown
- Draft content: ~10MB
- Images: ~500MB
- Audit logs: ~50MB
- **Total**: ~560MB well within limits

## Risk Assessment

### Technical Risks
- **Redis limits**: Mitigated by efficient usage
- **GitHub API limits**: Mitigated by caching
- **Google token verification**: Mitigated by proper error handling
- **File storage**: Mitigated by repository-based approach

### Business Risks
- **User adoption**: Mitigated by familiar Google login
- **Content quality**: Mitigated by review workflow
- **Performance**: Mitigated by Redis caching
- **Security**: Mitigated by Google authentication

## Success Metrics

### User Engagement
- Number of active users: Target 10+
- Drafts created: Target 50+/month
- Review completion time: < 48 hours
- User satisfaction: Target 4.0/5

### System Performance
- Page load speed: < 2 seconds
- System uptime: 99.9%
- Error rate: < 0.5%
- API response time: < 500ms

## Migration Strategy

### Phase 1: Setup (Week 1)
1. Configure Google Sign-In
2. Set up Redis draft storage
3. Implement basic authentication
4. Create draft editor

### Phase 2: Review System (Week 2)
1. Build admin review interface
2. Implement inline comments
3. Add status management
4. Create review queue

### Phase 3: Publishing (Week 3)
1. Implement preview links
2. Add GitHub publishing
3. Create audit logging
4. Handle image uploads

### Phase 4: Testing (Week 4)
1. Comprehensive testing
2. Security audit
3. Performance optimization
4. User acceptance testing

---

## Appendix: Implementation Notes

### Redis Key Naming Convention
- Use consistent prefixes: `cms:draft:`, `cms:comment:`, `cms:preview:`
- Include user email in draft lists for easy querying
- Use counters for auto-incrementing IDs

### GitHub API Usage
- Separate read/write tokens
- Use appropriate commit messages
- Handle rate limits gracefully
- Include author attribution

### Security Best Practices
- Validate all inputs
- Sanitize rich text content
- Use secure cookies
- Implement rate limiting
- Log all actions for audit

### Performance Optimization
- Cache draft data in Redis
- Optimize image sizes
- Use efficient queries
- Implement lazy loading
- Monitor Redis usage
