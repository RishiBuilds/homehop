import { Link } from "react-router-dom";
import { X, ArrowRight, BedDouble, Bath, Maximize, Train, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useComparison } from "@/hooks/useComparison";
import { getPropertyById } from "@/data/mock-properties";
import { formatCurrency, computeUpfrontCost } from "@/lib/utils";
import { PROPERTY_TYPE_LABELS, AVAILABILITY_LABELS } from "@/types";

interface ComparisonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ComparisonDrawer({ isOpen, onClose }: ComparisonDrawerProps) {
  const { comparisonList, toggleComparison, clearComparison } = useComparison();

  if (!isOpen) return null;

  const properties = comparisonList
    .map((id) => getPropertyById(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-2 sm:p-4">
      <div className="relative w-full max-w-5xl rounded-2xl border bg-card p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b">
          <div>
            <h2 className="text-lg font-bold text-foreground">Mumbai Rental Comparison</h2>
            <p className="text-xs text-muted-foreground">
              Compare upfront costs, security deposits, and station proximity side by side ({properties.length}/3)
            </p>
          </div>
          <div className="flex items-center gap-2">
            {properties.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearComparison} className="text-xs text-muted-foreground">
                Clear All
              </Button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
              aria-label="Close comparison"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {properties.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-muted-foreground">No properties added to comparison.</p>
            <p className="text-xs text-muted-foreground mt-1">
              Click the "Compare" button on any listing card to compare up to 3 homes.
            </p>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 min-w-[650px]">
              {properties.map((p) => {
                const upfront = computeUpfrontCost(p.rent, p.deposit, p.brokerage);
                return (
                  <div key={p.id} className="rounded-xl border p-4 bg-muted/20 relative flex flex-col justify-between">
                    <button
                      type="button"
                      onClick={() => toggleComparison(p.id)}
                      className="absolute top-2 right-2 p-1 rounded-full text-muted-foreground hover:text-destructive hover:bg-muted"
                      title="Remove from comparison"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-muted">
                          {p.referenceId}
                        </span>
                        <Badge variant="accent" className="text-[10px]">
                          {PROPERTY_TYPE_LABELS[p.type]}
                        </Badge>
                      </div>

                      <h3 className="font-semibold text-sm line-clamp-1">{p.title}</h3>

                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 text-primary shrink-0" />
                        <span className="truncate">{p.locality}</span>
                      </div>

                      <div className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Train className="h-3 w-3 text-primary shrink-0" />
                        <span className="truncate">Near {p.nearbyStation}</span>
                      </div>

                      <div className="my-3 p-3 rounded-lg bg-card border space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Monthly Rent:</span>
                          <strong className="text-foreground">{formatCurrency(p.rent)}</strong>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Deposit:</span>
                          <span>{formatCurrency(p.deposit)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Brokerage:</span>
                          <span>{p.brokerage > 0 ? formatCurrency(p.brokerage) : "Zero"}</span>
                        </div>
                        <div className="pt-1.5 border-t flex justify-between text-xs">
                          <span className="font-semibold text-primary">Total Upfront:</span>
                          <strong className="font-extrabold text-primary">{formatCurrency(upfront)}</strong>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground py-2 border-y">
                        <span className="flex items-center gap-1">
                          <BedDouble className="h-3 w-3" />
                          {p.bedrooms} {p.bedrooms === 1 ? "Bed" : "Beds"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="h-3 w-3" />
                          {p.bathrooms} Bath
                        </span>
                        <span className="flex items-center gap-1">
                          <Maximize className="h-3 w-3" />
                          {p.area} {p.areaUnit}
                        </span>
                        <span className="capitalize">{p.furnishing}</span>
                      </div>

                      <div className="mt-3 text-[11px] text-muted-foreground">
                        Status: <span className="font-medium text-foreground">{AVAILABILITY_LABELS[p.availability]}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t">
                      <Link to={`/property/${p.id}`} onClick={onClose} className="block">
                        <Button size="sm" className="w-full gap-1 text-xs">
                          <span>View Listing</span>
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
