export interface Industry {
  slug: string;
  name: string;
  description: string;
  active: boolean;
  documentCount: number;
  fields: IndustryField[];
}

export interface IndustryField {
  key: string;
  label: string;
  type: "text" | "number" | "select";
  placeholder?: string;
  options?: string[];
  required: boolean;
}

export const industries: Industry[] = [
  {
    slug: "restaurant",
    name: "Restaurant",
    description: "Full-service restaurants, cafes, takeaways, and food establishments serving food to the public.",
    active: true,
    documentCount: 104,
    fields: [
      { key: "cuisineType", label: "Cuisine type", type: "text", placeholder: "e.g. Italian, Indian, British", required: false },
      { key: "seatingCapacity", label: "Seating capacity", type: "number", placeholder: "e.g. 60", required: true },
      { key: "servesAlcohol", label: "Serves alcohol", type: "select", options: ["Yes", "No"], required: true },
      { key: "hasOutdoorSeating", label: "Outdoor seating", type: "select", options: ["Yes", "No"], required: false },
      { key: "deliveryService", label: "Delivery service", type: "select", options: ["None", "Own delivery", "Third-party only", "Both"], required: false },
      { key: "openingHours", label: "Opening hours", type: "text", placeholder: "e.g. Mon-Sat 11am-11pm, Sun 12pm-10pm", required: false },
    ],
  },
  {
    slug: "salon",
    name: "Salon & Barbershop",
    description: "Hair salons, barbershops, beauty parlors, nail salons, spas, and aesthetic treatment providers.",
    active: true,
    documentCount: 30,
    fields: [
      { key: "salonType", label: "Business type", type: "select", options: ["Hair Salon", "Barbershop", "Nail Salon", "Spa", "Beauty Salon", "Full-Service Salon"], required: true },
      { key: "stationCount", label: "Number of stations/chairs", type: "number", placeholder: "e.g. 8", required: true },
      { key: "servicesOffered", label: "Services offered", type: "text", placeholder: "e.g. Cuts, color, blowouts, extensions, nails", required: true },
      { key: "chemicalServices", label: "Chemical services", type: "select", options: ["Yes — hair color, bleach, relaxers", "Yes — keratin/Brazilian treatments", "Yes — nail acrylics/gels", "Yes — all of the above", "No chemical services"], required: true },
      { key: "boothRenters", label: "Booth renters", type: "select", options: ["None — all employees", "Some booth renters", "All booth renters"], required: false },
    ],
  },
  {
    slug: "gym",
    name: "Gym & Fitness Studio",
    description: "Gyms, fitness studios, CrossFit boxes, yoga studios, personal training studios, and sports facilities.",
    active: true,
    documentCount: 29,
    fields: [
      { key: "facilityType", label: "Facility type", type: "select", options: ["Full-Service Gym", "CrossFit Box", "Yoga/Pilates Studio", "Personal Training Studio", "Martial Arts Studio", "Boxing/MMA Gym", "Boutique Fitness Studio"], required: true },
      { key: "squareFootage", label: "Square footage", type: "number", placeholder: "e.g. 5000", required: true },
      { key: "hasPool", label: "Pool or sauna", type: "select", options: ["Yes", "No"], required: true },
      { key: "hasGroupClasses", label: "Group classes", type: "select", options: ["Yes", "No"], required: true },
      { key: "personalTrainers", label: "Personal trainers", type: "select", options: ["None", "Employees only", "Independent contractors", "Both"], required: true },
    ],
  },
  {
    slug: "food-truck",
    name: "Food Truck",
    description: "Food trucks, mobile food vendors, street food carts, and mobile catering operations.",
    active: true,
    documentCount: 24,
    fields: [
      { key: "truckType", label: "Vehicle type", type: "select", options: ["Food Truck", "Food Trailer", "Food Cart", "Mobile Catering Van"], required: true },
      { key: "cuisineType", label: "Cuisine type", type: "text", placeholder: "e.g. Tacos, BBQ, Pizza, Asian fusion", required: false },
      { key: "servesAlcohol", label: "Serves alcohol (events)", type: "select", options: ["Yes", "No"], required: true },
      { key: "hasCommissary", label: "Commissary kitchen", type: "select", options: ["Yes — own commissary", "Yes — shared/rented commissary", "No commissary"], required: true },
      { key: "operatingLocations", label: "Operating locations", type: "text", placeholder: "e.g. Downtown, festivals, corporate events", required: false },
    ],
  },
  {
    slug: "retail",
    name: "Retail Shop",
    description: "Independent retail stores, boutiques, gift shops, and specialty retailers.",
    active: true,
    documentCount: 25,
    fields: [
      { key: "storeType", label: "Store type", type: "select", options: ["Clothing/Fashion", "Electronics", "Home Goods", "Gift/Specialty", "Grocery/Convenience", "Pet Supply", "Sporting Goods", "General Retail"], required: true },
      { key: "squareFootage", label: "Square footage", type: "number", placeholder: "e.g. 2000", required: true },
      { key: "productCategories", label: "Product categories", type: "text", placeholder: "e.g. Clothing, accessories, home decor", required: true },
      { key: "hasEcommerce", label: "E-commerce", type: "select", options: ["Yes — online + physical", "No — physical store only"], required: true },
      { key: "acceptsCreditCards", label: "Accepts credit cards", type: "select", options: ["Yes", "No — cash only"], required: true },
    ],
  },
  {
    slug: "tattoo",
    name: "Tattoo & Piercing",
    description: "Tattoo studios, piercing shops, permanent makeup artists, and body modification businesses.",
    active: true,
    documentCount: 24,
    fields: [
      { key: "studioType", label: "Studio type", type: "select", options: ["Tattoo Studio", "Piercing Studio", "Tattoo & Piercing", "Permanent Makeup Studio", "Full Body Art Studio"], required: true },
      { key: "servicesOffered", label: "Services offered", type: "text", placeholder: "e.g. Custom tattoos, piercings, permanent makeup", required: true },
      { key: "hasAutoclave", label: "Autoclave sterilization", type: "select", options: ["Yes — steam autoclave", "Yes — dry heat sterilizer", "Both"], required: true },
      { key: "acceptsMinors", label: "Accepts minors (with parental consent)", type: "select", options: ["Yes — tattoo and piercing", "Yes — piercing only", "No — 18+ only"], required: true },
      { key: "guestArtists", label: "Guest artists", type: "select", options: ["Yes — regular guest artists", "Occasionally", "No — resident artists only"], required: false },
    ],
  },
  {
    slug: "construction",
    name: "Construction",
    description: "Construction firms, building contractors, trades, and site-based operations.",
    active: false,
    documentCount: 0,
    fields: [],
  },
];
