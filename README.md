# HomeHop — Modern Rental Marketplace for Mumbai

> **"Find your space. Feel at home."**

HomeHop is a modern proptech rental marketplace connecting tenants, property owners, and brokers across Mumbai to help people find affordable 1 RKs, 1 BHKs, 2 BHKs, 3 BHKs, PGs, and rental rooms with radical upfront cost transparency.

---

## Key Features (Phase 1 & Phase 2)

- **Total Upfront Outlay Calculator**: Every listing computes and breaks down 1st month's rent, security deposit, and exact brokerage, leaving zero surprises.
- **Transit-Centric Search**: Search by Mumbai localities (Andheri, Powai, Thane, Bandra, Borivali, etc.) and proximity to suburban railway or metro stations.
- **WhatsApp Direct Inquiries**: Click-to-chat button with prefilled listing reference IDs (e.g. `HH-1001`) for instantaneous owner/agent contact.
- **Accompanied Visit Requests**: Validated schedule visit workflow with date picker and time slots (Morning, Afternoon, Evening).
- **Interactive Multi-Filter Marketplace**: Locality, station, rent range, configuration, furnishing status, and amenities filters synced to URL search parameters.
- **Dual Grid/List View**: Toggle between card visual view and detailed row overview with upfront pricing comparison.
- **Sample Listing Quality Disclosures**: Clear "Sample Listing - Non-verified" indicators and last availability confirmation dates.
- **Portal Ecosystem Previews**: Dedicated placeholder routes for Tenant Portal, Owner Portal, Broker Operations, and Admin Backoffice.

---

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript (Strict Mode)
- **Bundler & Dev Server**: Vite 8
- **Styling**: Tailwind CSS v4 with CSS-first `@theme` design tokens
- **Routing**: React Router v7 with maintainable route hierarchy
- **Icons**: Lucide React
- **UI Architecture**: shadcn/ui design patterns with Class Variance Authority (CVA)
- **Linter**: Oxlint

---

## Routes

- `/` — Homepage (hero search, categories, featured rentals, how it works, trust benefits, owner CTA)
- `/explore` — Search & Filter Marketplace with live URL sync and grid/list view
- `/property/:id` — Property Details with upfront cost breakdown, WhatsApp button, visit scheduler, enquiry form
- `/about` — About HomeHop (mission for Mumbai rental transparency)
- `/contact` — Contact page with WhatsApp direct link and message form
- `/tenant` — Tenant Portal placeholder
- `/owner` — Property Owner Portal placeholder
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

`VITE_WHATSAPP_NUMBER` defines the default WhatsApp number for direct inquiries.

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
