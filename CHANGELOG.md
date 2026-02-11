# Changelog

## Visual Overhaul — Dark Theme + Scroll Animations (2026-02-10)

Complete visual redesign of the Elysium Cyber landing page. Transformed from a flat, gray-toned site into a modern dark-themed cybersecurity site with muted indigo accents, scroll animations, and professional polish.

### Color System

- **Updated 5 color tokens** in `content/data/style.json`:
  - `light`: `#ffffff` → `#F8FAFC` (slate-50)
  - `dark`: `#4A4A4A` → `#0F172A` (slate-900, deep navy)
  - `neutral`: `#E8E8EB` → `#F1F5F9` (slate-100)
  - `neutralAlt`: `#DCDCDC` → `#1E293B` (slate-800, dark cards)
  - `primary`: `#2a2a2a` → `#4F46E5` (indigo-600)
- **Added accent colors** to Tailwind config: `primaryLight` (#818CF8), `primaryDark` (#3730A3)
- **Added dark shadows**: `card-dark`, `card-dark-hover` (indigo-tinted glow), `glow`
- **New CSS palette**: `bg-neutralAlt-fg-light` for dark cards on dark sections
- **Updated all palette blocks**: secondary buttons now use indigo accent colors

### Dark Header

- Header switched to `bg-dark-fg-light` with white logo
- Drop shadow replaced with subtle `border-b border-white/5`

### Hero Section

- Dark navy background (`bg-dark-fg-light`) with white text
- Subtle abstract background texture at 8% opacity
- Increased vertical padding for visual weight

### Section Color Flow

- Alternating light/dark sections for visual rhythm:
  - Hero: dark navy
  - What We Do: light
  - How We Work: light with subtle grid texture
  - Where We Help Most: dark navy with slate-800 cards
  - Recent Work: light
  - Internships: neutral gray
  - Who We Are: light
  - Final CTA: dark navy with abstract texture

### Buttons

- Hover effect changed from `scale(1.03)` to `translateY(-1px)` with shadow lift
- Active state uses `translateY(0)` with smaller shadow
- Secondary buttons use indigo border/text on light backgrounds, indigo-400 on dark

### Footer

- Subtle top border accent (`border-t border-white/5`)
- Muted heading text (`text-light/60`)
- Indigo accent links that brighten on hover

### Scroll Animations (Framer Motion)

- **Installed `framer-motion`** as a dependency
- **`ScrollReveal` component** (`src/components/atoms/ScrollReveal/`): Fade + slide-in on scroll with configurable direction, delay, and distance. Hero section uses mount animation instead of scroll trigger.
- **`StaggerChildren` component** (`src/components/atoms/StaggerChildren/`): Staggered card grid animations where items fade + slide up sequentially.
- **GenericSection**: Wrapped with `ScrollReveal` for scroll-triggered fade-in
- **FeaturedItemsSection**: All grid variants (ThreeColGrid, TwoColGrid, SmallList, BigList) use `StaggerChildren` + `StaggerItem`
- **PageLayout**: Passes `sectionIndex` to all section components so the hero (index 0) can animate on mount
- **Accessibility**: All animations respect `prefers-reduced-motion`

### Final Polish

- Smooth scrolling (`scroll-behavior: smooth`)
- Indigo selection highlight (`::selection`)
- Indigo focus ring for keyboard navigation (`*:focus-visible`)
- Font weight 600 added to Inter and Roboto Slab

### Files Changed

| File | Change |
|------|--------|
| `content/data/style.json` | Color tokens |
| `content/data/header.json` | Dark header + white logo |
| `content/pages/index.md` | Hero, section colors, backgrounds |
| `tailwind.config.js` | Accent colors, shadows, safelist |
| `src/css/main.css` | Palettes, cards, buttons, global polish |
| `src/components/layouts/DefaultBaseLayout/index.tsx` | Base bg change |
| `src/components/layouts/PageLayout/index.tsx` | Pass sectionIndex prop |
| `src/components/sections/Header/index.tsx` | Shadow → subtle border |
| `src/components/sections/Footer/index.tsx` | Top border accent |
| `src/components/sections/GenericSection/index.tsx` | ScrollReveal integration |
| `src/components/sections/FeaturedItemsSection/index.tsx` | StaggerChildren integration |
| `src/components/atoms/ScrollReveal/index.tsx` | **New** — scroll reveal wrapper |
| `src/components/atoms/StaggerChildren/index.tsx` | **New** — stagger animation wrapper |
| `src/components/atoms/index.ts` | Export new atoms |
| `src/pages/_document.js` | Font weight 600 |
| `package.json` | framer-motion dependency |
