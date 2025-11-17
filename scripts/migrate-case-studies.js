#!/usr/bin/env node

/**
 * Case Study Migration Script
 * Migrates case studies from old Gatsby format to new Next.js format
 */

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = '/Users/samanvay/Downloads/avni-website-master/src/pages/case-studies';
const DEST_DIR = '/Users/samanvay/Documents/avninew-v2/content/case-studies';

// Sector mapping based on content/tags
const SECTOR_MAP = {
  'livelihood': ['livelihood', 'goonj', 'waste', 'employment'],
  'health': ['health', 'medical', 'maternal', 'adolescent', 'covid', 'sickle', 'nutrition', 'pmjay', 'bihar'],
  'education': ['education', 'school', 'classroom', 'student', 'learning'],
  'water-sanitation': ['water', 'sanitation', 'jal jeevan', 'waterbodies', 'dam', 'arghyam'],
  'child-welfare': ['child', 'malnutrition', 'jnpct', 'nutrition'],
  'vision-care': ['vision', 'eyeglasses', 'chashma'],
  'social-security': ['social security', 'covid relief', 'disaster']
};

// Organization logos mapping
const ORG_LOGOS = {
  'goonj': '/logos/Goonj-logo-10June20.png',
  'project-potential': '/logos/project-potential.png',
  'tech4dev': '/logos/tech4dev.png',
  'chashma': '/logos/chashma.png',
  'children-in-need': '/logos/cini.png',
  'arghyam': '/logos/arghyam.png',
  'atecf': '/logos/atecf.png',
  'ihmp': '/logos/ihmp.png',
  'azim-premji': '/logos/apf.png',
  'jss': '/logos/jss.png',
  'calcutta-kids': '/logos/calcutta-kids.png',
  'serp': '/logos/serp.png',
  'mahapeconet': '/logos/mahapeconet.png',
  'jnpct': '/logos/jnpct.png',
  'hasiru-dala': '/logos/hasiru-dala.png'
};

function calculateReadTime(content) {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 250); // Average reading speed
  return `${minutes} min read`;
}

function inferSector(title, description, tags, content) {
  const searchText = `${title} ${description} ${tags.join(' ')} ${content}`.toLowerCase();
  
  for (const [sector, keywords] of Object.entries(SECTOR_MAP)) {
    if (keywords.some(keyword => searchText.includes(keyword))) {
      return sector.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
  }
  
  return 'Social Impact';
}

function inferOrgLogo(title, description, slug) {
  const searchText = `${title} ${description} ${slug}`.toLowerCase();
  
  for (const [org, logo] of Object.entries(ORG_LOGOS)) {
    if (searchText.includes(org)) {
      return logo;
    }
  }
  
  return '/logos/default.png';
}

function createSlug(filename) {
  // Remove date prefix if exists
  let slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  // Remove .md extension
  slug = slug.replace(/\.md$/, '');
  // Convert to lowercase and replace spaces/special chars with hyphens
  slug = slug.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  return slug;
}

function transformContent(content) {
  // Remove HTML div wrappers for images
  content = content.replace(/<div[^>]*>\s*<img\s+src="([^"]+)"[^>]*>\s*<\/div>/gi, 
    (match, src) => {
      const newSrc = src.replace('/img/', '/images/case-studies/');
      return `![Image](${newSrc})`;
    }
  );
  
  // Update remaining image paths
  content = content.replace(/\/img\//g, '/images/case-studies/');
  
  // Clean up any remaining HTML wrappers
  content = content.replace(/<div[^>]*>/gi, '');
  content = content.replace(/<\/div>/gi, '');
  
  return content;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: {}, content };
  
  const frontmatterText = match[1];
  const contentWithoutFrontmatter = content.slice(match[0].length);
  
  const frontmatter = {};
  const lines = frontmatterText.split('\n');
  let currentKey = null;
  let currentArray = [];
  
  lines.forEach(line => {
    if (line.includes(':')) {
      if (currentKey && currentArray.length > 0) {
        frontmatter[currentKey] = currentArray;
        currentArray = [];
      }
      
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      currentKey = key.trim();
      
      if (value) {
        frontmatter[currentKey] = value;
      }
    } else if (line.trim().startsWith('-')) {
      currentArray.push(line.trim().substring(1).trim());
    }
  });
  
  if (currentKey && currentArray.length > 0) {
    frontmatter[currentKey] = currentArray;
  }
  
  return { frontmatter, content: contentWithoutFrontmatter };
}

