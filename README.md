# Avni - AI Powered Digital Field Work Platform
---

## 🌟 About Avni

Avni is an open-source digital platform designed specifically for NGOs and social sector organizations.

---

## 🛠 Tech Stack

- **Framework:** Next.js 16 with App Router & Turbopack
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** Markdown with gray-matter
- **Forms:** React Hook Form with reCAPTCHA
- **Analytics:** Google Analytics 4 (ready)
- **Deployment:** Netlify (Static Export) / Docker
- **SEO:** Complete Open Graph, Twitter Cards, JSON-LD

---

## ⭐ Featured Content Management

### Overview
Featured content (blogs and case studies) is managed in **one centralized file**:
```
config/featured-content.ts
```

### ⚠️ Critical Rules
1. **ONLY ONE featured blog allowed**
2. **ONLY ONE featured case study allowed**
3. **Build will FAIL if you add more than one**
4. **Titles must be in double quotes without spaces**

### How to Make Content Featured

#### Step 1: Find the Exact Title
```bash
npm run list:titles
```
This lists all available blog and case study titles.

#### Step 2: Edit Configuration
Open `config/featured-content.ts` and add the exact title:

```typescript
// For Case Studies (ONLY ONE)
export const FEATURED_CASE_STUDIES: string[] = [
  "How Goonj Uses Avni To Digitise Offline Data Collection And Inventory Flow",
];

// For Blogs (ONLY ONE)
export const FEATURED_BLOGS: string[] = [
  "Technical Deep Dive: Offline-First Architecture",
];
```

**Important:**
- ✅ Use double quotes `"`
- ✅ No spaces before/after title
- ✅ Exact match (case-sensitive)
- ✅ Copy-paste from `npm run list:titles`

#### Step 3: Validate
```bash
npm run validate:featured
```

### What Happens If Build Fails?

If you add more than one featured item, the build will fail with:

```
❌ VALIDATION FAILED

❌ ERROR: 2 featured blogs found. Only 1 is allowed.
   Please remove extra titles from FEATURED_BLOGS array.

📝 TO FIX:
   1. Open: config/featured-content.ts
   2. Keep only ONE title in each array
   3. Comment out or remove extra titles
   4. Run: npm run validate:featured
```

**The build process will:**
- ❌ Stop immediately
- ❌ Show clear error message
- ❌ Prevent deployment
- ❌ Require you to fix before continuing

### Rotating Featured Content

To change featured content, comment out the old title:

```typescript
export const FEATURED_BLOGS: string[] = [
  "New Featured Blog Title",
  // "Old Featured Blog Title",  // Rotated out on 2024-11-11
];
```

### Quick Commands

| Command | Purpose |
|---------|---------|
| `npm run list:titles` | List all available titles |
| `npm run validate:featured` | Validate configuration |
| `npm run build` | Build (auto-validates) |

---

## 🚀 Installation & Deployment

### Local Development

```bash
# 1. Clone repository
git clone <repository-url>
cd avni-website

# 2. Install dependencies
npm install

# 3. Create environment file (optional)
cp .env.example .env.local
# Add your Google Analytics ID if you have one

# 4. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Docker Installation

#### Quick Start with Docker Compose
```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

#### Manual Docker Build
```bash
# Build image
docker build -t avni-website .

# Run container
docker run -p 3000:3000 avni-website

# With environment variables
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX \
  -e NEXT_PUBLIC_SITE_URL=https://avniproject.org \
  avni-website
```

Visit [http://localhost:3000](http://localhost:3000)

### Production Deployment (Netlify)

```bash
# 1. Build locally to test
npm run build

# 2. Deploy via Netlify CLI
netlify deploy --prod

# Or connect GitHub repo to Netlify for auto-deploy
```

**Netlify Build Settings:**
- Build command: `npm run build`
- Publish directory: `out`
- Node version: `20` (required for Next.js 16)

---

**Built with ❤️ for NGOs making a difference**
