import { Link } from "react-router-dom";
import { MapPin, BedDouble, Bath, Maximize } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Property } from "@/types";
import { useState } from "react";

interface PropertyCardProps {
  property: Property;
}

const typeLabels: Record<string, string> = {
  room: "Room",
  pg: "PG / Co-living",
  flat: "Flat",
  house: "House",
};

export function PropertyCard({ property }: PropertyCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link to={`/properties/${property.id}`} className="group block">
      <Card className="overflow-hidden transition-shadow duration-200 hover:shadow-md h-full">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {!imgError && property.images[0] ? (
            <img
              src={property.images[0]}
              alt={property.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <BedDouble className="h-12 w-12 text-muted-foreground/40" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge variant="accent">{typeLabels[property.type] ?? property.type}</Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
          </div>
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>
          <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
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
          <div className="mt-3 flex items-center justify-between">
            <p className="text-lg font-bold text-primary">
              ₹{property.price.toLocaleString("en-IN")}
              <span className="text-sm font-normal text-muted-foreground">
                {property.priceUnit}
              </span>
            </p>
            <Badge variant="secondary" className="text-xs capitalize">
              {property.furnishing}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
