#!/usr/bin/env node

/**
 * Fix Default Image Paths
 * Replaces old default-blog.jpg with new default-blog-banner.svg
 */

const fs = require('fs');
const path = require('path');

const BLOGS_DIR = path.join(__dirname, '../content/blogs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function fixDefaultImagePath(file) {
  const filePath = path.join(BLOGS_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if file contains old default path
  if (!content.includes('default-blog.jpg')) {
    return { file, updated: false };
  }
  
  // Replace old path with new SVG path
  const updatedContent = content.replace(
    /\/images\/blogs\/default-blog\.jpg/g,
    '/images/blogs/default-blog-banner.svg'
  );
  
  // Write back to file
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  
  return { file, updated: true };
}

function fixAllDefaultPaths() {
  log('\n🔧 Fixing default image paths...\n', 'blue');
  
  const files = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.md'));
  const results = files.map(fixDefaultImagePath);
  
  const updated = results.filter(r => r.updated);
  const skipped = results.filter(r => !r.updated);
  
  // Display results
  if (updated.length > 0) {
    log(`✅ Updated (${updated.length} blogs):`, 'green');
    log('-'.repeat(80), 'green');
    updated.forEach(result => {
      log(`  ${result.file}`, 'green');
    });
    log('');
  }
  
  // Summary
  log('='.repeat(80), 'blue');
  log('📊 SUMMARY', 'blue');
  log('='.repeat(80), 'blue');
  log(`\nTotal blogs: ${files.length}`, 'cyan');
  log(`Updated: ${updated.length}`, 'green');
  log(`Skipped: ${skipped.length}`, 'yellow');
  log('\n✅ All default image paths have been updated!', 'green');
  log('Old: /images/blogs/default-blog.jpg', 'yellow');
  log('New: /images/blogs/default-blog-banner.svg', 'green');
  log('');
}

// Run the fix
fixAllDefaultPaths();
