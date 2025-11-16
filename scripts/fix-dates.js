#!/usr/bin/env node

/**
 * Fix Date Formats
 * Converts dates from JavaScript format to ISO format (YYYY-MM-DD)
 * 
 * Usage: node scripts/fix-dates.js
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '..', 'content/blogs');

const report = {
  totalPosts: 0,
  fixed: 0,
  alreadyCorrect: 0,
  errors: [],
};

/**
 * Convert date to ISO format (YYYY-MM-DD)
 */
function toISODate(dateString) {
  // If already in ISO format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }
  
  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    throw new Error(`Cannot parse date: ${dateString}`);
  }
}

/**
 * Fix date format in a post
 */
function fixPost(filename) {
  const filePath = path.join(CONTENT_DIR, filename);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    
    report.totalPosts++;
    
    if (!frontmatter.date) {
      report.errors.push({
        file: filename,
        error: 'No date field found',
      });
      return;
    }
    
    const currentDate = frontmatter.date;
    
    // Check if already in ISO format
    if (/^\d{4}-\d{2}-\d{2}$/.test(currentDate)) {
      report.alreadyCorrect++;
      return;
    }
    
    // Convert to ISO format
    const isoDate = toISODate(currentDate);
    frontmatter.date = isoDate;
    
    // Write updated file
    const newContent = matter.stringify(content, frontmatter);
    fs.writeFileSync(filePath, newContent, 'utf-8');
    
    report.fixed++;
    console.log(`✓ Fixed: ${filename}`);
    console.log(`  Old: ${currentDate}`);
    console.log(`  New: ${isoDate}`);
    
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
function fixDates() {
  console.log('Fixing date formats...\n');
  
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
  console.log(`Errors: ${report.errors.length}`);
  
  if (report.errors.length > 0) {
    console.log('\nErrors:');
    report.errors.forEach(({ file, error }) => {
      console.log(`  - ${file}: ${error}`);
    });
  }
  
  console.log('\n✓ Date formats fixed!');
}

// Run
if (require.main === module) {
  fixDates();
}

module.exports = { fixDates };
