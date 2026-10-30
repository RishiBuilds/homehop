import type { Property, PropertyType } from "@/types";

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "1",
    referenceId: "HH-1001",
    title: "Spacious 2 BHK in Andheri East",
    type: "2bhk",
    rent: 35000,
    deposit: 70000,
    brokerage: 17500,
    locality: "Andheri East",
    nearbyStation: "Andheri",
    city: "Mumbai",
    bedrooms: 2,
    bathrooms: 2,
    area: 850,
    areaUnit: "sq ft",
    description:
      "A well-maintained 2 BHK apartment near Andheri station. Cross-ventilation, modular kitchen, and covered parking. Close to Western Express Highway. Society with 24/7 security and power backup.",
    amenities: ["Lift", "Parking", "Security", "Power Backup", "Water Supply", "Intercom", "Gas Pipeline"],
    images: [],
    featured: true,
    furnishing: "semi-furnished",
    availability: "available",
    availableFrom: "2026-11-01",
    lastConfirmedDate: "2026-10-25",
    verified: false,
    postedDate: "2026-10-20",
  },
  {
    id: "2",
    referenceId: "HH-1002",
    title: "Furnished 1 BHK in Powai",
    type: "1bhk",
    rent: 28000,
    deposit: 56000,
    brokerage: 14000,
    locality: "Powai",
    nearbyStation: "Powai (Kanjurmarg)",
    city: "Mumbai",
    bedrooms: 1,
    bathrooms: 1,
    area: 550,
    areaUnit: "sq ft",
    description:
      "Fully furnished 1 BHK in Hiranandani Gardens, Powai. Lake-facing balcony, modular kitchen with appliances, washing machine, AC in bedroom. Gated township with clubhouse and swimming pool.",
    amenities: ["AC", "Washing Machine", "Gym", "Swimming Pool", "Security", "Lift", "Parking", "Clubhouse", "Power Backup"],
    images: [],
    featured: true,
    furnishing: "furnished",
    availability: "available",
    availableFrom: "2026-11-15",
    lastConfirmedDate: "2026-10-28",
    verified: false,
    postedDate: "2026-10-22",
  },
  {
    id: "3",
    referenceId: "HH-1003",
    title: "Budget 1 RK near Thane Station",
    type: "1rk",
    rent: 8500,
    deposit: 17000,
    brokerage: 0,
    locality: "Thane West",
    nearbyStation: "Thane",
    city: "Mumbai",
    bedrooms: 1,
    bathrooms: 1,
    area: 280,
    areaUnit: "sq ft",
    description:
      "Compact 1 RK flat suitable for working professionals. 10-minute walk from Thane station. Ground floor, separate kitchen area. Water supply twice daily. No brokerage — direct owner deal.",
    amenities: ["Water Supply", "Power Backup"],
    images: [],
    featured: false,
    furnishing: "unfurnished",
    availability: "available",
    availableFrom: "2026-11-01",
    lastConfirmedDate: "2026-10-26",
    verified: false,
    postedDate: "2026-10-18",
  },
  {
    id: "4",
    referenceId: "HH-1004",
    title: "3 BHK with Garden in Borivali West",
    type: "3bhk",
    rent: 52000,
    deposit: 150000,
    brokerage: 52000,
    locality: "Borivali West",
    nearbyStation: "Borivali",
    city: "Mumbai",
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    areaUnit: "sq ft",
    description:
      "Spacious 3 BHK on the 8th floor with a large balcony overlooking the garden. Master bedroom with attached bathroom. Semi-furnished with wardrobes and modular kitchen. Walking distance to National Park.",
    amenities: ["Lift", "Parking", "Security", "Power Backup", "Water Supply", "Garden", "Children's Play Area", "Modular Kitchen", "Intercom"],
    images: [],
    featured: true,
    furnishing: "semi-furnished",
    availability: "available",
    availableFrom: "2026-12-01",
    lastConfirmedDate: "2026-10-24",
    verified: false,
    postedDate: "2026-10-15",
  },
  {
    id: "5",
    referenceId: "HH-1005",
    title: "PG for Men in Goregaon East",
    type: "pg",
    rent: 9000,
    deposit: 9000,
    brokerage: 0,
    locality: "Goregaon East",
    nearbyStation: "Goregaon",
    city: "Mumbai",
    bedrooms: 1,
    bathrooms: 1,
    area: 120,
    areaUnit: "sq ft",
    description:
      "Well-maintained PG accommodation for men near Film City. Double sharing with AC, meals included (breakfast and dinner). Weekly cleaning, Wi-Fi, and laundry service. Close to NESCO and WEH.",
    amenities: ["Meals Included", "Wi-Fi", "AC", "Washing Machine", "CCTV", "Power Backup"],
    images: [],
    featured: false,
    furnishing: "furnished",
    availability: "available",
    availableFrom: "2026-11-01",
    lastConfirmedDate: "2026-10-27",
    verified: false,
    postedDate: "2026-10-23",
  },
  {
    id: "6",
    referenceId: "HH-1006",
    title: "Sea-Facing 2 BHK in Bandra West",
    type: "2bhk",
    rent: 85000,
    deposit: 250000,
    brokerage: 85000,
    locality: "Bandra West",
    nearbyStation: "Bandra",
    city: "Mumbai",
    bedrooms: 2,
    bathrooms: 2,
    area: 1000,
    areaUnit: "sq ft",
    description:
      "Premium 2 BHK in Bandra West with unobstructed sea views from living room and master bedroom. High floor, fully furnished with imported furniture and appliances. Walking distance to Carter Road and Bandstand promenade.",
    amenities: ["AC", "Washing Machine", "Gym", "Swimming Pool", "Security", "Lift", "Parking", "Power Backup", "Intercom", "Modular Kitchen", "Geyser"],
    images: [],
    featured: true,
    furnishing: "furnished",
    availability: "available",
    availableFrom: "2026-11-10",
    lastConfirmedDate: "2026-10-29",
    verified: false,
    postedDate: "2026-10-25",
  },
  {
    id: "7",
    referenceId: "HH-1007",
    title: "1 BHK near Dadar Station",
    type: "1bhk",
    rent: 22000,
    deposit: 44000,
    brokerage: 11000,
    locality: "Dadar East",
    nearbyStation: "Dadar",
    city: "Mumbai",
    bedrooms: 1,
    bathrooms: 1,
    area: 450,
    areaUnit: "sq ft",
    description:
      "Convenient 1 BHK flat just 5 minutes from Dadar Central and Western railway stations. Recently painted, new bathroom fittings. Ground floor, ideal for senior citizens or small families. Close to Shivaji Park.",
    amenities: ["Water Supply", "Power Backup", "Security", "Geyser"],
    images: [],
    featured: false,
    furnishing: "unfurnished",
    availability: "available",
    availableFrom: "2026-11-20",
    lastConfirmedDate: "2026-10-22",
    verified: false,
    postedDate: "2026-10-16",
  },
  {
    id: "8",
    referenceId: "HH-1008",
    title: "Furnished Room in Malad West",
    type: "room",
    rent: 12000,
    deposit: 24000,
    brokerage: 0,
    locality: "Malad West",
    nearbyStation: "Malad",
    city: "Mumbai",
    bedrooms: 1,
    bathrooms: 1,
    area: 180,
    areaUnit: "sq ft",
    description:
      "Private furnished room in a shared 3 BHK flat. Includes bed, wardrobe, study table, and chair. Shared kitchen and bathroom. Flatmates are working professionals. Near Inorbit Mall and Malad station.",
    amenities: ["Wi-Fi", "Washing Machine", "Water Supply", "Power Backup", "Geyser"],
    images: [],
    featured: false,
    furnishing: "furnished",
    availability: "available",
    availableFrom: "2026-11-05",
    lastConfirmedDate: "2026-10-28",
    verified: false,
    postedDate: "2026-10-24",
  },
  {
    id: "9",
    referenceId: "HH-1009",
    title: "4 BHK Premium Flat in Lower Parel",
    type: "4bhk",
    rent: 175000,
    deposit: 500000,
    brokerage: 175000,
    locality: "Lower Parel",
    nearbyStation: "Lower Parel",
    city: "Mumbai",
    bedrooms: 4,
    bathrooms: 4,
    area: 2200,
    areaUnit: "sq ft",
    description:
      "Ultra-premium 4 BHK in a high-rise tower at Lower Parel. City skyline views, Italian marble flooring, VRV AC throughout, video door phone, and two covered parking slots. Tower amenities include infinity pool, theatre, and business centre.",
    amenities: ["AC", "Parking", "Lift", "Security", "Gym", "Swimming Pool", "Clubhouse", "Power Backup", "Intercom", "Gas Pipeline", "Modular Kitchen", "CCTV"],
    images: [],
    featured: true,
    furnishing: "furnished",
    availability: "upcoming",
    availableFrom: "2027-01-01",
    lastConfirmedDate: "2026-10-20",
    verified: false,
    postedDate: "2026-10-10",
  },
  {
    id: "10",
    referenceId: "HH-1010",
    title: "1 BHK in Vikhroli East",
    type: "1bhk",
    rent: 18000,
    deposit: 36000,
    brokerage: 9000,
    locality: "Vikhroli East",
    nearbyStation: "Vikhroli",
    city: "Mumbai",
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    areaUnit: "sq ft",
    description:
      "Airy 1 BHK near Godrej Garden Enclave. Balcony with greenery view. Close to LBS Marg and Eastern Express Highway. Well-connected to Vikhroli station (Central line). Quiet residential area.",
    amenities: ["Lift", "Security", "Power Backup", "Water Supply", "Parking"],
    images: [],
    featured: false,
    furnishing: "semi-furnished",
    availability: "available",
    availableFrom: "2026-11-10",
    lastConfirmedDate: "2026-10-27",
    verified: false,
    postedDate: "2026-10-21",
  },
  {
    id: "11",
    referenceId: "HH-1011",
    title: "PG for Women in Andheri West",
    type: "pg",
    rent: 11000,
    deposit: 11000,
    brokerage: 0,
    locality: "Andheri West",
    nearbyStation: "Andheri",
    city: "Mumbai",
    bedrooms: 1,
    bathrooms: 1,
    area: 100,
    areaUnit: "sq ft",
    description:
      "Safe and hygienic PG for working women in Andheri West. Triple sharing with AC room. Breakfast and dinner included. CCTV surveillance, biometric entry, and in-house warden. 5-minute walk from Andheri station.",
    amenities: ["Meals Included", "Wi-Fi", "AC", "CCTV", "Washing Machine", "Power Backup", "Water Supply"],
    images: [],
    featured: false,
    furnishing: "furnished",
    availability: "available",
    availableFrom: "2026-11-01",
    lastConfirmedDate: "2026-10-29",
    verified: false,
    postedDate: "2026-10-26",
  },
  {
    id: "12",
    referenceId: "HH-1012",
    title: "2 BHK in Ghatkopar East",
    type: "2bhk",
    rent: 30000,
    deposit: 60000,
    brokerage: 15000,
    locality: "Ghatkopar East",
    nearbyStation: "Ghatkopar",
    city: "Mumbai",
    bedrooms: 2,
    bathrooms: 2,
    area: 750,
    areaUnit: "sq ft",
    description:
      "Well-maintained 2 BHK near R-City Mall, Ghatkopar. Both bedrooms with attached bathrooms. Modular kitchen with chimney. Connected to Metro Line 1 (Ghatkopar station). Schools and hospitals nearby.",
    amenities: ["Lift", "Parking", "Security", "Power Backup", "Water Supply", "Gas Pipeline", "Intercom", "Geyser"],
    images: [],
    featured: false,
    furnishing: "semi-furnished",
    availability: "available",
    availableFrom: "2026-11-15",
    lastConfirmedDate: "2026-10-25",
    verified: false,
    postedDate: "2026-10-19",
  },
  {
    id: "13",
    referenceId: "HH-1013",
    title: "3 BHK in Mulund West",
    type: "3bhk",
    rent: 40000,
    deposit: 100000,
    brokerage: 40000,
    locality: "Mulund West",
    nearbyStation: "Mulund",
    city: "Mumbai",
    bedrooms: 3,
    bathrooms: 2,
    area: 1100,
    areaUnit: "sq ft",
    description:
      "Spacious 3 BHK in a reputed society in Mulund West. Open terrace access, cross-ventilation, and ample natural light. Walking distance to Mulund station. Near Johnson & Johnson and Nirlon campus.",
    amenities: ["Lift", "Parking", "Security", "Power Backup", "Water Supply", "Garden", "Children's Play Area", "Gym"],
    images: [],
    featured: false,
    furnishing: "unfurnished",
    availability: "upcoming",
    availableFrom: "2026-12-15",
    lastConfirmedDate: "2026-10-20",
    verified: false,
    postedDate: "2026-10-12",
  },
  {
    id: "14",
    referenceId: "HH-1014",
    title: "Furnished 1 RK in Kandivali East",
    type: "1rk",
    rent: 10000,
    deposit: 20000,
    brokerage: 5000,
    locality: "Kandivali East",
    nearbyStation: "Kandivali",
    city: "Mumbai",
    bedrooms: 1,
    bathrooms: 1,
    area: 250,
    areaUnit: "sq ft",
    description:
      "Compact furnished 1 RK on the 4th floor with lift access. Bed, wardrobe, and small kitchen platform included. Near Raghuleela Mall and Kandivali station. Suitable for bachelor or working professional.",
    amenities: ["Lift", "Water Supply", "Power Backup", "Geyser"],
    images: [],
    featured: false,
    furnishing: "furnished",
    availability: "available",
    availableFrom: "2026-11-01",
    lastConfirmedDate: "2026-10-28",
    verified: false,
    postedDate: "2026-10-25",
  },
  {
    id: "15",
    referenceId: "HH-1015",
    title: "2 BHK with Balcony in Chembur",
    type: "2bhk",
    rent: 32000,
    deposit: 64000,
    brokerage: 16000,
    locality: "Chembur",
    nearbyStation: "Chembur (Harbour)",
    city: "Mumbai",
    bedrooms: 2,
    bathrooms: 2,
    area: 800,
    areaUnit: "sq ft",
    description:
      "Bright 2 BHK with a wide balcony in a well-maintained society in Chembur. Cross-ventilation, piped gas, and geyser in both bathrooms. Close to Diamond Garden and SIES College. Connected to Harbour line and Monorail.",
    amenities: ["Lift", "Parking", "Security", "Power Backup", "Water Supply", "Gas Pipeline", "Geyser", "Garden"],
    images: [],
    featured: false,
    furnishing: "semi-furnished",
    availability: "available",
    availableFrom: "2026-11-20",
    lastConfirmedDate: "2026-10-26",
    verified: false,
    postedDate: "2026-10-20",
  },
];

