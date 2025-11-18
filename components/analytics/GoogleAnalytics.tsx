/**
 * Google Analytics 4 Component
 * 
 * Comprehensive tracking for all user interactions across the site.
 * Measurement ID can be easily changed via NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable.
 * 
 * Features:
 * - Automatic page view tracking
 * - Enhanced measurement (scroll, outbound links, site search, video engagement)
 * - Custom event tracking for all buttons and interactions
 * - User journey tracking
 */

'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview, GA_MEASUREMENT_ID } from '@/lib/analytics';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const url = pathname + searchParams.toString();
    pageview(url);
  }, [pathname, searchParams]);

  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics: NEXT_PUBLIC_GA_MEASUREMENT_ID is not set');
    return null;
  }

  return (
    <>
      {/* Google Analytics gtag.js */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      
      {/* GA4 Configuration with Enhanced Measurement */}
      <Script
        id="google-analytics-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Enhanced configuration for deep analytics
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
              // Enhanced measurement features
              enhanced_measurement: {
                scrolls: true,
                outbound_clicks: true,
                site_search: true,
                video_engagement: true,
                file_downloads: true
              },
              // Custom parameters
              custom_map: {
                'dimension1': 'page_category',
                'dimension2': 'content_type',
                'dimension3': 'user_type'
              },
              // Debug mode (only in development)
              debug_mode: ${process.env.NODE_ENV === 'development'}
            });
            
            // Log initialization
            console.log('Google Analytics 4 initialized with ID: ${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  );
}
