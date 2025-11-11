/**
 * Featured Blog Component
 * Displays the featured blog post with prominent styling
 */

import Image from 'next/image';
import Link from 'next/link';
import { Blog } from '@/lib/markdown';

interface FeaturedBlogProps {
  blog: Blog;
}

export default function FeaturedBlog({ blog }: FeaturedBlogProps) {
  const { frontmatter, slug } = blog;

  return (
    <div className="bg-white rounded-[24px] p-8 md:p-10 lg:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        {/* Left: Image */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <div className="relative w-full h-[280px] lg:h-[320px] rounded-[16px] overflow-hidden">
            <Image
              src={frontmatter.image}
              alt={frontmatter.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 400px"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex-1">
          {/* Featured Badge */}
          <div className="mb-4 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 0L12.9389 6.90983L20 10L12.9389 13.0902L10 20L7.06107 13.0902L0 10L7.06107 6.90983L10 0Z" fill="#FBA47E" opacity="0.8"/>
            </svg>
            <span className="font-anek font-medium text-sm text-[#fba47e] uppercase tracking-wide">
              Featured Blog
            </span>
          </div>

          {/* Title */}
          <h2 className="font-anek font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-[#0b2540] mb-4">
            {frontmatter.title}
          </h2>

          {/* Description */}
          <p className="font-noto text-base md:text-lg leading-relaxed text-[#000000]/70 mb-6">
            {frontmatter.description}
          </p>

          {/* Read More Button */}
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#419372] text-white rounded-full font-anek font-medium text-base hover:bg-[#357a5e] transition-colors"
          >
            Read More
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
