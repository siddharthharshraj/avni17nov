/**
 * Structured Data Component
 * Renders JSON-LD structured data for SEO
 */

import Script from 'next/script';

interface StructuredDataProps {
  data: Record<string, any> | Array<Record<string, any>>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLd.map((item, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item, null, 2),
          }}
        />
      ))}
    </>
  );
}

/**
 * Organization Schema
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Avni Project',
    legalName: 'Avni - Digital Field Work Platform',
    url: 'https://avniproject.org',
    logo: 'https://avniproject.org/logos/avni-logo.png',
    foundingDate: '2016',
    description: 'Open-source digital platform empowering NGOs with field data collection and program management tools',
    email: 'contact@avniproject.org',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
    },
    sameAs: [
      'https://github.com/avniproject',
      'https://www.linkedin.com/company/avni-project',
      'https://twitter.com/avniproject',
      'https://www.youtube.com/@avniproject',
    ],
  };

  return <StructuredData data={schema} />;
}

/**
 * Website Schema
 */
export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Avni',
    url: 'https://avniproject.org',
    description: 'Digital field work platform for NGOs - case management, data collection, and impact measurement',
    publisher: {
      '@type': 'Organization',
      name: 'Avni Project',
      logo: {
        '@type': 'ImageObject',
        url: 'https://avniproject.org/logos/avni-logo.png',
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://avniproject.org/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return <StructuredData data={schema} />;
}

/**
 * Blog Posting Schema
 */
export function BlogPostingSchema(props: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  keywords?: string[];
}) {
  const {
    title,
    description,
    url,
    image = '/og-image.jpg',
    publishedAt,
    updatedAt,
    author = 'Avni Team',
    keywords = [],
  } = props;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: image.startsWith('http') ? image : `https://avniproject.org${image}`,
    url: `https://avniproject.org${url}`,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Avni Project',
      logo: {
        '@type': 'ImageObject',
        url: 'https://avniproject.org/logos/avni-logo.png',
      },
    },
    keywords: keywords.join(', '),
  };

  return <StructuredData data={schema} />;
}

/**
 * Breadcrumb Schema
 */
export function BreadcrumbSchema(props: {
  items: Array<{ name: string; url: string }>;
}) {
  const { items } = props;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://avniproject.org${item.url}`,
    })),
  };

  return <StructuredData data={schema} />;
}

/**
 * FAQ Schema
 */
export function FAQSchema(props: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  const { faqs } = props;

  const schema = {
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

  return <StructuredData data={schema} />;
}

/**
 * Software Application Schema (for Avni platform)
 */
export function SoftwareApplicationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Avni',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Android, iOS, Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '60',
    },
    description: 'Digital field work platform for NGOs - case management, data collection, and impact measurement',
    softwareVersion: '1.0',
    author: {
      '@type': 'Organization',
      name: 'Avni Project',
    },
  };

  return <StructuredData data={schema} />;
}
