/**
 * Image Utilities for Blog Posts
 * Handles responsive images and srcset generation
 */

import type { ImageSrcSet } from '@/types/blog';

// Standard responsive widths
const RESPONSIVE_WIDTHS = [400, 800, 1200, 1600];

/**
 * Generate srcset string for responsive images
 */
export function generateSrcSet(basePath: string, widths: number[] = RESPONSIVE_WIDTHS): string {
  return widths
    .map(width => {
      const optimizedPath = basePath.replace(/(\.[^.]+)$/, `-${width}$1`);
      return `${optimizedPath} ${width}w`;
    })
    .join(', ');
}

/**
 * Generate WebP srcset
 */
export function generateWebPSrcSet(basePath: string, widths: number[] = RESPONSIVE_WIDTHS): string {
  return widths
    .map(width => {
      const webpPath = basePath.replace(/\.[^.]+$/, `-${width}.webp`);
      return `${webpPath} ${width}w`;
    })
    .join(', ');
}

/**
 * Get optimized image paths for a blog post image
 */
export function getOptimizedImagePaths(src: string): ImageSrcSet {
  // Check if image is in blog-images directory
  if (!src.startsWith('/blog-images/')) {
    return {
      src,
      srcSet: '',
      sizes: '100vw',
    };
  }
  
  // Generate srcset for different sizes
  const srcSet = generateSrcSet(src);
  const webpSrcSet = generateWebPSrcSet(src);
  
  // Generate sizes attribute based on typical blog layout
  const sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px';
  
  return {
    src,
    srcSet,
    sizes,
    webp: src.replace(/\.[^.]+$/, '.webp'),
    webpSrcSet,
  };
}

/**
 * Get image dimensions from path (if encoded in filename)
 */
export function getImageDimensions(src: string): { width?: number; height?: number } {
  // Try to extract dimensions from filename like: image-800x600.jpg
  const match = src.match(/-(\d+)x(\d+)\./);
  
  if (match) {
    return {
      width: parseInt(match[1], 10),
      height: parseInt(match[2], 10),
    };
  }
  
  return {};
}

/**
 * Check if image is optimized (has responsive variants)
 */
export function isImageOptimized(src: string): boolean {
  return src.includes('/optimized/') || src.match(/-\d+\.(jpg|jpeg|png|webp)$/i) !== null;
}

/**
 * Get featured image with fallback
 */
export function getFeaturedImage(featuredImage?: string | { src: string }): string | undefined {
  if (!featuredImage) return undefined;
  
  if (typeof featuredImage === 'string') {
    return featuredImage;
  }
  
  return featuredImage.src;
}
