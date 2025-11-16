#!/usr/bin/env node

/**
 * Verify and Fix Blog Images
 * Comprehensive check and re-migration of all blog images
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const GATSBY_BLOG_DIR = '/Users/siddharth/Downloads/avni-website-master/src/pages/blog';
const GATSBY_IMG_DIR = '/Users/siddharth/Downloads/avni-website-master/static/img';
const NEXT_CONTENT_DIR = path.join(__dirname, '..', 'content/blogs');
const NEXT_IMAGES_DIR = path.join(__dirname, '..', 'public/blog-images');

const report = {
  totalGatsbyPosts: 0,
  totalNextPosts: 0,
  totalGatsbyImages: 0,
  totalNextImages: 0,
  missingImages: [],
  brokenReferences: [],
  fixedImages: 0,
  errors: [],
};

/**
 * Get all image references from a markdown file
 */
function getImageReferences(content) {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const images = [];
  let match;
  
  while ((match = imageRegex.exec(content)) !== null) {
    images.push({
      alt: match[1],
      src: match[2],
      fullMatch: match[0],
    });
  }
  
  return images;
}

/**
 * Check if image exists in Next.js project
 */
function imageExists(imagePath) {
  const fullPath = path.join(__dirname, '..', 'public', imagePath);
  return fs.existsSync(fullPath);
}

/**
 * Find image in Gatsby static/img directory
 */
function findGatsbyImage(imageName) {
  const searchPaths = [
    path.join(GATSBY_IMG_DIR, imageName),
    path.join(GATSBY_IMG_DIR, imageName.toLowerCase()),
    path.join(GATSBY_IMG_DIR, imageName.toUpperCase()),
  ];
  
  // Also search in subdirectories
  const walkSync = (dir, fileList = []) => {
    if (!fs.existsSync(dir)) return fileList;
    
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        fileList = walkSync(filePath, fileList);
      } else {
        fileList.push(filePath);
      }
    });
    return fileList;
  };
  
  const allImages = walkSync(GATSBY_IMG_DIR);
  const found = allImages.find(img => {
    const basename = path.basename(img);
    return basename === imageName || 
           basename.toLowerCase() === imageName.toLowerCase();
  });
  
  return found || searchPaths.find(p => fs.existsSync(p));
}

/**
 * Copy missing image to Next.js project
 */
function copyImage(sourcePath, destPath) {
  try {
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(sourcePath, destPath);
    return true;
  } catch (error) {
    console.error(`Error copying ${sourcePath}:`, error.message);
    return false;
  }
}

/**
 * Process a single blog post
 */
