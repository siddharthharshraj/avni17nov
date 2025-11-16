#!/usr/bin/env node

/**
 * Fix Broken Image References
 * Copy missing images and update paths in blog posts
 */

const fs = require('fs');
const path = require('path');

const GATSBY_IMG_DIR = '/Users/siddharth/Downloads/avni-website-master/static/img';
const NEXT_IMAGES_DIR = path.join(__dirname, '..', 'public/blog-images');

const brokenImages = [
  {
    src: 'static/img/chw-work-complexity.png',
    dest: 'public/blog-images/chw-work-complexity.png',
  },
  {
    src: 'static/img/screenshot-2019-12-12-at-6.44.01-pm.png',
    dest: 'public/blog-images/screenshot-2019-12-12-at-6.44.01-pm.png',
  },
  {
    src: 'static/img/6-ways-how-Avni-is-helping-JSS-MCH-Phulwari-programs/JSSCP_Growth_Chart.jpg',
    dest: 'public/blog-images/6-ways-Avni-is-helping-JSS-MCH-Phulwari-programs/JSSCP_Growth_Chart.jpg',
  },
  {
    src: 'static/img/6-ways-how-Avni-is-helping-JSS-MCH-Phulwari-programs/JSSCP_HRP_Alert2.png',
    dest: 'public/blog-images/6-ways-Avni-is-helping-JSS-MCH-Phulwari-programs/JSSCP_HRP_Alert2.png',
  },
  {
    src: 'static/img/6-ways-how-Avni-is-helping-JSS-MCH-Phulwari-programs/JSSCP_paper_registers.jpg',
    dest: 'public/blog-images/6-ways-Avni-is-helping-JSS-MCH-Phulwari-programs/JSSCP_paper_registers.jpg',
  },
  {
    src: 'static/img/6-ways-how-Avni-is-helping-JSS-MCH-Phulwari-programs/JSSCP_Reports_Phulwari.png',
    dest: 'public/blog-images/6-ways-Avni-is-helping-JSS-MCH-Phulwari-programs/JSSCP_Reports_Phulwari.png',
  },
  {
    src: 'static/img/6-ways-how-Avni-is-helping-JSS-MCH-Phulwari-programs/JSSCP_Reports_HRP.png',
    dest: 'public/blog-images/6-ways-how-Avni-is-helping-JSS-MCH-Phulwari-programs/JSSCP_Reports_HRP.png',
  },
];

let fixed = 0;

console.log('🔧 Fixing broken image references...\n');

brokenImages.forEach(({ src, dest }) => {
  const sourcePath = path.join('/Users/siddharth/Downloads/avni-website-master', src);
  const destPath = path.join(__dirname, '..', dest);
  
  if (fs.existsSync(sourcePath)) {
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    try {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✓ Copied: ${path.basename(src)}`);
      fixed++;
    } catch (error) {
      console.error(`✗ Error copying ${src}:`, error.message);
    }
  } else {
    console.error(`✗ Source not found: ${src}`);
  }
});

console.log(`\n✓ Fixed ${fixed} broken image references!`);
