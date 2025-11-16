/**
 * Blog Image Management System
 * Handles image organization, optimization, and rendering for blog posts
 */

import fs from 'fs';
import path from 'path';

export interface BlogImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface BlogImageSet {
  hero: BlogImage;
  inline: BlogImage[];
  thumbnail: BlogImage;
}

/**
 * Image naming conventions for blog posts
 * 
 * Structure: /public/images/blogs/{blog-slug}/
 * 
 * Required:
 * - hero.webp (or hero.jpg/png) - Main featured image (1200x630 recommended)
 * 
 * Optional:
 * - thumbnail.webp - Smaller version for cards (600x400 recommended)
 * - image-1.webp, image-2.webp, etc. - Inline content images
 * - {descriptive-name}.webp - Named inline images
 * 
 * All images should be in WebP format for optimal performance
 */

/**
 * Get blog image directory path
 */
export function getBlogImageDir(slug: string): string {
  return path.join(process.cwd(), 'public', 'images', 'blogs', slug);
}

/**
 * Get blog image URL
 */
export function getBlogImageUrl(slug: string, filename: string): string {
  return `/images/blogs/${slug}/${filename}`;
}

/**
 * Check if blog has custom images
 */
export function hasBlogImages(slug: string): boolean {
  const imageDir = getBlogImageDir(slug);
  return fs.existsSync(imageDir);
}

/**
 * Get all images for a blog post
 */
export function getBlogImages(slug: string): string[] {
  const imageDir = getBlogImageDir(slug);
  
  if (!fs.existsSync(imageDir)) {
    return [];
  }
  
  const files = fs.readdirSync(imageDir);
  return files
    .filter(file => /\.(webp|jpg|jpeg|png)$/i.test(file))
    .map(file => getBlogImageUrl(slug, file));
}

/**
 * Get hero image for a blog post
 * Priority: hero.webp > hero.jpg > hero.png > first image > default
 */
export function getHeroImage(slug: string): string {
  const imageDir = getBlogImageDir(slug);
  
  if (!fs.existsSync(imageDir)) {
    return '/images/blogs/default-hero.webp';
  }
  
  const files = fs.readdirSync(imageDir);
  
  // Check for hero images in priority order
  const heroPatterns = ['hero.webp', 'hero.jpg', 'hero.jpeg', 'hero.png', 'featured.webp', 'featured.jpg'];
  
  for (const pattern of heroPatterns) {
    if (files.includes(pattern)) {
      return getBlogImageUrl(slug, pattern);
    }
  }
  
  // Fallback to first image
  const firstImage = files.find(file => /\.(webp|jpg|jpeg|png)$/i.test(file));
  if (firstImage) {
    return getBlogImageUrl(slug, firstImage);
  }
  
  // Default fallback
  return '/images/blogs/default-hero.webp';
}

/**
 * Get thumbnail image for a blog post
 * Priority: thumbnail.webp > hero.webp > first image > default
 */
export function getThumbnailImage(slug: string): string {
  const imageDir = getBlogImageDir(slug);
  
  if (!fs.existsSync(imageDir)) {
    return '/images/blogs/default-thumbnail.webp';
  }
  
  const files = fs.readdirSync(imageDir);
  
  // Check for thumbnail
  const thumbnailPatterns = ['thumbnail.webp', 'thumbnail.jpg', 'thumb.webp'];
  
  for (const pattern of thumbnailPatterns) {
    if (files.includes(pattern)) {
      return getBlogImageUrl(slug, pattern);
    }
  }
  
  // Fallback to hero image
  return getHeroImage(slug);
}

/**
 * Get inline images for a blog post (excludes hero and thumbnail)
 */
export function getInlineImages(slug: string): string[] {
  const imageDir = getBlogImageDir(slug);
  
  if (!fs.existsSync(imageDir)) {
    return [];
  }
  
  const files = fs.readdirSync(imageDir);
  const excludePatterns = ['hero', 'thumbnail', 'thumb', 'featured'];
  
  return files
    .filter(file => {
      if (!/\.(webp|jpg|jpeg|png)$/i.test(file)) {
        return false;
      }
      
      const baseName = file.toLowerCase().replace(/\.(webp|jpg|jpeg|png)$/i, '');
      return !excludePatterns.some(pattern => baseName.includes(pattern));
    })
    .map(file => getBlogImageUrl(slug, file))
    .sort(); // Sort alphabetically
}

/**
 * Image size recommendations
 */
export const IMAGE_SIZES = {
  hero: {
    width: 1200,
    height: 630,
    description: 'Main featured image for blog post and social sharing',
  },
  thumbnail: {
    width: 600,
    height: 400,
    description: 'Smaller version for blog cards and previews',
  },
  inline: {
    maxWidth: 1200,
    description: 'Content images - responsive, max width 1200px',
  },
};

/**
 * Generate image markdown for blog posts
 */
export function generateImageMarkdown(
  src: string,
  alt: string,
  caption?: string
): string {
  let markdown = `![${alt}](${src})`;
  
  if (caption) {
    markdown += `\n*${caption}*`;
  }
  
  return markdown;
}

/**
 * Validate blog images
 */
export interface ImageValidation {
  hasHero: boolean;
  hasThumbnail: boolean;
  inlineCount: number;
  totalSize: number;
  warnings: string[];
}

export function validateBlogImages(slug: string): ImageValidation {
  const imageDir = getBlogImageDir(slug);
  const validation: ImageValidation = {
    hasHero: false,
    hasThumbnail: false,
    inlineCount: 0,
    totalSize: 0,
    warnings: [],
  };
  
  if (!fs.existsSync(imageDir)) {
    validation.warnings.push('No image directory found');
    return validation;
  }
  
  const files = fs.readdirSync(imageDir);
  
  // Check for hero image
  validation.hasHero = files.some(f => 
    /^(hero|featured)\.(webp|jpg|jpeg|png)$/i.test(f)
  );
  
  if (!validation.hasHero) {
    validation.warnings.push('No hero image found (hero.webp recommended)');
  }
  
  // Check for thumbnail
  validation.hasThumbnail = files.some(f => 
    /^(thumbnail|thumb)\.(webp|jpg|jpeg|png)$/i.test(f)
  );
  
  // Count inline images
  validation.inlineCount = getInlineImages(slug).length;
  
  // Calculate total size
  files.forEach(file => {
    const filePath = path.join(imageDir, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      validation.totalSize += stats.size;
    }
  });
  
  // Check for non-WebP images
  const nonWebP = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  if (nonWebP.length > 0) {
    validation.warnings.push(
      `${nonWebP.length} images not in WebP format: ${nonWebP.join(', ')}`
    );
  }
  
  return validation;
}
