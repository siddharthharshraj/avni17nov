/**
 * Filter Utilities for Case Studies
 * Client-side filtering and search logic
 */

import { CaseStudy } from './markdown';

export const SECTORS = [
  'Education',
  'Healthcare',
  'Water & Sanitation',
  'Waste Management',
  'Social Security',
  'Livelihood',
  'Legal Aid',
  'Sports',
] as const;

export type Sector = typeof SECTORS[number];

/**
 * Filter case studies by selected sectors
 */
export function filterBySectors(
  caseStudies: CaseStudy[],
  selectedSectors: string[]
): CaseStudy[] {
  if (selectedSectors.length === 0) {
    return caseStudies;
  }

  return caseStudies.filter(cs =>
    selectedSectors.some(sector => 
      cs.frontmatter.sector.toLowerCase() === sector.toLowerCase()
    )
  );
}

/**
 * Filter case studies by search query
 */
export function filterBySearch(
  caseStudies: CaseStudy[],
  searchQuery: string
): CaseStudy[] {
  if (!searchQuery.trim()) {
    return caseStudies;
  }

  const lowerQuery = searchQuery.toLowerCase();

  return caseStudies.filter(cs =>
    cs.frontmatter.title.toLowerCase().includes(lowerQuery) ||
    cs.frontmatter.description.toLowerCase().includes(lowerQuery) ||
    cs.frontmatter.sector.toLowerCase().includes(lowerQuery) ||
    (cs.frontmatter.tags && cs.frontmatter.tags.some(tag => 
      tag.toLowerCase().includes(lowerQuery)
    ))
  );
}

/**
 * Apply both search and sector filters
 */
export function applyFilters(
  caseStudies: CaseStudy[],
  searchQuery: string,
  selectedSectors: string[]
): CaseStudy[] {
  let filtered = caseStudies;

  // Apply search filter
  filtered = filterBySearch(filtered, searchQuery);

  // Apply sector filter
  filtered = filterBySectors(filtered, selectedSectors);

  return filtered;
}

/**
 * Get sector color for badges
 */
export function getSectorColor(sector: string): string {
  const colors: Record<string, string> = {
    'Education': 'bg-blue-100 text-blue-700',
    'Healthcare': 'bg-red-100 text-red-700',
    'Water & Sanitation': 'bg-cyan-100 text-cyan-700',
    'Waste Management': 'bg-green-100 text-green-700',
    'Social Security': 'bg-purple-100 text-purple-700',
    'Livelihood': 'bg-orange-100 text-orange-700',
    'Legal Aid': 'bg-indigo-100 text-indigo-700',
    'Sports': 'bg-yellow-100 text-yellow-700',
  };

  return colors[sector] || 'bg-gray-100 text-gray-700';
}

/**
 * Debounce function for search input
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
