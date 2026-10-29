import type { Property } from "@/types";

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Sunny Studio Room in Koramangala",
    type: "room",
    price: 8500,
    priceUnit: "/month",
    location: "Koramangala, 5th Block",
    city: "Bangalore",
    bedrooms: 1,
    bathrooms: 1,
    area: 250,
    areaUnit: "sq ft",
    description:
      "A bright, well-ventilated studio room in the heart of Koramangala. Walking distance to restaurants, cafés, and metro station. Ideal for working professionals. Includes shared kitchen and laundry access.",
    amenities: ["Wi-Fi", "Parking", "Power Backup", "Water Supply", "Laundry"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    ],
    featured: true,
    availableFrom: "2026-11-01",
    furnishing: "furnished",
  },
  {
    id: "2",
    title: "Premium PG for Men in HSR Layout",
    type: "pg",
    price: 12000,
    priceUnit: "/month",
    location: "HSR Layout, Sector 2",
    city: "Bangalore",
    bedrooms: 1,
    bathrooms: 1,
    area: 180,
    areaUnit: "sq ft",
    description:
      "A well-maintained premium PG with meals included. Single and double occupancy rooms available. Close to tech parks and major bus routes. AC rooms with daily housekeeping.",
    amenities: ["Meals", "Wi-Fi", "AC", "Housekeeping", "Gym", "Security"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
    ],
    featured: true,
    availableFrom: "2026-11-15",
    furnishing: "furnished",
  },
  {
    id: "3",
    title: "Spacious 2BHK Flat in Indiranagar",
    type: "flat",
    price: 28000,
    priceUnit: "/month",
    location: "Indiranagar, 100 Feet Road",
    city: "Bangalore",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    areaUnit: "sq ft",
    description:
      "A beautifully furnished 2BHK apartment in one of Bangalore's most sought-after neighborhoods. Modern kitchen, spacious balcony with garden view. Gated community with 24/7 security.",
    amenities: [
      "Wi-Fi",
      "AC",
      "Gym",
      "Swimming Pool",
      "Parking",
      "Security",
      "Power Backup",
      "Lift",
    ],
    images: [
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&q=80",
    ],
    featured: true,
    availableFrom: "2026-12-01",
    furnishing: "semi-furnished",
  },
  {
    id: "4",
    title: "Independent House in Whitefield",
    type: "house",
    price: 45000,
    priceUnit: "/month",
    location: "Whitefield, ITPL Main Road",
    city: "Bangalore",
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    areaUnit: "sq ft",
    description:
      "A beautiful independent house in Whitefield with a private garden. Three spacious bedrooms, modular kitchen, covered parking for two cars. Quiet residential neighborhood close to IT parks.",
    amenities: [
      "Garden",
      "Parking",
      "Power Backup",
      "Water Supply",
      "Security",
      "Modular Kitchen",
    ],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    ],
    featured: true,
    availableFrom: "2026-11-20",
    furnishing: "semi-furnished",
  },
  {
    id: "5",
    title: "Cozy Room near MG Road",
    type: "room",
    price: 7000,
    priceUnit: "/month",
    location: "MG Road, Brigade Road Junction",
    city: "Bangalore",
    bedrooms: 1,
    bathrooms: 1,
    area: 200,
    areaUnit: "sq ft",
    description:
      "An affordable room in the bustling MG Road area. Perfect for students and young professionals. Shared bathroom and kitchen. Very well connected by metro and bus.",
    amenities: ["Wi-Fi", "Water Supply", "Power Backup"],
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    ],
    featured: false,
    availableFrom: "2026-11-10",
    furnishing: "unfurnished",
  },
  {
    id: "6",
    title: "Female PG in Electronic City",
    type: "pg",
    price: 9500,
    priceUnit: "/month",
    location: "Electronic City, Phase 1",
    city: "Bangalore",
    bedrooms: 1,
    bathrooms: 1,
    area: 160,
    areaUnit: "sq ft",
    description:
      "Safe and comfortable PG accommodation for women in Electronic City. Meals included, CCTV surveillance, biometric entry. Walking distance to Infosys and Wipro campuses.",
    amenities: ["Meals", "Wi-Fi", "CCTV", "Biometric Entry", "Laundry", "TV"],
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ez637a26c?w=800&q=80",
    ],
    featured: false,
    availableFrom: "2026-11-05",
    furnishing: "furnished",
  },
  {
    id: "7",
    title: "Modern 1BHK in Marathahalli",
    type: "flat",
    price: 18000,
    priceUnit: "/month",
    location: "Marathahalli, ORR",
    city: "Bangalore",
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    areaUnit: "sq ft",
    description:
      "A modern 1BHK flat near the Outer Ring Road. Recently renovated with contemporary interiors. Close to shopping malls and restaurants. Ideal for couples or small families.",
    amenities: ["Parking", "Lift", "Power Backup", "Water Supply", "Security"],
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    ],
    featured: false,
    availableFrom: "2026-12-15",
    furnishing: "semi-furnished",
  },
  {
    id: "8",
    title: "Villa with Pool in Sarjapur Road",
    type: "house",
    price: 65000,
    priceUnit: "/month",
    location: "Sarjapur Road, Wipro Junction",
    city: "Bangalore",
    bedrooms: 4,
    bathrooms: 4,
    area: 3500,
    areaUnit: "sq ft",
    description:
      "Luxurious 4BHK villa with private pool and landscaped garden. Spacious living areas, home office, modern amenities throughout. Premium gated community with clubhouse access.",
    amenities: [
      "Swimming Pool",
      "Garden",
      "Clubhouse",
      "Gym",
      "Parking",
      "Security",
      "Power Backup",
      "Modular Kitchen",
    ],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    featured: true,
    availableFrom: "2027-01-01",
    furnishing: "furnished",
  },
];

export function getPropertyById(id: string): Property | undefined {
  return MOCK_PROPERTIES.find((p) => p.id === id);
}

export function filterProperties(filters: {
  location?: string;
  type?: string;
  minBudget?: number;
  maxBudget?: number;
}): Property[] {
  return MOCK_PROPERTIES.filter((property) => {
    if (
      filters.location &&
      !property.location.toLowerCase().includes(filters.location.toLowerCase()) &&
      !property.city.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }
    if (filters.type && property.type !== filters.type) {
      return false;
    }
    if (filters.minBudget && property.price < filters.minBudget) {
      return false;
    }
    if (filters.maxBudget && property.price > filters.maxBudget) {
      return false;
    }
    return true;
  });
}

