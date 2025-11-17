/**
 * Case Studies Client Component
 * Client-side wrapper for search, filters, and grid with pagination
 */

'use client';

import { useState, useMemo, useCallback } from 'react';
import { CaseStudy } from '@/lib/markdown';
import CaseStudiesSearch from './CaseStudiesSearch';
import CaseStudiesFilter from './CaseStudiesFilter';
import CaseStudiesGrid from './CaseStudiesGrid';
import CaseStudiesPagination from './CaseStudiesPagination';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

interface CaseStudiesClientProps {
  caseStudies: CaseStudy[];
}

const ITEMS_PER_PAGE = 6;

export default function CaseStudiesClient({ caseStudies }: CaseStudiesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search
  }, []);

  // Handle filter change
  const handleFilterChange = useCallback((sectors: string[]) => {
    setSelectedSectors(sectors);
    setCurrentPage(1); // Reset to first page on filter
  }, []);

  // Filter case studies based on search and sectors
  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter((caseStudy) => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        caseStudy.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseStudy.frontmatter.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Sector filter
      const matchesSector = selectedSectors.length === 0 || 
        selectedSectors.includes(caseStudy.frontmatter.sector);

      return matchesSearch && matchesSector;
    });
  }, [caseStudies, searchQuery, selectedSectors]);

  // Pagination
  const totalPages = Math.ceil(filteredCaseStudies.length / ITEMS_PER_PAGE);
  const paginatedCaseStudies = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredCaseStudies.slice(startIndex, endIndex);
  }, [filteredCaseStudies, currentPage]);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);


  return (
    <Section spacing="lg" className="bg-[#F5F5F5]">
      <Container>
        {/* Search and Filter Bar */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 relative">
            {/* Search */}
            <div className="flex-1">
              <CaseStudiesSearch onSearch={handleSearch} />
            </div>
            
            {/* Filter */}
            <div className="md:w-auto">
              <CaseStudiesFilter
                selectedSectors={selectedSectors}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
        </div>

        {/* Results Count and Active Filters */}
        <div className="mb-6 space-y-4">
          {/* Count */}
          <p className="font-noto text-base text-gray-600">
            Showing {filteredCaseStudies.length} case stud{filteredCaseStudies.length === 1 ? 'y' : 'ies'}
            {(searchQuery || selectedSectors.length > 0) && (
              <> with active filters</>
            )}
          </p>

          {/* Active Filters */}
          {(searchQuery || selectedSectors.length > 0) && (
            <div className="flex flex-wrap items-center gap-2">
              {/* Search Query Badge */}
              {searchQuery && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#419372] text-white rounded-full text-sm font-anek">
                  <span>Search: "{searchQuery}"</span>
                  <button
                    onClick={() => handleSearch('')}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                    aria-label="Clear search"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              )}

              {/* Sector Badges */}
              {selectedSectors.map((sector) => (
                <div
                  key={sector}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF8854] text-white rounded-full text-sm font-anek"
                >
                  <span>{sector}</span>
                  <button
                    onClick={() => handleFilterChange(selectedSectors.filter(s => s !== sector))}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                    aria-label={`Remove ${sector} filter`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              ))}

              {/* Clear All Button */}
              <button
                onClick={() => {
                  handleSearch('');
                  handleFilterChange([]);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 text-gray-700 rounded-full text-sm font-anek font-medium hover:bg-gray-50 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Clear All
              </button>
            </div>
          )}
        </div>

        {paginatedCaseStudies.length > 0 ? (
          <>
            {/* Grid */}
            <CaseStudiesGrid caseStudies={paginatedCaseStudies} />

            {/* Pagination */}
            <CaseStudiesPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="font-noto text-lg text-gray-600">
              No case studies found matching your criteria.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
