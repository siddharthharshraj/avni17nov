#!/usr/bin/env node

/**
 * Update Blog Categories
 * Automatically adds suggested categories to blog frontmatter
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOGS_DIR = path.join(__dirname, '../content/blogs');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Category detection keywords (same as categorize-blogs.js)
const categoryKeywords = {
  'User Story': [
    'case study', 'implementation', 'success story', 'field visit', 'partner',
    'organization', 'ngo', 'deployed', 'using avni', 'transformed', 'journey',
    'experience', 'adoption', 'real-world', 'testimonial', 'impact'
  ],
  'Technical Story': [
    'technical', 'development', 'code', 'api', 'architecture', 'developer',
    'programming', 'software', 'build', 'engineering', 'integration', 'tutorial',
    'guide', 'how to', 'implementation', 'feature', 'technology', 'platform'
  ],
  'Sector': [
    'health', 'education', 'agriculture', 'nutrition', 'maternal', 'child',
    'tribal', 'rural', 'community', 'public health', 'healthcare', 'medical',
    'school', 'learning', 'farming', 'livelihood', 'sector', 'domain'
  ],
  'Avni News': [
    'announcement', 'release', 'launch', 'update', 'conference', 'event',
    'milestone', 'version', 'new feature', 'roadmap', 'team', 'hiring',
    'partnership', 'award', 'recognition', 'press', 'media', 'cohort'
  ]
};

function analyzeContent(title, content) {
  const text = `${title} ${content}`.toLowerCase();
  const scores = {};
  
  // Calculate scores for each category
  Object.keys(categoryKeywords).forEach(category => {
    scores[category] = 0;
    categoryKeywords[category].forEach(keyword => {
      const regex = new RegExp(keyword, 'gi');
      const matches = text.match(regex);
      if (matches) {
        scores[category] += matches.length;
      }
    });
  });
  
  // Find category with highest score
  const suggestedCategory = Object.keys(scores).reduce((a, b) => 
    scores[a] > scores[b] ? a : b
  );
  
  return suggestedCategory;
}

function updateBlogCategory(file, dryRun = false) {
  const filePath = path.join(BLOGS_DIR, file);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content: markdownContent } = matter(fileContent);
  
  const title = frontmatter.title || file.replace('.md', '');
  const existingCategory = frontmatter.category;
  
  // Skip if already has a category
  if (existingCategory && existingCategory !== 'None') {
    return {
      file,
      title,
      status: 'skipped',
      reason: 'Already has category',
      category: existingCategory
    };
  }
  
  // Analyze and suggest category
  const suggestedCategory = analyzeContent(title, markdownContent);
  
  if (dryRun) {
    return {
      file,
      title,
      status: 'would_update',
      category: suggestedCategory
    };
  }
  
  // Update frontmatter
  frontmatter.category = suggestedCategory;
  
  // Reconstruct the file with updated frontmatter
  const updatedContent = matter.stringify(markdownContent, frontmatter);
  
  // Write back to file
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  
  return {
    file,
    title,
    status: 'updated',
    category: suggestedCategory
  };
}

function updateAllCategories(dryRun = false) {
  log('\n🔄 Updating blog categories...\n', 'blue');
  
  if (dryRun) {
    log('🔍 DRY RUN MODE - No files will be modified\n', 'yellow');
  }
  
  const files = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.md'));
  const results = files.map(file => updateBlogCategory(file, dryRun));
  
  // Group results by status
  const updated = results.filter(r => r.status === 'updated' || r.status === 'would_update');
  const skipped = results.filter(r => r.status === 'skipped');
  
  // Display results
  if (updated.length > 0) {
    log(`${dryRun ? '📋 Would Update' : '✅ Updated'} (${updated.length} blogs):`, 'green');
    log('-'.repeat(100), 'green');
    updated.forEach(result => {
      log(`  ${result.file}`, 'green');
      log(`    Title: ${result.title}`, 'reset');
      log(`    Category: ${result.category}`, 'cyan');
    });
    log('');
  }
  
  if (skipped.length > 0) {
    log(`⏭️  Skipped (${skipped.length} blogs):`, 'yellow');
    log('-'.repeat(100), 'yellow');
    skipped.forEach(result => {
      log(`  ${result.file} - ${result.reason} (${result.category})`, 'yellow');
    });
    log('');
  }
  
  // Summary
  log('='.repeat(100), 'blue');
  log('📊 SUMMARY', 'blue');
  log('='.repeat(100), 'blue');
  log(`\nTotal blogs: ${files.length}`, 'cyan');
  log(`${dryRun ? 'Would update' : 'Updated'}: ${updated.length}`, updated.length > 0 ? 'green' : 'reset');
  log(`Skipped: ${skipped.length}`, 'yellow');
  
  if (!dryRun && updated.length > 0) {
    log('\n✅ Categories successfully updated!', 'green');
    log('📝 Run the categorize-blogs.js script to verify the changes.', 'cyan');
  }
  
  if (dryRun) {
    log('\n💡 To apply these changes, run:', 'yellow');
    log('   node scripts/update-blog-categories.js --apply', 'cyan');
  }
  
  log('');
}

// Parse command line arguments
const args = process.argv.slice(2);
const dryRun = !args.includes('--apply');

// Run the update
updateAllCategories(dryRun);
