'use client';

/**
 * Use Cases Page
 * Showcases different use cases with alternating image-text layouts
 * Supports anchor links for direct navigation from dropdown
 */

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const useCases = [
  {
    id: 'case-management',
    title: 'Case Management',
    description: 'Track individuals, families, or groups with organized digital records accessible online and offline. Avni helps your team follow progress, ensure timely support, and manage programs efficiently.',
    image: '/images/hero-image.jpg',
    features: [
      'Beneficiary Registration',
      'Visit Scheduling',
      'Follow-Up Management',
      'Progress Tracking',
      'Automated Reminders',
      'Case History'
    ],
    commonUseCases: [
      'HEALTH PROGRAMS',
      'SOCIAL WELFARE',
      'LIVELIHOOD PROGRAMS',
      'EDUCATION TRACKING'
    ],
    imagePosition: 'right'
  },
  {
    id: 'reporting',
    title: 'Reporting',
    description: 'Turn field data into clear insights with automated dashboards and reports. Avni gives you real-time visibility to evaluate performance, share outcomes, and make data-driven decisions',
    image: '/images/simplify-data.png',
    features: [
      'Beneficiary Registration',
      'Visit Scheduling',
      'Follow-Up Management',
      'Progress Tracking',
      'Automated Reminders',
      'Case History'
    ],
    commonUseCases: [
      'HEALTH PROGRAMS',
      'SOCIAL WELFARE',
      'LIVELIHOOD PROGRAMS',
      'EDUCATION TRACKING'
    ],
    imagePosition: 'left'
  },
  {
    id: 'surveys',
    title: 'Surveys',
    description: 'Track individuals, families, or groups with organized digital records accessible online and offline. Avni helps your team follow progress, ensure timely support, and manage programs efficiently.',
    image: '/images/steer-programs.png',
    features: [
      'Beneficiary Registration',
      'Visit Scheduling',
      'Follow-Up Management',
      'Progress Tracking',
      'Automated Reminders',
      'Case History'
    ],
    commonUseCases: [
      'HEALTH PROGRAMS',
      'SOCIAL WELFARE',
      'LIVELIHOOD PROGRAMS',
      'EDUCATION TRACKING'
    ],
    imagePosition: 'right'
  },
  {
    id: 'cohort-studies',
    title: 'Cohort Based Research Study',
    description: 'Turn field data into clear insights with automated dashboards and reports. Avni gives you real-time visibility to evaluate performance, share outcomes, and make data-driven decisions',
    image: '/images/build-trust.png',
    features: [
      'Beneficiary Registration',
      'Visit Scheduling',
      'Follow-Up Management',
      'Progress Tracking',
      'Automated Reminders',
      'Case History'
    ],
    commonUseCases: [
      'HEALTH PROGRAMS',
      'SOCIAL WELFARE',
      'LIVELIHOOD PROGRAMS',
      'EDUCATION TRACKING'
    ],
    imagePosition: 'left'
  },
  {
    id: 'mobile-medical',
    title: 'Mobile Medical Unit & Camps',
    description: 'Track individuals, families, or groups with organized digital records accessible online and offline. Avni helps your team follow progress, ensure timely support, and manage programs efficiently.',
    image: '/images/education_impactstory.png',
    features: [
      'Beneficiary Registration',
      'Visit Scheduling',
      'Follow-Up Management',
      'Progress Tracking',
      'Automated Reminders',
      'Case History'
    ],
    commonUseCases: [
      'HEALTH PROGRAMS',
      'SOCIAL WELFARE',
      'LIVELIHOOD PROGRAMS',
      'EDUCATION TRACKING'
    ],
    imagePosition: 'right'
  }
];

function UseCasesContent() {
  const searchParams = useSearchParams();

  // Handle anchor scrolling from dropdown
  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [searchParams]);

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-[72px]">
        {/* Hero Section */}
        <section className="relative px-6 lg:px-16 xl:px-24 py-16 lg:py-20">
          <div className="max-w-[1200px] mx-auto text-center">
            <p className="font-anek font-bold text-[14px] leading-[20px] text-[#fba57f] uppercase tracking-[0.5px] mb-6">
              AVNI USE CASES
            </p>
            
            <h1 className="font-anek font-bold text-[36px] lg:text-[48px] leading-[1.2] text-[#0a1f3d] mb-6">
              Solutions That Work For{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Every</span>
                <span className="absolute bottom-[4px] left-0 right-0 h-[8px] bg-[#FFD84D] -z-0"></span>
              </span>
              {' '}Use Case
            </h1>
            
            <p className="font-noto text-[17px] lg:text-[19px] leading-[1.6] text-[#5a6c7d] max-w-[720px] mx-auto">
              Whether you're managing cases, running surveys, or tracking impact, Avni adapts to your workflow — empowering NGOs across sectors to digitize their programs with ease.
            </p>
          </div>
        </section>

        {/* Use Cases Sections */}
        {useCases.map((useCase, index) => (
          <section
            key={useCase.id}
            id={useCase.id}
            className={`relative px-6 lg:px-16 xl:px-24 py-12 lg:py-16 scroll-mt-24 ${
              index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'
            }`}
          >
            <div className="max-w-[1200px] mx-auto">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                useCase.imagePosition === 'left' ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Text Content */}
                <div className={`space-y-6 ${useCase.imagePosition === 'left' ? 'lg:order-2' : ''}`}>
                  <h2 className="font-anek font-bold text-[28px] lg:text-[36px] leading-[1.2] text-[#0a1f3d]">
                    {useCase.title}
                  </h2>
                  
                  <p className="font-noto text-[16px] lg:text-[17px] leading-[1.7] text-[#5a6c7d]">
                    {useCase.description}
                  </p>

                  {/* Key Features */}
                  <div className="space-y-4">
                    <h3 className="font-anek font-semibold text-[14px] uppercase tracking-wide text-[#0a1f3d]">
                      KEY FEATURES
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {useCase.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="relative w-[17px] h-[17px] flex-shrink-0">
                            <Image
                              src="/icons/general/tick.svg"
                              alt="Check"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="font-noto text-[15px] text-[#5a6c7d]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Use Cases */}
                  <div className="space-y-3">
                    <h3 className="font-anek font-semibold text-[14px] uppercase tracking-wide text-[#0a1f3d]">
                      COMMON USE CASES
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {useCase.commonUseCases.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-[#fff5f0] text-[#fba57f] font-anek text-[13px] font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Try Avni Button */}
                  <div className="pt-2">
                    <Link 
                      href="/demo"
                      className="inline-block px-6 py-3 border-2 border-[#419372] text-[#419372] font-anek font-semibold text-[16px] rounded-full hover:bg-[#419372] hover:text-white transition-all"
                    >
                      Try Avni →
                    </Link>
                  </div>
                </div>

                {/* Image */}
                <div className={`relative ${useCase.imagePosition === 'left' ? 'lg:order-1' : ''}`}>
                    <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden shadow-lg">
                    <Image
                      src={useCase.image}
                      alt={useCase.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}

export default function UseCasesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UseCasesContent />
    </Suspense>
  );
}
