/**
 * Blog SEO Utilities
 * Comprehensive SEO metadata generation for blog posts
 */

import { Metadata } from 'next';
import { Blog } from '@/lib/markdown';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://avniproject.org';
const SITE_NAME = 'Avni';
const TWITTER_HANDLE = '@avniproject';

/**
 * Generate comprehensive SEO metadata for a blog post
 */
export function generateBlogSEO(blog: Blog): Metadata {
  const { frontmatter, slug } = blog;
  const url = `${SITE_URL}/blog/${slug}`;
  
  // Extract featured image
  const featuredImageSrc = typeof frontmatter.featuredImage === 'string'
    ? frontmatter.featuredImage
    : frontmatter.featuredImage?.src || frontmatter.image;
  
  const imageUrl = featuredImageSrc && featuredImageSrc.startsWith('http') 
    ? featuredImageSrc 
    : `${SITE_URL}${featuredImageSrc || '/images/default-blog.jpg'}`;

  // Generate keywords from tags and category
  const keywords = [
    ...(frontmatter.tags || []),
    ...(frontmatter.category ? [frontmatter.category] : []),
    'Avni',
    'NGO',
    'field work',
    'digital transformation',
  ];

  // Format date
  const publishedTime = new Date(frontmatter.date).toISOString();
  const modifiedTime = publishedTime; // Can be enhanced with actual modification tracking

  // Extract author name
  const authorName = typeof frontmatter.author === 'string'
    ? frontmatter.author
    : frontmatter.author?.name || 'Avni Team';
  
  return {
    title: `${frontmatter.title} | Avni Blog`,
    description: frontmatter.description || '',
    keywords: keywords.join(', '),
    authors: [{ name: authorName }],
    creator: authorName,
    publisher: SITE_NAME,
    
    // Open Graph
    openGraph: {
      type: 'article',
      url,
      title: frontmatter.title,
      description: frontmatter.description || '',
      siteName: SITE_NAME,
      publishedTime,
      modifiedTime,
      authors: [authorName],
      tags: frontmatter.tags || [],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
          type: 'image/webp',
        },
      ],
      locale: 'en_US',
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: frontmatter.title,
      description: frontmatter.description || '',
      images: [imageUrl],
    },

    // Additional metadata
    alternates: {
      canonical: url,
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Other metadata
    other: {
      'article:published_time': publishedTime,
      'article:modified_time': modifiedTime,
      'article:author': frontmatter.author || 'Avni Team',
      'article:section': frontmatter.category,
      'article:tag': (frontmatter.tags || []).join(','),
    },
  };
}

/**
 * Generate JSON-LD structured data for a blog post
 */
export function generateBlogJSONLD(blog: Blog) {
  const { frontmatter, slug, htmlContent } = blog;
  const url = `${SITE_URL}/blog/${slug}`;
  
  // Extract featured image
  const featuredImageSrc = typeof frontmatter.featuredImage === 'string'
    ? frontmatter.featuredImage
    : frontmatter.featuredImage?.src || frontmatter.image;
  
  const imageUrl = featuredImageSrc && featuredImageSrc.startsWith('http')
    ? featuredImageSrc
    : `${SITE_URL}${featuredImageSrc || '/images/default-blog.jpg'}`;

  // Extract word count for reading time calculation
  const wordCount = (htmlContent || '').split(/\s+/).length;
  
  // Extract author name
  const authorName = typeof frontmatter.author === 'string'
    ? frontmatter.author
    : frontmatter.author?.name || 'Avni Team';

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description || '',
    image: imageUrl,
    datePublished: new Date(frontmatter.date).toISOString(),
    dateModified: new Date(frontmatter.date).toISOString(),
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/avni-logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: frontmatter.category,
    keywords: (frontmatter.tags || []).join(', '),
    wordCount,
    url,
  };
}

/**
 * Generate breadcrumb JSON-LD for blog post
 */
export function generateBlogBreadcrumbJSONLD(blog: Blog) {
  const { frontmatter, slug } = blog;

  // Build breadcrumb items
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: `${SITE_URL}/blog`,
    },
  ];

  // Add category breadcrumb only if category exists
  if (frontmatter.category) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      name: frontmatter.category,
      item: `${SITE_URL}/blog/category/${frontmatter.category.toLowerCase().replace(/\s+/g, '-')}`,
    });
  }

  // Add current page
  breadcrumbItems.push({
    '@type': 'ListItem',
    position: frontmatter.category ? 4 : 3,
    name: frontmatter.title,
    item: `${SITE_URL}/blog/${slug}`,
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };
}
