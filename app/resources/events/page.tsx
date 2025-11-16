/**
 * Events Page
 * Displays Google Calendar events with Featured, Upcoming, and Past sections
 */

import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EventsContent from '@/components/events/EventsContent';

export const metadata: Metadata = {
  title: 'Events - Avni',
  description: 'Join our upcoming online and in-person events to explore product updates, learn from expert sessions, and engage with the Avni community driving digital transformation across sectors.',
};

export default function EventsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-[72px]">
        <EventsContent />
      </main>
      <Footer />
    </>
  );
}
