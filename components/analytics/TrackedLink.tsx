/**
 * TrackedLink Component
 * 
 * A link component that automatically tracks all clicks with Google Analytics.
 * Works with both internal (Next.js Link) and external links.
 * 
 * Usage:
 * <TrackedLink 
 *   href="/blogs/digital-transformation" 
 *   eventName="blog_link_click"
 *   eventCategory="Navigation"
 * >
 *   Read our blog
 * </TrackedLink>
 */

'use client';

import React, { AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import { event as trackEvent, trackEngagement } from '@/lib/analytics';

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  eventName?: string;
  eventCategory?: string;
  eventLabel?: string;
  trackOnClick?: boolean;
  external?: boolean;
}

export const TrackedLink = React.forwardRef<HTMLAnchorElement, TrackedLinkProps>(
  (
    {
      href,
      eventName,
      eventCategory = 'Link',
      eventLabel,
      trackOnClick = true,
      external,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    // Auto-detect external links
    const isExternal = external ?? (href.startsWith('http') && !href.includes('avniproject.org'));

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Track the event
      if (trackOnClick) {
        const finalEventName = eventName || (isExternal ? 'external_link_click' : 'internal_link_click');
        
        trackEvent({
          action: finalEventName,
          category: eventCategory,
          label: eventLabel || href,
        });

        // Track external links separately
        if (isExternal) {
          trackEngagement.externalLinkClick(href);
        }

        console.log(`[Analytics] Link tracked: ${finalEventName}`, {
          href,
          category: eventCategory,
          external: isExternal,
        });
      }

      // Call original onClick handler
      if (onClick) {
        onClick(e);
      }
    };

    // Use Next.js Link for internal links, regular anchor for external
    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href}
          onClick={handleClick}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        ref={ref as any}
        href={href}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

TrackedLink.displayName = 'TrackedLink';
