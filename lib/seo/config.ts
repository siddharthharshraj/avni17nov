/**
 * SEO Configuration
 * Central configuration for all SEO-related metadata
 */

export const siteConfig = {
  name: 'Avni',
  title: 'Open-source AI-powered Offline-capable Data collection and Reporting platform for Non-profits',
  description: 'Open-source AI-powered platform for offline data collection and reporting. Built for non-profits with case management, mobile data collection, and intelligent reporting. Made in India.',
  url: 'https://avniproject.org',
  ogImage: '/og-image.jpg',
  twitterHandle: '@avniproject',
  locale: 'en_US',
  type: 'website',
  
  // Organization details
  organization: {
    name: 'Avni Project',
    legalName: 'Avni - Digital Field Work Platform',
    url: 'https://avniproject.org',
    logo: 'https://avniproject.org/logos/avni-logo.png',
    foundingDate: '2016',
    description: 'Open-source digital platform empowering NGOs with field data collection and program management tools',
    email: 'contact@avniproject.org',
    address: {
      addressCountry: 'IN',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
    },
    sameAs: [
      'https://github.com/avniproject',
      'https://www.linkedin.com/company/avni-project',
      'https://twitter.com/avniproject',
    ],
  },
  
  // Default keywords
  keywords: [
    'NGO software',
    'field data collection',
    'mobile data collection',
    'case management',
    'program monitoring',
    'impact measurement',
    'digital health',
    'community health workers',
    'offline data collection',
    'low-code platform',
    'open source NGO tools',
    'field work digitization',
    'India NGO technology',
  ],
  
  // Social media
  social: {
    twitter: 'https://twitter.com/avniproject',
    linkedin: 'https://www.linkedin.com/company/avni-project',
    github: 'https://github.com/avniproject',
    youtube: 'https://www.youtube.com/@avniproject',
  },
  
  // Authors
  defaultAuthor: {
    name: 'Avni Team',
    url: 'https://avniproject.org/about',
  },
};

// Page-specific SEO metadata
export const pageMetadata = {
  home: {
    title: 'Open-source AI-powered Offline-capable Data collection and Reporting platform for Non-profits',
    description: 'Open-source AI-powered platform for offline data collection and reporting. Built for non-profits with case management, mobile data collection, and intelligent reporting.',
    keywords: ['open source', 'AI-powered', 'offline data collection', 'reporting platform', 'non-profits', 'NGO software', 'field data collection', 'case management'],
  },
  
  about: {
    title: 'About Avni - Empowering NGOs with Digital Tools',
    description: 'Learn about Avni\'s mission to digitize field work for NGOs. Open-source platform built by nonprofits, for nonprofits, serving 11M+ individuals across 60+ organizations.',
    keywords: ['about avni', 'NGO technology', 'digital transformation', 'nonprofit software'],
  },
  
  solutions: {
    title: 'Solutions - Avni Platform for Every Sector',
    description: 'Discover Avni solutions for education, healthcare, WASH, waste management, social security, livelihood, legal aid, and sports programs. Tailored for NGO field operations.',
    keywords: ['NGO solutions', 'sector-specific software', 'field program management', 'digital health solutions'],
  },
  
  services: {
    title: 'Services - Implementation & Support | Avni',
    description: 'Expert implementation, training, and support services for Avni platform. Get your NGO field operations digitized with our comprehensive service packages.',
    keywords: ['implementation services', 'NGO consulting', 'training', 'technical support'],
  },
  
  useCases: {
    title: 'Use Cases - Real-World Applications | Avni',
    description: 'Explore how NGOs use Avni for education tracking, healthcare monitoring, WASH programs, and more. Real-world use cases and success stories.',
    keywords: ['use cases', 'success stories', 'NGO case studies', 'field work examples'],
  },
  
  pricing: {
    title: 'Pricing - Affordable Plans for NGOs | Avni',
    description: 'Transparent, affordable pricing for NGOs of all sizes. Start with a free trial. No credit card required.',
    keywords: ['pricing', 'NGO pricing', 'affordable software', 'free trial'],
  },
  
  contact: {
    title: 'Contact Us - Get in Touch | Avni',
    description: 'Contact Avni team for demos, support, or partnership inquiries. We\'re here to help digitize your field operations.',
    keywords: ['contact', 'support', 'demo request', 'partnership'],
  },
};

// Blog categories and their metadata
export const blogCategories = {
  'product-updates': {
    title: 'Product Updates',
    description: 'Latest features, improvements, and announcements from Avni',
  },
  'case-studies': {
    title: 'Case Studies',
    description: 'Real-world success stories from NGOs using Avni',
  },
  'best-practices': {
    title: 'Best Practices',
    description: 'Tips and guides for effective field data collection',
  },
  'impact-stories': {
    title: 'Impact Stories',
    description: 'Stories of transformation and impact from the field',
  },
};

// Structured data templates
export const structuredDataTemplates = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.organization.name,
    legalName: siteConfig.organization.legalName,
    url: siteConfig.organization.url,
    logo: siteConfig.organization.logo,
    foundingDate: siteConfig.organization.foundingDate,
    description: siteConfig.organization.description,
    email: siteConfig.organization.email,
    address: {
      '@type': 'PostalAddress',
      ...siteConfig.organization.address,
    },
    sameAs: siteConfig.organization.sameAs,
  },
  
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.organization.name,
      logo: {
        '@type': 'ImageObject',
        url: siteConfig.organization.logo,
      },
    },
  },
};
