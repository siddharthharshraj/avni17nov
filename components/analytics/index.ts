/**
 * Analytics Components & Utilities
 * 
 * Export all analytics-related components and utilities for easy importing.
 */

export { default as GoogleAnalytics } from './GoogleAnalytics';
export { TrackedButton } from './TrackedButton';
export { TrackedLink } from './TrackedLink';
export { PageTracker } from './PageTracker';

// Re-export tracking functions from lib/analytics
export {
  trackNavigation,
  trackCTA,
  trackForm,
  trackContent,
  trackSearch,
  trackSocial,
  trackEngagement,
  trackError,
  trackConversion,
  trackFeature,
  event,
  pageview,
  isAnalyticsEnabled,
  GA_MEASUREMENT_ID,
} from '@/lib/analytics';
