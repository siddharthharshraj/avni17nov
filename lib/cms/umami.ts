/**
 * Umami Analytics Integration
 * Fetch blog analytics data from Umami API
 */

const UMAMI_API_URL = process.env.UMAMI_API_URL || 'https://analytics.umami.is';
const UMAMI_WEBSITE_ID = process.env.UMAMI_WEBSITE_ID;
const UMAMI_API_KEY = process.env.UMAMI_API_KEY;

if (!UMAMI_WEBSITE_ID) {
  console.warn('UMAMI_WEBSITE_ID not set - analytics will not work');
}

export interface BlogAnalytics {
  slug: string;
  title: string;
  pageviews: number;
  visitors: number;
  bounceRate: number;
  avgTime: number;
  events: {
    shares: number;
    ctaClicks: number;
    scrollDepth: {
      '25%': number;
      '50%': number;
      '75%': number;
      '100%': number;
    };
  };
}

export interface UmamiMetrics {
  pageviews: { value: number };
  visitors: { value: number };
  visits: { value: number };
  bounces: { value: number };
  totaltime: { value: number };
}

export interface UmamiPageview {
  x: string;
  y: number;
}

async function umamiRequest(endpoint: string, params: Record<string, string> = {}) {
  if (!UMAMI_WEBSITE_ID) {
    throw new Error('Umami not configured');
  }

  const queryParams = new URLSearchParams({
    ...params,
  }).toString();

  const url = `${UMAMI_API_URL}/api/websites/${UMAMI_WEBSITE_ID}${endpoint}${queryParams ? `?${queryParams}` : ''}`;

  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };

  if (UMAMI_API_KEY) {
    headers['Authorization'] = `Bearer ${UMAMI_API_KEY}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Umami API error: ${response.status} - ${error}`);
  }

  return response.json();
}

export async function getBlogAnalytics(slug: string, days: number = 30): Promise<BlogAnalytics> {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const startAt = startDate.getTime();
  const endAt = endDate.getTime();

  try {
    // Get metrics for specific blog URL
    const metrics: UmamiMetrics = await umamiRequest('/metrics', {
      startAt: startAt.toString(),
      endAt: endAt.toString(),
      url: `/blog/${slug}`,
    });

    // Get events for this blog
    const events = await umamiRequest('/events', {
      startAt: startAt.toString(),
      endAt: endAt.toString(),
      url: `/blog/${slug}`,
    });

    // Calculate bounce rate
    const bounceRate = metrics.visits.value > 0
      ? (metrics.bounces.value / metrics.visits.value) * 100
      : 0;

    // Calculate average time on page (in seconds)
    const avgTime = metrics.pageviews.value > 0
      ? metrics.totaltime.value / metrics.pageviews.value / 1000
      : 0;

    // Parse events
    const shareEvents = events.filter((e: any) => e.event_name === 'social_share').length;
    const ctaEvents = events.filter((e: any) => e.event_name === 'cta_click').length;
    const scrollEvents = events.filter((e: any) => e.event_name === 'scroll_depth');

    const scrollDepth = {
      '25%': scrollEvents.filter((e: any) => e.event_value === '25').length,
      '50%': scrollEvents.filter((e: any) => e.event_value === '50').length,
      '75%': scrollEvents.filter((e: any) => e.event_value === '75').length,
      '100%': scrollEvents.filter((e: any) => e.event_value === '100').length,
    };

    return {
      slug,
      title: '', // Will be filled from blog data
      pageviews: metrics.pageviews.value,
      visitors: metrics.visitors.value,
      bounceRate: Math.round(bounceRate * 10) / 10,
      avgTime: Math.round(avgTime),
      events: {
        shares: shareEvents,
        ctaClicks: ctaEvents,
        scrollDepth,
      },
    };
  } catch (error) {
    console.error(`Error fetching analytics for ${slug}:`, error);
    return {
      slug,
      title: '',
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
    };
  }
}

export async function getAllBlogsAnalytics(days: number = 30): Promise<BlogAnalytics[]> {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const startAt = startDate.getTime();
  const endAt = endDate.getTime();

  try {
    // Get all pageviews for /blog/* URLs
    const pageviews = await umamiRequest('/pageviews', {
      startAt: startAt.toString(),
      endAt: endAt.toString(),
      url: '/blog/*',
    });

    // Group by URL and aggregate stats
    const blogStats: Record<string, BlogAnalytics> = {};

    for (const page of pageviews) {
      const url = page.x;
      const match = url.match(/\/blog\/([^?]+)/);
      
      if (match) {
        const slug = match[1];
        
        if (!blogStats[slug]) {
          blogStats[slug] = await getBlogAnalytics(slug, days);
        }
      }
    }

    return Object.values(blogStats);
  } catch (error) {
    console.error('Error fetching all blogs analytics:', error);
    return [];
  }
}

export async function getTopBlogs(limit: number = 10, days: number = 30): Promise<BlogAnalytics[]> {
  const allAnalytics = await getAllBlogsAnalytics(days);
  
  return allAnalytics
    .sort((a, b) => b.pageviews - a.pageviews)
    .slice(0, limit);
}

export async function getTotalAnalytics(days: number = 30): Promise<{
  totalPageviews: number;
  totalVisitors: number;
  totalBlogs: number;
  avgBounceRate: number;
  avgTimeOnPage: number;
}> {
  const allAnalytics = await getAllBlogsAnalytics(days);

  const totalPageviews = allAnalytics.reduce((sum, blog) => sum + blog.pageviews, 0);
  const totalVisitors = allAnalytics.reduce((sum, blog) => sum + blog.visitors, 0);
  const avgBounceRate = allAnalytics.length > 0
    ? allAnalytics.reduce((sum, blog) => sum + blog.bounceRate, 0) / allAnalytics.length
    : 0;
  const avgTimeOnPage = allAnalytics.length > 0
    ? allAnalytics.reduce((sum, blog) => sum + blog.avgTime, 0) / allAnalytics.length
    : 0;

  return {
    totalPageviews,
    totalVisitors,
    totalBlogs: allAnalytics.length,
    avgBounceRate: Math.round(avgBounceRate * 10) / 10,
    avgTimeOnPage: Math.round(avgTimeOnPage),
  };
}
