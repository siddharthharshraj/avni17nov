# How to Add Testimonials

This guide explains how to easily add new testimonials to the website.

## 📁 File Structure

```
data/
  testimonials.ts          # Testimonials data file
public/
  images/
    testimonials/          # Store testimonial images here
      ashok-dayalchand.jpg
      jane-doe.jpg
      maitri-video-thumbnail.jpg
```

## ✨ Adding a New Testimonial

### Step 1: Add Images

1. **For Text Testimonials**: Add the person's photo to `/public/images/testimonials/`
   - Recommended size: 200×200px (square)
   - Format: JPG or PNG
   - Example: `john-smith.jpg`

2. **For Video Testimonials**: Add a video thumbnail to `/public/images/testimonials/`
   - Recommended size: 640×360px (16:9 ratio)
   - Format: JPG or PNG
   - Example: `john-smith-video-thumbnail.jpg`

### Step 2: Update Data File

Open `/data/testimonials.ts` and add a new testimonial to the array:

```typescript
{
  id: "unique-identifier",           // Unique ID (use kebab-case)
  quote: "Your testimonial text here",
  name: "Person Name",
  position: "Job Title",              // Optional
  organization: "Organization Name",
  image: "/images/testimonials/person.jpg",  // For text testimonials
  videoThumbnail: "/images/testimonials/video.jpg",  // For video testimonials
  type: "text",                       // "text" or "video"
}
```

### Step 3: Save and Test

That's it! The testimonial will automatically appear in the carousel.

---

## 📝 Examples

### Text Testimonial (with photo)

```typescript
{
  id: "john-smith",
  quote: "Avni has revolutionized our data collection process. Highly recommended!",
  name: "John Smith",
  position: "Director of Operations",
  organization: "Health NGO",
  image: "/images/testimonials/john-smith.jpg",
  type: "text",
}
```

### Video Testimonial

```typescript
{
  id: "sarah-johnson",
  quote: "The offline capabilities are incredible. Our field teams love it!",
  name: "Sarah Johnson",
  position: "Program Manager",
  organization: "Education Foundation",
  videoThumbnail: "/images/testimonials/sarah-video.jpg",
  type: "video",
}
```

### Text Testimonial (without position)

```typescript
{
  id: "amit-patel",
  quote: "Simple, powerful, and exactly what we needed.",
  name: "Amit Patel",
  position: "",  // Leave empty if no position
  organization: "Community Health",
  image: "/images/testimonials/amit-patel.jpg",
  type: "text",
}
```

---

## 🎨 Design Guidelines

### Image Specifications

**Profile Photos**:
- Size: 200×200px minimum
- Format: JPG or PNG
- Aspect ratio: 1:1 (square)
- Quality: High resolution
- Background: Professional, clean

**Video Thumbnails**:
- Size: 640×360px minimum
- Format: JPG or PNG
- Aspect ratio: 16:9
- Quality: High resolution
- Include: Person or relevant scene

### Text Guidelines

**Quote**:
- Length: 100-200 characters recommended
- Style: Professional, authentic
- Content: Specific benefits or outcomes

**Name**:
- Format: First and Last name
- Example: "Dr. Ashok Dayalchand"

**Position** (optional):
- Format: Job title
- Example: "Program Manager"

**Organization**:
- Format: Organization name or acronym
- Example: "IMHP" or "Sewa Rural"

---

## 🔄 Carousel Behavior

The testimonials carousel:
- Shows **3 testimonials** at a time
- Has **navigation arrows** (left/right)
- Has **dot indicators** for pages
- Supports **unlimited testimonials**
- Auto-adjusts based on total count

---

## 🎯 Best Practices

### Do's ✅
- Use high-quality images
- Keep quotes concise and impactful
- Include organization name
- Use consistent image sizes
- Test on mobile devices

### Don'ts ❌
- Don't use low-resolution images
- Don't write overly long quotes
- Don't forget to add unique IDs
- Don't mix image aspect ratios
- Don't skip the organization field

---

## 🚀 Quick Checklist

Before adding a testimonial:

- [ ] Image is high quality and properly sized
- [ ] Image is saved in `/public/images/testimonials/`
- [ ] Unique ID is created (kebab-case)
- [ ] Quote is clear and concise
- [ ] Name is spelled correctly
- [ ] Organization name is accurate
- [ ] Type is set correctly ("text" or "video")
- [ ] Tested on localhost

---

## 📊 Current Testimonials

As of now, we have **3 testimonials**:

1. **Dr. Ashok Dayalchand** (IMHP) - Text
2. **Jane Doe** (Jagori) - Text
3. **Maitri** (Sewa Rural) - Video

---

## 🆘 Troubleshooting

**Image not showing?**
- Check file path is correct
- Verify image exists in `/public/images/testimonials/`
- Check file extension matches (.jpg, .png)

**Testimonial not appearing?**
- Verify the testimonial object is properly formatted
- Check for syntax errors in `testimonials.ts`
- Ensure unique ID is used

**Carousel not working?**
- Check browser console for errors
- Verify all testimonials have required fields
- Test with different numbers of testimonials

---

## 💡 Tips

1. **Batch Adding**: You can add multiple testimonials at once
2. **Order Matters**: Testimonials appear in array order
3. **Easy Updates**: Just edit the data file, no code changes needed
4. **Reusable**: Same carousel component can be used elsewhere
5. **Type Safety**: TypeScript ensures data consistency

---

## 📞 Need Help?

If you encounter issues:
1. Check the TypeScript interface in `data/testimonials.ts`
2. Review existing testimonials for reference
3. Verify image paths and file names
4. Check browser console for errors

---

**Happy testimonial adding! 🎉**
