/**
 * Case Study Page - Full Design Spec Implementation
 * - Two-column hero with conditional image rendering
 * - Proper typography (Anek Latin, Noto Sans)
 * - Quote blocks with lavender background
 * - Related case studies section
 * - Fully responsive
 * - SEO optimized
 * - Performance optimized with Next.js Image
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CaseStudyContent from '@/components/case-studies/CaseStudyContent';
import RelatedCaseStudies from '@/components/case-studies/RelatedCaseStudies';
import { 
  getCaseStudyBySlug, 
  getAllCaseStudySlugs, 
  getRelatedCaseStudies 
} from '@/lib/markdown';

// Generate static params for all case studies at build time
export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

// Enable dynamic params for newly added case studies
export const dynamicParams = true;

// Use dynamic rendering during development
export const dynamic = 'auto';
export const revalidate = 3600; // Revalidate every hour

// Generate rich metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found - Avni',
      description: 'The requested case study could not be found.',
    };
  }

  const { title, description, date, author, sector, logo, tags } = caseStudy.frontmatter;
  const url = `https://avniproject.org/resources/case-studies/${slug}`;

  return {
    title: `${title} | Avni Case Study`,
    description: description || `Learn how ${title} uses Avni for digital transformation`,
    keywords: [sector, ...(tags || []), 'Avni', 'case study', 'NGO', 'digital transformation', 'field data collection'],
    authors: [{ name: author || 'Avni Team' }],
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: date,
      authors: author ? [author] : undefined,
      images: [
        {
          url: logo,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: 'Avni',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [logo],
      creator: '@avniproject',
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const relatedCaseStudies = await getRelatedCaseStudies(slug, 3);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-[72px]">
        {/* Back to All Cases Link */}
        <div className="px-4 sm:px-6 lg:px-16 xl:px-24 py-6 border-b border-[#E6E6E6]">
          <Link 
            href="/resources/case-studies" 
            className="inline-flex items-center gap-2 text-[#419372] font-noto text-base hover:underline transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back To All Cases
          </Link>
        </div>

        {/* Hero Section - Two Column Layout */}
        <section className="px-4 sm:px-6 lg:px-16 xl:px-24 py-8 sm:py-12 lg:py-16 bg-[#E9EAF8]">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column: Logo + Title + Metadata */}
              <div className="space-y-4 sm:space-y-6">
                {/* Organization Logo */}
                <div className="w-24 h-20 sm:w-28 sm:h-24 md:w-32 md:h-28 relative border border-[#E6E6E6] rounded-[8px] sm:rounded-[12px] bg-white p-3 sm:p-4 flex items-center justify-center">
                  <Image
                    src={caseStudy.frontmatter.logo}
                    alt={caseStudy.frontmatter.title}
                    fill
                    className="object-contain p-2"
                    priority
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                  />
                </div>

                {/* Title */}
                <h1 className="font-anek font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.2] text-[#0B2540]">
                  {caseStudy.frontmatter.title}
                </h1>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#666666] font-noto">
                  {caseStudy.frontmatter.readTime && (
                    <>
                      <span className="inline-flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="sm:w-4 sm:h-4">
                          <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M8 4V8L10.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        {caseStudy.frontmatter.readTime}
                      </span>
                      <span className="hidden sm:inline">•</span>
                    </>
                  )}
                  <time dateTime={caseStudy.frontmatter.date} className="hidden sm:inline">
                    {new Date(caseStudy.frontmatter.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </time>
                  {caseStudy.frontmatter.author && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline">By {caseStudy.frontmatter.author}</span>
                    </>
                  )}
                </div>

                {/* Sector Tag */}
                <div>
                  <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#FFF5F0] text-[#FF8854] text-xs sm:text-sm font-anek font-semibold rounded-full uppercase tracking-wide">
                    {caseStudy.frontmatter.sector}
                  </span>
                </div>
              </div>

              {/* Right Column: Hero Image (if exists) */}
              {caseStudy.frontmatter.heroImage && (
                <div className="relative aspect-[16/9] lg:aspect-[4/3] rounded-[12px] sm:rounded-[16px] overflow-hidden shadow-lg">
                  <Image
                    src={caseStudy.frontmatter.heroImage}
                    alt={caseStudy.frontmatter.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <CaseStudyContent content={caseStudy.content} />

        {/* Related Case Studies */}
        {relatedCaseStudies.length > 0 && (
          <RelatedCaseStudies caseStudies={relatedCaseStudies} />
        )}
      </main>

      <Footer />
    </>
  );
}
