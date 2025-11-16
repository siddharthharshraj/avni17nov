/**
 * Written By & Tags Section
 * Displays author info and blog tags - 793×294px
 */

import Image from 'next/image';

interface WrittenBySectionProps {
  author: string | { name: string; avatar?: string };
  authorTitle?: string;
  date: string;
  tags?: string[];
}

export default function WrittenBySection({
  author,
  authorTitle,
  date,
  tags = [],
}: WrittenBySectionProps) {
  // Extract author name
  const authorName = typeof author === 'string' ? author : author?.name || 'Avni Team';

  return (
    <div 
      id="written-by-section" 
      className="border border-[#E5E7EB] rounded-[12px] p-8"
      style={{ width: '793px', minHeight: '294px' }}
    >
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column - WRITTEN BY */}
        <div>
          {/* Label - 88×16px */}
          <p 
            className="font-anek font-bold text-[16px] leading-[16px] tracking-[0px] uppercase mb-4"
            style={{ color: 'rgba(0, 0, 0, 0.7)' }}
          >
            WRITTEN BY
          </p>
          
          {/* Author Info */}
          <div className="flex items-start gap-4">
            {/* Avatar - 66×66px */}
            <div 
              className="rounded-full bg-[#419372] flex items-center justify-center flex-shrink-0"
              style={{ width: '66px', height: '66px' }}
            >
              <span className="font-anek font-bold text-2xl text-white">
                {authorName.charAt(0).toUpperCase()}
              </span>
            </div>
            
            {/* Author Details */}
            <div>
              <h3 className="font-anek font-semibold text-lg text-[#0b2540] mb-1">
                {authorName}
              </h3>
              <p className="font-noto text-sm text-[#6B7280]">
                {authorTitle || 'Avni Team'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - TAGS */}
        {tags.length > 0 && (
          <div>
            {/* Label - 88×16px */}
            <p 
              className="font-anek font-bold text-[16px] leading-[16px] tracking-[0px] uppercase mb-4"
              style={{ color: 'rgba(0, 0, 0, 0.7)' }}
            >
              TAGS
            </p>
            
            {/* Tags Container - 281×168px */}
            <div className="flex flex-wrap gap-2" style={{ maxWidth: '281px' }}>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-[#FF8854] text-white font-anek text-xs font-semibold uppercase rounded-md"
                  style={{ minHeight: '16px' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