function transformFrontmatter(oldFrontmatter, slug, content) {
  const title = oldFrontmatter.title || 'Untitled';
  const description = oldFrontmatter.description || '';
  const tags = Array.isArray(oldFrontmatter.tags) ? oldFrontmatter.tags.filter(Boolean) : [];
  
  // Parse date
  let date = '2024-01-01';
  if (oldFrontmatter.date) {
    try {
      const d = new Date(oldFrontmatter.date);
      date = d.toISOString().split('T')[0];
    } catch (e) {
      console.error(`Error parsing date for ${slug}:`, e.message);
    }
  }
  
  const sector = inferSector(title, description, tags, content);
  const logo = inferOrgLogo(title, description, slug);
  const readTime = calculateReadTime(content);
  const featured = oldFrontmatter.featuredpost === true || oldFrontmatter.featuredpost === 'true';
  
  return {
    title,
    slug,
    sector,
    logo,
    description,
    date,
    author: oldFrontmatter.author || 'Avni Team',
    readTime,
    tags: tags.length > 0 ? tags : [sector],
    featured
  };
}

function migrateCaseStudy(filename) {
  const sourcePath = path.join(SOURCE_DIR, filename);
  const content = fs.readFileSync(sourcePath, 'utf8');
  
  const { frontmatter: oldFrontmatter, content: markdownContent } = parseFrontmatter(content);
  const slug = createSlug(filename);
  const transformedContent = transformContent(markdownContent);
  const newFrontmatter = transformFrontmatter(oldFrontmatter, slug, transformedContent);
  
  // Build new markdown file
  const newContent = `---
title: "${newFrontmatter.title}"
slug: "${newFrontmatter.slug}"
sector: "${newFrontmatter.sector}"
logo: "${newFrontmatter.logo}"
description: "${newFrontmatter.description}"
date: "${newFrontmatter.date}"
author: "${newFrontmatter.author}"
readTime: "${newFrontmatter.readTime}"
tags: ${JSON.stringify(newFrontmatter.tags)}
featured: ${newFrontmatter.featured}
---
${transformedContent}`;
  
  const destPath = path.join(DEST_DIR, `${slug}.md`);
  fs.writeFileSync(destPath, newContent, 'utf8');
  
  console.log(`✓ Migrated: ${filename} → ${slug}.md`);
  return { filename, slug, success: true };
}

function main() {
  console.log('========================================');
  console.log('Case Study Migration Starting...');
  console.log('========================================\n');
  
  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }
  
  const files = fs.readdirSync(SOURCE_DIR)
    .filter(f => f.endsWith('.md') && f !== 'index.md');
  
  console.log(`Found ${files.length} case studies to migrate\n`);
  
  const results = [];
  let successCount = 0;
  let errorCount = 0;
  
  files.forEach(filename => {
    try {
      const result = migrateCaseStudy(filename);
      results.push(result);
      successCount++;
    } catch (error) {
      console.error(`✗ Error migrating ${filename}:`, error.message);
      results.push({ filename, success: false, error: error.message });
      errorCount++;
    }
  });
  
  console.log('\n========================================');
  console.log('Migration Summary');
  console.log('========================================');
  console.log(`Total: ${files.length}`);
  console.log(`Success: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log('========================================\n');
  
  if (errorCount > 0) {
    console.log('Failed migrations:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.filename}: ${r.error}`);
    });
  }
  
  console.log('\n✅ Migration complete!');
  console.log(`Files saved to: ${DEST_DIR}\n`);
}

main();
