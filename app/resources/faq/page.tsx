"use client";

import { useState, useCallback, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import FAQSearch from "@/components/faq/FAQSearch";
import FAQCategory from "@/components/faq/FAQCategory";
import FAQStructuredData from "@/components/faq/FAQStructuredData";
import { faqData, searchFAQItems, FAQCategory as FAQCategoryType } from "@/data/faq";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search with useCallback to prevent unnecessary re-renders
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Filter FAQ data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return faqData;
    }

    const searchResults = searchFAQItems(searchQuery);
    
    // Group results back into categories
    const categoryMap = new Map<string, FAQCategoryType>();
    
    searchResults.forEach(item => {
      if (!categoryMap.has(item.categoryId)) {
        const originalCategory = faqData.find(cat => cat.id === item.categoryId);
        if (originalCategory) {
          categoryMap.set(item.categoryId, {
            ...originalCategory,
            items: [],
          });
        }
      }
      
      const category = categoryMap.get(item.categoryId);
      if (category) {
        category.items.push({
          id: item.id,
          question: item.question,
          answer: item.answer,
        });
      }
    });

    return Array.from(categoryMap.values());
  }, [searchQuery]);

  const hasResults = filteredData.length > 0 && filteredData.some(cat => cat.items.length > 0);

  return (
    <>
      {/* Structured Data for SEO */}
      <FAQStructuredData />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="bg-white pt-[72px]">
        {/* Hero Section - Centered content with proper typography */}
        <section className="pt-12 md:pt-16 pb-10 md:pb-12 px-6 bg-gradient-to-b from-[#F6F9FC] to-white">
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-[900px] mx-auto text-center">
              {/* Eyebrow Text - Anek Latin Bold 16px/20px, #FBA57F */}
              <p className="font-anek font-bold text-[16px] leading-[20px] tracking-[0px] text-[#FBA57F] uppercase text-center mb-4">
                Quick Answers, Always
              </p>
              
              {/* Main Heading - Noto Sans Bold, responsive: 24px mobile → 32px desktop */}
              <h1 className="font-noto font-bold text-[24px] md:text-[32px] leading-[32px] md:leading-[42px] text-[#000000] text-opacity-80 mb-4 md:mb-6 px-4">
                Frequently Asked Questions
              </h1>
              
              {/* Subtitle - Noto Sans Regular, responsive: 18px mobile → 24px desktop */}
              <p className="font-noto font-normal text-[18px] md:text-[24px] leading-[24px] md:leading-[30px] text-[#000000] text-opacity-80 max-w-[703px] mx-auto px-4">
                Clear, concise guidance to help you understand Avni&apos;s features, setup, and best practices — all in one place
              </p>
            </div>
          </div>
        </section>

        {/* Search Section - Proper spacing */}
        <section className="py-12 px-6 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <FAQSearch onSearch={handleSearch} />
          </div>
        </section>

        {/* FAQ Content - Responsive margins: 24px mobile → 187px desktop */}
        <section className="py-12 md:py-16 px-6 md:px-12 lg:px-[187px] bg-white">
          <div className="max-w-[1440px] mx-auto">
            {hasResults ? (
              filteredData.map((category) => (
                <FAQCategory
                  key={category.id}
                  title={category.title}
                  items={category.items}
                  defaultOpenIndex={searchQuery ? 0 : undefined}
                />
              ))
            ) : (
              <div className="text-center py-12 md:py-16">
                <div className="max-w-[600px] mx-auto px-4">
                  <h3 className="font-noto font-bold text-[24px] md:text-[30px] leading-[28px] md:leading-[32px] text-[#000000] text-opacity-80 mb-4">
                    No Results Found
                  </h3>
                  <p className="font-noto font-normal text-[18px] md:text-[24px] leading-[24px] md:leading-[30px] text-[#000000] text-opacity-80 mb-8">
                    We couldn&apos;t find any FAQs matching &quot;{searchQuery}&quot;. Try different keywords or browse all categories below.
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="inline-flex items-center justify-center h-12 md:h-14 px-6 md:px-8 bg-[#419372] text-white rounded-full font-noto font-medium text-[16px] md:text-[18px] leading-[20px] hover:bg-[#357a5e] transition-all"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Contact Support Section - Responsive typography and spacing */}
        <section className="py-12 md:py-16 lg:py-20 px-6 bg-[#E9EAF84D]">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center max-w-[900px] mx-auto px-4">
              <h2 className="font-noto font-bold text-[24px] md:text-[32px] leading-[32px] md:leading-[42px] text-[#000000] text-opacity-80 mb-4 md:mb-6">
                Still Have Doubts Or Questions?
              </h2>
              <p className="font-noto font-normal text-[18px] md:text-[24px] leading-[24px] md:leading-[30px] text-[#000000] text-opacity-80 mb-6 md:mb-8">
                Reach Out To Our Support Team To Connect With You And Answer Your Queries And Concerns
              </p>
              <a
                href="mailto:avnipartnerships@samanvayfoundation.org?subject=Avni%20Support%20Query"
                className="inline-flex items-center justify-center h-14 md:h-16 px-8 md:px-10 bg-[#419372] text-white rounded-full font-noto font-medium text-[18px] md:text-[20px] leading-[20px] hover:bg-[#357a5e] transition-all whitespace-nowrap"
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
}
