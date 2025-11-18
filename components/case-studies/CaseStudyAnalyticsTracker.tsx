/**
 * Case Study Analytics Tracker
 * 
 * Automatically tracks ALL case study views and interactions.
 * This component is added to the case study template, so it works for:
 * - All existing case studies
 * - All future case studies (forward-compatible)
 * 
 * Tracks:
 * - Page views with case study metadata
 * - Scroll depth
 * - Time on page
 * - All button/link clicks on the page
 * - Download actions
 * - Social shares
 */

'use client';

import { useEffect } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { PageTracker } from '@/components/analytics';

interface CaseStudyAnalyticsTrackerProps {
  title: string;
  sector?: string;
  author?: string;
  tags?: string[];
  date?: string;
  slug: string;
}

export default function CaseStudyAnalyticsTracker({
  title,
  sector,
  author,
  tags,
  date,
  slug,
}: CaseStudyAnalyticsTrackerProps) {
  // Auto-track all interactions on this case study
  useAnalytics({
    trackScrollDepth: true,
    trackTimeOnPage: true,
    trackClicks: true,
    category: 'Case Study',
  });

  return (
    <PageTracker
      pageType="case-study"
      pageTitle={title}
      pageCategory={sector}
      author={author}
      tags={tags}
      publishDate={date}
    />
  );
}
