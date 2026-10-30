export type PropertyType = "1rk" | "1bhk" | "2bhk" | "3bhk" | "4bhk" | "pg" | "room";

export type FurnishingStatus = "furnished" | "semi-furnished" | "unfurnished";

export type AvailabilityStatus = "available" | "rented" | "upcoming";

export interface Property {
  id: string;
  referenceId: string;
  title: string;
  type: PropertyType;
  rent: number;
  deposit: number;
  brokerage: number;
  locality: string;
  nearbyStation: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  description: string;
  amenities: string[];
  images: string[];
  featured: boolean;
  furnishing: FurnishingStatus;
  availability: AvailabilityStatus;
  availableFrom: string;
  lastConfirmedDate: string;
  verified: false;
  postedDate: string;
  lat: number;
  lng: number;
}

export interface SearchFilters {
  locality: string;
  nearbyStation: string;
  type: PropertyType | "";
  minBudget: string;
  maxBudget: string;
  bedrooms: string;
  furnishing: FurnishingStatus | "";
  amenities: string[];
  sort: string;
}

export interface MarketInsights {
  count: number;
  totalCount: number;
  avgRent: number;
  minRent: number;
  maxRent: number;
  inBudgetCount: number;
  budgetPercentile: number;
}

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  "1rk": "1 RK",
  "1bhk": "1 BHK",
  "2bhk": "2 BHK",
  "3bhk": "3 BHK",
  "4bhk": "4 BHK+",
  pg: "PG",
  room: "Room",
};

export const FURNISHING_LABELS: Record<FurnishingStatus, string> = {
  furnished: "Furnished",
  "semi-furnished": "Semi-Furnished",
  unfurnished: "Unfurnished",
};

export const AVAILABILITY_LABELS: Record<AvailabilityStatus, string> = {
  available: "Available",
  rented: "Rented Out",
  upcoming: "Available Soon",
};

export const MUMBAI_LOCALITIES = [
  "Andheri East",
  "Andheri West",
  "Powai",
  "Thane West",
  "Borivali West",
  "Goregaon East",
  "Malad West",
  "Bandra West",
  "Dadar East",
  "Lower Parel",
  "Vikhroli East",
  "Ghatkopar East",
  "Mulund West",
  "Kandivali East",
  "Chembur",
] as const;

export const MUMBAI_STATIONS = [
  "Andheri",
  "Powai (Kanjurmarg)",
  "Thane",
  "Borivali",
  "Goregaon",
  "Malad",
  "Bandra",
  "Dadar",
  "Lower Parel",
  "Vikhroli",
  "Ghatkopar",
  "Mulund",
  "Kandivali",
  "Chembur (Harbour)",
] as const;

export const ALL_AMENITIES = [
  "Wi-Fi",
  "AC",
  "Parking",
  "Lift",
  "Power Backup",
  "Water Supply",
  "Security",
  "Gym",
  "Swimming Pool",
  "Garden",
  "Washing Machine",
  "Geyser",
  "Gas Pipeline",
  "CCTV",
  "Intercom",
  "Clubhouse",
  "Children's Play Area",
  "Modular Kitchen",
  "Meals Included",
] as const;
