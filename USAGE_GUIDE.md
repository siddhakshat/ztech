// LeadOps - Comprehensive Usage Guide

# LeadOps - User Guide

This guide covers everything you need to know about using the LeadOps dashboard.

## Getting Started

### First Time Setup

1. **Navigate to the Dashboard** - Access `leadops/src/pages/LeadOpsPage.tsx`
2. **Review the Style Guide** - Check `leadops/STYLE_GUIDE.md` for design tokens
3. **Explore Components** - Each component in `leadops/src/components/` is modular and reusable

### Understanding the Layout

The dashboard is divided into two main sections:

**Left Panel (Performance Analytics)**
- KPI Strip - Overview of key metrics
- Lead Sources Table - Breakdown by acquisition channel
- Daily Trends Chart - Temporal lead flow visualization
- Geographic Distribution - Regional breakdown
- Lead Quality Inspection - Sample analysis

**Right Panel (Lead Management)**
- Lead List - Complete lead registry
- Search & Filter - Find specific leads
- Status Badges - Quick visual indicators
- Lead Details - Click to expand

## Component Usage

### LeadInspection

```tsx
import { LeadInspection } from './components/LeadInspection';

// Usage
<LeadInspection />
```

**Props:**
- None (uses mock data)

**Features:**
- Lead data preview
- Source breakdown
- Status distribution
- Quality metrics

### LeadSourcesTable

```tsx
import { LeadSourcesTable } from './components/LeadSourcesTable';

// Usage
<LeadSourcesTable />
```

**Features:**
- Lists all acquisition sources
- Click to navigate
- Source metadata

### DailyTrendsChart

```tsx
import { DailyTrendsChart } from './components/DailyTrendsChart';

// Usage
<DailyTrendsChart />
```

**Features:**
- Dual-axis bar chart
- Leads created vs contacted vs qualified
- 14-day window

### GeoDistribution

```tsx
import { GeoDistribution } from './components/GeoDistribution';

// Usage
<GeoDistribution />
```

**Features:**
- World map visualization
- Regional heat map
- Color-coded by leads

### KpiStrip

```tsx
import { KpiStrip } from './components/KpiStrip';

// Usage
<KpiStrip />
```

**Features:**
- Form time tracking
- Conversion rates
- Qualified ratio

### StyleGuide

```tsx
import { StyleGuide } from './components/StyleGuide';

// Usage
<StyleGuide />
```

**Features:**
- Design token documentation
- Component examples
- Usage patterns

## Design System Usage

### Applying Colors

```tsx
import { designTokens } from '../lib/designTokens';

<div className="bg-${designTokens.background_muted}" />
<div className="text-${designTokens.accent_neon}" />
```

### Using Spacing

```tsx
<div className="p-${designTokens.spacing_5}" />
<div className="m-${designTokens.spacing_4}" />
```

### Applying Border Radius

```tsx
<div className="rounded-${designTokens.radius_lg}" />
<div className="rounded-${designTokens.radius_md}" />
```

### Typography

```tsx
<h1 className="text-${designTokens.typography.display}" />
<h2 className="text-${designTokens.typography.heading_l}" />
<p className="text-${designTokens.typography.body}" />
```

## Data Structure

### Lead Objects

```typescript
interface Lead {
  id: string;
  name: string;
  email: string;
  source: 'website' | 'referral' | 'social' | 'other';
  status: 'new' | 'contacted' | 'qualified' | 'rejected';
  created_at: Date;
  completed_at?: Date;
  quality_score: number;
  form_time_ms: number;
}
```

### KPI Objects

```typescript
interface Kpi {
  metric: string;
  value: number;
  label: string;
  icon: React.ReactNode;
}
```

## Mock Data

The application uses mock data for demonstration. To use your own data:

1. Replace `mockData.ts` contents with your API responses
2. Update `mockSources.json` with your source data
3. Ensure data types match the interfaces

## Styling Customization

### CSS Variables

Edit `index.css` to customize:

```css
:root {
  --accent_neon: #0EA5E9; /* Primary color */
  --status_accent: #34D399; /* Success color */
  /* ... */
}
```

### Component Styling

Each component can be customized by modifying its internal CSS:

```tsx
// Example: Custom button styles
<button className="bg-${designTokens.accent_neon} text-white px-4 py-2 rounded-md">
  Click me
</button>
```

## Accessibility Features

- **Keyboard Navigation** - Tab through all interactive elements
- **Focus Indicators** - 2px ring with accent color
- **Screen Reader Support** - Proper aria-labels
- **Color Contrast** - All combinations meet WCAG AA
- **Responsive Design** - Adapts to all screen sizes

## Performance Optimization

### Code Splitting

Components are loaded on demand:

```tsx
// Dynamic import
const LeadInspection = lazy(() => import('./components/LeadInspection'));
```

### Optimized Images

Use SVG for icons and charts:

```tsx
// Inline SVG (best performance)
<svg viewBox="0 0 24 24">
  <path d="..." />
</svg>
```

### Data Management

Mock data is structured for efficient rendering:

```typescript
// Indexed for quick lookup
const leadIndex = new Map();
leadIndex.set(lead.id, lead);
```

## Common Tasks

### 1. Adding a New Lead

```tsx
// In LeadList component
const addLead = (lead: Lead) => {
  setLeads([lead, ...leads]);
};
```

### 2. Filtering Leads

```tsx
// By status
filteredLeads = leads.filter(l => l.status === 'new');
```

### 3. Exporting Data

```tsx
// CSV export
const exportCSV = () => {
  const csv = leads.map(l => 
    `${l.name},${l.email},${l.source},${l.status}`
  ).join('\n');
};
```

### 4. Updating KPIs

```tsx
// Recalculate metrics
const calculateKPIs = () => {
  const avgFormTime = leads.reduce((sum, l) => sum + l.form_time_ms, 0) / leads.length;
  const qualifiedRatio = (leads.filter(l => l.status === 'qualified').length / leads.length) * 100;
};
```

## Testing Guide

### Visual Regression

1. View the dashboard in browser
2. Check all components render correctly
3. Verify hover states work
4. Test keyboard navigation
5. Validate accessibility

### Component Testing

```tsx
// Test LeadInspection
test('LeadInspection renders correctly', () => {
  render(<LeadInspection />);
  const table = screen.getByRole('table');
  expect(table).toBeInTheDocument();
});
```

## Deployment Checklist

- [ ] Build with `npm run build`
- [ ] Test build with `npm run preview`
- [ ] Review accessibility
- [ ] Check responsive design
- [ ] Verify all links work
- [ ] Confirm data accuracy
- [ ] Test in production browser

## Troubleshooting

### Issue: Components not loading

**Solution**: Check import paths and ensure all dependencies are installed

### Issue: Styling not applying

**Solution**: Verify CSS variables are defined in `index.css`

### Issue: Data not displaying

**Solution**: Check mock data structure matches interfaces

## Best Practices

1. **Component Reusability** - Design components to be reused across projects
2. **Design Consistency** - Stick to the design tokens
3. **Type Safety** - Use TypeScript interfaces for data
4. **Performance** - Optimize for large datasets
5. **Accessibility** - Always include aria-labels
6. **Documentation** - Keep this guide updated

## Next Steps

1. Customize the design tokens
2. Add your own lead data
3. Extend the mock sources
4. Deploy to production
5. Share with your team

## Support

For issues or questions:

- Check the STYLE_GUIDE.md
- Review component documentation
- Contact the development team

## Credits

Built with React, TypeScript, and Vite.
Designed with a focus on accessibility and performance.