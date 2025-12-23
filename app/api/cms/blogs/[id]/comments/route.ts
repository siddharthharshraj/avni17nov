/**
 * Comments Endpoints
 * GET /api/cms/blogs/[id]/comments - Get all comments
 * POST /api/cms/blogs/[id]/comments - Add comment
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/cms/auth';
import { getBlog, getComments, addComment } from '@/lib/cms/redis';
import { InlineComment } from '@/lib/cms/types';

export async function GET(
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
    
    if (session.user.role !== 'admin' && blog.authorEmail !== session.user.email) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }
    
    const comments = await getComments(id);
    
    return NextResponse.json({ comments });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.error('Get comments error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id } = await params;
    const body = await request.json();
    
    const blog = await getBlog(id);
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    const canComment = 
      (blog.status === 'internal_review' && (session.user.role === 'internal_reviewer' || session.user.role === 'admin')) ||
      (blog.status === 'admin_review' && session.user.role === 'admin');
    
    if (!canComment) {
      return NextResponse.json(
        { error: 'Cannot add comments at this stage' },
        { status: 403 }
      );
    }
    
    const { anchor, comment: commentText } = body;
    
    if (!anchor || !commentText) {
      return NextResponse.json(
        { error: 'Anchor and comment are required' },
        { status: 400 }
      );
    }
    
    const comment: InlineComment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      blogId: id,
      draftVersion: blog.version,
      anchor,
      comment: commentText,
      assignedTo: blog.authorEmail,
      createdBy: session.user.email,
      createdByName: session.user.name,
      reviewStage: blog.status === 'internal_review' ? 'internal_review' : 'admin_review',
      resolved: false,
      createdAt: new Date().toISOString(),
    };
    
    await addComment(comment);
    
    return NextResponse.json({
      success: true,
      comment,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.error('Add comment error:', error);
    return NextResponse.json(
      { error: 'Failed to add comment' },
      { status: 500 }
    );
  }
}
