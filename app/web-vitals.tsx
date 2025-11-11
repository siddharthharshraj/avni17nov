'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Enhanced logging in development
    if (process.env.NODE_ENV === 'development') {
      const { name, value, rating, delta } = metric;
      console.log(`[Web Vitals] ${name}:`, {
        value: Math.round(value),
        rating,
        delta: Math.round(delta),
      });
    }
    
    // Send to analytics in production
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      });

      // Use sendBeacon for better performance
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics', body);
      }
    }
  })

  return null
}
