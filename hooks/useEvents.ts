/**
 * Custom hook for fetching and auto-refreshing Google Calendar events
 * Refreshes every 30 seconds
 */

'use client';

import { useState, useEffect } from 'react';
import type { ProcessedEvents } from '@/app/api/events/route';

export function useEvents() {
  const [events, setEvents] = useState<ProcessedEvents>({
    featured: null,
    upcoming: [],
    past: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchEvents();

    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchEvents, 30000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  return { events, loading, error, refetch: fetchEvents };
}
