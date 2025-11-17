/**
 * Product Services Dropdown Component
 * Figma: Desktop - 6, Group 147 (node 1-615)
 * Height: 393px, Background: Opaque white
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { productServicesTabs, servicesItems, useCasesItems } from '@/data/navigation';

interface ProductServicesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

interface FeaturedBlogData {
  title: string;
  link: string;
  image: string;
}

export default function ProductServicesDropdown({ isOpen, onClose, onMouseEnter, onMouseLeave }: ProductServicesDropdownProps) {
  const [activeTab, setActiveTab] = useState('services');
  const [featuredBlog, setFeaturedBlog] = useState<FeaturedBlogData>({
    title: 'How Goonj Uses Avni To Digitise Offline Data Collection And Inventory Flow >',
    image: '/images/goonj-featured.webp',
    link: '/blog/goonj-case-study',
  });
  const [imageError, setImageError] = useState(false);

  // Fetch featured blog on mount
  useEffect(() => {
    async function fetchFeaturedBlog() {
      try {
        const response = await fetch('/api/featured-blog');
        if (response.ok) {
          const data = await response.json();
          setFeaturedBlog(data);
          setImageError(false); // Reset error state when new data loads
        }
      } catch (error) {
        console.error('Failed to fetch featured blog:', error);
        // Keep default fallback
      }
    }
    fetchFeaturedBlog();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="hidden lg:block">
      {/* Backdrop with fade-in animation */}
      <div 
        className="fixed inset-0 top-[72px] bg-black/10 z-40 animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* Dropdown Panel - Opaque White Background with slide-down animation */}
      <div 
        className="absolute left-0 right-0 top-[72px] bg-white h-[450px] z-50 shadow-2xl border-t border-gray-100 animate-slideDown"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="relative w-[1440px] mx-auto h-full">
            {/* Tabs Section - Left Side: x=108, y=44 */}
            <div className="absolute left-[108px] top-[44px] flex flex-col gap-[8px]">
              {productServicesTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-[8px] h-[40px] px-[16px] rounded-[10px] transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#fff8f8]'
                      : 'bg-transparent hover:bg-white/50'
                  }`}
                >
                <div className="relative w-[24px] h-[24px]">
                  <Image
                    src={tab.icon}
                    alt={tab.label}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-anek font-medium text-[18px] leading-[20px] text-[rgba(0,0,0,0.8)] capitalize">
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          {/* Vertical Divider Line - Left */}
          <div className="absolute left-[265px] top-[44px] w-[1px] h-[362px] bg-[rgba(0,0,0,0.1)]" />

          {/* Services Grid - Middle Section: x=305, y=44 */}
          {activeTab === 'services' && (
            <div className="absolute left-[305px] top-[44px] w-[720px] pb-[20px]">
              <div className="grid grid-cols-2 gap-x-[48px] gap-y-[28px]">
                {servicesItems.map((service) => (
                  <Link
                    key={service.id}
                    href={service.link}
                    className="flex gap-[16px] group p-[6px] rounded-[12px] transition-all hover:bg-[#fff5f0] hover:shadow-sm"
                    onClick={onClose}
                  >
                    {/* Icon: 30x30 */}
                    <div className="relative w-[30px] h-[30px] flex-shrink-0">
                      <Image
                        src={service.icon}
                        alt={service.title}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="font-anek font-semibold text-[18px] leading-[20px] text-[rgba(0,0,0,0.8)] mb-[8px] transition-colors duration-200">
                        {service.title}
                      </h4>
                      <p className="font-noto text-[14px] leading-[20px] text-[#878787]">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Use Cases Grid - Middle Section: x=305, y=44 */}
          {activeTab === 'use-cases' && (
            <div className="absolute left-[305px] top-[44px] w-[720px] pb-[32px]">
              <div className="grid grid-cols-2 gap-x-[48px] gap-y-[32px]">
                {useCasesItems.map((useCase) => (
                  <Link
                    key={useCase.id}
                    href={useCase.link}
                    className="flex gap-[16px] group p-[6px] rounded-[12px] transition-all hover:bg-[#fff5f0] hover:shadow-sm"
                    onClick={onClose}
                  >
                    {/* Icon: 30x30 */}
                    <div className="relative w-[30px] h-[30px] flex-shrink-0">
                      <Image
                        src={useCase.icon}
                        alt={useCase.title}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="font-anek font-semibold text-[18px] leading-[20px] text-[rgba(0,0,0,0.8)] mb-[8px] transition-colors duration-200">
                        {useCase.title}
                      </h4>
                      <p className="font-noto text-[14px] leading-[20px] text-[#878787]">
                        {useCase.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Vertical Divider Line - Right */}
          <div className="absolute left-[1055px] top-[44px] w-[1px] h-[362px] bg-[rgba(0,0,0,0.1)]" />

          {/* Right Side Content - Conditional based on active tab */}
          <div className="absolute left-[1095px] top-[44px] w-[283px]">
            {/* Services Tab - Still in Doubt Section */}
            {activeTab === 'services' && (
              <div>
                <h3 className="font-anek font-extrabold text-[18px] leading-[24px] text-[rgba(0,0,0,0.8)] uppercase tracking-wide mb-[16px]">
                  STILL IN DOUBT?
                </h3>
                <p className="font-noto text-[14px] leading-[20px] text-[rgba(0,0,0,0.7)] mb-[24px]">
                  Speak To Our Sales Team For Further Details And Any Questions
                </p>
                <Link
                  href="/contact-sales"
                  className="inline-block px-[24px] py-[12px] bg-[#419372] text-white rounded-[24px] font-anek font-semibold text-[16px] leading-[20px] hover:bg-[#357a5e] transition-colors"
                  onClick={onClose}
                >
                  Contact Sales
                </Link>
              </div>
            )}

            {/* Use Cases Tab - Featured Blog Section */}
            {activeTab === 'use-cases' && (
              <>
                <div className="flex items-center gap-[8px] mb-[16px]">
                  <div className="relative w-[30px] h-[30px]">
                    <Image
                      src="/icons/navigation/featured-blog.svg"
                      alt="Featured"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-anek font-bold text-[16px] leading-[20px] text-[rgba(0,0,0,0.6)] uppercase tracking-wide">
                    FEATURED BLOG
                  </span>
                </div>

                <Link
                  href={featuredBlog.link}
                  className="block group"
                  onClick={onClose}
                >
                  <div className="relative w-[283px] h-[169px] rounded-[30px] overflow-hidden mb-[16px] bg-gradient-to-br from-gray-100 to-gray-50">
                    {!imageError ? (
                      <Image
                        src={featuredBlog.image}
                        alt="Featured Blog"
                        fill
                        sizes="283px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => setImageError(true)}
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <p className="font-anek font-medium text-[16px] leading-[20px] text-[rgba(0,0,0,0.7)] group-hover:text-[#419372] transition-colors w-[283px] line-clamp-2">
                    {featuredBlog.title}
                  </p>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
