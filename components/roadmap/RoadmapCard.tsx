/**
 * Roadmap Card Component
 * Displays a single project item card
 */

import { ExternalLink } from 'lucide-react';
import type { ProjectItem } from '@/types/github-project';

interface RoadmapCardProps {
  item: ProjectItem;
}

export default function RoadmapCard({ item }: RoadmapCardProps) {
  return (
    <div className="group bg-white rounded-[12px] border-2 border-gray-200 p-4 md:p-5 hover:border-[#419372] hover:shadow-lg transition-all duration-200 cursor-pointer">
      {/* Title - Bold and prominent */}
      <h4 className="font-anek font-bold text-[15px] md:text-[16px] leading-[1.5] text-[#0b2540] mb-3 group-hover:text-[#419372] transition-colors">
        {item.title}
      </h4>

      {/* Labels - Clear, colorful badges with better spacing */}
      {item.content?.labels && item.content.labels.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {item.content.labels.slice(0, 3).map((label, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2.5 py-1 rounded-[8px] text-[11px] md:text-[12px] font-semibold truncate max-w-[140px] border-2"
              style={{
                backgroundColor: `#${label.color}20`,
                color: `#${label.color}`,
                borderColor: `#${label.color}`,
              }}
            >
              {label.name}
            </span>
          ))}
          {item.content.labels.length > 3 && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-[8px] text-[11px] md:text-[12px] font-semibold bg-gray-100 text-gray-600 border-2 border-gray-300">
              +{item.content.labels.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Metadata - Clear visual hierarchy */}
      <div className="flex items-center justify-between pt-3 border-t-2 border-gray-100">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {item.content?.author && (
            <div className="flex items-center gap-2">
              <img
                src={item.content.author.avatarUrl}
                alt={item.content.author.login}
                className="w-6 h-6 rounded-full flex-shrink-0 ring-2 ring-[#419372]/30"
                loading="lazy"
              />
              <span className="font-noto text-[11px] md:text-[12px] font-medium text-gray-600 truncate">
                {item.content.author.login}
              </span>
            </div>
          )}
          {item.content?.repository && !item.content?.author && (
            <span className="font-noto text-[11px] md:text-[12px] font-medium text-gray-600 truncate">
              {item.content.repository}
            </span>
          )}
        </div>

        {item.content?.url && (
          <a
            href={item.content.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-[8px] bg-[#419372]/10 text-[#419372] hover:bg-[#419372] hover:text-white transition-all flex-shrink-0 border-2 border-[#419372]/30 hover:border-[#419372]"
            aria-label="View on GitHub"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
