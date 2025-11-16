#!/usr/bin/env node

/**
 * Find Featured Blogs
 * Lists all blogs with featured: true
 * Shows which one should be featured based on latest date
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

function parseDate(dateString) {
  if (!dateString) return null;
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

function formatDate(dateString) {
  const date = parseDate(dateString);
  if (!date) return 'Invalid Date';
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

function findFeaturedBlogs() {
  log('\n🔍 Scanning for featured blogs...\n', 'blue');
  
  const files = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.md'));
  const featuredBlogs = [];
  
  files.forEach(file => {
    const filePath = path.join(BLOGS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter } = matter(content);
    
    if (frontmatter.featured === true) {
      featuredBlogs.push({
        file,
        title: frontmatter.title || 'Untitled',
        date: frontmatter.date,
        dateObj: parseDate(frontmatter.date),
        author: frontmatter.author || 'Unknown',
        category: frontmatter.category || 'None',
      });
    }
  });
  
  // Sort by date (newest first)
  featuredBlogs.sort((a, b) => {
    if (!a.dateObj) return 1;
    if (!b.dateObj) return -1;
    return b.dateObj - a.dateObj;
  });
  
  // Display results
  if (featuredBlogs.length === 0) {
    log('✅ No blogs are currently marked as featured.', 'green');
    log('\nTo feature a blog, set `featured: true` in the frontmatter.', 'cyan');
  } else if (featuredBlogs.length === 1) {
    log('✅ One blog is marked as featured:', 'green');
    log('='.repeat(100), 'green');
    const blog = featuredBlogs[0];
    log(`\n📌 ${blog.title}`, 'green');
    log(`   File: ${blog.file}`, 'cyan');
    log(`   Date: ${formatDate(blog.date)}`, 'cyan');
    log(`   Author: ${blog.author}`, 'cyan');
    log(`   Category: ${blog.category}`, 'cyan');
  } else {
    log(`⚠️  WARNING: ${featuredBlogs.length} blogs are marked as featured!`, 'yellow');
    log('='.repeat(100), 'yellow');
    log('\nOnly ONE blog should be featured at a time.', 'yellow');
    log('Based on dates, here is the recommended featured blog:\n', 'yellow');
    
    // Show the latest one (should be featured)
    const latest = featuredBlogs[0];
    log('✅ SHOULD BE FEATURED (Latest):', 'green');
    log(`   📌 ${latest.title}`, 'green');
    log(`   File: ${latest.file}`, 'cyan');
    log(`   Date: ${formatDate(latest.date)}`, 'cyan');
    log(`   Author: ${latest.author}`, 'cyan');
    log(`   Category: ${latest.category}`, 'cyan');
    
    // Show others that should be unfeatured
    log('\n❌ SHOULD BE UNFEATURED (Older):', 'red');
    featuredBlogs.slice(1).forEach((blog, index) => {
      log(`\n   ${index + 1}. ${blog.title}`, 'red');
      log(`      File: ${blog.file}`, 'cyan');
      log(`      Date: ${formatDate(blog.date)}`, 'cyan');
      log(`      Author: ${blog.author}`, 'cyan');
    });
    
    log('\n' + '='.repeat(100), 'yellow');
    log('📝 ACTION REQUIRED:', 'yellow');
    log('   1. Keep featured: true for the latest blog', 'yellow');
    log('   2. Change featured: false for all older blogs', 'yellow');
  }
  
  // Summary
  log('\n' + '='.repeat(100), 'blue');
  log('📊 SUMMARY', 'blue');
  log('='.repeat(100), 'blue');
  log(`\nTotal blogs scanned: ${files.length}`, 'cyan');
  log(`Blogs marked as featured: ${featuredBlogs.length}`, featuredBlogs.length > 1 ? 'yellow' : 'green');
  
  if (featuredBlogs.length > 1) {
    log(`\n⚠️  Fix required: Set featured: false for ${featuredBlogs.length - 1} blog(s)`, 'yellow');
  } else if (featuredBlogs.length === 1) {
    log('\n✅ Featured blog configuration is correct!', 'green');
  }
  
  log('');
  
  // Generate report
  generateReport(featuredBlogs, files.length);
}

function generateReport(featuredBlogs, totalBlogs) {
  const reportPath = path.join(__dirname, '../FEATURED_BLOGS_REPORT.md');
  
  let report = `# 📌 Featured Blogs Report

**Generated:** ${new Date().toLocaleString()}  
**Total Blogs:** ${totalBlogs}  
**Featured Blogs:** ${featuredBlogs.length}

---

`;

  if (featuredBlogs.length === 0) {
    report += `## ✅ Status: No Featured Blogs

Currently, no blogs are marked as featured.

### Recommendation:
Choose one recent, high-quality blog to feature by setting \`featured: true\` in its frontmatter.

`;
  } else if (featuredBlogs.length === 1) {
    const blog = featuredBlogs[0];
    report += `## ✅ Status: Correct Configuration

One blog is currently featured:

### Featured Blog:
- **Title:** ${blog.title}
- **File:** \`${blog.file}\`
- **Date:** ${formatDate(blog.date)}
- **Author:** ${blog.author}
- **Category:** ${blog.category}

This is the correct configuration. Only one blog should be featured at a time.

`;
  } else {
    report += `## ⚠️ Status: Multiple Featured Blogs

**WARNING:** ${featuredBlogs.length} blogs are currently marked as featured. Only ONE should be featured.

### Recommended Featured Blog (Latest):

`;
    const latest = featuredBlogs[0];
    report += `- **Title:** ${latest.title}
- **File:** \`${latest.file}\`
- **Date:** ${formatDate(latest.date)}
- **Author:** ${latest.author}
- **Category:** ${latest.category}

**Action:** Keep \`featured: true\` for this blog.

---

### Blogs to Unfeature (Older):

`;
    featuredBlogs.slice(1).forEach((blog, index) => {
      report += `
#### ${index + 1}. ${blog.title}
- **File:** \`${blog.file}\`
- **Date:** ${formatDate(blog.date)}
- **Author:** ${blog.author}
- **Category:** ${blog.category}

**Action:** Change \`featured: false\` in this blog's frontmatter.

`;
    });
    
    report += `---

## 🔧 How to Fix

1. Open each file listed above under "Blogs to Unfeature"
2. Find the frontmatter section (between the \`---\` marks at the top)
3. Change \`featured: true\` to \`featured: false\`
4. Save the file
5. Commit and push your changes

`;
  }
  
  report += `---

## 📝 Featured Blog Best Practices

1. **Only one blog should be featured at a time**
2. **The featured blog should be the latest/most important**
3. **Update the featured blog regularly** (weekly or monthly)
4. **Choose high-quality blogs** with good images and content
5. **Feature blogs that represent Avni well**

---

## 🔄 How to Change the Featured Blog

When you want to feature a new blog:

1. **Unfeature the current blog:**
   - Open the current featured blog file
   - Change \`featured: true\` to \`featured: false\`
   - Save

2. **Feature the new blog:**
   - Open the new blog file
   - Change \`featured: false\` to \`featured: true\`
   - Save

3. **Commit and push:**
   - Use GitHub Desktop to commit and push changes
   - Wait 2-5 minutes for the site to update

---

**Next Steps:**
${featuredBlogs.length > 1 
  ? `1. Fix the multiple featured blogs issue\n2. Re-run this script to verify: \`node scripts/find-featured-blogs.js\``
  : `No action required. Configuration is correct!`
}
`;

  fs.writeFileSync(reportPath, report);
  log(`📄 Detailed report saved: FEATURED_BLOGS_REPORT.md\n`, 'green');
}

// Run the script
findFeaturedBlogs();
