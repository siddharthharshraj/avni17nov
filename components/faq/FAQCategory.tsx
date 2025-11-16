"use client";

import { useState } from "react";
import FAQAccordion from "./FAQAccordion";
import { FAQItem } from "@/data/faq";

interface FAQCategoryProps {
  title: string;
  items: FAQItem[];
  defaultOpenIndex?: number;
}

/**
 * FAQ Category Section Component
 * Figma Specs:
 * - Category Title: Anek Latin Bold, 30px, 32px line height, #000000 80%, left aligned
 * - Spacing: 32px margin top, 24px margin bottom before questions
 * - Questions: Individual cards with 24px spacing between them
 */
export default function FAQCategory({ title, items, defaultOpenIndex }: FAQCategoryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex !== undefined ? defaultOpenIndex : null
  );

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mb-10 md:mb-12">
      {/* Category Title - Responsive: 24px mobile → 30px desktop */}
      <h2 className="font-anek font-bold text-[24px] md:text-[30px] leading-[28px] md:leading-[32px] text-[#000000] text-opacity-80 mb-5 md:mb-6">
        {title}
      </h2>
      {/* FAQ Items - Individual cards with proper spacing */}
      <div>
        {items.map((item, index) => (
          <FAQAccordion
            key={item.id}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
}
