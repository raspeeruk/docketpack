import type { MetadataRoute } from "next";
import { getUKDocuments, getUSFederalDocuments, getUSStateDocuments, getGuidesByRegion } from "@/lib/data";
import { US_STATES } from "@/data/us-states";

const BASE = "https://docketpack.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Global static pages ─────────────────────────────────────
  const globalPages = [
    { url: `${BASE}/`, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE}/pricing/`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/generate/`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/guides/`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE}/about/`, changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${BASE}/faq/`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE}/privacy/`, changeFrequency: "monthly" as const, priority: 0.2 },
    { url: `${BASE}/terms/`, changeFrequency: "monthly" as const, priority: 0.2 },
  ];

  // ── US pages ────────────────────────────────────────────────
  const usStaticPages = [
    { url: `${BASE}/restaurant/`, changeFrequency: "weekly" as const, priority: 0.9 },
  ];

  // US federal doc pages
  const usFederalDocPages = getUSFederalDocuments().map((doc) => ({
    url: `${BASE}/restaurant/${doc.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // US state overview + state doc pages
  const usStatePages: MetadataRoute.Sitemap = [];
  for (const state of US_STATES) {
    usStatePages.push({
      url: `${BASE}/restaurant/${state.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    });
    for (const doc of getUSStateDocuments(state.slug)) {
      usStatePages.push({
        url: `${BASE}/restaurant/${state.slug}/${doc.slug}/`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }
  }

  // US guide pages
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
    ...usStaticPages,
    ...usFederalDocPages,
    ...usStatePages,
    ...usGuidePages,
    ...ukStaticPages,
    ...ukDocPages,
    ...ukGuidePages,
  ];
}
