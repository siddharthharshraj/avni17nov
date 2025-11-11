/**
 * Case Studies Client Component
 * Handles client-side search and filtering
 */

'use client';

import { useState, useMemo, useCallback } from 'react';
import FeaturedCaseStudy from '@/components/case-studies/FeaturedCaseStudy';
import CaseStudiesGrid from '@/components/case-studies/CaseStudiesGrid';
import CaseStudiesSearch from '@/components/case-studies/CaseStudiesSearch';
import CaseStudiesFilter from '@/components/case-studies/CaseStudiesFilter';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { applyFilters } from '@/lib/filters';
import { CaseStudy } from '@/lib/markdown';

interface CaseStudiesClientProps {
  featuredCaseStudy: CaseStudy | null;
  caseStudies: CaseStudy[];
}

export default function CaseStudiesClient({ 
  featuredCaseStudy, 
  caseStudies 
}: CaseStudiesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  // Filter case studies based on search and sectors
  const filteredCaseStudies = useMemo(() => {
    return applyFilters(caseStudies, searchQuery, selectedSectors);
  }, [caseStudies, searchQuery, selectedSectors]);

  // Handle search with useCallback to prevent re-renders
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Handle filter change
  const handleFilterChange = useCallback((sectors: string[]) => {
    setSelectedSectors(sectors);
  }, []);

  return (
    <>
      {/* Featured Case Study */}
      {featuredCaseStudy && (
        <Section spacing="sm" className="bg-[#F5F5F5] pt-6 pb-6">
          <Container>
            <FeaturedCaseStudy caseStudy={featuredCaseStudy} />
          </Container>
        </Section>
      )}

      {/* Search and Filter */}
      <Section spacing="sm" className="bg-[#F5F5F5] py-6">
        <Container>
          {/* Wrapper with relative positioning for dropdown */}
          <div className="relative">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
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

          {/* Active Filters Display */}
          {(searchQuery || selectedSectors.length > 0) && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="font-anek font-medium text-sm text-gray-600">
                Active filters:
              </span>
              {searchQuery && (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-sm font-noto border border-gray-200">
                  Search: "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedSectors.map((sector) => (
                <span
                  key={sector}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-sm font-noto border border-gray-200"
                >
                  {sector}
                  <button
                    onClick={() => setSelectedSectors(selectedSectors.filter(s => s !== sector))}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label={`Remove ${sector} filter`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSectors([]);
                }}
                className="text-sm text-[#419372] hover:underline font-anek font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </Container>
      </Section>

      {/* Case Studies Grid */}
      <Section spacing="lg" className="bg-[#F5F5F5]">
        <Container>
          <CaseStudiesGrid caseStudies={filteredCaseStudies} />
        </Container>
      </Section>
    </>
  );
}
