/**
 * Image Modal Component
 * Popup modal for full-size image viewing
 */

'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  src: string;
  title: string;
  description?: string;
  onClose: () => void;
}

export default function ImageModal({ src, title, description, onClose }: ImageModalProps) {
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
          aria-label="Close image"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5L5 15M5 5L15 15" stroke="#0B2540" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Image Container */}
        <div className="relative w-full bg-gray-100" style={{ maxHeight: '70vh' }}>
          <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8">
            <Image
              src={src}
              alt={title}
              width={1200}
              height={800}
              className="max-w-full max-h-[60vh] w-auto h-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Image Info */}
        <div className="p-4 sm:p-6 bg-white">
          <h3 className="font-anek font-bold text-lg sm:text-xl text-[#0B2540] mb-2 capitalize">
            {title}
          </h3>
          {description && (
            <p className="font-noto text-sm sm:text-base text-gray-600">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
