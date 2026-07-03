# MASTER PROMPT — AOVA Studio Website

> **How to use this document:** This is the single source of truth for building the AOVA Studio website. Treat every rule below as binding for brand, color, typography, layout, and motion. This is a *direction* document, not a layout to clone — make confident design decisions within these rules, and re-read the relevant section before building each page. When in doubt, follow the DIRECTION GUARDRAILS at the end.

---

## ABOUT THE BRAND

AOVA is a digital design studio (logo, identity, branding, web, UI/UX, content for creators and brands). The site must feel like the studio's best work: **confident, premium, and minimal, with sharp bursts of energy.** Think a calm white editorial canvas built on restraint and huge whitespace — then oversized typography and full-bleed media carry the visual weight, and **fuchsia appears rarely but boldly** as the signature moment.

The reference *feel* (not to copy) is the editorial calm and scale of high-end brand consultancies: enormous breathing room, a strict two-typeface system, near-zero color until it's deployed with intent. AOVA should read as that, but younger, sharper, and unmistakably its own.

## GENERAL RULES

- This is a **direction**, not a layout to clone. Design freely *within* the brand rules below. Make deliberate choices; don't default to generic AI layouts.
- Stack: **Next.js** + **Next/Image** (static) and `<video>` (autoplay, muted, loop, playsInline) for motion. Lazy-load below the fold.
- **GSAP + ScrollTrigger** for scroll reveals and hover motion. Optional **Lenis** for smooth-scroll inertia. **Swiper** only if a carousel is used.
- Each major section = a separate React component. Each page = its own route.
- Imagery from Unsplash/Pexels, matching the treatment described per section. Use placeholders that look like real studio work (branding mockups, UI screens, posters).
- Target Lighthouse 90+.
- Fully responsive: Desktop, Tablet (collapse grids, reduce type), Mobile (single column, hamburger nav).

## DESIGN SYSTEM

### Color
- Canvas: **white `#FFFFFF`** — the dominant surface across the whole site.
- Ink: **black `#0A0A0A`** — text, lines, wordmarks.
- Signature: **fuchsia `#E0218A`** (tune toward `#D6006E`–`#FF2D9B` to taste).
- Muted gray `#8A8A8A` for secondary text and hairline borders.

**Fuchsia usage — this is the core rule.** Fuchsia is *absent* across most of the site (white + black only), then deployed in **one or two full saturated moments** — primarily a **full-bleed fuchsia footer**, and optionally one fuchsia section break or CTA block. Beyond that, only small accents: link hovers, active nav state, the cursor, pill outlines on hover, a play button. Never wash the whole site in it — the power comes from its scarcity. (Same logic as a single bold accent color on an otherwise restrained site: 95% restraint, 5% explosion.)

### Typography
A deliberate **two-typeface contrast** — this carries the premium/editorial feel:
- **Display** — an oversized grotesk for headlines, the AOVA wordmark, hero statements, the giant footer wordmark. Suggestions: *Space Grotesk*, *Neue Haas Grotesk*, *Suisse Intl*, or a sharp geometric like *General Sans*. Heavy where it counts.
- **Text/Accent** — either a clean grotesk for body OR a high-contrast serif (*Newsreader*, *Spectral*) used selectively for a single large "statement" line to add the editorial, premium note. Pick one serif moment and let it breathe.
- Sentence case by default (avoid all-caps walls); reserve uppercase for tiny labels/eyebrows if useful.
- Use `clamp()` so display type scales from ~40px mobile to 120px+ desktop, and a full-bleed wordmark up to ~280px.

### Layout
- Edge-to-edge white, generous horizontal padding (~48px desktop, 16px mobile), max content ~1440px.
- **Huge vertical rhythm** — large empty gaps between sections (100–160px). Whitespace is a feature.
- Small section labels/eyebrows top-left of each section (a quiet editorial signature).
- A floating/sticky minimal header. A custom fuchsia cursor or hover-dot is encouraged as a small signature.

## PAGES

