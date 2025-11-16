/**
 * Past Event Card Skeleton Loader
 * Shows loading state while past events are being fetched
 */

export default function PastEventSkeleton() {
  return (
    <div className="bg-white rounded-[16px] border border-gray-200 p-6 animate-pulse">
      {/* Title Skeleton */}
      <div className="h-6 bg-gray-200 rounded mb-4 w-4/5"></div>

      {/* Date Skeleton */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-4 h-4 bg-gray-200 rounded"></div>
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>

      {/* Location Skeleton */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-200 rounded"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
