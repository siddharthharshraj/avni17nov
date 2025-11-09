# 🎨 How to Add the Avni Logo

## Logo Specifications (from Figma):
- **Position in Figma**: x=92, y=14
- **Size**: 49×45 px (just the green icon)
- **Full component size**: 122×45 px (icon + text)
- **Node ID**: I1:50;348:1344

---

## ✅ Quick Steps:

### Method 1: From Your Uploaded Image (Easiest)

1. **Download the image** you just uploaded to the chat
2. **Open in Preview** (Mac) or any image editor
3. **Crop** to just the green geometric icon (left part only)
4. **Resize** to approximately **45×41 pixels** (or keep larger for retina)
5. **Export as PNG** with transparent background
6. **Save as**: `/Users/samanvay/Downloads/avninew-v2/public/logo.png`

### Method 2: From Figma (Best Quality)

1. Open your Figma file: `Website - ready for dev`
2. Navigate to the Header section
3. Find the logo component (green geometric icon)
4. Select just the icon part (not the "avni" text)
5. Right-click → Export
6. Settings:
   - Format: **PNG**
   - Scale: **3x** (for retina displays)
   - Include: **Transparent background**
7. Export and save as `logo.png`
8. Move to: `/Users/samanvay/Downloads/avninew-v2/public/logo.png`

### Method 3: Extract from Figma File

If you have the `.fig` file locally:
1. Open `Website - ready for dev.fig` in Figma Desktop
2. Find the logo in the header (top-left)
3. Select the green icon component
4. File → Export → PNG (3x scale)
5. Save as `logo.png` in the `public/` folder

---

## 📐 Logo Details

The logo should be:
- **Just the green geometric icon** (4 curved squares pattern)
- **Color**: Mint/teal green (#5DCDB4 or similar)
- **Background**: Transparent
- **Format**: PNG
- **Recommended size**: 135×123 px (3x scale for retina)
- **Minimum size**: 45×41 px

---

## 🔍 Current Status

The header is looking for the logo at:
```
/Users/samanvay/Downloads/avninew-v2/public/logo.png
```

Once you add the file, it will appear automatically (hot reload).

---

## 💡 Temporary Workaround

If you want to see the layout without the logo, the header will show a broken image icon, but the "Avni" text will still display correctly.

---

## ✅ Verification

After adding the logo:
1. Check http://localhost:3000
2. Logo should appear in the top-left corner
3. Size should be 45×41 px
4. Should have transparent background
5. Should be crisp and clear (retina quality)
