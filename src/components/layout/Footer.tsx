import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const footerLinks = {
  discover: [
    { to: "/explore", label: "Explore Properties" },
    { to: "/explore?type=room", label: "Rooms" },
    { to: "/explore?type=pg", label: "PG / Co-living" },
    { to: "/explore?type=flat", label: "Flats" },
    { to: "/explore?type=house", label: "Houses" },
  ],
  company: [
    { to: "/dashboard", label: "List a Property" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/login", label: "Sign In" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
              <Home className="h-6 w-6" />
              <span>HomeHop</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              A modern rental marketplace connecting tenants, property owners, and brokers.
              Find your space. Feel at home.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Discover</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.discover.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t py-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} HomeHop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
