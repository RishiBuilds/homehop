import { Link } from "react-router-dom";
import { MapPin, BedDouble, Bath, Maximize, Calendar, ArrowRight, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SampleBadge } from "./SampleBadge";
import { TransitDistanceBadge } from "./TransitDistanceBadge";
import { useFavorites } from "@/hooks/useFavorites";
import type { Property } from "@/types";
import { PROPERTY_TYPE_LABELS, AVAILABILITY_LABELS } from "@/types";
import { formatCurrency, computeUpfrontCost } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  viewMode?: "grid" | "list";
}

export function PropertyCard({ property, viewMode = "grid" }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(property.id);
  const upfrontCost = computeUpfrontCost(property.rent, property.deposit, property.brokerage);

  if (viewMode === "list") {
    return (
      <Link to={`/property/${property.id}`} className="group block">
        <Card className="overflow-hidden transition-all duration-200 hover:border-primary/50 hover:shadow-md">
          <div className="flex flex-col sm:flex-row">
            <div className="relative aspect-[16/10] sm:aspect-square sm:w-64 shrink-0 bg-muted flex items-center justify-center border-b sm:border-b-0 sm:border-r border-border">
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <BedDouble className="h-10 w-10 text-muted-foreground/40 mb-2" />
                <span className="text-xs font-mono text-muted-foreground">{property.referenceId}</span>
              </div>
              <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
                <Badge variant="accent">{PROPERTY_TYPE_LABELS[property.type] ?? property.type}</Badge>
                <SampleBadge />
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(property.id);
                }}
                className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur transition-colors ${
                  favorite
                    ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
                    : "bg-card/80 text-muted-foreground hover:text-foreground hover:bg-card"
                }`}
                aria-label={favorite ? "Remove from favorites" : "Save to favorites"}
              >
                <Heart className={`h-4 w-4 ${favorite ? "fill-rose-600" : ""}`} />
              </button>
            </div>

            <CardContent className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      {property.referenceId}
                    </span>
                    <Badge variant="outline" className="text-xs capitalize">
                      {AVAILABILITY_LABELS[property.availability]}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">
                      {formatCurrency(property.rent)}
                      <span className="text-xs font-normal text-muted-foreground"> /month</span>
                    </p>
                  </div>
                </div>

                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {property.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-y-1 gap-x-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>{property.locality}</span>
                  </span>
                  <TransitDistanceBadge station={property.nearbyStation} />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BedDouble className="h-3.5 w-3.5" />
                    {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-3.5 w-3.5" />
                    {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize className="h-3.5 w-3.5" />
                    {property.area} {property.areaUnit}
                  </span>
                  <Badge variant="secondary" className="capitalize text-xs">
                    {property.furnishing}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                <div className="flex flex-wrap items-center gap-3">
                  <span>Deposit: <strong className="text-foreground">{formatCurrency(property.deposit)}</strong></span>
                  <span>Brokerage: <strong className="text-foreground">{property.brokerage > 0 ? formatCurrency(property.brokerage) : "Nil"}</strong></span>
                  <span>Total Upfront: <strong className="text-primary">{formatCurrency(upfrontCost)}</strong></span>
                </div>
                <div className="flex items-center gap-1 text-primary font-medium group-hover:translate-x-0.5 transition-transform">
                  <span>View Details</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/property/${property.id}`} className="group block h-full">
      <Card className="overflow-hidden transition-all duration-200 hover:border-primary/50 hover:shadow-md h-full flex flex-col justify-between">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden bg-muted flex items-center justify-center border-b border-border">
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <BedDouble className="h-10 w-10 text-muted-foreground/40 mb-2 group-hover:scale-105 transition-transform" />
              <span className="text-xs font-mono text-muted-foreground">{property.referenceId}</span>
              <span className="text-[11px] text-muted-foreground/80 mt-1">{property.locality}</span>
            </div>
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
              <Badge variant="accent">{PROPERTY_TYPE_LABELS[property.type] ?? property.type}</Badge>
              <SampleBadge />
            </div>
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              <Badge variant="secondary" className="text-xs capitalize bg-card/90 backdrop-blur">
                {AVAILABILITY_LABELS[property.availability]}
              </Badge>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(property.id);
                }}
                className={`p-1.5 rounded-full backdrop-blur transition-colors ${
                  favorite
                    ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
                    : "bg-card/90 text-muted-foreground hover:text-foreground hover:bg-card"
                }`}
                aria-label={favorite ? "Remove from favorites" : "Save to favorites"}
              >
                <Heart className={`h-3.5 w-3.5 ${favorite ? "fill-rose-600" : ""}`} />
              </button>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-mono font-medium text-muted-foreground">
                {property.referenceId}
              </span>
              <Badge variant="secondary" className="text-[11px] capitalize">
                {property.furnishing}
              </Badge>
            </div>

            <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {property.title}
            </h3>

            <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="truncate">{property.locality}</span>
            </div>

            <div className="mt-2">
              <TransitDistanceBadge station={property.nearbyStation} />
            </div>

            <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <BedDouble className="h-3.5 w-3.5" />
                {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
              </span>
              <span className="flex items-center gap-1">
                <Bath className="h-3.5 w-3.5" />
                {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
              </span>
              <span className="flex items-center gap-1">
                <Maximize className="h-3.5 w-3.5" />
                {property.area} {property.areaUnit}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t flex items-baseline justify-between">
              <div>
                <p className="text-lg font-bold text-primary">
                  {formatCurrency(property.rent)}
                  <span className="text-xs font-normal text-muted-foreground"> /mo</span>
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Deposit: {formatCurrency(property.deposit)}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-muted-foreground block">
                  {property.brokerage > 0 ? `Brokerage: ${formatCurrency(property.brokerage)}` : "Zero Brokerage"}
                </span>
                <span className="text-[11px] font-medium text-primary">
                  Upfront: {formatCurrency(upfrontCost)}
                </span>
              </div>
            </div>
          </CardContent>
        </div>

        <div className="px-4 pb-3 pt-0 flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Confirmed: {property.lastConfirmedDate}
          </span>
          <span className="text-primary font-medium group-hover:underline flex items-center gap-0.5">
            Details →
          </span>
        </div>
      </Card>
    </Link>
  );
}
