/**
 * SEO Metadata Generator
 * Utilities to generate metadata for pages, blogs, and case studies
 */

import { Metadata } from 'next';
import { siteConfig } from './config';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  canonical?: string;
}

/**
 * Generate complete metadata for a page
 */
export function generateMetadata(props: SEOProps): Metadata {
  const {
    title,
    description = siteConfig.description,
    keywords = siteConfig.keywords,
    image = siteConfig.ogImage,
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    section,
    tags,
    noindex = false,
    canonical,
  } = props;

  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const pageUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  const metadata: Metadata = {
    title: pageTitle,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : [siteConfig.defaultAuthor],
    creator: siteConfig.organization.name,
    publisher: siteConfig.organization.name,
    
    // Robots
    robots: noindex
      ? {
          index: false,
          follow: false,
        }
      : {
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

    // Open Graph
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: pageUrl,
      title: pageTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : [siteConfig.defaultAuthor.name],
        section,
        tags,
      }),
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: pageTitle,
      description,
      images: [imageUrl],
    },

    // Alternates
    alternates: {
      canonical: canonical || pageUrl,
    },

    // Additional metadata
    metadataBase: new URL(siteConfig.url),
    category: section,
  };

  return metadata;
}

/**
 * Generate metadata for blog posts
 */
export function generateBlogMetadata(props: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  category?: string;
  tags?: string[];
  draft?: boolean;
}): Metadata {
  const {
    title,
    description,
    slug,
    image,
    publishedAt,
    updatedAt,
    author,
    category,
    tags,
    draft = false,
  } = props;

  return generateMetadata({
    title,
    description,
    keywords: tags || [],
    image: image || siteConfig.ogImage,
    url: `/blog/${slug}`,
    type: 'article',
    publishedTime: publishedAt,
    modifiedTime: updatedAt || publishedAt,
    author: author || siteConfig.defaultAuthor.name,
    section: category,
    tags,
    noindex: draft,
    canonical: `/blog/${slug}`,
  });
}

/**
 * Generate metadata for case studies
 */
export function generateCaseStudyMetadata(props: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedAt: string;
  organization: string;
  sector?: string;
  tags?: string[];
  draft?: boolean;
}): Metadata {
  const {
    title,
    description,
    slug,
    image,
    publishedAt,
    organization,
    sector,
    tags,
    draft = false,
  } = props;

  return generateMetadata({
    title: `${title} - ${organization} Case Study`,
    description,
    keywords: tags || [],
    image: image || siteConfig.ogImage,
    url: `/case-studies/${slug}`,
    type: 'article',
    publishedTime: publishedAt,
    author: organization,
    section: sector || 'Case Studies',
    tags,
    noindex: draft,
    canonical: `/case-studies/${slug}`,
  });
}

/**
 * Generate breadcrumb list for structured data
 */
export function generateBreadcrumbList(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
