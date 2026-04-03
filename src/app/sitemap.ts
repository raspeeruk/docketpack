import type { MetadataRoute } from "next";
import { getUKDocuments, getUSFederalDocuments, getUSStateDocuments, getGuidesByRegion } from "@/lib/data";
import { US_STATES } from "@/data/us-states";

const BASE = "https://docketpack.com";

// States with salon-specific docs
const SALON_STATES = ["california", "texas", "florida", "new-york"];

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

  // ── US Restaurant pages ───────────────────────────────────────
  const restaurantPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/restaurant/`, changeFrequency: "weekly" as const, priority: 0.9 },
  ];

  // Restaurant federal doc pages
  for (const doc of getUSFederalDocuments("restaurant")) {
    restaurantPages.push({
      url: `${BASE}/restaurant/${doc.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  }

  // Restaurant state overview + state doc pages
  for (const state of US_STATES) {
    restaurantPages.push({
      url: `${BASE}/restaurant/${state.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    });
    for (const doc of getUSStateDocuments(state.slug, "restaurant")) {
      restaurantPages.push({
        url: `${BASE}/restaurant/${state.slug}/${doc.slug}/`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }
  }

  // ── US Salon pages ────────────────────────────────────────────
  const salonPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/salon/`, changeFrequency: "weekly" as const, priority: 0.9 },
  ];

  // Salon federal doc pages
  for (const doc of getUSFederalDocuments("salon")) {
    salonPages.push({
      url: `${BASE}/salon/${doc.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  }

  // Salon state overview + state doc pages
  for (const stateSlug of SALON_STATES) {
    const state = US_STATES.find((s) => s.slug === stateSlug);
    if (!state) continue;
    salonPages.push({
      url: `${BASE}/salon/${state.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    });
    for (const doc of getUSStateDocuments(state.slug, "salon")) {
      salonPages.push({
        url: `${BASE}/salon/${state.slug}/${doc.slug}/`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }
  }

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

  // UK doc pages
  const ukDocPages = getUKDocuments().map((doc) => ({
    url: `${BASE}/uk/restaurant/${doc.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // UK guide pages
  const ukGuidePages = getGuidesByRegion("uk").map((g) => ({
    url: `${BASE}/uk/guides/${g.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...globalPages,
    ...restaurantPages,
    ...salonPages,
    ...usGuidePages,
    ...ukStaticPages,
    ...ukDocPages,
    ...ukGuidePages,
  ];
}
