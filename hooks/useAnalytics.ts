/**
 * useAnalytics Hook
 * 
 * Comprehensive React hook for tracking all user interactions with Google Analytics.
 * Automatically tracks button clicks, form interactions, scroll depth, time on page, and more.
 */

'use client';

import { useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  trackCTA,
  trackForm,
  trackContent,
  trackEngagement,
  trackNavigation,
  trackSocial,
  trackFeature,
  event as trackEvent
} from '@/lib/analytics';

interface UseAnalyticsOptions {
  trackScrollDepth?: boolean;
  trackTimeOnPage?: boolean;
  trackClicks?: boolean;
  category?: string;
}

export function useAnalytics(options: UseAnalyticsOptions = {}) {
  const {
    trackScrollDepth = true,
    trackTimeOnPage = true,
    trackClicks = true,
    category = 'General'
  } = options;

  const pathname = usePathname();
  const startTimeRef = useRef<number>(Date.now());
  const scrollDepthRef = useRef<Set<number>>(new Set());

  /**
   * Track button clicks
   */
  const trackButtonClick = useCallback((buttonName: string, additionalData?: Record<string, any>) => {
    trackEvent({
      action: 'button_click',
      category,
      label: buttonName,
    });
    console.log(`[Analytics] Button clicked: ${buttonName}`, additionalData);
  }, [category]);

  /**
   * Track link clicks
   */
  const trackLinkClick = useCallback((linkName: string, url: string) => {
    const isExternal = url.startsWith('http') && !url.includes(window.location.hostname);
    
    if (isExternal) {
      trackEngagement.externalLinkClick(url);
    }
    
    trackEvent({
      action: 'link_click',
      category,
      label: `${linkName} -> ${url}`,
    });
  }, [category]);

  /**
   * Track CTA button clicks with location context
   */
  const trackCTAClick = useCallback((ctaType: 'signup' | 'login' | 'demo' | 'contact', location: string) => {
    switch (ctaType) {
      case 'signup':
        trackCTA.signupClick(location);
        break;
      case 'login':
        trackCTA.loginClick(location);
        break;
      case 'demo':
        trackCTA.demoRequest();
        break;
      case 'contact':
        trackCTA.contactClick();
        break;
    }
  }, []);

  /**
   * Track form interactions
   */
  const trackFormInteraction = useCallback((formName: string, action: 'start' | 'submit' | 'success' | 'error', details?: string) => {
    switch (action) {
      case 'start':
        trackForm.start(formName);
        break;
      case 'submit':
        trackForm.submit(formName);
        break;
      case 'success':
        trackForm.success(formName);
        break;
      case 'error':
        trackForm.error(formName, details || 'unknown');
        break;
    }
  }, []);

  /**
   * Track content views
   */
  const trackContentView = useCallback((contentType: 'blog' | 'case-study', title: string) => {
    if (contentType === 'blog') {
      trackContent.blogView(title);
    } else {
      trackContent.caseStudyView(title);
    }
  }, []);

  /**
   * Track social sharing
   */
  const trackShare = useCallback((platform: string, contentType: string, contentTitle: string) => {
    trackSocial.share(platform, contentType, contentTitle);
  }, []);

  /**
   * Track downloads
   */
  const trackDownload = useCallback((fileName: string) => {
    trackContent.downloadClick(fileName);
  }, []);

  /**
   * Auto-track scroll depth (25%, 50%, 75%, 100%)
   */
  useEffect(() => {
    if (!trackScrollDepth) return;

    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (scrollPercentage >= milestone && !scrollDepthRef.current.has(milestone)) {
          scrollDepthRef.current.add(milestone);
          trackEngagement.scroll(milestone);
          console.log(`[Analytics] Scroll depth: ${milestone}%`);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trackScrollDepth]);

  /**
   * Auto-track time on page
   */
  useEffect(() => {
    if (!trackTimeOnPage) return;

    const trackTime = () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      trackEngagement.timeOnPage(timeSpent);
      console.log(`[Analytics] Time on page: ${timeSpent}s`);
    };

    // Track at intervals: 10s, 30s, 60s, 120s, 300s
    const timers = [10, 30, 60, 120, 300].map((seconds) =>
      setTimeout(trackTime, seconds * 1000)
    );

    // Track on page leave
    window.addEventListener('beforeunload', trackTime);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('beforeunload', trackTime);
    };
  }, [trackTimeOnPage, pathname]);

  /**
   * Auto-track all button clicks on the page
   */
  useEffect(() => {
    if (!trackClicks) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Track button clicks
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        const button = target.tagName === 'BUTTON' ? target : target.closest('button');
        const buttonText = button?.textContent?.trim() || 'Unknown Button';
        const buttonId = button?.id || '';
        const buttonClass = button?.className || '';
        
        trackEvent({
          action: 'auto_button_click',
          category: 'User Interaction',
          label: `${buttonText} [${buttonId || buttonClass}]`,
        });
      }

      // Track link clicks
      if (target.tagName === 'A' || target.closest('a')) {
        const link = target.tagName === 'A' ? target as HTMLAnchorElement : target.closest('a') as HTMLAnchorElement;
        const linkText = link?.textContent?.trim() || 'Unknown Link';
        const linkHref = link?.href || '';
        
        trackLinkClick(linkText, linkHref);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [trackClicks, trackLinkClick]);

  /**
   * Reset tracking on page change
   */
  useEffect(() => {
    startTimeRef.current = Date.now();
    scrollDepthRef.current.clear();
  }, [pathname]);

  return {
    trackButtonClick,
    trackLinkClick,
    trackCTAClick,
    trackFormInteraction,
    trackContentView,
    trackShare,
    trackDownload,
    // Direct access to all tracking functions
    navigation: trackNavigation,
    cta: trackCTA,
    form: trackForm,
    content: trackContent,
    social: trackSocial,
    feature: trackFeature,
    engagement: trackEngagement,
  };
}
