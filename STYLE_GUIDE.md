// LeadOps - Style Guide Documentation

# LeadOps Style Guide

This document outlines the design system for LeadOps, a lead management and analytics dashboard.

## Design Tokens

### Colors

**Primary Accent**
- `--accent_neon`: `#0EA5E9` - Primary action color, used for CTAs, highlights, and important elements
- `--accent_neon_text`: `#FFFFFF` - Text color on accent backgrounds

**Status Colors**
- `--status_accent`: `#34D399` - Success, accepted leads
- `--status_warning`: `#F59E0B` - Warning, pending review
- `--status_accent_dark`: `#10B981` - Darker success variant
- `--status_accent_text`: `#065F46` - Text color on success backgrounds
- `--status_error`: `#EF4444` - Error, rejected leads
- `--status_error_text`: `#7F1D1D` - Text color on error backgrounds
- `--status_success`: `#10B981` - Alternative success color
- `--status_success_text`: `#064E3B` - Text color on success backgrounds

**Semantic Colors**
- `--background_primary`: `#FFFFFF` - Main background
- `--background_muted`: `#F9FAFB` - Muted background (cards, panels)
- `--foreground`: `#1F2937` - Primary text
- `--foreground_subtle`: `#6B7280` - Secondary text
- `--border_subtle`: `#E5E7EB` - Subtle borders
- `--border_muted`: `#D1D5DB` - Muted borders
- `--separator`: `#F3F4F6` - Separator lines
- `--neutral_50`: `#FAFAFA` - Lightest neutral
- `--neutral_900`: `#111827` - Darkest neutral

**Ring Colors**
- `--ring_accent`: `#38BDF8` - Focus rings using accent color

### Spacing

- `--space_1`: `4px` - Extra tight spacing
- `--space_2`: `8px` - Tight spacing
- `--space_3`: `12px` - Default spacing
- `--space_4`: `16px` - Section padding
- `--space_5`: `24px` - Card padding
- `--space_6`: `32px` - Large section padding
- `--space_7`: `40px` - Hero section padding
- `--space_8`: `48px` - Extra large spacing
- `--space_9`: `64px` - Maximum spacing

### Typography

**Font Stack**
- Sans: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- Mono: `'JetBrains Mono', 'Fira Code', 'Monaco', monospace`

**Scale**
- Display: `2rem` / `700`
- Heading-L: `1.5rem` / `600`
- Heading-M: `1.25rem` / `600`
- Body: `1rem` / `500`
- Small: `0.875rem` / `500`
- Caption: `0.8rem` / `400`

### Border Radius

- `--radius_sm`: `6px` - Small (buttons, icons)
- `--radius_md`: `8px` - Medium (input fields)
- `--radius_lg`: `12px` - Large (cards)
- `--radius_full`: `9999px` - Full (pills, badges)

### Layout

**Grid System**
- 12-column grid with `--space_3` (12px) gutters
- Breakpoints: `640px`, `768px`, `1024px`, `1280px`

**Container**
- Max width: `1440px`
- Centered with auto margins

## Component Library

### Button

**Primary**
- Background: `var(--accent_neon)`
- Text: `var(--accent_neon_text)`
- Hover: Background with 15% opacity

**Secondary**
- Background: White
- Border: `var(--border_subtle)`
- Hover: Background with muted color

**Ghost**
- No background
- Hover: Background with muted color

### Card

- Border: `var(--border_subtle)`
- Border radius: `var(--radius_lg)`
- Background: `var(--background_muted)`
- Hover: Background with 30% opacity

### Input

- Background: White
- Border: `var(--border_subtle)`
- Focus: Border with accent color, 2px ring
- Radius: `var(--radius_md)`

### Table

- Header: `var(--background_muted)` background
- Borders: `var(--border_subtle)`
- Hover: Row background with 30% opacity

### Badge

- Pill shape: `var(--radius_full)`
- Small padding: `--space_1` horizontal, `--space_1/2` vertical

### Tooltip

- Background: `#111827`
- Text: White
- Max width: `240px`
- Arrow: `--space_2` from edge

### Alert

- Info: Blue background with icon
- Success: Green background
- Warning: Yellow background
- Error: Red background

## Patterns

### KPI Strip

- Horizontal layout with 2 columns
- Each card: 30% width
- Icon on left, value + label on right
- Hover effects on cards

### Charts

**Bar Charts**
- Vertical bars with gradient colors
- Labels on x-axis
- Value labels on bars (optional)

**Line Charts**
- Smooth curves with gradient fills
- Data points as circles
- Tooltips on hover

**Pie Charts**
- Donut style with center label
- Segments with labels
- Legend outside

### Dashboard Grid

- 2x2 grid layout
- Cards with consistent padding
- Header with title + metadata
- Scrollable containers

## Accessibility

- Minimum contrast ratio: 4.5:1
- Focus indicators: 2px ring with accent color
- Interactive targets: Minimum 44x44px
- Screen reader support: aria-labels, semantic HTML
- Keyboard navigation: Full support

## Usage

```tsx
// Example usage
import { designTokens } from '../lib/designTokens';

// Apply to component
className="bg-${designTokens.background_muted}"
style={{
  backgroundColor: designTokens.accent_neon,
  color: designTokens.accent_neon_text,
}}
```

For full documentation, see the repository: `leadops`