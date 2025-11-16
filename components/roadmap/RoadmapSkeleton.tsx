/**
 * Roadmap Skeleton Component
 * Loading state for the roadmap board - responsive across all screen sizes
 */

'use client';

export default function RoadmapSkeleton() {
  // Number of columns to show in skeleton
  const columns = 4;
  // Number of cards per column in skeleton
  const cardsPerColumn = [3, 2, 4, 2];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
      {/* Header Skeleton */}
      <div className="mb-6 md:mb-8 lg:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 md:mb-6">
          {/* Title skeleton */}
          <div className="space-y-3">
            <div className="h-8 md:h-10 lg:h-12 bg-gray-200 rounded-lg w-48 md:w-64 animate-pulse"></div>
            <div className="h-4 md:h-5 bg-gray-200 rounded-lg w-64 md:w-80 animate-pulse"></div>
          </div>
          
          {/* Action buttons skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-9 md:h-10 bg-gray-200 rounded-full w-32 md:w-36 animate-pulse"></div>
            <div className="h-9 md:h-10 bg-gray-200 rounded-lg w-24 md:w-28 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Board Container Skeleton */}
      <div className="bg-white border border-gray-200 rounded-[12px] shadow-lg overflow-hidden">
        {/* Keyboard navigation hint skeleton */}
        <div className="bg-[#F3F4F6] border-b border-gray-200 px-5 md:px-6 lg:px-8 py-2">
          <div className="h-3 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>

        {/* Scrollable Board Content Skeleton */}
        <div className="p-5 md:p-6 lg:p-8 overflow-x-auto">
          <div className="flex gap-4 md:gap-5 lg:gap-6">
            {Array.from({ length: columns }).map((_, columnIndex) => (
              <div key={columnIndex} className="flex">
                {/* Column Skeleton */}
                <div className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[360px]">
                  {/* Column Header Skeleton */}
                  <div className="bg-white mb-4 md:mb-5 pb-3 border-b-2 border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-5 md:h-6 bg-gray-200 rounded w-32 md:w-40 animate-pulse"></div>
                      <div className="w-7 h-7 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Cards Skeleton */}
                  <div className="space-y-3 md:space-y-3.5">
                    {Array.from({ length: cardsPerColumn[columnIndex] || 3 }).map((_, cardIndex) => (
                      <div
                        key={cardIndex}
                        className="bg-white rounded-[12px] border-2 border-gray-200 p-4 md:p-5 animate-pulse"
                      >
                        {/* Card Title Skeleton */}
                        <div className="mb-3">
                          <div className="h-4 md:h-5 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="h-4 md:h-5 bg-gray-200 rounded w-3/4"></div>
                        </div>

                        {/* Labels Skeleton */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <div className="h-6 bg-gray-200 rounded-full w-16 md:w-20"></div>
                          <div className="h-6 bg-gray-200 rounded-full w-20 md:w-24"></div>
                          {cardIndex % 2 === 0 && (
                            <div className="h-6 bg-gray-200 rounded-full w-12 md:w-16"></div>
                          )}
                        </div>

                        {/* Metadata Skeleton */}
                        <div className="flex items-center justify-between pt-3 border-t-2 border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 md:w-6 md:h-6 bg-gray-200 rounded-full"></div>
                            <div className="h-3 bg-gray-200 rounded w-20 md:w-24"></div>
                          </div>
                          <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-200 rounded-lg"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column Separator */}
                {columnIndex < columns - 1 && (
                  <div className="w-px bg-gray-200 mx-4 md:mx-5 lg:mx-6 flex-shrink-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pulsing animation style */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
