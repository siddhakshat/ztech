# LeadOps - Lead Management & Analytics Dashboard

A modern, responsive React dashboard for managing leads and analyzing performance metrics. Features a clean design system with neon accents and comprehensive analytics.

## Features

- **Lead Management**: Full CRUD operations for lead records
- **Analytics Dashboard**: Real-time KPIs, trends, and geographic distribution
- **Interactive Charts**: Bar charts, line charts, and pie charts with tooltips
- **Responsive Design**: Works seamlessly across devices
- **Design System**: Consistent tokens for colors, spacing, and typography
- **Performance Tracking**: Form completion times and conversion metrics

## Project Structure

```
leadops/
├── src/
│   ├── components/
│   │   ├── LeadInspection.tsx
│   │   ├── LeadSourcesTable.tsx
│   │   ├── DailyTrendsChart.tsx
│   │   ├── GeoDistribution.tsx
│   │   ├── KpiStrip.tsx
│   │   └── StyleGuide.tsx
│   ├── lib/
│   │   └── designTokens.ts
│   ├── pages/
│   │   └── LeadOpsPage.tsx
│   ├── data/
│   │   ├── mockData.ts
│   │   └── mockSources.json
│   └── App.tsx
├── public/
│   └── vite.svg
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── index.html
├── index.css
├── vite.config.ts
├── STYLE_GUIDE.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- VS Code (recommended)

### Installation

```bash
cd leadops
npm install
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Design Tokens

### Colors

- **Accent**: `#0EA5E9` - Primary action color
- **Status**: `#34D399`, `#F59E0B`, `#EF4444` - Success, warning, error
- **Semantic**: `#F9FAFB`, `#1F2937`, `#E5E7EB` - Background, text, borders
- **Ring**: `#38BDF8` - Focus indicators

### Spacing

- `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `40px`, `48px`, `64px`

### Typography

- **Display**: `2rem / 700`
- **Heading-L**: `1.5rem / 600`
- **Heading-M**: `1.25rem / 600`
- **Body**: `1rem / 500`
- **Small**: `0.875rem / 500`

### Border Radius

- **Small**: `6px`
- **Medium**: `8px`
- **Large**: `12px`
- **Full**: `9999px`

## Components

### LeadInspection

- Displays lead data in a table format
- Includes source information and status badges
- Shows form completion times and quality scores

### LeadSourcesTable

- Lists all lead sources (website, referral, social, etc.)
- Click to navigate between source pages
- Shows source-specific statistics

### DailyTrendsChart

- Visualizes leads created, contacted, and qualified over time
- Interactive hover tooltips
- Smooth gradients and animations

### GeoDistribution

- Map-based geographic lead distribution
- Color-coded by region
- Hover for detailed regional breakdown

### KpiStrip

- Displays key metrics: Form time, qualified ratio, conversion rate
- Horizontal layout with icons
- Responsive grid

### StyleGuide

- Documentation of all design tokens
- Component usage examples
- Accessibility guidelines

## Styling

Uses CSS custom properties (CSS variables) for maintainable styling:

```css
:root {
  --accent_neon: #0EA5E9;
  --background_muted: #F9FAFB;
  --border_subtle: #E5E7EB;
  /* ... more tokens ... */
}
```

## License

MIT License - See LICENSE file

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

## Support

For questions or issues, please create an issue in the repository.