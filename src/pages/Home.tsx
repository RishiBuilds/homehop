import { Link } from "react-router-dom";
import {
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
  BedDouble,
  Hotel,
  Building2,
  Home as HomeIcon,
  Train,
  BadgePercent,
  CalendarCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { SearchBar } from "@/components/shared/SearchBar";
import { getFeaturedProperties } from "@/data/mock-properties";
import type { PropertyType } from "@/types";

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
  { value: "pg", label: "PG / Co-Living", icon: Hotel, priceRange: "From ₹8,000/mo", description: "Furnished with meals & laundry" },
  { value: "room", label: "Private Room", icon: BedDouble, priceRange: "From ₹10,000/mo", description: "Single occupancy in shared flat" },
];

const howItWorks = [
  {
    step: "1",
    title: "Search By Locality & Station",
    description: "Filter by Western, Central, or Harbour line railway stations, Mumbai suburbs, and exact budget.",
    icon: Train,
  },
  {
    step: "2",
    title: "Transparent Upfront Costs",
    description: "Every listing clearly shows monthly rent, security deposit, and exact brokerage amount. No hidden costs.",
    icon: BadgePercent,
  },
  {
    step: "3",
    title: "Connect & Schedule Visits",
    description: "Instantly chat on WhatsApp with the property reference ID or request an assisted site visit slot.",
    icon: CalendarCheck,
  },
];

const benefits = [
  {
    title: "Upfront Cost Breakdown",
    description: "Calculate your complete initial moving expenses before stepping out: rent, security deposit, and brokerage clearly displayed.",
    icon: Shield,
  },
  {
    title: "Regular Availability Updates",
    description: "Listings show the last date availability was verified, saving you from calling on already rented apartments.",
    icon: CheckCircle2,
  },
  {
    title: "Direct WhatsApp Inquiries",
    description: "Skip lengthy registration funnels. Connect on WhatsApp with the listing reference ID for instant communication.",
    icon: Zap,
  },
];

export default function Home() {
  const featuredProperties = getFeaturedProperties().slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-light/40 via-background to-background py-16 sm:py-24 border-b">
        <PageContainer>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-4">
              <Train className="h-3.5 w-3.5" />
              Mumbai's Transparent Rental Discovery
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Find your space. <br />
              <span className="text-primary">Feel at home.</span>
            </h1>

            <p className="mt-4 text-base text-muted-foreground sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Discover verified rooms, PGs, 1 RKs, and flats across Mumbai with upfront security deposit
              and brokerage clarity. Near local train stations and metro hubs.
            </p>

            <div className="mt-8 rounded-2xl border bg-card p-4 sm:p-6 shadow-sm text-left">
              <SearchBar />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span>Popular:</span>
              <Link to="/explore?locality=Andheri+East" className="hover:text-primary underline">Andheri East</Link>
              <Link to="/explore?locality=Powai" className="hover:text-primary underline">Powai</Link>
              <Link to="/explore?locality=Thane+West" className="hover:text-primary underline">Thane West</Link>
              <Link to="/explore?locality=Bandra+West" className="hover:text-primary underline">Bandra West</Link>
              <Link to="/explore?locality=Borivali+West" className="hover:text-primary underline">Borivali West</Link>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="py-16 bg-card/50">
        <PageContainer>
          <SectionHeading
            title="Browse by Rental Type"
            subtitle="Explore room configurations, PGs, and apartments tailored to Mumbai's rental market."
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {propertyCategories.map(({ value, label, icon: Icon, priceRange, description }) => (
              <Link
                key={value}
                to={`/explore?type=${value}`}
                className="group rounded-xl border border-border bg-card p-4 text-center transition-all hover:border-primary hover:shadow-sm"
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-sm text-foreground">{label}</h3>
                <p className="mt-1 text-xs font-medium text-primary">{priceRange}</p>
                <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1">{description}</p>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-16">
        <PageContainer>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Hand-Picked</span>
                <span className="text-xs text-muted-foreground">• Sample Listings</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Featured Mumbai Rentals
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Sample properties in Andheri, Powai, Borivali, Bandra, and Lower Parel.
              </p>
            </div>
            <Link to="/explore">
              <Button variant="outline" className="gap-1.5 text-xs">
                Explore all rentals
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-16 bg-muted/40 border-y">
        <PageContainer>
          <SectionHeading
            title="How HomeHop Works"
            subtitle="Three simple steps to secure your next rental in Mumbai."
          />

          <div className="grid gap-8 sm:grid-cols-3 max-w-5xl mx-auto">
            {howItWorks.map(({ step, title, description, icon: Icon }) => (
              <div key={step} className="rounded-xl border bg-card p-6 text-center relative shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-base shadow-sm">
                  {step}
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <Icon className="h-5 w-5 text-primary shrink-0" />
                  <h3 className="font-semibold text-foreground text-base">{title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-16">
        <PageContainer>
          <SectionHeading
            title="Built for Mumbai's Rental Reality"
            subtitle="Addressing real tenant pain points: exorbitant deposit demands, hidden brokerage, and outdated listings."
          />

          <div className="grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
            {benefits.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="p-6">
                <CardContent className="p-0">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary-light text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-foreground text-base">{title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-16 bg-secondary/50 border-t">
        <PageContainer>
          <div className="rounded-3xl bg-primary px-6 py-12 sm:px-12 sm:py-16 text-center text-primary-foreground shadow-sm">
            <h2 className="text-2xl font-bold sm:text-3xl max-w-xl mx-auto">
              Own a flat, room, or PG in Mumbai?
            </h2>
            <p className="mt-3 text-sm text-primary-foreground/80 max-w-lg mx-auto leading-relaxed">
              Connect with verified tenants looking for homes near transit corridors. No upfront listing fees,
              assisted site visits, and transparent tenant screening.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link to="/owner">
                <Button size="lg" variant="secondary" className="gap-2 text-primary font-semibold">
                  List Your Property
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Browse All Listings
                </Button>
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
