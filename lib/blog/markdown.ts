/**
 * Markdown Processing Utilities
 * Converts markdown to HTML with plugins
 */

import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/**
 * Convert markdown to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(gfm) // GitHub Flavored Markdown
    .use(html, { sanitize: false }) // Allow HTML in markdown
    .process(markdown);
  
  return result.toString();
}

/**
 * Extract headings from markdown for table of contents
 */
export function extractHeadings(markdown: string): Array<{ level: number; text: string; id: string }> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Array<{ level: number; text: string; id: string }> = [];
  
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    headings.push({ level, text, id });
  }
  
  return headings;
}

/**
 * Extract first paragraph as excerpt
 */
export function extractExcerpt(markdown: string, maxLength: number = 160): string {
  // Remove frontmatter if present
  const contentWithoutFrontmatter = markdown.replace(/^---[\s\S]*?---/, '').trim();
  
  // Remove markdown syntax
  const plainText = contentWithoutFrontmatter
    .replace(/#{1,6}\s+/g, '') // Remove headings
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/!\[.*?\]\(.+?\)/g, '') // Remove images
    .replace(/`(.+?)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .trim();
  
  // Get first paragraph
  const firstParagraph = plainText.split('\n\n')[0] || plainText;
  
  // Truncate to max length
  if (firstParagraph.length <= maxLength) {
    return firstParagraph;
  }
  
  return firstParagraph.substring(0, maxLength).trim() + '...';
}
