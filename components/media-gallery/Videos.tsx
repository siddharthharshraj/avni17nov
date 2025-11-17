/**
 * Videos Component
 * Displays YouTube videos with popup modal
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import VideoModal from './VideoModal';

interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface VideosProps {
  category: string;
}

// Sample YouTube videos for each category
const videosByCategory: Record<string, Video[]> = {
  'case-studies': [
    {
      id: '1',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'Leadership For Equity | Classroom At TeachAP',
      description: 'Case study showcasing Avni implementation',
      thumbnail: '/images/case-studies/2023-01-12-avni-conference-goa/common/avni-conference-introduction.jpg'
    },
    {
      id: '2',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'Digital Healthcare Transformation',
      description: 'Rural healthcare implementation',
      thumbnail: '/images/case-studies/2023-01-12-avni-conference-goa/day-5/data_session.jpg'
    },
    {
      id: '3',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'Field Data Collection Success',
      description: 'Efficient data management',
      thumbnail: '/images/case-studies/2023-07-14-avni-sprint-udaipur-day-2/avni-sync-walkthrough.jpg'
    },
  ],
  'testimonials': [
    {
      id: '4',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'NGO Partner Testimonial',
      description: 'Partner experience with Avni',
      thumbnail: '/images/case-studies/2023-01-12-avni-conference-goa/day-4/sewa.jpg'
    },
    {
      id: '5',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'Field Worker Success Story',
      description: 'Impact on ground operations',
      thumbnail: '/images/case-studies/2022-05-03-field-visit-jnpct/village-meet.jpg'
    },
    {
      id: '6',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'Community Health Worker',
      description: 'Improving healthcare delivery',
      thumbnail: '/images/case-studies/2023-01-12-avni-conference-goa/day-5/avni_team.jpg'
    },
  ],
  'how-to-guides': [
    {
      id: '7',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'Getting Started with Avni',
      description: 'Complete setup guide',
      thumbnail: '/images/case-studies/2023-01-12-avni-conference-goa/day-4/context-setting.jpg'
    },
    {
      id: '8',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'Data Collection Best Practices',
      description: 'Optimize your workflow',
      thumbnail: '/images/case-studies/2023-07-14-avni-sprint-udaipur-day-2/ajeevika-field-visit.jpg'
    },
    {
      id: '9',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'Advanced Features Tutorial',
      description: 'Master Avni features',
      thumbnail: '/images/case-studies/2023-01-12-avni-conference-goa/day-5/vinay_roadmap.jpg'
    },
  ],
  'features': [
    {
      id: '10',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'Offline Data Sync',
      description: 'Work without internet',
      thumbnail: '/images/case-studies/2023-01-12-avni-conference-goa/common/avni-data-api-discussion.jpg'
    },
    {
      id: '11',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'Custom Forms Builder',
      description: 'Create your own forms',
      thumbnail: '/images/case-studies/2023-01-12-avni-conference-goa/day-4/open-sketch.jpg'
    },
    {
      id: '12',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'Analytics Dashboard',
      description: 'Visualize your data',
      thumbnail: '/images/case-studies/2023-01-12-avni-conference-goa/day-5/data_session.jpg'
    },
  ],
};

export default function Videos({ category }: VideosProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const videos = videosByCategory[category] || [];

  return (
    <>
      <div>
        {/* Results Count */}
        <div className="mb-8">
          <p className="font-noto text-base text-gray-600">
            Showing {videos.length} videos
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {videos.map((video) => (
            <button
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow group text-left"
            >
              {/* Thumbnail with Play Button */}
              <div className="relative aspect-[304/252] overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5.14v13.72L19 12L8 5.14z" fill="#419372"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-anek font-bold text-[18px] leading-[20px] text-[#0B2540] capitalize mb-2">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="font-noto text-sm text-gray-600">
                    {video.description}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
}
