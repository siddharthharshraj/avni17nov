#!/usr/bin/env node

/**
 * Fix /img/ paths to /blog-images/ paths
 * Updates old Gatsby image paths to new Next.js paths
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '..', 'content/blogs');
const GATSBY_IMG_DIR = '/Users/siddharth/Downloads/avni-website-master/static/img';
const NEXT_IMAGES_DIR = path.join(__dirname, '..', 'public/blog-images');

const report = {
  totalPosts: 0,
  postsFixed: 0,
  pathsFixed: 0,
  imagesCopied: 0,
  errors: [],
};

/**
 * Find and copy image from Gatsby to Next.js
 */
function findAndCopyImage(oldPath) {
  // Remove /img/ prefix
  const relativePath = oldPath.replace(/^\/img\//, '');
  const sourcePath = path.join(GATSBY_IMG_DIR, relativePath);
  
  if (fs.existsSync(sourcePath)) {
    // Determine destination path
    const destPath = path.join(NEXT_IMAGES_DIR, relativePath);
    const destDir = path.dirname(destPath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // Copy file
    try {
      fs.copyFileSync(sourcePath, destPath);
      report.imagesCopied++;
      return `/blog-images/${relativePath}`;
    } catch (error) {
      console.error(`Error copying ${sourcePath}:`, error.message);
      return null;
    }
  }
  
  return null;
}

/**
 * Fix image paths in content
 */
function fixImagePaths(content) {
  let updated = content;
  let changes = 0;
  
  // Pattern: ![alt](/img/path)
  const imgPattern = /!\[([^\]]*)\]\((\/img\/[^)]+)\)/g;
  
  updated = updated.replace(imgPattern, (match, alt, oldPath) => {
    const newPath = findAndCopyImage(oldPath);
    
    if (newPath) {
      changes++;
      report.pathsFixed++;
      return `![${alt}](${newPath})`;
    }
    
    return match;
  });
  
  return { updated, changes };
}

/**
 * Process a single blog post
 */
function processPost(filename) {
  const filePath = path.join(CONTENT_DIR, filename);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    
    report.totalPosts++;
    
    // Check if content has /img/ paths
    if (/!\[([^\]]*)\]\(\/img\//.test(content)) {
      const { updated, changes } = fixImagePaths(content);
      
      if (changes > 0) {
        report.postsFixed++;
        
        // Write updated file
        const newContent = matter.stringify(updated, frontmatter);
        fs.writeFileSync(filePath, newContent, 'utf-8');
        
        console.log(`✓ Fixed ${changes} image paths in: ${filename}`);
      }
    }
    
  } catch (error) {
    report.errors.push({
      file: filename,
      error: error.message,
    });
    console.error(`✗ Error: ${filename} - ${error.message}`);
  }
}

/**
 * Main function
 */
function fixImgPaths() {
  console.log('🔧 Fixing /img/ paths to /blog-images/...\n');
  
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Error: Content directory not found at ${CONTENT_DIR}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(CONTENT_DIR);
  const markdownFiles = files.filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  
  markdownFiles.forEach(processPost);
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('Fix Summary');
  console.log('='.repeat(60));
  console.log(`Total posts: ${report.totalPosts}`);
  console.log(`Posts fixed: ${report.postsFixed}`);
  console.log(`Paths fixed: ${report.pathsFixed}`);
  console.log(`Images copied: ${report.imagesCopied}`);
  console.log(`Errors: ${report.errors.length}`);
  
  if (report.errors.length > 0) {
    console.log('\nErrors:');
    report.errors.forEach(({ file, error }) => {
      console.log(`  - ${file}: ${error}`);
    });
  }
  
  console.log('\n✓ Image paths fixed!');
}

// Run
if (require.main === module) {
  fixImgPaths();
}

module.exports = { fixImgPaths };
