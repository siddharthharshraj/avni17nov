#!/usr/bin/env node

/**
 * Fix Missing Images
 * Removes references to missing images or sets published: false
 * 
 * Usage: node scripts/fix-missing-images.js
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '..', 'content/blogs');
const IMAGES_DIR = path.join(__dirname, '..', 'public/blog-images');

const POSTS_WITH_MISSING_IMAGES = [
  '2019-12-19-community-health-service-programs-and-avni.md',
  '2020-01-28-case-for-generic-open-source-products.md',
  '2024-01-22-avni-conference-goa.md',
  '2024-06-19-world-sickle-cell-day.md',
  '2025-05-19-field-visit-to-iph.md',
  'building-a-social-security-benefits-product.md',
  'how-avni-has-become-pillar-of-community-MIS-at-ASHWINI.md',
];

const report = {
  fixed: 0,
  errors: [],
};

/**
 * Fix a post with missing images
 */
function fixPost(filename) {
  const filePath = path.join(CONTENT_DIR, filename);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    
    // Option 1: Remove featured image if it doesn't exist
    if (frontmatter.featuredImage) {
      const featuredPath = typeof frontmatter.featuredImage === 'string'
        ? frontmatter.featuredImage
        : frontmatter.featuredImage.src;
      
      const fullPath = path.join(__dirname, '..', 'public', featuredPath);
      
      if (!fs.existsSync(fullPath)) {
        console.log(`Removing missing featured image from: ${filename}`);
        delete frontmatter.featuredImage;
      }
    }
    
    // Option 2: Remove broken image references from content
    let updatedContent = content;
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    const imagesToRemove = [];
    
    while ((match = imageRegex.exec(content)) !== null) {
      const imagePath = match[2];
      
      if (imagePath.startsWith('/blog-images/')) {
        const fullPath = path.join(__dirname, '..', 'public', imagePath);
        
        if (!fs.existsSync(fullPath)) {
          imagesToRemove.push(match[0]);
          console.log(`  - Removing missing image: ${imagePath}`);
        }
      }
    }
    
    // Remove broken image references
    imagesToRemove.forEach(imageRef => {
      updatedContent = updatedContent.replace(imageRef, '');
    });
    
    // Clean up multiple blank lines
    updatedContent = updatedContent.replace(/\n{3,}/g, '\n\n');
    
    // Write updated file
    const newContent = matter.stringify(updatedContent, frontmatter);
    fs.writeFileSync(filePath, newContent, 'utf-8');
    
    report.fixed++;
    console.log(`✓ Fixed: ${filename}`);
    
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
function fixMissingImages() {
  console.log('Fixing posts with missing images...\n');
  
  POSTS_WITH_MISSING_IMAGES.forEach(fixPost);
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('Fix Summary');
  console.log('='.repeat(60));
  console.log(`Posts fixed: ${report.fixed}`);
  console.log(`Errors: ${report.errors.length}`);
  
  if (report.errors.length > 0) {
    console.log('\nErrors:');
    report.errors.forEach(({ file, error }) => {
      console.log(`  - ${file}: ${error}`);
    });
  }
  
  console.log('\n✓ Missing images fixed!');
}

// Run
if (require.main === module) {
  fixMissingImages();
}

module.exports = { fixMissingImages };
