import { useSearchParams } from "react-router-dom";
import { PageContainer } from "@/components/shared/PageContainer";
import { SearchBar } from "@/components/shared/SearchBar";
import { PropertyTypeFilter } from "@/components/shared/PropertyTypeFilter";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { filterProperties } from "@/services/properties";
import type { PropertyType } from "@/types";

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();

  const location = searchParams.get("location") ?? "";
  const type = (searchParams.get("type") ?? "") as PropertyType | "";
  const maxBudget = searchParams.get("maxBudget") ?? "";

  const filteredProperties = filterProperties({
    location: location || undefined,
    type: type || undefined,
    maxBudget: maxBudget ? Number(maxBudget) : undefined,
  });

  function handleSearch(params: { location: string; type: string; maxBudget: string }) {
    const next = new URLSearchParams();
    if (params.location) next.set("location", params.location);
    if (params.type) next.set("type", params.type);
    if (params.maxBudget) next.set("maxBudget", params.maxBudget);
    setSearchParams(next);
  }

  function handleTypeChange(newType: PropertyType | "") {
    const next = new URLSearchParams(searchParams);
    if (newType) {
      next.set("type", newType);
    } else {
      next.delete("type");
    }
    setSearchParams(next);
  }

  function clearFilters() {
    setSearchParams(new URLSearchParams());
  }

  const hasFilters = location || type || maxBudget;

  return (
    <section className="py-8 sm:py-12">
      <PageContainer>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Explore Properties
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse verified rental listings across Bangalore. Use filters to narrow down your search.
          </p>
        </div>

        <div className="mb-6 rounded-xl border bg-card p-4 shadow-sm">
          <SearchBar
            initialLocation={location}
            initialType={type}
            initialMaxBudget={maxBudget}
            compact
            onSearch={handleSearch}
          />
        </div>

        <div className="mb-8">
          <PropertyTypeFilter selected={type} onChange={handleTypeChange} />
        </div>

        {filteredProperties.length > 0 ? (
          <>
            <p className="mb-4 text-sm text-muted-foreground">
              Showing {filteredProperties.length}{" "}
              {filteredProperties.length === 1 ? "property" : "properties"}
              {hasFilters ? " matching your filters" : ""}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            title="No properties found"
            description="We couldn't find any properties matching your search. Try adjusting your filters or browse all listings."
            actionLabel="Clear all filters"
            onAction={clearFilters}
          />
        )}
      </PageContainer>
    </section>
  );
}

