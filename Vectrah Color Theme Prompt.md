# Vectrah — Color Theme Redesign Prompt
> Send this as a **single final prompt** in Antigravity after all 7 build prompts are complete.
> This prompt repaints the entire site's color system to match the official Vectrah logo.

---

## Context

The Vectrah logo has been provided. It uses:
- **"vec"** — deep cobalt blue, slightly muted, approximately `#2B3A9F`
- **"Tra"** — slightly lighter, transitioning toward royal blue, approximately `#3B4EC4`
- **"H"** — the darkest navy of the wordmark, approximately `#1E2B7A`
- **Swoosh graphic** — a bright, electric cyan-to-sky-blue sweep, approximately `#00B8E8` fading to `#7DD8F5`
- **Background** — clean off-white, `#F4F4F6`

The overall brand signal: **trust + precision + speed**. Deep navy = authority and medical credibility. Cyan sweep = innovation, velocity, and forward motion. This is a healthcare-tech brand that wants to feel both safe and cutting-edge.

---

## Your Task

Apply color psychology and UI best practices to redesign the **entire color token system** across these files:

```
src/index.css              ← CSS variables (root design tokens)
src/styles/variables.css   ← any secondary token file
src/styles/components.css  ← component-level color usage
src/components/layout/Header.jsx (and its inline styles)
src/components/layout/Footer.jsx (and its inline styles)
src/components/ui/LoadingScreen.jsx
src/components/ui/ScrollProgress.jsx
src/components/ui/CustomCursor.jsx
src/components/sections/*.jsx  ← all section components
src/pages/About.jsx
```

---

## New Color Token System

Replace ALL existing color variables with this new system derived from the logo:

```css
:root {
  /* ── Backgrounds ─────────────────────────────────────── */
  --color-bg:           #04070F;   /* near-black with blue undertone — deeper than pure black */
  --color-surface:      #080E1C;   /* dark navy surface for cards/panels */
  --color-surface-2:    #0C1428;   /* slightly elevated surface */
  --color-surface-3:    #101C38;   /* hover/active states on surfaces */

  /* ── Brand Colors (extracted from logo) ─────────────── */
  --color-navy:         #1E2B7A;   /* darkest wordmark navy — headers, hero text */
  --color-royal:        #2B3A9F;   /* mid wordmark blue — primary interactive color */
  --color-bright:       #3B4EC4;   /* lighter wordmark blue — hover states */
  --color-cyan:         #00B8E8;   /* swoosh peak cyan — primary accent, CTAs */
  --color-sky:          #7DD8F5;   /* swoosh fade — secondary accent, highlights */

  /* ── Semantic Aliases (use these in components) ──────── */
  --color-primary:      #00B8E8;   /* cyan — main CTAs, highlights, active states */
  --color-primary-dim:  rgba(0, 184, 232, 0.12); /* cyan with transparency for backgrounds */
  --color-primary-glow: rgba(0, 184, 232, 0.25); /* cyan glow for hover shadows */
  --color-accent:       #3B4EC4;   /* royal blue — secondary emphasis, labels */
  --color-accent-dim:   rgba(59, 78, 196, 0.15);

  /* ── Text ────────────────────────────────────────────── */
  --color-text:         #DDE4F5;   /* slightly blue-tinted white — warmer on dark bg */
  --color-text-muted:   #7A8DB5;   /* muted blue-gray — body copy, descriptions */
  --color-text-subtle:  #4A5A80;   /* very muted — placeholder, disabled */

  /* ── Borders ─────────────────────────────────────────── */
  --color-border:       rgba(59, 78, 196, 0.18);   /* royal blue tinted border */
  --color-border-hover: rgba(0, 184, 232, 0.35);   /* cyan on hover */

  /* ── Typography (unchanged) ─────────────────────────── */
  --font-display:       'Syne', sans-serif;
  --font-body:          'DM Sans', sans-serif;

  /* ── Layout (unchanged) ─────────────────────────────── */
  --radius-sm:          8px;
  --radius-md:          12px;
  --radius-lg:          20px;
  --transition:         cubic-bezier(0.16, 1, 0.3, 1);
  --max-width:          1200px;
}
```

