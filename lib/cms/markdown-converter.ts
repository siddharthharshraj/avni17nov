/**
 * Markdown Converter
 * Convert content blocks to markdown and vice versa
 */

import { ContentBlock, ImageContent } from './types';

export function blocksToMarkdown(blocks: ContentBlock[]): string {
  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);
  
  return sortedBlocks.map(block => {
    switch (block.type) {
      case 'heading':
        const level = block.level || 2;
        const hashes = '#'.repeat(level);
        return `${hashes} ${block.content}\n`;
      
      case 'paragraph':
        return `${block.content}\n`;
      
      case 'image':
        const img = block.content as ImageContent;
        const caption = img.caption ? `\n*${img.caption}*` : '';
        return `![${img.alt}](${img.src})${caption}\n`;
      
      case 'list':
        const items = (block.content as string).split('\n');
        return items.map(item => `- ${item}`).join('\n') + '\n';
      
      case 'quote':
        return `> ${block.content}\n`;
      
      case 'code':
        return `\`\`\`\n${block.content}\n\`\`\`\n`;
      
      default:
        return '';
    }
  }).join('\n');
}

export function markdownToBlocks(markdown: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const lines = markdown.split('\n');
  let order = 0;
  let currentBlock: Partial<ContentBlock> | null = null;
  let inCodeBlock = false;
  let codeContent: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Handle code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        blocks.push({
          id: `block-${order}`,
          type: 'code',
          content: codeContent.join('\n'),
          order: order++,
        });
        codeContent = [];
        inCodeBlock = false;
      } else {
        // Start code block
        inCodeBlock = true;
      }
      continue;
    }
    
    if (inCodeBlock) {
      codeContent.push(line);
      continue;
    }
    
    // Handle headings
    if (line.startsWith('#')) {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        blocks.push({
          id: `block-${order}`,
          type: 'heading',
          content: match[2],
          level: match[1].length,
          order: order++,
        });
        continue;
      }
    }
    
    // Handle images
    if (line.startsWith('![')) {
      const match = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
      if (match) {
        const nextLine = lines[i + 1];
        const caption = nextLine?.startsWith('*') ? nextLine.slice(1, -1) : undefined;
        
        blocks.push({
          id: `block-${order}`,
          type: 'image',
          content: {
            src: match[2],
            alt: match[1],
            caption,
          },
          order: order++,
        });
        
        if (caption) i++; // Skip caption line
        continue;
      }
    }
    
    // Handle quotes
    if (line.startsWith('>')) {
      blocks.push({
        id: `block-${order}`,
        type: 'quote',
        content: line.slice(1).trim(),
        order: order++,
      });
      continue;
    }
    
    // Handle lists
    if (line.startsWith('-') || line.startsWith('*')) {
      const listItems: string[] = [line.slice(1).trim()];
      
      // Collect consecutive list items
      while (i + 1 < lines.length && (lines[i + 1].startsWith('-') || lines[i + 1].startsWith('*'))) {
        i++;
        listItems.push(lines[i].slice(1).trim());
      }
      
      blocks.push({
        id: `block-${order}`,
        type: 'list',
        content: listItems.join('\n'),
        order: order++,
      });
      continue;
    }
    
    // Handle paragraphs
    if (line.trim()) {
      blocks.push({
        id: `block-${order}`,
        type: 'paragraph',
        content: line,
        order: order++,
      });
    }
  }
  
  return blocks;
}

export function generateFrontmatter(data: {
  title: string;
  author: string;
  date: string;
  tags: string[];
  featuredImage: string;
  description: string;
  category?: string;
}): string {
  return `---
title: "${data.title}"
author: "${data.author}"
date: ${data.date}
tags: [${data.tags.map(t => `"${t}"`).join(', ')}]
featuredImage: "${data.featuredImage}"
description: "${data.description}"
${data.category ? `category: "${data.category}"` : ''}
published: true
---

`;
}
