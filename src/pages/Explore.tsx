import { useState, useMemo, useEffect, useCallback, lazy, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import {
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
  RotateCcw,
  Map as MapIcon,
} from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { MarketInsightsPanel } from "@/components/shared/MarketInsightsPanel";
import { BudgetSlider } from "@/components/shared/BudgetSlider";
import { SkeletonCard } from "@/components/shared/SkeletonCard";
import { ComparisonDrawer } from "@/components/shared/ComparisonDrawer";
import { useComparison } from "@/hooks/useComparison";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { searchProperties, getInsights } from "@/lib/properties";
import {
  MUMBAI_LOCALITIES,
  MUMBAI_STATIONS,
  ALL_AMENITIES,
  PROPERTY_TYPE_LABELS,
  type PropertyType,
  type FurnishingStatus,
} from "@/types";

const PropertyMap = lazy(() =>
  import("@/components/shared/PropertyMap").then((m) => ({ default: m.PropertyMap }))
);

const sortOptions = [
  { value: "newest", label: "Newest Listings" },
  { value: "rent-asc", label: "Rent: Low to High" },
  { value: "rent-desc", label: "Rent: High to Low" },
  { value: "area-desc", label: "Largest Area" },
  { value: "recently-confirmed", label: "Recently Confirmed" },
];

const furnishingOptions = [
  { value: "", label: "Any Furnishing" },
  { value: "furnished", label: "Fully Furnished" },
  { value: "semi-furnished", label: "Semi-Furnished" },
  { value: "unfurnished", label: "Unfurnished" },
];

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileTab, setMobileTab] = useState<"list" | "map">("list");
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [activePropertyId, setActivePropertyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { comparisonCount, clearComparison } = useComparison();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        document.getElementById("filter-locality")?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  const locality = searchParams.get("locality") ?? "";
  const nearbyStation = searchParams.get("station") ?? "";
  const type = (searchParams.get("type") ?? "") as PropertyType | "";
  const maxBudgetParam = searchParams.get("maxBudget") ?? "";
  const minBudgetParam = searchParams.get("minBudget") ?? "";
  const bedrooms = searchParams.get("bedrooms") ?? "";
  const furnishing = (searchParams.get("furnishing") ?? "") as FurnishingStatus | "";
  const sort = searchParams.get("sort") ?? "newest";
  const amenitiesParam = searchParams.get("amenities") ?? "";

  const maxBudgetNum = maxBudgetParam ? Number(maxBudgetParam) : 200000;
  const selectedAmenities = useMemo(
    () => (amenitiesParam ? amenitiesParam.split(",").filter(Boolean) : []),
    [amenitiesParam]
  );

  function updateQuery(updates: Record<string, string | null>) {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, val]) => {
      if (!val) {
        next.delete(key);
      } else {
        next.set(key, val);
      }
    });
    setSearchParams(next);
  }

  const handleBudgetChange = useCallback(
    (val: number) => {
      updateQuery({ maxBudget: val < 200000 ? String(val) : null });
    },
    [searchParams]
  );

  function handleLocalityChange(val: string) {
    updateQuery({ locality: val });
  }
  function handleStationChange(val: string) {
    updateQuery({ station: val });
  }
  function handleTypeChange(val: string) {
    updateQuery({ type: val });
  }
  function handleBedroomsChange(val: string) {
    updateQuery({ bedrooms: val });
  }
  function handleFurnishingChange(val: string) {
    updateQuery({ furnishing: val });
  }
  function toggleAmenity(amenity: string) {
    const next = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity];
    updateQuery({ amenities: next.length > 0 ? next.join(",") : null });
  }
  function clearAllFilters() {
    setSearchParams(new URLSearchParams());
  }

  const properties = useMemo(() => {
    return searchProperties({
      locality,
      station: nearbyStation,
      type,
      minBudget: minBudgetParam ? Number(minBudgetParam) : undefined,
      maxBudget: maxBudgetParam ? Number(maxBudgetParam) : undefined,
      bedrooms,
      furnishing,
      amenities: selectedAmenities,
      sort,
    });
  }, [locality, nearbyStation, type, minBudgetParam, maxBudgetParam, bedrooms, furnishing, selectedAmenities, sort]);

  const insights = useMemo(
    () => getInsights(properties, maxBudgetParam ? Number(maxBudgetParam) : undefined),
    [properties, maxBudgetParam]
  );

  const activeFiltersCount = [locality, nearbyStation, type, maxBudgetParam, minBudgetParam, bedrooms, furnishing]
    .filter(Boolean).length + selectedAmenities.length;

  const handleMapMarkerClick = useCallback((id: string) => {
    setActivePropertyId(id);
    const el = document.getElementById(`property-card-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, []);

  const FiltersPanel = (
    <div className="space-y-5 rounded-2xl border bg-card p-5 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b">
        <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
          Filters
        </span>
        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs text-primary font-medium hover:underline flex items-center gap-1"
          >
            <RotateCcw className="h-3 w-3" />
            Reset ({activeFiltersCount})
          </button>
        )}
      </div>

      <div>
        <label htmlFor="filter-locality" className="block text-xs font-semibold text-foreground mb-1.5">
          Locality
        </label>
        <Input
          id="filter-locality"
          type="text"
          placeholder="e.g. Andheri East, Powai..."
          value={locality}
          onChange={(e) => handleLocalityChange(e.target.value)}
          className="h-9 text-xs"
        />
        <div className="mt-2 flex flex-wrap gap-1">
          {MUMBAI_LOCALITIES.slice(0, 6).map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => handleLocalityChange(locality === loc ? "" : loc)}
              className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
                locality === loc
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="filter-station" className="block text-xs font-semibold text-foreground mb-1.5">
          Nearby Station
        </label>
        <Select
          id="filter-station"
          options={[{ value: "", label: "Any Station" }, ...MUMBAI_STATIONS.map((s) => ({ value: s, label: s }))]}
          value={nearbyStation}
          onChange={(e) => handleStationChange(e.target.value)}
          className="h-9 text-xs"
        />
      </div>

      <BudgetSlider
        value={maxBudgetNum}
        min={5000}
        max={200000}
        step={1000}
        onChange={handleBudgetChange}
        label="Max Budget"
      />

      <div>
        <label className="block text-xs font-semibold text-foreground mb-1.5">Property Type</label>
        <div className="grid grid-cols-3 gap-1">
          {Object.entries(PROPERTY_TYPE_LABELS).map(([val, label]) => (
            <button
              key={val}
              type="button"
              onClick={() => handleTypeChange(type === val ? "" : val)}
              className={`py-1 rounded-md text-[10px] font-medium border transition-colors ${
                type === val
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/40 text-muted-foreground hover:text-foreground border-border"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="filter-bedrooms" className="block text-xs font-semibold text-foreground mb-1.5">
          Bedrooms
        </label>
        <div className="grid grid-cols-4 gap-1">
          {["", "1", "2", "3"].map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => handleBedroomsChange(bedrooms === b ? "" : b)}
              className={`py-1 rounded-md text-[10px] font-medium border transition-colors ${
                bedrooms === b
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/40 text-muted-foreground hover:text-foreground border-border"
              }`}
            >
              {b === "" ? "Any" : b === "3" ? "3+" : `${b}`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="filter-furnishing" className="block text-xs font-semibold text-foreground mb-1.5">
          Furnishing
        </label>
        <Select
          id="filter-furnishing"
          options={furnishingOptions}
          value={furnishing}
          onChange={(e) => handleFurnishingChange(e.target.value)}
          className="h-9 text-xs"
        />
      </div>

      <div>
        <span className="block text-xs font-semibold text-foreground mb-2">Amenities</span>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {ALL_AMENITIES.slice(0, 12).map((amenity) => {
            const isChecked = selectedAmenities.includes(amenity);
            return (
              <label
                key={amenity}
                className="flex items-center gap-2 text-xs text-foreground cursor-pointer hover:text-primary transition-colors select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleAmenity(amenity)}
                  className="rounded border-input h-3.5 w-3.5"
                />
                <span>{amenity}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="filter-sort" className="block text-xs font-semibold text-foreground mb-1.5">
          Sort By
        </label>
        <Select
          id="filter-sort"
          options={sortOptions}
          value={sort}
          onChange={(e) => updateQuery({ sort: e.target.value })}
          className="h-9 text-xs"
        />
      </div>

      <div className="lg:hidden pt-1">
        <Button className="w-full" onClick={() => setShowFiltersDrawer(false)}>
          View {properties.length} Result{properties.length !== 1 ? "s" : ""}
        </Button>
      </div>
    </div>
  );

  return (
    <section className="bg-background min-h-screen">
      <div className="border-b bg-card/80 backdrop-blur sticky top-0 z-20">
        <PageContainer>
          <div className="py-3 flex items-center gap-3 flex-wrap">
            <h1 className="font-display text-xl text-foreground">Explore Mumbai Rentals</h1>
            <Badge variant="secondary" className="text-xs bg-amber-50 border-amber-200 text-amber-700">
              Sample Listings
            </Badge>
            <span className="text-xs text-muted-foreground">
              {properties.length} result{properties.length !== 1 ? "s" : ""}
            </span>

            <div className="ml-auto flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="lg:hidden h-8 text-xs gap-1.5"
                onClick={() => setShowFiltersDrawer(true)}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[9px] flex items-center justify-center font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>

              <div className="hidden sm:flex items-center gap-1 border rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label="List view"
                >
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1 border rounded-lg p-0.5 lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileTab("list")}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${mobileTab === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                >
                  <List className="h-3 w-3" />
                  List
                </button>
                <button
                  type="button"
                  onClick={() => setMobileTab("map")}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${mobileTab === "map" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                >
                  <MapIcon className="h-3 w-3" />
                  Map
                </button>
              </div>
            </div>
          </div>
        </PageContainer>
      </div>

      {showFiltersDrawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur" onClick={() => setShowFiltersDrawer(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-background overflow-y-auto p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <span className="font-semibold text-foreground">Filter Properties</span>
              <button type="button" onClick={() => setShowFiltersDrawer(false)} aria-label="Close">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            {FiltersPanel}
          </div>
        </div>
      )}

      <div className="flex h-[calc(100vh-115px)] overflow-hidden">
        <aside className="hidden lg:flex lg:w-[340px] xl:w-[380px] shrink-0 flex-col overflow-y-auto border-r bg-background p-4 gap-3">
          <MarketInsightsPanel insights={insights} maxBudget={maxBudgetParam ? Number(maxBudgetParam) : undefined} />

          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-1.5 p-3 rounded-xl border bg-muted/20">
              {locality && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  {locality}
                  <button type="button" onClick={() => handleLocalityChange("")} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {nearbyStation && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  {nearbyStation}
                  <button type="button" onClick={() => handleStationChange("")} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {type && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  {PROPERTY_TYPE_LABELS[type as PropertyType]}
                  <button type="button" onClick={() => handleTypeChange("")} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {maxBudgetParam && Number(maxBudgetParam) < 200000 && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  ≤{maxBudgetParam && Number(maxBudgetParam) >= 1000 ? `₹${Math.round(Number(maxBudgetParam) / 1000)}k` : `₹${maxBudgetParam}`}
                  <button type="button" onClick={() => updateQuery({ maxBudget: null })} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} viewMode="list" />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 gap-3" : "flex flex-col gap-3"}>
              {properties.map((property) => (
                <div
                  key={property.id}
                  id={`property-card-${property.id}`}
                  onMouseEnter={() => setActivePropertyId(property.id)}
                  onMouseLeave={() => setActivePropertyId(null)}
                  className={`rounded-xl transition-all ${activePropertyId === property.id ? "ring-2 ring-primary ring-offset-1" : ""}`}
                >
                  <PropertyCard property={property} viewMode="list" />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title={maxBudgetParam && Number(maxBudgetParam) < 200000 ? `No homes under ₹${Math.round(Number(maxBudgetParam) / 1000)}k in this area` : "No rentals match your criteria"}
              description={
                maxBudgetParam && Number(maxBudgetParam) < 200000
                  ? "Try raising your budget or broadening your locality search."
                  : "Try adjusting your filters or searching a different area."
              }
              actionLabel="Clear all filters"
              onAction={clearAllFilters}
            />
          )}

          <div className="hidden lg:block">
            {FiltersPanel}
          </div>
        </aside>

        <div className={`flex-1 flex flex-col overflow-hidden ${mobileTab === "map" ? "flex" : "hidden lg:flex"}`}>
          <Suspense
            fallback={
              <div className="flex-1 flex items-center justify-center bg-muted/20">
                <div className="text-sm text-muted-foreground animate-pulse">Loading map...</div>
              </div>
            }
          >
            <PropertyMap
              properties={properties}
              maxBudget={maxBudgetParam ? Number(maxBudgetParam) : undefined}
              activeId={activePropertyId}
              onMarkerClick={handleMapMarkerClick}
            />
          </Suspense>
        </div>

        <div className={`flex-1 overflow-y-auto p-4 lg:hidden ${mobileTab === "list" ? "block" : "hidden"}`}>
          <MarketInsightsPanel insights={insights} maxBudget={maxBudgetParam ? Number(maxBudgetParam) : undefined} />
          {isLoading ? (
            <div className="space-y-3 mt-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} viewMode="grid" />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="mt-4">
              <EmptyState
                title="No rentals match your criteria"
                description="Try adjusting your filters or clearing the search."
                actionLabel="Clear filters"
                onAction={clearAllFilters}
              />
            </div>
          )}
        </div>
      </div>

      {comparisonCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 rounded-full border border-primary/30 bg-card/95 backdrop-blur px-5 py-2.5 shadow-xl">
          <span className="text-xs font-semibold text-foreground">
            {comparisonCount} of 3 selected
          </span>
          <Button size="sm" onClick={() => setShowCompare(true)} className="h-7 text-xs px-3">
            Compare
          </Button>
          <button
            type="button"
            onClick={clearComparison}
            className="text-xs text-muted-foreground hover:text-foreground font-medium"
          >
            Clear
          </button>
        </div>
      )}

      <ComparisonDrawer isOpen={showCompare} onClose={() => setShowCompare(false)} />
    </section>
  );
}
