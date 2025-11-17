#!/usr/bin/env node

/**
 * Fix all case study logos
 * - Use existing logos where available
 * - Use Avni logo as fallback
 */

const fs = require('fs');
const path = require('path');

const CASE_STUDIES_DIR = '/Users/samanvay/Documents/avninew-v2/content/case-studies';

// Mapping of incorrect logo paths to correct ones
const logoMapping = {
  '/logos/calcutta-kids.png': '/logos/CK-logo-white-text-transparentbg.png',
  '/logos/arghyam.png': '/logos/ARGHYAM.webp',
  '/logos/tech4dev.png': '/logos/avni-logo.png', // Fallback
  '/logos/ihmp.png': '/logos/avni-logo.png', // Fallback
  '/logos/mahapeconet.png': '/logos/avni-logo.png', // Fallback
  '/logos/project-potential.png': '/logos/avni-logo.png', // Fallback
  '/logos/atecf.png': '/logos/avni-logo.png', // Fallback
  '/logos/jnpct.png': '/logos/avni-logo.png', // Fallback
  '/logos/default.png': '/logos/avni-logo.png', // Fallback
};

function fixLogosInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;
  
  for (const [oldLogo, newLogo] of Object.entries(logoMapping)) {
    if (content.includes(`logo: "${oldLogo}"`)) {
      content = content.replace(`logo: "${oldLogo}"`, `logo: "${newLogo}"`);
      updated = true;
      console.log(`✓ Fixed ${path.basename(filePath)}: ${oldLogo} → ${newLogo}`);
    }
  }
  
  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
  
  return updated;
}

function main() {
  console.log('========================================');
  console.log('Fixing Case Study Logos');
  console.log('========================================\n');
  
  const files = fs.readdirSync(CASE_STUDIES_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(CASE_STUDIES_DIR, f));
  
  let fixedCount = 0;
  
  files.forEach(file => {
    if (fixLogosInFile(file)) {
      fixedCount++;
    }
  });
  
  console.log('\n========================================');
  console.log(`✅ Fixed ${fixedCount} case study logos`);
  console.log('========================================\n');
  
  // List logos that need to be provided
  console.log('📋 Logos using Avni fallback (need actual logos):');
  console.log('1. Tech4Dev');
  console.log('2. IHMP');
  console.log('3. MahaPECOnet');
  console.log('4. Project Potential');
  console.log('5. ATECF');
  console.log('6. JNPCT');
  console.log('7. Dam monitoring (government program)');
  console.log('\n');
}

main();
