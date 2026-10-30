import { Link } from "react-router-dom";
import { Home, ShieldCheck } from "lucide-react";

const popularLocalities = [
  "Andheri East",
  "Andheri West",
  "Powai",
  "Thane West",
  "Borivali West",
  "Goregaon East",
  "Bandra West",
  "Lower Parel",
  "Dadar East",
];

export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 py-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Home className="h-4 w-4" />
              </div>
              <span>HomeHop</span>
            </Link>
            <p className="mt-2 text-xs font-medium text-primary">"Find your space. Feel at home."</p>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm leading-relaxed">
              A transparent rental marketplace designed for Mumbai tenants, property owners, and brokers.
              Affordable flats, PGs, and rooms with clear upfront costs and verified updates.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-amber-800 bg-amber-50 border border-amber-200/80 rounded-md p-2.5 max-w-sm">
              <ShieldCheck className="h-4 w-4 shrink-0 text-amber-700" />
              <span>All property listings shown on HomeHop are sample mock listings for development.</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Explore Rentals</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/explore" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Mumbai Listings
                </Link>
              </li>
              <li>
                <Link to="/explore?type=1rk" className="text-muted-foreground hover:text-foreground transition-colors">
                  1 RK Apartments
                </Link>
              </li>
              <li>
                <Link to="/explore?type=1bhk" className="text-muted-foreground hover:text-foreground transition-colors">
                  1 BHK Flats
                </Link>
              </li>
              <li>
                <Link to="/explore?type=2bhk" className="text-muted-foreground hover:text-foreground transition-colors">
                  2 BHK Flats
                </Link>
              </li>
              <li>
                <Link to="/explore?type=3bhk" className="text-muted-foreground hover:text-foreground transition-colors">
                  3 BHK Flats
                </Link>
              </li>
              <li>
                <Link to="/explore?type=pg" className="text-muted-foreground hover:text-foreground transition-colors">
                  PG & Co-Living
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Popular Localities</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {popularLocalities.map((loc) => (
                <li key={loc}>
                  <Link
                    to={`/explore?locality=${encodeURIComponent(loc)}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {loc}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Portals & Info</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/tenant" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tenant Portal
                </Link>
              </li>
              <li>
                <Link to="/owner" className="text-muted-foreground hover:text-foreground transition-colors">
                  Owner Portal
                </Link>
              </li>
              <li>
                <Link to="/broker" className="text-muted-foreground hover:text-foreground transition-colors">
                  Broker Operations
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                  Admin Backoffice
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About HomeHop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} HomeHop Technologies India. Built for Mumbai.</p>
          <p>Designed with modern proptech standards • INR Currency Formatting • No Hidden Costs</p>
        </div>
      </div>
    </footer>
  );
}
