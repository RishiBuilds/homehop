import { BedDouble, Building2, Home, Hotel } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PropertyType } from "@/types";

interface PropertyTypeFilterProps {
  selected: PropertyType | "";
  onChange: (type: PropertyType | "") => void;
}

const propertyTypes = [
  { value: "" as const, label: "All", icon: Building2 },
  { value: "room" as PropertyType, label: "Rooms", icon: BedDouble },
  { value: "pg" as PropertyType, label: "PG / Co-living", icon: Hotel },
  { value: "flat" as PropertyType, label: "Flats", icon: Building2 },
  { value: "house" as PropertyType, label: "Houses", icon: Home },
];

export function PropertyTypeFilter({ selected, onChange }: PropertyTypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Property type filter">
      {propertyTypes.map(({ value, label, icon: Icon }) => (
        <button
          key={value || "all"}
          type="button"
          onClick={() => onChange(value)}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer",
            selected === value
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground"
          )}
          aria-pressed={selected === value}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
