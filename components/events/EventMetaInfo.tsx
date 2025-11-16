/**
 * Event Meta Info Component
 * Reusable component for displaying event date, time, and location
 */

import { Calendar, MapPin } from 'lucide-react';

interface EventMetaInfoProps {
  dateStr: string;
  timeStr: string | null;
  location?: string;
}

export default function EventMetaInfo({ dateStr, timeStr, location = 'Remote. Online' }: EventMetaInfoProps) {
  return (
    <div className="flex items-center gap-8">
      {/* Date & Time */}
      <div className="flex items-start gap-2 flex-1">
        <Calendar className="w-5 h-5 text-[#ff8854] mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-anek font-bold text-[12px] leading-[12px] text-[#000000] uppercase mb-2">
            Date & Time
          </p>
          <p className="font-noto font-normal text-[14px] leading-[20px] text-[#000000]">
            {dateStr}
          </p>
          {timeStr && (
            <p className="font-noto font-normal text-[14px] leading-[20px] text-[#000000]">
              {timeStr}
            </p>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start gap-2 flex-1">
        <MapPin className="w-5 h-5 text-[#ff8854] mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-anek font-bold text-[12px] leading-[12px] text-[#000000] uppercase mb-2">
            Location
          </p>
          <p className="font-noto font-normal text-[14px] leading-[20px] text-[#000000]">
            {location}
          </p>
        </div>
      </div>
    </div>
  );
}
