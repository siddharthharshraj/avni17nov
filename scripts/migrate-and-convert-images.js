#!/usr/bin/env node

/**
 * Image Migration and WebP Conversion Script
 * Migrates blog images and converts them to WebP format
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Paths
const OLD_IMG_DIR = '/Users/samanvay/Documents/avni-website/static/img';
const NEW_IMG_DIR = path.join(process.cwd(), 'public/images/blogs');

// Configuration
const CONFIG = {
  quality: 85,
  effort: 6,
  extensions: ['.png', '.jpg', '.jpeg'],
};

// Statistics
const stats = {
  total: 0,
  converted: 0,
  copied: 0,
  skipped: 0,
  errors: 0,
  originalSize: 0,
  webpSize: 0,
};

/**
 * Convert image to WebP
 */
async function convertToWebP(inputPath, outputPath) {
  try {
    const originalSize = fs.statSync(inputPath).size;
    stats.originalSize += originalSize;
    
    await sharp(inputPath)
      .webp({
        quality: CONFIG.quality,
        effort: CONFIG.effort,
      })
      .toFile(outputPath);
    
    const webpSize = fs.statSync(outputPath).size;
    stats.webpSize += webpSize;
    
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);
    const originalKB = (originalSize / 1024).toFixed(1);
    const webpKB = (webpSize / 1024).toFixed(1);
    
    console.log(`  ✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`     ${originalKB} KB → ${webpKB} KB (${savings}% smaller)`);
    
    stats.converted++;
  } catch (error) {
    console.error(`  ❌ Error converting ${inputPath}:`, error.message);
    stats.errors++;
  }
}

/**
 * Copy WebP files directly
 */
function copyWebP(inputPath, outputPath) {
  try {
    fs.copyFileSync(inputPath, outputPath);
    const size = fs.statSync(outputPath).size;
    const sizeKB = (size / 1024).toFixed(1);
    console.log(`  📋 Copied: ${path.basename(inputPath)} (${sizeKB} KB)`);
    stats.copied++;
  } catch (error) {
    console.error(`  ❌ Error copying ${inputPath}:`, error.message);
    stats.errors++;
  }
}

/**
 * Process a directory recursively
 */
async function processDirectory(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) {
    return;
  }
  
  const items = fs.readdirSync(sourceDir);
  
  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      // Create target directory
      const newTargetDir = path.join(targetDir, item);
      if (!fs.existsSync(newTargetDir)) {
        fs.mkdirSync(newTargetDir, { recursive: true });
      }
      
      console.log(`\n📁 Processing folder: ${item}`);
      await processDirectory(sourcePath, newTargetDir);
    } else {
      const ext = path.extname(item).toLowerCase();
      
      if (ext === '.webp') {
        // Copy WebP files directly
        const targetPath = path.join(targetDir, item);
        copyWebP(sourcePath, targetPath);
        stats.total++;
      } else if (CONFIG.extensions.includes(ext)) {
        // Convert to WebP
        const baseName = path.basename(item, ext);
        const targetPath = path.join(targetDir, `${baseName}.webp`);
        
        // Skip if WebP already exists and is newer
        if (fs.existsSync(targetPath)) {
          const sourceTime = fs.statSync(sourcePath).mtime;
          const targetTime = fs.statSync(targetPath).mtime;
          
          if (targetTime > sourceTime) {
            console.log(`  ⏭️  Skipped (already exists): ${item}`);
            stats.skipped++;
            stats.total++;
            continue;
          }
        }
        
        await convertToWebP(sourcePath, targetPath);
        stats.total++;
      }
    }
  }
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Main process
 */
async function main() {
  console.log('🖼️  Blog Image Migration & WebP Conversion');
  console.log('==========================================\n');
  
  // Ensure target directory exists
  if (!fs.existsSync(NEW_IMG_DIR)) {
    fs.mkdirSync(NEW_IMG_DIR, { recursive: true });
  }
  
  // Check if source directory exists
  if (!fs.existsSync(OLD_IMG_DIR)) {
    console.error(`❌ Source directory not found: ${OLD_IMG_DIR}`);
    process.exit(1);
  }
  
  console.log(`Source: ${OLD_IMG_DIR}`);
  console.log(`Target: ${NEW_IMG_DIR}\n`);
  console.log(`Quality: ${CONFIG.quality}`);
  console.log(`Extensions: ${CONFIG.extensions.join(', ')}\n`);
  
  // Process all images
  await processDirectory(OLD_IMG_DIR, NEW_IMG_DIR);
  
  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Migration & Conversion Summary');
  console.log('='.repeat(50));
  console.log(`Total images processed: ${stats.total}`);
  console.log(`Converted to WebP:      ${stats.converted}`);
  console.log(`Copied (already WebP):  ${stats.copied}`);
  console.log(`Skipped (up to date):   ${stats.skipped}`);
  console.log(`Errors:                 ${stats.errors}`);
  console.log('');
  console.log(`Original total size:    ${formatBytes(stats.originalSize)}`);
  console.log(`WebP total size:        ${formatBytes(stats.webpSize)}`);
  
  if (stats.originalSize > 0) {
    const totalSavings = ((1 - stats.webpSize / stats.originalSize) * 100).toFixed(1);
    const savedBytes = stats.originalSize - stats.webpSize;
    console.log(`Total savings:          ${formatBytes(savedBytes)} (${totalSavings}%)`);
  }
  
  console.log('\n✅ Migration and conversion complete!\n');
}

// Run
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
