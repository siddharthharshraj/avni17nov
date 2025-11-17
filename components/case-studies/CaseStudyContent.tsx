/**
 * Case Study Content Component
 * Renders markdown content with proper styling
 * - Typography: Noto Sans (body), Anek Latin (headings)
 * - Quote blocks with lavender background
 * - Images with rounded corners
 * - Fully responsive
 */

'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import remarkGfm from 'remark-gfm';

interface CaseStudyContentProps {
  content: string;
}

export default function CaseStudyContent({ content }: CaseStudyContentProps) {
  return (
    <section className="px-4 sm:px-6 lg:px-16 xl:px-24 py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-[1140px] mx-auto">
        <div className="max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Headings - Anek Latin, bold
              h1: ({ node, ...props }) => (
                <h1
                  className="font-anek font-bold text-[36px] sm:text-[42px] leading-[1.2] text-[#0B2540] mt-12 mb-6 first:mt-0"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="font-anek font-bold text-[30px] leading-[24px] text-[#0B2540] mt-10 mb-5 first:mt-0"
                  {...props}
                />
              ),
              h3: ({ node, ...props}) => (
                <h3
                  className="font-anek font-bold text-[30px] leading-[24px] text-[#0B2540] mt-8 mb-4"
                  {...props}
                />
              ),
              // Paragraphs - Noto Sans
              p: ({ node, children, ...props }) => {
                // Check if paragraph contains only an image (to avoid div inside p)
                const hasOnlyImage = node?.children?.length === 1 && 
                  node.children[0].type === 'element' && 
                  node.children[0].tagName === 'img';
                
                // If paragraph contains only an image, render as fragment to avoid nesting issues
                if (hasOnlyImage) {
                  return <>{children}</>;
                }
                
                return (
                  <p
                    className="font-noto font-normal text-[24px] leading-[36px] tracking-[0px] text-[#000000] mb-6"
                    {...props}
                  >
                    {children}
                  </p>
                );
              },
              // Blockquotes - Lavender background, centered, italic
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="bg-[#F5F3FF] rounded-[12px] px-8 sm:px-12 lg:px-16 py-8 sm:py-10 lg:py-12 my-10 sm:my-12 border-none text-center"
                  {...props}
                />
              ),
              // Lists
              ul: ({ node, ...props }) => (
                <ul
                  className="font-noto font-normal text-[24px] leading-[36px] tracking-[0px] text-[#000000] mb-6 space-y-2 list-disc pl-8 marker:text-[#0B2540]"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="font-noto font-normal text-[24px] leading-[36px] tracking-[0px] text-[#000000] mb-6 space-y-2 list-decimal pl-8 marker:text-[#0B2540]"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li className="mb-2 pl-2" {...props} />
              ),
              // Strong text
              strong: ({ node, ...props }) => (
                <strong className="font-semibold" {...props} />
              ),
              // Images - Rounded corners, fully responsive with captions
              img: ({ node, ...props }) => {
                const src = props.src || '';
                const alt = props.alt || '';
                const title = props.title || '';
                
                // Check if it's a YouTube embed
                if (src.includes('youtube.com') || src.includes('youtu.be')) {
                  const videoId = src.includes('youtu.be') 
                    ? src.split('youtu.be/')[1]?.split('?')[0]
                    : src.split('v=')[1]?.split('&')[0];
                  
                  if (videoId) {
                    return (
                      <span className="block my-8 sm:my-10 lg:my-12">
                        <span className="block relative w-full rounded-[12px] sm:rounded-[16px] overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={alt || 'YouTube video'}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                          />
                        </span>
                        {(title || alt) && (
                          <span className="block text-center text-sm sm:text-base text-[#666666] mt-3 sm:mt-4 font-noto italic">
                            {title || alt}
                          </span>
                        )}
                      </span>
                    );
                  }
                }
                
                return (
                  <span className="block my-8 sm:my-10 lg:my-12">
                    <span className="block relative w-full rounded-[12px] sm:rounded-[16px] overflow-hidden shadow-lg">
                      <img
                        src={src}
                        alt={alt}
                        className="w-full h-auto object-cover rounded-[12px] sm:rounded-[16px]"
                        loading="lazy"
                      />
                    </span>
                    {(title || (alt && alt !== 'Image')) && (
                      <span className="block text-center text-sm sm:text-base text-[#666666] mt-3 sm:mt-4 font-noto italic">
                        {title || alt}
                      </span>
                    )}
                  </span>
                );
              },
              // Links
              a: ({ node, ...props }) => (
                <a
                  className="text-[#419372] hover:underline font-medium transition-all"
                  target={props.href?.startsWith('http') ? '_blank' : undefined}
                  rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  {...props}
                />
              ),
              // Code blocks
              code: ({ node, inline, ...props }: any) => {
                if (inline) {
                  return (
                    <code
                      className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono"
                      {...props}
                    />
                  );
                }
                return (
                  <code
                    className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-6"
                    {...props}
                  />
                );
              },
              // Horizontal rules
              hr: ({ node, ...props }) => (
                <hr className="border-t border-[#E6E6E6] my-10 sm:my-12" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  );
}
