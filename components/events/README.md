# Events Page - Google Calendar Integration

## Overview
The Events page displays upcoming and past events from a public Google Calendar with automatic refresh every 30 seconds.

## Features

### Event Logic
1. **Featured Event**: The earliest upcoming event (displayed prominently)
2. **Upcoming Events**: All future events except the featured one
3. **Past Events**: Latest 3 past events (newest first)
4. **Auto-refresh**: Events update every 30 seconds automatically

### Components

- **EventsContent.tsx**: Main container with auto-refresh logic
- **EventHero.tsx**: Hero section with title and description
- **FeaturedEvent.tsx**: Large card for the featured event
- **UpcomingEvents.tsx**: Grid of upcoming event cards
- **PastEvents.tsx**: Grid of past event cards (max 3)

## Setup

### 1. Get Google Calendar API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google Calendar API**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy the API key

### 2. Configure Environment Variable

Add to your `.env.local` file:

```bash
NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY=your_api_key_here
```

### 3. Calendar Configuration

The calendar ID is already configured in `/app/api/events/route.ts`:

```typescript
const CALENDAR_ID = 'c_1f28563b52f3a01f8f7ceee9c339700e8dbb256a398571f131db0ec351c214de@group.calendar.google.com';
```

## API Route

**Endpoint**: `/api/events`

**Response Format**:
```json
{
  "featured": {
    "id": "event-id",
    "title": "Event Title",
    "start": "2025-03-15T10:00:00Z",
    "end": "2025-03-15T17:00:00Z",
    "location": "Bangalore, India",
    "description": "Event description",
    "htmlLink": "https://calendar.google.com/..."
  },
  "upcoming": [...],
  "past": [...]
}
```

## Design Specifications

Based on Figma design (see `/EVENTS-PAGE-DESIGN-SPECS.md`):

### Typography
- **Hero Title**: Anek Latin 700, 36px, #0b2540
- **Hero Tagline**: Anek Latin 700, 16px, #fba57f
- **Section Titles**: Anek Latin 700, 30px, #0b2540
- **Event Titles (Featured)**: Anek Latin 700, 36px, #0b2540
- **Event Titles (Regular)**: Anek Latin 500, 20px, #000000
- **Body Text**: Noto Sans 400, 18-24px, #000000

### Colors
- Primary Dark: `#0b2540`
- Primary Green: `#419372`
- Orange Accent: `#ff8854`, `#fba57f`
- Black: `#000000`

## Usage

The Events page is accessible at `/resources/events` and is linked from the Resources dropdown in the header navigation.

## Auto-Refresh Behavior

- Events are fetched on page load
- Automatic refresh every 30 seconds
- When a featured event's time passes, it automatically moves to Past Events
- The next upcoming event becomes the new Featured Event
- Past events are limited to the 3 most recent

## Customization

To modify the refresh interval, edit `/hooks/useEvents.ts`:

```typescript
const interval = setInterval(fetchEvents, 30000); // Change 30000 to desired milliseconds
```

To change the number of past events displayed, edit `/app/api/events/route.ts`:

```typescript
.slice(0, 3) // Change 3 to desired number
```
