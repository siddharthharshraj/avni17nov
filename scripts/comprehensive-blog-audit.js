#!/usr/bin/env node

/**
 * Comprehensive Blog Audit
 * Checks all blogs for:
 * - Missing/broken images
 * - Missing alt text
 * - Heading hierarchy issues
 * - Missing meta descriptions
 * - Content length
 * - Broken links
 * - YouTube embeds
 * - SEO issues
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOGS_DIR = path.join(__dirname, '../content/blogs');
const IMAGES_DIR = path.join(__dirname, '../public');

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

function auditBlog(file) {
  const filePath = path.join(BLOGS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content: markdownContent } = matter(content);
  
  const issues = [];
  const warnings = [];
  const slug = file.replace('.md', '');
  const title = frontmatter.title || slug;
  
  // 1. Check frontmatter fields
  if (!frontmatter.title) issues.push('Missing title');
  if (!frontmatter.date) issues.push('Missing date');
  if (!frontmatter.author) warnings.push('Missing author');
  if (!frontmatter.category) issues.push('Missing category');
  if (!frontmatter.description && !frontmatter.excerpt) issues.push('Missing description/excerpt');
  if (!frontmatter.tags || frontmatter.tags.length === 0) warnings.push('Missing tags');
  
  // 2. Check SEO fields
  if (frontmatter.title && frontmatter.title.length > 60) {
    warnings.push(`Title too long (${frontmatter.title.length} chars, should be 50-60)`);
  }
  if (frontmatter.title && frontmatter.title.length < 30) {
    warnings.push(`Title too short (${frontmatter.title.length} chars, should be 50-60)`);
  }
  
  const description = frontmatter.description || frontmatter.excerpt || '';
  if (description.length > 160) {
    warnings.push(`Description too long (${description.length} chars, should be 150-160)`);
  }
  if (description.length < 120 && description.length > 0) {
    warnings.push(`Description too short (${description.length} chars, should be 150-160)`);
  }
  
  // 3. Check featured image
  const imageField = frontmatter.image || frontmatter.featuredImage;
  if (!imageField) {
    warnings.push('No featured image (will use SVG fallback)');
  } else {
    const imagePath = typeof imageField === 'string' ? imageField : imageField.src;
    if (imagePath && !imagePath.includes('default-blog')) {
      const fullImagePath = path.join(IMAGES_DIR, imagePath);
      if (!fs.existsSync(fullImagePath)) {
        issues.push(`Broken featured image: ${imagePath}`);
      }
    }
  }
  
  // 4. Check content length
  const wordCount = markdownContent.split(/\s+/).length;
  if (wordCount < 300) {
    warnings.push(`Content too short (${wordCount} words, should be 300+)`);
  }
  
  // 5. Check heading hierarchy
  const h1Count = (markdownContent.match(/^# /gm) || []).length;
  if (h1Count > 1) {
    issues.push(`Multiple H1 headings (${h1Count} found, should be 1 or 0)`);
  }
  
  // Check for skipped heading levels
  const hasH2 = /^## /gm.test(markdownContent);
  const hasH3 = /^### /gm.test(markdownContent);
  const hasH4 = /^#### /gm.test(markdownContent);
  
  if (hasH4 && !hasH3) {
    warnings.push('Skipped heading level: H4 without H3');
  }
  if (hasH3 && !hasH2) {
    warnings.push('Skipped heading level: H3 without H2');
  }
  
  // 6. Check images in content
  const imageMatches = markdownContent.match(/!\[([^\]]*)\]\(([^)]+)\)/g) || [];
  imageMatches.forEach((match, index) => {
    const altMatch = match.match(/!\[([^\]]*)\]/);
    const srcMatch = match.match(/\]\(([^)]+)\)/);
    
    if (altMatch && (!altMatch[1] || altMatch[1].trim() === '')) {
      warnings.push(`Image ${index + 1} missing alt text`);
    }
    
    if (srcMatch) {
      const imgPath = srcMatch[1];
      if (imgPath.startsWith('/') && !imgPath.startsWith('http')) {
        const fullPath = path.join(IMAGES_DIR, imgPath);
        if (!fs.existsSync(fullPath)) {
          issues.push(`Broken image in content: ${imgPath}`);
        }
      }
    }
  });
  
  // 7. Check for YouTube embeds
  const youtubeEmbeds = markdownContent.match(/youtube\.com|youtu\.be/gi) || [];
  if (youtubeEmbeds.length > 0) {
    warnings.push(`Contains ${youtubeEmbeds.length} YouTube reference(s) - verify embed format`);
  }
  
  // 8. Check for broken markdown links
  const linkMatches = markdownContent.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];
  linkMatches.forEach((match) => {
    const urlMatch = match.match(/\]\(([^)]+)\)/);
    if (urlMatch) {
      const url = urlMatch[1];
      // Check for common broken link patterns
      if (url.includes('undefined') || url.includes('null') || url.trim() === '') {
        issues.push(`Broken link: ${match}`);
      }
    }
  });
  
  // 9. Check for proper paragraph spacing
  const consecutiveNewlines = markdownContent.match(/\n{4,}/g) || [];
  if (consecutiveNewlines.length > 0) {
    warnings.push('Excessive blank lines (more than 2 consecutive)');
  }
  
  // 10. Check for HTML tags that might not render properly
  const htmlTags = markdownContent.match(/<(?!br|a|img|strong|em|code|pre)[^>]+>/gi) || [];
  if (htmlTags.length > 0) {
    warnings.push(`Contains ${htmlTags.length} HTML tag(s) - verify rendering`);
  }
  
  return {
    file,
    slug,
    title,
    category: frontmatter.category || 'None',
    wordCount,
    issues,
    warnings,
    hasIssues: issues.length > 0,
    hasWarnings: warnings.length > 0,
    imageCount: imageMatches.length,
    linkCount: linkMatches.length,
  };
}

function runAudit() {
  log('\n🔍 Running comprehensive blog audit...\n', 'blue');
  
  const files = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.md'));
  const results = files.map(auditBlog);
  
  // Separate blogs with issues and warnings
  const withIssues = results.filter(r => r.hasIssues);
  const withWarnings = results.filter(r => r.hasWarnings && !r.hasIssues);
  const clean = results.filter(r => !r.hasIssues && !r.hasWarnings);
  
  // Display critical issues
  if (withIssues.length > 0) {
    log('🚨 CRITICAL ISSUES (' + withIssues.length + ' blogs)', 'red');
    log('='.repeat(100), 'red');
    withIssues.forEach(result => {
      log(`\n❌ ${result.file}`, 'red');
      log(`   Title: ${result.title}`, 'reset');
      log(`   Category: ${result.category}`, 'cyan');
      result.issues.forEach(issue => {
        log(`   🔴 ${issue}`, 'red');
      });
    });
    log('');
  }
  
  // Display warnings
  if (withWarnings.length > 0) {
    log('\n⚠️  WARNINGS (' + withWarnings.length + ' blogs)', 'yellow');
    log('='.repeat(100), 'yellow');
    withWarnings.forEach(result => {
      log(`\n⚠️  ${result.file}`, 'yellow');
      log(`   Title: ${result.title}`, 'reset');
      result.warnings.forEach(warning => {
        log(`   🟡 ${warning}`, 'yellow');
      });
    });
    log('');
  }
  
  // Summary
  log('\n' + '='.repeat(100), 'blue');
  log('📊 AUDIT SUMMARY', 'blue');
  log('='.repeat(100), 'blue');
  log(`\nTotal blogs audited: ${files.length}`, 'cyan');
  log(`✅ Clean (no issues): ${clean.length}`, 'green');
  log(`⚠️  With warnings: ${withWarnings.length}`, 'yellow');
  log(`❌ With critical issues: ${withIssues.length}`, withIssues.length > 0 ? 'red' : 'green');
  
  // Statistics
  const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0);
  const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0);
  const avgWordCount = Math.round(results.reduce((sum, r) => sum + r.wordCount, 0) / results.length);
  
  log(`\n📈 Statistics:`, 'cyan');
  log(`   Total critical issues: ${totalIssues}`, totalIssues > 0 ? 'red' : 'green');
  log(`   Total warnings: ${totalWarnings}`, totalWarnings > 0 ? 'yellow' : 'green');
  log(`   Average word count: ${avgWordCount}`, 'cyan');
  
  // Generate detailed report
  generateAuditReport(results, withIssues, withWarnings, clean);
  
  log('\n✅ Detailed report generated: BLOG_AUDIT_REPORT.md\n', 'green');
}

function generateAuditReport(results, withIssues, withWarnings, clean) {
  const reportPath = path.join(__dirname, '../BLOG_AUDIT_REPORT.md');
  
  let report = `# 🔍 Comprehensive Blog Audit Report

**Generated:** ${new Date().toLocaleString()}  
**Total Blogs:** ${results.length}  
**Clean Blogs:** ${clean.length}  
**Blogs with Warnings:** ${withWarnings.length}  
**Blogs with Critical Issues:** ${withIssues.length}

---

## 📊 Summary

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ Clean | ${clean.length} | ${Math.round(clean.length / results.length * 100)}% |
| ⚠️ Warnings | ${withWarnings.length} | ${Math.round(withWarnings.length / results.length * 100)}% |
| ❌ Critical Issues | ${withIssues.length} | ${Math.round(withIssues.length / results.length * 100)}% |

---

`;

  // Critical Issues Section
  if (withIssues.length > 0) {
    report += `## 🚨 Critical Issues (${withIssues.length} blogs)\n\n`;
    report += `These blogs have critical issues that need immediate attention:\n\n`;
    
    withIssues.forEach((result, index) => {
      report += `### ${index + 1}. ${result.title}\n\n`;
      report += `**File:** \`${result.file}\`  \n`;
      report += `**Category:** ${result.category}  \n`;
      report += `**Word Count:** ${result.wordCount}  \n\n`;
      report += `**Issues:**\n`;
      result.issues.forEach(issue => {
        report += `- 🔴 ${issue}\n`;
      });
      if (result.warnings.length > 0) {
        report += `\n**Warnings:**\n`;
        result.warnings.forEach(warning => {
          report += `- 🟡 ${warning}\n`;
        });
      }
      report += `\n---\n\n`;
    });
  }
  
  // Warnings Section
  if (withWarnings.length > 0) {
    report += `## ⚠️ Warnings (${withWarnings.length} blogs)\n\n`;
    report += `These blogs have warnings that should be reviewed:\n\n`;
    report += `| # | File | Title | Warnings |\n`;
    report += `|---|------|-------|----------|\n`;
    
    withWarnings.forEach((result, index) => {
      const warningsList = result.warnings.join('; ');
      report += `| ${index + 1} | \`${result.file}\` | ${result.title} | ${warningsList} |\n`;
    });
    report += `\n---\n\n`;
  }
  
  // Clean Blogs Section
  report += `## ✅ Clean Blogs (${clean.length} blogs)\n\n`;
  report += `These blogs passed all checks:\n\n`;
  report += `| # | File | Title | Category | Word Count |\n`;
  report += `|---|------|-------|----------|------------|\n`;
  
  clean.forEach((result, index) => {
    report += `| ${index + 1} | \`${result.file}\` | ${result.title} | ${result.category} | ${result.wordCount} |\n`;
  });
  
  // Action Items
  report += `\n---\n\n## 🔧 Action Items\n\n`;
  
  if (withIssues.length > 0) {
    report += `### Priority 1: Fix Critical Issues\n\n`;
    report += `1. **Missing Required Fields:** Add title, date, category, description\n`;
    report += `2. **Broken Images:** Fix or remove broken image links\n`;
    report += `3. **Heading Issues:** Fix multiple H1s or improper hierarchy\n`;
    report += `4. **Broken Links:** Fix or remove broken links\n\n`;
  }
  
  if (withWarnings.length > 0) {
    report += `### Priority 2: Address Warnings\n\n`;
    report += `1. **SEO Optimization:** Adjust title and description lengths\n`;
    report += `2. **Content Quality:** Add more content to short posts (300+ words)\n`;
    report += `3. **Images:** Add alt text to all images\n`;
    report += `4. **Metadata:** Add missing authors, tags, featured images\n\n`;
  }
  
  report += `### Priority 3: General Improvements\n\n`;
  report += `1. **YouTube Embeds:** Verify all video embeds are working\n`;
  report += `2. **HTML Tags:** Check custom HTML renders correctly\n`;
  report += `3. **Formatting:** Clean up excessive blank lines\n`;
  report += `4. **Internal Linking:** Add links to related posts\n\n`;
  
  // Best Practices
  report += `---\n\n## 📝 Best Practices Checklist\n\n`;
  report += `For each blog post, ensure:\n\n`;
  report += `- [ ] Title: 50-60 characters\n`;
  report += `- [ ] Description: 150-160 characters\n`;
  report += `- [ ] Featured image: 1200x630px\n`;
  report += `- [ ] Category assigned\n`;
  report += `- [ ] 3-5 tags added\n`;
  report += `- [ ] Content: 300+ words\n`;
  report += `- [ ] Only one H1 (or none)\n`;
  report += `- [ ] Proper heading hierarchy\n`;
  report += `- [ ] All images have alt text\n`;
  report += `- [ ] No broken links or images\n`;
  report += `- [ ] Author information complete\n\n`;
  
  report += `---\n\n`;
  report += `**Next Steps:**\n`;
  report += `1. Fix all critical issues immediately\n`;
  report += `2. Address warnings in priority order\n`;
  report += `3. Re-run audit to verify fixes\n`;
  report += `4. Implement ongoing quality checks\n`;
  
  fs.writeFileSync(reportPath, report);
}

// Run the audit
runAudit();
