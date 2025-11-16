/**
 * Blog Posts Utility Functions
 * Handles reading, parsing, and querying blog posts
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { BlogPost, BlogFrontmatter, BlogListItem, RelatedPost } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * Get all post slugs
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map(fileName => fileName.replace(/\.mdx?$/, ''));
}

/**
 * Get post data by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      // Try .mdx extension
      const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
      if (!fs.existsSync(mdxPath)) {
        return null;
      }
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Calculate reading time if not provided
    const stats = readingTime(content);
    const readingTimeStr = data.readingTime || stats.text;
    
    // Generate excerpt if not provided
    const excerpt = data.description || content.substring(0, 160).trim() + '...';
    
    return {
      slug,
      frontmatter: data as BlogFrontmatter,
      content,
      excerpt,
      readingTime: readingTimeStr,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all posts sorted by date
 */
export function getAllPosts(options: {
  limit?: number;
  type?: 'blog' | 'case-study';
  tag?: string;
  published?: boolean;
} = {}): BlogListItem[] {
  const slugs = getAllPostSlugs();
  
  const posts = slugs
    .map(slug => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      
      // Filter by type
      if (options.type && post.frontmatter.type !== options.type) {
        return null;
      }
      
      // Filter by published status
      if (options.published !== undefined && post.frontmatter.published !== options.published) {
        return null;
      }
      
      // Filter by tag
      if (options.tag && !post.frontmatter.tags?.includes(options.tag)) {
        return null;
      }
      
      // Extract featured image path
      let featuredImage: string | undefined;
      if (post.frontmatter.featuredImage) {
        featuredImage = typeof post.frontmatter.featuredImage === 'string'
          ? post.frontmatter.featuredImage
          : post.frontmatter.featuredImage.src;
      }
      
      // Extract author name
      let authorName: string | undefined;
      if (post.frontmatter.author) {
        authorName = typeof post.frontmatter.author === 'string'
          ? post.frontmatter.author
          : post.frontmatter.author.name;
      }
      
      return {
        slug: post.slug,
        title: post.frontmatter.title,
        subtitle: post.frontmatter.subtitle,
        date: post.frontmatter.date,
        author: authorName,
        featuredImage,
        tags: post.frontmatter.tags,
        excerpt: post.excerpt,
        readingTime: post.readingTime,
        type: post.frontmatter.type,
      };
    })
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .sort((a, b) => {
      // Sort by date descending
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }) as BlogListItem[];
  
  // Apply limit if specified
  if (options.limit) {
    return posts.slice(0, options.limit);
  }
  
  return posts;
}

/**
 * Get related posts based on tag overlap
 * Algorithm:
 * 1. Calculate tag overlap score for each post
 * 2. Sort by score (desc), then by date (desc)
 * 3. Return top 3 posts
 */
export function getRelatedPosts(currentSlug: string, limit: number = 3): RelatedPost[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost || !currentPost.frontmatter.tags || currentPost.frontmatter.tags.length === 0) {
    // Return most recent posts as fallback
    return getAllPosts({ limit, published: true })
      .filter(post => post.slug !== currentSlug)
      .map(post => ({
        slug: post.slug,
        title: post.title,
        featuredImage: post.featuredImage,
        tags: post.tags,
        date: post.date,
        excerpt: post.excerpt,
        readingTime: post.readingTime,
      }));
  }
  
  const currentTags = new Set(currentPost.frontmatter.tags);
  const allPosts = getAllPosts({ published: true });
  
  // Calculate scores
  const postsWithScores = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      const postTags = new Set(post.tags || []);
      const sharedTags = [...currentTags].filter(tag => postTags.has(tag));
      const score = sharedTags.length;
      
      return {
        post,
        score,
      };
    });
  
  // Sort by score (desc), then by date (desc)
  postsWithScores.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
  });
  
  // Take top N
  return postsWithScores
    .slice(0, limit)
    .map(({ post }) => ({
      slug: post.slug,
      title: post.title,
      featuredImage: post.featuredImage,
      tags: post.tags,
      date: post.date,
      excerpt: post.excerpt,
      readingTime: post.readingTime,
    }));
}

/**
 * Get all unique tags
 */
export function getAllTags(): { tag: string; count: number }[] {
  const allPosts = getAllPosts({ published: true });
  const tagCounts = new Map<string, number>();
  
  allPosts.forEach(post => {
    post.tags?.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogListItem[] {
  return getAllPosts({ tag, published: true });
}

/**
 * Search posts by query
 */
export function searchPosts(query: string): BlogListItem[] {
  const lowerQuery = query.toLowerCase();
  const allPosts = getAllPosts({ published: true });
  
  return allPosts.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(lowerQuery);
    const excerptMatch = post.excerpt?.toLowerCase().includes(lowerQuery);
    const tagMatch = post.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));
    
    return titleMatch || excerptMatch || tagMatch;
  });
}
