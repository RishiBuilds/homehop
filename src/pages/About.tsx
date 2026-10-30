import { Link } from "react-router-dom";
import { Train, ShieldCheck, Eye, ArrowRight, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";

export default function About() {
  return (
    <div className="py-12 sm:py-16 bg-background">
      <PageContainer>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">About HomeHop</span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Rethinking the Rental Search in Mumbai
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Finding a home in Mumbai is famously challenging: 6–10 months deposit demands, hidden brokerage terms,
            and ghost listings that have been off the market for weeks. HomeHop was created to bring radical transparency
            to every step of the journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          <div className="rounded-2xl border bg-card p-6 shadow-xs">
            <div className="h-12 w-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-4">
              <Eye className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-foreground">Upfront Cost Transparency</h2>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              We compute and display your entire initial financial commitment (first month's rent + security deposit + brokerage)
              so you are never surprised during agreement signing.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-xs">
            <div className="h-12 w-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-4">
              <Train className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-foreground">Transit-First Discovery</h2>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              In Mumbai, commute is everything. Every property on HomeHop is mapped to nearest Western, Central,
              or Harbour line suburban stations and Metro corridors.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-xs">
            <div className="h-12 w-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-foreground">Fresh Availability Verification</h2>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Every listing transparently displays when its availability was last confirmed by our team or community,
              reducing wasted phone calls on inactive properties.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border bg-muted/40 p-8 sm:p-12 max-w-4xl mx-auto mb-16">
          <div className="flex items-center gap-2 mb-2 text-primary font-semibold text-sm">
            <Building className="h-4 w-4" />
            <span>Our Mumbai Roots</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground">Focused Exclusively on Mumbai & Suburbs</h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            From the bustling hubs of Andheri and Powai to family neighborhoods in Borivali, Thane, and Mulund,
            our product architecture reflects the unique terminology and realities of Mumbai real estate:
            1 RKs, chawl-to-highrise conversions, society NOC restrictions, and bachelor-friendly PG accommodations.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-foreground">
            <span className="bg-card px-3 py-1.5 rounded-lg border">Andheri • BKC • Powai</span>
            <span className="bg-card px-3 py-1.5 rounded-lg border">Thane • Mulund • Ghatkopar</span>
            <span className="bg-card px-3 py-1.5 rounded-lg border">Borivali • Kandivali • Malad</span>
            <span className="bg-card px-3 py-1.5 rounded-lg border">Bandra • Dadar • Lower Parel</span>
          </div>
        </div>

        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-xl font-bold text-foreground">Ready to find your next home?</h2>
          <p className="mt-2 text-xs text-muted-foreground">
            Browse our curated catalogue of Mumbai rental flats, studio rooms, and co-living spaces.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link to="/explore">
              <Button className="gap-2">
                Explore Properties
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline">Contact Our Team</Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
