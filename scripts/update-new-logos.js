#!/usr/bin/env node

/**
 * Update case studies with newly provided logos
 */

const fs = require('fs');
const path = require('path');

const CASE_STUDIES_DIR = '/Users/samanvay/Documents/avninew-v2/content/case-studies';

// Mapping of case studies to their new logos
const updates = [
  {
    file: 'ihmp-strengthening-adolescent-health.md',
    oldLogo: '/logos/avni-logo.png',
    newLogo: '/logos/ihmp.png',
    name: 'IHMP'
  },
  {
    file: 'mahapeconet-use-of-avni-in-covid-relief.md',
    oldLogo: '/logos/avni-logo.png',
    newLogo: '/logos/mahapeconet.png',
    name: 'MahaPECOnet'
  },
  {
    file: 'project-potential-bihar-health-access-digitisation-case-study.md',
    oldLogo: '/logos/avni-logo.png',
    newLogo: '/logos/project-potential.png',
    name: 'Project Potential'
  },
  {
    file: 'empowering-vision-care-chashma-tech4dev.md',
    oldLogo: '/logos/avni-logo.png',
    newLogo: '/logos/tech4dev.png',
    name: 'Tech4Dev'
  }
];

function updateLogo(filePath, oldLogo, newLogo, name) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes(`logo: "${oldLogo}"`)) {
    content = content.replace(`logo: "${oldLogo}"`, `logo: "${newLogo}"`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated ${name}: ${newLogo}`);
    return true;
  }
  
  return false;
}

function main() {
  console.log('========================================');
  console.log('Updating Case Study Logos');
  console.log('========================================\n');
  
  let updatedCount = 0;
  
  updates.forEach(({ file, oldLogo, newLogo, name }) => {
    const filePath = path.join(CASE_STUDIES_DIR, file);
    if (updateLogo(filePath, oldLogo, newLogo, name)) {
      updatedCount++;
    }
  });
  
  console.log('\n========================================');
  console.log(`✅ Updated ${updatedCount} case study logos`);
  console.log('========================================\n');
  
  // List remaining logos that still need files
  console.log('📋 Still using Avni logo (need actual logos):');
  console.log('1. ATECF (Waterbodies Restoration)');
  console.log('2. JNPCT (Malnutrition Project)');
  console.log('3. Dam Monitoring (can keep Avni logo)');
  console.log('\n');
}

main();
