import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Shield,
  Zap,
  CheckCircle2,
  BedDouble,
  Hotel,
  Building2,
  Home as HomeIcon,
  Train,
  BadgePercent,
  CalendarCheck,
  Search,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { BudgetSlider } from "@/components/shared/BudgetSlider";
import { getFeaturedProperties } from "@/data/mock-properties";
import { MUMBAI_LOCALITIES } from "@/types";
import type { PropertyType } from "@/types";
import { formatCurrency } from "@/lib/utils";

const propertyTypes: { value: PropertyType | ""; label: string; icon: typeof BedDouble }[] = [
  { value: "", label: "Any Type", icon: HomeIcon },
  { value: "1rk", label: "1 RK", icon: BedDouble },
  { value: "1bhk", label: "1 BHK", icon: Building2 },
  { value: "2bhk", label: "2 BHK", icon: Building2 },
  { value: "3bhk", label: "3 BHK", icon: HomeIcon },
  { value: "4bhk", label: "4 BHK+", icon: HomeIcon },
  { value: "pg", label: "PG", icon: Hotel },
  { value: "room", label: "Room", icon: BedDouble },
];

const quickAreas = [
  "Andheri East",
  "Powai",
  "Thane West",
  "Bandra West",
  "Borivali West",
  "Goregaon East",
  "Malad West",
  "Dadar East",
];

const howItWorks = [
  {
    step: "01",
    title: "Search By Locality & Station",
    description: "Filter by Western, Central, or Harbour line railway stations, Mumbai suburbs, and exact budget.",
    icon: Train,
  },
  {
    step: "02",
    title: "Transparent Upfront Costs",
    description: "Every listing clearly shows monthly rent, security deposit, and exact brokerage amount. No hidden costs.",
    icon: BadgePercent,
  },
  {
    step: "03",
    title: "Connect & Schedule Visits",
    description: "Instantly chat on WhatsApp with the property reference ID or request an assisted site visit slot.",
    icon: CalendarCheck,
  },
];

const benefits = [
  {
    title: "Full Cost Transparency",
    description: "Rent + deposit + brokerage displayed upfront. Calculate your complete moving cost before stepping out.",
    icon: Shield,
  },
  {
    title: "Availability Freshness",
    description: "Listings show the last confirmed date, saving you from wasted calls on already-rented apartments.",
    icon: CheckCircle2,
  },
  {
    title: "Direct WhatsApp Enquiries",
    description: "Skip lengthy registration funnels. Connect on WhatsApp with the listing reference ID instantly.",
    icon: Zap,
  },
];

const propertyCategories: {
  value: PropertyType;
  label: string;
  icon: typeof BedDouble;
  priceRange: string;
  description: string;
}[] = [
  { value: "1rk", label: "1 RK", icon: BedDouble, priceRange: "From ₹7,500/mo", description: "Studio rooms & kitchen spaces" },
  { value: "1bhk", label: "1 BHK", icon: Building2, priceRange: "From ₹15,000/mo", description: "Ideal for couples & bachelors" },
  { value: "2bhk", label: "2 BHK", icon: Building2, priceRange: "From ₹25,000/mo", description: "Spacious apartments for families" },
  { value: "3bhk", label: "3 BHK", icon: HomeIcon, priceRange: "From ₹40,000/mo", description: "Large family homes with amenities" },
  { value: "pg", label: "PG / Co-Living", icon: Hotel, priceRange: "From ₹7,500/mo", description: "Furnished with meals & laundry" },
  { value: "room", label: "Private Room", icon: BedDouble, priceRange: "From ₹10,000/mo", description: "Single occupancy in shared flat" },
];

