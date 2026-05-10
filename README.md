# LeadOps — Lead Analytics Dashboard

A dark-themed, interactive analytics dashboard for insurance lead management. Built with React, TypeScript, and Tailwind v4. All data is parsed at build time from `assignment.csv` — no backend or API required.

![Design](https://img.shields.io/badge/design-Spider%20Dashboard-7C5CFC?style=flat-square)
![Stack](https://img.shields.io/badge/stack-React%20%2B%20Vite%20%2B%20Tailwind%20v4-4F9CF9?style=flat-square)
![Data](https://img.shields.io/badge/data-700%20leads%20·%206%20sources-00EBC7?style=flat-square)

---

## Prerequisites

- **Node.js** 18+ and **npm** 9+
- Git

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/siddhakshat/ztech.git
cd ztech

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open `http://localhost:5173` (or the port shown in the terminal) in your browser.

### Other scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Production build (outputs to `dist/`) |
| `npm run preview` | Locally preview the production build |

---

## Data Source

All dashboard data comes from **`assignment.csv`** in the project root. The file is imported at build time using Vite's `?raw` loader and parsed in `src/data/mockData.ts`.

### CSV schema

| Column | Type | Description |
|---|---|---|
| `lead_id` | string | Unique lead identifier (e.g. `LD1350`) |
| `lead_name` | string | Full name of the lead |
| `source` | string | Acquisition channel (see sources below) |
| `timestamp` | string | `DD-MM-YYYY HH.MM` format |
| `form_completion_time_sec` | number | Time to fill the form in seconds (can be empty) |
| `state` | string | Indian state name |
| `pincode` | string | 6-digit postal code |
| `phone_number` | string | 10-digit mobile number |
| `carrier_acceptance_status` | string | `Accepted`, `Rejected`, or `Pending` |

### Dataset summary

- **700 leads** across Sep – Dec 2024
- **6 sources**: `PolicyBazaar_Direct` (156), `GoogleAds_Search` (133), `src_quality_tier_2` (129), `AffiliateNet_IN` (112), `MetaAds_Retarget` (101), `OrganicSEO` (69)
- **Statuses**: 344 Accepted · 278 Rejected · 78 Pending
- **10 states**: Uttar Pradesh, Gujarat, West Bengal, Karnataka, Rajasthan, Tamil Nadu, Maharashtra, Telangana, Delhi, Punjab

To update the dashboard with new data, replace `assignment.csv` with a file that has the same column headers, then run `npm run build`.

---

## Project Structure

```
ztech/
├── assignment.csv          # Source data (700 leads)
├── index.html              # App entry point — loads src/main.tsx
├── vite.config.js          # Vite config (React + Tailwind v4 plugins)
├── tsconfig.json           # TypeScript config
├── package.json
│
└── src/
    ├── main.tsx            # React root mount
    ├── App.tsx             # Sidebar + header shell
    ├── style.css           # Tailwind v4 import + @theme color tokens
    ├── vite-env.d.ts       # Vite type declarations (?raw imports)
    │
    ├── context/
    │   └── DashboardContext.tsx   # Shared filter state (source, status, search, date range)
    │
    ├── data/
    │   └── mockData.ts     # CSV parser → LeadSource[], DailyDataPoint[], Lead[], etc.
    │
    ├── types/
    │   └── index.ts        # TypeScript interfaces (Lead, LeadSource, DailyDataPoint, …)
    │
    ├── pages/
    │   └── LeadOpsPage.tsx # Thin wrapper — renders DashboardLayout
    │
    ├── components/
    │   ├── DashboardLayout.tsx    # Grid layout + inline AcceptanceDonut + LeadTable
    │   ├── KpiStrip.tsx           # 4 KPI cards (totals, accept rate, form time, rejected)
    │   ├── DailyTrendsChart.tsx   # SVG area chart with crosshair tooltip
    │   ├── LeadSourcesTable.tsx   # Source list with acceptance-rate progress bars
    │   ├── GeoDistribution.tsx    # Horizontal state bars with hover effects
    │   └── LeadInspection.tsx     # Lead quality panel (updates on table row click)
    │
    └── lib/
        └── designTokens.ts  # Design token constants (colours, spacing, radii)
```

---

## Interactive Features

### Filters (all connected via `DashboardContext`)

| Interaction | Effect |
|---|---|
| Click a **source row** in Lead Sources | Filters KPI cards and lead table to that source. Click again to deselect. |
| Click a **donut segment** or **status pill** | Filters lead table to Accepted / Rejected / Pending leads. |
| Type in the **search box** | Live filters lead table by name, email, or source. |
| Click **7D / 14D / 30D / All** | Changes the date window on the trend chart. |
| Click a **table row** | Loads that lead's data into the Lead Inspection panel. |

Active filters appear as dismissible pills below the KPI strip. "Clear all" resets everything.

### Hover interactions

| Element | Behaviour |
|---|---|
| Area chart | Crosshair line + tooltip showing date, lead count, and acceptance rate |
| Source rows | Dot scales up, row highlights, selected row gets a coloured outline |
| Donut segments | Segment widens; centre label switches to that segment's share |
| Geo bars | Bar glows blue→teal; count toggles to percentage share |
| KPI cards | Subtle scale-up on hover |

---

## Tech Stack

| Layer | Library / Tool |
|---|---|
| Framework | React 18 |
| Build tool | Vite 8 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Icons | Lucide React |
| Data | CSV parsed at build time via `?raw` import |

No charting library is used — all charts (area, donut, bar) are hand-written SVG.

---

## Colour Tokens

Defined in `src/style.css` under `@theme` and available as Tailwind utilities (`bg-*`, `text-*`, `border-*`):

| Token | Value | Usage |
|---|---|---|
| `bg_base` | `#060918` | Page background |
| `bg_surface` | `#0B0E27` | Sidebar, header |
| `bg_card` | `#0F1330` | All cards |
| `border_subtle` | `rgba(255,255,255,0.07)` | Card borders, dividers |
| `foreground` | `#FFFFFF` | Primary text |
| `secondary` | `#8892B0` | Secondary text |
| `muted` | `#4B5675` | Placeholder, captions |
| `accent_blue` | `#4F9CF9` | Primary accent, chart line |
| `accent_purple` | `#7C5CFC` | Secondary accent, gradients |
| `accent_neon` | `#00EBC7` | Accept rate, success states |
| `accent_orange` | `#F97316` | Form time, priority |
| `accent_pink` | `#FF4D79` | Rejected, danger |
| `accent_yellow` | `#F5BE00` | Pending |
| `status_success` | `#22C55E` | Positive trend badges |
| `status_danger` | `#EF4444` | Negative trend badges |

---

## License

MIT
