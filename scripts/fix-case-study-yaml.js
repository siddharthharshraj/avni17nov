#!/usr/bin/env node

/**
 * Fix YAML frontmatter issues in case studies
 * - Fix empty descriptions
 * - Fix ">-" descriptions
 * - Fix double quotes in titles
 */

const fs = require('fs');
const path = require('path');

const CASE_STUDIES_DIR = '/Users/samanvay/Documents/avninew-v2/content/case-studies';

// Description fallbacks extracted from original files
const descriptions = {
  'avni-for-sickle-cell-disease-screening-and-treatment': 'Jan Swasthya Sahyog collaborates with M.P. state government in Annupur district to screen tribal families for sickle cell disease. Using Avni field app, the team manages client data, coordinates efforts, and ensures end-to-end treatment completion.',
  'bridging-the-nutrition-gap-apf-odisha': 'Azim Premji Foundation Odisha implements a data-driven maternal and child health program to address malnutrition, using Avni to track beneficiaries and improve health outcomes across communities.',
  'calcutta-kids-avni-implemented-for-maternal-and-child-health-program': 'Calcutta Kids implements Avni for their maternal and child health program in urban slums, tracking thousands of beneficiaries and improving health outcomes through systematic data collection.',
  'classroom-observation-tool-for-andhra-pradesh': 'Andhra Pradesh Education Department uses Avni as a classroom observation tool to monitor teaching quality, track student learning, and improve educational outcomes across government schools.',
  'dam-and-water-bodies-desilting-work-monitoring': 'Monitoring dam and water bodies desilting work using Avni for efficient tracking of progress, resources, and impact measurement across multiple sites.',
  'ihmp-strengthening-adolescent-health': 'Strengthening adolescent health through community-led digital interventions using Avni to track health parameters, provide timely support, and improve health outcomes for adolescents.',
  'empowering-vision-care-chashma-tech4dev': "Project Chashma by Tech4Dev transforms vision care delivery through Avni platform, enabling systematic screening, tracking, and distribution of eyeglasses to students in need.",
  'empowering-waste-pickers': 'Hasiru Dala empowers waste pickers through technology, using Avni to digitize data collection, track impact, and scale social impact across Karnataka through waste management initiatives.',
  'jal-jeevan-mission-arghyam': 'Arghyam supports Jal Jeevan Mission implementation through Avni, tracking water supply infrastructure, quality monitoring, and community engagement to ensure sustainable access to clean water.',
  'prescription-tool': 'Digital prescription tool implementation using Avni to streamline medical prescriptions, improve accuracy, and enable better tracking of patient treatments.',
  'project-potential-bihar-health-access-digitisation-case-study': 'Project Potential digitizes health access in Bihar, using Avni to register beneficiaries for government health schemes, track progress, and ensure no one is left behind.',
  'scaling-rural-education': 'Scaling rural education initiatives using Avni to track student progress, monitor teacher performance, and improve learning outcomes across remote schools.',
  'scoring-for-equality': 'Sports-based youth development program uses Avni to score activities for equality, track participation, and measure impact on social cohesion and community development.',
  'use-of-avni-in-jnpct-malnutrition-project-case-study': 'JNPCT uses Avni for their malnutrition project, tracking children, pregnant women, and lactating mothers to combat malnutrition through systematic monitoring and intervention.'
};

function fixYamlFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (!match) {
    console.log(`⚠️  No frontmatter found in ${path.basename(filePath)}`);
    return;
  }
  
  let frontmatter = match[1];
  const restContent = content.slice(match[0].length);
  
  // Fix empty description
  if (frontmatter.includes('description: ""')) {
    const slug = path.basename(filePath, '.md');
    const desc = descriptions[slug] || 'Learn how this organization uses Avni for digital transformation and impact measurement.';
    frontmatter = frontmatter.replace('description: ""', `description: "${desc}"`);
    console.log(`✓ Fixed empty description: ${path.basename(filePath)}`);
  }
  
  // Fix ">-" description
  if (frontmatter.includes('description: ">-"') || frontmatter.includes('description: ">"')) {
    const slug = path.basename(filePath, '.md');
    const desc = descriptions[slug] || 'Learn how this organization uses Avni for digital transformation and impact measurement.';
    frontmatter = frontmatter.replace(/description: ">\-?"/, `description: "${desc}"`);
    console.log(`✓ Fixed >- description: ${path.basename(filePath)}`);
  }
  
  // Fix double quotes in title (already fixed but check anyway)
  if (frontmatter.includes('title: ""')) {
    frontmatter = frontmatter.replace(/title: ""(.+?)""/, 'title: "$1"');
    console.log(`✓ Fixed double quotes in title: ${path.basename(filePath)}`);
  }
  
  // Write back
  const newContent = `---\n${frontmatter}\n---${restContent}`;
  fs.writeFileSync(filePath, newContent, 'utf8');
}

function main() {
  console.log('========================================');
  console.log('Fixing YAML Frontmatter Issues');
  console.log('========================================\n');
  
  const files = fs.readdirSync(CASE_STUDIES_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(CASE_STUDIES_DIR, f));
  
  console.log(`Found ${files.length} case study files\n`);
  
  files.forEach(fixYamlFrontmatter);
  
  console.log('\n========================================');
  console.log('✅ YAML fixes complete!');
  console.log('========================================\n');
}

main();
