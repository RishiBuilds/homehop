import { Shield, ShieldAlert, CheckSquare, FileText, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/shared/PageContainer";

export default function AdminPortal() {
  return (
    <div className="py-12 bg-background min-h-screen">
      <PageContainer>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Portal Prototype</span>
            <span className="text-xs text-muted-foreground">• Internal Backoffice</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Admin Backoffice
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Centralized moderation, listing audit queues, broker verification, and platform integrity metrics.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 mb-8 flex items-start gap-3 text-xs text-amber-900">
          <ShieldAlert className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-950">Placeholder Route (Platform Administration)</p>
            <p className="mt-0.5 leading-relaxed">
              Administrative role-based access control (RBAC), physical audit assignment, and dispute handling
              will be integrated with the Convex backend in Phase 4.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-5">
            <CardContent className="p-0">
              <span className="text-xs text-muted-foreground">Audit Queue</span>
              <p className="text-2xl font-bold text-foreground mt-1">15 Listings</p>
              <span className="text-[11px] text-amber-600 font-medium">Pending physical visit</span>
            </CardContent>
          </Card>

          <Card className="p-5">
            <CardContent className="p-0">
              <span className="text-xs text-muted-foreground">Broker Applications</span>
              <p className="text-2xl font-bold text-foreground mt-1">4 Pending</p>
              <span className="text-[11px] text-muted-foreground">RERA credentials review</span>
            </CardContent>
          </Card>

          <Card className="p-5">
            <CardContent className="p-0">
              <span className="text-xs text-muted-foreground">Reported Flags</span>
              <p className="text-2xl font-bold text-foreground mt-1">0 Active</p>
              <span className="text-[11px] text-primary font-medium">Zero duplicate flags</span>
            </CardContent>
          </Card>

          <Card className="p-5">
            <CardContent className="p-0">
              <span className="text-xs text-muted-foreground">Sample Properties</span>
              <p className="text-2xl font-bold text-foreground mt-1">15 Live</p>
              <span className="text-[11px] text-muted-foreground">Mumbai test inventory</span>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="p-6">
            <CardContent className="p-0">
              <CheckSquare className="h-6 w-6 text-primary mb-2" />
              <h2 className="font-bold text-sm text-foreground">Listing Quality Audits</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Review rent receipts, electricity bill proofs, and society NOC rules before granting verification badges.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <FileText className="h-6 w-6 text-primary mb-2" />
              <h2 className="font-bold text-sm text-foreground">Audit Trail Logs</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Track every edit made to security deposit figures, brokerage disclosures, and photo uploads.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <Users className="h-6 w-6 text-primary mb-2" />
              <h2 className="font-bold text-sm text-foreground">User Disputes</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Investigate discrepancy between listed deposit and actual lease agreement demands.
              </p>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </div>
  );
}
