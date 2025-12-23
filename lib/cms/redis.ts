/**
 * Upstash Redis Client
 * Data layer for CMS with zero-cost Upstash Redis
 */

import { Redis } from '@upstash/redis';
import { BlogDraft, InlineComment, BlogSnapshot, Session } from './types';

const REDIS_URL = process.env.UPSTASH_REDIS_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_TOKEN;

if (!REDIS_URL || !REDIS_TOKEN) {
  console.warn('[CMS] Redis credentials missing - CMS features will be limited');
}

export const redis = REDIS_URL && REDIS_TOKEN ? new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN,
}) : null;

function isRedisAvailable(): boolean {
  return redis !== null;
}

const KEYS = {
  blog: (id: string) => `cms:blog:${id}`,
  blogs: (email: string) => `cms:blogs:${email}`,
  allBlogs: () => `cms:blogs:all`,
  comments: (blogId: string) => `cms:comments:${blogId}`,
  snapshot: (blogId: string, version: number) => `cms:snapshots:${blogId}:${version}`,
  session: (token: string) => `cms:session:${token}`,
  images: (blogId: string) => `cms:images:${blogId}`,
};

const MAX_BLOGS_PER_AUTHOR = 4;
const MAX_SNAPSHOTS = 5;
const SESSION_TTL = 7 * 24 * 60 * 60; // 7 days in seconds

// ============================================================================
// BLOG OPERATIONS
// ============================================================================

export async function createBlog(draft: BlogDraft): Promise<{ notification?: string }> {
  if (!isRedisAvailable() || !redis) {
    throw new Error('CMS storage unavailable - check Redis configuration');
  }
  const timestamp = Date.now();
  
  // Store blog
  await redis.hset(KEYS.blog(draft.id), draft as any);
  
  // Add to author's blog list (sorted by updatedAt)
  await redis.zadd(KEYS.blogs(draft.authorEmail), {
    score: timestamp,
    member: draft.id,
  });
  
  // Add to global blog list
  await redis.zadd(KEYS.allBlogs(), {
    score: timestamp,
    member: draft.id,
  });
  
  // Enforce max blogs per author and get notification
  const result = await enforceMaxBlogs(draft.authorEmail);
  
  return { notification: result.notification };
}

export async function getBlog(id: string): Promise<BlogDraft | null> {
  if (!isRedisAvailable()) return null;
  const data = await redis.hgetall(KEYS.blog(id));
  if (!data || Object.keys(data).length === 0) return null;
  return data as unknown as BlogDraft;
}

export async function updateBlog(id: string, updates: Partial<BlogDraft>): Promise<void> {
  const existing = await getBlog(id);
  if (!existing) throw new Error('Blog not found');
  
  const updated = {
    ...existing,
    ...updates,
    version: existing.version + 1,
    updatedAt: new Date().toISOString(),
  };
  
  await redis.hset(KEYS.blog(id), updated as any);
  
  // Update timestamp in sorted sets
  const timestamp = Date.now();
  await redis.zadd(KEYS.blogs(existing.authorEmail), {
    score: timestamp,
    member: id,
  });
  await redis.zadd(KEYS.allBlogs(), {
    score: timestamp,
    member: id,
  });
}

export async function deleteBlog(id: string): Promise<void> {
  const blog = await getBlog(id);
  if (!blog) return;
  
  // Delete blog
  await redis.del(KEYS.blog(id));
  
  // Remove from author's list
  await redis.zrem(KEYS.blogs(blog.authorEmail), id);
  
  // Remove from global list
  await redis.zrem(KEYS.allBlogs(), id);
  
  // Delete comments
  await redis.del(KEYS.comments(id));
  
  // Delete images list
  await redis.del(KEYS.images(id));
}

export async function getAuthorBlogs(email: string): Promise<BlogDraft[]> {
  // Get blog IDs sorted by most recent
  const blogIds = await redis.zrange(KEYS.blogs(email), 0, -1, { rev: true });
  
  if (!blogIds || blogIds.length === 0) return [];
  
  // Fetch all blogs
  const blogs = await Promise.all(
    blogIds.map(id => getBlog(id as string))
  );
  
  return blogs.filter((b): b is BlogDraft => b !== null);
}

export async function getAllBlogs(): Promise<BlogDraft[]> {
  const blogIds = await redis.zrange(KEYS.allBlogs(), 0, -1, { rev: true });
  
  if (!blogIds || blogIds.length === 0) return [];
  
  const blogs = await Promise.all(
    blogIds.map(id => getBlog(id as string))
  );
  
  return blogs.filter((b): b is BlogDraft => b !== null);
}

export async function getBlogsByStatus(status: string): Promise<BlogDraft[]> {
  const allBlogs = await getAllBlogs();
  return allBlogs.filter(b => b.status === status);
}

