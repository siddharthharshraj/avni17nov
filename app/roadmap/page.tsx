/**
 * Roadmap Page
 * Displays the GitHub Projects v2 board
 */

import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RoadmapBoard from '@/components/roadmap/RoadmapBoard';

export const metadata: Metadata = {
  title: 'Product Roadmap | Avni',
  description: 'Track Avni\'s development progress and upcoming features. Our transparent roadmap shows what we\'re building for NGOs and social sector organizations.',
  keywords: ['avni roadmap', 'product roadmap', 'development progress', 'upcoming features', 'ngo software roadmap'],
  openGraph: {
    title: 'Avni Product Roadmap',
    description: 'Track our development progress and upcoming features',
    type: 'website',
  },
};

export default function RoadmapPage() {
  return (
    <>
      <Header />
      {/* 
        ROOT CAUSE FIX: Removed min-h-screen which was forcing 100vh height
        This caused infinite scroll as the container stretched beyond content
        Now the main element only takes the natural height of its content
      */}
      <main className="bg-[#fefefe] pt-[72px]">
        {/* Hero Section - Improved spacing and polish */}
        <section className="bg-gradient-to-b from-[#419372]/5 to-transparent py-8 md:py-12 lg:py-16">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="max-w-[800px] mx-auto text-center">
              {/* Category Tag - More refined styling */}
              <span className="inline-block px-4 py-2 bg-[#fff5f0] rounded-[8px] font-anek font-bold text-[14px] leading-[14px] tracking-wide text-[#ff8854] mb-6 uppercase shadow-sm">
                Product Updates
              </span>
              
              <h1 className="font-anek font-bold text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] leading-[1.1] text-[#0b2540] mb-3 md:mb-4">
                Product Roadmap
              </h1>
              <p className="font-noto text-[16px] sm:text-[18px] md:text-[20px] leading-[1.6] text-gray-600">
                Track our development progress and upcoming features. Our roadmap is transparent and updated regularly.
              </p>
            </div>
          </div>
        </section>

        {/* Board Section - Reduced top spacing */}
        <section className="pt-6 md:pt-8 pb-12 md:pb-16 lg:pb-20">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <RoadmapBoard />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
