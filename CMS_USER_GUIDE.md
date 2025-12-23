# Avni Blog CMS - User Guide

## Table of Contents

1. [Getting Started](#getting-started)
2. [Author Workflow](#author-workflow)
3. [Internal Reviewer Workflow](#internal-reviewer-workflow)
4. [Admin Workflow](#admin-workflow)
5. [Blog Editor Guide](#blog-editor-guide)
6. [Inline Comments System](#inline-comments-system)
7. [Publishing Process](#publishing-process)
8. [FAQs](#faqs)

---

## Getting Started

### Logging In

1. Go to `https://your-domain.com/cms`
2. Click **Sign in with Google**
3. Select your `@samanvayfoundation.org` account
4. You'll be redirected to your dashboard

**Note**: Only email addresses with `@samanvayfoundation.org` domain can access the CMS.

### Your Role

Your role is automatically assigned:
- **Author**: Default role for all users
- **Internal Reviewer**: Manually assigned by admin
- **Admin**: Defined in `CMS_ADMIN_EMAILS` environment variable

---

## Author Workflow

### Creating a New Blog

1. Go to **Dashboard** → Click **New Blog**
2. Enter a title (slug is auto-generated)
3. Click **Create**

### Editing Your Blog

1. **Title**: Main heading of your blog
2. **Description**: SEO description (minimum 50 characters)
3. **Featured Image**: URL to the main blog image
4. **Tags**: Add at least 3 tags (press Enter after each)
5. **Content Blocks**: Add paragraphs, headings, images, etc.

### Content Blocks

Click **+ Add Block** to add:
- **Heading**: H2, H3, or H4 headings
- **Paragraph**: Regular text content
- **Image**: Image with alt text and optional caption
- **List**: Bulleted list (one item per line)
- **Quote**: Block quote
- **Code**: Code snippet

**Reordering**: Drag blocks by the grip icon to reorder

### Saving Your Work

- Click **Save** in the top right
- Auto-save every 30 seconds (coming soon)
- Version history is maintained

### Previewing Your Blog

- Click **Preview** to see how it will look when published
- Preview uses the exact same layout as published blogs
- Click **Exit Preview** to return to editing

### Submitting for Review

1. Complete all required fields:
   - Title
   - Description (min 50 chars)
   - Featured image
   - At least 3 tags
   - At least one content block

2. Click **Submit for Internal Review**

3. Your blog status changes to **INTERNAL REVIEW**

4. You can no longer edit until changes are requested

### Responding to Comments

When reviewers add comments:

1. You'll see highlighted text in your blog
2. Click the highlight to view the comment
3. Make the requested changes
4. Click **Mark as Resolved** on each comment
5. Once all comments are resolved, resubmit for review

### Blog Limits

- You can have **maximum 4 editable blogs** at a time
- Includes drafts and published blogs
- Older blogs are automatically locked (read-only)
- Locked blogs cannot be edited

---

## Internal Reviewer Workflow

### Viewing Blogs for Review

1. Go to **Internal Review Queue**
2. See all blogs in **INTERNAL_REVIEW** status
3. Click on a blog to review

### Adding Inline Comments

1. Select the text you want to comment on
2. Click **Add Comment** button that appears
3. Type your comment
4. Click **Add Comment**

**Comment is automatically assigned to the blog author**

### Review Actions

After reviewing:

**Approve for Admin Review**:
- Blog moves to **ADMIN_REVIEW** status
- Admin will do final review

**Request Changes**:
- Blog returns to author with **CHANGES_REQUESTED_IR** status
- Author can edit and resubmit

---

## Admin Workflow

### Admin Dashboard

Access all blogs and reviews:
- **All Blogs**: View all blogs in the system
- **Admin Review Queue**: Blogs awaiting final approval
- **Published Blogs**: All published content
- **Analytics**: Blog performance metrics

### Final Review

1. Go to **Admin Review Queue**
2. Click on a blog to review
3. Add inline comments if needed
4. Choose action:
   - **Approve**: Blog ready to publish
   - **Request Changes**: Return to author

### Publishing a Blog

1. Blog must be in **APPROVED** status
2. Click **Publish**
3. System runs quality checks:
   - All comments resolved
   - Featured image present
   - SEO description present (min 50 chars)
   - At least 3 tags
   - Valid slug format
   - Content blocks present

4. If checks pass:
   - Blog is converted to markdown
   - Committed to GitHub repository
   - Status changes to **PUBLISHED**
   - Netlify build triggered (optional)

5. If checks fail:
   - Error message shows which checks failed
   - Fix issues and try again

### Force Publish (Emergency)

- Use only in emergencies
- Bypasses some quality checks
- Requires admin role

### Managing Users

**Assign Internal Reviewer Role**:
- Currently done via direct database access
- Contact system administrator

**Remove User Access**:
- Remove from Google Workspace
- Access automatically revoked

---

## Blog Editor Guide

### Editor Interface

**Top Bar**:
- Blog title and status badge
- Preview button
- Save button

**Main Area**:
- Title input
- Description textarea
- Featured image URL
- Content blocks (drag to reorder)

**Sidebar**:
- Tags management
- Metadata (author, dates, version)

### Keyboard Shortcuts

- `Cmd/Ctrl + S`: Save
- `Cmd/Ctrl + P`: Preview
- `Cmd/Ctrl + Z`: Undo (coming soon)

### Image Best Practices

**Featured Image**:
- Recommended size: 1200x630px
- Format: WebP or JPEG
- Max file size: 500KB

**Content Images**:
- Use descriptive alt text
- Add captions for context
- Optimize before uploading

### Writing Tips

1. **Use headings** to structure content (H2 for sections, H3 for subsections)
2. **Keep paragraphs short** (3-5 sentences)
3. **Use lists** for easy scanning
4. **Add images** to break up text
5. **Use quotes** for emphasis
6. **Write clear alt text** for accessibility

---

## Inline Comments System

### How It Works

1. **Reviewer selects text** in the blog
2. **Clicks "Add Comment"** button
3. **Types feedback** in the comment box
4. **Comment is assigned** to the blog author
5. **Author receives notification** (coming soon)
6. **Author makes changes** and marks resolved

### Comment States

- **Unresolved** (yellow highlight): Needs attention
- **Resolved** (green highlight): Author has addressed

### Comment Visibility

- **Authors**: See only comments on their blogs
- **Reviewers**: See comments they created
- **Admins**: See all comments

### Resolving Comments

**Authors can**:
- Mark comments as resolved
- Unresolve if needed
- Reply to comments (coming soon)

**Reviewers cannot**:
- Resolve their own comments
- Only authors can mark as resolved

---

## Publishing Process

### Complete Workflow

```
DRAFT
  ↓ (Author submits)
INTERNAL_REVIEW
  ↓ (IR approves)
ADMIN_REVIEW
  ↓ (Admin approves)
APPROVED
  ↓ (Admin publishes)
PUBLISHED
  ↓ (After 4 newer blogs)
LOCKED
```

### Alternative Paths

**Changes Requested at IR**:
```
INTERNAL_REVIEW
  ↓ (IR requests changes)
CHANGES_REQUESTED_IR
  ↓ (Author fixes and resubmits)
INTERNAL_REVIEW
```

**Changes Requested at Admin**:
```
ADMIN_REVIEW
  ↓ (Admin requests changes)
CHANGES_REQUESTED_ADMIN
  ↓ (Author fixes and resubmits)
INTERNAL_REVIEW (starts over)
```

### Quality Checks

Before publishing, blog must pass:

✅ All comments resolved  
✅ Featured image present  
✅ SEO description (min 50 chars)  
✅ At least 3 tags  
✅ Title length (10-100 chars)  
✅ Valid slug format  
✅ Content blocks present  
✅ At least one paragraph  

### After Publishing

1. Blog appears on website (after Netlify build)
2. Markdown file in `content/blogs/YYYY-MM-DD-slug.md`
3. Images in `public/images/blog/slug/`
4. Blog remains editable (if within last 4 blogs)
5. After 4 newer blogs, becomes locked (read-only)

---

## FAQs

### General

**Q: Can I edit a published blog?**  
A: Yes, if it's within your last 4 blogs. After that, it's locked.

**Q: What happens to my oldest blog when I create a 5th?**  
A: It becomes locked (read-only). You can view but not edit.

**Q: Can I delete a blog?**  
A: Yes, but only drafts. Published blogs cannot be deleted (admin only).

**Q: How do I add images?**  
A: Upload to GitHub or use external URL. Image uploader coming soon.

### Workflow

**Q: Can I skip internal review?**  
A: No, all blogs must go through internal review, then admin review.

**Q: What if I disagree with a comment?**  
A: Discuss with the reviewer. Admins can override if needed.

**Q: Can I see who reviewed my blog?**  
A: Yes, each comment shows the reviewer's name.

**Q: How long does review take?**  
A: Depends on reviewer availability. Typically 1-3 business days.

### Technical

**Q: Why can't I log in?**  
A: Ensure you're using your `@samanvayfoundation.org` email.

**Q: My changes aren't saving**  
A: Check your internet connection. Try refreshing and saving again.

**Q: Preview doesn't match published blog**  
A: Report this as a bug. Preview should be pixel-identical.

**Q: Can I write in markdown directly?**  
A: Not yet. Use content blocks for now. Markdown import coming soon.

### Publishing

**Q: How long until my blog appears on the website?**  
A: Usually 2-5 minutes after publishing (Netlify build time).

**Q: Can I schedule a blog for future publication?**  
A: Not yet. Coming soon.

**Q: What if publishing fails?**  
A: Contact admin. They can retry or force publish.

**Q: Can I unpublish a blog?**  
A: Admin only. Contact admin if needed.

---

## Support

For help:
1. Check this guide first
2. Ask in team Slack channel
3. Contact CMS admin
4. Report bugs via GitHub issues

---

## Best Practices

### For Authors

- ✅ Write in content blocks (easier to edit)
- ✅ Use descriptive titles and tags
- ✅ Add alt text to all images
- ✅ Preview before submitting
- ✅ Respond to comments promptly
- ✅ Keep blogs within 1000-2000 words

### For Reviewers

- ✅ Be specific in comments
- ✅ Suggest improvements, not just criticisms
- ✅ Check for grammar and clarity
- ✅ Verify facts and links
- ✅ Review within 2 business days

### For Admins

- ✅ Final quality check before publishing
- ✅ Verify SEO optimization
- ✅ Check image quality
- ✅ Test links
- ✅ Monitor analytics after publishing

---

## Changelog

### Version 1.0.0 (Current)
- Initial release
- Basic blog editor
- Inline comments
- Internal review workflow
- Admin review workflow
- GitHub publishing
- Umami analytics integration

### Coming Soon
- Auto-save
- Image uploader
- Markdown import/export
- Scheduled publishing
- Email notifications
- Comment replies
- Version history viewer
- Blog templates
