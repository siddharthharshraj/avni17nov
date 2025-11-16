#!/usr/bin/env node

/**
 * Find Blogs Without Images
 * Scans all blog posts and lists those without featured images
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

function checkBlogImages() {
  log('\n🔍 Scanning all blogs for images...\n', 'blue');
  
  const files = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.md'));
  
  const blogsWithoutImages = [];
  const blogsWithImages = [];
  const blogsWithBrokenImages = [];
  
  files.forEach(file => {
    const filePath = path.join(BLOGS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter } = matter(content);
    
    const slug = file.replace('.md', '');
    const title = frontmatter.title || slug;
    
    // Check for image or featuredImage field
    const imageField = frontmatter.image || frontmatter.featuredImage;
    
    if (!imageField) {
      blogsWithoutImages.push({
        file,
        slug,
        title,
        category: frontmatter.category || 'Uncategorized',
        date: frontmatter.date || 'No date',
      });
      log(`❌ ${file}`, 'red');
      log(`   Title: ${title}`, 'red');
      log(`   Category: ${frontmatter.category || 'None'}`, 'yellow');
      log('', 'reset');
    } else {
      // Check if image file exists
      const imagePath = typeof imageField === 'string' ? imageField : imageField.src;
      
      if (imagePath && !imagePath.includes('default-blog')) {
        const fullImagePath = path.join(IMAGES_DIR, imagePath);
        
        if (!fs.existsSync(fullImagePath)) {
          blogsWithBrokenImages.push({
            file,
            slug,
            title,
            imagePath,
            category: frontmatter.category || 'Uncategorized',
          });
          log(`⚠️  ${file}`, 'yellow');
          log(`   Title: ${title}`, 'yellow');
          log(`   Broken image: ${imagePath}`, 'red');
          log('', 'reset');
        } else {
          blogsWithImages.push({
            file,
            slug,
            title,
            imagePath,
          });
        }
      }
    }
  });
  
  // Summary
  log('\n' + '='.repeat(80), 'blue');
  log('📊 SUMMARY', 'blue');
  log('='.repeat(80), 'blue');
  log(`\nTotal blogs scanned: ${files.length}`, 'cyan');
  log(`Blogs with valid images: ${blogsWithImages.length}`, 'green');
  log(`Blogs without images: ${blogsWithoutImages.length}`, blogsWithoutImages.length > 0 ? 'red' : 'green');
  log(`Blogs with broken images: ${blogsWithBrokenImages.length}`, blogsWithBrokenImages.length > 0 ? 'yellow' : 'green');
  
  // Generate markdown report
  generateMarkdownReport(blogsWithoutImages, blogsWithBrokenImages, files.length, blogsWithImages.length);
  
  log('\n✅ Report generated: BLOGS_WITHOUT_IMAGES.md\n', 'green');
}

function generateMarkdownReport(blogsWithoutImages, blogsWithBrokenImages, total, withImages) {
  const reportPath = path.join(__dirname, '../BLOGS_WITHOUT_IMAGES.md');
  
  let report = `# 🖼️ Blogs Without Images Report

**Generated:** ${new Date().toLocaleString()}  
**Total Blogs:** ${total}  
**Blogs with Images:** ${withImages}  
**Blogs without Images:** ${blogsWithoutImages.length}  
**Blogs with Broken Images:** ${blogsWithBrokenImages.length}

---

## 📋 Blogs Without Images (${blogsWithoutImages.length})

These blogs need featured images added to their frontmatter:

| # | File | Title | Category | Date |
|---|------|-------|----------|------|
`;

  blogsWithoutImages.forEach((blog, index) => {
    report += `| ${index + 1} | \`${blog.file}\` | ${blog.title} | ${blog.category} | ${blog.date} |\n`;
  });
  
  if (blogsWithBrokenImages.length > 0) {
    report += `\n---\n\n## ⚠️ Blogs with Broken Images (${blogsWithBrokenImages.length})\n\n`;
    report += `These blogs reference images that don't exist:\n\n`;
    report += `| # | File | Title | Broken Image Path | Category |\n`;
    report += `|---|------|-------|-------------------|----------|\n`;
    
    blogsWithBrokenImages.forEach((blog, index) => {
      report += `| ${index + 1} | \`${blog.file}\` | ${blog.title} | \`${blog.imagePath}\` | ${blog.category} |\n`;
    });
  }
  
  report += `\n---\n\n## 🔧 Action Items\n\n`;
  
  if (blogsWithoutImages.length > 0) {
    report += `### For Blogs Without Images:\n\n`;
    report += `1. **Option 1:** Add a featured image to each blog\n`;
    report += `   - Create/find appropriate image\n`;
    report += `   - Save to \`/public/blog-images/{slug}/\`\n`;
    report += `   - Add to frontmatter: \`image: /blog-images/{slug}/featured.jpg\`\n\n`;
    report += `2. **Option 2:** Use default SVG placeholder (temporary)\n`;
    report += `   - SVG will automatically show in blog listing\n`;
    report += `   - Located at: \`/public/images/blogs/default-blog-banner.svg\`\n\n`;
  }
  
  if (blogsWithBrokenImages.length > 0) {
    report += `### For Blogs with Broken Images:\n\n`;
    report += `1. Find the missing image files\n`;
    report += `2. Upload them to the correct path\n`;
    report += `3. Or update the frontmatter with correct path\n\n`;
  }
  
  report += `---\n\n## 📝 Frontmatter Example\n\n`;
  report += `\`\`\`yaml\n`;
  report += `---\n`;
  report += `title: "Your Blog Title"\n`;
  report += `date: "2025-11-16"\n`;
  report += `author: "Author Name"\n`;
  report += `authorTitle: "Job Title"\n`;
  report += `excerpt: "Brief description for SEO (150-160 chars)"\n`;
  report += `image: "/blog-images/your-slug/featured.jpg"  # Add this!\n`;
  report += `category: "User Story"  # or Technical Story, Sector, Avni News\n`;
  report += `tags: ["tag1", "tag2"]\n`;
  report += `published: true\n`;
  report += `readTime: "5 min read"\n`;
  report += `---\n`;
  report += `\`\`\`\n\n`;
  
  report += `---\n\n`;
  report += `**Note:** The default SVG placeholder will be used automatically for blogs without images in the listing page. However, it's recommended to add proper images for better engagement and SEO.\n`;
  
  fs.writeFileSync(reportPath, report);
}

// Run the scan
checkBlogImages();
