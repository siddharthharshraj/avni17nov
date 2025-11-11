/**
 * Blog Filter Component
 * Category filter with dropdown - matches case studies design
 */

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { LayoutGrid, ChevronDown } from 'lucide-react';

interface BlogFilterProps {
  selectedCategories: string[];
  onFilterChange: (categories: string[]) => void;
}

const BLOG_CATEGORIES = [
  'User Story',
  'Technical Story',
  'Sector',
  'Avni News'
];

export default function BlogFilter({ selectedCategories, onFilterChange }: BlogFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle category toggle
  const handleCategoryToggle = useCallback((category: string) => {
    if (selectedCategories.includes(category)) {
      onFilterChange(selectedCategories.filter(c => c !== category));
    } else {
      onFilterChange([...selectedCategories, category]);
    }
  }, [selectedCategories, onFilterChange]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      {/* Category Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-3 bg-white border border-[#D0D5DD] rounded-lg font-noto text-sm font-medium text-[#1B1B1B] hover:border-[#177353] focus:outline-none focus:ring-2 focus:ring-[#177353] focus:ring-offset-2 transition-all duration-200 min-w-[140px] justify-between w-full md:w-auto"
        aria-label="Filter by category"
        aria-expanded={isOpen}
        aria-controls="category-dropdown"
      >
        <div className="flex items-center gap-2">
          <LayoutGrid size={18} className="text-[#667085]" />
          <span>Category</span>
        </div>
        <ChevronDown 
          size={18} 
          className={`text-[#667085] transition-transform duration-250 ease-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
          <div
            ref={containerRef}
            id="category-dropdown"
            role="menu"
            className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl shadow-[0px_4px_14px_rgba(0,0,0,0.06)] overflow-hidden"
            style={{
              animation: 'fadeSlideDown 0.25s ease-out',
              zIndex: 40,
            }}
          >
            {/* Category Grid */}
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {BLOG_CATEGORIES.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-3 cursor-pointer group"
                    role="menuitemcheckbox"
                    aria-checked={selectedCategories.includes(category)}
                  >
                    {/* Custom Checkbox */}
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                          selectedCategories.includes(category)
                            ? 'bg-[#177353] border-[#177353]'
                            : 'bg-white border-[#D0D5DD] group-hover:border-[#177353]'
                        }`}
                      >
                        {selectedCategories.includes(category) && (
                          <svg
                            width="12"
                            height="10"
                            viewBox="0 0 12 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 5L4.5 8.5L11 1.5"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Label */}
                    <span className="font-noto text-sm text-[#1B1B1B] select-none">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
      )}

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
