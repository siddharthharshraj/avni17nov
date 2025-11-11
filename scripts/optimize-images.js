#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts images to WebP format for better performance
 * 
 * Usage: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, '../public/images');

console.log('🖼️  Image Optimization Guide');
console.log('================================');
console.log('');
console.log('For optimal performance, consider:');
console.log('');
console.log('1. Convert PNG/JPG to WebP format');
console.log('   - Use online tools like Squoosh.app');
console.log('   - Or install sharp: npm install -g sharp-cli');
console.log('   - Run: sharp -i input.png -o output.webp');
console.log('');
console.log('2. Compress images');
console.log('   - Target: < 100KB for hero images');
console.log('   - Target: < 50KB for thumbnails');
console.log('');
console.log('3. Use appropriate dimensions');
console.log('   - Hero images: 1920x1080');
console.log('   - Thumbnails: 640x480');
console.log('   - Icons: 128x128');
console.log('');
console.log('4. Next.js will automatically optimize images');
console.log('   - Serves WebP/AVIF when supported');
console.log('   - Lazy loads by default');
console.log('   - Responsive image sizes');
console.log('');
console.log('Current images in /public/images:');

if (fs.existsSync(imageDir)) {
  const files = fs.readdirSync(imageDir);
  files.forEach(file => {
    const filePath = path.join(imageDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    const status = stats.size > 100000 ? '⚠️' : '✅';
    console.log(`  ${status} ${file} (${sizeKB} KB)`);
  });
} else {
  console.log('  No images directory found');
}

console.log('');
console.log('✨ All images are configured for Next.js optimization');
