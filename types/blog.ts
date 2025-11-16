/**
 * Blog Post Type Definitions
 * Canonical frontmatter and post data structures
 */

export interface AuthorInfo {
  name: string;
  avatar?: string;
  bio?: string;
  twitter?: string;
  linkedin?: string;
}

export interface ImageMetadata {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface FeaturedImage {
  src: string;
  alt: string;
  title?: string;
}

export interface BlogFrontmatter {
  title: string;                    // Required
  subtitle?: string;
  date: string;                      // Required (ISO format: YYYY-MM-DD)
  readingTime?: string;              // e.g., "5 min"
  author?: AuthorInfo | string;      // Can be string for simple author name
  tags?: string[];
  type?: 'blog' | 'case-study';
  featuredImage?: FeaturedImage | string;  // Can be string for simple path
  images?: (ImageMetadata | string)[];     // Array of images or simple paths
  description?: string;              // Meta description for SEO
  slug?: string;                     // Optional explicit slug
  published?: boolean;               // Default: true
  category?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  contentHtml?: string;
  excerpt?: string;
  readingTime?: string;
}

export interface RelatedPost {
  slug: string;
  title: string;
  featuredImage?: string;
  tags?: string[];
  date: string;
  excerpt?: string;
  readingTime?: string;
}

export interface BlogListItem {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  author?: string | AuthorInfo;
  featuredImage?: string;
  tags?: string[];
  excerpt?: string;
  readingTime?: string;
  type?: 'blog' | 'case-study';
}

export interface MigrationReport {
  totalPosts: number;
  migratedPosts: number;
  failedPosts: string[];
  imagesCopied: number;
  warnings: string[];
  urlMappings: Record<string, string>;
}

export interface ImageSrcSet {
  src: string;
  srcSet: string;
  sizes: string;
  webp?: string;
  webpSrcSet?: string;
}
