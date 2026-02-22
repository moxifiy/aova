# CLAUDE.md — Aova Project Guidelines

## Project Overview
- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion
- **Deployment:** Cloudflare Workers via OpenNext adapter
- **Purpose:** Premium design studio website for "Aova"

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run deploy` — Build + deploy to Cloudflare Workers
- `npm run lint` — ESLint

## Architecture
- `src/app/page.tsx` — Home page (single-file, all components inline)
- `src/app/book-a-call/page.tsx` — Cal.com booking page
- `src/app/globals.css` — All custom CSS (design tokens, component styles)
- `src/lib/utils.ts` — cn() utility (clsx + tailwind-merge)
- `src/components/ui/animated-grid-pattern.tsx` — Animated grid pattern (framer-motion)
- `src/app/layout.tsx` — Root layout with font loading (DM Sans, JetBrains Mono, DM Serif Display)

## Design System
- **Background:** `#0D0D0D` (--bg)
- **Surface:** `#111111` (--surface)
- **Borders:** `#222222` (--border)
- **Accent:** `#E8FF47` lime (--accent)
- **Text:** `#F0F0F0` (--text), `#666` (--muted)
- **Fonts:** DM Sans (headings + body, weight 600-700), JetBrains Mono (labels/tags/meta), DM Serif Display italic (emphasis in headings)
- **Logo:** AOVA1G.svg geometric mark, inline SVG with `fill="currentColor"`
- **Pattern:** `<em>` inside h1/h2/h3 renders in DM Serif Display italic + accent color

## Design Guardrails
- Never use default Tailwind palette colors — use the custom tokens above
- Pair display font (Syne) with mono (JetBrains Mono) — never use the same font for headings and metadata
- Tight tracking (-0.03em) on large headings, generous line-height (1.7) on body text
- Only animate `transform` and `opacity` — never `transition-all`
- Every clickable element needs hover, focus-visible, and active states
- Use layered, color-tinted shadows — not flat shadow-md
- Maintain the noise overlay texture and custom cursor across all pages
- Surfaces use a layering system: base (#0D0D0D) → elevated (#111) → floating (glassmorphism nav)

## Conventions
- All page components use "use client" with CSS class-based styling from globals.css
- Scroll reveal uses IntersectionObserver via the Reveal component
- Custom cursor is duplicated per-page (no shared components extracted yet)
- Nav links use JetBrains Mono at 11px uppercase with 0.06em tracking
- Section headers use the .section-tag (mono) + .section-title (Syne) pattern
