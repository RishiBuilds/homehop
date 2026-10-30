import { Link } from "react-router-dom";
import { User, Bookmark, Calendar, FileText, ArrowRight, ShieldAlert, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/shared/PageContainer";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { LegalChecklist } from "@/components/shared/LegalChecklist";
import { useFavorites } from "@/hooks/useFavorites";
import { getPropertyById } from "@/data/mock-properties";

export default function TenantPortal() {
  const { favorites, favoritesCount } = useFavorites();
  const favoriteProperties = favorites
    .map((id) => getPropertyById(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <div className="py-12 bg-background min-h-screen">
      <PageContainer>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Portal Prototype</span>
            <span className="text-xs text-muted-foreground">• Public Preview</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Tenant Portal
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Manage your saved Mumbai properties, accompanied site visits, and rental inquiries.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 mb-8 flex items-start gap-3 text-xs text-amber-900">
          <ShieldAlert className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-950">Placeholder Route (Public Foundation Phase)</p>
            <p className="mt-0.5 leading-relaxed">
              Full tenant account authentication, saved listings synchronization, and agreement tracking are scheduled
              for Phase 4. For now, bookmarks are saved locally on this browser.
            </p>
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-600 fill-rose-600" />
              <h2 className="text-lg font-bold text-foreground">Your Shortlisted Properties</h2>
              <span className="text-xs rounded-full bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 font-semibold">
                {favoritesCount} Saved
              </span>
            </div>
            {favoritesCount > 0 && (
              <Link to="/explore" className="text-xs text-primary font-medium hover:underline">
                Find more rentals
              </Link>
            )}
          </div>

          {favoriteProperties.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {favoriteProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed p-8 text-center bg-card">
              <Bookmark className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
              <h3 className="font-semibold text-sm text-foreground">No properties shortlisted yet</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                Click the heart icon on any property in the explore marketplace to bookmark it for quick access here.
              </p>
              <Link to="/explore" className="mt-4 inline-block">
                <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                  Explore Mumbai Properties
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="h-10 w-10 rounded-lg bg-primary-light text-primary flex items-center justify-center mb-3">
                <Calendar className="h-5 w-5" />
              </div>
              <h2 className="font-bold text-foreground text-base">Accompanied Visit Requests</h2>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Track status of scheduled weekend accompanied visits in Powai, Andheri, and Thane.
              </p>
              <Button variant="outline" size="sm" className="mt-4 text-xs" disabled>
                0 Active Visits
              </Button>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="h-10 w-10 rounded-lg bg-primary-light text-primary flex items-center justify-center mb-3">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="font-bold text-foreground text-base">Standard Agreements</h2>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Standard Maharashtra leave-and-license agreement templates and deposit receipts.
              </p>
              <Button variant="outline" size="sm" className="mt-4 text-xs" disabled>
                Available in Phase 4
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mb-10">
          <LegalChecklist />
        </div>

        <div className="text-center pt-8 border-t">
          <Link to="/explore">
            <Button size="lg" className="gap-2">
              Browse Available Mumbai Rentals
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </PageContainer>
    </div>
  );
}
