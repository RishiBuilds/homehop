# HomeHop — Modern Rental Marketplace for Mumbai

> **"Find your space. Feel at home."**

HomeHop is a modern proptech rental marketplace connecting tenants, property owners, and brokers across Mumbai to help people find affordable 1 RKs, 1 BHKs, 2 BHKs, 3 BHKs, PGs, and rental rooms with radical upfront cost transparency.

---

## Key Features

- **Split-Screen Interactive Map & Sidebar**: Left scrollable sidebar with multi-criteria filters, property cards, and market insights panel; right interactive MapLibre GL map with custom price pills color-coded by user budget (green = well within budget, amber = near limit, red = over budget).
- **Market Snapshot & Budget Insights**: Real-time stats computed from filtered inventory displaying average, minimum, and maximum rent, along with budget percentile fit bar.
- **Interactive Live Budget Slider**: Smooth slider adjusting monthly rent ceiling with real-time INR currency formatting (`formatCurrency`).
- **45 Realistic Mumbai Listings**: Handcrafted sample listings with real-world lat/lng coordinates across Western, Central, and Harbour corridors (Andheri, Powai, Thane, Bandra, Borivali, Goregaon, Lower Parel, etc.).
- **Approximate Locality Mini Map**: Privacy-preserving approximate vicinity map on property detail pages without exposing exact flat addresses or owner personal details.
- **Total Upfront Outlay Calculator**: Every listing computes and breaks down 1st month's rent, security deposit, and exact brokerage, leaving zero surprises.
- **Rent Affordability Calculator**: Safe 30% take-home rent ceiling and estimated 2-month deposit savings target calculator.
- **Maharashtra Tenancy Legal Checklist**: Clear regulatory guidance covering 11-month registered leave-and-license agreements, biometric verification, and Mumbai police intimation requirements.
- **Shortlist Bookmarks**: Persistent browser storage shortlist with live count badge in the navigation bar and dedicated Tenant Portal view.
- **Property Comparison Drawer**: Side-by-side comparison matrix for up to 3 properties evaluating rent, deposit, brokerage, area, and amenities.
- **WhatsApp Direct Inquiries**: Click-to-chat button with prefilled listing reference IDs (e.g. `HH-1001`) for instantaneous communication.
- **Accompanied Visit Requests**: Validated schedule visit workflow with date picker and morning/afternoon/evening slots.
- **Mobile Map / List Bottom Toggle**: Smooth switching between cards and map view on mobile viewports.
- **Code-Splitting & Lazy Loading**: Route-level dynamic imports with Suspense fallbacks and lazy-loaded map libraries for minimal initial bundle weight.
- **Zero Comments Compliance**: Clean, production-grade source code with zero comments across all modules.

---

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript (Strict Mode)
- **Bundler & Dev Server**: Vite 8
- **Styling**: Tailwind CSS v4 with CSS-first `@theme` design tokens
- **Typography**: DM Serif Display (Headings) + Plus Jakarta Sans (UI body)
- **Map Library**: MapLibre GL JS with OpenFreeMap liberty vector tiles (Zero API key requirement)
- **Animations**: Framer Motion
- **Routing**: React Router v7 with route code-splitting
- **Icons**: Lucide React
- **UI Architecture**: shadcn/ui design patterns with Class Variance Authority (CVA)
- **Linter**: Oxlint

---

## Routes

- `/` — Landing page with prominent search hero, budget slider, category grid, featured rentals, and trust benefits
- `/explore` — Split-screen interactive map and sidebar marketplace with market insights panel, multi-filter drawer, and comparison drawer
- `/property/:id` — Property Details with gallery, upfront cost calculator, approximate mini map, legal checklist, and inquiry forms
- `/about` — About HomeHop (mission for Mumbai rental transparency & tenancy FAQ)
- `/contact` — Contact page with direct WhatsApp link, phone, and inquiry form
- `/tenant` — Tenant Portal with real-time saved shortlist bookmarks and legal checklist
- `/owner` — Property Owner Portal placeholder with listing draft creator and rental yield estimator
- `/broker` — Broker Operations Portal placeholder
- `/admin` — Admin Backoffice Portal placeholder
- `/login` — Sign In prototype
- `/dashboard` — Market Overview Dashboard

---

## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm

### Installation

```bash
git clone https://github.com/RishiBuilds/homehop.git
cd homehop
npm install
```

### Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

`VITE_WHATSAPP_NUMBER` defines the default WhatsApp number for direct inquiries. Zero external map API keys are required by default.

### Development Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173).

### Production Build

```bash
npm run build
```

### Code Quality & Linting

```bash
npm run lint
```

---

## License

MIT
