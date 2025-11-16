'use client';

/**
 * Blog Meta Info Component
 * Displays date, author, and read time
 */

interface BlogMetaInfoProps {
  date: string;
  author: string | { name: string; avatar?: string };
  readTime?: string;
}

export default function BlogMetaInfo({ date, author, readTime }: BlogMetaInfoProps) {
  // Extract author name
  const authorName = typeof author === 'string' ? author : author?.name || 'Avni Team';
  
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="bg-white border border-[#EBEBEB] rounded-[20px] p-6" style={{ width: '310px' }}>
      {/* DATE */}
      <div className="mb-6">
        <p className="font-anek font-bold text-[16px] leading-[16px] tracking-[0px] uppercase mb-2" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
          DATE
        </p>
        <p className="font-anek font-medium text-lg text-[#0b2540]">
          {formattedDate}
        </p>
      </div>

      {/* WRITTEN BY */}
      <div className="mb-6">
        <p className="font-anek font-bold text-[16px] leading-[16px] tracking-[0px] uppercase mb-2" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
          WRITTEN BY
        </p>
        <p className="font-anek font-medium text-lg text-[#0b2540]">
          {authorName}
        </p>
      </div>

      {/* EST. READ TIME */}
      {readTime && (
        <div>
          <p className="font-anek font-bold text-[16px] leading-[16px] tracking-[0px] uppercase mb-2" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
            EST. READ TIME
          </p>
          <p className="font-anek font-medium text-lg text-[#0b2540]">
            {readTime}
          </p>
        </div>
      )}
    </div>
  );
}
