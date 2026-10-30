import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { PropertyType } from "@/types";

interface SearchBarProps {
  initialLocality?: string;
  initialType?: string;
  initialMaxBudget?: string;
  compact?: boolean;
  onSearch?: (params: { locality: string; type: string; maxBudget: string }) => void;
}

const propertyTypeOptions = [
  { value: "", label: "All Property Types" },
  { value: "1rk", label: "1 RK" },
  { value: "1bhk", label: "1 BHK" },
  { value: "2bhk", label: "2 BHK" },
  { value: "3bhk", label: "3 BHK" },
  { value: "4bhk", label: "4 BHK+" },
  { value: "pg", label: "PG / Co-living" },
  { value: "room", label: "Private Room" },
];

const budgetOptions = [
  { value: "", label: "Any Budget" },
  { value: "15000", label: "Up to ₹15,000" },
  { value: "25000", label: "Up to ₹25,000" },
  { value: "40000", label: "Up to ₹40,000" },
  { value: "60000", label: "Up to ₹60,000" },
  { value: "100000", label: "Up to ₹1,00,000" },
  { value: "200000", label: "Up to ₹2,00,000" },
];

export function SearchBar({
  initialLocality = "",
  initialType = "",
  initialMaxBudget = "",
  compact = false,
  onSearch,
}: SearchBarProps) {
  const navigate = useNavigate();
  const [locality, setLocality] = useState(initialLocality);
  const [type, setType] = useState<PropertyType | "">((initialType as PropertyType | "") || "");
  const [maxBudget, setMaxBudget] = useState(initialMaxBudget);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (locality.trim()) params.set("locality", locality.trim());
    if (type) params.set("type", type);
    if (maxBudget) params.set("maxBudget", maxBudget);

    if (onSearch) {
      onSearch({ locality: locality.trim(), type, maxBudget });
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
        <label htmlFor="search-locality" className="block text-xs font-medium text-foreground mb-1 sm:hidden">
          Locality or Station
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search-locality"
            type="text"
            placeholder="Search Mumbai locality (e.g. Andheri, Powai, Thane)..."
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
      </div>

      <div className={compact ? "sm:w-44" : "md:w-52"}>
        <label htmlFor="search-type" className="block text-xs font-medium text-foreground mb-1 sm:hidden">
          Configuration
        </label>
        <Select
          id="search-type"
          options={propertyTypeOptions}
          value={type}
          onChange={(e) => setType(e.target.value as PropertyType | "")}
          className="h-11"
        />
      </div>

      <div className={compact ? "sm:w-44" : "md:w-48"}>
        <label htmlFor="search-budget" className="block text-xs font-medium text-foreground mb-1 sm:hidden">
          Max Budget
        </label>
        <Select
          id="search-budget"
          options={budgetOptions}
          value={maxBudget}
          onChange={(e) => setMaxBudget(e.target.value)}
          className="h-11"
        />
      </div>

      <Button type="submit" size="lg" className="h-11 gap-2 font-medium px-6">
        <Search className="h-4 w-4" />
        <span>Search</span>
      </Button>
    </form>
  );
}
