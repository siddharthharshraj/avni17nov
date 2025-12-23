/**
 * Republish Blog Endpoint
 * POST /api/cms/blogs/[id]/republish
 * Republish an unpublished blog (within 48-hour grace period)
 */

import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/cms/auth';
import { getBlog, updateBlog } from '@/lib/cms/redis';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requirePermission('publish');
    const { id } = await params;
    
    const blog = await getBlog(id);
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    if (blog.status !== 'unpublished') {
      return NextResponse.json(
        { error: 'Only unpublished blogs can be republished' },
        { status: 400 }
      );
    }
    
    if (!blog.unpublishedAt) {
      return NextResponse.json(
        { error: 'Invalid unpublished blog state' },
        { status: 400 }
      );
    }
    
    const unpublishedTime = new Date(blog.unpublishedAt).getTime();
    const now = Date.now();
    const hoursSinceUnpublish = (now - unpublishedTime) / (1000 * 60 * 60);
    
    if (hoursSinceUnpublish > 48) {
      return NextResponse.json(
        { error: 'Cannot republish: 48-hour grace period has expired. Blog will be deleted soon.' },
        { status: 400 }
      );
    }
    
    await updateBlog(id, {
      status: 'published',
      unpublishedAt: undefined,
    });
    
    return NextResponse.json({
      success: true,
      message: 'Blog republished successfully',
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    console.error('Republish blog error:', error);
    return NextResponse.json(
      { error: 'Failed to republish blog' },
      { status: 500 }
    );
  }
}
