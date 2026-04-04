import type { MetadataRoute } from "next";
import { getUKDocuments, getUSFederalDocuments, getUSStateDocuments, getGuidesByRegion } from "@/lib/data";
import { US_STATES } from "@/data/us-states";

const BASE = "https://docketpack.com";

// States with industry-specific docs (all new industries share the same 4 states)
const INDUSTRY_STATES = ["california", "texas", "florida", "new-york"];

/** Generate sitemap pages for a US industry */
function industryPages(slug: string, allStates: boolean): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${BASE}/${slug}/`, changeFrequency: "weekly" as const, priority: 0.9 },
  ];

  // Federal doc pages
  for (const doc of getUSFederalDocuments(slug)) {
    pages.push({
      url: `${BASE}/${slug}/${doc.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  }

  // State overview + state doc pages
  const states = allStates
    ? US_STATES
    : US_STATES.filter((s) => INDUSTRY_STATES.includes(s.slug));

  for (const state of states) {
    pages.push({
      url: `${BASE}/${slug}/${state.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    });
    for (const doc of getUSStateDocuments(state.slug, slug)) {
      pages.push({
        url: `${BASE}/${slug}/${state.slug}/${doc.slug}/`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }
  }

  return pages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Global static pages ─────────────────────────────────────
  const globalPages = [
    { url: `${BASE}/`, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE}/pricing/`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/generate/`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/guides/`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE}/about/`, changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${BASE}/privacy/`, changeFrequency: "monthly" as const, priority: 0.2 },
    { url: `${BASE}/terms/`, changeFrequency: "monthly" as const, priority: 0.2 },
    { url: `${BASE}/request/`, changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  // ── US Industry pages ──────────────────────────────────────
  const restaurantPages = industryPages("restaurant", true);   // all 8 states
  const salonPages = industryPages("salon", false);             // 4 states
  const gymPages = industryPages("gym", false);                 // 4 states
  const foodTruckPages = industryPages("food-truck", false);    // 4 states
  const retailPages = industryPages("retail", false);           // 4 states
  const tattooPages = industryPages("tattoo", false);           // 4 states

  // ── US guide pages ────────────────────────────────────────────
  const usGuidePages = getGuidesByRegion("us").map((g) => ({
    url: `${BASE}/guides/${g.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // ── UK pages ────────────────────────────────────────────────
  const ukStaticPages = [
    { url: `${BASE}/uk/`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE}/uk/restaurant/`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE}/uk/pricing/`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE}/uk/generate/`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE}/uk/guides/`, changeFrequency: "weekly" as const, priority: 0.5 },
  ];

  const ukDocPages = getUKDocuments().map((doc) => ({
    url: `${BASE}/uk/restaurant/${doc.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const ukGuidePages = getGuidesByRegion("uk").map((g) => ({
    url: `${BASE}/uk/guides/${g.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...globalPages,
    ...restaurantPages,
    ...salonPages,
    ...gymPages,
    ...foodTruckPages,
    ...retailPages,
    ...tattooPages,
    ...usGuidePages,
    ...ukStaticPages,
    ...ukDocPages,
    ...ukGuidePages,
  ];
}
