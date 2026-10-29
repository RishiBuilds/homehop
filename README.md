# HomeHop — Modern Rental Marketplace

> **"Find your space. Feel at home."**

HomeHop is a modern proptech rental marketplace connecting tenants, property owners, and brokers to help people discover affordable rooms, PGs, flats, and rental homes across urban centers.

---

## Features

- **Multi-Criteria Property Search**: Search by city, locality, property type, and monthly budget.
- **Dynamic Property Categorization**: Instant filter chips for Rooms, PG / Co-living, Flats, and Independent Houses.
- **Live URL-Driven Filtering**: Search parameters propagate via URL query parameters, preserving state across sessions.
- **Rich Listing Details**: Comprehensive property overview with photo galleries, key stats, amenities list, and direct owner contact actions.
- **Interactive Tenant & Owner Dashboard**: Overview metrics, listing management actions, and tenant exploration shortcuts.
- **Client Form Validation**: Accessible sign-in placeholder with client-side credential validation.
- **Responsive & Accessible Design**: Mobile-friendly navigation drawer, WCAG-compliant color contrast, keyboard navigable, and graceful image error handling.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS-first `@theme` design tokens
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Architecture**: shadcn/ui design patterns with [Class Variance Authority (CVA)](https://cva.style/)
- **Linter**: [Oxlint](https://oxc.rs/)

---

## Project Structure

```
homehop/
├── public/                 # Static assets & SVG icons
├── src/
│   ├── app/                # Application entry & router configuration
│   │   ├── App.tsx
│   │   └── routes.tsx
│   ├── components/
│   │   ├── layout/         # Header, Footer, Layout wrapper
│   │   ├── shared/         # Reusable feature components
│   │   └── ui/             # Core UI primitives (Button, Card, Input, etc.)
│   ├── lib/                # Shared utilities & class merge helpers
│   ├── pages/              # Route page components
│   ├── services/           # Mock data and query filter services
│   ├── types/              # TypeScript interface definitions
│   ├── index.css           # Tailwind v4 theme configuration
│   └── main.tsx            # DOM root mounting
├── components.json         # shadcn/ui configuration
├── tsconfig.app.json       # Strict TypeScript client compiler settings
├── tsconfig.node.json      # Vite Node build compiler settings
└── vite.config.ts          # Vite build & alias plugin setup
```

---

## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm or compatible package manager

### Installation

```bash
git clone https://github.com/RishiBuilds/homehop.git
cd homehop
npm install
```

### Running Locally

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

---

## License

MIT
