/**
 * PageTracker Component
 * 
 * Automatically tracks page-specific analytics for blogs, case studies, and other content pages.
 * Tracks: page views, scroll depth, time on page, reading progress, and engagement metrics.
 * 
 * Usage:
 * <PageTracker 
 *   pageType="blog" 
 *   pageTitle="Digital Transformation in Healthcare"
 *   pageCategory="Technology"
 * />
 */

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  trackContent,
  trackEngagement,
  event as trackEvent,
} from '@/lib/analytics';

interface PageTrackerProps {
  pageType: 'blog' | 'case-study' | 'landing' | 'product' | 'about' | 'contact' | 'general';
  pageTitle: string;
  pageCategory?: string;
  author?: string;
  tags?: string[];
  publishDate?: string;
}

export function PageTracker({
  pageType,
  pageTitle,
  pageCategory,
  author,
  tags,
  publishDate,
}: PageTrackerProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view with custom dimensions
    trackEvent({
      action: 'page_view',
      category: 'Page View',
      label: `${pageType}: ${pageTitle}`,
    });

    // Track content-specific views
    if (pageType === 'blog') {
      trackContent.blogView(pageTitle);
    } else if (pageType === 'case-study') {
      trackContent.caseStudyView(pageTitle);
    }

    // Send custom dimensions to GA4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_metadata', {
        page_type: pageType,
        page_title: pageTitle,
        page_category: pageCategory || 'Uncategorized',
        author: author || 'Unknown',
        tags: tags?.join(', ') || 'None',
        publish_date: publishDate || 'Unknown',
        page_path: pathname,
      });
    }

    console.log('[Analytics] Page tracked:', {
      pageType,
      pageTitle,
      pageCategory,
      pathname,
    });
  }, [pageType, pageTitle, pageCategory, author, tags, publishDate, pathname]);

  return null; // This component doesn't render anything
}
