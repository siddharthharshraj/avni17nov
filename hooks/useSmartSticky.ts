'use client';

import { useEffect, useState, RefObject } from 'react';

interface UseSmartStickyProps {
  contentRef: RefObject<HTMLElement>;
  offset?: number;
}

export function useSmartSticky({ contentRef, offset = 96 }: UseSmartStickyProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const [topPosition, setTopPosition] = useState(offset);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const contentRect = contentRef.current.getBoundingClientRect();
      const contentBottom = contentRect.bottom;
      const scrollY = window.scrollY;

      // Check if we should stick to top
      if (scrollY > offset) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Check if we've reached the bottom of content
      // Sidebar should stop before the "Written By" section
      const stopPoint = contentBottom - window.innerHeight + 200;
      
      if (scrollY >= stopPoint && contentBottom < window.innerHeight) {
        setIsBottom(true);
        setIsSticky(false);
      } else {
        setIsBottom(false);
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'PageUp' || e.key === 'PageDown') {
        // Trigger scroll handler after keyboard scroll
        setTimeout(handleScroll, 10);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [contentRef, offset]);

  return { isSticky, isBottom, topPosition };
}
