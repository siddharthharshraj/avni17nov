# Contributing to the Avni Website

Thanks for your interest in contributing. This document explains the project layout, local setup, and the workflow we expect contributors to follow.

## Project layout

```
.
├── app/                  Next.js App Router pages, layouts, and API routes
│   └── api/              Server-side route handlers
├── components/           React components, grouped by feature
│   ├── layout/           Header, Footer, MobileMenu, AnnouncementBanner
│   ├── navigation/       Nav-specific UI
│   ├── sections/         Landing-page sections (Hero, FeaturesGrid, ...)
│   ├── ui/               Reusable primitives (Button, Container, Section, ...)
│   └── <feature>/        Feature-scoped components (blog, case-studies, ...)
├── content/              Markdown content (blogs, case studies, authors)
├── data/                 Static data files imported by components
├── design-system/        Tokens, animations, shared design specs
├── docs/                 Internal docs (architecture notes, runbooks, design audits)
├── hooks/                Reusable React hooks
├── lib/                  Non-component logic (SEO, analytics, utilities, types)
├── netlify/              Netlify functions and config helpers
├── public/               Static assets served as-is
├── scripts/              Build / image / migration scripts
├── types/                Shared TypeScript types
├── next.config.js        Next.js config
├── tailwind.config.ts    Tailwind config
└── tsconfig.json         TypeScript config (path aliases live here)
```

The single import alias is `@/*`, which resolves to the repo root. Example: `import { Button } from '@/components/ui/Button'`.

## Local setup

Requirements: Node 20 (see `.nvmrc`), npm 10+.

```bash
nvm use                 # picks up .nvmrc
npm install
cp .env.example .env.local   # fill in keys you need
npm run dev             # http://localhost:3000
```

## Useful scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint with autofix |
| `npm run type-check` | `tsc --noEmit` |
| `npm run format` | Prettier write |
| `npm run format:check` | Prettier check (CI) |
| `npm run images:convert` | Convert `public/` images to WebP |
| `npm run blog:setup` | Migrate + convert blog images |
| `npm run seo:audit` | SEO audit script |

## Branch & commit conventions

- Branch off `main`: `feat/<short-name>`, `fix/<short-name>`, `chore/<short-name>`, `docs/<short-name>`.
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `perf:`, `test:`.
- Keep commits focused. One logical change per commit beats one mega-commit.

## Pull request checklist

Before opening a PR:

- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] `npm run format:check` passes
- [ ] You've updated `README.md` / docs if behaviour or setup changed
- [ ] You've added / updated content in `content/` for any blog or case-study work

PRs should describe **what changed** and **why**, and link any relevant issue.

## Adding content

- **Blogs:** drop a Markdown file in `content/blogs/` with the front matter described in `README.md`. Hero images go in `public/images/blogs/<slug>/`. Run `npm run blog:images` to convert assets.
- **Case studies:** see `content/case-studies/`.
- **Authors:** add to `content/authors/` and reference by slug in front matter.

## Styling

- Tailwind utility-first. Theme tokens live in `design-system/tokens/`.
- Prefer `clsx` + `tailwind-merge` (`lib/utils`) over hand-rolled string concatenation.
- Components that show across the site live in `components/ui/` and `components/layout/`. Page-specific components live in `components/<feature>/`.

## Reporting bugs

Open a GitHub issue with reproduction steps, expected vs actual behaviour, and a screenshot or link if it's a visual bug.