---

## Component-Level Changes

### 1. `body` background
```css
body { background-color: var(--color-bg); }
```
The bg is `#04070F` — a near-black with a deep blue undertone. This makes the royal blue Three.js lighting feel physically connected to the page, not floating on a void.

### 2. Scroll Progress Bar
Replace the `#00c8ff → #7b5cfa` gradient with:
```css
background: linear-gradient(90deg, #00B8E8, #3B4EC4);
```

### 3. Loading Screen
- Logo text color: `#00B8E8` (cyan)
- Progress bar fill: `linear-gradient(90deg, #00B8E8, #3B4EC4)`
- Background: `#04070F`

### 4. Custom Cursor
- Dot color: `#00B8E8`
- Ring border: `rgba(0, 184, 232, 0.5)`
- Ring on hover: border-color `rgba(59, 78, 196, 0.7)`, background `rgba(0, 184, 232, 0.06)`

### 5. Header
- Default: `background: transparent`
- `.scrolled` state:
  ```css
  background: rgba(4, 7, 15, 0.88);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border);
  ```
- Logo "Vectrah" text: use a CSS gradient text effect matching the logo's navy-to-blue:
  ```css
  background: linear-gradient(135deg, #7DD8F5 0%, #00B8E8 40%, #3B4EC4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  ```
- Nav links: `color: var(--color-text-muted)`, hover: `color: var(--color-text)`
- CTA "Request Demo" button:
  ```css
  background: var(--color-cyan);
  color: #04070F;  /* dark text on cyan — passes WCAG AA */
  ```
  Hover: `box-shadow: 0 6px 24px var(--color-primary-glow)`

### 6. Footer
- Background: `var(--color-surface)` — `#080E1C`
- Top border: `1px solid var(--color-border)`
- Link hover color: `var(--color-primary)`
- Social icon hover: `color: var(--color-cyan)`

### 7. Feature Sections
- `.feature-label` color: `var(--color-cyan)` — `#00B8E8`
- `.feature-headline` color: `var(--color-text)` — `#DDE4F5`
- `.feature-body` color: `var(--color-text-muted)` — `#7A8DB5`
- `.feature-stat` color: `var(--color-cyan)`
- `.feature-bullet::before` (▸ marker): `var(--color-accent)` — `#3B4EC4`
- Section left-edge gradient:
  ```css
  background: linear-gradient(
    to right,
    rgba(4, 7, 15, 0.95) 0%,
    rgba(4, 7, 15, 0.82) 45%,
    transparent 100%
  );
  ```

### 8. Buttons
```css
.btn-primary {
  background: var(--color-cyan);
  color: #04070F;   /* dark on cyan for contrast */
}
.btn-primary:hover {
  box-shadow: 0 8px 32px var(--color-primary-glow);
  transform: translateY(-2px);
}
.btn-ghost {
  border-color: var(--color-border);
  color: var(--color-text);
}
.btn-ghost:hover {
  border-color: var(--color-cyan);
  color: var(--color-cyan);
}
```

### 9. Hero Section
- H1 accent word (e.g. "Clinical Documentation"): `color: var(--color-cyan)`
- Eyebrow label: `color: var(--color-cyan)`
- Scroll chevron: `border-color: var(--color-cyan)`

### 10. CTA Section
Replace the radial gradient background:
```css
background: radial-gradient(ellipse at center, #0B1535 0%, var(--color-bg) 70%);
```
Heading: `var(--color-text)`
Eyebrow: `var(--color-cyan)`

### 11. About Page

**Feature cards:**
```css
background: var(--color-surface);
border: 1px solid var(--color-border);
```
Hover:
```css
transform: translateY(-5px);
box-shadow: 0 16px 48px rgba(0, 184, 232, 0.1);
border-color: var(--color-border-hover);
```
Icon background circle (for emoji icons):
```css
background: var(--color-primary-dim);
border-radius: 12px;
padding: 12px;
```

