#!/usr/bin/env node

/**
 * Add Alt Text to Images
 * Adds generic alt text to images that are missing it
 * 
 * Usage: node scripts/add-alt-text.js
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '..', 'content/blogs');

const report = {
  totalPosts: 0,
  postsUpdated: 0,
  imagesFixed: 0,
  errors: [],
};

/**
 * Generate alt text from filename
 */
function generateAltText(imagePath, postTitle) {
  const filename = path.basename(imagePath, path.extname(imagePath));
  
  // Clean up filename
  const cleaned = filename
    .replace(/^(featured|img-\d+)$/, '')
    .replace(/[-_]/g, ' ')
    .trim();
  
  if (cleaned) {
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  
  // Fallback to post title
  return `Image from ${postTitle}`;
}

/**
 * Add alt text to images in a post
 */
function addAltText(filename) {
  const filePath = path.join(CONTENT_DIR, filename);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    
    report.totalPosts++;
    
    let updatedContent = content;
    let imagesFixed = 0;
    
    // Find images without alt text
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    const replacements = [];
    
    while ((match = imageRegex.exec(content)) !== null) {
      const alt = match[1];
      const imagePath = match[2];
      const fullMatch = match[0];
      
      // If alt text is empty or just whitespace
      if (!alt || alt.trim() === '') {
        const newAlt = generateAltText(imagePath, frontmatter.title || 'blog post');
        const newImageTag = `![${newAlt}](${imagePath})`;
        
        replacements.push({
          old: fullMatch,
          new: newImageTag,
        });
        
        imagesFixed++;
      }
    }
    
    // Apply replacements
    replacements.forEach(({ old, new: newTag }) => {
      updatedContent = updatedContent.replace(old, newTag);
    });
    
    if (imagesFixed > 0) {
      // Write updated file
      const newContent = matter.stringify(updatedContent, frontmatter);
      fs.writeFileSync(filePath, newContent, 'utf-8');
      
      report.postsUpdated++;
      report.imagesFixed += imagesFixed;
      console.log(`✓ Fixed ${imagesFixed} images in: ${filename}`);
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
function addAltTextToAll() {
  console.log('Adding alt text to images...\n');
  
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Error: Content directory not found at ${CONTENT_DIR}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(CONTENT_DIR);
  const markdownFiles = files.filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  
  markdownFiles.forEach(addAltText);
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('Alt Text Summary');
  console.log('='.repeat(60));
  console.log(`Total posts: ${report.totalPosts}`);
  console.log(`Posts updated: ${report.postsUpdated}`);
  console.log(`Images fixed: ${report.imagesFixed}`);
  console.log(`Errors: ${report.errors.length}`);
  
  if (report.errors.length > 0) {
    console.log('\nErrors:');
    report.errors.forEach(({ file, error }) => {
      console.log(`  - ${file}: ${error}`);
    });
  }
  
  console.log('\n✓ Alt text added!');
}

// Run
if (require.main === module) {
  addAltTextToAll();
}

module.exports = { addAltTextToAll };
