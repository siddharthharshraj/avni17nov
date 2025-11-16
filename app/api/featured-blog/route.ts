/**
 * API Route: Latest Blog (Auto-Featured)
 * Returns the most recent blog by date for navigation dropdown
 */

import { NextResponse } from 'next/server';
import { getFeaturedBlogForNav } from '@/lib/featured-blog';

export async function GET() {
  try {
    const latestBlog = await getFeaturedBlogForNav();
    
    if (!latestBlog) {
      return NextResponse.json(
        { error: 'No blogs found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(latestBlog);
  } catch (error) {
    console.error('Error fetching latest blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch latest blog' },
      { status: 500 }
    );
  }
}
