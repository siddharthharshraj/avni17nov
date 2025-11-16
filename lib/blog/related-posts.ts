/**
 * Smart Related Posts Algorithm
 * 
 * Recommends blog posts based on multiple factors to keep readers engaged:
 * 1. Same category (highest priority)
 * 2. Shared tags (secondary priority)
 * 3. Recency (tertiary priority)
 * 4. Diversity (avoid duplicates, ensure variety)
 * 
 * Scoring System:
 * - Same category: +10 points
 * - Each shared tag: +3 points
 * - Recency bonus: +1 point for posts within last 30 days
 * - Diversity: Ensures no duplicates
 */

import { Blog } from '@/lib/markdown';

export interface RelatedPostScore {
  blog: Blog;
  score: number;
  reasons: string[];
}

/**
 * Calculate relevance score for a blog post
 */
function calculateRelevanceScore(
  currentBlog: Blog,
  candidateBlog: Blog
): RelatedPostScore {
  let score = 0;
  const reasons: string[] = [];

  // 1. Same category (highest weight)
  if (currentBlog.frontmatter.category === candidateBlog.frontmatter.category) {
    score += 10;
    reasons.push(`Same category: ${candidateBlog.frontmatter.category}`);
  }

  // 2. Shared tags (medium weight)
  const currentTags = new Set(currentBlog.frontmatter.tags || []);
  const candidateTags = candidateBlog.frontmatter.tags || [];
  const sharedTags = candidateTags.filter(tag => currentTags.has(tag));
  
  if (sharedTags.length > 0) {
    score += sharedTags.length * 3;
    reasons.push(`${sharedTags.length} shared tag(s): ${sharedTags.join(', ')}`);
  }

  // 3. Recency bonus (low weight)
  const candidateDate = new Date(candidateBlog.frontmatter.date);
  const daysSincePublished = Math.floor(
    (Date.now() - candidateDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (daysSincePublished <= 30) {
    score += 1;
    reasons.push('Recent post (within 30 days)');
  }

  return {
    blog: candidateBlog,
    score,
    reasons,
  };
}

/**
 * Get smart related posts for a blog
 * 
 * @param currentSlug - Slug of the current blog post
 * @param allBlogs - All available blogs
 * @param limit - Maximum number of related posts to return (default: 3)
 * @returns Array of related blogs, sorted by relevance
 */
export function getSmartRelatedPosts(
  currentSlug: string,
  allBlogs: Blog[],
  limit: number = 3
): Blog[] {
  // Find current blog
  const currentBlog = allBlogs.find(blog => blog.slug === currentSlug);
  
  if (!currentBlog) {
    // Fallback: return most recent posts
    return allBlogs
      .filter(blog => blog.slug !== currentSlug)
      .slice(0, limit);
  }

  // Get all candidate blogs (exclude current)
  const candidates = allBlogs.filter(blog => blog.slug !== currentSlug);

  // Calculate scores for all candidates
  const scoredBlogs = candidates.map(candidate =>
    calculateRelevanceScore(currentBlog, candidate)
  );

  // Sort by score (descending), then by date (descending)
  scoredBlogs.sort((a, b) => {
    // Primary sort: by score
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    
    // Secondary sort: by date (newer first)
    const dateA = new Date(a.blog.frontmatter.date).getTime();
    const dateB = new Date(b.blog.frontmatter.date).getTime();
    return dateB - dateA;
  });

  // Take top N unique posts
  const relatedPosts: Blog[] = [];
  const seenSlugs = new Set<string>();

  for (const scored of scoredBlogs) {
    // Ensure uniqueness
    if (!seenSlugs.has(scored.blog.slug)) {
      relatedPosts.push(scored.blog);
      seenSlugs.add(scored.blog.slug);
      
      // Stop when we have enough
      if (relatedPosts.length >= limit) {
        break;
      }
    }
  }

  // Fallback: if not enough related posts, fill with recent posts
  if (relatedPosts.length < limit) {
    const recentPosts = allBlogs
      .filter(blog => 
        blog.slug !== currentSlug && 
        !seenSlugs.has(blog.slug)
      )
      .slice(0, limit - relatedPosts.length);
    
    relatedPosts.push(...recentPosts);
  }

  return relatedPosts;
}

/**
 * Get related posts with detailed scoring (for debugging/analytics)
 */
export function getRelatedPostsWithScores(
  currentSlug: string,
  allBlogs: Blog[],
  limit: number = 3
): RelatedPostScore[] {
  const currentBlog = allBlogs.find(blog => blog.slug === currentSlug);
  
  if (!currentBlog) {
    return [];
  }

  const candidates = allBlogs.filter(blog => blog.slug !== currentSlug);
  const scoredBlogs = candidates.map(candidate =>
    calculateRelevanceScore(currentBlog, candidate)
  );

  scoredBlogs.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    const dateA = new Date(a.blog.frontmatter.date).getTime();
    const dateB = new Date(b.blog.frontmatter.date).getTime();
    return dateB - dateA;
  });

  return scoredBlogs.slice(0, limit);
}

/**
 * Get posts by category (for category pages)
 */
export function getPostsByCategory(
  category: string,
  allBlogs: Blog[],
  limit?: number
): Blog[] {
  const filtered = allBlogs.filter(
    blog => blog.frontmatter.category?.toLowerCase() === category.toLowerCase()
  );

  return limit ? filtered.slice(0, limit) : filtered;
}

/**
 * Get posts by tag (for tag pages)
 */
export function getPostsByTag(
  tag: string,
  allBlogs: Blog[],
  limit?: number
): Blog[] {
  const filtered = allBlogs.filter(blog =>
    blog.frontmatter.tags?.some(
      t => t.toLowerCase() === tag.toLowerCase()
    )
  );

  return limit ? filtered.slice(0, limit) : filtered;
}

/**
 * Get diverse posts (mix of categories)
 * Useful for homepage or "You might also like" sections
 */
export function getDiversePosts(
  allBlogs: Blog[],
  limit: number = 6
): Blog[] {
  const categories = new Set<string>();
  const diversePosts: Blog[] = [];

  // First pass: one from each category
  for (const blog of allBlogs) {
    const category = blog.frontmatter.category;
    if (category && !categories.has(category)) {
      diversePosts.push(blog);
      categories.add(category);
      
      if (diversePosts.length >= limit) {
        return diversePosts;
      }
    }
  }

  // Second pass: fill remaining with recent posts
  for (const blog of allBlogs) {
    if (!diversePosts.includes(blog)) {
      diversePosts.push(blog);
      
      if (diversePosts.length >= limit) {
        break;
      }
    }
  }

  return diversePosts;
}
