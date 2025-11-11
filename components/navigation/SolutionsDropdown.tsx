/**
 * Solutions Dropdown Component
 * Height: 393px, Background: Opaque white
 * 4x2 grid layout (4 columns, 2 rows) for 8 solution items
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { solutionsItems } from '@/data/navigation';

interface SolutionsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function SolutionsDropdown({ isOpen, onClose, onMouseEnter, onMouseLeave }: SolutionsDropdownProps) {
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
        className="absolute left-0 right-0 top-[72px] bg-white h-[250px] z-50 shadow-lg border-t border-gray-100 animate-in slide-in-from-top-6 fade-in duration-500 ease-out"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="relative w-[1440px] mx-auto h-full">
          {/* Solutions Grid - 4 columns x 2 rows */}
          <div className="absolute left-[92px] top-[44px] right-[92px]">
            <div className="grid grid-cols-4 gap-x-[48px] gap-y-[32px]">
              {solutionsItems.map((solution) => (
                <Link
                  key={solution.id}
                  href={solution.link}
                  className="flex gap-[12px] group p-[6px] rounded-[12px] transition-all hover:bg-[#fff5f0] hover:shadow-sm"
                  onClick={onClose}
                >
                  {/* Icon: 30x30 */}
                  <div className="relative w-[30px] h-[30px] flex-shrink-0">
                    <Image
                      src={solution.icon}
                      alt={solution.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="font-anek font-semibold text-[16px] leading-[20px] text-[rgba(0,0,0,0.8)] mb-[6px] transition-colors duration-200">
                      {solution.title}
                    </h4>
                    <p className="font-noto text-[13px] leading-[18px] text-[#878787]">
                      {solution.description}
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
