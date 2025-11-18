/**
 * TrackedButton Component
 * 
 * A button component that automatically tracks all clicks with Google Analytics.
 * Use this instead of regular buttons for comprehensive analytics.
 * 
 * Usage:
 * <TrackedButton 
 *   eventName="signup_hero" 
 *   eventCategory="CTA" 
 *   onClick={handleSignup}
 * >
 *   Sign Up Free
 * </TrackedButton>
 */

'use client';

import React, { ButtonHTMLAttributes } from 'react';
import { event as trackEvent } from '@/lib/analytics';

interface TrackedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  eventName: string;
  eventCategory?: string;
  eventLabel?: string;
  eventValue?: number;
  trackOnClick?: boolean;
}

export const TrackedButton = React.forwardRef<HTMLButtonElement, TrackedButtonProps>(
  (
    {
      eventName,
      eventCategory = 'Button',
      eventLabel,
      eventValue,
      trackOnClick = true,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Track the event
      if (trackOnClick) {
        trackEvent({
          action: eventName,
          category: eventCategory,
          label: eventLabel || (typeof children === 'string' ? children : eventName),
          value: eventValue,
        });

        console.log(`[Analytics] Button tracked: ${eventName}`, {
          category: eventCategory,
          label: eventLabel,
        });
      }

      // Call original onClick handler
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <button ref={ref} onClick={handleClick} {...props}>
        {children}
      </button>
    );
  }
);

TrackedButton.displayName = 'TrackedButton';
