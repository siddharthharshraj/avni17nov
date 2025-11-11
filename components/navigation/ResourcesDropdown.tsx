/**
 * Resources Dropdown Component
 * 2-column grid layout (3 rows) for 6 resource items
 * Matches the styling of Product Services and Solutions dropdowns
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { resourcesItems } from '@/data/navigation';

interface ResourcesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function ResourcesDropdown({ isOpen, onClose, onMouseEnter, onMouseLeave }: ResourcesDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className="hidden lg:block">
      {/* Backdrop with fade-in animation */}
      <div 
        className="fixed inset-0 top-[72px] bg-black/10 z-40 animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* Dropdown Panel - Opaque White Background with slide-down animation */}
      <div 
        className="absolute left-0 right-0 top-[72px] bg-white h-[280px] z-50 shadow-2xl border-t border-gray-100 animate-slideDown"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="relative w-[1440px] mx-auto h-full">
          {/* Resources Grid - 4 columns x 2 rows (first row: 4 items, second row: 2 items) */}
          <div className="absolute left-[92px] top-[44px] right-[92px] pb-[40px]">
            <div className="grid grid-cols-4 gap-x-[48px] gap-y-[32px]">
              {resourcesItems.map((resource) => (
                <Link
                  key={resource.id}
                  href={resource.link}
                  className="flex gap-[12px] group p-[6px] rounded-[12px] transition-all hover:bg-[#fff5f0] hover:shadow-sm"
                  onClick={onClose}
                >
                  {/* Icon: 30x30 */}
                  <div className="relative w-[30px] h-[30px] flex-shrink-0">
                    <Image
                      src={resource.icon}
                      alt={resource.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="font-anek font-semibold text-[16px] leading-[20px] text-[rgba(0,0,0,0.8)] mb-[6px] transition-colors duration-200">
                      {resource.title}
                    </h4>
                    <p className="font-noto text-[13px] leading-[18px] text-[#878787]">
                      {resource.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
