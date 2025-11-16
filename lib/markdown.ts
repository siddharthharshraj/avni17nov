/**
 * Markdown Utilities
 * Parse and process markdown files with frontmatter
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const caseStudiesDirectory = path.join(process.cwd(), 'content/case-studies');
const blogsDirectory = path.join(process.cwd(), 'content/blogs');

export interface CaseStudyFrontmatter {
  title: string;
  slug: string;
  sector: string;
  logo: string;
  featured?: boolean; // Optional - set in markdown front matter
  description: string;
  date: string;
  author?: string;
  readTime?: string;
  tags?: string[];
}

export interface CaseStudy {
  slug: string;
  frontmatter: CaseStudyFrontmatter;
  content: string;
  htmlContent?: string;
}

/**
 * Get all case study slugs
 */
export function getAllCaseStudySlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(caseStudiesDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map(fileName => fileName.replace(/\.(md|mdx)$/, ''));
  } catch (error) {
    console.error('Error reading case studies directory:', error);
    return [];
  }
}

/**
 * Get case study data by slug
 */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const fullPath = path.join(caseStudiesDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML with GitHub Flavored Markdown support (tables, strikethrough, etc.)
    const processedContent = await remark()
      .use(gfm)
      .use(html, { sanitize: false })
      .process(content);
    const htmlContent = processedContent.toString();

    return {
      slug,
      frontmatter: {
        ...data,
        featured: data.featured || false, // Use featured from front matter
      } as CaseStudyFrontmatter,
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error reading case study ${slug}:`, error);
    return null;
  }
}

/**
 * Get all case studies
 */
export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const slugs = getAllCaseStudySlugs();
  const caseStudies = await Promise.all(
    slugs.map(async (slug) => {
      const caseStudy = await getCaseStudyBySlug(slug);
      return caseStudy;
    })
  );

  // Filter out null values and sort by date (newest first)
  return caseStudies
    .filter((cs): cs is CaseStudy => cs !== null)
    .sort((a, b) => {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });
}

/**
 * Get featured case study
 */
export async function getFeaturedCaseStudy(): Promise<CaseStudy | null> {
  const allCaseStudies = await getAllCaseStudies();
  const featured = allCaseStudies.filter(cs => cs.frontmatter.featured);
  
  // Return the most recent featured case study
  return featured.length > 0 ? featured[0] : null;
}

/**
 * Get non-featured case studies
 */
export async function getNonFeaturedCaseStudies(): Promise<CaseStudy[]> {
  const allCaseStudies = await getAllCaseStudies();
  return allCaseStudies.filter(cs => !cs.frontmatter.featured);
}

/**
 * Get case studies by sector
 */
export async function getCaseStudiesBySector(sector: string): Promise<CaseStudy[]> {
  const allCaseStudies = await getAllCaseStudies();
  return allCaseStudies.filter(cs => 
    cs.frontmatter.sector.toLowerCase() === sector.toLowerCase()
  );
}

/**
 * Search case studies by title or description
 */
export async function searchCaseStudies(query: string): Promise<CaseStudy[]> {
  const allCaseStudies = await getAllCaseStudies();
  const lowerQuery = query.toLowerCase();
  
  return allCaseStudies.filter(cs => 
    cs.frontmatter.title.toLowerCase().includes(lowerQuery) ||
    cs.frontmatter.description.toLowerCase().includes(lowerQuery) ||
    cs.frontmatter.sector.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get all unique sectors
 */
export async function getAllSectors(): Promise<string[]> {
  const allCaseStudies = await getAllCaseStudies();
  const sectors = allCaseStudies.map(cs => cs.frontmatter.sector);
  return Array.from(new Set(sectors)).sort();
}

// ============================================================================
// BLOG FUNCTIONS
// ============================================================================

export interface BlogFrontmatter {
  title: string;
  slug?: string;
  category?: string;
  image?: string;
  featuredImage?: string | { src: string; alt?: string; title?: string };
  featured?: boolean; // Optional - determined by centralized config
  description?: string;
  date: string;
  author?: string | { name: string; avatar?: string };
  authorTitle?: string; // Optional - author designation
  readTime?: string;
  readingTime?: string;
  tags?: string[];
  type?: 'blog' | 'case-study';
  published?: boolean;
}

export interface Blog {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  htmlContent?: string;
}

/**
 * Get all blog slugs
 */
export function getAllBlogSlugs(): string[] {
  try {
    if (!fs.existsSync(blogsDirectory)) {
      fs.mkdirSync(blogsDirectory, { recursive: true });
      return [];
    }
    const fileNames = fs.readdirSync(blogsDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map(fileName => fileName.replace(/\.(md|mdx)$/, ''));
  } catch (error) {
    console.error('Error reading blogs directory:', error);
    return [];
  }
}

/**
 * Get blog data by slug
 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const fullPath = path.join(blogsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML with GitHub Flavored Markdown support (tables, strikethrough, etc.)
    const processedContent = await remark()
      .use(gfm)
      .use(html, { sanitize: false })
      .process(content);
    const htmlContent = processedContent.toString();

    return {
      slug,
      frontmatter: {
        ...data,
        featured: data.featured || false, // Use featured from front matter
      } as BlogFrontmatter,
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error reading blog ${slug}:`, error);
    return null;
  }
}

