/**
 * Event Card Skeleton Loader
 * Shows loading state while events are being fetched
 */

export default function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-[24px] border border-gray-200 p-4 sm:p-6 md:p-8 w-full max-w-[1066px] mx-auto animate-pulse">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Content */}
        <div className="flex-1">
          {/* Tag Skeleton */}
          <div className="h-7 w-24 bg-gray-200 rounded-[4px] mb-3"></div>

          {/* Title Skeleton */}
          <div className="h-9 bg-gray-200 rounded mb-3 w-3/4"></div>

          {/* Description Skeleton */}
          <div className="space-y-2 mb-6">
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-5/6"></div>
          </div>

          {/* Meta Information Skeleton */}
          <div className="flex items-start gap-12 mb-6">
            {/* Date & Time */}
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded mt-0.5"></div>
              <div>
                <div className="h-3 w-20 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                <div className="h-4 w-28 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded mt-0.5"></div>
              <div>
                <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="h-10 w-32 bg-gray-200 rounded-full"></div>
        </div>

        {/* Image Skeleton */}
        <div className="w-full md:w-[280px] lg:w-[318px] h-[280px] md:h-[318px] bg-gray-200 rounded-[16px] flex-shrink-0"></div>
      </div>
    </div>
  );
}
