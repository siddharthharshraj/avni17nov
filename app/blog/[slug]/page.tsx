/**
 * Blog Detail Page Template
 * Matches Figma design with sticky sidebar behavior
 * https://www.figma.com/design/mIajDP8cdoIgNPhIvkpnKP/Website---ready-for-dev?node-id=121-334
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getBlogBySlug, getAllBlogSlugs, getAllBlogs } from '@/lib/markdown';
import { generateBlogSEO, generateBlogJSONLD, generateBlogBreadcrumbJSONLD } from '@/lib/seo/blog-seo';
import { getSmartRelatedPosts } from '@/lib/blog/related-posts';
import CategoryBadge from '@/components/blog/CategoryBadge';
import WrittenBySection from '@/components/blog/WrittenBySection';
import BlogContent from '@/components/blog/BlogContent';
import BlogCard from '@/components/blog/BlogCard';
import SmartStickySidebar from '@/components/blog/SmartStickySidebar';
import BlogMetaInfo from '@/components/blog/BlogMetaInfo';
import BlogShareCTA from '@/components/blog/BlogShareCTA';

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return generateBlogSEO(blog);
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const { frontmatter, htmlContent } = blog;

  // Generate JSON-LD structured data
  const blogJSONLD = generateBlogJSONLD(blog);
  const breadcrumbJSONLD = generateBlogBreadcrumbJSONLD(blog);

  // Get smart related posts using the new algorithm
  const allBlogs = await getAllBlogs();
  const relatedPosts = getSmartRelatedPosts(slug, allBlogs, 3);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJSONLD) }}
      />
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJSONLD) }}
      />

      <Header />

      <main className="min-h-screen bg-white pt-[72px]">
        {/* Header Section - Fully Responsive */}
        <div className="bg-[#F8F9FA] border-b border-gray-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            {/* Back to All Cases */}
            <div className="pt-6 sm:pt-8 pb-4 sm:pb-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[#419372] font-noto text-sm font-medium hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to All Cases</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </div>

            {/* Header Content - Responsive */}
            <div className="pb-8 sm:pb-10 md:pb-12">
              {/* Category Badge */}
              {frontmatter.category && (
                <div className="mb-4 sm:mb-6">
                  <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#FFE5E5] text-[#FF6B6B] font-anek font-semibold text-xs uppercase tracking-wide rounded-md">
                    {frontmatter.category}
                  </span>
                </div>
              )}

              {/* Title - Fluid Typography */}
              <h1 className="font-anek font-bold text-[clamp(28px,5vw,56px)] text-[#0b2540] mb-4 sm:mb-6 leading-[1.2] max-w-[900px]">
                {frontmatter.title}
              </h1>

              {/* Subtitle/Description - Responsive */}
              {frontmatter.description && (
                <p className="font-noto text-base sm:text-lg md:text-xl text-[#6B7280] leading-relaxed max-w-[800px]">
                  {frontmatter.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Article Container - Responsive */}
        <article className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16 mt-8 sm:mt-12">

          {/* Blog Content - Main Column with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px] gap-8">
            <div id="blog-content-area" className="min-w-0 overflow-hidden">
              {/* Markdown Content - Images will appear in their markdown order */}
              <BlogContent htmlContent={htmlContent || ''} />

              {/* Written By & Tags Section */}
              <WrittenBySection
                author={frontmatter.author || 'Avni Team'}
                authorTitle={frontmatter.authorTitle}
                date={frontmatter.date}
                tags={frontmatter.tags}
              />
            </div>

            {/* Sidebar - Desktop Only */}
            <div className="hidden lg:block">
              <SmartStickySidebar
                date={frontmatter.date}
                author={frontmatter.author || 'Avni Team'}
                readTime={frontmatter.readTime || frontmatter.readingTime || '5 mins.'}
                title={frontmatter.title}
                slug={slug}
              />
            </div>
          </div>

          {/* Mobile Sidebar - Show only on mobile */}
          <div className="lg:hidden mt-12 space-y-4">
            <BlogMetaInfo
              date={frontmatter.date}
              author={frontmatter.author || 'Avni Team'}
              readTime={frontmatter.readTime || frontmatter.readingTime || '5 mins.'}
            />
            <BlogShareCTA
              title={frontmatter.title}
              slug={slug}
            />
          </div>

        </article>

        {/* Related Posts - Full width background */}
        {relatedPosts.length > 0 && (
          <div className="w-full bg-gradient-to-b from-[#E9EAF8]/40 to-[#E9EAF8]/60 py-16 lg:py-20">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
              <div className="text-center mb-12">
                <p className="font-anek font-semibold text-sm text-[#419372] uppercase tracking-wide mb-3">
                  CONTINUE READING
                </p>
                <h2 className="font-anek font-bold text-3xl lg:text-4xl text-[#0b2540] mb-4">
                  You Might Also Like
                </h2>
                <p className="font-noto text-base lg:text-lg text-[#6B7280] max-w-2xl mx-auto">
                  Discover more insights and stories from the Avni community
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {relatedPosts.slice(0, 3).map((post) => (
                  <BlogCard key={post.slug} blog={post} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
