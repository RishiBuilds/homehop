import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Home, Menu, X, Plus, ShieldAlert, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const primaryNav = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore Rentals" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const portalLinks = [
  { to: "/tenant", label: "Tenant Portal" },
  { to: "/owner", label: "Owner Portal" },
  { to: "/broker", label: "Broker Operations" },
  { to: "/admin", label: "Admin Backoffice" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portalsOpen, setPortalsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/85">
      <div className="bg-amber-100/80 text-amber-900 border-b border-amber-200/80 px-4 py-1.5 text-xs text-center flex items-center justify-center gap-1.5 font-medium">
        <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-amber-700" />
        <span>
          Sample Mumbai Rental Marketplace — All listings, rates, and reference IDs are mock demo data.
        </span>
      </div>

      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Home className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="leading-tight">HomeHop</span>
            <span className="text-[10px] font-normal tracking-wider uppercase text-muted-foreground -mt-0.5">Mumbai</span>
          </div>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-1">
          {primaryNav.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="relative">
            <button
              type="button"
              onClick={() => setPortalsOpen(!portalsOpen)}
              onBlur={() => setTimeout(() => setPortalsOpen(false), 200)}
              className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
              aria-expanded={portalsOpen}
            >
              <span>Portals</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {portalsOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-48 rounded-lg border bg-card p-1 shadow-lg ring-1 ring-black/5 z-50">
                {portalLinks.map((p) => (
                  <Link
                    key={p.to}
                    to={p.to}
                    onClick={() => setPortalsOpen(false)}
                    className="block rounded-md px-3 py-2 text-xs font-medium text-foreground hover:bg-accent hover:text-primary transition-colors"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:flex md:items-center md:gap-3">
          <Link to="/owner">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              List Property
            </Button>
          </Link>
          <Link to="/login">
            <Button size="sm">Sign In</Button>
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t md:hidden bg-card">
          <div className="space-y-1 px-4 py-3">
            {primaryNav.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="pt-2 pb-1">
              <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Portals & Dashboards
              </p>
              <div className="mt-1 space-y-1">
                {portalLinks.map((p) => (
                  <Link
                    key={p.to}
                    to={p.to}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>

            <hr className="my-2 border-border" />

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link to="/owner" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  List Property
                </Button>
              </Link>
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
