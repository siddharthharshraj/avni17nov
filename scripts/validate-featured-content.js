#!/usr/bin/env node

/**
 * Featured Content Validator
 * 
 * This script validates that only ONE featured blog and ONE featured case study
 * are configured before build/deployment.
 * 
 * Usage:
 *   node scripts/validate-featured-content.js
 * 
 * Exit codes:
 *   0 - Validation passed
 *   1 - Validation failed
 */

const path = require('path');

// Import the featured content configuration
const configPath = path.join(process.cwd(), 'config/featured-content.ts');
const fs = require('fs');

console.log('\n' + '='.repeat(80));
console.log('🔍 FEATURED CONTENT VALIDATION');
console.log('='.repeat(80) + '\n');

// Read and parse the TypeScript config file
const configContent = fs.readFileSync(configPath, 'utf8');

// Extract FEATURED_CASE_STUDIES array
const caseStudiesMatch = configContent.match(/export const FEATURED_CASE_STUDIES: string\[\] = \[([\s\S]*?)\];/);
const blogsMatch = configContent.match(/export const FEATURED_BLOGS: string\[\] = \[([\s\S]*?)\];/);

if (!caseStudiesMatch || !blogsMatch) {
  console.error('❌ ERROR: Could not parse featured content configuration');
  process.exit(1);
}

// Parse the arrays to count non-comment, non-empty entries
function countFeaturedItems(arrayContent) {
  const lines = arrayContent.split('\n');
  const items = lines
    .map(line => line.trim())
    .filter(line => {
      // Ignore empty lines
      if (!line) return false;
      // Ignore comment lines
      if (line.startsWith('//')) return false;
      // Ignore lines that are just comments
      if (line.startsWith('/*') || line.startsWith('*')) return false;
      // Check if line contains a string (quoted text)
      return line.includes('"') || line.includes("'");
    });
  
  return items;
}

const caseStudyItems = countFeaturedItems(caseStudiesMatch[1]);
const blogItems = countFeaturedItems(blogsMatch[1]);

const caseStudyCount = caseStudyItems.length;
const blogCount = blogItems.length;

console.log('📊 VALIDATION RESULTS:\n');
console.log(`📁 Featured Case Studies: ${caseStudyCount}`);
if (caseStudyCount > 0) {
  caseStudyItems.forEach((item, index) => {
    const title = item.match(/["'](.+?)["']/)?.[1] || item;
    console.log(`   ${index + 1}. ${title}`);
  });
}

console.log(`\n📝 Featured Blogs: ${blogCount}`);
if (blogCount > 0) {
  blogItems.forEach((item, index) => {
    const title = item.match(/["'](.+?)["']/)?.[1] || item;
    console.log(`   ${index + 1}. ${title}`);
  });
}

console.log('\n' + '-'.repeat(80) + '\n');

// Validation logic
let hasErrors = false;
const errors = [];
const warnings = [];

// Check case studies
if (caseStudyCount === 0) {
  warnings.push('⚠️  WARNING: No featured case study configured');
} else if (caseStudyCount === 1) {
  console.log('✅ Case Studies: VALID (exactly 1 featured)');
} else {
  hasErrors = true;
  errors.push(`❌ ERROR: ${caseStudyCount} featured case studies found. Only 1 is allowed.`);
  errors.push('   Please remove extra titles from FEATURED_CASE_STUDIES array.');
}

// Check blogs
if (blogCount === 0) {
  warnings.push('⚠️  WARNING: No featured blog configured');
} else if (blogCount === 1) {
  console.log('✅ Blogs: VALID (exactly 1 featured)');
} else {
  hasErrors = true;
  errors.push(`❌ ERROR: ${blogCount} featured blogs found. Only 1 is allowed.`);
  errors.push('   Please remove extra titles from FEATURED_BLOGS array.');
}

console.log('\n' + '='.repeat(80));

// Display warnings
if (warnings.length > 0) {
  console.log('\n⚠️  WARNINGS:\n');
  warnings.forEach(warning => console.log(warning));
}

// Display errors
if (hasErrors) {
  console.log('\n❌ VALIDATION FAILED\n');
  errors.forEach(error => console.log(error));
  console.log('\n📝 TO FIX:');
  console.log('   1. Open: config/featured-content.ts');
  console.log('   2. Keep only ONE title in each array');
  console.log('   3. Comment out or remove extra titles');
  console.log('   4. Run this script again to validate\n');
  console.log('='.repeat(80) + '\n');
  process.exit(1);
}

// Success
console.log('\n✅ VALIDATION PASSED\n');
console.log('Featured content configuration is valid for deployment.');
console.log('='.repeat(80) + '\n');
process.exit(0);
