import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
  RotateCcw,
  Train,
} from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { RentAffordabilityCalculator } from "@/components/shared/RentAffordabilityCalculator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { filterProperties } from "@/data/mock-properties";
import {
  MUMBAI_LOCALITIES,
  MUMBAI_STATIONS,
  ALL_AMENITIES,
  PROPERTY_TYPE_LABELS,
  type PropertyType,
  type FurnishingStatus,
} from "@/types";

const typeFilterOptions = [
  { value: "", label: "All Configurations" },
  { value: "1rk", label: "1 RK" },
  { value: "1bhk", label: "1 BHK" },
  { value: "2bhk", label: "2 BHK" },
  { value: "3bhk", label: "3 BHK" },
  { value: "4bhk", label: "4 BHK+" },
  { value: "pg", label: "PG / Co-Living" },
  { value: "room", label: "Private Room" },
];

const sortOptions = [
  { value: "newest", label: "Newest Listings" },
  { value: "rent-asc", label: "Rent: Low to High" },
  { value: "rent-desc", label: "Rent: High to Low" },
  { value: "area-desc", label: "Largest Area" },
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
  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        document.getElementById("filter-locality")?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const locality = searchParams.get("locality") ?? "";
  const nearbyStation = searchParams.get("station") ?? "";
  const type = (searchParams.get("type") ?? "") as PropertyType | "";
  const minBudget = searchParams.get("minBudget") ?? "";
  const maxBudget = searchParams.get("maxBudget") ?? "";
  const bedrooms = searchParams.get("bedrooms") ?? "";
  const furnishing = (searchParams.get("furnishing") ?? "") as FurnishingStatus | "";
  const sort = searchParams.get("sort") ?? "newest";
  const amenitiesParam = searchParams.get("amenities") ?? "";
  const selectedAmenities = useMemo(() => {
    return amenitiesParam ? amenitiesParam.split(",").filter(Boolean) : [];
  }, [amenitiesParam]);

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

  function handleLocalityChange(val: string) {
    updateQuery({ locality: val });
  }

  function handleStationChange(val: string) {
    updateQuery({ station: val });
  }

  function handleTypeChange(val: string) {
    updateQuery({ type: val });
  }

  function handleFurnishingChange(val: string) {
    updateQuery({ furnishing: val });
  }

  function handleSortChange(val: string) {
    updateQuery({ sort: val });
  }

  function handleMinBudgetChange(val: string) {
    updateQuery({ minBudget: val });
  }

  function handleMaxBudgetChange(val: string) {
    updateQuery({ maxBudget: val });
  }

  function handleBedroomsChange(val: string) {
    updateQuery({ bedrooms: val });
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

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (locality) count++;
    if (nearbyStation) count++;
    if (type) count++;
    if (minBudget) count++;
    if (maxBudget) count++;
    if (bedrooms) count++;
    if (furnishing) count++;
    if (selectedAmenities.length > 0) count += selectedAmenities.length;
    return count;
  }, [locality, nearbyStation, type, minBudget, maxBudget, bedrooms, furnishing, selectedAmenities]);

  const properties = useMemo(() => {
    return filterProperties({
      locality: locality || undefined,
      nearbyStation: nearbyStation || undefined,
      type: type || undefined,
      minBudget: minBudget ? Number(minBudget) : undefined,
      maxBudget: maxBudget ? Number(maxBudget) : undefined,
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
      furnishing: furnishing || undefined,
      amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
      sort,
    });
  }, [locality, nearbyStation, type, minBudget, maxBudget, bedrooms, furnishing, selectedAmenities, sort]);

  return (
    <section className="py-8 sm:py-12 bg-background min-h-screen">
      <PageContainer>
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Marketplace</span>
              <span className="text-xs text-muted-foreground">• Mumbai Suburban & City</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              Explore Mumbai Rentals
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Verified details, security deposits, and brokerage terms for flats, rooms, and PGs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border bg-card p-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded text-sm transition-colors ${
                  viewMode === "grid" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded text-sm transition-colors ${
                  viewMode === "list" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <div className="w-44">
              <Select
                options={sortOptions}
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="h-9 text-xs"
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              className="lg:hidden gap-1.5"
              onClick={() => setShowFiltersDrawer(true)}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="ml-1 rounded-full bg-primary text-primary-foreground px-1.5 py-0.2 text-[10px]">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside
            className={`fixed inset-0 z-50 bg-background/95 backdrop-blur p-6 overflow-y-auto lg:static lg:z-auto lg:p-0 lg:overflow-visible lg:block ${
              showFiltersDrawer ? "block" : "hidden"
            }`}
          >
            <div className="flex items-center justify-between lg:hidden mb-6 pb-4 border-b">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                <h2 className="font-semibold text-lg text-foreground">Filter Properties</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowFiltersDrawer(false)}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 rounded-2xl border bg-card p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b">
                <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
                  Filter Listings
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
                  {MUMBAI_LOCALITIES.slice(0, 5).map((loc) => (
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
                <label htmlFor="filter-station" className="block text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1">
                  <Train className="h-3.5 w-3.5 text-primary" />
                  Nearby Railway Station
                </label>
                <select
                  id="filter-station"
                  value={nearbyStation}
                  onChange={(e) => handleStationChange(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Any Station</option>
                  {MUMBAI_STATIONS.map((station) => (
                    <option key={station} value={station}>
                      {station}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="filter-type" className="block text-xs font-semibold text-foreground mb-1.5">
                  Property Configuration
                </label>
                <Select
                  id="filter-type"
                  options={typeFilterOptions}
                  value={type}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>

              <div>
                <span className="block text-xs font-semibold text-foreground mb-1.5">
                  Monthly Rent Range (₹)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min ₹"
                    value={minBudget}
                    onChange={(e) => handleMinBudgetChange(e.target.value)}
                    className="h-9 text-xs"
                  />
                  <Input
                    type="number"
                    placeholder="Max ₹"
                    value={maxBudget}
                    onChange={(e) => handleMaxBudgetChange(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div>
                <span className="block text-xs font-semibold text-foreground mb-1.5">Bedrooms</span>
                <div className="grid grid-cols-4 gap-1.5">
                  {["1", "2", "3", "4"].map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => handleBedroomsChange(bedrooms === b ? "" : b)}
                      className={`h-8 rounded-md text-xs font-medium border transition-colors ${
                        bedrooms === b
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-foreground hover:bg-muted"
                      }`}
                    >
                      {b} {b === "4" ? "4+" : "BHK"}
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
                  {ALL_AMENITIES.slice(0, 10).map((amenity) => {
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
                          className="rounded border-input text-primary focus:ring-primary h-3.5 w-3.5"
                        />
                        <span>{amenity}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 lg:hidden">
                <Button className="w-full" onClick={() => setShowFiltersDrawer(false)}>
                  Apply Filters ({properties.length} Results)
                </Button>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            {activeFiltersCount > 0 && (
              <div className="mb-4 flex flex-wrap items-center gap-2 p-3 rounded-xl border bg-muted/30">
                <span className="text-xs text-muted-foreground">Active Filters:</span>
                {locality && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    Locality: {locality}
                    <button type="button" onClick={() => handleLocalityChange("")} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {nearbyStation && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    Station: {nearbyStation}
                    <button type="button" onClick={() => handleStationChange("")} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {type && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    Type: {PROPERTY_TYPE_LABELS[type]}
                    <button type="button" onClick={() => handleTypeChange("")} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {(minBudget || maxBudget) && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    Budget: ₹{minBudget || "0"} – ₹{maxBudget || "Any"}
                    <button
                      type="button"
                      onClick={() => {
                        handleMinBudgetChange("");
                        handleMaxBudgetChange("");
                      }}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {bedrooms && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    {bedrooms} BHK
                    <button type="button" onClick={() => handleBedroomsChange("")} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {furnishing && (
                  <Badge variant="secondary" className="gap-1 text-xs capitalize">
                    {furnishing}
                    <button type="button" onClick={() => handleFurnishingChange("")} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedAmenities.map((a) => (
                  <Badge key={a} variant="secondary" className="gap-1 text-xs">
                    {a}
                    <button type="button" onClick={() => toggleAmenity(a)} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs text-primary font-medium hover:underline ml-auto"
                >
                  Clear All
                </button>
              </div>
            )}

            <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
              <p>
                Showing <strong className="text-foreground">{properties.length}</strong> rental{" "}
                {properties.length === 1 ? "property" : "properties"} across Mumbai
              </p>
              <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Sample mock listings
              </span>
            </div>

            {properties.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                    : "flex flex-col gap-4"
                }
              >
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No rentals match your criteria"
                description="Try loosening your budget filters, switching to another local station, or viewing all properties across Mumbai."
                actionLabel="Clear all search filters"
                onAction={clearAllFilters}
              />
            )}

            <div className="mt-12">
              <RentAffordabilityCalculator />
            </div>
          </main>
        </div>
      </PageContainer>
    </section>
  );
}
