/**
 * Resolve Comment Endpoint
 * PUT /api/cms/comments/[commentId]/resolve
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/cms/auth';
import { getComments, resolveComment, unresolveComment } from '@/lib/cms/redis';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  try {
    const session = await requireAuth();
    const { commentId } = await params;
    const { resolved, blogId } = await request.json();
    
    if (!blogId) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      );
    }
    
    const comments = await getComments(blogId);
    const comment = comments.find(c => c.id === commentId);
    
    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }
    
    if (comment.assignedTo !== session.user.email && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Only the assigned author or admin can resolve comments' },
        { status: 403 }
      );
    }
    
    if (resolved) {
      await resolveComment(blogId, commentId, session.user.email);
    } else {
      await unresolveComment(blogId, commentId);
    }
    
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.error('Resolve comment error:', error);
    return NextResponse.json(
      { error: 'Failed to resolve comment' },
      { status: 500 }
    );
  }
}
