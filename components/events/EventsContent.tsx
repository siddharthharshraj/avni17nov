/**
 * Events Content Component
 * Main content area for Events page with auto-refreshing calendar events
 */

'use client';

import { useEvents } from '@/hooks/useEvents';
import EventHero from './EventHero';
import FeaturedEvent from './FeaturedEvent';
import UpcomingEvents from './UpcomingEvents';
import PastEvents from './PastEvents';
import EventCardSkeleton from './EventCardSkeleton';
import PastEventSkeleton from './PastEventSkeleton';

export default function EventsContent() {
  const { events, loading, error } = useEvents();

  if (loading) {
    return (
      <div className="w-full">
        {/* Hero Section */}
        <EventHero />

        {/* Main Content */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
          {/* Upcoming Events Section */}
          <section className="mb-20">
            <h2 className="font-anek font-bold text-[30px] leading-[32px] text-[#0b2540] mb-8 max-w-[1066px] mx-auto">
              Upcoming Events
            </h2>

            {/* Skeleton Loaders for Upcoming Events */}
            <div className="space-y-6">
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          </section>
        </div>

        {/* Past Events Section - Full Width Background */}
        <section className="w-full bg-[#f8f9fa] py-16">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <h2 className="font-anek font-bold text-[30px] leading-[32px] text-[#0b2540] mb-8">
              Past Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PastEventSkeleton />
              <PastEventSkeleton />
              <PastEventSkeleton />
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="font-noto text-red-600">Error loading events: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <EventHero />

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        {/* Upcoming Events Section */}
        <section className="mb-20">
          <h2 className="font-anek font-bold text-[30px] leading-[32px] text-[#0b2540] mb-8 max-w-[1066px] mx-auto">
            Upcoming Events
          </h2>

          {/* Featured Event */}
          {events.featured && <FeaturedEvent event={events.featured} />}

          {/* Other Upcoming Events */}
          {events.upcoming.length > 0 && (
            <UpcomingEvents events={events.upcoming} />
          )}

          {/* No upcoming events message */}
          {!events.featured && events.upcoming.length === 0 && (
            <p className="font-noto text-[18px] text-[#000000] text-center py-12">
              No upcoming events at the moment. Check back soon!
            </p>
          )}
        </section>
      </div>

      {/* Past Events Section - Full Width Background */}
      {events.past.length > 0 && (
        <section className="w-full bg-[#f8f9fa] py-16">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <PastEvents events={events.past} />
          </div>
        </section>
      )}
    </div>
  );
}
