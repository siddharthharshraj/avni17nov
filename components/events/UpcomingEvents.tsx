/**
 * Upcoming Events Component
 * Grid of upcoming event cards (excluding featured)
 */

import Image from 'next/image';
import type { CalendarEvent } from '@/app/api/events/route';
import EventMetaInfo from './EventMetaInfo';

interface UpcomingEventsProps {
  events: CalendarEvent[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <div className="flex flex-col gap-6 mt-8 max-w-[1066px] mx-auto">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

function EventCard({ event }: { event: CalendarEvent }) {
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

  // Determine event type based on location
  const isWebinar = event.location?.toLowerCase().includes('online') || 
                    event.location?.toLowerCase().includes('remote') ||
                    event.location?.toLowerCase().includes('virtual');

  return (
    <div className="bg-white rounded-[24px] border border-gray-200 p-4 sm:p-6 md:p-8 hover:shadow-lg transition-shadow w-full">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Content */}
        <div className="flex-1">
          {/* WEBINAR Tag for upcoming events */}
          <span className="inline-block px-4 py-2 bg-[#fff5f0] rounded-[4px] font-anek font-bold text-[16px] leading-[16px] text-[#ff8854] mb-3 uppercase">
            WEBINAR
          </span>

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
