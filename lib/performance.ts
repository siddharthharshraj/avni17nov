/**
 * Performance Optimization Utilities
 */

// Preload critical resources
export function preloadResource(href: string, as: string) {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
}

// Prefetch next page
export function prefetchPage(href: string) {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

// Lazy load images with Intersection Observer
export function lazyLoadImage(img: HTMLImageElement) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLImageElement;
        target.src = target.dataset.src || '';
        target.classList.remove('lazy');
        observer.unobserve(target);
      }
    });
  });

  observer.observe(img);
}

// Request Idle Callback polyfill
export const requestIdleCallback =
  typeof window !== 'undefined' && 'requestIdleCallback' in window
    ? window.requestIdleCallback
    : (cb: IdleRequestCallback) => setTimeout(cb, 1);

// Cancel Idle Callback polyfill
export const cancelIdleCallback =
  typeof window !== 'undefined' && 'cancelIdleCallback' in window
    ? window.cancelIdleCallback
    : (id: number) => clearTimeout(id);

// Measure performance
export function measurePerformance(name: string, fn: () => void) {
  if (typeof window === 'undefined' || !window.performance) {
    fn();
    return;
  }

  const startMark = `${name}-start`;
  const endMark = `${name}-end`;

  performance.mark(startMark);
  fn();
  performance.mark(endMark);
  performance.measure(name, startMark, endMark);

  const measure = performance.getEntriesByName(name)[0];
  console.log(`[Performance] ${name}: ${measure.duration.toFixed(2)}ms`);
}
