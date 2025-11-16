"use client";

import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";

interface FAQSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

/**
 * FAQ Search Input Component
 * Figma Specs:
 * - Width: 916px (max-width, responsive)
 * - Height: 80px
 * - Border: 1px solid #CCCCCC
 * - Border Radius: 16px
 * - Padding: 16px
 * - Icon: Search icon, vertically centered on left
 */
export default function FAQSearch({ 
  onSearch, 
  placeholder = "Type Your Query",
  debounceMs = 300 
}: FAQSearchProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce the search query for performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => {
      clearTimeout(timer);
    };
  }, [query, debounceMs]);

  // Trigger search when debounced query changes
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return (
    <div className="w-full max-w-[916px] mx-auto">
      <div className="relative">
        {/* Search Icon - Vertically centered on left with 16px padding */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Search className="w-4 h-4 md:w-5 md:h-5 text-[#999999]" />
        </div>
        {/* Input Field - Responsive: 60px mobile → 80px desktop, full width on mobile */}
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full h-[60px] md:h-[80px] pl-11 md:pl-12 pr-4 border border-[#CCCCCC] rounded-[12px] md:rounded-[16px] font-noto font-normal text-[14px] md:text-[16px] leading-[20px] text-[#000000] placeholder:text-[#999999] focus:outline-none focus:border-[#419372] focus:ring-2 focus:ring-[#419372]/20 transition-all"
          aria-label="Search FAQs"
        />
      </div>
    </div>
  );
}
