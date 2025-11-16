/**
 * Dynamic Sitemap Generation
 * Automatically includes all blog posts and pages
 */

import { MetadataRoute } from 'next';
import { getAllBlogs } from '@/lib/markdown';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://avniproject.org';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blogs
  const blogs = await getAllBlogs();
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/resources/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${SITE_URL}/blog/${blog.slug}`,
    lastModified: new Date(blog.frontmatter.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Blog category pages
  const categories = Array.from(new Set(blogs.map(b => b.frontmatter.category).filter(Boolean)));
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/blog/category/${category!.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages, ...categoryPages];
}
