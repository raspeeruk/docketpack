export interface USState {
  slug: string;
  name: string;
  abbreviation: string;
  restaurantCount: string;
  minWage: string;
  tippedWage: string;
  paidSickLeave: string;
  foodHandlerCert: string;
  workersComp: string;
  healthDept: string;
  abcAuthority: string;
  keyRegulations: string[];
}

export const US_STATES: USState[] = [
  {
    slug: "california",
    name: "California",
    abbreviation: "CA",
    restaurantCount: "~76,000",
    minWage: "$16.00/hr",
    tippedWage: "$16.00/hr (no tip credit)",
    paidSickLeave: "Minimum 5 paid sick days (40 hours) per year under CA Paid Sick Leave law; some cities require more",
    foodHandlerCert: "California Food Handler Card required within 30 days of hire (ANSI-accredited program)",
    workersComp: "Mandatory workers' compensation insurance for all employers; enforced by CalOSHA and DIR",
    healthDept: "California Department of Public Health (CDPH) and county environmental health departments",
    abcAuthority: "California Department of Alcoholic Beverage Control (ABC)",
    keyRegulations: [
      "CalOSHA heat illness prevention and injury prevention programs required for all restaurants",
      "California Retail Food Code (CalCode) governs food safety, facility standards, and inspections",
      "Proposition 65 warnings required for chemicals known to cause cancer or reproductive harm",
      "No tip credit — employers must pay full state minimum wage before tips",
    ],
  },
  {
    slug: "texas",
    name: "Texas",
    abbreviation: "TX",
    restaurantCount: "~58,000",
    minWage: "$7.25/hr (federal minimum)",
    tippedWage: "$2.13/hr (tip credit applies; tips must bring total to $7.25/hr)",
    paidSickLeave: "No statewide paid sick leave mandate; Austin, Dallas, and San Antonio ordinances preempted by state law",
    foodHandlerCert: "Texas Food Handler Certificate required for all food employees; must be obtained from DSHS-accredited provider",
    workersComp: "Workers' compensation insurance is optional in Texas; non-subscribers must notify employees and file with TDI",
    healthDept: "Texas Department of State Health Services (DSHS) and local health departments",
    abcAuthority: "Texas Alcoholic Beverage Commission (TABC)",
    keyRegulations: [
      "Texas Food Establishment Rules (TFER) based on FDA Food Code govern food safety and restaurant operations",
      "TABC requires food and beverage certificates for all alcohol-serving staff (TABC seller-server certification)",
      "TCEQ regulates grease trap requirements, wastewater discharge, and environmental compliance for restaurants",
      "Workers' comp is elective — Texas is the only state where private employers can opt out entirely",
    ],
  },
  {
    slug: "florida",
    name: "Florida",
    abbreviation: "FL",
    restaurantCount: "~47,000",
    minWage: "$13.00/hr",
    tippedWage: "$9.98/hr (tip credit of $3.02; tips must bring total to $13.00/hr)",
    paidSickLeave: "No statewide paid sick leave requirement; state preempts local paid leave ordinances",
    foodHandlerCert: "Florida Food Handler Certificate required; must complete training from DBPR-approved provider within 60 days of hire",
    workersComp: "Mandatory for employers with 4+ employees (1+ for construction); enforced by FL Division of Workers' Compensation",
    healthDept: "Florida Department of Business and Professional Regulation (DBPR), Division of Hotels and Restaurants",
    abcAuthority: "Florida Division of Alcoholic Beverages and Tobacco (DABT)",
    keyRegulations: [
      "DBPR inspects all public food service establishments; restaurants receive 1-4 unannounced inspections per year",
      "Florida Clean Indoor Air Act prohibits smoking inside enclosed food service establishments",
      "State preemption prevents local governments from enacting wage, benefits, or scheduling ordinances",
      "SunBiz annual report required for all restaurant corporations and LLCs to maintain active status",
    ],
  },
  {
    slug: "new-york",
    name: "New York",
    abbreviation: "NY",
    restaurantCount: "~50,000",
    minWage: "$15.00+/hr (varies by region; NYC $16.00/hr, Long Island & Westchester $16.00/hr, rest of state $15.00/hr)",
    tippedWage: "$10.65/hr for food service workers in NYC; varies by region and employer size",
    paidSickLeave: "40 hours paid sick leave for employers with 5-99 employees; 56 hours for 100+ employees (NY Paid Sick Leave Law)",
    foodHandlerCert: "NYC requires Food Protection Certificate for supervisory staff; rest of state follows county health dept requirements",
    workersComp: "Mandatory for all employers with one or more employees; enforced by NY Workers' Compensation Board",
    healthDept: "New York State Department of Health (DOH); NYC Department of Health and Mental Hygiene (DOHMH) for the five boroughs",
    abcAuthority: "New York State Liquor Authority (SLA)",
    keyRegulations: [
      "NYC restaurant letter grading system (A/B/C) with mandatory posting of inspection scores in the front window",
      "NY HERO Act requires employers to adopt airborne infectious disease exposure prevention plans",
      "Predictive scheduling and just cause protections for fast food workers in NYC under Fair Workweek Law",
      "NY Wage Theft Prevention Act requires written wage notices at hire and with each pay change",
    ],
  },
];

export const US_STATE_SLUGS: Set<string> = new Set(
  US_STATES.map((state) => state.slug)
);

export function getStateBySlug(slug: string): USState | undefined {
  return US_STATES.find((state) => state.slug === slug);
}
