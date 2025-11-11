/**
 * Case Study Page Template
 * Dynamic route for individual case studies with full SEO optimization
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/seo/Breadcrumb';
import { BlogPostingSchema } from '@/components/seo/StructuredData';
import { generateCaseStudyMetadata } from '@/lib/seo/metadata';

interface CaseStudy {
  slug: string;
  title: string;
  description: string;
  content: string;
  organization: string;
  sector: string;
  location: string;
  image?: string;
  publishedAt: string;
  tags: string[];
  stats?: Array<{
    label: string;
    value: string;
  }>;
  draft?: boolean;
}

// Mock function - replace with actual data fetching
async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  // TODO: Fetch from CMS, markdown files, or database
  return null;
}

// Mock function - replace with actual data fetching
async function getAllCaseStudySlugs(): Promise<string[]> {
  // TODO: Fetch all case study slugs for static generation
  return [];
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const caseStudy = await getCaseStudy(params.slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return generateCaseStudyMetadata({
    title: caseStudy.title,
    description: caseStudy.description,
    slug: caseStudy.slug,
    image: caseStudy.image,
    publishedAt: caseStudy.publishedAt,
    organization: caseStudy.organization,
    sector: caseStudy.sector,
    tags: caseStudy.tags,
    draft: caseStudy.draft,
  });
}

// Generate static params for all case studies
export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const caseStudy = await getCaseStudy(params.slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <Header />
      
      {/* Structured Data */}
      <BlogPostingSchema
        title={`${caseStudy.title} - ${caseStudy.organization}`}
        description={caseStudy.description}
        url={`/case-studies/${caseStudy.slug}`}
        image={caseStudy.image}
        publishedAt={caseStudy.publishedAt}
        author={caseStudy.organization}
        keywords={caseStudy.tags}
      />

      <main className="min-h-screen bg-white pt-[72px]">
        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-6 pt-8">
          <Breadcrumb
            items={[
              { name: 'Case Studies', url: '/case-studies' },
              { name: caseStudy.title, url: `/case-studies/${caseStudy.slug}` },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              {/* Sector Badge */}
              <span className="inline-block px-3 py-1 bg-[#419372] text-white text-sm font-medium rounded-full mb-4">
                {caseStudy.sector}
              </span>

              {/* Title */}
              <h1 className="font-anek font-bold text-4xl md:text-5xl text-[#0b2540] mb-4">
                {caseStudy.title}
              </h1>

              {/* Organization & Location */}
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{caseStudy.organization}</span>
                </div>
                <span>•</span>
                <span>{caseStudy.location}</span>
              </div>

              {/* Description */}
              <p className="font-noto text-lg text-gray-700 mb-8">
                {caseStudy.description}
              </p>

              {/* Stats */}
              {caseStudy.stats && caseStudy.stats.length > 0 && (
                <div className="grid grid-cols-2 gap-6">
                  {caseStudy.stats.map((stat, index) => (
                    <div key={index} className="border-l-4 border-[#FFD84D] pl-4">
                      <div className="font-anek font-bold text-3xl text-[#0b2540] mb-1">
                        {stat.value}
                      </div>
                      <div className="font-noto text-sm text-gray-600">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Image */}
            {caseStudy.image && (
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-xl">
                <Image
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </section>

        {/* Content */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-anek prose-headings:font-bold prose-headings:text-[#0b2540]
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-[#419372] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:my-6 prose-ol:my-6
              prose-li:text-gray-700 prose-li:mb-2
              prose-img:rounded-lg prose-img:shadow-lg
              prose-blockquote:border-l-4 prose-blockquote:border-[#FFD84D] prose-blockquote:pl-4 prose-blockquote:italic"
            dangerouslySetInnerHTML={{ __html: caseStudy.content }}
          />

          {/* Tags */}
          {caseStudy.tags && caseStudy.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="font-anek font-semibold text-lg text-gray-900 mb-4">
                Related Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-br from-[#419372] to-[#357a5e] rounded-xl p-8 md:p-12 text-center text-white">
            <h2 className="font-anek font-bold text-3xl md:text-4xl mb-4">
              Ready to Transform Your Field Operations?
            </h2>
            <p className="font-noto text-lg mb-8 opacity-90">
              Join 60+ NGOs using Avni to digitize their field work and measure impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3 bg-white text-[#419372] font-anek font-medium rounded-full hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/solutions"
                className="px-8 py-3 border-2 border-white text-white font-anek font-medium rounded-full hover:bg-white hover:text-[#419372] transition-colors"
              >
                Explore Solutions
              </Link>
            </div>
          </div>
        </section>

        {/* Related Case Studies - TODO: Implement */}
        <section className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-200">
          <h2 className="font-anek font-bold text-3xl text-[#0b2540] mb-8">
            More Success Stories
          </h2>
          <p className="text-gray-600">More case studies coming soon...</p>
        </section>
      </main>

      <Footer />
    </>
  );
}
