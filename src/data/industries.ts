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
    name: "Salon",
    description: "Hair salons, beauty parlours, barbershops, and aesthetic treatment providers.",
    active: false,
    documentCount: 0,
    fields: [],
  },
  {
    slug: "gym",
    name: "Gym",
    description: "Gyms, fitness centres, personal training studios, and sports facilities.",
    active: false,
    documentCount: 0,
    fields: [],
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
