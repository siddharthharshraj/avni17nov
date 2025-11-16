/**
 * Featured Event Component
 * Large card for the earliest upcoming event
 */

import Image from 'next/image';
import { CalendarEvent } from '@/app/api/events/route';
import EventMetaInfo from './EventMetaInfo';

interface FeaturedEventProps {
  event: CalendarEvent;
}

export default function FeaturedEvent({ event }: FeaturedEventProps) {
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);

  // Check if event has time (not an all-day event)
  const hasTime = event.start.includes('T');

  // Format date and time
  const dateStr = startDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const timeStr = hasTime ? `${startDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })} - ${endDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })} IST` : null;

  // Format description - first 7 words on line 1, next 7 words on line 2 with "..."
  const getFormattedDescription = () => {
    if (!event.description) return null;
    
    // Remove HTML tags only
    let text = event.description.replace(/<[^>]*>/g, '');
    
    // Split into words
    const words = text.split(/\s+/);
    
    // Take first 14 words
    const firstLine = words.slice(0, 7).join(' ');
    const secondLine = words.slice(7, 14).join(' ');
    
    if (!firstLine) return null;
    
    return (
      <>
        {firstLine}
        {secondLine && (
          <>
            <br />
            {secondLine}...
          </>
        )}
      </>
    );
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-200 p-4 sm:p-6 md:p-8 mb-6 hover:shadow-lg transition-shadow w-full max-w-[1066px] mx-auto">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Content */}
        <div className="flex-1">
          {/* Featured Tag */}
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/icons/featured-event.svg"
              alt="Featured"
              width={20}
              height={20}
            />
            <span className="font-anek font-bold text-[12px] leading-[12px] text-[#000000] uppercase">
              Featured Event
            </span>
          </div>

          {/* Title */}
          <h3 className="font-anek font-bold text-[36px] leading-[36px] text-[#0b2540] mb-3">
            {event.title}
          </h3>

          {/* Description */}
          {getFormattedDescription() && (
            <p className="font-noto font-normal text-[16px] leading-[24px] text-[#000000]/80 mb-6">
              {getFormattedDescription()}
            </p>
          )}

          {/* Meta Information */}
          <EventMetaInfo dateStr={dateStr} timeStr={timeStr} />

          {/* Register Button */}
          <a
            href={event.htmlLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-[145px] h-[48px] bg-[#419372] text-[#F6F9FC] font-anek font-medium text-[20px] leading-[20px] tracking-[0px] capitalize rounded-[20px] hover:bg-[#357a5e] transition-colors mt-6"
          >
            Register now
          </a>
        </div>

        {/* Event Image - Optional, can be removed in future */}
        <div className="w-full md:w-[280px] lg:w-[318px] h-[280px] md:h-[318px] bg-[#419372] rounded-[16px] flex items-center justify-center flex-shrink-0 p-6 md:p-8">
          <div className="relative w-full h-full">
            <Image
              src="/logos/avni-logo.png"
              alt="Avni Event"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
