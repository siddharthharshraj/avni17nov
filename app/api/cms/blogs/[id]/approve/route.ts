/**
 * Approve Blog Endpoint
 * POST /api/cms/blogs/[id]/approve
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
          { error: 'Only internal reviewers can approve at this stage' },
          { status: 403 }
        );
      }
      
      await updateBlog(id, {
        status: 'admin_review',
        submittedForAdminAt: new Date().toISOString(),
      });
      
      return NextResponse.json({
        success: true,
        message: 'Blog approved for admin review',
      });
    }
    
    if (blog.status === 'admin_review') {
      if (session.user.role !== 'admin') {
        return NextResponse.json(
          { error: 'Only admins can approve at this stage' },
          { status: 403 }
        );
      }
      
      await updateBlog(id, {
        status: 'approved',
        approvedAt: new Date().toISOString(),
      });
      
      return NextResponse.json({
        success: true,
        message: 'Blog approved for publishing',
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
    
    console.error('Approve blog error:', error);
    return NextResponse.json(
      { error: 'Failed to approve blog' },
      { status: 500 }
    );
  }
}