export function getAllProperties(): Property[] {
  return MOCK_PROPERTIES;
}

export function getPropertyById(id: string): Property | undefined {
  return MOCK_PROPERTIES.find((p) => p.id === id);
}

export function getPropertyByReferenceId(refId: string): Property | undefined {
  return MOCK_PROPERTIES.find((p) => p.referenceId === refId);
}

export function getFeaturedProperties(): Property[] {
  return MOCK_PROPERTIES.filter((p) => p.featured);
}

export function filterProperties(filters: {
  locality?: string;
  nearbyStation?: string;
  type?: PropertyType | "";
  minBudget?: number;
  maxBudget?: number;
  bedrooms?: number;
  furnishing?: string;
  amenities?: string[];
  sort?: string;
}): Property[] {
  let results = MOCK_PROPERTIES.filter((property) => {
    if (
      filters.locality &&
      !property.locality.toLowerCase().includes(filters.locality.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.nearbyStation &&
      !property.nearbyStation.toLowerCase().includes(filters.nearbyStation.toLowerCase())
    ) {
      return false;
    }
    if (filters.type && property.type !== filters.type) {
      return false;
    }
    if (filters.minBudget && property.rent < filters.minBudget) {
      return false;
    }
    if (filters.maxBudget && property.rent > filters.maxBudget) {
      return false;
    }
    if (filters.bedrooms && property.bedrooms !== filters.bedrooms) {
      return false;
    }
    if (filters.furnishing && property.furnishing !== filters.furnishing) {
      return false;
    }
    if (filters.amenities && filters.amenities.length > 0) {
      const hasAll = filters.amenities.every((a) =>
        property.amenities.includes(a)
      );
      if (!hasAll) return false;
    }
    return true;
  });

  if (filters.sort) {
    switch (filters.sort) {
      case "rent-asc":
        results = results.sort((a, b) => a.rent - b.rent);
        break;
      case "rent-desc":
        results = results.sort((a, b) => b.rent - a.rent);
        break;
      case "newest":
        results = results.sort(
          (a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        );
        break;
      case "area-desc":
        results = results.sort((a, b) => b.area - a.area);
        break;
    }
  }

  return results;
}

export function getSimilarProperties(property: Property, limit = 3): Property[] {
  return MOCK_PROPERTIES.filter(
    (p) => p.id !== property.id && (p.type === property.type || p.locality === property.locality)
  ).slice(0, limit);
}

