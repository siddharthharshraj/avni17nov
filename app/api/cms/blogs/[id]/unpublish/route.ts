/**
 * Unpublish Blog Endpoint
 * POST /api/cms/blogs/[id]/unpublish
 * Soft unpublish: Changes status to 'unpublished' without deleting from GitHub
 * Blog will be auto-deleted after 48 hours if not republished
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
    
    if (blog.status !== 'published') {
      return NextResponse.json(
        { error: 'Only published blogs can be unpublished' },
        { status: 400 }
      );
    }
    
    await updateBlog(id, {
      status: 'unpublished',
      unpublishedAt: new Date().toISOString(),
    });
    
    return NextResponse.json({
      success: true,
      message: 'Blog unpublished successfully. Will be permanently deleted after 48 hours if not republished.',
      gracePeriodHours: 48,
      deleteAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    console.error('Unpublish blog error:', error);
    return NextResponse.json(
      { error: 'Failed to unpublish blog' },
      { status: 500 }
    );
  }
}
