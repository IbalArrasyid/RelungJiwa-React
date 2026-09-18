---
name: Warm Editorial Sanctuary
colors:
  surface: '#fef9f2'
  surface-dim: '#ded9d3'
  surface-bright: '#fef9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f3ec'
  surface-container: '#f2ede6'
  surface-container-high: '#ece7e1'
  surface-container-highest: '#e7e2db'
  on-surface: '#1d1c17'
  on-surface-variant: '#504440'
  inverse-surface: '#32302c'
  inverse-on-surface: '#f5f0e9'
  outline: '#82746f'
  outline-variant: '#d4c3bd'
  surface-tint: '#7a5647'
  primary: '#664537'
  on-primary: '#ffffff'
  primary-container: '#815c4d'
  on-primary-container: '#ffdbcd'
  inverse-primary: '#ebbcaa'
  secondary: '#b12b2a'
  on-secondary: '#ffffff'
  secondary-container: '#fd625b'
  on-secondary-container: '#650008'
  tertiary: '#165369'
  on-tertiary: '#ffffff'
  tertiary-container: '#346b82'
  on-tertiary-container: '#bee9ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcd'
  primary-fixed-dim: '#ebbcaa'
  on-primary-fixed: '#2e150a'
  on-primary-fixed-variant: '#603f31'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb3ad'
  on-secondary-fixed: '#410003'
  on-secondary-fixed-variant: '#8f0f16'
  tertiary-fixed: '#bee9ff'
  tertiary-fixed-dim: '#99cee8'
  on-tertiary-fixed: '#001f2a'
  on-tertiary-fixed-variant: '#0c4d63'
  background: '#fef9f2'
  on-background: '#1d1c17'
  surface-variant: '#e7e2db'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 68px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 36px
  headline-sm:
    fontFamily: Newsreader
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 30px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  quote-editorial:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies a warm editorial sanctuary tailored for non-clinical mental wellness, emotional introspection, and mindful guidance. It deliberately avoids sterile, clinical hospital tropes and sanitized corporate therapy interfaces. Instead, it draws inspiration from high-end literary journals, natural tactile paper goods, and calm interior architectural spaces.

The visual style unites literary elegance with contemporary studio usability discipline. Generous whitespace, deliberate typographic scale, delicate tonal layering, and quiet micro-interactions combine to cultivate safety, composure, and presence. Every viewport reassures the user, encouraging emotional regulation and open reflection without visual stress or clinical detachment.

## Colors

The palette balances earthy warmth, literary contrast, and reassuring pastels to cultivate emotional containment.

- **Primary Canvas (`#F8F3EC` - Warm Cream):** Serves as the primary surface foundation. It establishes an organic, non-glare, tactile atmosphere reminiscent of heavy vellum or archival paper.
- **Primary Text (`#292321` - Espresso):** Replaces harsh pure black with a rich, roasted tone that delivers legibility while remaining soft to the eye.
- **Primary Brand / Cocoa (`#815C4D`):** A grounding, organic earth tone applied to key structural accents, primary interactive outlines, secondary buttons, and active markers.
- **Emotional Emphasis / Coral (`#D94843`):** Reserved for deliberate primary calls-to-action, active progress moments, and heartfelt interaction touchpoints. Used sparingly to preserve visual calm.
- **Calming Wash & Accents (`#8FC4DE` Sky Blue & `#E2F0F6` Soft Blue):** Provide breathable, tranquil breathing zones for introspective prompts, wellness modules, and mindful callouts.
- **Grounding & Editorial Washes (`#849578` Sage & `#F5E1E3` Blush):** Subtle accent shades utilized for mood check-in tokens, category pills, and ambient atmospheric backgrounds.

## Typography

The typographic system creates an intentional dialogue between literary tradition and Indonesian modernist functionalism.

- **Newsreader (Headlines & Editorial Quotes):** Imparts reflective authority, warmth, and human pacing. Display headings leverage subtle optical sizing and organic serif terminals, honoring the feeling of physical print.
- **Plus Jakarta Sans (Body, Utility, & Controls):** Delivers clean legibility, rhythmic spacing, and approachable geometric clarity. It anchors functional workflows, forms, and dense reading contexts without sterile severity.
- **Scale Dynamics:** Editorial headers scale downward predictably on viewports smaller than 768px (`headline-xl-mobile` and `headline-lg-mobile`) to prevent awkward line breaks and maintain compositional dignity.

## Layout & Spacing

