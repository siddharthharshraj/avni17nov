/**
 * Cleanup Endpoint
 * POST /api/cms/cleanup
 * Deletes blogs that have been unpublished for more than 48 hours
 * Should be called by a cron job (e.g., Netlify scheduled function)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogs, deleteBlog } from '@/lib/cms/redis';
import { unpublishBlogFromGitHub, triggerNetlifyBuild } from '@/lib/cms/github';

const CLEANUP_SECRET = process.env.CLEANUP_SECRET || 'change-this-secret';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const providedSecret = authHeader?.replace('Bearer ', '');
    
    if (providedSecret !== CLEANUP_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const allBlogs = await getAllBlogs();
    const unpublishedBlogs = allBlogs.filter(b => b.status === 'unpublished');
    
    const now = Date.now();
    const blogsToDelete: string[] = [];
    const deletionResults: Array<{ id: string; title: string; success: boolean; error?: string }> = [];
    
    for (const blog of unpublishedBlogs) {
      if (!blog.unpublishedAt) continue;
      
      const unpublishedTime = new Date(blog.unpublishedAt).getTime();
      const hoursSinceUnpublish = (now - unpublishedTime) / (1000 * 60 * 60);
      
      if (hoursSinceUnpublish >= 48) {
        blogsToDelete.push(blog.id);
        
        const githubResult = await unpublishBlogFromGitHub(blog);
        
        if (githubResult.success) {
          await deleteBlog(blog.id);
          deletionResults.push({
            id: blog.id,
            title: blog.title,
            success: true,
          });
        } else {
          deletionResults.push({
            id: blog.id,
            title: blog.title,
            success: false,
            error: githubResult.error,
          });
        }
      }
    }
    
    if (blogsToDelete.length > 0) {
      await triggerNetlifyBuild();
    }
    
    return NextResponse.json({
      success: true,
      checked: unpublishedBlogs.length,
      deleted: deletionResults.filter(r => r.success).length,
      failed: deletionResults.filter(r => !r.success).length,
      results: deletionResults,
    });
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json(
      { error: 'Cleanup failed' },
      { status: 500 }
    );
  }
}
