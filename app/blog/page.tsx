/**
 * Blog Page
 * Main listing page with featured blog, search, and filters
 * SEO optimized with proper metadata and structured data
 */

import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { getFeaturedBlog, getNonFeaturedBlogs } from '@/lib/markdown';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog - Real Stories Of Digital Transformation With Avni',
  description: 'Explore user stories, technical deep dives, and the latest updates driving social impact. Read insights from NGOs using Avni to digitize field operations.',
  keywords: ['Avni blog', 'NGO stories', 'digital transformation', 'field work', 'social impact', 'technical insights', 'user stories'],
  openGraph: {
    title: 'Blog - Real Stories Of Digital Transformation With Avni',
    description: 'Explore user stories, technical deep dives, and the latest updates driving social impact.',
    url: '/blog',
    type: 'website',
    images: [
      {
        url: '/images/goonj-featured.jpg',
        width: 1200,
        height: 630,
        alt: 'Avni Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Real Stories Of Digital Transformation With Avni',
    description: 'Explore user stories, technical deep dives, and the latest updates driving social impact.',
    images: ['/images/goonj-featured.jpg'],
  },
  alternates: {
    canonical: '/blog',
  },
};

export default async function BlogPage() {
  // Fetch data server-side
  const featuredBlog = await getFeaturedBlog();
  const blogs = await getNonFeaturedBlogs();

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-[#F5F5F5] pt-[72px]">
        {/* Hero Section */}
        <Section spacing="sm" className="bg-white py-8 md:py-12">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <p className="font-anek font-medium text-sm md:text-base leading-tight text-[#fba47e] uppercase mb-3">
                AVNI BLOG: PEOPLE, PLATFORM, PROGRESS
              </p>
              <h1 className="font-anek font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-[#0b2540] mb-3">
                Real Stories Of Digital Transformation With Avni
              </h1>
              <p className="font-noto text-base md:text-lg lg:text-xl leading-relaxed text-[#000000]/70">
                Explore user stories, technical deep dives, and the latest updates driving social impact
              </p>
            </div>
          </Container>
        </Section>

        {/* Client-side components for search and filtering */}
        <BlogClient 
          featuredBlog={featuredBlog}
          blogs={blogs}
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
                  href="https://calendly.com/avni-marketing-samanvayfoundation/30min"
                  target="_blank"
                  rel="noopener noreferrer"
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
