/**
 * Google Calendar Events API Route
 * Fetches events from public Google Calendar using Service Account
 */

import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import * as path from 'path';
import * as fs from 'fs';

const CALENDAR_ID = 'c_1f28563b52f3a01f8f7ceee9c339700e8dbb256a398571f131db0ec351c214de@group.calendar.google.com';

// Load Service Account credentials from secure config file
const getServiceAccount = () => {
  const serviceAccountPath = path.join(process.cwd(), 'config', 'secrets', 'google-service-account.json');
  const serviceAccountData = fs.readFileSync(serviceAccountPath, 'utf8');
  return JSON.parse(serviceAccountData);
};

// Get service account - will be loaded when API is called
let SERVICE_ACCOUNT: any;

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  location?: string;
  description?: string;
  htmlLink: string;
}

export interface ProcessedEvents {
  featured: CalendarEvent | null;
  upcoming: CalendarEvent[];
  past: CalendarEvent[];
}

export async function GET() {
  try {
    // Load service account credentials
    if (!SERVICE_ACCOUNT) {
      SERVICE_ACCOUNT = getServiceAccount();
    }

    // Create JWT auth client
    const auth = new google.auth.JWT({
      email: SERVICE_ACCOUNT.client_email,
      key: SERVICE_ACCOUNT.private_key,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    // Create calendar client
    const calendar = google.calendar({ version: 'v3', auth });

    // Fetch events
    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 50,
    });

    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // Current time + 7 days

    // Transform Google Calendar events to our format
    const events: CalendarEvent[] = (response.data.items || []).map((item: any) => ({
      id: item.id || '',
      title: item.summary || 'Untitled Event',
      start: item.start?.dateTime || item.start?.date || '',
      end: item.end?.dateTime || item.end?.date || '',
      location: item.location,
      description: item.description,
      htmlLink: item.htmlLink || '',
    }));

    // Split events into categories based on current time
    // Past: Events that have already ended (based on end time)
    const pastEvents = events.filter(event => new Date(event.end) <= now);
    
    // Future: Events that haven't started yet
    const futureEvents = events.filter(event => new Date(event.start) > now);
    
    // Upcoming (next 7 days): Future events within the next 7 days
    const upcomingEvents = futureEvents.filter(event => {
      const eventStart = new Date(event.start);
      return eventStart <= sevenDaysFromNow;
    });

    // Process events according to logic
    const processed: ProcessedEvents = {
      // Featured: The earliest upcoming event (within next 7 days)
      featured: upcomingEvents.length > 0 ? upcomingEvents[0] : null,
      
      // Upcoming: All events in next 7 days except the featured one
      upcoming: upcomingEvents.slice(1),
      
      // Past: Latest 3 past events, sorted newest to oldest
      past: pastEvents
        .sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())
        .slice(0, 3),
    };

    return NextResponse.json(processed);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
