'use client';

/**
 * Blog Preview Component
 * Renders blog using real blog layout components
 * Pixel-identical to published blogs
 */

import { ContentBlock } from '@/lib/cms/types';
import { blocksToMarkdown } from '@/lib/cms/markdown-converter';
import MarkdownContent from '@/components/ui/MarkdownContent';

interface BlogPreviewProps {
  title: string;
  description: string;
  featuredImage: string;
  tags: string[];
  contentBlocks: ContentBlock[];
  author: string;
  date: string;
}

export default function BlogPreview({
  title,
  description,
  featuredImage,
  tags,
  contentBlocks,
  author,
  date,
}: BlogPreviewProps) {
  const markdown = blocksToMarkdown(contentBlocks);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section - Matches real blog layout */}
      <div className="bg-[#F8F9FA] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="pb-8 sm:pb-10 md:pb-12 pt-8">
            {/* Category Badge */}
            <div className="mb-4 sm:mb-6">
              <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#FFE5E5] text-[#FF6B6B] font-anek font-semibold text-xs uppercase tracking-wide rounded-md">
                PREVIEW
              </span>
            </div>

            {/* Title */}
            <h1 className="font-anek font-bold text-[clamp(28px,5vw,56px)] text-[#0b2540] mb-4 sm:mb-6 leading-[1.2] max-w-[900px]">
              {title || 'Untitled Blog Post'}
            </h1>

            {/* Description */}
            {description && (
              <p className="font-noto text-base sm:text-lg md:text-xl text-[#6B7280] leading-relaxed max-w-[800px]">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Article Container */}
      <article className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16 mt-8 sm:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px] gap-8">
          <div className="min-w-0 overflow-hidden">
            {/* Featured Image */}
            {featuredImage && (
              <div className="mb-8">
                <img
                  src={featuredImage}
                  alt={title}
                  className="w-full rounded-2xl border border-gray-200"
                />
              </div>
            )}

            {/* Markdown Content */}
            <MarkdownContent htmlContent={markdown} />

            {/* Tags Section */}
            {tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="font-anek font-bold text-sm uppercase text-gray-600 mb-4">
                  TAGS
                </p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-4 py-2 bg-[#E9EAF8] text-[#FF8854] font-anek font-extrabold text-xs uppercase rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Meta Info */}
          <div className="hidden lg:block">
            <div className="bg-white border border-[#EBEBEB] rounded-[20px] p-6 sticky top-24">
              <div className="mb-6">
                <p className="font-anek font-bold text-sm uppercase mb-2 text-gray-600">
                  AUTHOR
                </p>
                <p className="font-anek font-medium text-lg text-[#0b2540]">
                  {author}
                </p>
              </div>

              <div>
                <p className="font-anek font-bold text-sm uppercase mb-2 text-gray-600">
                  DATE
                </p>
                <p className="font-anek font-medium text-lg text-[#0b2540]">
                  {new Date(date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
