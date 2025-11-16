#!/usr/bin/env node

/**
 * Gatsby to Next.js Blog Migration Script
 * 
 * Migrates blog posts and images from avni-website-master (Gatsby) to avninew-v2 (Next.js)
 * 
 * Usage: node scripts/migrate-gatsby-to-next.js
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration
const GATSBY_REPO = path.resolve(__dirname, '../../avni-website-master');
const NEXT_REPO = path.resolve(__dirname, '..');
const GATSBY_BLOG_DIR = path.join(GATSBY_REPO, 'src/pages/blog');
const GATSBY_IMG_DIR = path.join(GATSBY_REPO, 'static/img');
const NEXT_CONTENT_DIR = path.join(NEXT_REPO, 'content/blogs');
const NEXT_IMG_DIR = path.join(NEXT_REPO, 'public/blog-images');

// Migration report
const report = {
  totalPosts: 0,
  migratedPosts: 0,
  failedPosts: [],
  imagesCopied: 0,
  warnings: [],
  urlMappings: {},
};

/**
 * Ensure directory exists
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Extract slug from filename
 * e.g., "2024-06-20-yenepoya-visit.md" -> "2024-06-20-yenepoya-visit"
 */
function extractSlugFromFilename(filename) {
  return filename.replace(/\.mdx?$/, '');
}

/**
 * Normalize author field
 */
function normalizeAuthor(author, authorAvatar) {
  if (typeof author === 'object') {
    return author;
  }
  
  const authorObj = {
    name: author || 'The Avni Team',
  };
  
  if (authorAvatar) {
    authorObj.avatar = authorAvatar;
  }
  
  return authorObj;
}

/**
 * Normalize featured image
 */
function normalizeFeaturedImage(featuredimage, slug) {
  if (!featuredimage) return undefined;
  
  if (typeof featuredimage === 'object') {
    return {
      src: `/blog-images/${slug}/${path.basename(featuredimage.src || featuredimage)}`,
      alt: featuredimage.alt || `Featured image for ${slug}`,
      title: featuredimage.title,
    };
  }
  
  return {
    src: `/blog-images/${slug}/${path.basename(featuredimage)}`,
    alt: `Featured image for ${slug}`,
  };
}

/**
 * Find and copy images for a post
 */
function copyPostImages(oldFrontmatter, slug, content) {
  const postImageDir = path.join(NEXT_IMG_DIR, slug);
  ensureDir(postImageDir);
  
  const copiedImages = [];
  const imageMapping = {};
  
  // Find potential image folder in Gatsby static/img
  const potentialFolders = [
    slug,
    slug.replace(/^\d{4}-\d{2}-\d{2}-/, ''), // Remove date prefix
    oldFrontmatter.title?.toLowerCase().replace(/\s+/g, '-'),
  ];
  
  let sourceImageDir = null;
  for (const folder of potentialFolders) {
    const testPath = path.join(GATSBY_IMG_DIR, folder);
    if (fs.existsSync(testPath)) {
      sourceImageDir = testPath;
      break;
    }
  }
  
  if (!sourceImageDir) {
    // Try to find images referenced in content
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = imageRegex.exec(content)) !== null) {
      const imagePath = match[2];
      if (imagePath.startsWith('/img/')) {
        const relativePath = imagePath.replace('/img/', '');
        const sourceFile = path.join(GATSBY_IMG_DIR, relativePath);
        
        if (fs.existsSync(sourceFile)) {
          const filename = path.basename(sourceFile);
          const destFile = path.join(postImageDir, filename);
          
          try {
            fs.copyFileSync(sourceFile, destFile);
            copiedImages.push(filename);
            imageMapping[imagePath] = `/blog-images/${slug}/${filename}`;
            report.imagesCopied++;
          } catch (error) {
            report.warnings.push(`Failed to copy image ${sourceFile}: ${error.message}`);
          }
        }
      }
    }
    
    return { copiedImages, imageMapping };
  }
  
  // Copy all images from source directory
  try {
    const files = fs.readdirSync(sourceImageDir);
    let imageIndex = 1;
    
    files.forEach(file => {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
        const sourceFile = path.join(sourceImageDir, file);
        
        // Determine if this is the featured image
        let destFilename = file;
        if (oldFrontmatter.featuredimage && file === path.basename(oldFrontmatter.featuredimage)) {
          destFilename = `featured${ext}`;
        } else {
          destFilename = `img-${String(imageIndex).padStart(2, '0')}${ext}`;
          imageIndex++;
        }
        
        const destFile = path.join(postImageDir, destFilename);
        fs.copyFileSync(sourceFile, destFile);
        
        copiedImages.push(destFilename);
        imageMapping[`/img/${path.basename(sourceImageDir)}/${file}`] = `/blog-images/${slug}/${destFilename}`;
        report.imagesCopied++;
      }
    });
  } catch (error) {
    report.warnings.push(`Failed to copy images from ${sourceImageDir}: ${error.message}`);
  }
  
  return { copiedImages, imageMapping };
}

