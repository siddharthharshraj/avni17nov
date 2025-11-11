#!/usr/bin/env node

/**
 * SEO Audit Script
 * Checks for common SEO issues in the codebase
 * 
 * Usage: node scripts/seo-audit.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Running SEO Audit...\n');

const issues = [];
const warnings = [];
const passed = [];

// Check 1: robots.txt exists
console.log('Checking robots.txt...');
const robotsPath = path.join(__dirname, '../public/robots.txt');
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  if (robotsContent.includes('Sitemap:')) {
    passed.push('✅ robots.txt exists with sitemap reference');
  } else {
    warnings.push('⚠️  robots.txt missing sitemap reference');
  }
} else {
  issues.push('❌ robots.txt not found');
}

// Check 2: Sitemap configuration
console.log('Checking sitemap configuration...');
const sitemapConfigPath = path.join(__dirname, '../next-sitemap.config.js');
if (fs.existsSync(sitemapConfigPath)) {
  passed.push('✅ Sitemap configuration exists');
} else {
  issues.push('❌ next-sitemap.config.js not found');
}

// Check 3: SEO metadata files
console.log('Checking SEO metadata files...');
const seoConfigPath = path.join(__dirname, '../lib/seo/config.ts');
const seoMetadataPath = path.join(__dirname, '../lib/seo/metadata.ts');

if (fs.existsSync(seoConfigPath)) {
  passed.push('✅ SEO config file exists');
} else {
  issues.push('❌ lib/seo/config.ts not found');
}

if (fs.existsSync(seoMetadataPath)) {
  passed.push('✅ SEO metadata utilities exist');
} else {
  issues.push('❌ lib/seo/metadata.ts not found');
}

// Check 4: Structured data components
console.log('Checking structured data components...');
const structuredDataPath = path.join(__dirname, '../components/seo/StructuredData.tsx');
if (fs.existsSync(structuredDataPath)) {
  passed.push('✅ Structured data components exist');
} else {
  issues.push('❌ components/seo/StructuredData.tsx not found');
}

// Check 5: Blog template
console.log('Checking blog template...');
const blogTemplatePath = path.join(__dirname, '../app/blog/[slug]/page.tsx');
if (fs.existsSync(blogTemplatePath)) {
  passed.push('✅ Blog post template exists');
} else {
  warnings.push('⚠️  Blog post template not found (future content)');
}

// Check 6: Case study template
console.log('Checking case study template...');
const caseStudyTemplatePath = path.join(__dirname, '../app/case-studies/[slug]/page.tsx');
if (fs.existsSync(caseStudyTemplatePath)) {
  passed.push('✅ Case study template exists');
} else {
  warnings.push('⚠️  Case study template not found (future content)');
}

// Check 7: Image optimization
console.log('Checking image configuration...');
const nextConfigPath = path.join(__dirname, '../next.config.js');
if (fs.existsSync(nextConfigPath)) {
  const nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
  if (nextConfig.includes('images')) {
    passed.push('✅ Image optimization configured');
  } else {
    warnings.push('⚠️  Image configuration not found in next.config.js');
  }
}

// Check 8: Performance optimizations
console.log('Checking performance optimizations...');
const layoutPath = path.join(__dirname, '../app/layout.tsx');
if (fs.existsSync(layoutPath)) {
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  if (layoutContent.includes('WebVitals')) {
    passed.push('✅ Web Vitals monitoring configured');
  } else {
    warnings.push('⚠️  Web Vitals monitoring not found');
  }
}

// Check 9: Security headers
console.log('Checking security configuration...');
const headersPath = path.join(__dirname, '../public/_headers');
if (fs.existsSync(headersPath)) {
  passed.push('✅ Security headers configured');
} else {
  warnings.push('⚠️  _headers file not found (Netlify)');
}

// Print results
console.log('\n' + '='.repeat(60));
console.log('SEO AUDIT RESULTS');
console.log('='.repeat(60) + '\n');

if (passed.length > 0) {
  console.log('✅ PASSED CHECKS:\n');
  passed.forEach(item => console.log(`  ${item}`));
  console.log('');
}

if (warnings.length > 0) {
  console.log('⚠️  WARNINGS:\n');
  warnings.forEach(item => console.log(`  ${item}`));
  console.log('');
}

if (issues.length > 0) {
  console.log('❌ CRITICAL ISSUES:\n');
  issues.forEach(item => console.log(`  ${item}`));
  console.log('');
}

// Summary
console.log('='.repeat(60));
console.log(`Summary: ${passed.length} passed, ${warnings.length} warnings, ${issues.length} issues`);
console.log('='.repeat(60) + '\n');

// Recommendations
console.log('📋 RECOMMENDATIONS:\n');
console.log('1. Run Google Lighthouse audit after deployment');
console.log('2. Submit sitemap to Google Search Console');
console.log('3. Test structured data with Google Rich Results Test');
console.log('4. Monitor Core Web Vitals in production');
console.log('5. Set up Google Analytics and Search Console');
console.log('6. Create blog and case study content');
console.log('7. Build backlinks from relevant NGO communities');
console.log('8. Regular SEO audits (quarterly)\n');

// Exit code
process.exit(issues.length > 0 ? 1 : 0);
