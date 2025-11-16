#!/usr/bin/env node

/**
 * Blog Validation Script
 * Scans all blog posts for common issues:
 * - Missing or invalid images
 * - Inconsistent frontmatter fields
 * - Formatting issues
 * - Broken markdown
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOGS_DIR = path.join(__dirname, '../content/blogs');
const IMAGES_DIR = path.join(__dirname, '../public');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateBlog(filePath) {
  const issues = [];
  const warnings = [];
  const fileName = path.basename(filePath);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: markdown } = matter(content);
    
    // Check required frontmatter fields
    if (!frontmatter.title) {
      issues.push('Missing title');
    }
    
    if (!frontmatter.date) {
      issues.push('Missing date');
    }
    
    if (!frontmatter.category) {
      warnings.push('Missing category');
    }
    
    // Check for image field (either 'image' or 'featuredImage')
    const hasImage = frontmatter.image || frontmatter.featuredImage;
    if (!hasImage) {
      warnings.push('No featured image specified');
    } else {
      const imagePath = frontmatter.image || frontmatter.featuredImage;
      
      // Convert imagePath to string if it's an object
      const imagePathStr = typeof imagePath === 'string' ? imagePath : imagePath?.src || '';
      
      // Check if it's the default placeholder
      if (imagePathStr && imagePathStr.includes('default-blog.jpg')) {
        warnings.push('Using default placeholder image');
      }
      
      // Check if image file exists
      if (imagePathStr && !imagePathStr.startsWith('http')) {
        const fullImagePath = path.join(IMAGES_DIR, imagePathStr);
        if (!fs.existsSync(fullImagePath)) {
          issues.push(`Image not found: ${imagePathStr}`);
        }
      }
    }
    
    // Check for both 'image' and 'featuredImage' (inconsistency)
    if (frontmatter.image && frontmatter.featuredImage) {
      warnings.push('Has both "image" and "featuredImage" fields');
    }
    
    // Check markdown content
    if (!markdown || markdown.trim().length === 0) {
      issues.push('Empty content');
    }
    
    // Check for broken image references in markdown
    const imageRegex = /!\[.*?\]\((.*?)\)/g;
    let match;
    while ((match = imageRegex.exec(markdown)) !== null) {
      const imagePath = match[1];
      if (!imagePath.startsWith('http') && !imagePath.startsWith('/')) {
        warnings.push(`Relative image path in markdown: ${imagePath}`);
      }
    }
    
    // Check for missing alt text in images
    const imageNoAltRegex = /!\[\s*\]\(/g;
    if (imageNoAltRegex.test(markdown)) {
      warnings.push('Images missing alt text');
    }
    
    return { issues, warnings, frontmatter };
  } catch (error) {
    return { 
      issues: [`Failed to parse: ${error.message}`], 
      warnings: [],
      frontmatter: null 
    };
  }
}

function scanAllBlogs() {
  log('\n🔍 Scanning all blog posts...\n', 'blue');
  
  const files = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.md'));
  
  let totalIssues = 0;
  let totalWarnings = 0;
  let blogsWithIssues = 0;
  let blogsWithWarnings = 0;
  
  const stats = {
    withImage: 0,
    withFeaturedImage: 0,
    withDefaultImage: 0,
    withoutImage: 0,
    missingImages: [],
  };
  
  files.forEach(file => {
    const filePath = path.join(BLOGS_DIR, file);
    const { issues, warnings, frontmatter } = validateBlog(filePath);
    
    // Update stats
    if (frontmatter) {
      if (frontmatter.image) stats.withImage++;
      if (frontmatter.featuredImage) stats.withFeaturedImage++;
      
      const imageStr = typeof frontmatter.image === 'string' ? frontmatter.image : frontmatter.image?.src || '';
      const featuredStr = typeof frontmatter.featuredImage === 'string' ? frontmatter.featuredImage : frontmatter.featuredImage?.src || '';
      
      if (imageStr.includes('default-blog.jpg') || featuredStr.includes('default-blog.jpg')) {
        stats.withDefaultImage++;
      }
      if (!frontmatter.image && !frontmatter.featuredImage) {
        stats.withoutImage++;
      }
    }
    
    if (issues.length > 0) {
      blogsWithIssues++;
      totalIssues += issues.length;
      log(`\n❌ ${file}`, 'red');
      issues.forEach(issue => log(`   • ${issue}`, 'red'));
      
      // Track missing images
      issues.forEach(issue => {
        if (issue.startsWith('Image not found:')) {
          stats.missingImages.push({ file, issue });
        }
      });
    }
    
    if (warnings.length > 0) {
      blogsWithWarnings++;
      totalWarnings += warnings.length;
      if (issues.length === 0) {
        log(`\n⚠️  ${file}`, 'yellow');
      }
      warnings.forEach(warning => log(`   • ${warning}`, 'yellow'));
    }
    
    if (issues.length === 0 && warnings.length === 0) {
      log(`✅ ${file}`, 'green');
    }
  });
  
  // Summary
  log('\n' + '='.repeat(60), 'blue');
  log('📊 SUMMARY', 'blue');
  log('='.repeat(60), 'blue');
  log(`\nTotal blogs scanned: ${files.length}`, 'blue');
  log(`Blogs with issues: ${blogsWithIssues}`, blogsWithIssues > 0 ? 'red' : 'green');
  log(`Blogs with warnings: ${blogsWithWarnings}`, blogsWithWarnings > 0 ? 'yellow' : 'green');
  log(`Total issues: ${totalIssues}`, totalIssues > 0 ? 'red' : 'green');
  log(`Total warnings: ${totalWarnings}`, totalWarnings > 0 ? 'yellow' : 'green');
  
  log('\n📷 IMAGE STATISTICS:', 'magenta');
  log(`Blogs with 'image' field: ${stats.withImage}`, 'blue');
  log(`Blogs with 'featuredImage' field: ${stats.withFeaturedImage}`, 'blue');
  log(`Blogs with default placeholder: ${stats.withDefaultImage}`, 'yellow');
  log(`Blogs without any image: ${stats.withoutImage}`, 'yellow');
  
  if (stats.missingImages.length > 0) {
    log('\n🖼️  MISSING IMAGES:', 'red');
    stats.missingImages.forEach(({ file, issue }) => {
      log(`   ${file}: ${issue}`, 'red');
    });
  }
  
  log('\n' + '='.repeat(60) + '\n', 'blue');
  
  // Exit code
  process.exit(totalIssues > 0 ? 1 : 0);
}

// Run the scan
scanAllBlogs();
