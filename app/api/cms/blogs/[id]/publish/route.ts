/**
 * Publish Blog Endpoint
 * POST /api/cms/blogs/[id]/publish
 */

import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/cms/auth';
import { getBlog, updateBlog } from '@/lib/cms/redis';
import { validateBlogForPublish, canPublish } from '@/lib/cms/validation';
import { publishBlogToGitHub, triggerNetlifyBuild } from '@/lib/cms/github';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('publish');
    const { id } = await params;
    
    const blog = await getBlog(id);
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    if (blog.status !== 'approved') {
      return NextResponse.json(
        { error: 'Blog must be approved before publishing' },
        { status: 400 }
      );
    }
    
    const checks = await validateBlogForPublish(blog);
    
    if (!canPublish(checks)) {
      return NextResponse.json(
        { 
          error: 'Blog failed quality checks',
          checks,
        },
        { status: 400 }
      );
    }
    
    const result = await publishBlogToGitHub(blog);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Publishing failed' },
        { status: 500 }
      );
    }
    
    await updateBlog(id, {
      status: 'published',
      publishedAt: new Date().toISOString(),
    });
    
    await triggerNetlifyBuild();
    
    return NextResponse.json({
      success: true,
      markdownPath: result.markdownPath,
      commitSha: result.commitSha,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    console.error('Publish blog error:', error);
    return NextResponse.json(
      { error: 'Failed to publish blog' },
      { status: 500 }
    );
  }
}
