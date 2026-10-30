import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Search,
  Building2,
  Users,
  Briefcase,
  Shield,
  Eye,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageContainer } from "@/components/shared/PageContainer";

const quickActions = [
  {
    title: "Explore Mumbai Listings",
    description: "Browse 15 sample properties across Mumbai suburbs.",
    icon: Search,
    href: "/explore",
  },
  {
    title: "Owner Portal",
    description: "Draft new listings and set deposit rules.",
    icon: PlusCircle,
    href: "/owner",
  },
  {
    title: "Tenant Portal",
    description: "View saved properties and visit requests.",
    icon: Users,
    href: "/tenant",
  },
  {
    title: "Broker Operations",
    description: "Manage accompanied visits and verified territory.",
    icon: Briefcase,
    href: "/broker",
  },
];

const stats = [
  { label: "Sample Listings", value: "15", icon: Building2 },
  { label: "Mumbai Localities", value: "12", icon: Eye },
  { label: "Mock Inquiries", value: "48", icon: MessageSquare },
  { label: "Avg. Deposit", value: "2.1 Mo", icon: Users },
];

export default function Dashboard() {
  return (
    <section className="py-8 sm:py-12 bg-background min-h-screen">
      <PageContainer>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <LayoutDashboard className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Overview of HomeHop public foundation, portal prototypes, and Mumbai rental statistics.
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="secondary">Demo Environment — Mock Data Only</Badge>
            <Link to="/admin" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Admin Backoffice
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map(({ label, value, icon: Icon }) => (
            <Card key={label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-base font-bold text-foreground mb-4">Portals & Workflows</h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-8">
          {quickActions.map(({ title, description, icon: Icon, href }) => (
            <Link key={title} to={href}>
              <Card className="transition-all hover:border-primary/50 hover:shadow-md h-full">
                <CardHeader className="flex-row items-center gap-4 space-y-0 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm font-semibold flex items-center justify-between">
                      <span>{title}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <div className="rounded-xl border bg-card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-foreground text-sm">Need to Explore Properties?</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Jump directly to the interactive Mumbai marketplace with full filter support.
              </p>
            </div>
            <Link to="/explore">
              <Button className="gap-2">
                <Search className="h-4 w-4" />
                Explore Rentals
              </Button>
            </Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