function processPost(filename) {
  const nextFilePath = path.join(NEXT_CONTENT_DIR, filename);
  
  if (!fs.existsSync(nextFilePath)) {
    return;
  }
  
  try {
    const fileContent = fs.readFileSync(nextFilePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    
    // Check featured image
    if (frontmatter.featuredImage) {
      const featuredSrc = typeof frontmatter.featuredImage === 'string'
        ? frontmatter.featuredImage
        : frontmatter.featuredImage.src;
      
      if (featuredSrc && !imageExists(featuredSrc)) {
        const imageName = path.basename(featuredSrc);
        const gatsbySource = findGatsbyImage(imageName);
        
        if (gatsbySource) {
          const destPath = path.join(__dirname, '..', 'public', featuredSrc);
          if (copyImage(gatsbySource, destPath)) {
            report.fixedImages++;
            console.log(`✓ Fixed featured image: ${imageName}`);
          }
        } else {
          report.missingImages.push({
            post: filename,
            image: featuredSrc,
            type: 'featured',
          });
        }
      }
    }
    
    // Check content images
    const images = getImageReferences(content);
    images.forEach(img => {
      if (!img.src.startsWith('http') && !imageExists(img.src)) {
        const imageName = path.basename(img.src);
        const gatsbySource = findGatsbyImage(imageName);
        
        if (gatsbySource) {
          const destPath = path.join(__dirname, '..', 'public', img.src);
          if (copyImage(gatsbySource, destPath)) {
            report.fixedImages++;
            console.log(`✓ Fixed content image: ${imageName}`);
          }
        } else {
          report.brokenReferences.push({
            post: filename,
            image: img.src,
            alt: img.alt,
          });
        }
      }
    });
    
  } catch (error) {
    report.errors.push({
      file: filename,
      error: error.message,
    });
  }
}

/**
 * Main function
 */
function verifyAndFixImages() {
  console.log('🔍 Verifying and fixing blog images...\n');
  
  // Count source files
  if (fs.existsSync(GATSBY_BLOG_DIR)) {
    report.totalGatsbyPosts = fs.readdirSync(GATSBY_BLOG_DIR)
      .filter(f => f.endsWith('.md')).length;
  }
  
  if (fs.existsSync(NEXT_CONTENT_DIR)) {
    report.totalNextPosts = fs.readdirSync(NEXT_CONTENT_DIR)
      .filter(f => f.endsWith('.md')).length;
  }
  
  // Count images
  const countImages = (dir) => {
    if (!fs.existsSync(dir)) return 0;
    const walkSync = (d, count = 0) => {
      const files = fs.readdirSync(d);
      files.forEach(file => {
        const filePath = path.join(d, file);
        if (fs.statSync(filePath).isDirectory()) {
          count = walkSync(filePath, count);
        } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
          count++;
        }
      });
      return count;
    };
    return walkSync(dir);
  };
  
  report.totalGatsbyImages = countImages(GATSBY_IMG_DIR);
  report.totalNextImages = countImages(NEXT_IMAGES_DIR);
  
  console.log(`Gatsby posts: ${report.totalGatsbyPosts}`);
  console.log(`Next.js posts: ${report.totalNextPosts}`);
  console.log(`Gatsby images: ${report.totalGatsbyImages}`);
  console.log(`Next.js images: ${report.totalNextImages}`);
  console.log(`Missing: ${report.totalGatsbyImages - report.totalNextImages} images\n`);
  
  // Process all posts
  const files = fs.readdirSync(NEXT_CONTENT_DIR)
    .filter(f => f.endsWith('.md'));
  
  files.forEach(processPost);
  
  // Print report
  console.log('\n' + '='.repeat(60));
  console.log('Verification Report');
  console.log('='.repeat(60));
  console.log(`Images fixed: ${report.fixedImages}`);
  console.log(`Missing images: ${report.missingImages.length}`);
  console.log(`Broken references: ${report.brokenReferences.length}`);
  console.log(`Errors: ${report.errors.length}`);
  
  if (report.missingImages.length > 0) {
    console.log('\n❌ Missing Featured Images:');
    report.missingImages.forEach(({ post, image }) => {
      console.log(`  - ${post}: ${image}`);
    });
  }
  
  if (report.brokenReferences.length > 0) {
    console.log('\n❌ Broken Image References:');
    const grouped = {};
    report.brokenReferences.forEach(({ post, image }) => {
      if (!grouped[post]) grouped[post] = [];
      grouped[post].push(image);
    });
    Object.entries(grouped).forEach(([post, images]) => {
      console.log(`  - ${post}: ${images.length} broken images`);
      images.forEach(img => console.log(`    • ${img}`));
    });
  }
  
  if (report.errors.length > 0) {
    console.log('\n❌ Errors:');
    report.errors.forEach(({ file, error }) => {
      console.log(`  - ${file}: ${error}`);
    });
  }
  
  // Save report
  fs.writeFileSync(
    path.join(__dirname, '..', 'image-verification-report.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log('\n✓ Report saved to image-verification-report.json');
  console.log(`\n✓ Fixed ${report.fixedImages} images!`);
}

// Run
if (require.main === module) {
  verifyAndFixImages();
}

module.exports = { verifyAndFixImages };
