/**
 * Optimized Image Component
 * Wrapper around Next.js Image with performance optimizations
 */

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  fallback?: string;
}

export default function OptimizedImage({
  src,
  alt,
  fallback = '/placeholder.png',
  className = '',
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      className={`${className} ${isLoading ? 'blur-sm' : 'blur-0'} transition-all duration-300`}
      loading="lazy"
      quality={85}
      onLoadingComplete={() => setIsLoading(false)}
      onError={() => {
        setImgSrc(fallback);
        setIsLoading(false);
      }}
    />
  );
}
