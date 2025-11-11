/**
 * Blog Card Component
 * Individual blog post card with image, category, title, and read more button
 */

import Image from 'next/image';
import Link from 'next/link';
import { Blog } from '@/lib/markdown';

interface BlogCardProps {
  blog: Blog;
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'User Story': 'bg-[#FEF3F2] text-[#B42318]',
    'Technical Story': 'bg-[#FFF4ED] text-[#C4320A]',
    'Sector': 'bg-[#FFF6ED] text-[#C4320A]',
    'Avni News': 'bg-[#FFF1F3] text-[#C01048]',
  };
  return colors[category] || 'bg-gray-100 text-gray-700';
};

export default function BlogCard({ blog }: BlogCardProps) {
  const { frontmatter, slug } = blog;

  return (
    <div className="bg-white rounded-[16px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition-shadow duration-300">
      {/* Image */}
      <div className="relative w-full h-[240px] overflow-hidden">
        <Image
          src={frontmatter.image}
          alt={frontmatter.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-anek font-medium uppercase tracking-wide ${getCategoryColor(frontmatter.category)}`}>
            {frontmatter.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-anek font-bold text-xl leading-tight text-[#0b2540] mb-3 line-clamp-2 min-h-[56px]">
          {frontmatter.title}
        </h3>

        {/* Read More Button */}
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#419372] text-white rounded-full font-anek font-medium text-sm hover:bg-[#357a5e] transition-colors"
        >
          Read More
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}
