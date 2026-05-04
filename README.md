# Avni Website

The official website for [Avni](https://avniproject.org) — an open-source field data collection platform built for NGOs and the social sector.

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** Markdown with `gray-matter` + remark/rehype
- **Forms:** Formspree + reCAPTCHA
- **Hosting:** Netlify

## Quick start

```bash
nvm use                       # uses .nvmrc (Node 20)
npm install
cp .env.example .env.local    # fill in keys you have
npm run dev                   # http://localhost:3000
```

## Project structure

```
app/             Routes, layouts, API handlers
components/      React components, grouped by feature
content/         Markdown content (blogs, case studies, authors)
data/            Static data imported by components
design-system/   Tokens, animations, design specs
docs/            Internal docs and design audits
hooks/           Reusable React hooks
lib/             Non-component logic (seo, analytics, utils, types)
netlify/         Netlify functions
public/          Static assets
scripts/         Build, image, and content scripts
types/           Shared TypeScript types
```

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the full contributor guide, conventions, and PR checklist.

## Common scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the project |
| `npm run type-check` | TypeScript check |
| `npm run format` | Prettier write |
| `npm run blog:setup` | Migrate + convert blog images |
| `npm run seo:audit` | SEO audit |

## Adding a blog post

Create `content/blogs/your-slug.md`:

```markdown
---
title: "Your Blog Title"
slug: "your-slug"
category: "User Story"   # User Story | Technical Story | Avni News | Sector
image: "/images/blogs/your-slug/hero.webp"
description: "Short description for SEO and previews"
date: "2026-05-04"
author: "Author Name"
readTime: "5 min read"
tags: ["tag1", "tag2"]
---

Body in Markdown.
```

Drop hero / inline images in `public/images/blogs/<slug>/` and run:

```bash
npm run blog:images       # convert to WebP
npm run blog:validate     # sanity-check assets
```

The most recent blog post (by `date`) is featured automatically. To pin a specific post, add `featured: true` to its front matter.

## Environment variables

See `.env.example` for the full list. The minimum to run locally is empty — most features degrade gracefully without keys.

## Deployment

- **Netlify (default):** push to `main`. Netlify picks up `netlify.toml`. Build command: `npm run build`. Publish directory: `out`. Node version: `20`.
- **Docker:**
  ```bash
  docker compose up -d
  ```

## License

[AGPL-3.0](./LICENSE)

## Links

- Website: <https://avniproject.org>
- Avni org on GitHub: <https://github.com/avniproject>
