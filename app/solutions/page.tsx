'use client';

/**
 * Solutions Page
 * Dynamic page with sidebar navigation for different solution categories
 * Matches Figma design pixel-perfect with responsive layout
 */

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Newsletter from '@/components/sections/Newsletter';
import { solutionCards } from '@/data/solution-cards';

// Solution categories
const solutions = [
  'Education',
  'Healthcare',
  'Water & Sanitation',
  'Waste Management',
  'Social Security',
  'Livelihood',
  'Legal Aid',
  'Sports'
];

// Content for each solution
const solutionContent = {
  'Education': {
    description: [
      'Education-focused NGOs deal with challenges in tracking student attendance, learning progress, and teacher interventions — especially in rural or low-resource settings. Paper-based systems make it difficult to evaluate program effectiveness and scale successful models.',
      'Avni simplifies education data management with digital classroom records, assessment tracking, and cohort monitoring. Real-time dashboards help organizations identify learning gaps early and improve program delivery across schools and community centers.'
    ],
    cards: [
      {
        type: 'case-study',
        image: '/images/education_impactstory.png',
        title: 'CLNL - Anganwadis And Schools Building Skills Beyond Classroom',
        label: 'Case Study',
        link: '/case-studies/clnl'
      },
      {
        type: 'video',
        image: '/images/simplify-data.png',
        title: 'Leadership For Equity | Classroom At TeachAP',
        label: 'Showcase',
        link: '/showcase/leadership-equity'
      }
    ],
    cta: {
      icon: '🏠',
      title: 'Want To Know If You Are A Good Fit For Avni?',
      description: 'Try Our Education Specific Use Cases',
      link: '/use-cases/education'
    }
  },
  'Healthcare': {
    description: [
      'Community health programs struggle with fragmented patient data, inconsistent follow-ups, and limited visibility into health outcomes — especially in underserved areas. Manual record-keeping makes it difficult to track chronic conditions, maternal health, immunization schedules, and disease surveillance effectively.',
      'Avni transforms healthcare delivery with digital patient profiles, automated visit scheduling, and real-time health monitoring. Field workers can track vital signs, medication adherence, and treatment outcomes while supervisors gain actionable insights through comprehensive dashboards and alerts for high-risk cases.'
    ],
    cards: [
      {
        type: 'case-study',
        image: '/images/steer-programs.png',
        title: 'Healthcare Program Management',
        label: 'Case Study',
        link: '#'
      },
      {
        type: 'video',
        image: '/images/build-trust.png',
        title: 'Digital Health Records in Action',
        label: 'Showcase',
        link: '#'
      }
    ],
    cta: {
      icon: '🏥',
      title: 'Want To Know If You Are A Good Fit For Avni?',
      description: 'Try Our Healthcare Specific Use Cases',
      link: '/use-cases/healthcare'
    }
  },
  'Water & Sanitation': {
    description: [
      'WASH programs face challenges in monitoring water quality, tracking infrastructure maintenance, and ensuring sustained behavior change across communities. Paper-based systems make it difficult to identify non-functional water points, track sanitation coverage, and measure program impact at scale.',
      'Avni streamlines WASH program management with digital asset registers, automated maintenance schedules, and household-level tracking. Field teams can conduct water quality tests, monitor toilet construction, and track hygiene behavior adoption while program managers access real-time dashboards showing coverage gaps and infrastructure status.'
    ],
    cards: [
      {
        type: 'case-study',
        image: '/images/hero-image.jpg',
        title: 'WASH Program Implementation',
        label: 'Case Study',
        link: '#'
      },
      {
        type: 'video',
        image: '/images/simplify-data.png',
        title: 'Community Water Management',
        label: 'Showcase',
        link: '#'
      }
    ],
    cta: {
      icon: '💧',
      title: 'Want To Know If You Are A Good Fit For Avni?',
      description: 'Try Our WASH Specific Use Cases',
      link: '/use-cases/wash'
    }
  },
  'Waste Management': {
    description: [
      'Waste management initiatives struggle with inefficient collection routes, limited visibility into waste segregation practices, and difficulty tracking waste-picker livelihoods. Manual systems make it hard to optimize operations, ensure fair compensation, and demonstrate environmental impact to stakeholders.',
      'Avni digitizes waste management with GPS-enabled route tracking, household-level waste segregation monitoring, and waste-picker welfare management. Organizations can track collection efficiency, measure recycling rates, manage payments to waste-pickers, and generate impact reports showing waste diverted from landfills and carbon emissions reduced.'
    ],
    cards: [
      {
        type: 'case-study',
        image: '/images/steer-programs.png',
        title: 'Waste Collection Optimization',
        label: 'Case Study',
        link: '#'
      },
      {
        type: 'video',
        image: '/images/build-trust.png',
        title: 'Community Recycling Programs',
        label: 'Showcase',
        link: '#'
      }
    ],
    cta: {
      icon: '♻️',
      title: 'Want To Know If You Are A Good Fit For Avni?',
      description: 'Try Our Waste Management Use Cases',
      link: '/use-cases/waste'
    }
  },
  'Social Security': {
    description: [
      'Social protection programs face challenges in identifying eligible beneficiaries, preventing duplication, and ensuring timely benefit delivery — especially for vulnerable populations like elderly, disabled, and marginalized communities. Paper-based systems create delays, errors, and limited accountability in benefit distribution.',
      'Avni enables efficient social security management with digital beneficiary databases, automated eligibility assessment, and benefit tracking workflows. Field workers can conduct household surveys, verify documents, and process applications while administrators monitor disbursement status, identify coverage gaps, and generate compliance reports for government and donor requirements.'
    ],
    cards: [
      {
        type: 'case-study',
        image: '/images/build-trust.png',
        title: 'Beneficiary Management System',
        label: 'Case Study',
        link: '#'
      },
      {
        type: 'video',
        image: '/images/hero-image.jpg',
        title: 'Digital Social Security Programs',
        label: 'Showcase',
        link: '#'
      }
    ],
    cta: {
      icon: '🤝',
      title: 'Want To Know If You Are A Good Fit For Avni?',
      description: 'Try Our Social Security Use Cases',
      link: '/use-cases/social-security'
    }
  },
  'Livelihood': {
    description: [
      'Livelihood programs struggle to track skill development progress, monitor job placements, and measure income improvements across diverse beneficiaries. Manual systems make it difficult to match candidates with opportunities, track training effectiveness, and demonstrate long-term economic impact to funders.',
      'Avni transforms livelihood programming with digital trainee profiles, skill assessment tracking, and placement monitoring systems. Organizations can manage training batches, track attendance and performance, facilitate employer connections, monitor post-placement income growth, and generate impact reports showing employment rates and income improvements over time.'
    ],
    cards: [
      {
        type: 'case-study',
        image: '/images/education_impactstory.png',
        title: 'Skill Development Programs',
        label: 'Case Study',
        link: '#'
      },
      {
        type: 'video',
        image: '/images/steer-programs.png',
        title: 'Livelihood Success Stories',
        label: 'Showcase',
        link: '#'
      }
    ],
    cta: {
      icon: '💼',
      title: 'Want To Know If You Are A Good Fit For Avni?',
      description: 'Try Our Livelihood Specific Use Cases',
      link: '/use-cases/livelihood'
    }
  },
  'Legal Aid': {
    description: [
      'Legal aid organizations face challenges in managing high caseloads, tracking case progress across multiple hearings, and ensuring timely follow-ups with vulnerable clients. Paper-based systems create delays in accessing case history, difficulty coordinating between lawyers and paralegals, and limited visibility into program outcomes.',
      'Avni streamlines legal aid delivery with digital case management, automated hearing reminders, and client communication tracking. Legal teams can maintain comprehensive case files, track court dates and documentation, coordinate with clients through SMS/call logs, and generate reports showing case resolution rates, types of legal issues addressed, and impact on beneficiary rights.'
    ],
    cards: [
      {
        type: 'case-study',
        image: '/images/simplify-data.png',
        title: 'Legal Case Management',
        label: 'Case Study',
        link: '#'
      },
      {
        type: 'video',
        image: '/images/build-trust.png',
        title: 'Digital Legal Aid Services',
        label: 'Showcase',
        link: '#'
      }
    ],
    cta: {
      icon: '⚖️',
      title: 'Want To Know If You Are A Good Fit For Avni?',
      description: 'Try Our Legal Aid Use Cases',
      link: '/use-cases/legal'
    }
  },
  'Sports': {
    description: [
      'Grassroots sports programs struggle to track athlete development, monitor training attendance, and identify talent across diverse communities. Manual systems make it difficult to maintain performance records, coordinate tournaments, and demonstrate program impact in building athletic skills and life skills among youth.',
      'Avni empowers sports programs with digital athlete profiles, training attendance tracking, and performance monitoring tools. Coaches can record fitness assessments, track skill progression, manage team selections, and coordinate events while program managers access dashboards showing participation rates, performance improvements, and tournament outcomes across different age groups and locations.'
    ],
    cards: [
      {
        type: 'case-study',
        image: '/images/education_impactstory.png',
        title: 'Grassroots Sports Development',
        label: 'Case Study',
        link: '#'
      },
      {
        type: 'video',
        image: '/images/simplify-data.png',
        title: 'Athlete Performance Tracking',
        label: 'Showcase',
        link: '#'
      }
    ],
    cta: {
      icon: '⚽',
      title: 'Want To Know If You Are A Good Fit For Avni?',
      description: 'Try Our Sports Specific Use Cases',
      link: '/use-cases/sports'
    }
  }
};

function SolutionsContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('Education');

  // Handle URL parameter for pre-selected solution
  useEffect(() => {
    const solution = searchParams.get('solution');
    if (solution && solutions.includes(solution)) {
      setActiveTab(solution);
    }
  }, [searchParams]);

  const currentContent = solutionContent[activeTab as keyof typeof solutionContent];
  const currentCards = solutionCards[activeTab] || solutionCards['Education'];

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-[72px]">
        {/* Hero Section */}
        <section className="relative px-6 lg:px-16 xl:px-24 py-12 lg:py-16">
          <div className="max-w-[1440px] mx-auto">
            <p className="font-anek font-bold text-[14px] leading-[20px] text-[#fba57f] uppercase tracking-[0.5px] mb-8">
              AVNI SOLUTIONS
            </p>

            {/* Mobile Horizontal Scroll */}
            <div className="lg:hidden overflow-x-auto pb-2 -mx-6 px-6 mb-8">
              <div className="flex gap-2 min-w-max bg-white rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-3">
                {solutions.map((solution) => (
                  <button
                    key={solution}
                    onClick={() => setActiveTab(solution)}
                    className={`px-4 py-2 font-anek text-[15px] whitespace-nowrap transition-all relative ${
                      activeTab === solution
                        ? 'font-bold text-[#0a1f3d]'
                        : 'font-medium text-[#5a6c7d]'
                    }`}
                  >
                    {solution}
                    {activeTab === solution && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FFD84D] rounded-full"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
              {/* Sidebar - Solutions Tabs (Desktop Only) */}
              <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
                <nav className="bg-white rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-6 space-y-2">
                  {solutions.map((solution) => (
                    <button
                      key={solution}
                      onClick={() => setActiveTab(solution)}
                      className={`w-full text-left px-4 py-3 font-anek text-[16px] leading-[24px] transition-all ${
                        activeTab === solution
                          ? 'font-bold text-[#0a1f3d]'
                          : 'font-medium text-[#5a6c7d] hover:text-[#0a1f3d]'
                      }`}
                    >
                      <span className="relative inline-block">
                        {solution}
                        {activeTab === solution && (
                          <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FFD84D]"></span>
                        )}
                      </span>
                    </button>
                  ))}
                </nav>
              </aside>

              {/* Description Paragraphs - Right Side */}
              <div className="space-y-6">
                {currentContent.description.map((paragraph, index) => (
                  <p
                    key={index}
                    className="font-noto text-[16px] lg:text-[17px] leading-[1.75] text-[#4a5568]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Cards Grid - Below Everything */}
            <div className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Content Cards */}
                  {currentCards.cards.map((card, index) => (
                    <Link
                      key={index}
                      href={card.link}
                      className="group bg-white rounded-[16px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-all"
                    >
                      <div className="relative aspect-[4/3] bg-gray-100">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-5 space-y-2">
                        <h3 className="font-anek font-semibold text-[16px] lg:text-[17px] leading-[1.4] text-[#0a1f3d] group-hover:text-[#419372] transition-colors">
                          {card.title}
                        </h3>
                        <p className="font-anek text-[14px] text-[#fba57f] uppercase tracking-wide">
                          {card.label}
                        </p>
                      </div>
                    </Link>
                  ))}

                  {/* CTA Card */}
                  <Link
                    href={currentCards.cta.link}
                    className="group bg-[#f7f9fc] rounded-[16px] p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition-all"
                  >
                    <div className="text-5xl">{currentCards.cta.icon}</div>
                    <div className="space-y-2">
                      <h3 className="font-anek font-bold text-[18px] lg:text-[19px] leading-[1.3] text-[#0a1f3d]">
                        {currentCards.cta.title}
                      </h3>
                      <p className="font-noto text-[15px] leading-[1.5] text-[#5a6c7d]">
                        {currentCards.cta.description}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

export default function SolutionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SolutionsContent />
    </Suspense>
  );
}