The layout structure adheres to an open, editorial rhythm designed to prevent cognitive clutter.

- **Grid Framework:** A 12-column responsive fluid grid on desktop (max content container `1200px`) with `1.5rem` (`24px`) gutters and `2rem` (`32px`) canvas margins.
- **Tablet Reflow (600px - 1023px):** Adapts to an 8-column layout with `1.25rem` (`20px`) gutters and `1.5rem` (`24px`) outer margin.
- **Mobile Reflow (< 600px):** Transitions to a single or 4-column flow with `1rem` (`16px`) gutters and `1.25rem` (`20px`) outer margin, prioritizing single-column reading paths.
- **Breathing Rhythm:** Sections utilize generous vertical spacing (`space-xl` scaled dynamically up to `5rem` for major chapters) to ensure reflective pause between topics.

## Elevation & Depth

Elevation eschews stark drop shadows in favor of tonal diffusion, ambient physical light, and frosted depth.

- **Floating Frosted Surfaces:** Floating navigation bars and modal sheets use backdrop blur (`backdrop-filter: blur(16px)`) combined with a 75% translucent surface tint (`rgba(248, 243, 236, 0.75)`) and a delicate `1px` inner border (`rgba(129, 92, 77, 0.12)`).
- **Ambient Card Shadows:** Cards rest on low-intensity, multi-layered diffuse shadows tinted with warm Espresso: `0 8px 30px -4px rgba(41, 35, 33, 0.05), 0 2px 6px -1px rgba(41, 35, 33, 0.03)`.
- **Tonal Inset Depth:** Interactive inputs and state containers achieve depth through subtle background tint shifts (such as Soft Blue `#E2F0F6` or Blush `#F5E1E3`) paired with soft hairline outlines rather than structural shadows.

## Shapes

The shape language reflects grounded comfort and natural ease, set at roundedness tier `2`.

- Standard interactive controls and modular cards feature `0.5rem` (`8px`) border radii.
- Larger editorial feature containers and modal dialogues apply `rounded-lg` (`1rem` / `16px`).
- Deep emotional focal modules, reflection journals, and imagery apply `rounded-xl` (`1.5rem` / `24px`).
- Filter pills and sensory tags employ full continuous pill geometries to soften tactile engagement.

## Components

### Buttons
- **Primary Button:** Background in Coral (`#D94843`) with Crisp Cream text (`#F8F3EC`). Height `48px`, roundedness `0.5rem`, typography `label-lg`. Hover brings a gentle tonal lift with `rgba(41, 35, 33, 0.08)` inset overlay.
- **Secondary Button:** Surface in Warm Cream (`#F8F3EC`), border `1.5px solid #815C4D`, text Cocoa (`#815C4D`).
- **Tertiary / Ghost Button:** Transparent background, Espresso text, with an animated underline accent on hover.

### Navigation & Header
- **Floating Frosted Navbar:** Detached top floating bar positioned `1rem` from screen bounds. Pill-cornered or `rounded-lg`, using frosted glass translucency (`#F8F3EC` at `80%` opacity, `16px` blur) and delicate hairlines to let content glide underneath.

### Cards & Modular Panels
- **Journal & Content Cards:** Background Warm Cream (`#FFFFFF` or layered `#FAF6F1`), soft hairline border (`1px solid rgba(129, 92, 77, 0.12)`), ambient espresso drop shadow, and padding `space-lg`.
- **Sensory Prompt Cards:** Tinted with Soft Blue (`#E2F0F6`) or Blush (`#F5E1E3`) without borders to denote reflective or breathing activities.

### Chips & Tags
- Pill-shaped (`rounded-full`), padded `0.375rem 0.875rem`. Inactive state sits on subtle Sage (`#849578` at 12% opacity) or Cocoa wash; active state fills with Cocoa (`#815C4D`) and Warm Cream text.

### Form Inputs
- Background warm white (`#FFFFFF`), border `1px solid rgba(41, 35, 33, 0.18)`, border radius `0.5rem`, padding `0.75rem 1rem`. Focus state transitions to `1.5px solid #815C4D` with an ambient glow of `rgba(129, 92, 77, 0.15)`.

### Checkboxes & Radios
- Rounded checkbox (`4px`) and circular radio (`50%`), bordered with Cocoa (`#815C4D`). Checked state is solid Cocoa with Warm Cream icons.

### Footer
- Full-bleed deep Espresso (`#292321`) background with warm muted typography (`#E2DCD5`), creating a definitive, grounding, and safe conclusion to the page flow.