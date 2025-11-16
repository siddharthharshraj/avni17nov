/**
 * Roadmap Column Component
 * Displays a column of project items
 */

import RoadmapCard from './RoadmapCard';
import type { ProjectItem } from '@/types/github-project';

interface RoadmapColumnProps {
  title: string;
  items: ProjectItem[];
  color?: string;
  hideHeader?: boolean;
}

export default function RoadmapColumn({ title, items, color, hideHeader = false }: RoadmapColumnProps) {
  return (
    // Fixed width column, height determined by content only
    <div className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[360px]">
      {/* Column Header - Always visible now */}
      {!hideHeader && (
        <div className="bg-white mb-4 md:mb-5 pb-3 border-b-2 border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-anek font-bold text-[16px] md:text-[18px] leading-tight text-[#0b2540] uppercase tracking-wide">
              {title}
            </h3>
            <span 
              className="flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-bold text-white shadow-sm bg-gray-500"
            >
              {items.length}
            </span>
          </div>
        </div>
      )}

      {/* Cards - Natural height, no forced stretching */}
      <div className="space-y-3 md:space-y-3.5">
        {items.length === 0 ? (
          <div className="bg-gray-50/50 rounded-[10px] border border-dashed border-gray-200 p-8 text-center">
            <p className="font-noto text-[13px] text-gray-400">
              No items
            </p>
          </div>
        ) : (
          items.map((item) => (
            <RoadmapCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}
