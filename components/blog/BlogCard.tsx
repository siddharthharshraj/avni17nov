/**
 * Blog Card Component
 * Individual blog post card with image, category, title, and read more button
 */

import Image from 'next/image';
import Link from 'next/link';
import { Blog } from '@/lib/markdown';
import { getCategoryBadgeStyles } from '@/lib/categories';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const { frontmatter, slug } = blog;
  
  // Extract featured image src - support both 'image' and 'featuredImage' fields
  const featuredImageSrc = typeof frontmatter.featuredImage === 'string' 
    ? frontmatter.featuredImage 
    : frontmatter.featuredImage?.src || frontmatter.image;
  
  // Use SVG fallback if no image provided OR if using old default path
  const isDefaultOrMissing = !featuredImageSrc || 
    featuredImageSrc.trim() === '' || 
    featuredImageSrc.includes('default-blog.jpg') ||
    featuredImageSrc.includes('default-blog.svg');
  
  const finalImageSrc = isDefaultOrMissing
    ? '/images/blogs/default-blog-banner.svg'
    : featuredImageSrc;
  
  // Always show image (either real or fallback SVG)
  const hasValidImage = true;

  return (
    <div 
      className="bg-white border border-[#E6E6E6] rounded-[8px] overflow-hidden hover:shadow-lg transition-shadow duration-300 
                 w-full max-w-[402px] mx-auto
                 sm:w-full md:w-[380px] lg:w-[402px]
                 flex flex-col"
    >
      {/* Image - Always show (real image or SVG fallback) */}
      {hasValidImage && (
        <div className="relative w-full h-[200px] sm:h-[220px] md:h-[240px] overflow-hidden flex-shrink-0 bg-gray-50">
          <Image
            src={finalImageSrc}
            alt={frontmatter.title}
            fill
            className="object-contain hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 402px"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6 flex flex-col justify-between flex-grow min-h-[200px] sm:min-h-[220px] md:min-h-[225px]">
        <div className="flex-grow">
          {/* Category Badge - Only show if category exists */}
          {frontmatter.category && (
            <div className="mb-2 sm:mb-3">
              <span 
                className="inline-block px-2.5 py-1 sm:px-3 rounded-md text-xs font-anek font-semibold uppercase tracking-wide bg-[#FF8854] text-white"
              >
                {frontmatter.category}
              </span>
            </div>
          )}

          {/* Title - Responsive */}
          <h3 
            className="font-anek font-bold text-[#000000] mb-3 sm:mb-4 line-clamp-3
                       text-lg sm:text-xl md:text-2xl
                       leading-tight sm:leading-snug"
          >
            {frontmatter.title}
          </h3>
        </div>

        {/* Read More Button */}
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 
                     bg-[#419372] text-white rounded-full font-anek font-medium 
                     text-sm hover:bg-[#357a5e] transition-colors self-start
                     mt-auto"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
