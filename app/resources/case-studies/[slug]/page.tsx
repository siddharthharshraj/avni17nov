/**
 * Individual Case Study Page
 * Dynamic route for displaying full case study content
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import MarkdownContent from '@/components/ui/MarkdownContent';
import { getCaseStudyBySlug, getAllCaseStudySlugs } from '@/lib/markdown';
import { getSectorColor } from '@/lib/filters';

// Generate static params for all case studies
export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const caseStudy = await getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }

  const { frontmatter } = caseStudy;

  return {
    title: `${frontmatter.title} - Avni Case Study`,
    description: frontmatter.description,
    keywords: frontmatter.tags || [frontmatter.sector, 'case study', 'NGO', 'digital transformation'],
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `/resources/case-studies/${params.slug}`,
      type: 'article',
      publishedTime: frontmatter.date,
      authors: [frontmatter.author || 'Avni Team'],
      images: [
        {
          url: frontmatter.logo,
          alt: frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: [frontmatter.logo],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const caseStudy = await getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  const { frontmatter, htmlContent } = caseStudy;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-[72px]">
        {/* Breadcrumb */}
        <Section spacing="sm" className="bg-[#F5F5F5]">
          <Container>
            <nav className="flex items-center gap-2 text-sm font-noto">
              <Link href="/" className="text-gray-600 hover:text-[#419372] transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/resources/case-studies" className="text-gray-600 hover:text-[#419372] transition-colors">
                Case Studies
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-[#0b2540] font-medium truncate">{frontmatter.title}</span>
            </nav>
          </Container>
        </Section>

        {/* Hero Section */}
        <Section spacing="lg" className="bg-[#F5F5F5]">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* Logo */}
              <div className="mb-6">
                <div className="relative w-40 h-20">
                  <Image
                    src={frontmatter.logo}
                    alt={frontmatter.title}
                    fill
                    className="object-contain object-left"
                    priority
                    sizes="160px"
                  />
                </div>
              </div>

              {/* Sector Badge */}
              <div className="mb-6">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-anek font-medium ${getSectorColor(frontmatter.sector)}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0L10.472 5.528L16 8L10.472 10.472L8 16L5.528 10.472L0 8L5.528 5.528L8 0Z" fill="currentColor" opacity="0.6"/>
                  </svg>
                  {frontmatter.sector.toUpperCase()}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0b2540] mb-6">
                {frontmatter.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 4V8L10.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{frontmatter.readTime || '5 min read'}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.6667 2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4V12.6667C2 13.403 2.59695 14 3.33333 14H12.6667C13.403 14 14 13.403 14 12.6667V4C14 3.26362 13.403 2.66667 12.6667 2.66667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.6667 1.33334V4.00001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.33333 1.33334V4.00001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 6.66667H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <time dateTime={frontmatter.date}>
                    {new Date(frontmatter.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </time>
                </div>
                {frontmatter.author && (
                  <>
                    <span>•</span>
                    <span>By {frontmatter.author}</span>
                  </>
                )}
              </div>
            </div>
          </Container>
        </Section>

        {/* Content */}
        <Section spacing="lg">
          <Container>
            <article className="max-w-4xl mx-auto">
              <MarkdownContent htmlContent={htmlContent || ''} />

              {/* Tags */}
              {frontmatter.tags && frontmatter.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="font-anek font-semibold text-lg text-gray-900 mb-4">
                    Related Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full font-noto hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section spacing="lg" className="bg-[#F5F5F5]">
          <Container>
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#419372] to-[#357a5e] rounded-[24px] p-8 md:p-12 text-center text-white">
              <h2 className="font-anek font-bold text-3xl md:text-4xl mb-4">
                Ready to Transform Your Field Operations?
              </h2>
              <p className="font-noto text-lg mb-8 opacity-90">
                Join 60+ NGOs using Avni to digitize their field work and measure impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/trial"
                  className="px-8 py-3 bg-white text-[#419372] font-anek font-medium rounded-full hover:bg-gray-100 transition-colors"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/resources/case-studies"
                  className="px-8 py-3 border-2 border-white text-white font-anek font-medium rounded-full hover:bg-white hover:text-[#419372] transition-colors"
                >
                  View More Case Studies
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