### 1. Home
- **Header:** AOVA wordmark left; links "Work / About / Services / Contact" + a small menu or search affordance. Minimal, sticky; active link in fuchsia. Consider a subtle scroll-condense behavior.
- **Hero:** big and confident — either a full-bleed showreel/video of studio work, or an oversized type statement (e.g. a one-line manifesto) with a small reel behind/beside it. Bottom-corner metadata (studio name, location, year) for editorial feel.
- **Statement / Ambition:** one large line in the serif (or display), with key words as fuchsia or underlined inline links — what AOVA does, in one breath.
- **Selected Work:** an editorial grid (2-col with staggered vertical offset, or asymmetric) of project cards: looping video/image thumbnail, project name, one-line descriptor, small category pills (rounded-full hairline). Hover: media scales subtly, accent appears.
- **Services teaser:** brief list of what AOVA offers, linking to the Services page.
- **CTA block (optional fuchsia moment):** a bold full-width fuchsia panel — "Let's build your brand" → Contact.
- **Footer:** see shared footer below.

### 2. Work / Portfolio
- A larger grid/index of all projects, filterable by category (Branding, Web, UI/UX, Content) — filters as hairline pills, active = fuchsia.
- Each item links to a case-study detail layout: full-bleed hero, project meta (client, year, services), large imagery interspersed with short text, next-project link. Keep it editorial and image-led.

### 3. About
- Studio story, approach, and what makes AOVA different. A large serif statement up top.
- Optional: founder/team, values, a playful-but-premium tone. One fuchsia accent moment.

### 4. Services
- Clear breakdown of offerings (for creators: editing, thumbnails; for brands: identity, websites, ads, UI/UX) with the **three pricing tiers**.
- Tiers as clean cards — mostly white/black, the recommended tier highlighted in fuchsia. Keep typographic, not gimmicky.

### 5. Contact
- Simple, confident: a large "Let's talk" statement, contact methods, and a form (name, email, message). Do NOT use HTML `<form>` semantics that auto-submit in artifacts — wire it with handlers.
- Possibly the second full fuchsia moment of the site.

### Shared Footer
- A bold **full-bleed fuchsia footer** (`#E0218A`), black text: short CTA line ("Let's make something."), contact + social links (each with → prefix), "Back to top" (↑).
- An enormous **"AOVA" wordmark** bleeding full width at the very bottom (display type, up to ~280px). This is the site's signature closing note.

## ANIMATION
- Scroll reveals: fade + translate-up, staggered, on section/card entry (ScrollTrigger).
- Work cards: subtle media scale on hover; accent/label fade-in.
- A signature hover moment somewhere (e.g. a "VIEW →" marquee on work cards, or the custom fuchsia cursor reacting to interactive elements).
- Header condense on scroll.
- Footer wordmark reveal.
- Easing `cubic-bezier(0.65, 0, 0.35, 1)`, durations 0.4–0.8s. Motion should feel smooth and expensive, never bouncy or busy.

## RESPONSIVE
- Tablet: nav → menu button; grids → 2-col; display type reduced.
- Mobile: logo + hamburger; single-column stacks; full-bleed hero with corner metadata; pills wrap; footer columns stack; wordmark scales to width; padding 16px.
- All type/spacing via `clamp()`.

## PERFORMANCE
- Next/Image responsive `sizes` + lazy load; videos `preload="metadata"`, muted, playsInline, IntersectionObserver-mounted. Code-split sections/pages, defer GSAP/Swiper. Lighthouse 90+.

## DIRECTION GUARDRAILS (the feel)
- **Restraint first.** White and black do 95% of the work. Whitespace and scale are the design.
- **Fuchsia is an event, not a coat of paint.** One or two saturated moments (footer + maybe one CTA/section); everything else is accents only.
- **Two-typeface contrast** is essential to the premium feel — keep display and serif/text distinct.
- Premium *and* bold *and* playful = confident minimalism with sharp energy. When unsure, choose the calmer, more editorial option, then let one element be loud.
- Avoid generic SaaS-template aesthetics, drop shadows everywhere, gradients, and rounded-corner card soup. Sharp, intentional, editorial.

## OUTPUT
- Return only the final implementation code and configuration. No commentary.
- Follow all rules above with precision, but make confident design decisions within them.

---

## BUILD INSTRUCTIONS (for the model reading this file)
- Build the site **one page at a time**, starting with Home, unless told otherwise.
- Treat this document as the source of truth across every page — re-read the relevant section before each build.
- Confirm brand rules (color restraint, two-typeface contrast) are honored before finalizing each page.
