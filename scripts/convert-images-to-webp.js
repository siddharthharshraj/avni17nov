#!/usr/bin/env node

/**
 * Image to WebP Converter
 * Converts all PNG, JPG, JPEG images to WebP format
 * Quality: 80 (optimal balance between size and quality)
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const CONFIG = {
  quality: 80,
  effort: 6, // 0-6, higher = better compression but slower
  directories: ['public'],
  extensions: ['.png', '.jpg', '.jpeg'],
  skipPatterns: [
    'node_modules',
    '.next',
    'out',
    '.git',
  ],
};

// Statistics
const stats = {
  total: 0,
  converted: 0,
  skipped: 0,
  errors: 0,
  originalSize: 0,
  webpSize: 0,
};

/**
 * Check if file should be skipped
 */
function shouldSkip(filePath) {
  return CONFIG.skipPatterns.some(pattern => filePath.includes(pattern));
}

/**
 * Get all image files recursively
 */
function getImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    
    if (shouldSkip(filePath)) {
      return;
    }

    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getImageFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (CONFIG.extensions.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Convert image to WebP
 */
async function convertToWebP(inputPath) {
  try {
    const ext = path.extname(inputPath);
    const outputPath = inputPath.replace(ext, '.webp');

    // Skip if WebP already exists and is newer
    if (fs.existsSync(outputPath)) {
      const inputStat = fs.statSync(inputPath);
      const outputStat = fs.statSync(outputPath);
      
      if (outputStat.mtime > inputStat.mtime) {
        console.log(`⏭️  Skipped (already exists): ${path.basename(inputPath)}`);
        stats.skipped++;
        return;
      }
    }

    // Get original file size
    const originalSize = fs.statSync(inputPath).size;
    stats.originalSize += originalSize;

    // Convert to WebP
    await sharp(inputPath)
      .webp({
        quality: CONFIG.quality,
        effort: CONFIG.effort,
      })
      .toFile(outputPath);

    // Get WebP file size
    const webpSize = fs.statSync(outputPath).size;
    stats.webpSize += webpSize;

    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);
    const originalKB = (originalSize / 1024).toFixed(1);
    const webpKB = (webpSize / 1024).toFixed(1);

    console.log(`✅ Converted: ${path.basename(inputPath)}`);
    console.log(`   ${originalKB} KB → ${webpKB} KB (${savings}% smaller)`);

    stats.converted++;
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
    stats.errors++;
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
 * Main conversion process
 */
async function main() {
  console.log('🖼️  WebP Image Converter');
  console.log('========================\n');
  console.log(`Quality: ${CONFIG.quality}`);
  console.log(`Directories: ${CONFIG.directories.join(', ')}`);
  console.log(`Extensions: ${CONFIG.extensions.join(', ')}\n`);

  // Get all image files
  let allImages = [];
  CONFIG.directories.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (fs.existsSync(dirPath)) {
      const images = getImageFiles(dirPath);
      allImages = allImages.concat(images);
    } else {
      console.warn(`⚠️  Directory not found: ${dir}`);
    }
  });

  stats.total = allImages.length;

  if (stats.total === 0) {
    console.log('No images found to convert.');
    return;
  }

  console.log(`Found ${stats.total} images to process\n`);
  console.log('Converting...\n');

  // Convert all images
  for (const imagePath of allImages) {
    await convertToWebP(imagePath);
  }

  // Print summary
  console.log('\n========================');
  console.log('📊 Conversion Summary');
  console.log('========================\n');
  console.log(`Total images found:    ${stats.total}`);
  console.log(`Successfully converted: ${stats.converted}`);
  console.log(`Skipped (up to date):  ${stats.skipped}`);
  console.log(`Errors:                ${stats.errors}`);
  console.log('');
  console.log(`Original total size:   ${formatBytes(stats.originalSize)}`);
  console.log(`WebP total size:       ${formatBytes(stats.webpSize)}`);
  
  if (stats.originalSize > 0) {
    const totalSavings = ((1 - stats.webpSize / stats.originalSize) * 100).toFixed(1);
    const savedBytes = stats.originalSize - stats.webpSize;
    console.log(`Total savings:         ${formatBytes(savedBytes)} (${totalSavings}%)`);
  }

  console.log('\n✅ Conversion complete!\n');

  // Create conversion report
  const report = {
    timestamp: new Date().toISOString(),
    stats,
    config: CONFIG,
  };

  fs.writeFileSync(
    path.join(process.cwd(), 'webp-conversion-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('📄 Report saved to: webp-conversion-report.json\n');
}

// Run the conversion
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
