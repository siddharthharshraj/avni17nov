"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQAccordionProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

/**
 * FAQ Accordion Item Component
 * Figma Specs:
 * - Card: White background, 16px border radius, 1px border #E6E6E6
 * - Padding: 24px all sides
 * - Question Typography: Noto Sans Medium, 24px, 20px line height, Title Case, #000000 80%
 * - Answer Typography: Noto Sans Regular, 24px, 30px line height, #000000 80%
 * - Spacing: 24px between cards, 12px between question and answer
 * - Chevron: Aligned to right with 24px padding, smooth rotation
 */
export default function FAQAccordion({ question, answer, isOpen = false, onToggle }: FAQAccordionProps) {
  const [internalOpen, setInternalOpen] = useState(isOpen);
  
  const isControlled = onToggle !== undefined;
  const open = isControlled ? isOpen : internalOpen;
  
  const handleToggle = () => {
    if (isControlled) {
      onToggle();
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  return (
    <div className="bg-white border border-[#CCCCCC] rounded-[12px] md:rounded-[16px] mb-4 md:mb-6 last:mb-0 overflow-hidden hover:shadow-sm transition-shadow">
      {/* Question Button - Responsive padding: 16px mobile → 24px desktop */}
      <button
        onClick={handleToggle}
        className="w-full flex items-start justify-between p-4 md:p-6 text-left transition-colors group"
        aria-expanded={open}
      >
        {/* Question Text - Responsive: 18px mobile → 24px desktop */}
        <h3 className="font-noto font-medium text-[18px] md:text-[24px] leading-[24px] md:leading-[20px] text-[#000000] text-opacity-80 pr-3 md:pr-4 flex-1">
          {question}
        </h3>
        {/* Chevron Icon - Aligned right with smooth rotation */}
        <ChevronDown 
          className={`w-5 h-5 md:w-6 md:h-6 text-[#000000] text-opacity-80 flex-shrink-0 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      {/* Answer Section - Smooth expand/collapse with proper spacing */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {/* Answer Text - Responsive: 16px mobile → 24px desktop */}
        <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2 md:pt-3">
          <p className="font-noto font-normal text-[16px] md:text-[24px] leading-[24px] md:leading-[30px] text-[#000000] text-opacity-80 tracking-[0px] max-w-[994px]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
