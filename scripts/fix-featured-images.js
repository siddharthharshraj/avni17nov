#!/usr/bin/env node

/**
 * Fix Featured Image Paths
 * Auto-detects actual image filenames and updates frontmatter
 * 
 * Usage: node scripts/fix-featured-images.js
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '..', 'content/blogs');
const IMAGES_DIR = path.join(__dirname, '..', 'public/blog-images');

const report = {
  totalPosts: 0,
  fixed: 0,
  alreadyCorrect: 0,
  noFeaturedImage: 0,
  errors: [],
};

/**
 * Find the actual featured image in the directory
 */
function findFeaturedImage(slug) {
  const imageDir = path.join(IMAGES_DIR, slug);
  
  if (!fs.existsSync(imageDir)) {
    return null;
  }
  
  const files = fs.readdirSync(imageDir);
  
  // Priority order for featured images
  const priorities = [
    /^featured\.(jpg|jpeg|png|webp)$/i,
    /^banner\.(jpg|jpeg|png|webp)$/i,
    /^hero\.(jpg|jpeg|png|webp)$/i,
    /^cover\.(jpg|jpeg|png|webp)$/i,
    /^img-01\.(jpg|jpeg|png|webp)$/i,
  ];
  
  for (const pattern of priorities) {
    const match = files.find(f => pattern.test(f));
    if (match) {
      return match;
    }
  }
  
  // If no match, return first image file
  const imageFile = files.find(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));
  return imageFile || null;
}

/**
 * Fix featured image path in a post
 */
function fixPost(filename) {
  const filePath = path.join(CONTENT_DIR, filename);
  const slug = filename.replace(/\.mdx?$/, '');
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    
    report.totalPosts++;
    
    // Skip if no featured image
    if (!frontmatter.featuredImage) {
      report.noFeaturedImage++;
      return;
    }
    
    // Get current featured image path
    const currentPath = typeof frontmatter.featuredImage === 'string'
      ? frontmatter.featuredImage
      : frontmatter.featuredImage.src;
    
    // Find actual featured image
    const actualImage = findFeaturedImage(slug);
    
    if (!actualImage) {
      report.errors.push({
        file: filename,
        error: 'No images found in directory',
      });
      return;
    }
    
    const correctPath = `/blog-images/${slug}/${actualImage}`;
    
    // Check if already correct
    if (currentPath === correctPath) {
      report.alreadyCorrect++;
      console.log(`✓ ${filename} - Already correct`);
      return;
    }
    
    // Update featured image path
    if (typeof frontmatter.featuredImage === 'string') {
      frontmatter.featuredImage = correctPath;
    } else {
      frontmatter.featuredImage.src = correctPath;
    }
    
    // Write updated file
    const newContent = matter.stringify(content, frontmatter);
    fs.writeFileSync(filePath, newContent, 'utf-8');
    
    report.fixed++;
    console.log(`✓ Fixed: ${filename}`);
    console.log(`  Old: ${currentPath}`);
    console.log(`  New: ${correctPath}`);
    
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
function fixFeaturedImages() {
  console.log('Fixing featured image paths...\n');
  
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Error: Content directory not found at ${CONTENT_DIR}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(CONTENT_DIR);
  const markdownFiles = files.filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  
  markdownFiles.forEach(fixPost);
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('Fix Summary');
  console.log('='.repeat(60));
  console.log(`Total posts: ${report.totalPosts}`);
  console.log(`Fixed: ${report.fixed}`);
  console.log(`Already correct: ${report.alreadyCorrect}`);
  console.log(`No featured image: ${report.noFeaturedImage}`);
  console.log(`Errors: ${report.errors.length}`);
  
  if (report.errors.length > 0) {
    console.log('\nErrors:');
    report.errors.forEach(({ file, error }) => {
      console.log(`  - ${file}: ${error}`);
    });
  }
  
  console.log('\n✓ Featured image paths fixed!');
}

// Run
if (require.main === module) {
  fixFeaturedImages();
}

module.exports = { fixFeaturedImages };
