import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Shield,
  Zap,
  Users,
  ArrowRight,
  CheckCircle2,
  BedDouble,
  Hotel,
  Building2,
  Home as HomeIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { SearchBar } from "@/components/shared/SearchBar";
import { cn } from "@/lib/utils";
import { MOCK_PROPERTIES } from "@/services/properties";
import { useState } from "react";
import type { PropertyType } from "@/types";

const propertyTypes = [
  { value: "room" as PropertyType, label: "Rooms", icon: BedDouble, description: "Private & shared rooms" },
  { value: "pg" as PropertyType, label: "PG / Co-living", icon: Hotel, description: "Meals & amenities included" },
  { value: "flat" as PropertyType, label: "Flats", icon: Building2, description: "1BHK to 4BHK apartments" },
  { value: "house" as PropertyType, label: "Houses", icon: HomeIcon, description: "Independent & villa" },
];

const howItWorks = [
  {
    step: "1",
    title: "Search your area",
    description: "Enter your preferred location, property type, and budget to discover available rentals.",
    icon: Search,
  },
  {
    step: "2",
    title: "Explore & compare",
    description: "Browse detailed listings with photos, amenities, pricing, and neighborhood info.",
    icon: Zap,
  },
  {
    step: "3",
    title: "Connect & move in",
    description: "Reach out to owners or brokers directly and schedule visits at your convenience.",
    icon: Users,
  },
];

const benefits = [
  { title: "Verified Listings", description: "Every property is reviewed for accuracy and authenticity.", icon: Shield },
  { title: "No Hidden Fees", description: "Transparent pricing with no surprise charges or brokerage traps.", icon: CheckCircle2 },
  { title: "Fast & Simple", description: "Find and connect with property owners in minutes, not days.", icon: Zap },
];

export default function Home() {
  const [searchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState<PropertyType | "">(
    (searchParams.get("type") as PropertyType) || ""
  );

  const featuredProperties = MOCK_PROPERTIES.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-background py-16 sm:py-24">
        <PageContainer>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Find a place to call{" "}
              <span className="text-primary">home</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
              HomeHop connects you with affordable rooms, PGs, flats, and rental homes.
              <br className="hidden sm:block" />
              <span className="font-medium text-foreground">Find your space. Feel at home.</span>
            </p>

            <div className="mt-8 rounded-xl border bg-card p-4 shadow-sm sm:p-6">
              <SearchBar />
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="py-16">
        <PageContainer>
          <SectionHeading
            title="What are you looking for?"
            subtitle="Browse by property type to find exactly what suits your needs."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {propertyTypes.map(({ value, label, icon: Icon, description }) => (
              <Link
                key={value}
                to={`/explore?type=${value}`}
                className={cn(
                  "group rounded-xl border p-6 text-center transition-all hover:border-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  selectedType === value
                    ? "border-primary bg-accent"
                    : "border-border bg-card"
                )}
                onClick={() => setSelectedType(value)}
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground">{label}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{description}</p>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="bg-secondary/50 py-16">
        <PageContainer>
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Featured Rentals
              </h2>
              <p className="mt-2 text-muted-foreground">
                Hand-picked properties available right now.
              </p>
            </div>
            <Link to="/explore" className="hidden sm:block">
              <Button variant="outline" className="gap-1.5">
                View all
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/explore">
              <Button variant="outline" className="gap-1.5">
                View all properties
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </PageContainer>
      </section>

      <section className="py-16">
        <PageContainer>
          <SectionHeading
            title="How HomeHop works"
            subtitle="Three simple steps to find your next home."
          />
          <div className="grid gap-8 sm:grid-cols-3">
            {howItWorks.map(({ step, title, description, icon: Icon }) => (
              <div key={step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                  {step}
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">{title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="bg-secondary/50 py-16">
        <PageContainer>
          <SectionHeading
            title="Why tenants trust HomeHop"
            subtitle="We're building the most transparent rental experience in India."
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {benefits.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="text-center p-6">
                <CardContent className="p-0">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="py-16">
        <PageContainer>
          <div className="rounded-2xl bg-primary p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
              Own a property? List it on HomeHop.
            </h2>
            <p className="mt-3 text-primary-foreground/80 max-w-xl mx-auto">
              Reach thousands of verified tenants actively searching for their next home.
              No listing fees. No hassle.
            </p>
            <Link to="/dashboard" className="mt-6 inline-block">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 text-primary font-semibold"
              >
                List your property
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </PageContainer>
      </section>
    </>
  );
}