/**
 * Get all blogs
 */
export async function getAllBlogs(): Promise<Blog[]> {
  const slugs = getAllBlogSlugs();
  const blogs = await Promise.all(
    slugs.map(async (slug) => {
      const blog = await getBlogBySlug(slug);
      return blog;
    })
  );

  // Filter out null values and sort by date (newest first)
  return blogs
    .filter((blog): blog is Blog => blog !== null)
    .sort((a, b) => {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });
}

/**
 * Get featured blog
 * Priority:
 * 1. If blog(s) have featured: true in front matter, use the LATEST one by date (handles multiple featured blogs)
 * 2. Otherwise, use the most recent blog by date (automatic - 95% cases)
 */
export async function getFeaturedBlog(): Promise<Blog | null> {
  const allBlogs = await getAllBlogs();
  
  if (allBlogs.length === 0) {
    return null;
  }
  
  // Check for manual featured override(s)
  const manuallyFeaturedBlogs = allBlogs.filter(blog => blog.frontmatter.featured === true);
  
  if (manuallyFeaturedBlogs.length > 0) {
    // If multiple blogs are marked as featured, use the latest one by date
    // (allBlogs is already sorted by date, so manuallyFeaturedBlogs will be too)
    return manuallyFeaturedBlogs[0];
  }
  
  // Default: return the most recent blog (already sorted by date)
  return allBlogs[0];
}

/**
 * Get non-featured blogs - excludes the featured blog (manual or automatic)
 */
export async function getNonFeaturedBlogs(): Promise<Blog[]> {
  const allBlogs = await getAllBlogs();
  const featuredBlog = await getFeaturedBlog();
  
  if (!featuredBlog) {
    return allBlogs;
  }
  
  // Exclude the featured blog
  return allBlogs.filter(blog => blog.slug !== featuredBlog.slug);
}

/**
 * Get blogs by category
 */
export async function getBlogsByCategory(category: string): Promise<Blog[]> {
  const allBlogs = await getAllBlogs();
  return allBlogs.filter(blog => 
    blog.frontmatter.category?.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Search blogs by title or description
 */
export async function searchBlogs(query: string): Promise<Blog[]> {
  const allBlogs = await getAllBlogs();
  const lowerQuery = query.toLowerCase();
  
  return allBlogs.filter(blog => 
    blog.frontmatter.title.toLowerCase().includes(lowerQuery) ||
    blog.frontmatter.description?.toLowerCase().includes(lowerQuery) ||
    blog.frontmatter.category?.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get all unique blog categories
 */
export async function getAllBlogCategories(): Promise<string[]> {
  const allBlogs = await getAllBlogs();
  const categories = allBlogs
    .map(blog => blog.frontmatter.category)
    .filter((category): category is string => category !== undefined);
  return Array.from(new Set(categories)).sort();
}
