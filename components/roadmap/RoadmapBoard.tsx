/**
 * Roadmap Board Component
 * Main board container with columns
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import RoadmapColumn from './RoadmapColumn';
import RoadmapSkeleton from './RoadmapSkeleton';
import type { NormalizedProjectData, ProjectField } from '@/types/github-project';
import { RefreshCw, ExternalLink } from 'lucide-react';

export default function RoadmapBoard() {
  const [data, setData] = useState<NormalizedProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  const fetchData = async (forceRefresh: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const url = forceRefresh ? '/api/roadmap?refresh=true' : '/api/roadmap';
      const response = await fetch(url);
      const result = await response.json();

      if (result.success && result.data) {
        setData(result.data);
        setLastUpdated(new Date().toLocaleString());
      } else {
        setError(result.error || 'Failed to load roadmap');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch roadmap data');
    } finally {
      setLoading(false);
    }
  };


  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!contentRef.current) return;
      
      const scrollAmount = 100;
      const verticalScrollAmount = 50;
      
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          contentRef.current.scrollLeft -= scrollAmount;
          break;
        case 'ArrowRight':
          e.preventDefault();
          contentRef.current.scrollLeft += scrollAmount;
          break;
        case 'ArrowUp':
          e.preventDefault();
          contentRef.current.scrollTop -= verticalScrollAmount;
          break;
        case 'ArrowDown':
          e.preventDefault();
          contentRef.current.scrollTop += verticalScrollAmount;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Initial fetch on component mount
    fetchData();

    // AUTO-REFRESH: Fetches new data every 48 hours automatically
    // This ensures the roadmap stays up-to-date forever without manual intervention
    // Combined with server-side 48-hour caching, this minimizes API calls
    // Rate limit: With token, GitHub allows 5,000 requests/hour
    // Usage: ~15 requests/month (well within limits, works forever)
    const interval = setInterval(() => {
      fetchData();
    }, 48 * 60 * 60 * 1000); // 48 hours in milliseconds

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  // Loading state - Show skeleton
  if (loading) {
    return <RoadmapSkeleton />;
  }

  if (error && !data) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center max-w-2xl bg-red-50 border border-red-200 rounded-[16px] p-8">
          <h3 className="font-anek font-bold text-[24px] text-red-700 mb-4">
            GitHub Token Required
          </h3>
          <p className="font-noto text-[16px] text-gray-700 mb-6">
            {error}
          </p>
          <div className="bg-white rounded-[12px] p-6 mb-6 text-left">
            <h4 className="font-anek font-semibold text-[18px] mb-3">Quick Setup:</h4>
            <ol className="font-noto text-[14px] text-gray-700 space-y-2 list-decimal list-inside">
              <li>Go to <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-[#419372] underline">GitHub Settings → Tokens</a></li>
              <li>Click "Generate new token (classic)"</li>
              <li>Select scope: <code className="bg-gray-100 px-2 py-1 rounded">read:project</code></li>
              <li>Copy the token</li>
              <li>Add to your <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file:</li>
            </ol>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg mt-4 text-[12px] overflow-x-auto">
              GITHUB_TOKEN=ghp_your_token_here
            </pre>
          </div>
          <button
            onClick={() => fetchData(true)}
            className="px-6 py-2 bg-[#419372] text-white rounded-full hover:bg-[#357a5e] transition-colors font-anek"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  // Get column colors from field options
  const statusField = data.project.fields.find(
    (f: ProjectField) => f.name === data.project.groupByField
  );
  const colorMap: { [key: string]: string } = {};
  statusField?.options?.forEach((opt) => {
    if (opt.color) {
      colorMap[opt.name] = opt.color;
    }
  });

  return (
    <div className="w-full">
      {/* Header - Centered on mobile, left-aligned on tablet/desktop */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 md:mb-8">
        {/* Title and Description */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="font-anek font-bold text-[24px] sm:text-[28px] md:text-[32px] leading-tight text-[#0b2540] mb-2">
            {data.project.title}
          </h2>
          {data.project.description && (
            <p className="font-noto text-[13px] sm:text-[14px] md:text-[16px] text-gray-500 max-w-2xl mx-auto md:mx-0">
              {data.project.description}
            </p>
          )}
        </div>
        
        {/* Actions - Centered on mobile/tablet, right-aligned on desktop */}
        <div className="flex flex-col items-center md:items-end gap-3 md:flex-shrink-0">
          {lastUpdated && (
            <span className="font-noto text-[11px] md:text-[12px] text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full whitespace-nowrap">
              Updated: {lastUpdated}
            </span>
          )}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/orgs/avniproject/projects/2/views/7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#419372] text-white rounded-[10px] hover:bg-[#357a5e] hover:shadow-md transition-all font-anek text-[13px] md:text-[14px] font-semibold"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View on GitHub</span>
            </a>
            <button
              onClick={() => fetchData(true)}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-[10px] hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''} text-[#419372]`} />
              <span className="font-anek text-[13px] md:text-[14px] font-medium text-gray-700">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* 
        VIEWPORT CONTAINER: Board with sticky headers and horizontal scroll
        - Sticky column headers at top
        - Horizontal scroll indicator
        - max-h-[calc(100vh-400px)] keeps board within viewport
        - overflow-x-auto for horizontal scrolling through columns
        - overflow-y-auto for vertical scrolling through cards
      */}
      <div className="bg-white border border-gray-200 rounded-[12px] shadow-lg overflow-hidden">
        {/* Keyboard navigation hint */}
        <div className="bg-[#F3F4F6] border-b border-gray-200 px-5 md:px-6 lg:px-8 py-2">
          <span className="text-[11px] text-gray-500 font-noto">Use arrow keys ← → ↑ ↓ to navigate</span>
        </div>

        {/* Scrollable Board Content - Fixed scroll behavior */}
        <div 
          ref={contentRef}
          className="roadmap-scroll p-5 md:p-6 lg:p-8 max-h-[calc(100vh-400px)] md:max-h-[calc(100vh-350px)]"
          style={{
            overflowX: 'scroll',
            overflowY: 'scroll',
            scrollbarWidth: 'auto',
            scrollbarColor: '#419372 #e5e7eb',
            scrollbarGutter: 'stable',
          }}
          tabIndex={0}
        >
          <div className="flex" style={{ minWidth: 'max-content' }}>
            {Object.entries(data.columns).map(([columnName, items], index) => (
              <div key={columnName} className="flex">
                <RoadmapColumn
                  title={columnName}
                  items={items}
                  color={colorMap[columnName]}
                  hideHeader={false}
                />
                {/* Thin separator between columns */}
                {index < Object.entries(data.columns).length - 1 && (
                  <div className="w-px bg-gray-300 mx-4 md:mx-5 lg:mx-6 flex-shrink-0"></div>
                )}
              </div>
            ))}
          </div>
          {/* Force vertical scrollbar by adding extra height */}
          <div style={{ height: '1px', width: '100%' }}></div>
        </div>
      </div>

      {/* Custom scrollbar styling - Always visible green scrollbars */}
      <style jsx global>{`
        /* Main scrollable area - Green scrollbars */
        .roadmap-scroll {
          scrollbar-width: auto !important;
          scrollbar-color: #419372 #e5e7eb !important;
        }
        
        .roadmap-scroll::-webkit-scrollbar {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
        }
        
        .roadmap-scroll::-webkit-scrollbar-track {
          background: #e5e7eb;
          border-radius: 10px;
          margin: 4px;
        }
        
        .roadmap-scroll::-webkit-scrollbar-thumb {
          background: #419372;
          border-radius: 10px;
          border: 4px solid #e5e7eb;
          min-height: 60px;
          min-width: 60px;
        }
        
        .roadmap-scroll::-webkit-scrollbar-thumb:hover {
          background: #357a5e;
          cursor: grab;
        }
        
        .roadmap-scroll::-webkit-scrollbar-thumb:active {
          background: #2d6850;
          cursor: grabbing;
        }
        
        .roadmap-scroll::-webkit-scrollbar-corner {
          background: #e5e7eb;
        }
      `}</style>
    </div>
  );
}
