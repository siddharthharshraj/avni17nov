# Case Study Writing Guide

**Complete guide for creating and formatting case studies with consistent design**

---

## 📋 Table of Contents

1. [Frontmatter Structure](#frontmatter-structure)
2. [Content Structure](#content-structure)
3. [Typography & Styling](#typography--styling)
4. [Images & Media](#images--media)
5. [Special Components](#special-components)
6. [Complete Example](#complete-example)
7. [Best Practices](#best-practices)

---

## 1. Frontmatter Structure

Every case study must start with YAML frontmatter containing metadata:

```yaml
---
title: "Your Case Study Title Here"
slug: "your-case-study-slug"
sector: "Health"  # Options: Health, Education, Livelihood, Water & Sanitation, Child Welfare, Social Security
logo: "/logos/organization-name.png"
description: "Brief 1-2 sentence description of the case study"
date: "2024-11-17"  # Format: YYYY-MM-DD
author: "Author Name"  # Optional
readTime: "5 min read"  # Optional
tags: ["Tag1", "Tag2", "Tag3"]  # Optional, JSON array format
featured: false  # Set to true for featured case study on main page
---
```

### Required Fields:
- **title**: Main heading (will be displayed prominently)
- **slug**: URL-friendly identifier (lowercase, hyphens, no spaces)
- **sector**: Must match one of the predefined sectors
- **logo**: Path to organization logo in `/public/logos/`
- **description**: Short summary for cards and SEO
- **date**: Publication date in YYYY-MM-DD format

### Optional Fields:
- **author**: Author name
- **readTime**: Estimated reading time
- **tags**: Array of relevant tags (up to 3 shown on card, orange badges)
- **featured**: Boolean to feature on main page

### Sector Options:
- Health
- Education
- Livelihood
- Water & Sanitation
- Child Welfare
- Social Security
- Sports (if applicable)

---

## 2. Content Structure

### Recommended Sections:

```markdown
## About [Organization Name]

Brief introduction to the organization, their mission, and scope of work.

## The Challenge

Describe the problem or challenge the organization was facing before using Avni.

## What They Wanted

Specific goals and requirements the organization had.

## The Digital Journey

How the organization implemented Avni and the process they followed.

## Key Benefits of Using Avni

- **Benefit 1**: Description
- **Benefit 2**: Description
- **Benefit 3**: Description

## Impact & Results

Quantifiable results and impact metrics.

## Looking Ahead

Future plans and next steps.
```

---

## 3. Typography & Styling

### Headings

```markdown
## Main Section Heading (H2)
### Subsection Heading (H3)
```

**Rendered as (Exact Figma Specs):**
- **H2/H3**: Anek Latin, Bold (700), 30px, 24px line-height, #0B2540, 0px letter-spacing
- **Body**: Noto Sans, Regular (400), 24px, 36px line-height, #000000, 0px letter-spacing

### Text Formatting

```markdown
**Bold text** for emphasis
*Italic text* for quotes or emphasis
`Code or technical terms`
```

### Lists

**Bulleted List:**
```markdown
- First item
- Second item
- Third item
```

**Numbered List:**
```markdown
1. First step
2. Second step
3. Third step
```

**List with Bold Labels:**
```markdown
- **Label**: Description of the item
- **Another Label**: More description
```

---

## 4. Images & Media

### Image Placement

**Full-width Image:**
```markdown
![Description of image](/images/case-studies/your-folder/image-name.jpg)
```

**Image with Caption (using title):**
```markdown
![Alt text](/images/case-studies/your-folder/image-name.jpg "This is the caption")
```

**YouTube Video Embed:**
```markdown
![Video description](https://youtube.com/watch?v=VIDEO_ID)
```
or
```markdown
![Video description](https://youtu.be/VIDEO_ID)
```

### Image Guidelines:

1. **Location**: Store images in `/public/images/case-studies/[case-study-slug]/`
2. **Naming**: Use descriptive, lowercase names with hyphens: `field-workers-using-app.jpg`
3. **Format**: JPG for photos, PNG for graphics/screenshots, WebP for optimized images
4. **Size**: 
   - Width: 1200-1600px recommended
   - File size: < 500KB (optimize before uploading)
5. **Alt Text**: Always provide meaningful descriptions

### Image Best Practices:

```markdown
<!-- ✅ GOOD: Descriptive alt text -->
![Field workers using Avni mobile app to collect health data](/images/case-studies/goonj/field-workers.jpg)

<!-- ❌ BAD: Generic alt text -->
![Image](/images/case-studies/goonj/img1.jpg)

<!-- ✅ GOOD: Organized folder structure -->
/public/images/case-studies/
  └── goonj/
      ├── hero-image.jpg
      ├── field-workers.jpg
      └── dashboard-screenshot.png

<!-- ❌ BAD: Unorganized -->
/public/images/case-studies/
  ├── img1.jpg
  ├── photo.jpg
  └── screenshot.png
```

---

## 5. Special Components

### Quote Blocks

Use blockquotes for testimonials or important statements:

```markdown
> "Avni has transformed how we collect and manage field data. What used to take weeks now takes just days."
> 
> — Program Manager, Organization Name
```

**Rendered as:**
- Lavender background (#F5F3FF)
- Centered text
- Italic font
- Rounded corners
- Extra padding

### Horizontal Dividers

```markdown
---
```

Use sparingly to separate major sections.

### Links

```markdown
[Link text](https://example.com)
```

**External links** automatically open in new tab.

### Code Blocks

For technical content:

````markdown
```
Technical content or code
```
````

---

## 6. Complete Example

Here's a complete case study template:

```markdown
---
title: "How Goonj Uses Avni to Digitise Offline Data Collection and Inventory Flow"
slug: "how-goonj-uses-avni"
sector: "Livelihood"
logo: "/logos/Goonj-logo-10June20.png"
description: "For over two decades, Goonj has been working on disaster relief, humanitarian aid and community development across India."
date: "2024-01-15"
author: "Avni Team"
readTime: "6 min read"
tags: ["Livelihood", "Inventory Management", "Field Data Collection"]
featured: true
---

## About Goonj

Founded in 1999, Goonj is a pan-India movement redefining the culture of giving. Working across 31 states and union territories, Goonj has impacted millions of lives through its innovative programs.

![Goonj team members sorting donated materials](/images/case-studies/goonj/team-sorting.jpg)

## The Challenge

Before Avni, Goonj faced several challenges:

- **Manual Data Entry**: Field workers spent hours filling paper forms
- **Delayed Reporting**: Data took weeks to reach headquarters
- **Inventory Tracking**: Difficult to track material flow across centers

## What They Wanted

Goonj needed a solution that could:

1. Enable offline data collection
2. Sync automatically when online
3. Track inventory in real-time
4. Generate instant reports

## The Digital Journey

Goonj implemented Avni in phases:

### Phase 1: Pilot Program
Started with 50 field workers in 3 states.

### Phase 2: Scale-Up
Expanded to 500+ workers across 15 states.

![Field workers using Avni app](/images/case-studies/goonj/field-workers-app.jpg)

### Phase 3: Full Deployment
Now used by 1000+ workers nationwide.

## Key Benefits of Using Avni

- **80% Time Savings**: Data entry time reduced from hours to minutes
- **Real-time Visibility**: Instant access to field data and inventory levels
- **Better Decision Making**: Data-driven insights for program planning
- **Reduced Errors**: Digital forms with validation reduce mistakes

> "Avni has transformed our operations. We can now track every piece of material from collection to distribution, ensuring maximum impact."
> 
> — Operations Head, Goonj

## Impact & Results

Since implementing Avni:

- **1 million+** beneficiaries reached
- **500+ tons** of material tracked monthly
- **95% accuracy** in inventory management
- **3x faster** reporting cycles

![Dashboard showing impact metrics](/images/case-studies/goonj/dashboard.jpg)

## Looking Ahead

Goonj plans to:

1. Integrate Avni with their ERP system
2. Add photo documentation features
3. Expand to international operations

---

*For more information about Goonj's work, visit [goonj.org](https://goonj.org)*
```

---

## 7. Best Practices

### Content Writing

✅ **DO:**
- Write in clear, simple language
- Use active voice
- Include specific metrics and numbers
- Tell a story with beginning, middle, and end
- Use real quotes from organization members
- Break long paragraphs into shorter ones
- Use subheadings for scanability

❌ **DON'T:**
- Use jargon without explanation
- Write overly long paragraphs (>4-5 lines)
- Include generic stock photos
- Forget to proofread
- Use vague statements like "improved efficiency"

### Image Usage

✅ **DO:**
- Use real photos from the organization
- Show people using Avni in context
- Include screenshots of the app/dashboard
- Optimize images before uploading
- Provide descriptive alt text
- Maintain consistent image quality

❌ **DON'T:**
- Use generic stock photos
- Upload huge unoptimized files
- Use blurry or low-quality images
- Forget alt text
- Use images without permission

### Structure

✅ **DO:**
- Follow the recommended section structure
- Use consistent heading levels
- Include both challenges and solutions
- Add quantifiable results
- End with future plans

❌ **DON'T:**
- Skip important sections
- Use inconsistent formatting
- Focus only on features
- Forget to include impact metrics
- Leave the ending abrupt

---

## 📊 Design Specifications

### Automatic Styling

The following styles are **automatically applied** to your markdown:

| Element | Font | Size | Color | Spacing |
|---------|------|------|-------|---------|
| H2 Headings | Anek Latin Bold | 30px | #0B2540 | 40px top, 20px bottom |
| H3 Headings | Anek Latin Bold | 24px | #0B2540 | 32px top, 16px bottom |
| Body Text | Noto Sans | 18-24px | #000000 | 24px bottom |
| Blockquotes | Noto Sans Italic | 20-24px | #000000 | Lavender bg |
| Lists | Noto Sans | 18-24px | #000000 | 12px between items |
| Images | - | Full width | - | 32-48px spacing |

### Color Palette

- **Navy** (#0B2540): Headings
- **Black** (#000000): Body text
- **Teal/Green** (#419372): Links, buttons
- **Orange/Coral** (#FF8854): Sector tags
- **Lavender** (#F5F3FF): Quote backgrounds
- **Light Gray** (#E6E6E6): Borders

---

## 🚀 Publishing Checklist

Before publishing a case study, verify:

- [ ] All required frontmatter fields filled
- [ ] Slug is unique and URL-friendly
- [ ] Logo file exists in `/public/logos/`
- [ ] All images uploaded to correct folder
- [ ] Images optimized (< 500KB each)
- [ ] Alt text provided for all images
- [ ] Content proofread for spelling/grammar
- [ ] Metrics and numbers verified
- [ ] Organization name spelled correctly
- [ ] Links tested (if any)
- [ ] Date format correct (YYYY-MM-DD)
- [ ] Sector matches predefined options
- [ ] File saved as `.md` in `/content/case-studies/`

---

## 📁 File Organization

```
avninew-v2/
├── content/
│   └── case-studies/
│       ├── how-goonj-uses-avni.md
│       ├── arghyam-water-sanitation.md
│       └── [your-case-study-slug].md
│
└── public/
    ├── logos/
    │   ├── goonj-logo.png
    │   ├── arghyam-logo.png
    │   └── [your-org-logo].png
    │
    └── images/
        └── case-studies/
            ├── goonj/
            │   ├── hero-image.jpg
            │   ├── field-workers.jpg
            │   └── dashboard.jpg
            │
            └── [your-case-study-slug]/
                ├── image1.jpg
                ├── image2.jpg
                └── image3.jpg
```

---

## 🎨 Visual Consistency

All case studies automatically maintain consistent design:

- **Typography**: Anek Latin (headings) + Noto Sans (body)
- **Spacing**: Consistent margins and padding
- **Colors**: Brand color palette
- **Images**: Rounded corners (12-16px radius)
- **Quotes**: Lavender background, centered
- **Lists**: Proper indentation and spacing
- **Links**: Teal color with hover effect

**You don't need to worry about styling** - just write good markdown and the design system handles the rest!

---

## 💡 Tips for Great Case Studies

1. **Start with a hook**: Open with an interesting fact or challenge
2. **Use numbers**: Quantify impact whenever possible
3. **Tell a story**: Have a clear narrative arc
4. **Show, don't tell**: Use images to illustrate points
5. **Include quotes**: Real voices add authenticity
6. **Be specific**: Avoid vague generalizations
7. **Keep it scannable**: Use headings, lists, and short paragraphs
8. **End strong**: Conclude with impact and future vision

---

## 📞 Need Help?

If you have questions about:
- **Content**: Contact the content team
- **Technical issues**: Check the development documentation
- **Image optimization**: Use tools like TinyPNG or ImageOptim
- **Logo files**: Request from the organization

---

**Last Updated:** November 17, 2025  
**Version:** 1.0
