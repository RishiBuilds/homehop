import { useState, lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Train,
  BedDouble,
  Bath,
  Maximize,
  Calendar,
  ShieldAlert,
  MessageCircle,
  Clock,
  Sparkles,
  CalendarCheck,
  Building,
  Share2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/shared/PageContainer";
import { SampleBadge } from "@/components/shared/SampleBadge";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { ScheduleVisitForm } from "@/components/shared/ScheduleVisitForm";
import { LegalChecklist } from "@/components/shared/LegalChecklist";
import { ComparisonDrawer } from "@/components/shared/ComparisonDrawer";

const ApproximateMiniMap = lazy(() =>
  import("@/components/shared/ApproximateMiniMap").then((m) => ({ default: m.ApproximateMiniMap }))
);
import { useComparison } from "@/hooks/useComparison";
import { getPropertyById, getSimilarProperties } from "@/data/mock-properties";
import {
  PROPERTY_TYPE_LABELS,
  AVAILABILITY_LABELS,
  FURNISHING_LABELS,
} from "@/types";
import { formatCurrency, computeUpfrontCost, getWhatsAppUrl } from "@/lib/utils";

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const property = id ? getPropertyById(id) : undefined;
  const [activeTab, setActiveTab] = useState<"whatsapp" | "visit" | "enquiry">("whatsapp");
  const [copied, setCopied] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const { comparisonCount, clearComparison } = useComparison();

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!property) {
    return (
      <section className="py-20 bg-background min-h-[70vh] flex items-center justify-center">
        <PageContainer>
          <div className="text-center max-w-md mx-auto p-8 rounded-2xl border bg-card shadow-xs">
            <div className="h-14 w-14 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-4">
              <Building className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Property Not Found</h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              We couldn't locate listing ID "{id}". It may have been unlisted, rented, or never existed in our demo catalogue.
            </p>
            <div className="mt-6">
              <Link to="/explore">
                <Button className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Browse Mumbai Rentals
                </Button>
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>
    );
  }

  const upfrontCost = computeUpfrontCost(property.rent, property.deposit, property.brokerage);
  const similarProperties = getSimilarProperties(property, 3);
  const whatsAppUrl = getWhatsAppUrl(property.referenceId, property.title);

  return (
    <section className="py-8 sm:py-12 bg-background">
      <PageContainer>
        <div className="mb-4">
          <Breadcrumbs
            items={[
              { label: "Explore", href: "/explore" },
              { label: property.locality, href: `/explore?locality=${encodeURIComponent(property.locality)}` },
              { label: property.referenceId },
            ]}
          />
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Explore Rentals
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-muted text-foreground border border-border">
              REF: {property.referenceId}
            </span>
            <SampleBadge />
            <Badge variant="outline" className="text-xs capitalize">
              {AVAILABILITY_LABELS[property.availability]}
            </Badge>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs border rounded-md px-2.5 py-1 bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
              title="Copy property link"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copied ? "Link Copied" : "Share"}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          <div className="md:col-span-2 aspect-[16/10] sm:aspect-[16/9] rounded-2xl bg-muted/60 border border-border flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
            <BedDouble className="h-16 w-16 text-muted-foreground/30 mb-3" />
            <span className="font-mono text-sm text-muted-foreground font-semibold">{property.referenceId}</span>
            <span className="text-xs text-muted-foreground mt-1">
              Sample photo gallery placeholder for {property.locality}
            </span>
            <div className="absolute bottom-3 right-3">
              <span className="text-[11px] bg-card/80 backdrop-blur px-2 py-1 rounded text-muted-foreground border">
                Verified layout diagram • Floor 4
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
            <div className="aspect-[16/10] sm:aspect-[16/9] md:aspect-auto rounded-2xl bg-muted/40 border border-border flex flex-col items-center justify-center p-4 text-center">
              <Building className="h-8 w-8 text-muted-foreground/30 mb-1" />
              <span className="text-[11px] text-muted-foreground">Building Exterior</span>
            </div>
            <div className="aspect-[16/10] sm:aspect-[16/9] md:aspect-auto rounded-2xl bg-muted/40 border border-border flex flex-col items-center justify-center p-4 text-center">
              <Maximize className="h-8 w-8 text-muted-foreground/30 mb-1" />
              <span className="text-[11px] text-muted-foreground">Living & Balcony</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="accent" className="text-xs">
                  {PROPERTY_TYPE_LABELS[property.type]}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {FURNISHING_LABELS[property.furnishing]}
                </Badge>
                <span className="text-xs text-muted-foreground">• Listed: {property.postedDate}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                {property.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  {property.locality}, {property.city}
                </span>
                <span className="flex items-center gap-1.5">
                  <Train className="h-4 w-4 text-primary shrink-0" />
                  Near {property.nearbyStation} Station
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl border bg-card">
              <div className="p-2">
                <span className="text-xs text-muted-foreground block">Configuration</span>
                <p className="text-sm font-semibold text-foreground mt-0.5 flex items-center gap-1.5">
                  <BedDouble className="h-4 w-4 text-primary" />
                  {property.bedrooms} {property.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                </p>
              </div>

              <div className="p-2">
                <span className="text-xs text-muted-foreground block">Bathrooms</span>
                <p className="text-sm font-semibold text-foreground mt-0.5 flex items-center gap-1.5">
                  <Bath className="h-4 w-4 text-primary" />
                  {property.bathrooms} {property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                </p>
              </div>

              <div className="p-2">
                <span className="text-xs text-muted-foreground block">Carpet Area</span>
                <p className="text-sm font-semibold text-foreground mt-0.5 flex items-center gap-1.5">
                  <Maximize className="h-4 w-4 text-primary" />
                  {property.area} {property.areaUnit}
                </p>
              </div>

              <div className="p-2">
                <span className="text-xs text-muted-foreground block">Available From</span>
                <p className="text-sm font-semibold text-foreground mt-0.5 flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-primary" />
                  {property.availableFrom}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Total Upfront Cost Calculator
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b">
                <div>
                  <span className="text-xs text-muted-foreground">Monthly Rent</span>
                  <p className="text-xl font-extrabold text-foreground mt-0.5">
                    {formatCurrency(property.rent)}
                  </p>
                  <span className="text-[11px] text-muted-foreground">Due on 1st of each month</span>
                </div>

                <div>
                  <span className="text-xs text-muted-foreground">Security Deposit</span>
                  <p className="text-xl font-extrabold text-foreground mt-0.5">
                    {formatCurrency(property.deposit)}
                  </p>
                  <span className="text-[11px] text-muted-foreground">Refundable at tenancy exit</span>
                </div>

                <div>
                  <span className="text-xs text-muted-foreground">Brokerage Amount</span>
                  <p className="text-xl font-extrabold text-foreground mt-0.5">
                    {property.brokerage > 0 ? formatCurrency(property.brokerage) : "Zero"}
                  </p>
                  <span className="text-[11px] text-muted-foreground">
                    {property.brokerage > 0 ? "One-time service fee" : "Direct owner / Zero fee"}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Approximate Total Initial Outlay
                  </span>
                  <p className="text-2xl font-black text-primary mt-0.5">
                    {formatCurrency(upfrontCost)}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground max-w-xs leading-tight">
                  Calculated as: 1 month rent ({formatCurrency(property.rent)}) + security deposit ({formatCurrency(property.deposit)}) + brokerage ({formatCurrency(property.brokerage)}).
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">Property Description</h2>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold text-foreground">Society & Unit Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 p-2.5 rounded-lg border bg-card text-xs font-medium text-foreground"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 flex items-start gap-3 text-xs text-amber-900">
              <ShieldAlert className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-950">Verification Status: Verification Pending</p>
                <p className="mt-0.5 text-amber-800 leading-relaxed">
                  Per HomeHop quality guidelines, this sample listing is community-provided and awaiting physical
                  audit. Last availability update was confirmed on{" "}
                  <strong>{property.lastConfirmedDate}</strong>.
                </p>
              </div>
            </div>

            <LegalChecklist />

            <Suspense
              fallback={
                <div className="h-56 rounded-xl border bg-muted/20 animate-pulse flex items-center justify-center text-xs text-muted-foreground">
                  Loading approximate locality map...
                </div>
              }
            >
              <ApproximateMiniMap property={property} />
            </Suspense>

            {similarProperties.length > 0 && (
              <div className="pt-6 border-t space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-foreground">Similar Rentals Nearby</h2>
                  <Link to={`/explore?type=${property.type}`} className="text-xs text-primary font-medium hover:underline">
                    View more
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similarProperties.map((sim) => (
                    <PropertyCard key={sim.id} property={sim} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <Card className="sticky top-24 border-primary/20 shadow-md">
              <CardContent className="p-6 space-y-5">
                <div className="flex items-baseline justify-between border-b pb-4">
                  <div>
                    <span className="text-xs text-muted-foreground">Monthly Rent</span>
                    <p className="text-2xl font-black text-primary">
                      {formatCurrency(property.rent)}
                      <span className="text-xs font-normal text-muted-foreground"> /month</span>
                    </p>
                  </div>
                  <Badge variant="accent" className="capitalize text-xs">
                    {property.furnishing}
                  </Badge>
                </div>

                <div className="flex rounded-lg border p-1 bg-muted/40 gap-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab("whatsapp")}
                    className={`flex-1 py-1.5 rounded font-medium transition-colors ${
                      activeTab === "whatsapp" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground"
                    }`}
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("visit")}
                    className={`flex-1 py-1.5 rounded font-medium transition-colors ${
                      activeTab === "visit" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground"
                    }`}
                  >
                    Visit
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("enquiry")}
                    className={`flex-1 py-1.5 rounded font-medium transition-colors ${
                      activeTab === "enquiry" ? "bg-card text-foreground shadow-xs" : "text-muted-foreground"
                    }`}
                  >
                    Enquiry
                  </button>
                </div>

                {activeTab === "whatsapp" && (
                  <div className="space-y-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Connect directly on WhatsApp with the pre-filled reference ID (
                      <span className="font-mono font-bold text-foreground">{property.referenceId}</span>) to ask questions,
                      request video tours, or confirm rent negotiation.
                    </p>

                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button className="w-full gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold">
                        <MessageCircle className="h-4 w-4" />
                        Chat on WhatsApp
                      </Button>
                    </a>

                    <div className="pt-2 border-t text-[11px] text-muted-foreground space-y-1">
                      <p className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
                        Fastest response via WhatsApp (typically &lt; 15 mins)
                      </p>
                      <p className="flex items-center gap-1.5">
                        <CalendarCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                        Availability last re-verified on {property.lastConfirmedDate}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "visit" && (
                  <div>
                    <ScheduleVisitForm
                      propertyReferenceId={property.referenceId}
                      propertyTitle={property.title}
                    />
                  </div>
                )}

                {activeTab === "enquiry" && (
                  <div>
                    <EnquiryForm
                      propertyReferenceId={property.referenceId}
                      propertyTitle={property.title}
                    />
                  </div>
                )}

                <div className="pt-3 border-t text-center">
                  <span className="text-[11px] text-muted-foreground">
                    Reference ID: <strong className="font-mono text-foreground">{property.referenceId}</strong>
                  </span>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </PageContainer>

      {comparisonCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 rounded-full border border-primary/30 bg-card/95 backdrop-blur px-5 py-2.5 shadow-xl">
          <span className="text-xs font-semibold text-foreground">
            {comparisonCount} of 3 properties selected
          </span>
          <Button size="sm" onClick={() => setShowCompare(true)} className="h-7 text-xs px-3">
            Compare Now
          </Button>
          <button
            type="button"
            onClick={clearComparison}
            className="text-xs text-muted-foreground hover:text-foreground font-medium"
          >
            Clear
          </button>
        </div>
      )}

      <ComparisonDrawer isOpen={showCompare} onClose={() => setShowCompare(false)} />
    </section>
  );
}
