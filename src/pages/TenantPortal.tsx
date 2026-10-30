import { Link } from "react-router-dom";
import { User, Bookmark, Calendar, FileText, ArrowRight, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/shared/PageContainer";

export default function TenantPortal() {
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
              for Phase 4. For now, inquiries and visit bookings can be requested directly on any property page.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="h-10 w-10 rounded-lg bg-primary-light text-primary flex items-center justify-center mb-3">
                <Bookmark className="h-5 w-5" />
              </div>
              <h2 className="font-bold text-foreground text-base">Shortlisted Properties</h2>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Bookmark flats and PGs across Mumbai with real-time price change alerts.
              </p>
              <Link to="/explore" className="mt-4 inline-block">
                <Button variant="outline" size="sm" className="text-xs gap-1.5">
                  Browse Rentals
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="h-10 w-10 rounded-lg bg-primary-light text-primary flex items-center justify-center mb-3">
                <Calendar className="h-5 w-5" />
              </div>
              <h2 className="font-bold text-foreground text-base">Site Visit Requests</h2>
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
