/**
 * Case Studies Listing Component
 * - Sector filters (checkboxes)
 * - Search functionality
 * - Pagination (6 per page)
 * - Fully responsive
 * - Fast loading with optimized images
 */

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { CaseStudy } from '@/lib/case-studies';

interface CaseStudiesListingProps {
  caseStudies: CaseStudy[];
}

// All available sectors - MUST match frontmatter values
const SECTORS = [
  'Healthcare',
  'Education',
  'Livelihood',
  'Water & Sanitation',
  'Waste Management',
  'Social Security',
  'Legal Aid',
  'Sports',
];

const ITEMS_PER_PAGE = 6;

export default function CaseStudiesListing({ caseStudies }: CaseStudiesListingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter case studies based on search and sector filters
  const filteredCaseStudies = useMemo(() => {
    let filtered = caseStudies;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (cs) =>
          cs.title.toLowerCase().includes(query) ||
          cs.description.toLowerCase().includes(query) ||
          cs.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply sector filter
    if (selectedSectors.length > 0) {
      filtered = filtered.filter((cs) =>
        selectedSectors.includes(cs.sector)
      );
    }

    return filtered;
  }, [caseStudies, searchQuery, selectedSectors]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCaseStudies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCaseStudies = filteredCaseStudies.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSectors]);

  // Handle sector filter toggle
  const toggleSector = (sector: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sector)
        ? prev.filter((s) => s !== sector)
        : [...prev, sector]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedSectors([]);
    setSearchQuery('');
  };

  return (
    <section className="px-4 sm:px-6 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Search and Filters */}
        <div className="mb-10 sm:mb-12">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-[600px]">
              <input
                type="text"
                placeholder="Type To Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3.5 pl-12 border border-[#E6E6E6] rounded-full font-noto text-base text-[#000000] placeholder:text-[#999999] focus:outline-none focus:border-[#419372] focus:ring-2 focus:ring-[#419372]/20 transition-all"
              />
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]"
              >
                <path
                  d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Sector Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <button
              onClick={() => {/* Show/hide filters on mobile */}}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#E6E6E6] rounded-full font-anek font-semibold text-base text-[#0B2540] hover:bg-[#F5F5F5] transition-all sm:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 6h12M6 10h8M8 14h4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Sectors
              {selectedSectors.length > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 bg-[#FF8854] text-white text-xs rounded-full">
                  {selectedSectors.length}
                </span>
              )}
            </button>

            {/* Desktop Filters */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-anek font-semibold text-base text-[#0B2540] mr-2">
                Sectors:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {SECTORS.map((sector) => (
                  <label
                    key={sector}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-[#E6E6E6] rounded-full cursor-pointer hover:bg-[#F5F5F5] transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSectors.includes(sector)}
                      onChange={() => toggleSector(sector)}
                      className="w-4 h-4 text-[#419372] border-gray-300 rounded focus:ring-[#419372]"
                    />
                    <span className="font-noto text-sm text-[#333333]">
                      {sector}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedSectors.length > 0 || searchQuery) && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[#FF8854] font-anek font-semibold text-sm hover:underline transition-all"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Mobile Filters Dropdown */}
          <div className="sm:hidden mt-4 p-4 border border-[#E6E6E6] rounded-[12px] bg-[#F9F9F9]">
            <div className="grid grid-cols-2 gap-3">
              {SECTORS.map((sector) => (
                <label
                  key={sector}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSectors.includes(sector)}
                    onChange={() => toggleSector(sector)}
                    className="w-4 h-4 text-[#419372] border-gray-300 rounded focus:ring-[#419372]"
                  />
                  <span className="font-noto text-sm text-[#333333]">
                    {sector}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="font-noto text-base text-[#666666]">
            Showing {paginatedCaseStudies.length} of {filteredCaseStudies.length} case studies
            {selectedSectors.length > 0 && (
              <span> in {selectedSectors.join(', ')}</span>
            )}
          </p>
        </div>

        {/* Case Studies Grid */}
        {paginatedCaseStudies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {paginatedCaseStudies.map((caseStudy) => (
                <Link
                  key={caseStudy.slug}
                  href={`/resources/case-studies/${caseStudy.slug}`}
                  className="group"
                >
                  <article className="bg-white rounded-[12px] border border-[#E6E6E6] overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    {/* Card Content */}
                    <div className="p-6 sm:p-7 lg:p-8 flex flex-col flex-grow">
                      {/* Organization Logo */}
                      <div className="w-full h-[80px] relative mb-5 flex-shrink-0">
                        <div className="relative w-full h-full border border-[#E6E6E6] rounded-[8px] bg-white p-3 flex items-center justify-center">
                          <Image
                            src={caseStudy.logo}
                            alt={caseStudy.title}
                            fill
                            className="object-contain p-2"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      </div>

                      {/* Sector Tag */}
                      <div className="mb-4 flex-shrink-0">
                        <span className="inline-block px-3 py-1.5 bg-[#FFF5F0] text-[#FF8854] text-[12px] font-anek font-semibold rounded-full uppercase tracking-wide">
                          {caseStudy.sector}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-anek font-bold text-[18px] sm:text-[20px] lg:text-[22px] leading-[1.3] text-[#0B2540] mb-3 group-hover:text-[#419372] transition-colors flex-grow line-clamp-3">
                        {caseStudy.title}
                      </h3>

                      {/* Read Time */}
                      <div className="flex items-center justify-between mt-auto pt-4 flex-shrink-0">
                        <span className="font-noto text-sm text-[#666666]">
                          {caseStudy.readTime}
                        </span>
                        <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#419372] text-white text-[14px] font-anek font-semibold rounded-full group-hover:bg-[#357a5e] transition-all">
                          Read More
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M6 12L10 8L6 4"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#E6E6E6]">
                {/* Page Info */}
                <p className="font-noto text-sm text-[#666666]">
                  Page {currentPage} of {totalPages}
                </p>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  {/* Previous */}
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-[#E6E6E6] rounded-full font-anek font-medium text-sm text-[#0B2540] hover:bg-[#F5F5F5] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="hidden sm:flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first, last, current, and adjacent pages
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-full font-anek font-semibold text-sm transition-all ${
                              page === currentPage
                                ? 'bg-[#419372] text-white'
                                : 'border border-[#E6E6E6] text-[#0B2540] hover:bg-[#F5F5F5]'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span key={page} className="text-[#999999]">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  {/* Next */}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-[#E6E6E6] rounded-full font-anek font-medium text-sm text-[#0B2540] hover:bg-[#F5F5F5] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* No Results */
          <div className="text-center py-16">
            <div className="mb-6">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto text-[#E6E6E6]"
              >
                <circle cx="40" cy="40" r="40" fill="currentColor" opacity="0.1" />
                <path
                  d="M40 50c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h3 className="font-anek font-bold text-[24px] text-[#0B2540] mb-3">
              No case studies found
            </h3>
            <p className="font-noto text-base text-[#666666] mb-6">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={clearFilters}
              className="px-8 py-3 bg-[#419372] text-white font-anek font-semibold rounded-full hover:bg-[#357a5e] transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
