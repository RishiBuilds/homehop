import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { PropertyType } from "@/types";

interface SearchBarProps {
  initialLocation?: string;
  initialType?: string;
  initialMaxBudget?: string;
  compact?: boolean;
  onSearch?: (params: { location: string; type: string; maxBudget: string }) => void;
}

const propertyTypeOptions = [
  { value: "", label: "All Types" },
  { value: "room", label: "Room" },
  { value: "pg", label: "PG / Co-living" },
  { value: "flat", label: "Flat" },
  { value: "house", label: "House" },
];

const budgetOptions = [
  { value: "", label: "Any Budget" },
  { value: "10000", label: "Up to ₹10,000" },
  { value: "20000", label: "Up to ₹20,000" },
  { value: "30000", label: "Up to ₹30,000" },
  { value: "50000", label: "Up to ₹50,000" },
  { value: "100000", label: "Up to ₹1,00,000" },
];

export function SearchBar({
  initialLocation = "",
  initialType = "",
  initialMaxBudget = "",
  compact = false,
  onSearch,
}: SearchBarProps) {
  const navigate = useNavigate();
  const [location, setLocation] = useState(initialLocation);
  const [type, setType] = useState<PropertyType | "">(
    (initialType as PropertyType | "") || ""
  );
  const [maxBudget, setMaxBudget] = useState(initialMaxBudget);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (maxBudget) params.set("maxBudget", maxBudget);

    if (onSearch) {
      onSearch({ location, type, maxBudget });
    } else {
      navigate(`/explore?${params.toString()}`);
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className={`flex flex-col gap-3 ${
        compact ? "sm:flex-row sm:items-end" : "md:flex-row md:items-end"
      }`}
    >
      <div className="flex-1 min-w-0">
        <label htmlFor="search-location" className="sr-only">
          Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search-location"
            type="text"
            placeholder="Search by city, area, or landmark..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className={compact ? "sm:w-40" : "md:w-48"}>
        <label htmlFor="search-type" className="sr-only">
          Property Type
        </label>
        <Select
          id="search-type"
          options={propertyTypeOptions}
          value={type}
          onChange={(e) => setType(e.target.value as PropertyType | "")}
        />
      </div>

      <div className={compact ? "sm:w-40" : "md:w-48"}>
        <label htmlFor="search-budget" className="sr-only">
          Budget
        </label>
        <Select
          id="search-budget"
          options={budgetOptions}
          value={maxBudget}
          onChange={(e) => setMaxBudget(e.target.value)}
        />
      </div>

      <Button type="submit" size={compact ? "default" : "lg"} className="gap-2">
        <Search className="h-4 w-4" />
        <span>Search</span>
      </Button>
    </form>
  );
}
