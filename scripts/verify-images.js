#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Import solution cards data
const solutionCardsPath = path.join(__dirname, '../data/solution-cards.ts');
const content = fs.readFileSync(solutionCardsPath, 'utf8');

// Extract image paths from the file
const imagePathRegex = /image:\s*['"]([^'"]+)['"]/g;
const matches = [...content.matchAll(imagePathRegex)];

console.log('🔍 Verifying Solution Card Images...\n');

let totalImages = 0;
let foundImages = 0;
let missingImages = [];

matches.forEach((match) => {
  totalImages++;
  const imagePath = match[1];
  const fullPath = path.join(__dirname, '../public', imagePath);
  
  if (fs.existsSync(fullPath)) {
    foundImages++;
    console.log(`✅ ${imagePath}`);
  } else {
    missingImages.push(imagePath);
    console.log(`❌ ${imagePath}`);
  }
});

console.log(`\n📊 Summary:`);
console.log(`Total images: ${totalImages}`);
console.log(`Found: ${foundImages}`);
console.log(`Missing: ${missingImages.length}`);

if (missingImages.length > 0) {
  console.log(`\n⚠️  Missing images:`);
  missingImages.forEach((img) => console.log(`   - ${img}`));
  console.log(`\n💡 These images will use fallback images automatically.`);
  process.exit(1);
} else {
  console.log(`\n✨ All images verified successfully!`);
  process.exit(0);
}
