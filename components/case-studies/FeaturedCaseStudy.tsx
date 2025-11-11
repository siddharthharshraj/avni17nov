/**
 * Featured Case Study Component
 * Displays the featured case study with prominent styling
 */

import Image from 'next/image';
import Link from 'next/link';
import { CaseStudy } from '@/lib/markdown';
import { getSectorColor } from '@/lib/filters';

interface FeaturedCaseStudyProps {
  caseStudy: CaseStudy;
}

export default function FeaturedCaseStudy({ caseStudy }: FeaturedCaseStudyProps) {
  const { frontmatter, slug } = caseStudy;

  return (
    <div className="bg-white rounded-[24px] p-8 md:p-10 lg:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow relative">
      {/* Read Time - Top Right */}
      {frontmatter.readTime && (
        <div className="absolute top-8 right-8 md:top-10 md:right-10 lg:top-12 lg:right-12">
          <p className="font-noto text-sm text-gray-600">
            {frontmatter.readTime}
          </p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left: Logo and Content */}
        <div className="flex-1">
          {/* Logo */}
          <div className="mb-6">
            <div className="relative w-32 h-16 md:w-40 md:h-20">
              <Image
                src={frontmatter.logo}
                alt={frontmatter.title}
                fill
                className="object-contain object-left"
                priority
                sizes="160px"
              />
            </div>
          </div>

          {/* Sector Badge */}
          <div className="mb-4">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-anek font-medium ${getSectorColor(frontmatter.sector)}`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0L10.472 5.528L16 8L10.472 10.472L8 16L5.528 10.472L0 8L5.528 5.528L8 0Z" fill="currentColor" opacity="0.6"/>
              </svg>
              {frontmatter.sector.toUpperCase()}
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
            href={`/resources/case-studies/${slug}`}
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
