/**
 * Media Gallery Client Component
 * Sidebar tab layout matching Solutions page design
 */

'use client';

import { useState } from 'react';
import FieldPhotos from './FieldPhotos';
import Videos from './Videos';

type TabType = 'case-studies' | 'testimonials' | 'how-to-guides' | 'features' | 'field-photos';

export default function MediaGalleryClient() {
  const [activeTab, setActiveTab] = useState<TabType>('field-photos');

  const tabs = [
    { id: 'case-studies' as TabType, label: 'Case Studies' },
    { id: 'testimonials' as TabType, label: 'Testimonials' },
    { id: 'how-to-guides' as TabType, label: 'How To Guides?' },
    { id: 'features' as TabType, label: 'Features' },
    { id: 'field-photos' as TabType, label: 'Field Photos' },
  ];

  return (
    <main className="bg-white min-h-screen pt-[72px]">
      {/* Hero Section with Sidebar Layout */}
      <section className="relative px-4 sm:px-6 lg:px-16 xl:px-24 py-8 sm:py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto">
          <p className="font-anek font-bold text-[12px] sm:text-[14px] leading-[20px] text-[#FF8854] uppercase tracking-[0.5px] mb-6 sm:mb-8">
            MEDIA GALLERY
          </p>

          {/* Mobile Horizontal Scroll */}
          <div className="lg:hidden overflow-x-auto pb-2 -mx-4 sm:-mx-6 px-4 sm:px-6 mb-6 sm:mb-8">
            <div className="flex gap-2 min-w-max bg-white rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-2 sm:p-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 font-anek text-[13px] sm:text-[15px] whitespace-nowrap transition-all relative ${
                    activeTab === tab.id
                      ? 'font-bold text-[#0a1f3d]'
                      : 'font-medium text-[#5a6c7d]'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] sm:h-[3px] bg-[#FFD84D] rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 sm:gap-8 lg:gap-12">
            {/* Sidebar - Media Tabs (Desktop Only) */}
            <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
              <nav className="bg-white rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-4 lg:p-6 space-y-1 lg:space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-3 lg:px-4 py-2 lg:py-3 font-anek text-[14px] lg:text-[16px] leading-[24px] transition-all rounded-lg ${
                      activeTab === tab.id
                        ? 'font-bold text-[#0a1f3d]'
                        : 'font-medium text-[#5a6c7d] hover:text-[#0a1f3d] hover:bg-gray-50'
                    }`}
                  >
                    <span className="relative inline-block">
                      {tab.label}
                      {activeTab === tab.id && (
                        <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FFD84D]"></span>
                      )}
                    </span>
                  </button>
                ))}
              </nav>
            </aside>

            {/* Content Area */}
            <div className="min-h-[400px] sm:min-h-[600px]">
              {activeTab === 'field-photos' && <FieldPhotos />}
              {activeTab === 'case-studies' && <Videos category="case-studies" />}
              {activeTab === 'testimonials' && <Videos category="testimonials" />}
              {activeTab === 'how-to-guides' && <Videos category="how-to-guides" />}
              {activeTab === 'features' && <Videos category="features" />}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
