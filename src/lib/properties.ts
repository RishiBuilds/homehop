import { filterProperties, getAllProperties, getPropertyById } from "@/data/mock-properties";
import type { Property, PropertyType, FurnishingStatus, MarketInsights } from "@/types";

export interface SearchParams {
  locality?: string;
  station?: string;
  type?: PropertyType | "";
  maxBudget?: number;
  minBudget?: number;
  bedrooms?: string;
  furnishing?: FurnishingStatus | "";
  amenities?: string[];
  sort?: string;
}

export function searchProperties(params: SearchParams): Property[] {
  return filterProperties({
    locality: params.locality,
    nearbyStation: params.station,
    type: params.type,
    minBudget: params.minBudget,
    maxBudget: params.maxBudget,
    bedrooms: params.bedrooms ? Number(params.bedrooms) : undefined,
    furnishing: params.furnishing,
    amenities: params.amenities,
    sort: params.sort,
  });
}

export function getProperty(id: string): Property | undefined {
  return getPropertyById(id);
}

export function getInsights(results: Property[], maxBudget?: number): MarketInsights {
  const all = getAllProperties();
  const totalCount = all.length;
  const count = results.length;

  if (count === 0) {
    return {
      count: 0,
      totalCount,
      avgRent: 0,
      minRent: 0,
      maxRent: 0,
      inBudgetCount: 0,
      budgetPercentile: 0,
    };
  }

  const rents = results.map((p) => p.rent);
  const avgRent = Math.round(rents.reduce((a, b) => a + b, 0) / rents.length);
  const minRent = Math.min(...rents);
  const maxRent = Math.max(...rents);

  const inBudgetCount = maxBudget
    ? results.filter((p) => p.rent <= maxBudget).length
    : count;

  const budgetPercentile = maxBudget
    ? Math.round((inBudgetCount / count) * 100)
    : 100;

  return {
    count,
    totalCount,
    avgRent,
    minRent,
    maxRent,
    inBudgetCount,
    budgetPercentile,
  };
}