**Timeline year labels:** `color: var(--color-cyan)`

**Team avatar circles:**
Use a gradient background matching the logo:
```css
background: linear-gradient(135deg, #1E2B7A, #00B8E8);
color: #DDE4F5;
```

**Pull quote:** `color: var(--color-cyan)`, `font-style: italic`

**Mission blockquote:** gradient text effect:
```css
background: linear-gradient(135deg, #DDE4F5, #00B8E8);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

### 12. Three.js Scene Lighting
Update `src/components/three/SceneLighting.jsx`:
```jsx
// Replace existing light colors with logo-derived values:
<ambientLight color={0x1a2550} intensity={0.5} />  {/* deep navy ambient */}
<directionalLight color={0xdde4f5} intensity={1.1} position={[3, 4, 3]} castShadow />
{/* Cyan rim light — left (matches logo swoosh) */}
<pointLight color="#00B8E8" intensity={0.9} position={[-2, 1, 2]} />
{/* Royal blue fill — back */}
<pointLight color="#3B4EC4" intensity={0.6} position={[2, -1, -1]} />
{/* Sky blue highlight — top */}
<pointLight color="#7DD8F5" intensity={0.3} position={[0, 3, 1]} />
```

### 13. Particle Field
Update `src/components/three/Particles.jsx`:
```jsx
// Change particle color to match cyan from logo
<pointsMaterial size={0.015} color="#00B8E8" transparent opacity={0.35} sizeAttenuation />
```

### 14. Noise Overlay
Keep the same technique but slightly reduce opacity since the new bg is already deep:
```css
body::after { opacity: 0.018; }
```

---

## Color Psychology Rationale

Include this as a comment block in `src/styles/variables.css` for documentation:

```css
/*
  VECTRAH COLOR SYSTEM — Derived from brand logo
  ─────────────────────────────────────────────
  NAVY  (#1E2B7A): Authority, trust, medical credibility.
                   Used in deep backgrounds and ambient lighting.
                   Triggers subconscious association with established
                   institutions — hospitals, insurance, finance.

  ROYAL (#2B3A9F): Primary interactive color. Slightly lighter than
                   navy to create clear visual hierarchy. Strong
                   contrast against the dark bg for accessibility.

  CYAN  (#00B8E8): Action, innovation, speed. The logo swoosh color.
                   Used for all CTAs, highlights, and key stats.
                   In healthcare UX, cyan signals technology and
                   forward-thinking — not the "cold blue" of legacy
                   EMRs, but the warm-cool of modern health-tech.

  SKY   (#7DD8F5): The fade end of the swoosh. Softer accent for
                   secondary highlights, avatar gradients, callouts.

  BG    (#04070F): Near-black with blue undertone. Prevents the UI
                   from feeling like "just another dark mode" and
                   instead makes it feel like a specialized clinical
                   environment — a controlled, focused space.

  TEXT  (#DDE4F5): Blue-tinted off-white. Harmonizes with the bg's
                   blue undertone. Slightly softer than pure white
                   to reduce eye strain during long clinical sessions.
*/
```

---

## Final Verification Checklist

After applying all changes, verify:

- [ ] `npm run dev` — no CSS errors, all variables resolve
- [ ] Header: logo text has gradient effect matching the logo colors
- [ ] CTA buttons: dark text on cyan background (check contrast ≥ 4.5:1 via browser DevTools)
- [ ] Feature labels, stat numbers, scroll chevrons: all `#00B8E8`
- [ ] Feature bullet markers (▸): all `#3B4EC4`
- [ ] Scroll progress bar: cyan → royal blue gradient
- [ ] Loading bar: cyan → royal blue gradient
- [ ] Three.js scene: cyan rim light visible on laptop model
- [ ] About page team avatars: navy-to-cyan gradient
- [ ] About page timeline years: cyan
- [ ] No leftover `#00c8ff` or `#7b5cfa` values anywhere in the codebase

Run a global search to confirm:
```bash
grep -r "#00c8ff\|#7b5cfa\|#7B5CFA\|#050810" src/
```
Zero results = complete.
