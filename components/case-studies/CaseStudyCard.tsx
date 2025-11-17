/**
 * Case Study Card Component
 * Individual card for case study grid
 */

import Image from 'next/image';
import Link from 'next/link';
import { CaseStudy } from '@/lib/markdown';
import { getSectorColor } from '@/lib/filters';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const { frontmatter, slug } = caseStudy;

  return (
    <div className="bg-white rounded-[20px] p-6 md:p-8 flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow h-full">
      {/* Logo */}
      <div className="mb-6">
        <div className="relative w-28 h-14 md:w-32 md:h-16">
          <Image
            src={frontmatter.logo}
            alt={frontmatter.title}
            fill
            className="object-contain object-left"
            loading="lazy"
            sizes="128px"
          />
        </div>
      </div>

      {/* Sector Badge */}
      <div className="mb-4">
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-anek font-medium ${getSectorColor(frontmatter.sector)}`}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0L10.472 5.528L16 8L10.472 10.472L8 16L5.528 10.472L0 8L5.528 5.528L8 0Z" fill="currentColor" opacity="0.6"/>
          </svg>
          {frontmatter.sector.toUpperCase()}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-anek font-bold text-lg md:text-xl leading-tight text-[#0b2540] mb-4 flex-grow">
        {frontmatter.title}
      </h3>

      {/* Tags */}
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {frontmatter.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-block px-2.5 py-1 rounded-md text-xs font-anek font-semibold uppercase tracking-wide bg-[#FF8854] text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom Section */}
      <div className="flex items-center justify-between mt-auto pt-4">
        {/* Read Time */}
        {frontmatter.readTime && (
          <span className="font-noto text-sm text-gray-600">
            {frontmatter.readTime}
          </span>
        )}

        {/* Read More Button */}
        <Link
          href={`/resources/case-studies/${slug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#419372] text-white rounded-full font-anek font-medium text-sm hover:bg-[#357a5e] transition-colors"
        >
          Read More
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}
