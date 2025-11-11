/**
 * Blog Search Component
 * Debounced search with Figma-perfect styling
 */

'use client';

import { Search } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';

interface BlogSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function BlogSearch({ 
  onSearch, 
  placeholder = "Type To Search" 
}: BlogSearchProps) {
  const [inputValue, setInputValue] = useState('');

  // Debounced search - 300ms delay
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (value: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          onSearch(value);
        }, 300);
      };
    })(),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
        <Search size={20} className="text-[#667085]" strokeWidth={2} />
      </div>
      
      {/* Search Input */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 pl-11 pr-4 bg-white border border-[#D0D5DD] rounded-lg font-noto text-sm text-[#1B1B1B] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[rgba(23,115,83,0.2)] focus:border-[#177353] transition-all duration-200 hover:border-[#177353]"
        aria-label="Search blogs by title"
      />
    </div>
  );
}
