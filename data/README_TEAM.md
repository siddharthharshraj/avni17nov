# Team Management Guide

## 📋 Quick Reference

**File to Edit:** `/data/team.ts`  
**Photos Location:** `/public/images/team/`  
**Page:** `/about` (About Us page)

---

## ✅ How to Add a New Team Member

### Step 1: Add Photo
1. Get a square photo (recommended: 400×400px or larger)
2. Save as: `firstname.jpeg` or `firstname.png`
3. Place in: `/public/images/team/`

**Example:** For "John Doe", save as `john.jpeg`

### Step 2: Add to Data File
1. Open `/data/team.ts`
2. Find the appropriate section:
   - **Founders** → Add to `founders` array
   - **Team Members** → Add to `team` array
3. Add the new entry in **alphabetical order** (for team members)

**Template:**
```typescript
{
  name: 'Full Name',
  image: '/images/team/firstname.jpeg',
  linkedin: 'https://www.linkedin.com/in/username/',
},
```

**Example:**
```typescript
{
  name: 'John Doe',
  image: '/images/team/john.jpeg',
  linkedin: 'https://www.linkedin.com/in/johndoe/',
},
```

### Step 3: Verify
1. Save the file
2. Check the About page (`/about`)
3. Verify the photo displays correctly
4. Test the LinkedIn link

---

## ❌ How to Remove a Team Member

### Step 1: Remove from Data File
1. Open `/data/team.ts`
2. Find the person's entry
3. Delete the entire block (including the comma)

**Before:**
```typescript
{
  name: 'John Doe',
  image: '/images/team/john.jpeg',
  linkedin: 'https://www.linkedin.com/in/johndoe/',
},
{
  name: 'Jane Smith',  // ← This stays
  ...
},
```

**After:**
```typescript
{
  name: 'Jane Smith',
  ...
},
```

### Step 2: (Optional) Remove Photo
1. Go to `/public/images/team/`
2. Delete the person's photo file

---

## 🔄 How to Update Team Member Info

### Update Name
```typescript
// Before
name: 'John Doe',

// After
name: 'John Smith',
```

### Update Photo
1. Replace the photo in `/public/images/team/`
2. Keep the same filename, OR
3. Update the `image` path in `team.ts`

### Update LinkedIn
```typescript
// Before
linkedin: 'https://www.linkedin.com/in/johndoe/',

// After
linkedin: 'https://www.linkedin.com/in/johnsmith/',
```

---

## 📝 Important Rules

### ✅ DO:
- Keep team members in **alphabetical order** (by first name)
- Use **full LinkedIn URLs** (not just usernames)
- Use **consistent image formats** (JPEG or PNG)
- Test the page after making changes

### ❌ DON'T:
- Add founders to the `team` array (they have their own section)
- Add team members to the `founders` array
- Duplicate entries
- Forget the comma after each entry
- Use relative LinkedIn URLs

---

## 🎨 Photo Guidelines

### Recommended Specs:
- **Size:** 400×400px minimum
- **Format:** JPEG or PNG
- **Aspect Ratio:** Square (1:1)
- **File Size:** Under 500KB
- **Background:** Solid color preferred (peach/salmon looks good)

### Naming Convention:
- **Format:** `firstname.jpeg` or `firstname.png`
- **Examples:**
  - `john.jpeg`
  - `mary.png`
  - `arjun.jpeg`

---

## 🔍 Troubleshooting

### Photo Not Showing?
1. Check the file path in `team.ts` matches the actual filename
2. Verify the photo is in `/public/images/team/`
3. Check file extension (`.jpeg` vs `.jpg` vs `.png`)
4. Clear browser cache and refresh

### LinkedIn Link Not Working?
1. Ensure you're using the full URL: `https://www.linkedin.com/in/username/`
2. Test the link in a new browser tab
3. Check for typos in the URL

### Name Not Displaying Correctly?
1. Check for special characters
2. Verify the name is in quotes: `name: 'John Doe',`
3. Ensure there's a comma after the closing brace

### Team Member in Wrong Section?
- **Founders** should only be in the `founders` array
- **Team members** should only be in the `team` array
- Move the entry to the correct array

---

## 📊 Current Team Count

**Founders:** 4  
**Team Members:** 15  
**Total:** 19

---

## 🚀 Quick Examples

### Adding a New Team Member (Alphabetically)

If adding "Emily Chen" to the team:

```typescript
export const team: TeamMember[] = [
  {
    name: 'A Ashok kumar',
    ...
  },
  {
    name: 'Achala Belokar',
    ...
  },
  // ← Add Emily here (after D, before H)
  {
    name: 'Emily Chen',
    image: '/images/team/emily.jpeg',
    linkedin: 'https://www.linkedin.com/in/emilychen/',
  },
  {
    name: 'Himesh R',
    ...
  },
  ...
];
```

### Removing a Team Member

To remove "Dinesh G":

```typescript
// DELETE THIS ENTIRE BLOCK:
{
  name: 'Dinesh G',
  image: '/images/team/dinesh_g.jpeg',
  linkedin: 'https://www.linkedin.com/in/dinesh-g-293198315/',
},
```

---

## 📞 Need Help?

If you encounter issues:
1. Check this guide first
2. Verify the syntax (commas, quotes, brackets)
3. Compare with existing entries
4. Ask a developer for assistance

---

**Last Updated:** November 2025  
**Maintained By:** Avni Team
