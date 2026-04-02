import { documents, type Document } from "@/data/documents";
import { categories, type Category } from "@/data/categories";
import { industries, type Industry } from "@/data/industries";
import { guides, type Guide } from "@/data/guides";
import { usDocuments } from "@/data/us-documents";
import { usGuides } from "@/data/us-guides";
import { US_STATES, US_STATE_SLUGS, getStateBySlug } from "@/data/us-states";
export type { USState } from "@/data/us-states";

// ── All documents (UK + US combined) ────────────────────────────

const allDocuments: Document[] = [...documents, ...usDocuments];

// ── Documents ───────────────────────────────────────────────────

export function getDocuments(): Document[] {
  return allDocuments;
}

export function getDocumentBySlug(slug: string): Document | undefined {
  return allDocuments.find((d) => d.slug === slug);
}

export function getDocumentsByRegion(region: "uk" | "us"): Document[] {
  return allDocuments.filter((d) => d.region === region);
}

export function getDocumentsByRegionAndState(
  region: "uk" | "us",
  state: string | null
): Document[] {
  return allDocuments.filter(
    (d) => d.region === region && d.state === state
  );
}

export function getDocumentsByIndustry(industry: string): Document[] {
  return allDocuments.filter((d) => d.industry === industry);
}

export function getDocumentsByCategory(category: string): Document[] {
  return allDocuments.filter((d) => d.category === category);
}

export function getDocumentsByIndustryAndCategory(
  industry: string,
  category: string
): Document[] {
  return allDocuments.filter(
    (d) => d.industry === industry && d.category === category
  );
}

export function getDocumentsByRegionAndCategory(
  region: "uk" | "us",
  category: string,
  state?: string | null
): Document[] {
  return allDocuments.filter(
    (d) =>
      d.region === region &&
      d.category === category &&
      (state === undefined || d.state === state)
  );
}

export function getDocumentSlugs(): string[] {
  return allDocuments.map((d) => d.slug);
}

export function getDocumentSlugsByRegion(region: "uk" | "us"): string[] {
  return allDocuments
    .filter((d) => d.region === region)
    .map((d) => d.slug);
}

/** Get US federal documents (state: null) */
export function getUSFederalDocuments(): Document[] {
  return allDocuments.filter((d) => d.region === "us" && d.state === null);
}

/** Get US state-specific documents */
export function getUSStateDocuments(state: string): Document[] {
  return allDocuments.filter((d) => d.region === "us" && d.state === state);
}

/** Get all documents for a US state (federal + state-specific) */
export function getAllUSDocumentsForState(state: string): Document[] {
  return allDocuments.filter(
    (d) => d.region === "us" && (d.state === null || d.state === state)
  );
}

/** Get UK documents (all have state: null) */
export function getUKDocuments(): Document[] {
  return allDocuments.filter((d) => d.region === "uk");
}

// ── Categories ──────────────────────────────────────────────────

export function getCategories(): Category[] {
  return categories.sort((a, b) => a.order - b.order);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoriesForIndustry(industry: string): Category[] {
  const industryCategorySlugs = new Set(
    allDocuments.filter((d) => d.industry === industry).map((d) => d.category)
  );
  return categories
    .filter((c) => industryCategorySlugs.has(c.slug))
    .sort((a, b) => a.order - b.order);
}

export function getCategoriesForRegion(
  region: "uk" | "us",
  state?: string | null
): Category[] {
  const docs = state
    ? getAllUSDocumentsForState(state)
    : getDocumentsByRegion(region);
  const categorySlugs = new Set(docs.map((d) => d.category));
  return categories
    .filter((c) => categorySlugs.has(c.slug))
    .sort((a, b) => a.order - b.order);
}

// ── Industries ──────────────────────────────────────────────────

export function getIndustries(): Industry[] {
  return industries;
}

export function getActiveIndustries(): Industry[] {
  return industries.filter((i) => i.active);
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

// ── Guides ──────────────────────────────────────────────────────

const allGuides: Guide[] = [...guides, ...usGuides];

export function getGuides(): Guide[] {
  return allGuides;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return allGuides.find((g) => g.slug === slug);
}

export function getGuidesByIndustry(industry: string): Guide[] {
  return allGuides.filter((g) => g.industry === industry);
}

export function getGuidesByRegion(region: "uk" | "us"): Guide[] {
  return allGuides.filter((g) => g.region === region);
}

// ── US States ───────────────────────────────────────────────────

export { US_STATES, US_STATE_SLUGS, getStateBySlug };
