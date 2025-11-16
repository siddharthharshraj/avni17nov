#!/usr/bin/env node

/**
 * Categorize All Blogs
 * Scans all blog posts and suggests categories based on content analysis
 * Categories: User Story, Technical Story, Sector, Avni News
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

// Category detection keywords
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

function analyzeContent(title, content, existingCategory) {
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
  let suggestedCategory = Object.keys(scores).reduce((a, b) => 
    scores[a] > scores[b] ? a : b
  );
  
  // If existing category exists and has a decent score, keep it
  if (existingCategory && scores[existingCategory] > 0) {
    suggestedCategory = existingCategory;
  }
  
  return {
    suggested: suggestedCategory,
    scores,
    confidence: scores[suggestedCategory] > 3 ? 'high' : scores[suggestedCategory] > 1 ? 'medium' : 'low'
  };
}

function categorizeBlog(file) {
  const filePath = path.join(BLOGS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content: markdownContent } = matter(content);
  
  const slug = file.replace('.md', '');
  const title = frontmatter.title || slug;
  const existingCategory = frontmatter.category;
  
  const analysis = analyzeContent(title, markdownContent, existingCategory);
  
  return {
    file,
    slug,
    title,
    existingCategory: existingCategory || 'None',
    suggestedCategory: analysis.suggested,
    confidence: analysis.confidence,
    scores: analysis.scores,
    date: frontmatter.date || 'No date',
    needsUpdate: !existingCategory || existingCategory === 'None'
  };
}

function generateReport() {
  log('\n🔍 Analyzing all blogs for categorization...\n', 'blue');
  
  const files = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.md'));
  const results = files.map(categorizeBlog);
  
  // Group by category
  const byCategory = {
    'User Story': [],
    'Technical Story': [],
    'Sector': [],
    'Avni News': []
  };
  
  results.forEach(result => {
    byCategory[result.suggestedCategory].push(result);
  });
  
  // Display results
  log('='.repeat(100), 'blue');
  log('📊 CATEGORIZATION RESULTS', 'blue');
  log('='.repeat(100), 'blue');
  
  Object.keys(byCategory).forEach(category => {
    const count = byCategory[category].length;
    log(`\n${category}: ${count} blogs`, 'cyan');
    log('-'.repeat(100), 'cyan');
    
    byCategory[category].forEach((blog, index) => {
      const statusIcon = blog.existingCategory === 'None' ? '❌' : 
                        blog.existingCategory === blog.suggestedCategory ? '✅' : '⚠️';
      const confidenceColor = blog.confidence === 'high' ? 'green' : 
                             blog.confidence === 'medium' ? 'yellow' : 'red';
      
      log(`${statusIcon} ${blog.file}`, confidenceColor);
      log(`   Title: ${blog.title}`, 'reset');
      log(`   Current: ${blog.existingCategory} → Suggested: ${blog.suggestedCategory} (${blog.confidence} confidence)`, 'reset');
      
      if (blog.existingCategory !== 'None' && blog.existingCategory !== blog.suggestedCategory) {
        log(`   ⚠️  Category mismatch detected!`, 'yellow');
      }
    });
  });
  
  // Summary
  const needsUpdate = results.filter(r => r.needsUpdate).length;
  const hasCategory = results.filter(r => !r.needsUpdate).length;
  
  log('\n' + '='.repeat(100), 'blue');
  log('📊 SUMMARY', 'blue');
  log('='.repeat(100), 'blue');
  log(`\nTotal blogs: ${files.length}`, 'cyan');
  log(`Already categorized: ${hasCategory}`, 'green');
  log(`Need categorization: ${needsUpdate}`, needsUpdate > 0 ? 'red' : 'green');
  log(`\nBreakdown:`, 'cyan');
  log(`  User Story: ${byCategory['User Story'].length}`, 'green');
  log(`  Technical Story: ${byCategory['Technical Story'].length}`, 'green');
  log(`  Sector: ${byCategory['Sector'].length}`, 'green');
  log(`  Avni News: ${byCategory['Avni News'].length}`, 'green');
  
  // Generate markdown report
  generateMarkdownReport(results, byCategory);
  
  log('\n✅ Report generated: BLOG_CATEGORY_MAPPING.md\n', 'green');
}

function generateMarkdownReport(results, byCategory) {
  const reportPath = path.join(__dirname, '../BLOG_CATEGORY_MAPPING.md');
  
  let report = `# 📂 Blog Category Mapping

**Generated:** ${new Date().toLocaleString()}  
**Total Blogs:** ${results.length}  
**Already Categorized:** ${results.filter(r => !r.needsUpdate).length}  
**Need Categorization:** ${results.filter(r => r.needsUpdate).length}

---

## 📋 Category Definitions

### **User Story**
Real-world implementation stories, case studies, field visits, partner experiences, success stories, and organizational journeys using Avni.

**Keywords:** case study, implementation, field visit, partner, NGO, success story, transformed, adoption, impact

---

### **Technical Story**
Technical deep-dives, tutorials, development guides, architecture discussions, API documentation, and developer perspectives.

**Keywords:** technical, development, code, API, architecture, developer, tutorial, guide, feature, integration

---

### **Sector**
Sector-specific content focusing on health, education, agriculture, nutrition, or other domain areas where Avni is used.

**Keywords:** health, education, agriculture, nutrition, maternal, child, tribal, community, healthcare, sector

---

### **Avni News**
Company updates, announcements, releases, conferences, events, milestones, team news, and partnerships.

**Keywords:** announcement, release, launch, update, conference, event, milestone, version, team, partnership

---

## 📊 Categorization Results

`;

  // Add each category section
  Object.keys(byCategory).forEach(category => {
    report += `\n### ${category} (${byCategory[category].length} blogs)\n\n`;
    report += `| # | File | Title | Current | Confidence | Date |\n`;
    report += `|---|------|-------|---------|------------|------|\n`;
    
    byCategory[category].forEach((blog, index) => {
      const status = blog.existingCategory === 'None' ? '❌ None' : 
                    blog.existingCategory === blog.suggestedCategory ? '✅ Correct' : 
                    `⚠️ ${blog.existingCategory}`;
      const confidenceEmoji = blog.confidence === 'high' ? '🟢' : 
                             blog.confidence === 'medium' ? '🟡' : '🔴';
      
      report += `| ${index + 1} | \`${blog.file}\` | ${blog.title} | ${status} | ${confidenceEmoji} ${blog.confidence} | ${blog.date} |\n`;
    });
  });
  
  // Add blogs needing updates
  const needsUpdate = results.filter(r => r.needsUpdate);
  if (needsUpdate.length > 0) {
    report += `\n---\n\n## ⚠️ Blogs Needing Category Assignment (${needsUpdate.length})\n\n`;
    report += `These blogs don't have a category assigned:\n\n`;
    report += `| # | File | Title | Suggested Category | Confidence |\n`;
    report += `|---|------|-------|-------------------|------------|\n`;
    
    needsUpdate.forEach((blog, index) => {
      const confidenceEmoji = blog.confidence === 'high' ? '🟢' : 
                             blog.confidence === 'medium' ? '🟡' : '🔴';
      report += `| ${index + 1} | \`${blog.file}\` | ${blog.title} | ${blog.suggestedCategory} | ${confidenceEmoji} ${blog.confidence} |\n`;
    });
  }
  
  // Add action items
  report += `\n---\n\n## 🔧 Action Items\n\n`;
  
  if (needsUpdate.length > 0) {
    report += `### Blogs Without Categories (${needsUpdate.length})\n\n`;
    report += `Run the update script to automatically add suggested categories:\n\n`;
    report += `\`\`\`bash\nnode scripts/update-blog-categories.js\n\`\`\`\n\n`;
  }
  
  report += `### Manual Review Recommended\n\n`;
  report += `Review blogs with:\n`;
  report += `- 🔴 Low confidence scores\n`;
  report += `- ⚠️ Category mismatches\n`;
  report += `- Ambiguous content\n\n`;
  
  report += `---\n\n## 📝 How to Add Category Manually\n\n`;
  report += `Edit the blog's frontmatter:\n\n`;
  report += `\`\`\`yaml\n`;
  report += `---\n`;
  report += `title: "Your Blog Title"\n`;
  report += `category: "User Story"  # Add this line\n`;
  report += `# ... other fields\n`;
  report += `---\n`;
  report += `\`\`\`\n\n`;
  
  report += `**Valid Categories:**\n`;
  report += `- \`User Story\`\n`;
  report += `- \`Technical Story\`\n`;
  report += `- \`Sector\`\n`;
  report += `- \`Avni News\`\n\n`;
  
  report += `---\n\n`;
  report += `**Note:** This categorization is AI-assisted based on content analysis. Please review suggestions, especially those with low confidence scores.\n`;
  
  fs.writeFileSync(reportPath, report);
}

// Run the categorization
generateReport();
