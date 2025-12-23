/**
 * Blog Validation & Quality Gates
 * Pre-publish validation checks
 */

import { BlogDraft, QualityCheck } from './types';
import { getComments } from './redis';

export async function validateBlogForPublish(blog: BlogDraft): Promise<QualityCheck[]> {
  const checks: QualityCheck[] = [];
  
  // Check 1: All comments resolved
  const comments = await getComments(blog.id);
  const unresolvedComments = comments.filter(c => !c.resolved);
  checks.push({
    check: 'All comments resolved',
    passed: unresolvedComments.length === 0,
    message: unresolvedComments.length > 0 
      ? `${unresolvedComments.length} unresolved comment(s) remaining`
      : undefined,
  });
  
  // Check 2: Featured image present
  checks.push({
    check: 'Featured image present',
    passed: !!blog.featuredImage && blog.featuredImage.trim() !== '',
    message: !blog.featuredImage ? 'Add a featured image' : undefined,
  });
  
  // Check 3: SEO description present
  const hasDescription = !!blog.description && blog.description.length >= 50;
  checks.push({
    check: 'SEO description present',
    passed: hasDescription,
    message: !hasDescription 
      ? `Add a description (min 50 characters, current: ${blog.description?.length || 0})`
      : undefined,
  });
  
  // Check 4: At least 3 tags
  checks.push({
    check: 'At least 3 tags',
    passed: blog.tags.length >= 3,
    message: blog.tags.length < 3 
      ? `Add at least 3 tags (current: ${blog.tags.length})`
      : undefined,
  });
  
  // Check 5: Title length
  const titleValid = blog.title.length >= 10 && blog.title.length <= 100;
  checks.push({
    check: 'Title length (10-100 chars)',
    passed: titleValid,
    message: !titleValid 
      ? `Title should be 10-100 characters (current: ${blog.title.length})`
      : undefined,
  });
  
  // Check 6: Slug is valid
  const slugValid = /^[a-z0-9-]+$/.test(blog.slug);
  checks.push({
    check: 'Valid slug format',
    passed: slugValid,
    message: !slugValid 
      ? 'Slug should only contain lowercase letters, numbers, and hyphens'
      : undefined,
  });
  
  // Check 7: Content blocks present
  checks.push({
    check: 'Content blocks present',
    passed: blog.contentBlocks.length > 0,
    message: blog.contentBlocks.length === 0 
      ? 'Add content to your blog'
      : undefined,
  });
  
  // Check 8: At least one paragraph
  const hasParagraph = blog.contentBlocks.some(b => b.type === 'paragraph');
  checks.push({
    check: 'At least one paragraph',
    passed: hasParagraph,
    message: !hasParagraph 
      ? 'Add at least one paragraph of content'
      : undefined,
  });
  
  return checks;
}

export function canPublish(checks: QualityCheck[]): boolean {
  return checks.every(check => check.passed);
}

export function getFailedChecks(checks: QualityCheck[]): QualityCheck[] {
  return checks.filter(check => !check.passed);
}

export function validateSlug(slug: string): { valid: boolean; error?: string } {
  if (!slug || slug.trim() === '') {
    return { valid: false, error: 'Slug is required' };
  }
  
  if (slug.length < 3) {
    return { valid: false, error: 'Slug must be at least 3 characters' };
  }
  
  if (slug.length > 100) {
    return { valid: false, error: 'Slug must be less than 100 characters' };
  }
  
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { valid: false, error: 'Slug can only contain lowercase letters, numbers, and hyphens' };
  }
  
  if (slug.startsWith('-') || slug.endsWith('-')) {
    return { valid: false, error: 'Slug cannot start or end with a hyphen' };
  }
  
  if (slug.includes('--')) {
    return { valid: false, error: 'Slug cannot contain consecutive hyphens' };
  }
  
  return { valid: true };
}

export function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 100);
}
