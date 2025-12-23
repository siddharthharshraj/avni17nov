/**
 * Individual Blog Analytics Endpoint
 * GET /api/cms/analytics/[slug] - Get analytics for specific blog
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/cms/auth';
import { getAllBlogs } from '@/lib/cms/redis';
import { getBlogAnalytics } from '@/lib/cms/umami';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await requireAuth();
    const { slug } = await params;
    
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    // Get blog from Redis
    const allBlogs = await getAllBlogs();
    const blog = allBlogs.find(b => b.slug === slug);

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Get analytics from Umami
    const analytics = await getBlogAnalytics(slug, days);

    return NextResponse.json({
      success: true,
      blog: {
        id: blog.id,
        slug: blog.slug,
        title: blog.title,
        author: blog.authorName,
        publishedAt: blog.publishedAt,
        status: blog.status,
        tags: blog.tags,
      },
      analytics: {
        ...analytics,
        title: blog.title,
      },
      period: {
        days,
        startDate: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date().toISOString(),
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.error('Blog analytics error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch blog analytics',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
