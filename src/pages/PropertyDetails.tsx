import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageContainer } from "@/components/shared/PageContainer";
import { getPropertyById } from "@/services/properties";
import { useState } from "react";

const typeLabels: Record<string, string> = {
  room: "Room",
  pg: "PG / Co-living",
  flat: "Flat",
  house: "House",
};

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const property = id ? getPropertyById(id) : undefined;
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());

  if (!property) {
    return (
      <section className="py-16">
        <PageContainer>
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-foreground">Property not found</h1>
            <p className="mt-2 text-muted-foreground">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/explore" className="mt-6 inline-block">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Explore
              </Button>
            </Link>
          </div>
        </PageContainer>
      </section>
    );
  }

  function handleImgError(index: number) {
    setImgErrors((prev) => new Set(prev).add(index));
  }

  return (
    <section className="py-8 sm:py-12">
      <PageContainer>
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explore
        </Link>

        <div className="grid gap-4 sm:grid-cols-2 mb-8">
          {property.images.map((src, i) =>
            !imgErrors.has(i) ? (
              <div
                key={src}
                className={`overflow-hidden rounded-xl bg-muted ${
                  i === 0 && property.images.length > 1 ? "sm:row-span-2" : ""
                }`}
              >
                <img
                  src={src}
                  alt={`${property.title} — image ${i + 1}`}
                  className="h-full w-full object-cover aspect-[16/10]"
                  loading={i === 0 ? "eager" : "lazy"}
                  onError={() => handleImgError(i)}
                />
              </div>
            ) : (
              <div
                key={src}
                className="flex items-center justify-center rounded-xl bg-muted aspect-[16/10]"
              >
                <BedDouble className="h-12 w-12 text-muted-foreground/40" />
              </div>
            )
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="accent">{typeLabels[property.type] ?? property.type}</Badge>
                <Badge variant="secondary" className="capitalize">
                  {property.furnishing}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                {property.title}
              </h1>
              <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>
                  {property.location}, {property.city}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <BedDouble className="h-5 w-5 text-primary" />
                <span>
                  {property.bedrooms} {property.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-primary" />
                <span>
                  {property.bathrooms} {property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize className="h-5 w-5 text-primary" />
                <span>
                  {property.area} {property.areaUnit}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Available from {property.availableFrom}</span>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">About this property</h2>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">Amenities</h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-3xl font-bold text-primary">
                    ₹{property.price.toLocaleString("en-IN")}
                    <span className="text-base font-normal text-muted-foreground">
                      {property.priceUnit}
                    </span>
                  </p>
                </div>
                <hr className="border-border" />
                <Button className="w-full" size="lg" type="button">
                  Contact Owner
                </Button>
                <Button variant="outline" className="w-full" size="lg" type="button">
                  Schedule a Visit
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Contact and scheduling features are coming soon.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

