export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  price: number;
  priceUnit: string;
  location: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  description: string;
  amenities: string[];
  images: string[];
  featured: boolean;
  availableFrom: string;
  furnishing: "furnished" | "semi-furnished" | "unfurnished";
}

export type PropertyType = "room" | "pg" | "flat" | "house";

export interface PropertyTypeOption {
  value: PropertyType;
  label: string;
  icon: string;
}

export interface SearchFilters {
  location: string;
  type: PropertyType | "";
  minBudget: string;
  maxBudget: string;
}

