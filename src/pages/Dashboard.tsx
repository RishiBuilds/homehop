import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Search,
  Building2,
  Users,
  TrendingUp,
  Eye,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageContainer } from "@/components/shared/PageContainer";

const quickActions = [
  {
    title: "List a Property",
    description: "Add a new rental property listing.",
    icon: PlusCircle,
    href: "/dashboard",
  },
  {
    title: "Search Rentals",
    description: "Browse available properties.",
    icon: Search,
    href: "/explore",
  },
];

const stats = [
  { label: "Active Listings", value: "8", icon: Building2 },
  { label: "Total Views", value: "1,240", icon: Eye },
  { label: "Inquiries", value: "34", icon: MessageSquare },
  { label: "Tenants Reached", value: "580", icon: Users },
];

export default function Dashboard() {
  return (
    <section className="py-8 sm:py-12">
      <PageContainer>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <LayoutDashboard className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Welcome back! Manage your rental properties and track performance.
          </p>
          <Badge variant="secondary" className="mt-2">
            Demo — mock data only
          </Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map(({ label, value, icon: Icon }) => (
            <Card key={label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 mb-8">
          {quickActions.map(({ title, description, icon: Icon, href }) => (
            <Link key={title} to={href}>
              <Card className="transition-shadow hover:shadow-md h-full">
                <CardHeader className="flex-row items-center gap-4 space-y-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <div className="rounded-xl border bg-card p-6 sm:p-8">
          <div className="flex items-start gap-3 mb-4">
            <TrendingUp className="h-6 w-6 text-primary mt-0.5" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">For Tenants</h2>
              <p className="text-sm text-muted-foreground">
                Looking for your next home? Explore verified listings and find the perfect space.
              </p>
            </div>
          </div>
          <Link to="/explore">
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              Explore Properties
            </Button>
          </Link>
        </div>

        <p className="mt-8 text-xs text-center text-muted-foreground">
          Dashboard data shown above is illustrative. Listing management and analytics
          require a backend integration.
        </p>
      </PageContainer>
    </section>
  );
}

