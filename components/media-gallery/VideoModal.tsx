/**
 * Video Modal Component
 * Popup modal for YouTube video playback with like button
 */

'use client';

import { useEffect, useState } from 'react';

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
}

interface VideoModalProps {
  video: Video;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

  // Load like status and total likes from localStorage
  useEffect(() => {
    // Get user's personal likes
    const userLikes = localStorage.getItem('user-video-likes');
    if (userLikes) {
      const likes = JSON.parse(userLikes);
      setIsLiked(likes[video.id] || false);
    }

    // Get total likes across all users (simulated global counter)
    const globalLikes = localStorage.getItem('global-video-likes');
    if (globalLikes) {
      const likes = JSON.parse(globalLikes);
      setTotalLikes(likes[video.id] || 0);
    }
  }, [video.id]);

  // Handle like toggle
  const handleLike = () => {
    const newLiked = !isLiked;
    
    // Update user's personal like status
    const userLikes = localStorage.getItem('user-video-likes');
    const likes = userLikes ? JSON.parse(userLikes) : {};
    likes[video.id] = newLiked;
    localStorage.setItem('user-video-likes', JSON.stringify(likes));

    // Update global like count
    const globalLikes = localStorage.getItem('global-video-likes');
    const globalCounts = globalLikes ? JSON.parse(globalLikes) : {};
    const currentCount = globalCounts[video.id] || 0;
    const newCount = newLiked ? currentCount + 1 : Math.max(0, currentCount - 1);
    globalCounts[video.id] = newCount;
    localStorage.setItem('global-video-likes', JSON.stringify(globalCounts));

    setIsLiked(newLiked);
    setTotalLikes(newCount);
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-white rounded-[12px] sm:rounded-[16px] overflow-hidden shadow-2xl max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-lg"
          aria-label="Close video"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5L5 15M5 5L15 15" stroke="#0B2540" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Video Container */}
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>

        {/* Video Info with Action Buttons */}
        <div className="p-4 sm:p-6 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-anek font-bold text-lg sm:text-xl text-[#0B2540] mb-2">
                {video.title}
              </h3>
              {video.description && (
                <p className="font-noto text-sm sm:text-base text-gray-600 mb-4">
                  {video.description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              {/* Like Button with Total Count */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full font-anek font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${
                  isLiked
                    ? 'bg-[#419372] text-white hover:bg-[#357a5e]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label={isLiked ? 'Unlike video' : 'Like video'}
                title={`${totalLikes} total likes`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill={isLiked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  xmlns="http://www.w3.org/2000/svg"
                  className="sm:w-5 sm:h-5"
                >
                  <path d="M10 17.5L8.825 16.45C4.5 12.55 1.667 10.033 1.667 6.917C1.667 4.4 3.567 2.5 6.083 2.5C7.5 2.5 8.858 3.175 10 4.242C11.142 3.175 12.5 2.5 13.917 2.5C16.433 2.5 18.333 4.4 18.333 6.917C18.333 10.033 15.5 12.55 11.175 16.458L10 17.5Z" />
                </svg>
                <span>{totalLikes > 0 ? totalLikes : 'Like'}</span>
              </button>

              {/* Watch on YouTube Button */}
              <a
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#FF0000] text-white hover:bg-[#CC0000] font-anek font-medium text-xs sm:text-sm transition-all whitespace-nowrap"
                title="Watch and like on YouTube"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="sm:w-5 sm:h-5">
                  <path d="M19.615 5.481c-.226-1.003-.893-1.793-1.736-2.058C16.382 3 10 3 10 3s-6.382 0-7.879.423c-.843.265-1.51 1.055-1.736 2.058C0 6.978 0 10 0 10s0 3.022.385 4.519c.226 1.003.893 1.793 1.736 2.058C3.618 17 10 17 10 17s6.382 0 7.879-.423c.843-.265 1.51-1.055 1.736-2.058C20 13.022 20 10 20 10s0-3.022-.385-4.519zM8 13V7l5.196 3L8 13z"/>
                </svg>
                <span className="hidden sm:inline">YouTube</span>
                <span className="sm:hidden">YT</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
