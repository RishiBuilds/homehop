import { BedDouble, Building2, Home, Hotel, DoorClosed } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PropertyType } from "@/types";

interface PropertyTypeFilterProps {
  selected: PropertyType | "";
  onChange: (type: PropertyType | "") => void;
}

const propertyTypes = [
  { value: "" as const, label: "All", icon: Building2 },
  { value: "1rk" as PropertyType, label: "1 RK", icon: DoorClosed },
  { value: "1bhk" as PropertyType, label: "1 BHK", icon: Building2 },
  { value: "2bhk" as PropertyType, label: "2 BHK", icon: Building2 },
  { value: "3bhk" as PropertyType, label: "3 BHK", icon: Home },
  { value: "4bhk" as PropertyType, label: "4 BHK+", icon: Home },
  { value: "pg" as PropertyType, label: "PG", icon: Hotel },
  { value: "room" as PropertyType, label: "Room", icon: BedDouble },
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
            "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer",
            selected === value
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground"
          )}
          aria-pressed={selected === value}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}
