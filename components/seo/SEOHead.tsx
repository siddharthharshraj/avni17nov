/**
 * SEO Head Component
 * 
 * Comprehensive SEO with Open Graph, Twitter Cards, and all social media tags.
 * Use this component on every page for maximum visibility and social sharing.
 */

import { Metadata } from 'next';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noindex?: boolean;
  keywords?: string[];
}

/**
 * Generate comprehensive metadata for Next.js pages
 */
export function generateSEOMetadata({
  title,
  description,
  canonical,
  ogImage = '/images/og-default.jpg',
  ogType = 'website',
  article,
  noindex = false,
  keywords = [],
}: SEOProps): Metadata {
  const siteName = 'Avni';
  const siteUrl = 'https://avniproject.org';
  const fullTitle = title.includes('Avni') ? title : `${title} | ${siteName}`;
  const fullCanonical = canonical || siteUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  // Default keywords
  const defaultKeywords = [
    'Avni',
    'NGO software',
    'field data collection',
    'impact measurement',
    'beneficiary tracking',
    'offline data collection',
    'mobile data collection',
    'social sector technology',
  ];

  const allKeywords = [...new Set([...defaultKeywords, ...keywords])];

  return {
    title: fullTitle,
    description,
    keywords: allKeywords.join(', '),
    authors: [{ name: 'Avni Project' }],
    creator: 'Avni Project',
    publisher: 'Avni Project',
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: fullCanonical,
    },
    
    // Open Graph
    openGraph: {
      type: ogType,
      locale: 'en_US',
      url: fullCanonical,
      siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(article && ogType === 'article' && {
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        authors: article.author ? [article.author] : undefined,
        section: article.section,
        tags: article.tags,
      }),
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      site: '@avniproject',
      creator: '@avniproject',
      title: fullTitle,
      description,
      images: [fullOgImage],
    },

    // Additional meta tags
    other: {
      // Facebook
      'fb:app_id': process.env.NEXT_PUBLIC_FB_APP_ID || '',
      
      // WhatsApp
      'og:image:width': '1200',
      'og:image:height': '630',
      
      // LinkedIn
      'og:see_also': siteUrl,
      
      // Pinterest
      'pinterest-rich-pin': 'true',
      
      // Telegram
      'telegram:channel': '@avniproject',
      
      // Additional SEO
      'theme-color': '#419372',
      'msapplication-TileColor': '#419372',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'format-detection': 'telephone=no',
    },
  };
}

/**
 * JSON-LD Structured Data Generators
 */

export interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint?: {
    telephone: string;
    contactType: string;
    email: string;
  };
}

export function generateOrganizationSchema(data: OrganizationSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    logo: data.logo,
    description: data.description,
    sameAs: data.sameAs,
    ...(data.contactPoint && {
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: data.contactPoint.telephone,
        contactType: data.contactPoint.contactType,
        email: data.contactPoint.email,
      },
    }),
  };
}

export interface ArticleSchema {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  publisher: {
    name: string;
    logo: string;
  };
}

export function generateArticleSchema(data: ArticleSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    image: data.image,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: {
      '@type': 'Person',
      name: data.author,
    },
    publisher: {
      '@type': 'Organization',
      name: data.publisher.name,
      logo: {
        '@type': 'ImageObject',
        url: data.publisher.logo,
      },
    },
  };
}

export interface BreadcrumbSchema {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function generateBreadcrumbSchema(data: BreadcrumbSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: data.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface FAQSchema {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export function generateFAQSchema(data: FAQSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}
