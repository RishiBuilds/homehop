import { Briefcase, ShieldAlert, CheckCircle2, MapPin, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/shared/PageContainer";

export default function BrokerPortal() {
  return (
    <div className="py-12 bg-background min-h-screen">
      <PageContainer>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Portal Prototype</span>
            <span className="text-xs text-muted-foreground">• Phase 3 Roadmap</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Broker Operations Portal
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Verified inventory management, accompanied client visits, and digital brokerage settlement.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 mb-8 flex items-start gap-3 text-xs text-amber-900">
          <ShieldAlert className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-950">Placeholder Route (Phase 3 Feature)</p>
            <p className="mt-0.5 leading-relaxed">
              Broker onboarding, listing verification badges, visit coordination, and transparent brokerage
              agreements will be built in Phase 3 (Broker Operations).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="h-10 w-10 rounded-lg bg-primary-light text-primary flex items-center justify-center mb-3">
                <MapPin className="h-5 w-5" />
              </div>
              <h2 className="font-bold text-foreground text-base">Claim Local Territory</h2>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Operate exclusively in high-demand pockets like Andheri-East, Powai, or Thane.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="h-10 w-10 rounded-lg bg-primary-light text-primary flex items-center justify-center mb-3">
                <Users className="h-5 w-5" />
              </div>
              <h2 className="font-bold text-foreground text-base">Verified Tenant Leads</h2>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Connect only with pre-qualified tenants who have confirmed budget & move-in dates.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="h-10 w-10 rounded-lg bg-primary-light text-primary flex items-center justify-center mb-3">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h2 className="font-bold text-foreground text-base">Faster Closures</h2>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Standard digital agreements and transparent commission disclosures ensure zero dispute.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="rounded-2xl border bg-card p-6 max-w-xl mx-auto text-center">
          <CheckCircle2 className="h-10 w-10 text-primary mx-auto mb-2" />
          <h3 className="font-bold text-foreground text-base">Partner With HomeHop</h3>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            Are you a licensed real estate broker in Mumbai? Join our upcoming broker network to receive
            direct tenant visit requests.
          </p>
          <div className="mt-4">
            <a href="mailto:brokers@homehop.in">
              <Button variant="outline" size="sm">
                Register Broker Interest (brokers@homehop.in)
              </Button>
            </a>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
