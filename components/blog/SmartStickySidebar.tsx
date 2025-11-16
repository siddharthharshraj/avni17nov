'use client';

/**
 * Smart Sticky Sidebar - Smooth Transform-based Scrolling
 * Only BlogShareCTA scrolls smoothly with the page
 */

import { useRef, useEffect, useState } from 'react';
import BlogMetaInfo from './BlogMetaInfo';
import BlogShareCTA from './BlogShareCTA';

interface SmartStickySidebarProps {
  date: string;
  author: string | { name: string; avatar?: string };
  readTime?: string;
  title: string;
  slug: string;
}

export default function SmartStickySidebar({
  date,
  author,
  readTime,
  title,
  slug,
}: SmartStickySidebarProps) {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      if (!ctaRef.current) return;

      const cta = ctaRef.current;
      const ctaHeight = cta.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Get the written by section to know when to stop
      const writtenBySection = document.getElementById('written-by-section');
      if (!writtenBySection) {
        setTranslateY(0);
        return;
      }

      const writtenByRect = writtenBySection.getBoundingClientRect();
      const writtenByTop = writtenByRect.top + scrollY;
      
      // Get the sidebar container position
      const sidebarContainer = cta.closest('.lg\\:block');
      if (!sidebarContainer) return;
      
      const containerRect = sidebarContainer.getBoundingClientRect();
      const containerTop = containerRect.top + scrollY;

      // Calculate positions
      const headerOffset = 96;
      const gap = 32;
      
      // Start position: when header is scrolled past
      const startScroll = containerTop - headerOffset;
      
      // End position: stop before written by section
      const maxTranslate = writtenByTop - containerTop - ctaHeight - gap;
      
      // Calculate current translate based on scroll
      let newTranslate = 0;
      
      if (scrollY > startScroll) {
        // Calculate how much to translate
        newTranslate = scrollY - startScroll;
        
        // Clamp to max translate (stop before written by)
        newTranslate = Math.min(newTranslate, maxTranslate);
        
        // Ensure it doesn't go negative
        newTranslate = Math.max(0, newTranslate);
      }

      setTranslateY(newTranslate);
    };

    // Smooth scroll handler with requestAnimationFrame
    let rafId: number;
    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(updatePosition);
    };

    // Handle keyboard events
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
        handleScroll();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', updatePosition);
    
    // Initial position
    updatePosition();

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Static BlogMetaInfo */}
      <BlogMetaInfo date={date} author={author} readTime={readTime} />
      
      {/* Smooth Scrolling BlogShareCTA */}
      <div 
        ref={ctaRef}
        style={{
          transform: `translateY(${translateY}px)`,
          willChange: 'transform',
          transition: 'transform 0.1s ease-out',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <BlogShareCTA title={title} slug={slug} />
      </div>
    </div>
  );
}
