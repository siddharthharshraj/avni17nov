#!/usr/bin/env node

/**
 * Blog Migration Script
 * Migrates blogs from old Docusaurus structure to new Next.js structure
 * Converts front matter and organizes by year/month
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Paths
const OLD_BLOG_DIR = '/Users/samanvay/Documents/avni-website/src/pages/blog';
const OLD_IMG_DIR = '/Users/samanvay/Documents/avni-website/static/img';
const NEW_BLOG_DIR = path.join(process.cwd(), 'content/blogs');
const NEW_IMG_DIR = path.join(process.cwd(), 'public/images/blogs');

// Statistics
const stats = {
  total: 0,
  migrated: 0,
  skipped: 0,
  errors: 0,
};

/**
 * Extract slug from filename
 */
function extractSlug(filename) {
  // Remove date prefix if exists (e.g., 2024-11-08-filename.md -> filename)
  const withoutExt = filename.replace(/\.md$/, '');
  const withoutDate = withoutExt.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  return withoutDate;
}

/**
 * Extract date from filename or front matter
 */
function extractDate(filename, frontmatter) {
  // Try to get from front matter first
  if (frontmatter.date) {
    return frontmatter.date;
  }
  
  // Try to extract from filename (YYYY-MM-DD format)
  const dateMatch = filename.match(/^(\d{4})-(\d{2})-(\d{2})-/);
  if (dateMatch) {
    return `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
  }
  
  // Fallback to file modification time
  return new Date().toISOString().split('T')[0];
}

/**
 * Categorize blog post
 */
function categorizePost(title, content, tags = []) {
  const titleLower = title.toLowerCase();
  const contentLower = content.toLowerCase();
  
  // Check for release announcements
  if (titleLower.includes('release') || titleLower.includes('announcement')) {
    return 'Avni News';
  }
  
  // Check for field visits/user stories
  if (titleLower.includes('field visit') || titleLower.includes('visit to') || 
      contentLower.includes('field visit') || titleLower.includes('case study')) {
    return 'User Story';
  }
  
  // Check for technical content
  if (titleLower.includes('technical') || titleLower.includes('architecture') ||
      titleLower.includes('query generation') || titleLower.includes('ai')) {
    return 'Technical Story';
  }
  
  // Check for conference/community
  if (titleLower.includes('conference') || titleLower.includes('retreat') ||
      titleLower.includes('sprint') || titleLower.includes('meetup')) {
    return 'Avni News';
  }
  
  // Check for sector-specific
  if (tags.some(tag => ['healthcare', 'education', 'wash', 'livelihood'].includes(tag.toLowerCase()))) {
    return 'Sector';
  }
  
  // Default
  return 'User Story';
}

/**
 * Generate SEO-friendly description
 */
function generateDescription(content, existingDesc) {
  if (existingDesc && existingDesc.length > 50) {
    return existingDesc;
  }
  
  // Extract first paragraph
  const paragraphs = content.split('\n\n').filter(p => p.trim() && !p.startsWith('#'));
  if (paragraphs.length > 0) {
    let desc = paragraphs[0].replace(/[#*_`]/g, '').trim();
    if (desc.length > 160) {
      desc = desc.substring(0, 157) + '...';
    }
    return desc;
  }
  
  return 'Read more about Avni and how NGOs are using it to digitize field operations.';
}

/**
 * Estimate read time
 */
function estimateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Migrate a single blog post
 */
function migrateBlog(filename) {
  try {
    stats.total++;
    
    const oldPath = path.join(OLD_BLOG_DIR, filename);
    const fileContents = fs.readFileSync(oldPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Skip index.js
    if (filename === 'index.js') {
      stats.skipped++;
      return;
    }
    
    // Extract metadata
    const slug = extractSlug(filename);
    const date = extractDate(filename, data);
    const title = data.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const category = categorizePost(title, content, data.tags || []);
    const description = generateDescription(content, data.description);
    const readTime = estimateReadTime(content);
    
    // Find associated image
    let image = '/images/blogs/default-blog.jpg';
    const imgFolder = path.join(OLD_IMG_DIR, slug);
    if (fs.existsSync(imgFolder)) {
      const images = fs.readdirSync(imgFolder).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
      if (images.length > 0) {
        image = `/images/blogs/${slug}/${images[0]}`;
      }
    }
    
    // Create new front matter
    const newFrontmatter = {
      title,
      slug,
      category,
      image,
      description,
      date,
      author: data.author || 'Avni Team',
      readTime,
      tags: data.tags || [],
    };
    
    // Create new content
    const newContent = matter.stringify(content, newFrontmatter);
    
    // Write to new location
    const newPath = path.join(NEW_BLOG_DIR, `${slug}.md`);
    fs.writeFileSync(newPath, newContent, 'utf8');
    
    console.log(`✅ Migrated: ${filename} -> ${slug}.md`);
    stats.migrated++;
    
  } catch (error) {
    console.error(`❌ Error migrating ${filename}:`, error.message);
    stats.errors++;
  }
}

/**
 * Main migration process
 */
function main() {
  console.log('🚀 Starting Blog Migration...\n');
  
  // Ensure directories exist
  if (!fs.existsSync(NEW_BLOG_DIR)) {
    fs.mkdirSync(NEW_BLOG_DIR, { recursive: true });
  }
  
  if (!fs.existsSync(NEW_IMG_DIR)) {
    fs.mkdirSync(NEW_IMG_DIR, { recursive: true });
  }
  
  // Check if old blog directory exists
  if (!fs.existsSync(OLD_BLOG_DIR)) {
    console.error(`❌ Old blog directory not found: ${OLD_BLOG_DIR}`);
    process.exit(1);
  }
  
  // Get all blog files
  const files = fs.readdirSync(OLD_BLOG_DIR).filter(f => f.endsWith('.md'));
  
  console.log(`Found ${files.length} blog posts to migrate\n`);
  
  // Migrate each blog
  files.forEach(migrateBlog);
  
  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Migration Summary');
  console.log('='.repeat(50));
  console.log(`Total files found:     ${stats.total}`);
  console.log(`Successfully migrated: ${stats.migrated}`);
  console.log(`Skipped:               ${stats.skipped}`);
  console.log(`Errors:                ${stats.errors}`);
  console.log('\n✅ Migration complete!\n');
}

// Run migration
main();
