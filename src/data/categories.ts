export interface Category {
  slug: string;
  name: string;
  description: string;
  order: number;
}

export const categories: Category[] = [
  {
    slug: "food-safety",
    name: "Food Safety",
    description: "HACCP plans, allergen management, temperature logs, and food hygiene procedures required by Environmental Health.",
    order: 1,
  },
  {
    slug: "health-and-safety",
    name: "Health & Safety",
    description: "Risk assessments, safety policies, COSHH records, and accident reporting procedures required under the Health and Safety at Work Act 1974.",
    order: 2,
  },
  {
    slug: "employment-hr",
    name: "Employment & HR",
    description: "Employment contracts, staff handbooks, disciplinary procedures, and recruitment documentation required by UK employment law.",
    order: 3,
  },
  {
    slug: "licensing",
    name: "Licensing & Permits",
    description: "Premises licence conditions, personal licence records, and TEN applications required under the Licensing Act 2003.",
    order: 4,
  },
  {
    slug: "fire-safety",
    name: "Fire Safety",
    description: "Fire risk assessments, evacuation plans, and fire safety logs required under the Regulatory Reform (Fire Safety) Order 2005.",
    order: 5,
  },
  {
    slug: "insurance",
    name: "Insurance & Liability",
    description: "Insurance schedules, incident logs, and liability documentation required for UK business operation.",
    order: 6,
  },
  {
    slug: "data-privacy",
    name: "Data & Privacy",
    description: "GDPR policies, privacy notices, data processing records, and consent forms required by the UK GDPR and Data Protection Act 2018.",
    order: 7,
  },
  {
    slug: "operations",
    name: "Operations",
    description: "Opening and closing checklists, supplier agreements, waste management plans, and day-to-day operational procedures.",
    order: 8,
  },
];
