/**
 * Blog CRUD Endpoints
 * GET /api/cms/blogs - List user's blogs
 * POST /api/cms/blogs - Create new blog
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, requirePermission } from '@/lib/cms/auth';
import { createBlog, getAuthorBlogs, getAllBlogs } from '@/lib/cms/redis';
import { BlogDraft } from '@/lib/cms/types';
import { generateSlugFromTitle, validateSlug } from '@/lib/cms/validation';

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth();
    
    let blogs: BlogDraft[];
    
    if (session.user.role === 'admin') {
      blogs = await getAllBlogs();
    } else {
      blogs = await getAuthorBlogs(session.user.email);
    }
    
    return NextResponse.json({ blogs });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.error('Get blogs error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requirePermission('create_blog');
    const body = await request.json();
    
    const { title, description, tags = [] } = body;
    
    if (!title || title.trim() === '') {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }
    
    const slug = generateSlugFromTitle(title);
    const slugValidation = validateSlug(slug);
    
    if (!slugValidation.valid) {
      return NextResponse.json(
        { error: slugValidation.error },
        { status: 400 }
      );
    }
    
    const draft: BlogDraft = {
      id: `blog-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      authorEmail: session.user.email,
      authorName: session.user.name,
      title,
      slug,
      description: description || '',
      featuredImage: '',
      tags: Array.isArray(tags) ? tags : [],
      contentBlocks: [],
      status: 'draft',
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const result = await createBlog(draft);
    
    return NextResponse.json({
      success: true,
      blog: draft,
      notification: result.notification,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error instanceof Error && error.message === 'Forbidden') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    console.error('Create blog error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
