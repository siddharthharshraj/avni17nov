# How to Remove Event Images (Future Reference)

## Current Setup

Event cards currently display the Avni logo on the right side of each card. This is marked with a comment: `{/* Event Image - Optional, can be removed in future */}`

## To Remove Images

If you want to remove the event images in the future, follow these steps:

### 1. Featured Event Component

**File**: `/components/events/FeaturedEvent.tsx`

**Remove these lines** (around line 106-116):

```tsx
{/* Event Image - Optional, can be removed in future */}
<div className="w-full md:w-[140px] h-[140px] bg-[#419372] rounded-[16px] flex items-center justify-center flex-shrink-0 p-4">
  <div className="relative w-full h-full">
    <Image
      src="/logos/avni-logo.png"
      alt="Avni Event"
      fill
      className="object-contain"
    />
  </div>
</div>
```

**Also remove the Image import** at the top:

```tsx
import Image from 'next/image';  // Remove this line
```

### 2. Upcoming Events Component

**File**: `/components/events/UpcomingEvents.tsx`

**Remove these lines** (around line 118-128):

```tsx
{/* Event Image - Optional, can be removed in future */}
<div className="w-full md:w-[140px] h-[140px] bg-[#419372] rounded-[16px] flex items-center justify-center flex-shrink-0 p-4">
  <div className="relative w-full h-full">
    <Image
      src="/logos/avni-logo.png"
      alt="Avni Event"
      fill
      className="object-contain"
    />
  </div>
</div>
```

**Also remove the Image import** at the top:

```tsx
import Image from 'next/image';  // Remove this line
```

### 3. Optional: Adjust Card Layout

After removing images, you may want to adjust the card layout for better use of space:

**Change the flex container** from:
```tsx
<div className="flex flex-col md:flex-row gap-6">
```

**To**:
```tsx
<div className="flex flex-col gap-6">
```

This will make the content take full width without the image space.

---

## Current Configuration

### Location
- **All events show**: "Remote"
- **Hardcoded**: Not pulled from Google Calendar
- **To change**: Edit the location text in each component

### Image
- **Source**: `/logos/avni-logo.png`
- **Background**: Green (#419372) matching Avni brand
- **Size**: 140px × 140px
- **Padding**: 4 (16px)

---

## Why Images Are Optional

1. **Clean Design**: Some prefer text-only event cards
2. **Faster Loading**: Fewer images = faster page load
3. **Mobile Friendly**: More space for content on small screens
4. **Consistency**: All events use the same logo anyway

---

## Alternative: Use Event-Specific Images

If you want to use different images per event in the future:

1. Add an `imageUrl` field to the event data
2. Update the API route to include image URLs
3. Replace the hardcoded logo with dynamic images:

```tsx
<Image
  src={event.imageUrl || '/logos/avni-logo.png'}
  alt={event.title}
  fill
  className="object-contain"
/>
```

---

## Quick Reference

**To remove images completely**:
1. Delete the image div blocks in both components
2. Remove `import Image from 'next/image';`
3. Optionally adjust flex layout
4. Test on mobile and desktop

**Estimated time**: 5 minutes
