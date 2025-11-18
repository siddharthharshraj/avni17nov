/**
 * Blog Analytics Tracker
 * 
 * Automatically tracks ALL blog post views and interactions.
 * This component is added to the blog template, so it works for:
 * - All existing blogs
 * - All future blogs (forward-compatible)
 * 
 * Tracks:
 * - Page views with blog metadata
 * - Scroll depth
 * - Time on page  
 * - All button/link clicks on the page
 * - Social shares
 * - Reading progress
 */

'use client';

import { useEffect } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { PageTracker } from '@/components/analytics';

interface BlogAnalyticsTrackerProps {
  title: string;
  category?: string;
  author?: string;
  tags?: string[];
  date?: string;
  slug: string;
}

export default function BlogAnalyticsTracker({
  title,
  category,
  author,
  tags,
  date,
  slug,
}: BlogAnalyticsTrackerProps) {
  // Auto-track all interactions on this blog post
  useAnalytics({
    trackScrollDepth: true,
    trackTimeOnPage: true,
    trackClicks: true,
    category: 'Blog',
  });

  return (
    <PageTracker
      pageType="blog"
      pageTitle={title}
      pageCategory={category}
      author={author}
      tags={tags}
      publishDate={date}
    />
  );
}
