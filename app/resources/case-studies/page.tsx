/**
 * Case Studies Page
 * Main listing page with featured case study, search, and filters
 */

import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { getFeaturedCaseStudy, getNonFeaturedCaseStudies } from '@/lib/markdown';
import CaseStudiesClient from './CaseStudiesClient';

export const metadata: Metadata = {
  title: 'Case Studies - Customer Journeys With Avni',
  description: 'Discover how NGOs across India use Avni to digitize field operations, track impact, and scale their programs. Read real success stories and implementation case studies.',
  keywords: ['case studies', 'NGO success stories', 'digital transformation', 'field work digitization', 'impact measurement'],
  openGraph: {
    title: 'Case Studies - Customer Journeys With Avni',
    description: 'Discover how NGOs use Avni to digitize field operations and scale impact.',
    url: '/resources/case-studies',
  },
};

export default async function CaseStudiesPage() {
  // Fetch data server-side
  const featuredCaseStudy = await getFeaturedCaseStudy();
  const caseStudies = await getNonFeaturedCaseStudies();

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-[#F5F5F5] pt-[72px]">
        {/* Hero Section */}
        <Section spacing="sm" className="bg-white py-8 md:py-12">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <p className="font-anek font-medium text-sm md:text-base leading-tight text-[#fba47e] uppercase mb-3">
                CASE STUDIES
              </p>
              <h1 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-[#0b2540] mb-3">
                Customer Journeys With Avni
              </h1>
              <p className="font-noto text-base md:text-lg lg:text-xl leading-relaxed text-[#000000]/70">
                Avni equips NGOs of all sizes and sectors to innovate with digitisation
              </p>
            </div>
          </Container>
        </Section>

        {/* Client-side components for search and filtering */}
        <CaseStudiesClient 
          featuredCaseStudy={featuredCaseStudy}
          caseStudies={caseStudies}
        />

        {/* CTA Section */}
        <Section spacing="lg" className="bg-white">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-anek font-bold text-3xl md:text-4xl text-[#0b2540] mb-4">
                Ready to Transform Your Field Operations?
              </h2>
              <p className="font-noto text-lg text-gray-700 mb-8">
                Join 60+ NGOs using Avni to digitize their field work and measure impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/trial"
                  className="px-8 py-3 bg-[#419372] text-white rounded-full font-anek font-medium text-base hover:bg-[#357a5e] transition-colors"
                >
                  Start Free Trial
                </a>
                <a
                  href="/contact"
                  className="px-8 py-3 border-2 border-[#419372] text-[#419372] rounded-full font-anek font-medium text-base hover:bg-[#419372] hover:text-white transition-colors"
                >
                  Schedule a Demo
                </a>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
