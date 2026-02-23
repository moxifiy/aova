# CLAUDE.md — Aova Project Guidelines

## Project Overview
- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion
- **Deployment:** Cloudflare Workers via OpenNext adapter
- **Purpose:** Design studio website for "Aova" — serving both brands and creators

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run deploy` — Build + deploy to Cloudflare Workers
- `npm run lint` — ESLint

## Architecture
- `src/app/page.tsx` — Home page (single-file, all components inline)
- `src/app/book-a-call/page.tsx` — Cal.com booking page
- `src/app/globals.css` — All custom CSS (design tokens, component styles)
- `src/app/layout.tsx` — Root layout with font loading (Instrument Serif, Outfit)
- `src/components/HeroLogo3D.tsx` — 3D wireframe logo (Three.js, react-three-fiber)
- `src/lib/utils.ts` — cn() utility (clsx + tailwind-merge)
- `public/AOVASTUDIO.svg` — Full wordmark logo used in footer

## Design System

### Colors (Light Mode — default)
- **Background:** `#F9F9F8` (--bg)
- **Surface:** `#FFFFFF` (--surface)
- **Borders:** `rgba(0,0,0,0.08)` (--border), `rgba(0,0,0,0.2)` (--border-hover)
- **Text:** `#000000` (--text), `#666666` (--muted)
- **Accent Pink:** `#FF3366` (--accent) — primary accent, CTAs, creator theme
- **Accent Blue:** `#3366FF` (--accent-blue) — brand theme
- **Accent Green:** `#00CC66` (--accent-green) — process/success highlights

### Colors (Dark Mode — toggled via body.dark)
- **Background:** `#0A0A0A`, **Surface:** `#141414`, **Text:** `#F9F9F8`, **Muted:** `#A0A0A0`
- Borders flip to `rgba(255,255,255,0.1)`

### Fonts
- **Instrument Serif** (--font-instrument → --font-head) — All headings (h1-h4), `.font-serif` class, italic for emphasis
- **Outfit** (--font-outfit → --font-body) — Body text, nav, buttons, metadata
- Font variables are defined on `body` (not `:root`) because Next.js injects font CSS vars on `<body>`

### Logo
- Aova geometric mark: inline SVG path `M171.27,0v91c0,44.33-35.94...`
- Used as custom cursor (rotated -90deg, mix-blend-mode: exclusion)
- Used as 3D wireframe in hero (HeroLogo3D component)
- AOVASTUDIO.svg wordmark in footer

## Key Patterns

### Sections & Navigation
- Navbar: floating pill, glassmorphism, dark mode toggle
- All scroll navigation uses instant `scrollToId()` — no smooth scroll delays
- `NAV_HEIGHT = 80` offset for scroll positioning
- Section order: Hero → Marquee → Work → Services → TrustedBy → Testimonials → Process → FAQ+Booking → Footer

### Interactive Services
- Two audience tabs: "I'm a creator" (pink #FF3366) / "I own a brand" (blue #3366FF)
- Starts with null state (nothing selected), tabs are toggleable
- Sticky selector with glassmorphism backdrop
- AnimatePresence for tab content transitions

### Booking Widget
- Embedded in FAQ section (right column, sticky)
- Uses `@calcom/embed-react` with `getCalApi()`
- 3D tilt on mouse move (useMotionValue + useSpring)
- Pink spotlight hover glow (useMotionTemplate radial gradient)
- Spark flash animation on CTA click (`animate-spark-flash` keyframe)
- Copy-to-clipboard email: aovastudio@gmail.com

### Animations
- Framer Motion for entrance animations, parallax, 3D tilt effects
- Custom cursor: Aova logo SVG with mix-blend-mode exclusion
- Marquee: rotating tagline carousel (AnimatePresence, 11s interval)
- Testimonials: horizontal auto-scroll carousel (CSS animation, pause on hover)
- Footer "Let's talk" has playful hover where "a" extends to "aaaaaaa"

## Design Guardrails
- Never use default Tailwind palette colors — use the custom CSS tokens
- Headings always use Instrument Serif; body/UI always uses Outfit
- Tight tracking (-0.03em) on large headings
- `cursor: none !important` globally — custom cursor on all elements
- Buttons use 3D tilt hover effects (rotateX/Y + translateZ + perspective)
- Portfolio pills use `var(--surface)` + `var(--border)` — adapt to dark mode
- Edge fade gradients on carousels use `var(--bg)` for theme compatibility

## Conventions
- All page components use "use client" directive
- Styling: mix of Tailwind utility classes + CSS custom properties from globals.css
- Dark mode: toggled by adding/removing `dark` class on `<body>`
- Custom cursor duplicated per-page (no shared component yet)
- Two AI tools work on this project: Claude (architecture, migrations, logic) and Antigravity (UI polish, animations, micro-interactions)
