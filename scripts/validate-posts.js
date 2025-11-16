#!/usr/bin/env node

/**
 * Blog Post Validator
 * Validates all blog posts for required fields and referenced images
 * 
 * Usage: node scripts/validate-posts.js
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '..', 'content/blogs');
const IMAGES_DIR = path.join(__dirname, '..', 'public/blog-images');

const report = {
  totalPosts: 0,
  validPosts: 0,
  errors: [],
  warnings: [],
};

/**
 * Validate a single post
 */
function validatePost(filename) {
  const filePath = path.join(CONTENT_DIR, filename);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    
    const slug = filename.replace(/\.mdx?$/, '');
    const errors = [];
    const warnings = [];
    
    // Required fields
    if (!frontmatter.title) {
      errors.push(`Missing required field: title`);
    }
    
    if (!frontmatter.date) {
      errors.push(`Missing required field: date`);
    }
    
    // Validate date format
    if (frontmatter.date && !/^\d{4}-\d{2}-\d{2}/.test(frontmatter.date)) {
      warnings.push(`Date should be in ISO format (YYYY-MM-DD): ${frontmatter.date}`);
    }
    
    // Check featured image
    if (frontmatter.featuredImage) {
      const featuredImagePath = typeof frontmatter.featuredImage === 'string'
        ? frontmatter.featuredImage
        : frontmatter.featuredImage.src;
      
      if (featuredImagePath && featuredImagePath.startsWith('/blog-images/')) {
        const imagePath = path.join(__dirname, '..', 'public', featuredImagePath);
        if (!fs.existsSync(imagePath)) {
          errors.push(`Featured image not found: ${featuredImagePath}`);
        }
      }
    } else {
      warnings.push(`No featured image specified`);
    }
    
    // Check for images in content
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = imageRegex.exec(content)) !== null) {
      const alt = match[1];
      const imagePath = match[2];
      
      // Check alt text
      if (!alt || alt.trim() === '') {
        warnings.push(`Image missing alt text: ${imagePath}`);
      }
      
      // Check if image exists
      if (imagePath.startsWith('/blog-images/')) {
        const fullImagePath = path.join(__dirname, '..', 'public', imagePath);
        if (!fs.existsSync(fullImagePath)) {
          errors.push(`Image not found: ${imagePath}`);
        }
      }
    }
    
    // Check for too many images
    const imageCount = (content.match(imageRegex) || []).length;
    if (imageCount > 20) {
      warnings.push(`Post has ${imageCount} images (>20 may impact performance)`);
    }
    if (imageCount > 50) {
      errors.push(`Post has ${imageCount} images (>50 is excessive)`);
    }
    
    // Check description
    if (!frontmatter.description) {
      warnings.push(`No meta description (will use excerpt)`);
    }
    
    // Check tags
    if (!frontmatter.tags || frontmatter.tags.length === 0) {
      warnings.push(`No tags specified`);
    }
    
    // Report results
    if (errors.length > 0) {
      report.errors.push({
        file: filename,
        slug,
        errors,
        warnings,
      });
    } else {
      report.validPosts++;
      if (warnings.length > 0) {
        report.warnings.push({
          file: filename,
          slug,
          warnings,
        });
      }
    }
    
  } catch (error) {
    report.errors.push({
      file: filename,
      errors: [`Failed to parse: ${error.message}`],
    });
  }
}

/**
 * Main validation function
 */
function validate() {
  console.log('Validating blog posts...\n');
  
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Error: Content directory not found at ${CONTENT_DIR}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(CONTENT_DIR);
  const markdownFiles = files.filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  
  report.totalPosts = markdownFiles.length;
  
  markdownFiles.forEach(validatePost);
  
  // Print summary
  console.log('='.repeat(60));
  console.log('Validation Summary');
  console.log('='.repeat(60));
  console.log(`Total posts: ${report.totalPosts}`);
  console.log(`Valid posts: ${report.validPosts}`);
  console.log(`Posts with errors: ${report.errors.length}`);
  console.log(`Posts with warnings: ${report.warnings.length}`);
  
  if (report.errors.length > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('ERRORS');
    console.log('='.repeat(60));
    report.errors.forEach(({ file, slug, errors, warnings }) => {
      console.log(`\n❌ ${file}`);
      errors.forEach(err => console.log(`   ERROR: ${err}`));
      if (warnings) {
        warnings.forEach(warn => console.log(`   WARN:  ${warn}`));
      }
    });
  }
  
  if (report.warnings.length > 0 && report.warnings.length <= 10) {
    console.log('\n' + '='.repeat(60));
    console.log('WARNINGS (showing first 10)');
    console.log('='.repeat(60));
    report.warnings.slice(0, 10).forEach(({ file, warnings }) => {
      console.log(`\n⚠️  ${file}`);
      warnings.forEach(warn => console.log(`   ${warn}`));
    });
    if (report.warnings.length > 10) {
      console.log(`\n... and ${report.warnings.length - 10} more posts with warnings`);
    }
  }
  
  // Write report
  const reportPath = path.join(__dirname, '..', 'validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nFull report saved to: ${reportPath}`);
  
  // Exit with error code if there are errors
  if (report.errors.length > 0) {
    console.log('\n❌ Validation failed!');
    process.exit(1);
  } else {
    console.log('\n✅ Validation passed!');
    process.exit(0);
  }
}

// Run validation
if (require.main === module) {
  validate();
}

module.exports = { validate };
