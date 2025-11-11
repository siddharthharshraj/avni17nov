/**
 * Reusable Button Component
 * Modern, accessible button with consistent styling
 */

import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { COLORS, ANIMATIONS } from '@/lib/constants';
import type { ButtonProps } from '@/lib/types';

const variantStyles = {
  primary: `bg-[${COLORS.primary}] text-white hover:bg-[#357a5e] border-2 border-[${COLORS.primary}]`,
  secondary: `bg-white text-[${COLORS.darkNavy}] hover:bg-gray-50 border-2 border-gray-200`,
  outline: `bg-transparent text-[${COLORS.primary}] border-2 border-[${COLORS.primary}] hover:bg-[${COLORS.primary}] hover:text-white`,
} as const;

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
} as const;

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  disabled = false,
  className,
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const baseStyles = cn(
    'inline-flex items-center justify-center rounded-full font-anek font-medium',
    'transition-all focus:outline-none focus:ring-2 focus:ring-offset-2',
    `duration-[${ANIMATIONS.normal}]`,
    disabled && 'opacity-50 cursor-not-allowed',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      className={baseStyles} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
