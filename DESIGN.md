---
name: Patter Design System
description: Neo-Brutalist Technical Minimalism for Agentic Systems & Repositories
colors:
  primary: "#df9367"
  primary-deep: "#c97a4c"
  primary-light: "#efc5ac"
  ink-primary: "#000000"
  ink-dark: "#1a1a1a"
  ink-body: "#2b2b2b"
  ink-muted: "#595959"
  ink-faint: "#767676"
  surface-base: "#ffffff"
  surface-cream: "#f6f6f4"
  surface-warm: "#fff8ef"
  surface-cool: "#ebf0f5"
  surface-code: "#fafaf8"
  border-line: "#000000"
  border-subtle: "#e5e5e5"
  status-live: "#2ea043"
  status-blue: "#3b82f6"
  dark-surface-base: "#0e1015"
  dark-surface-cream: "#161920"
  dark-surface-warm: "#1f1c19"
  dark-surface-cool: "#131a24"
  dark-surface-code: "#12141a"
  dark-accent-peach-cream: "#261911"
  dark-accent-peach-deep: "#f3a579"
  dark-divider: "#383d47"
  dark-ink-body: "#d1d5db"
  dark-ink-muted: "#a3a3a3"
  window-dot-red: "#ff5f56"
  window-dot-yellow: "#ffbd2e"
  window-dot-green: "#27c93f"
typography:
  display:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.2rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  section:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  title:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  subheading:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  body:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-sm:
    fontFamily: "IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.02em"
  label-sm:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.03em"
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  4xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
  button-secondary:
    backgroundColor: "{colors.surface-base}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
  card:
    backgroundColor: "{colors.surface-base}"
    textColor: "{colors.ink-body}"
    rounded: "{rounded.none}"
    padding: "24px"
---

# Design System

<!-- impeccable:design-schema 1 -->

## Overview

The Patter Design System is a high-craft **Neo-Brutalist Technical Minimalist** design language built for developer tools, autonomous agent architectures, and technical portfolios. It balances tactile physical cues (hard 1.5px/2px black borders, offset solid drop shadows, tactile dot grids) with strict information density and typographic precision.

## Colors

- **Ink & Typography**:
  - Primary Ink: `#000000` (headings, high-emphasis text, structural borders)
  - Body Ink: `#2b2b2b` (paragraph text, descriptions)
  - Muted Ink: `#595959` (secondary metadata, timestamps)
  - Faint Ink: `#767676` (placeholders, tertiary indicators)
- **Surfaces**:
  - Base: `#ffffff` (card backgrounds, default canvas)
  - Cream: `#f6f6f4` (table headers, secondary sections)
  - Warm Peach: `#fff8ef` (featured callouts, note boxes)
  - Code Surface: `#fafaf8` (terminal blocks, snippet backgrounds)
- **Accent Palette**:
  - Signature Peach: `#df9367` (primary brand accent, active tags)
  - Peach Deep: `#c97a4c` (hover / active press states)
  - Peach Light: `#efc5ac` (pill backgrounds, subtle highlights)
- **Status & Telemetry**:
  - Live / Success: `#2ea043`
  - Tech / Info: `#3b82f6`

## Typography

- **Display & Interface**: `IBM Plex Sans` (`ui-sans-serif, system-ui, -apple-system, sans-serif`)
  - Crisp neo-grotesque proportions with tight letter spacing for display titles.
- **Data, Code & Metadata**: `JetBrains Mono` (`ui-monospace, monospace`)
  - Clear tabular numerals, code blocks, keyboard shortcuts, version tags, and terminal banners.
- **Hierarchy Scale**:
  - Hero Display: `clamp(2rem, 5vw, 3.25rem)`, weight 800, tracking `-0.03em`
  - Section Title: `1.5rem` to `2.2rem`, weight 700, tracking `-0.02em`
  - Card Title: `1.15rem` to `1.25rem`, weight 700
  - Body Text: `15px` / `16px`, line-height `1.6`, weight 400
  - Technical Badges: `12px` JetBrains Mono uppercase, weight 600

## Layout

- **Container**: Max width `1320px`, centered with `24px` horizontal padding (`16px` on mobile).
- **Hero Grid**: 2-column asymmetric layout on desktop (2fr content / 1fr avatar card), collapsing to single column on mobile (< 900px).
- **Featured Grid**: 3-column unified grid with collapsed internal borders and outer 1.5px solid black border.
- **Catalog Grid**: Dynamic responsive grid (`repeat(auto-fill, minmax(340px, 1fr))`) with 16px gaps.
- **Sticky Controls**: Unified filter toolbar sticking under the navigation during catalog exploration.

## Elevation & Depth

- **No Blur Shadows**: Elevation is achieved purely through tactile, hard-offset box shadows:
  - Standard Button: `0 4px 0 0 #000000` (hover: `0 6px 0 0 #000000`, active: `0 2px 0 0 #000000` translated 2px down)
  - Interactive Card: `0 4px 0 0 #000000`
  - Modal Window: `8px 8px 0 0 #000000`
  - Floating Tooltip / Toast: `0 6px 0 0 #000000`

## Shapes

- **Corner Radii**:
  - Buttons, cards, and input containers use zero radius (`0px`) or minimal sharp radius (`2px` - `4px`) for deterministic neo-brutalist structure.
  - Category and status pills use full pill radius (`9999px`) to create clear shape differentiation between interactive containers and informative tags.
- **Borders**:
  - Primary Structural Borders: `1.5px solid #000000`
  - Heavy Focus / Framing: `2px solid #000000`
  - Hairline Separators: `1px solid #e5e5e5`

## Components

- **Patter Buttons**:
  - `primary`: Background `#df9367`, border `1.5px solid #000`, shadow `0 4px 0 0 #000`. On hover, background shifts to `#c97a4c` and shadow expands to `6px`. On active press, translates down `2px`.
  - `secondary`: Background `#ffffff`, text `#000000`, border `1.5px solid #000`, shadow `0 4px 0 0 #000`.
- **Search & Controls**:
  - Search input framed with a `1.5px solid #000` border, left search icon, clear button, and `/` shortcut pill.
  - Segmented controls with active state filled in black `#000` with white text.
- **Repository Cards**:
  - Card container framed with `1.5px solid #000`, featuring title, domain pill, GitHub star counter, tech tags, and description.
- **Terminal Modal**:
  - macOS/Linux terminal inspired window with three decorative dots (red, yellow, green), monospace title, copyable snippets, and GitHub CTA.

## Do's and Don'ts

### Do's
- **Do** maintain strict WCAG AA contrast (minimum 4.5:1 for body copy and 3:1 for large display elements).
- **Do** use hard offset shadows (`0 4px 0 0 #000`) instead of soft CSS blur dropshadows.
- **Do** format code snippets, tags, timestamps, and metrics in `JetBrains Mono`.
- **Do** provide immediate physical keyboard navigation and visible focus rings.

### Don'ts
- **Don't** use generic gradients, glassmorphism, or blurry glowing shadows.
- **Don't** use decorative animated pulsing dots unless connected to real-time changing data.
- **Don't** set body font size below `14px` or use all-caps on long multi-word body descriptions.
- **Don't** compromise mobile readability or cause horizontal overflow.
