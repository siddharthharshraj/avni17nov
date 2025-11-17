/**
 * Case Studies Grid Component
 * Responsive grid layout for case study cards
 */

import { CaseStudy } from '@/lib/markdown';
import CaseStudyCard from './CaseStudyCard';

interface CaseStudiesGridProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudiesGrid({ caseStudies }: CaseStudiesGridProps) {
  if (caseStudies.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="font-anek font-bold text-xl text-[#0b2540] mb-2">
          No case studies found
        </h3>
        <p className="font-noto text-base text-gray-600">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {caseStudies.map((caseStudy) => (
        <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
      ))}
    </div>
  );
}
