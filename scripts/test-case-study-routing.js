#!/usr/bin/env node

/**
 * Test case study routing setup
 * Diagnose why 404 errors are occurring
 */

const fs = require('fs');
const path = require('path');

const CASE_STUDIES_DIR = path.join(__dirname, '../content/case-studies');
const SLUG_PAGE = path.join(__dirname, '../app/resources/case-studies/[slug]/page.tsx');

console.log('========================================');
console.log('CASE STUDY ROUTING DIAGNOSTIC');
console.log('========================================\n');

// 1. Check content directory
console.log('1️⃣ CHECKING CONTENT DIRECTORY...');
if (!fs.existsSync(CASE_STUDIES_DIR)) {
  console.error('❌ Case studies directory does not exist:', CASE_STUDIES_DIR);
  process.exit(1);
}

const files = fs.readdirSync(CASE_STUDIES_DIR);
const mdFiles = files.filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
console.log(`✅ Found ${mdFiles.length} case study files`);
console.log(`   Directory: ${CASE_STUDIES_DIR}\n`);

// 2. Check slugs
console.log('2️⃣ CHECKING SLUGS...');
const slugs = mdFiles.map(f => f.replace(/\.(md|mdx)$/, ''));
console.log('   Sample slugs:');
slugs.slice(0, 5).forEach(slug => console.log(`   - ${slug}`));
console.log(`   ...(${slugs.length} total)\n`);

// 3. Check specific case study (Goonj)
console.log('3️⃣ CHECKING GOONJ CASE STUDY...');
const goonjSlug = 'how-goonj-uses-avni';
const goonjFile = path.join(CASE_STUDIES_DIR, `${goonjSlug}.md`);

if (fs.existsSync(goonjFile)) {
  console.log(`✅ File exists: ${goonjSlug}.md`);
  
  const content = fs.readFileSync(goonjFile, 'utf8');
  const slugMatch = content.match(/slug:\s*"([^"]+)"/);
  const titleMatch = content.match(/title:\s*"([^"]+)"/);
  
  if (slugMatch) {
    console.log(`   Frontmatter slug: "${slugMatch[1]}"`);
    if (slugMatch[1] !== goonjSlug) {
      console.warn(`   ⚠️  WARNING: Frontmatter slug doesn't match filename!`);
    }
  }
  if (titleMatch) {
    console.log(`   Title: "${titleMatch[1]}"`);
  }
} else {
  console.error(`❌ File not found: ${goonjFile}`);
}
console.log('');

// 4. Check dynamic route structure
console.log('4️⃣ CHECKING DYNAMIC ROUTE...');
const slugDir = path.join(__dirname, '../app/resources/case-studies/[slug]');
if (!fs.existsSync(slugDir)) {
  console.error('❌ [slug] directory does not exist!');
  process.exit(1);
}

const slugDirFiles = fs.readdirSync(slugDir);
console.log(`✅ [slug] directory exists`);
console.log(`   Files in [slug] directory:`);
slugDirFiles.forEach(file => console.log(`   - ${file}`));

if (!fs.existsSync(SLUG_PAGE)) {
  console.error('❌ page.tsx not found in [slug] directory!');
  process.exit(1);
}
console.log('✅ page.tsx exists in [slug] directory\n');

// 5. Check page.tsx imports
console.log('5️⃣ CHECKING PAGE.TSX IMPORTS...');
const pageContent = fs.readFileSync(SLUG_PAGE, 'utf8');

const requiredImports = [
  'getCaseStudyBySlug',
  'getAllCaseStudySlugs',
  'generateStaticParams'
];

requiredImports.forEach(imp => {
  if (pageContent.includes(imp)) {
    console.log(`✅ ${imp} found`);
  } else {
    console.error(`❌ ${imp} NOT found`);
  }
});
console.log('');

// 6. Check for duplicate/conflicting files
console.log('6️⃣ CHECKING FOR CONFLICTING FILES...');
const parentDir = path.join(__dirname, '../app/resources/case-studies');
const parentFiles = fs.readdirSync(parentDir);
const problematicFiles = parentFiles.filter(f => 
  !f.startsWith('[') && 
  !f.startsWith('.') && 
  f !== 'page.tsx' &&
  f.endsWith('.tsx')
);

if (problematicFiles.length > 0) {
  console.warn('⚠️  WARNING: Found component files in route directory:');
  problematicFiles.forEach(f => console.log(`   - ${f} (should be in components/)`));
} else {
  console.log('✅ No conflicting files found');
}
console.log('');

// 7. Summary
console.log('========================================');
console.log('SUMMARY');
console.log('========================================');
console.log(`Total case studies: ${mdFiles.length}`);
console.log(`Dynamic route: ${slugDir}`);
console.log(`Route handler: ${SLUG_PAGE}`);
console.log('');
console.log('✅ Structure looks correct!');
console.log('');
console.log('If still getting 404 errors:');
console.log('1. Stop the dev server (Ctrl+C)');
console.log('2. Delete .next folder: rm -rf .next');
console.log('3. Restart: npm run dev');
console.log('4. Clear browser cache or use incognito mode');
console.log('========================================\n');