/**
 * Update content with new image paths
 */
function updateContentImagePaths(content, imageMapping) {
  let updatedContent = content;
  
  Object.entries(imageMapping).forEach(([oldPath, newPath]) => {
    updatedContent = updatedContent.replace(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
  });
  
  return updatedContent;
}

/**
 * Migrate a single blog post
 */
function migratePost(filename) {
  const sourcePath = path.join(GATSBY_BLOG_DIR, filename);
  
  // Skip non-markdown files
  if (!filename.match(/\.mdx?$/)) {
    return;
  }
  
  // Skip index.js or other JS files
  if (filename.endsWith('.js') || filename.endsWith('.tsx')) {
    return;
  }
  
  report.totalPosts++;
  
  try {
    // Read and parse the markdown file
    const fileContent = fs.readFileSync(sourcePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    
    // Extract slug
    const slug = frontmatter.slug || extractSlugFromFilename(filename);
    
    // Copy images and get mapping
    const { copiedImages, imageMapping } = copyPostImages(frontmatter, slug, content);
    
    // Update content with new image paths
    const updatedContent = updateContentImagePaths(content, imageMapping);
    
    // Transform frontmatter to new format
    const newFrontmatter = {
      title: frontmatter.title,
      date: frontmatter.date,
      author: normalizeAuthor(frontmatter.author, frontmatter.authorAvatar),
      tags: frontmatter.tags || [],
      type: frontmatter.templateKey === 'case-study' ? 'case-study' : 'blog',
      featuredImage: normalizeFeaturedImage(frontmatter.featuredimage, slug),
      published: frontmatter.published !== false,
    };
    
    // Add optional fields only if they exist and are not undefined
    if (frontmatter.subtitle) newFrontmatter.subtitle = frontmatter.subtitle;
    if (frontmatter.readingTime) newFrontmatter.readingTime = frontmatter.readingTime;
    if (frontmatter.description && frontmatter.description !== '>-') {
      newFrontmatter.description = frontmatter.description;
    }
    if (slug) newFrontmatter.slug = slug;
    
    // Build new markdown file
    const newFileContent = matter.stringify(updatedContent, newFrontmatter);
    
    // Write to new location
    const destPath = path.join(NEXT_CONTENT_DIR, `${slug}.md`);
    fs.writeFileSync(destPath, newFileContent, 'utf-8');
    
    // Record URL mapping
    report.urlMappings[`/blog/${extractSlugFromFilename(filename)}/`] = `/blog/${slug}/`;
    
    report.migratedPosts++;
    console.log(`✓ Migrated: ${filename} -> ${slug}.md (${copiedImages.length} images)`);
    
  } catch (error) {
    report.failedPosts.push(`${filename}: ${error.message}`);
    console.error(`✗ Failed: ${filename} - ${error.message}`);
  }
}

/**
 * Main migration function
 */
function migrate() {
  console.log('Starting Gatsby to Next.js blog migration...\n');
  
  // Ensure directories exist
  ensureDir(NEXT_CONTENT_DIR);
  ensureDir(NEXT_IMG_DIR);
  
  // Check if Gatsby repo exists
  if (!fs.existsSync(GATSBY_BLOG_DIR)) {
    console.error(`Error: Gatsby blog directory not found at ${GATSBY_BLOG_DIR}`);
    console.error('Please ensure avni-website-master is in the parent directory.');
    process.exit(1);
  }
  
  // Read all blog posts
  const files = fs.readdirSync(GATSBY_BLOG_DIR);
  
  // Migrate each post
  files.forEach(migratePost);
  
  // Write migration report
  const reportPath = path.join(NEXT_REPO, 'migration-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('Migration Summary');
  console.log('='.repeat(60));
  console.log(`Total posts found: ${report.totalPosts}`);
  console.log(`Successfully migrated: ${report.migratedPosts}`);
  console.log(`Failed: ${report.failedPosts.length}`);
  console.log(`Images copied: ${report.imagesCopied}`);
  console.log(`Warnings: ${report.warnings.length}`);
  console.log(`\nReport saved to: ${reportPath}`);
  
  if (report.failedPosts.length > 0) {
    console.log('\nFailed posts:');
    report.failedPosts.forEach(post => console.log(`  - ${post}`));
  }
  
  if (report.warnings.length > 0) {
    console.log('\nWarnings:');
    report.warnings.slice(0, 10).forEach(warning => console.log(`  - ${warning}`));
    if (report.warnings.length > 10) {
      console.log(`  ... and ${report.warnings.length - 10} more (see report)`);
    }
  }
  
  console.log('\n✓ Migration complete!');
}

// Run migration
if (require.main === module) {
  migrate();
}

module.exports = { migrate };
