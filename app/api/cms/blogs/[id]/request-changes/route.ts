/**
 * Request Changes Endpoint
 * POST /api/cms/blogs/[id]/request-changes
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/cms/auth';
import { getBlog, updateBlog } from '@/lib/cms/redis';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id } = await params;
    
    const blog = await getBlog(id);
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    if (blog.status === 'internal_review') {
      if (session.user.role !== 'internal_reviewer' && session.user.role !== 'admin') {
        return NextResponse.json(
          { error: 'Only internal reviewers can request changes at this stage' },
          { status: 403 }
        );
      }
      
      await updateBlog(id, {
        status: 'changes_requested_ir',
      });
      
      return NextResponse.json({
        success: true,
        message: 'Changes requested - returned to author',
      });
    }
    
    if (blog.status === 'admin_review') {
      if (session.user.role !== 'admin') {
        return NextResponse.json(
          { error: 'Only admins can request changes at this stage' },
          { status: 403 }
        );
      }
      
      await updateBlog(id, {
        status: 'changes_requested_admin',
      });
      
      return NextResponse.json({
        success: true,
        message: 'Changes requested - returned to author',
      });
    }
    
    return NextResponse.json(
      { error: 'Blog is not in a reviewable state' },
      { status: 400 }
    );
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.error('Request changes error:', error);
    return NextResponse.json(
      { error: 'Failed to request changes' },
      { status: 500 }
    );
  }
}
