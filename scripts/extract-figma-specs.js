#!/usr/bin/env node

/**
 * Extract design specifications from Figma
 * Usage: node extract-figma-specs.js <file-key> <node-id>
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const FIGMA_TOKEN = 'figd_vUrTWSz4v210PJ-4ryyigo_KVNG7sdkJPN7mT5eM';
const FILE_KEY = process.argv[2] || 'mIajDP8cdoIgNPhIvkpnKP';
const NODE_ID = process.argv[3] || '202:4642';

function fetchFigmaFile(fileKey, nodeId) {
  const encodedNodeId = encodeURIComponent(nodeId);
  const options = {
    hostname: 'api.figma.com',
    path: `/v1/files/${fileKey}/nodes?ids=${encodedNodeId}`,
    method: 'GET',
    headers: {
      'X-Figma-Token': FIGMA_TOKEN
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

function extractStyles(node, styles = {}) {
  if (!node) return styles;

  // Extract text styles
  if (node.type === 'TEXT') {
    const textStyle = {
      fontFamily: node.style?.fontFamily,
      fontWeight: node.style?.fontWeight,
      fontSize: node.style?.fontSize,
      lineHeight: node.style?.lineHeightPx || node.style?.lineHeightPercentFontSize,
      letterSpacing: node.style?.letterSpacing,
      textAlign: node.style?.textAlignHorizontal,
      color: node.fills?.[0]?.color
    };
    
    const key = node.name || 'text';
    styles[key] = textStyle;
  }

  // Extract layout properties
  if (node.type === 'FRAME' || node.type === 'COMPONENT') {
    styles[node.name] = {
      type: node.type,
      width: node.absoluteBoundingBox?.width,
      height: node.absoluteBoundingBox?.height,
      padding: {
        top: node.paddingTop,
        right: node.paddingRight,
        bottom: node.paddingBottom,
        left: node.paddingLeft
      },
      gap: node.itemSpacing,
      background: node.fills?.[0]?.color,
      borderRadius: node.cornerRadius,
      layoutMode: node.layoutMode
    };
  }

  // Recursively process children
  if (node.children) {
    node.children.forEach(child => extractStyles(child, styles));
  }

  return styles;
}

function formatColor(color) {
  if (!color) return 'N/A';
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a !== undefined ? color.a : 1;
  
  if (a < 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function generateMarkdown(styles, pageName) {
  let markdown = `# ${pageName} - Design Specifications\n\n`;
  markdown += `*Extracted from Figma on ${new Date().toLocaleDateString()}*\n\n`;
  markdown += `---\n\n`;

  // Group by type
  const textStyles = {};
  const layoutStyles = {};

  Object.entries(styles).forEach(([name, style]) => {
    if (style.fontFamily) {
      textStyles[name] = style;
    } else if (style.type) {
      layoutStyles[name] = style;
    }
  });

  // Typography section
  if (Object.keys(textStyles).length > 0) {
    markdown += `## Typography\n\n`;
    Object.entries(textStyles).forEach(([name, style]) => {
      markdown += `### ${name}\n\n`;
      markdown += `| Property | Value |\n`;
      markdown += `|----------|-------|\n`;
      markdown += `| Font Family | ${style.fontFamily || 'N/A'} |\n`;
      markdown += `| Font Weight | ${style.fontWeight || 'N/A'} |\n`;
      markdown += `| Font Size | ${style.fontSize ? style.fontSize + 'px' : 'N/A'} |\n`;
      markdown += `| Line Height | ${style.lineHeight ? (typeof style.lineHeight === 'number' ? style.lineHeight + 'px' : style.lineHeight + '%') : 'N/A'} |\n`;
      markdown += `| Letter Spacing | ${style.letterSpacing ? style.letterSpacing + 'px' : 'N/A'} |\n`;
      markdown += `| Text Align | ${style.textAlign || 'N/A'} |\n`;
      markdown += `| Color | ${formatColor(style.color)} |\n\n`;
    });
  }

  // Layout section
  if (Object.keys(layoutStyles).length > 0) {
    markdown += `## Layout & Spacing\n\n`;
    Object.entries(layoutStyles).forEach(([name, style]) => {
      markdown += `### ${name}\n\n`;
      markdown += `| Property | Value |\n`;
      markdown += `|----------|-------|\n`;
      markdown += `| Type | ${style.type || 'N/A'} |\n`;
      markdown += `| Width | ${style.width ? style.width + 'px' : 'N/A'} |\n`;
      markdown += `| Height | ${style.height ? style.height + 'px' : 'N/A'} |\n`;
      markdown += `| Padding | Top: ${style.padding?.top || 0}px, Right: ${style.padding?.right || 0}px, Bottom: ${style.padding?.bottom || 0}px, Left: ${style.padding?.left || 0}px |\n`;
      markdown += `| Gap | ${style.gap ? style.gap + 'px' : 'N/A'} |\n`;
      markdown += `| Background | ${formatColor(style.background)} |\n`;
      markdown += `| Border Radius | ${style.borderRadius ? style.borderRadius + 'px' : 'N/A'} |\n`;
      markdown += `| Layout Mode | ${style.layoutMode || 'N/A'} |\n\n`;
    });
  }

  return markdown;
}

async function main() {
  try {
    console.log(`Fetching Figma file: ${FILE_KEY}, node: ${NODE_ID}`);
    
    const data = await fetchFigmaFile(FILE_KEY, NODE_ID);
    
    if (!data.nodes || !data.nodes[NODE_ID]) {
      throw new Error('Node not found in response');
    }

    const node = data.nodes[NODE_ID].document;
    const pageName = node.name || 'Page';
    
    console.log(`Extracting styles from: ${pageName}`);
    const styles = extractStyles(node);
    
    console.log(`Found ${Object.keys(styles).length} style definitions`);
    
    const markdown = generateMarkdown(styles, pageName);
    
    // Save to file
    const outputPath = path.join(__dirname, '..', 'design-system', `${pageName.toLowerCase().replace(/\s+/g, '-')}-specs.md`);
    fs.writeFileSync(outputPath, markdown);
    
    console.log(`\n✅ Design specifications saved to: ${outputPath}`);
    console.log(`\nPreview:\n${markdown.substring(0, 500)}...`);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
