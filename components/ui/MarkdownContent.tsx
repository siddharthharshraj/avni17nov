/**
 * Universal Markdown Content Component
 * Applies consistent typography across all markdown content
 * Typography: 24px/36px Noto Sans (from Figma specs)
 */

'use client';

import { useEffect } from 'react';
import '@/app/blog-content.css';

interface MarkdownContentProps {
  htmlContent: string;
  className?: string;
}

export default function MarkdownContent({ htmlContent, className = '' }: MarkdownContentProps) {
  useEffect(() => {
    // Fix image paths and handle missing images
    const images = document.querySelectorAll('.markdown-content img');
    images.forEach((img) => {
      const src = img.getAttribute('src');
      
      // Remove empty or invalid images immediately
      if (!src || src.trim() === '' || src === 'undefined' || src === 'null') {
        img.remove();
        return;
      }
      
      // Fix relative paths
      if (!src.startsWith('http') && !src.startsWith('/')) {
        img.setAttribute('src', `/${src}`);
      }
      
      // Add loading lazy for performance
      img.setAttribute('loading', 'lazy');
      
      // Add error handler - remove image completely if it fails to load
      img.addEventListener('error', function(this: HTMLImageElement) {
        console.warn('Image not found, removing:', this.src);
        this.remove();
      });

      // Check if next sibling is a <pre> tag (caption)
      const nextElement = img.nextElementSibling;
      if (nextElement && nextElement.tagName === 'PRE') {
        // Create figure element
        const figure = document.createElement('figure');
        figure.className = 'blog-figure';
        
        // Create figcaption
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = nextElement.textContent || '';
        figcaption.className = 'blog-figcaption';
        
        // Replace img with figure
        const parent = img.parentElement;
        if (parent) {
          parent.insertBefore(figure, img);
          figure.appendChild(img);
          figure.appendChild(figcaption);
          nextElement.remove(); // Remove the <pre> tag
        }
      }
    });

    // Remove empty paragraphs that only contained images
    const paragraphs = document.querySelectorAll('.markdown-content p');
    paragraphs.forEach((p) => {
      if (p.textContent?.trim() === '' && p.children.length === 0) {
        p.remove();
      }
    });

    // Remove horizontal rules (----) that appear after images
    const hrs = document.querySelectorAll('.markdown-content hr');
    hrs.forEach((hr) => {
      const prevElement = hr.previousElementSibling;
      if (prevElement && (prevElement.tagName === 'FIGURE' || prevElement.tagName === 'IMG')) {
        hr.remove();
      }
    });
  }, [htmlContent]);

  return (
    <div
      className={`markdown-content blog-content max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
