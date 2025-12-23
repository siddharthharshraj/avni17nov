/**
 * Submit for Internal Review Endpoint
 * POST /api/cms/blogs/[id]/submit-ir
 */

import { NextRequest, NextResponse } from 'next/server';
import { requirePermission } from '@/lib/cms/auth';
import { getBlog, updateBlog } from '@/lib/cms/redis';
import { createSnapshot } from '@/lib/cms/redis';
import { getComments } from '@/lib/cms/redis';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requirePermission('submit_for_ir');
    const { id } = await params;
    
    const blog = await getBlog(id);
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    if (blog.authorEmail !== session.user.email) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }
    
    if (blog.status !== 'draft' && blog.status !== 'changes_requested_ir') {
      return NextResponse.json(
        { error: 'Blog must be in draft or changes requested state' },
        { status: 400 }
      );
    }
    
    const comments = await getComments(id);
    await createSnapshot({
      blogId: id,
      version: blog.version,
      draft: blog,
      comments,
      createdAt: new Date().toISOString(),
      reason: 'submit_ir',
    });
    
    await updateBlog(id, {
      status: 'internal_review',
      submittedForIRAt: new Date().toISOString(),
    });
    
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    console.error('Submit IR error:', error);
    return NextResponse.json(
      { error: 'Failed to submit for review' },
      { status: 500 }
    );
  }
}