export default function Home() {
  const navigate = useNavigate();
  const [locality, setLocality] = useState("");
  const [localitySuggestions, setLocalitySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [budget, setBudget] = useState(50000);
  const [selectedType, setSelectedType] = useState<PropertyType | "">("");
  const localityRef = useRef<HTMLInputElement>(null);
  const featuredProperties = getFeaturedProperties().slice(0, 6);

  function handleLocalityInput(value: string) {
    setLocality(value);
    if (value.length > 0) {
      const matches = MUMBAI_LOCALITIES.filter((l) =>
        l.toLowerCase().includes(value.toLowerCase())
      );
      setLocalitySuggestions(matches.slice(0, 5));
      setShowSuggestions(matches.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }

  function selectLocality(loc: string) {
    setLocality(loc);
    setShowSuggestions(false);
    localityRef.current?.blur();
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (locality) params.set("locality", locality);
    if (budget < 200000) params.set("maxBudget", String(budget));
    if (selectedType) params.set("type", selectedType);
    navigate(`/explore?${params.toString()}`);
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-light/50 via-background to-background border-b">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #166534 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <PageContainer>
          <div className="py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-xs font-semibold text-primary mb-5">
                  <Train className="h-3.5 w-3.5" />
                  Mumbai's Transparent Rental Discovery
                </span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.08] tracking-tight mb-5">
                  Find your space.<br />
                  <span className="text-primary">Feel at home.</span>
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
                  Discover rooms, PGs, 1 RKs, and flats across Mumbai with full deposit and brokerage transparency. No hidden costs. Real availability dates.
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    Upfront cost breakdown
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    45 sample listings across Mumbai
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    Direct WhatsApp contact
                  </span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <form
                onSubmit={handleSearch}
                className="rounded-2xl border bg-card shadow-lg p-5 sm:p-6 space-y-5"
              >
                <div className="flex items-center gap-2 pb-3 border-b">
                  <Search className="h-4 w-4 text-primary" />
                  <h2 className="font-semibold text-sm text-foreground">Find your next home</h2>
                </div>

                <div className="relative">
                  <label htmlFor="home-locality" className="block text-xs font-semibold text-foreground mb-1.5">
                    Location / Locality
                  </label>
                  <input
                    id="home-locality"
                    ref={localityRef}
                    type="text"
                    value={locality}
                    onChange={(e) => handleLocalityInput(e.target.value)}
                    onFocus={() => {
                      if (localitySuggestions.length > 0) setShowSuggestions(true);
                    }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    placeholder="e.g. Andheri East, Powai, Thane..."
                    className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    autoComplete="off"
                  />
                  {showSuggestions && (
                    <ul className="absolute left-0 right-0 top-full mt-1 z-20 bg-card border rounded-lg shadow-lg overflow-hidden">
                      {localitySuggestions.map((loc) => (
                        <li key={loc}>
                          <button
                            type="button"
                            onMouseDown={() => selectLocality(loc)}
                            className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors flex items-center gap-2"
                          >
                            <Train className="h-3 w-3 text-muted-foreground" />
                            {loc}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <BudgetSlider
                  value={budget}
                  min={5000}
                  max={200000}
                  step={1000}
                  onChange={setBudget}
                  label="Max Monthly Budget"
                />

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">Property Type</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {propertyTypes.map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setSelectedType(value)}
                        className={`py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          selectedType === value
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted/40 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full gap-2 h-11 text-sm font-semibold">
                  <Search className="h-4 w-4" />
                  Search Properties
                </Button>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] text-muted-foreground">Quick picks:</span>
                  {quickAreas.slice(0, 5).map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => {
                        setLocality(area);
                        setShowSuggestions(false);
                      }}
                      className="text-[10px] px-2 py-0.5 rounded-full border border-border bg-muted/30 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </form>

              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                Sample listings — not live inventory.
                <span className="mx-1.5">•</span>
                Budget up to <strong>{formatCurrency(budget)}/mo</strong> selected.
              </p>
            </motion.div>
          </div>
        </PageContainer>
      </section>

      <section className="py-14 bg-muted/30 border-b">
        <PageContainer>
          <div className="flex items-center justify-between mb-6">
            <SectionHeading
              title="Browse by Rental Type"
              subtitle="From budget studios to premium family homes"
            />
            <Link to="/explore">
              <Button variant="ghost" size="sm" className="hidden sm:flex gap-1 text-xs text-primary">
                View all <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {propertyCategories.map(({ value, label, icon: Icon, priceRange, description }) => (
              <Link
                key={value}
                to={`/explore?type=${value}`}
                className="group flex flex-col items-center text-center p-4 rounded-xl border bg-card hover:border-primary/40 hover:bg-accent transition-all"
              >
                <div className="h-10 w-10 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-bold text-sm text-foreground">{label}</span>
                <span className="text-[10px] text-primary font-semibold mt-0.5">{priceRange}</span>
                <span className="text-[10px] text-muted-foreground mt-1 leading-tight">{description}</span>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-14 bg-background border-b">
        <PageContainer>
          <div className="flex items-center justify-between mb-6">
            <SectionHeading
              title="Featured Listings"
              subtitle="Hand-picked sample rentals across Mumbai localities"
            />
            <Link to="/explore">
              <Button variant="outline" size="sm" className="hidden sm:flex gap-1.5 text-xs">
                Browse all <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/explore">
              <Button variant="outline" className="gap-2">
                Browse all listings <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </PageContainer>
      </section>

      <section className="py-14 bg-card/60 border-b">
        <PageContainer>
          <SectionHeading
            title="How HomeHop Works"
            subtitle="Three simple steps to your next Mumbai home"
            centered
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {howItWorks.map(({ step, title, description, icon: Icon }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center p-6 rounded-2xl border bg-card"
              >
                <div className="h-12 w-12 rounded-full bg-primary-light text-primary flex items-center justify-center mb-4 text-lg font-display font-bold">
                  {step}
                </div>
                <Icon className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-bold text-base text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-14 bg-background border-b">
        <PageContainer>
          <SectionHeading
            title="Built for Transparency"
            subtitle="We believe renters deserve clear, honest information"
            centered
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {benefits.map(({ title, description, icon: Icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.1 }}
                className="flex flex-col p-6 rounded-2xl border bg-card"
              >
                <div className="h-10 w-10 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-sm text-foreground mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-14 bg-primary/5 border-b">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">For Property Owners</span>
              <h2 className="font-display text-3xl text-foreground mt-3 mb-4">
                List your Mumbai property for free.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md">
                Reach serious renters with verified intent. HomeHop shows deposit amounts, brokerage terms, and availability — attracting only qualified tenants.
              </p>
              <Link to="/owner">
                <Button className="gap-2">
                  List Your Property
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <Card>
              <CardContent className="p-6 space-y-3">
                {[
                  "Zero upfront listing fees",
                  "Verified tenant inquiries only",
                  "Assisted visit coordination",
                  "Leave-and-license support",
                  "Deposit and brokerage transparency",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {point}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </section>

      <section className="py-14 bg-primary text-primary-foreground">
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl mb-4">
              Ready to find your next home?
            </h2>
            <p className="text-primary-foreground/80 mb-8 leading-relaxed">
              Browse 45+ sample Mumbai rentals across Andheri, Powai, Thane, Bandra, and more — with complete cost transparency.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/explore">
                <Button
                  className="bg-white text-primary hover:bg-white/90 gap-2 h-11 px-8 font-semibold"
                >
                  <Search className="h-4 w-4" />
                  Explore Listings
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="ghost"
                  className="text-primary-foreground hover:bg-primary-foreground/10 gap-1 h-11 px-6"
                >
                  Learn More
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
