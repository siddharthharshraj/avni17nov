/**
 * Analytics Dashboard Endpoint
 * GET /api/cms/analytics - Get analytics for all published blogs
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/cms/auth';
import { getAllBlogs } from '@/lib/cms/redis';
import { getAllBlogsAnalytics, getTotalAnalytics } from '@/lib/cms/umami';

export async function GET(request: NextRequest) {
  try {
    await requireAuth();
    
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const limit = parseInt(searchParams.get('limit') || '100');

    // Get all published blogs from Redis
    const allBlogs = await getAllBlogs();
    const publishedBlogs = allBlogs.filter(b => b.status === 'published');

    // Get analytics from Umami
    const analyticsData = await getAllBlogsAnalytics(days);
    const totalStats = await getTotalAnalytics(days);

    // Merge blog data with analytics
    const blogsWithAnalytics = publishedBlogs.map(blog => {
      const analytics = analyticsData.find(a => a.slug === blog.slug);
      
      return {
        id: blog.id,
        slug: blog.slug,
        title: blog.title,
        author: blog.authorName,
        publishedAt: blog.publishedAt,
        tags: blog.tags,
        analytics: analytics || {
          slug: blog.slug,
          title: blog.title,
          pageviews: 0,
          visitors: 0,
          bounceRate: 0,
          avgTime: 0,
          events: {
            shares: 0,
            ctaClicks: 0,
            scrollDepth: {
              '25%': 0,
              '50%': 0,
              '75%': 0,
              '100%': 0,
            },
          },
        },
      };
    });

    // Sort by pageviews (most popular first)
    const sortedBlogs = blogsWithAnalytics
      .sort((a, b) => b.analytics.pageviews - a.analytics.pageviews)
      .slice(0, limit);

    return NextResponse.json({
      success: true,
      period: {
        days,
        startDate: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date().toISOString(),
      },
      totalStats,
      blogs: sortedBlogs,
      totalBlogs: publishedBlogs.length,
      blogsWithData: analyticsData.length,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    console.error('Analytics error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch analytics',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
