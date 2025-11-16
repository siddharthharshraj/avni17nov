/**
 * Past Events Component
 * Grid of past event cards (max 3, newest first)
 */

import { Calendar, MapPin } from 'lucide-react';
import type { CalendarEvent } from '@/app/api/events/route';

interface PastEventsProps {
  events: CalendarEvent[];
}

export default function PastEvents({ events }: PastEventsProps) {
  return (
    <div>
      <h2 className="font-anek font-bold text-[30px] leading-[32px] text-[#0b2540] mb-8">
        Past Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <PastEventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

function PastEventCard({ event }: { event: CalendarEvent }) {
  const startDate = new Date(event.start);

  // Format date
  const dateStr = startDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-[16px] border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Title */}
      <h3 className="font-anek font-medium text-[18px] leading-[24px] text-[#000000] mb-4">
        {event.title}
      </h3>

      {/* Date */}
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="w-4 h-4 text-[#ff8854]" />
        <p className="font-noto font-normal text-[14px] leading-[14px] text-[#000000]">
          {dateStr}
        </p>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-[#ff8854]" />
        <p className="font-noto font-normal text-[14px] leading-[14px] text-[#000000]">
          Remote
        </p>
      </div>
    </div>
  );
}
