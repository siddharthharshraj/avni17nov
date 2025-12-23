/**
 * Individual Blog Endpoints
 * GET /api/cms/blogs/[id] - Get blog by ID
 * PUT /api/cms/blogs/[id] - Update blog
 * DELETE /api/cms/blogs/[id] - Delete blog
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/cms/auth';
import { getBlog, updateBlog, deleteBlog } from '@/lib/cms/redis';
import { BlogDraft } from '@/lib/cms/types';

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
    
    return NextResponse.json({ blog });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.error('Get blog error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id } = await params;
    const updates = await request.json();
    
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
    
    if (blog.status === 'locked') {
      return NextResponse.json(
        { error: 'Cannot edit locked blog' },
        { status: 403 }
      );
    }
    
    if (blog.status !== 'draft' && blog.status !== 'changes_requested_ir' && blog.status !== 'changes_requested_admin') {
      if (session.user.role !== 'admin') {
        return NextResponse.json(
          { error: 'Cannot edit blog in review' },
          { status: 403 }
        );
      }
    }
    
    const allowedUpdates: Partial<BlogDraft> = {};
    const allowedFields = [
      'title', 'description', 'featuredImage', 'tags', 'contentBlocks'
    ];
    
    if (blog.status === 'draft') {
      allowedFields.push('slug');
    }
    
    for (const field of allowedFields) {
      if (field in updates) {
        (allowedUpdates as any)[field] = updates[field];
      }
    }
    
    await updateBlog(id, allowedUpdates);
    
    const updatedBlog = await getBlog(id);
    
    return NextResponse.json({
      success: true,
      blog: updatedBlog,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.error('Update blog error:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(
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
    
    if (blog.status !== 'draft' && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Can only delete drafts' },
        { status: 403 }
      );
    }
    
    await deleteBlog(id);
    
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.error('Delete blog error:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
