/**
 * Field Photos Component
 * Displays field photos with pagination (9 per page)
 */

'use client';

import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Pagination from '@/components/blog/Pagination';
import ImageModal from './ImageModal';

// Field photos from the codebase
const fieldPhotos = [
  {
    id: 1,
    src: '/images/case-studies/2022-05-03-field-visit-jnpct/village-meet.jpg',
    title: 'Village Meeting',
    description: 'Community engagement session'
  },
  {
    id: 2,
    src: '/images/case-studies/2022-05-03-field-visit-jnpct/group-pic.jpg',
    title: 'Field Team',
    description: 'Team members in the field'
  },
  {
    id: 3,
    src: '/images/case-studies/2023-01-12-avni-conference-goa/common/avni-tshirt-group-photo.jpg',
    title: 'Avni Conference',
    description: 'Team photo at Goa conference'
  },
  {
    id: 4,
    src: '/images/case-studies/2023-01-12-avni-conference-goa/day-4/context-setting.jpg',
    title: 'Context Setting',
    description: 'Workshop session'
  },
  {
    id: 5,
    src: '/images/case-studies/2023-01-12-avni-conference-goa/day-5/data_session.jpg',
    title: 'Data Session',
    description: 'Data analysis workshop'
  },
  {
    id: 6,
    src: '/images/case-studies/2023-01-12-avni-conference-goa/day-5/avni_team.jpg',
    title: 'Avni Team',
    description: 'Core team members'
  },
  {
    id: 7,
    src: '/images/case-studies/2023-07-14-avni-sprint-udaipur-day-2/ajeevika-field-visit.jpg',
    title: 'Ajeevika Field Visit',
    description: 'Field implementation visit'
  },
  {
    id: 8,
    src: '/images/case-studies/2023-07-14-avni-sprint-udaipur-day-2/avni-team-group-photo-udaipur-sprint.jpg',
    title: 'Udaipur Sprint',
    description: 'Team at Udaipur sprint'
  },
  {
    id: 9,
    src: '/images/case-studies/2023-01-12-avni-conference-goa/day-4/open-sketch.jpg',
    title: 'Open Sketch',
    description: 'Collaborative planning session'
  },
  {
    id: 10,
    src: '/images/case-studies/2023-01-12-avni-conference-goa/day-5/beachside.jpg',
    title: 'Beachside Discussion',
    description: 'Informal team discussion'
  },
  {
    id: 11,
    src: '/images/case-studies/2023-01-12-avni-conference-goa/day-5/morning_sunrise.jpg',
    title: 'Morning Sunrise',
    description: 'Conference venue morning'
  },
  {
    id: 12,
    src: '/images/case-studies/2023-01-12-avni-conference-goa/day-5/party_time.jpg',
    title: 'Team Celebration',
    description: 'Conference celebration'
  },
  {
    id: 13,
    src: '/images/case-studies/2022-05-03-field-visit-jnpct/bridge.jpg',
    title: 'Site Visit In Assam',
    description: 'Field site inspection'
  },
  {
    id: 14,
    src: '/images/case-studies/2023-01-12-avni-conference-goa/day-4/sewa.jpg',
    title: 'SEWA Presentation',
    description: 'Partner organization session'
  },
  {
    id: 15,
    src: '/images/case-studies/2023-01-12-avni-conference-goa/day-4/jss.jpg',
    title: 'JSS Session',
    description: 'Implementation discussion'
  },
  {
    id: 16,
    src: '/images/case-studies/2023-01-12-avni-conference-goa/day-5/team_collage.jpg',
    title: 'Team Collage',
    description: 'Conference memories'
  },
  {
    id: 17,
    src: '/images/case-studies/2023-01-12-avni-conference-goa/day-5/vinay_roadmap.jpg',
    title: 'Product Roadmap',
    description: 'Future planning session'
  },
  {
    id: 18,
    src: '/images/case-studies/2023-01-12-avni-conference-goa/day-5/sakhi.jpg',
    title: 'Sakhi Presentation',
    description: 'Partner showcase'
  },
];

const PHOTOS_PER_PAGE = 9;

export default function FieldPhotos() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<typeof fieldPhotos[0] | null>(null);

  // Pagination
  const totalPages = Math.ceil(fieldPhotos.length / PHOTOS_PER_PAGE);
  const paginatedPhotos = useMemo(() => {
    const startIndex = (currentPage - 1) * PHOTOS_PER_PAGE;
    const endIndex = startIndex + PHOTOS_PER_PAGE;
    return fieldPhotos.slice(startIndex, endIndex);
  }, [currentPage]);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <>
      <div>
        {/* Results Count */}
        <div className="mb-8">
          <p className="font-noto text-base text-gray-600">
            Showing {fieldPhotos.length} field photos
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {paginatedPhotos.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setSelectedImage(photo)}
              className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow group text-left w-full"
            >
              {/* Image */}
              <div className="relative aspect-[304/252] overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* View Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <path d="M10 3C5 3 1.73 6.11 1 10c.73 3.89 4 7 9 7s8.27-3.11 9-7c-.73-3.89-4-7-9-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="#419372"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-anek font-bold text-[18px] leading-[20px] text-[#0B2540] capitalize mb-2">
                  {photo.title}
                </h3>
                {photo.description && (
                  <p className="font-noto text-sm text-gray-600">
                    {photo.description}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          src={selectedImage.src}
          title={selectedImage.title}
          description={selectedImage.description}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}
