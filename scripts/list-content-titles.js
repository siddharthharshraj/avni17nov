#!/usr/bin/env node

/**
 * List All Content Titles
 * 
 * This script lists all case study and blog titles from markdown files.
 * Use this to find exact titles for the featured content configuration.
 * 
 * Usage:
 *   node scripts/list-content-titles.js
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const caseStudiesDir = path.join(process.cwd(), 'content/case-studies');
const blogsDir = path.join(process.cwd(), 'content/blogs');

console.log('\n' + '='.repeat(80));
console.log('📚 CONTENT TITLES REFERENCE');
console.log('='.repeat(80) + '\n');

// Function to read and list titles
function listTitles(directory, label) {
  console.log(`\n${label}`);
  console.log('-'.repeat(80));
  
  if (!fs.existsSync(directory)) {
    console.log(`❌ Directory not found: ${directory}\n`);
    return;
  }

  const files = fs.readdirSync(directory).filter(file => file.endsWith('.md'));
  
  if (files.length === 0) {
    console.log('No markdown files found.\n');
    return;
  }

  files.forEach((file, index) => {
    const filePath = path.join(directory, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    
    console.log(`\n${index + 1}. File: ${file}`);
    console.log(`   Title: "${data.title || 'NO TITLE'}"`);
    console.log(`   Date: ${data.date || 'NO DATE'}`);
    
    if (data.featured) {
      console.log(`   ⭐ Currently marked as featured in markdown (will be ignored)`);
    }
  });
  
  console.log('\n');
}

// List Case Studies
listTitles(caseStudiesDir, '📁 CASE STUDIES');

// List Blogs
listTitles(blogsDir, '📝 BLOGS');

console.log('='.repeat(80));
console.log('💡 USAGE INSTRUCTIONS');
console.log('='.repeat(80));
console.log(`
1. Copy the exact title (including quotes) from above
2. Open: config/featured-content.ts
3. Add the title to the appropriate array:
   
   For Case Studies:
   export const FEATURED_CASE_STUDIES: string[] = [
     "Your Exact Title Here",
   ];
   
   For Blogs:
   export const FEATURED_BLOGS: string[] = [
     "Your Exact Title Here",
   ];

4. Save the file

⚠️  IMPORTANT: Titles are case-sensitive and must match exactly!
`);
console.log('='.repeat(80) + '\n');
