/**
 * Related Case Studies Component
 * Shows 3-column grid of related case studies
 * Same styling as blog cards but for case studies
 * Fully responsive design
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { CaseStudy } from '@/lib/markdown';

interface RelatedCaseStudiesProps {
  caseStudies: CaseStudy[];
}

export default function RelatedCaseStudies({ caseStudies }: RelatedCaseStudiesProps) {
  if (!caseStudies || caseStudies.length === 0) {
    return null;
  }

  return (
    <section className="px-4 sm:px-6 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-20 bg-[#F5F3FF]">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Heading */}
        <h2 className="font-anek font-bold text-[32px] sm:text-[36px] lg:text-[40px] leading-[1.2] text-[#0B2540] mb-10 sm:mb-12 text-center lg:text-left">
          Other Case Studies
        </h2>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {caseStudies.map((caseStudy) => (
            <Link
              key={caseStudy.slug}
              href={`/resources/case-studies/${caseStudy.slug}`}
              className="group"
            >
              <article className="bg-white rounded-[12px] border border-[#E6E6E6] overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {/* Card Content */}
                <div className="p-6 sm:p-7 lg:p-8 flex flex-col flex-grow">
                  {/* Organization Logo */}
                  <div className="w-[80px] h-[60px] relative mb-4 flex-shrink-0">
                    <div className="relative w-full h-full border border-[#E6E6E6] rounded-[8px] bg-white p-2 flex items-center justify-center">
                      <Image
                        src={caseStudy.frontmatter.logo}
                        alt={caseStudy.frontmatter.title}
                        fill
                        className="object-contain p-1"
                        sizes="80px"
                      />
                    </div>
                  </div>

                  {/* Sector Tag */}
                  <div className="mb-4 flex-shrink-0">
                    <span className="inline-block px-3 py-1.5 bg-[#FFF5F0] text-[#FF8854] text-[12px] font-anek font-semibold rounded-full uppercase tracking-wide">
                      {caseStudy.frontmatter.sector}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-anek font-bold text-[18px] sm:text-[20px] leading-[1.3] text-[#0B2540] mb-4 group-hover:text-[#419372] transition-colors flex-grow line-clamp-3">
                    {caseStudy.frontmatter.title}
                  </h3>

                  {/* Read More Button */}
                  <div className="mt-auto pt-4 flex-shrink-0">
                    <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#419372] text-white text-[14px] font-anek font-semibold rounded-full group-hover:bg-[#357a5e] transition-all">
                      Read More
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/resources/case-studies"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[#419372] text-[#419372] font-anek font-semibold text-base rounded-full hover:bg-[#419372] hover:text-white transition-all"
          >
            View All Case Studies
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