async function enforceMaxBlogs(email: string): Promise<{ locked: string[]; notification?: string }> {
  const blogIds = await redis.zrange(KEYS.blogs(email), 0, -1, { rev: true });
  
  if (blogIds.length <= MAX_BLOGS_PER_AUTHOR) {
    return { locked: [] };
  }
  
  const blogsToLock = blogIds.slice(MAX_BLOGS_PER_AUTHOR);
  const lockedBlogTitles: string[] = [];
  
  for (const id of blogsToLock) {
    const blog = await getBlog(id as string);
    if (blog && blog.status !== 'locked' && blog.status !== 'unpublished') {
      await updateBlog(id as string, {
        status: 'locked',
        lockedAt: new Date().toISOString(),
      });
      lockedBlogTitles.push(blog.title);
    }
  }
  
  const notification = lockedBlogTitles.length > 0
    ? `${lockedBlogTitles.length} older blog(s) have been locked: ${lockedBlogTitles.join(', ')}`
    : undefined;
  
  return { locked: lockedBlogTitles, notification };
}

// ============================================================================
// COMMENT OPERATIONS
// ============================================================================

export async function addComment(comment: InlineComment): Promise<void> {
  await redis.rpush(KEYS.comments(comment.blogId), JSON.stringify(comment));
}

export async function getComments(blogId: string): Promise<InlineComment[]> {
  const comments = await redis.lrange(KEYS.comments(blogId), 0, -1);
  if (!comments) return [];
  return comments.map(c => JSON.parse(c as string));
}

export async function updateComment(blogId: string, commentId: string, updates: Partial<InlineComment>): Promise<void> {
  const comments = await getComments(blogId);
  const index = comments.findIndex(c => c.id === commentId);
  
  if (index === -1) throw new Error('Comment not found');
  
  const updated = { ...comments[index], ...updates };
  comments[index] = updated;
  
  // Replace entire list
  await redis.del(KEYS.comments(blogId));
  for (const comment of comments) {
    await redis.rpush(KEYS.comments(blogId), JSON.stringify(comment));
  }
}

export async function deleteComment(blogId: string, commentId: string): Promise<void> {
  const comments = await getComments(blogId);
  const filtered = comments.filter(c => c.id !== commentId);
  
  await redis.del(KEYS.comments(blogId));
  for (const comment of filtered) {
    await redis.rpush(KEYS.comments(blogId), JSON.stringify(comment));
  }
}

export async function resolveComment(blogId: string, commentId: string, resolvedBy: string): Promise<void> {
  await updateComment(blogId, commentId, {
    resolved: true,
    resolvedAt: new Date().toISOString(),
    resolvedBy,
  });
}

export async function unresolveComment(blogId: string, commentId: string): Promise<void> {
  await updateComment(blogId, commentId, {
    resolved: false,
    resolvedAt: undefined,
    resolvedBy: undefined,
  });
}

// ============================================================================
// SNAPSHOT OPERATIONS
// ============================================================================

export async function createSnapshot(snapshot: BlogSnapshot): Promise<void> {
  await redis.hset(
    KEYS.snapshot(snapshot.blogId, snapshot.version),
    snapshot as any
  );
  
  // Enforce max snapshots
  const blog = await getBlog(snapshot.blogId);
  if (blog && blog.version > MAX_SNAPSHOTS) {
    const oldVersion = blog.version - MAX_SNAPSHOTS;
    await redis.del(KEYS.snapshot(snapshot.blogId, oldVersion));
  }
}

export async function getSnapshot(blogId: string, version: number): Promise<BlogSnapshot | null> {
  const data = await redis.hgetall(KEYS.snapshot(blogId, version));
  if (!data || Object.keys(data).length === 0) return null;
  return data as unknown as BlogSnapshot;
}

// ============================================================================
// SESSION OPERATIONS
// ============================================================================

export async function createSession(session: Session): Promise<void> {
  if (!isRedisAvailable()) {
    console.warn('[CMS] Session storage unavailable - using JWT-only mode');
    return;
  }
  await redis.setex(
    KEYS.session(session.token),
    SESSION_TTL,
    JSON.stringify(session)
  );
}

export async function getSession(token: string): Promise<Session | null> {
  if (!isRedisAvailable()) return null;
  const data = await redis.get(KEYS.session(token));
  if (!data) return null;
  return JSON.parse(data as string);
}

export async function deleteSession(token: string): Promise<void> {
  if (!isRedisAvailable()) return;
  await redis.del(KEYS.session(token));
}

export async function refreshSession(token: string): Promise<void> {
  const session = await getSession(token);
  if (!session) return;
  
  await redis.expire(KEYS.session(token), SESSION_TTL);
}

// ============================================================================
// IMAGE TRACKING
// ============================================================================

export async function trackImage(blogId: string, imageUrl: string): Promise<void> {
  await redis.sadd(KEYS.images(blogId), imageUrl);
}

export async function getTrackedImages(blogId: string): Promise<string[]> {
  const images = await redis.smembers(KEYS.images(blogId));
  return images as string[];
}

export async function clearTrackedImages(blogId: string): Promise<void> {
  await redis.del(KEYS.images(blogId));
}
