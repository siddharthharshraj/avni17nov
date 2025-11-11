/**
 * Blog Post Page Template
 * Dynamic route for individual blog posts with full SEO optimization
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getBlogBySlug, getAllBlogSlugs } from '@/lib/markdown';

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: `${blog.frontmatter.title} - Avni Blog`,
    description: blog.frontmatter.description,
    keywords: blog.frontmatter.tags || [],
    openGraph: {
      title: blog.frontmatter.title,
      description: blog.frontmatter.description,
      url: `/blog/${blog.slug}`,
      type: 'article',
      publishedTime: blog.frontmatter.date,
      authors: [blog.frontmatter.author || 'Avni Team'],
      images: [
        {
          url: blog.frontmatter.image,
          width: 1200,
          height: 630,
          alt: blog.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.frontmatter.title,
      description: blog.frontmatter.description,
      images: [blog.frontmatter.image],
    },
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  const { frontmatter, htmlContent } = blog;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-[72px]">
        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-[#419372] text-white text-sm font-medium rounded-full">
              {frontmatter.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-anek font-bold text-4xl md:text-5xl lg:text-6xl text-[#0b2540] mb-4">
            {frontmatter.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{frontmatter.author || 'Avni Team'}</span>
            </div>
            <span>•</span>
            <time dateTime={frontmatter.date}>
              {new Date(frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {frontmatter.readTime && (
              <>
                <span>•</span>
                <span>{frontmatter.readTime}</span>
              </>
            )}
          </div>

          {/* Featured Image */}
          {frontmatter.image && (
            <div className="relative aspect-video w-full mb-12 rounded-xl overflow-hidden">
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          )}

          {/* Content */}
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
              prose-code:text-[#419372] prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-blockquote:border-l-4 prose-blockquote:border-[#FFD84D] prose-blockquote:pl-4 prose-blockquote:italic"
            dangerouslySetInnerHTML={{ __html: htmlContent || '' }}
          />

          {/* Tags */}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="font-anek font-semibold text-lg text-gray-900 mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {frontmatter.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl">
            <h3 className="font-anek font-semibold text-lg text-gray-900 mb-2">
              About the Author
            </h3>
            <p className="text-gray-700">
              {frontmatter.author || 'Avni Team'} is part of the Avni team, working to empower NGOs with digital tools for field operations.
            </p>
          </div>

          {/* Share Buttons */}
          <div className="mt-8 flex items-center gap-4">
            <span className="font-medium text-gray-900">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(frontmatter.title)}&url=${encodeURIComponent(`https://avniproject.org/blog/${blog.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#419372] transition-colors"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://avniproject.org/blog/${blog.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#419372] transition-colors"
            >
              LinkedIn
            </a>
          </div>

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#419372] hover:text-[#357a5e] font-medium transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Blog
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
