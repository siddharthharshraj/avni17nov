/**
 * Google Analytics 4 Integration
 * 
 * Comprehensive analytics tracking for user journey, events, and conversions.
 * Add your GA4 Measurement ID in environment variables.
 */

// Types for GA4 events
export interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

/**
 * Initialize Google Analytics
 * Call this in _app.tsx or layout.tsx
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

/**
 * Check if analytics is enabled
 */
export const isAnalyticsEnabled = (): boolean => {
  return !!GA_MEASUREMENT_ID && typeof window !== 'undefined';
};

/**
 * Page view tracking
 * Automatically tracks page views
 */
export const pageview = (url: string): void => {
  if (!isAnalyticsEnabled()) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

/**
 * Generic event tracking
 */
export const event = ({ action, category, label, value }: GAEvent): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// ============================================================================
// SPECIFIC EVENT TRACKERS
// ============================================================================

/**
 * Navigation Events
 */
export const trackNavigation = {
  menuOpen: () => event({ action: 'menu_open', category: 'Navigation' }),
  menuClose: () => event({ action: 'menu_close', category: 'Navigation' }),
  linkClick: (linkName: string) => event({ 
    action: 'nav_link_click', 
    category: 'Navigation',
    label: linkName 
  }),
  submenuOpen: (menuName: string) => event({ 
    action: 'submenu_open', 
    category: 'Navigation',
    label: menuName 
  }),
};

/**
 * CTA (Call-to-Action) Events
 */
export const trackCTA = {
  signupClick: (location: string) => event({ 
    action: 'signup_click', 
    category: 'CTA',
    label: location 
  }),
  loginClick: (location: string) => event({ 
    action: 'login_click', 
    category: 'CTA',
    label: location 
  }),
  demoRequest: () => event({ 
    action: 'demo_request', 
    category: 'CTA' 
  }),
  contactClick: () => event({ 
    action: 'contact_click', 
    category: 'CTA' 
  }),
};

/**
 * Form Events
 */
export const trackForm = {
  start: (formName: string) => event({ 
    action: 'form_start', 
    category: 'Form',
    label: formName 
  }),
  fieldFocus: (formName: string, fieldName: string) => event({ 
    action: 'form_field_focus', 
    category: 'Form',
    label: `${formName}_${fieldName}` 
  }),
  validationError: (formName: string, fieldName: string) => event({ 
    action: 'form_validation_error', 
    category: 'Form',
    label: `${formName}_${fieldName}` 
  }),
  submit: (formName: string) => event({ 
    action: 'form_submit', 
    category: 'Form',
    label: formName 
  }),
  success: (formName: string) => event({ 
    action: 'form_success', 
    category: 'Form',
    label: formName 
  }),
  error: (formName: string, errorType: string) => event({ 
    action: 'form_error', 
    category: 'Form',
    label: `${formName}_${errorType}` 
  }),
};

/**
 * Content Engagement Events
 */
export const trackContent = {
  blogView: (blogTitle: string) => event({ 
    action: 'blog_view', 
    category: 'Content',
    label: blogTitle 
  }),
  caseStudyView: (caseStudyTitle: string) => event({ 
    action: 'case_study_view', 
    category: 'Content',
    label: caseStudyTitle 
  }),
  blogShare: (blogTitle: string, platform: string) => event({ 
    action: 'blog_share', 
    category: 'Content',
    label: `${blogTitle}_${platform}` 
  }),
  downloadClick: (resourceName: string) => event({ 
    action: 'download_click', 
    category: 'Content',
    label: resourceName 
  }),
  videoPlay: (videoTitle: string) => event({ 
    action: 'video_play', 
    category: 'Content',
    label: videoTitle 
  }),
};

/**
 * Search Events
 */
export const trackSearch = {
  perform: (searchTerm: string, resultsCount: number) => event({ 
    action: 'search', 
    category: 'Search',
    label: searchTerm,
    value: resultsCount 
  }),
  filterApply: (filterType: string, filterValue: string) => event({ 
    action: 'filter_apply', 
    category: 'Search',
    label: `${filterType}_${filterValue}` 
  }),
  noResults: (searchTerm: string) => event({ 
    action: 'search_no_results', 
    category: 'Search',
    label: searchTerm 
  }),
};

/**
 * Social Media Events
 */
export const trackSocial = {
  share: (platform: string, contentType: string, contentTitle: string) => event({ 
    action: 'social_share', 
    category: 'Social',
    label: `${platform}_${contentType}_${contentTitle}` 
  }),
  follow: (platform: string) => event({ 
    action: 'social_follow', 
    category: 'Social',
    label: platform 
  }),
  linkClick: (platform: string) => event({ 
    action: 'social_link_click', 
    category: 'Social',
    label: platform 
  }),
};

/**
 * User Engagement Events
 */
export const trackEngagement = {
  scroll: (percentage: number) => event({ 
    action: 'scroll_depth', 
    category: 'Engagement',
    value: percentage 
  }),
  timeOnPage: (seconds: number) => event({ 
    action: 'time_on_page', 
    category: 'Engagement',
    value: seconds 
  }),
  copyEmail: () => event({ 
    action: 'email_copy', 
    category: 'Engagement' 
  }),
  externalLinkClick: (url: string) => event({ 
    action: 'external_link_click', 
    category: 'Engagement',
    label: url 
  }),
};

/**
 * Error Tracking
 */
export const trackError = {
  pageNotFound: (url: string) => event({ 
    action: '404_error', 
    category: 'Error',
    label: url 
  }),
  apiError: (endpoint: string, statusCode: number) => event({ 
    action: 'api_error', 
    category: 'Error',
    label: `${endpoint}_${statusCode}` 
  }),
  jsError: (errorMessage: string) => event({ 
    action: 'js_error', 
    category: 'Error',
    label: errorMessage 
  }),
};

/**
 * Conversion Events
 */
export const trackConversion = {
  signupComplete: () => event({ 
    action: 'signup_complete', 
    category: 'Conversion' 
  }),
  demoScheduled: () => event({ 
    action: 'demo_scheduled', 
    category: 'Conversion' 
  }),
  contactFormSubmit: () => event({ 
    action: 'contact_form_submit', 
    category: 'Conversion' 
  }),
};

/**
 * Feature Usage Events
 */
export const trackFeature = {
  filterUse: (filterName: string) => event({ 
    action: 'filter_use', 
    category: 'Feature',
    label: filterName 
  }),
  tabSwitch: (tabName: string) => event({ 
    action: 'tab_switch', 
    category: 'Feature',
    label: tabName 
  }),
  accordionToggle: (accordionName: string, state: 'open' | 'close') => event({ 
    action: 'accordion_toggle', 
    category: 'Feature',
    label: `${accordionName}_${state}` 
  }),
};
