# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 multi-language microcement company website with i18n support (English/Estonian).

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

- **Routing**: Next.js App Router with `[lang]` dynamic segment for internationalization. All routes live under `src/app/[lang]/`.
- **i18n**: Language files in `src/i18n/dictionaries/` (en.json, et.json). Switching handled via URL segment.
- **Styling**: Tailwind CSS v4 with custom design tokens in `src/app/[lang]/globals.css`. Path alias `@/*` maps to `src/*`.
- **Components**: `src/components/` organized by feature (home, layout, products, projects, etc.). UI components use Framer Motion for animations.
- **API**: Route handlers in `src/app/api/` for server-side operations.
- **Public assets**: `public/assets/` contains images and static files.

## Key Files

- `src/i18n/dictionaries/` — Translation JSON files
- `src/app/[lang]/layout.tsx` — Root layout with navbar/footer
- `src/components/layout/Navbar.tsx` — Main navigation
- `src/components/search/AIAssistant.tsx` — AI-powered search (uses Google Generative AI)