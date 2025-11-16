#!/usr/bin/env node

/**
 * Fix HTML Tags in Markdown
 * Converts HTML img tags to proper markdown format
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '..', 'content/blogs');

const report = {
  totalPosts: 0,
  postsWithHTML: 0,
  imagesFixed: 0,
  divsRemoved: 0,
  errors: [],
};

/**
 * Convert HTML img tags to markdown
 */
function convertHTMLToMarkdown(content) {
  let updated = content;
  let changes = 0;
  
  // Pattern 1: <div><img src="..."></div>
  const divImgPattern = /<div[^>]*>\s*<img\s+src=["']([^"']+)["'][^>]*>\s*<\/div>/gi;
  updated = updated.replace(divImgPattern, (match, src) => {
    changes++;
    report.divsRemoved++;
    report.imagesFixed++;
    
    // Extract alt text if present
    const altMatch = match.match(/alt=["']([^"']+)["']/i);
    const alt = altMatch ? altMatch[1] : path.basename(src, path.extname(src));
    
    return `![${alt}](${src})`;
  });
  
  // Pattern 2: Standalone <img src="...">
  const imgPattern = /<img\s+src=["']([^"']+)["'][^>]*>/gi;
  updated = updated.replace(imgPattern, (match, src) => {
    changes++;
    report.imagesFixed++;
    
    // Extract alt text if present
    const altMatch = match.match(/alt=["']([^"']+)["']/i);
    const alt = altMatch ? altMatch[1] : path.basename(src, path.extname(src));
    
    return `![${alt}](${src})`;
  });
  
  // Pattern 3: Empty divs with style
  const emptyDivPattern = /<div[^>]*>\s*<\/div>/gi;
  updated = updated.replace(emptyDivPattern, () => {
    changes++;
    report.divsRemoved++;
    return '';
  });
  
  // Pattern 4: Nested divs around images
  const nestedDivPattern = /<div[^>]*>\s*<div[^>]*>\s*<img\s+src=["']([^"']+)["'][^>]*>\s*<\/div>\s*<\/div>/gi;
  updated = updated.replace(nestedDivPattern, (match, src) => {
    changes++;
    report.divsRemoved += 2;
    report.imagesFixed++;
    
    const altMatch = match.match(/alt=["']([^"']+)["']/i);
    const alt = altMatch ? altMatch[1] : path.basename(src, path.extname(src));
    
    return `![${alt}](${src})`;
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
    
    // Check if content has HTML tags
    if (/<img|<div/.test(content)) {
      report.postsWithHTML++;
      
      const { updated, changes } = convertHTMLToMarkdown(content);
      
      if (changes > 0) {
        // Write updated file
        const newContent = matter.stringify(updated, frontmatter);
        fs.writeFileSync(filePath, newContent, 'utf-8');
        
        console.log(`✓ Fixed ${changes} HTML tags in: ${filename}`);
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
function fixHTMLInMarkdown() {
  console.log('🔧 Fixing HTML tags in markdown files...\n');
  
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
  console.log(`Posts with HTML: ${report.postsWithHTML}`);
  console.log(`Images fixed: ${report.imagesFixed}`);
  console.log(`Divs removed: ${report.divsRemoved}`);
  console.log(`Errors: ${report.errors.length}`);
  
  if (report.errors.length > 0) {
    console.log('\nErrors:');
    report.errors.forEach(({ file, error }) => {
      console.log(`  - ${file}: ${error}`);
    });
  }
  
  console.log('\n✓ HTML tags fixed!');
}

// Run
if (require.main === module) {
  fixHTMLInMarkdown();
}

module.exports = { fixHTMLInMarkdown };
