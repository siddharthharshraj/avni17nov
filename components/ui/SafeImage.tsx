'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  width?: number;
  height?: number;
  fallbackSrc?: string;
}

/**
 * SafeImage Component
 * Handles image loading errors gracefully with fallback images
 * Prevents broken image icons from appearing
 */
export default function SafeImage({
  src,
  alt,
  fill,
  className,
  sizes,
  loading = 'lazy',
  priority = false,
  width,
  height,
  fallbackSrc = '/images/placeholder-case-study.png',
}: SafeImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [error, setError] = useState(false);

  const handleError = () => {
    if (imageSrc !== fallbackSrc) {
      console.warn(`Failed to load image: ${imageSrc}, using fallback`);
      setImageSrc(fallbackSrc);
      setError(true);
    }
  };

  const imageProps = {
    src: imageSrc,
    alt: error ? `${alt} (fallback image)` : alt,
    className: `${className} ${error ? 'opacity-75' : ''}`,
    onError: handleError,
    loading,
    priority,
    sizes: sizes || '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        style={{ objectFit: 'cover' }}
      />
    );
  }

  if (width && height) {
    return (
      <Image
        {...imageProps}
        width={width}
        height={height}
      />
    );
  }

  // Default to fill if no dimensions provided
  return (
    <Image
      {...imageProps}
      fill
      style={{ objectFit: 'cover' }}
    />
  );
}
