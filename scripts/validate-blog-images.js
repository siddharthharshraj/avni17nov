#!/usr/bin/env node

/**
 * Blog Image Validation Script
 * Validates that blog posts have proper images
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOGS_DIR = path.join(process.cwd(), 'content/blogs');
const IMAGES_DIR = path.join(process.cwd(), 'public/images/blogs');

// Statistics
const stats = {
  total: 0,
  withHero: 0,
  withThumbnail: 0,
  withInline: 0,
  missingImages: 0,
  nonWebP: 0,
};

const issues = [];

/**
 * Format file size
 */
function formatSize(bytes) {
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }
  return `${(kb / 1024).toFixed(1)} MB`;
}

/**
 * Validate a single blog's images
 */
function validateBlog(filename) {
  stats.total++;
  
  const blogPath = path.join(BLOGS_DIR, filename);
  const fileContents = fs.readFileSync(blogPath, 'utf8');
  const { data } = matter(fileContents);
  
  const slug = data.slug || filename.replace(/\.md$/, '');
  const imageDir = path.join(IMAGES_DIR, slug);
  
  console.log(`\n📝 ${data.title || slug}`);
  console.log(`   Slug: ${slug}`);
  
  // Check if image directory exists
  if (!fs.existsSync(imageDir)) {
    console.log(`   ⚠️  No image directory found`);
    issues.push({
      blog: slug,
      issue: 'No image directory',
      severity: 'warning',
    });
    stats.missingImages++;
    return;
  }
  
  const files = fs.readdirSync(imageDir);
  
  if (files.length === 0) {
    console.log(`   ⚠️  Image directory is empty`);
    issues.push({
      blog: slug,
      issue: 'Empty image directory',
      severity: 'warning',
    });
    stats.missingImages++;
    return;
  }
  
  // Check for hero image
  const heroPatterns = ['hero.webp', 'hero.jpg', 'hero.jpeg', 'hero.png', 'featured.webp'];
  const hasHero = files.some(f => heroPatterns.includes(f.toLowerCase()));
  
  if (hasHero) {
    console.log(`   ✅ Hero image found`);
    stats.withHero++;
  } else {
    console.log(`   ❌ No hero image (hero.webp recommended)`);
    issues.push({
      blog: slug,
      issue: 'Missing hero image',
      severity: 'error',
    });
  }
  
  // Check for thumbnail
  const thumbPatterns = ['thumbnail.webp', 'thumbnail.jpg', 'thumb.webp'];
  const hasThumb = files.some(f => thumbPatterns.includes(f.toLowerCase()));
  
  if (hasThumb) {
    console.log(`   ✅ Thumbnail found`);
    stats.withThumbnail++;
  } else {
    console.log(`   ℹ️  No thumbnail (will use hero image)`);
  }
  
  // Check for inline images
  const inlineImages = files.filter(f => {
    if (!/\.(webp|jpg|jpeg|png)$/i.test(f)) return false;
    const lower = f.toLowerCase();
    return !heroPatterns.includes(lower) && !thumbPatterns.includes(lower);
  });
  
  if (inlineImages.length > 0) {
    console.log(`   📷 ${inlineImages.length} inline images`);
    stats.withInline++;
  }
  
  // Check for non-WebP images
  const nonWebP = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  if (nonWebP.length > 0) {
    console.log(`   ⚠️  ${nonWebP.length} images not in WebP format:`);
    nonWebP.forEach(f => console.log(`      - ${f}`));
    stats.nonWebP += nonWebP.length;
    issues.push({
      blog: slug,
      issue: `${nonWebP.length} non-WebP images`,
      severity: 'warning',
      files: nonWebP,
    });
  }
  
  // Calculate total size
  let totalSize = 0;
  files.forEach(file => {
    const filePath = path.join(imageDir, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
    }
  });
  
  console.log(`   💾 Total size: ${formatSize(totalSize)}`);
  
  // Check for large images
  files.forEach(file => {
    const filePath = path.join(imageDir, file);
    if (fs.existsSync(filePath)) {
      const fileStats = fs.statSync(filePath);
      const sizeMB = fileStats.size / (1024 * 1024);
      
      if (sizeMB > 1) {
        console.log(`   ⚠️  Large image: ${file} (${formatSize(fileStats.size)})`);
        issues.push({
          blog: slug,
          issue: `Large image: ${file}`,
          severity: 'warning',
          size: formatSize(fileStats.size),
        });
      }
    }
  });
}

/**
 * Main validation
 */
function main() {
  console.log('🔍 Blog Image Validation');
  console.log('========================\n');
  
  if (!fs.existsSync(BLOGS_DIR)) {
    console.error(`❌ Blogs directory not found: ${BLOGS_DIR}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.md'));
  
  console.log(`Found ${files.length} blog posts\n`);
  
  files.forEach(validateBlog);
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Validation Summary');
  console.log('='.repeat(60));
  console.log(`Total blogs:              ${stats.total}`);
  console.log(`With hero image:          ${stats.withHero} (${((stats.withHero/stats.total)*100).toFixed(1)}%)`);
  console.log(`With thumbnail:           ${stats.withThumbnail} (${((stats.withThumbnail/stats.total)*100).toFixed(1)}%)`);
  console.log(`With inline images:       ${stats.withInline} (${((stats.withInline/stats.total)*100).toFixed(1)}%)`);
  console.log(`Missing images:           ${stats.missingImages}`);
  console.log(`Non-WebP images:          ${stats.nonWebP}`);
  
  // Print issues
  if (issues.length > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('⚠️  Issues Found');
    console.log('='.repeat(60));
    
    const errors = issues.filter(i => i.severity === 'error');
    const warnings = issues.filter(i => i.severity === 'warning');
    
    if (errors.length > 0) {
      console.log(`\n❌ Errors (${errors.length}):`);
      errors.forEach(issue => {
        console.log(`   ${issue.blog}: ${issue.issue}`);
      });
    }
    
    if (warnings.length > 0) {
      console.log(`\n⚠️  Warnings (${warnings.length}):`);
      warnings.forEach(issue => {
        console.log(`   ${issue.blog}: ${issue.issue}`);
      });
    }
  }
  
  // Recommendations
  console.log('\n' + '='.repeat(60));
  console.log('💡 Recommendations');
  console.log('='.repeat(60));
  
  if (stats.nonWebP > 0) {
    console.log('• Convert non-WebP images: npm run blog:images');
  }
  
  if (stats.missingImages > 0) {
    console.log('• Add hero images to blogs without images');
  }
  
  console.log('• See docs/BLOG_IMAGE_MANAGEMENT.md for guidelines');
  
  console.log('\n✅ Validation complete!\n');
}

// Run validation
main();
