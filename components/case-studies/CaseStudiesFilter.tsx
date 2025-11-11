/**
 * Case Studies Filter Component
 * Figma-perfect implementation with proper scrolling behavior
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, LayoutGrid } from 'lucide-react';
import { SECTORS } from '@/lib/filters';

interface CaseStudiesFilterProps {
  selectedSectors: string[];
  onFilterChange: (sectors: string[]) => void;
}

export default function CaseStudiesFilter({ 
  selectedSectors, 
  onFilterChange 
}: CaseStudiesFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggleSector = (sector: string) => {
    if (selectedSectors.includes(sector)) {
      onFilterChange(selectedSectors.filter(s => s !== sector));
    } else {
      onFilterChange([...selectedSectors, sector]);
    }
  };

  // Close on outside click and Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      {/* Sectors Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-3 bg-white border border-[#D0D5DD] rounded-lg font-noto text-sm font-medium text-[#1B1B1B] hover:border-[#177353] focus:outline-none focus:ring-2 focus:ring-[#177353] focus:ring-offset-2 transition-all duration-200 min-w-[140px] justify-between w-full md:w-auto"
        aria-label="Filter by sectors"
        aria-expanded={isOpen}
        aria-controls="sectors-dropdown"
      >
        <div className="flex items-center gap-2">
          <LayoutGrid size={18} className="text-[#667085]" />
          <span>Sectors</span>
        </div>
        <ChevronDown 
          size={18} 
          className={`text-[#667085] transition-transform duration-250 ease-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {/* Dropdown Panel - Spans full width of parent container */}
      {isOpen && (
          <div
            ref={containerRef}
            id="sectors-dropdown"
            role="menu"
            className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl shadow-[0px_4px_14px_rgba(0,0,0,0.06)] overflow-hidden"
            style={{
              animation: 'fadeSlideDown 0.25s ease-out',
              zIndex: 40,
            }}
          >
            <div className="py-5 px-7">
              {/* Checkboxes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-4">
              {SECTORS.map((sector, index) => (
                <label
                  key={sector}
                  role="menuitemcheckbox"
                  aria-checked={selectedSectors.includes(sector)}
                  className="flex items-center gap-3 cursor-pointer group px-3 py-2 rounded-lg hover:bg-[rgba(23,115,83,0.04)] transition-colors duration-200"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleToggleSector(sector);
                    }
                  }}
                >
                  {/* Custom Checkbox */}
                  <div className="relative flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={selectedSectors.includes(sector)}
                      onChange={() => handleToggleSector(sector)}
                      className="sr-only"
                      tabIndex={-1}
                      aria-label={`Filter by ${sector}`}
                    />
                    <div 
                      className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center ${
                        selectedSectors.includes(sector)
                          ? 'border-[#177353] bg-white'
                          : 'border-[#D0D5DD] bg-white group-hover:border-[#177353]'
                      }`}
                    >
                      {selectedSectors.includes(sector) && (
                        <svg
                          className="w-4 h-4 text-[#177353]"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.3333 4L6 11.3333L2.66667 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  {/* Label */}
                  <span className="font-noto text-sm font-medium text-[#1B1B1B] group-hover:text-[#177353] transition-colors duration-200 select-none">
                    {sector}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scoped Animation Styles */}
      <style jsx>{`
        @keyframes fadeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 1279px) {
          #sectors-dropdown {
            min-width: 550px !important;
          }
        }

        @media (max-width: 1023px) {
          #sectors-dropdown {
            min-width: 500px !important;
          }
        }

        @media (max-width: 767px) {
          #sectors-dropdown {
            left: 0 !important;
            right: 0 !important;
            min-width: 100% !important;
          }
        }

        @media (max-width: 639px) {
          #sectors-dropdown {
            max-width: 100vw !important;
          }
        }
      `}</style>
    </>
  );
}
