import type { Metadata } from "next";
import { DocumentCard } from "@/components/DocumentCard";
import { RubberStampCTA } from "@/components/RubberStampCTA";
import { getUKDocuments, getCategoriesForRegion, getDocumentsByRegionAndCategory } from "@/lib/data";

export const metadata: Metadata = {
  title: "UK Restaurant Documents — All Compliance Documents",
  description:
    "Every compliance, HR, legal, fire safety, and health & safety document your UK restaurant needs. Documents across 8 categories. Generate your complete pack for £49.",
};

export default function UKRestaurantDocumentsPage() {
  const allDocs = getUKDocuments();
  const cats = getCategoriesForRegion("uk");

  return (
    <>
      <section className="bg-cotton py-16 md:py-20">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block border-2 border-walnut px-3 py-1 font-mono text-xs font-bold tracking-wider text-walnut uppercase">
              UK
            </span>
          </div>
          <h1 className="font-heading text-4xl text-walnut md:text-5xl lg:text-6xl">
            UK Restaurant Documents
          </h1>
          <p className="mt-4 max-w-2xl font-body text-base font-light text-graphite leading-relaxed">
            {allDocs.length} documents across {cats.length} categories. Everything
            Environmental Health, the Fire Service, HSE, the Licensing Authority,
            the Home Office, and the ICO expect you to have.
          </p>
          <div className="mt-8">
            <RubberStampCTA href="/uk/generate/?industry=restaurant" size="large">
              Generate All {allDocs.length} Documents — £49
            </RubberStampCTA>
          </div>
        </div>
      </section>

      {cats.map((cat) => {
        const catDocs = getDocumentsByRegionAndCategory("uk", cat.slug);
        return (
          <section
            key={cat.slug}
            className="border-t-2 border-dashed border-fold bg-cotton py-12 md:py-16"
          >
            <div className="mx-auto max-w-[1120px] px-6 md:px-12">
              <div className="flex items-baseline justify-between">
                <h2 className="font-heading text-2xl text-walnut md:text-3xl">
                  {cat.name}
                </h2>
                <span className="font-mono text-sm font-bold text-burgundy">
                  {catDocs.length} docs
                </span>
              </div>
              <p className="mt-2 max-w-xl font-body text-sm font-light text-graphite">
                {cat.description}
              </p>
              <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
                {catDocs.map((doc) => (
                  <DocumentCard key={doc.slug} doc={doc} baseUrl="/uk/restaurant" />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="border-t-2 border-walnut bg-manila/30 py-16 md:py-20">
        <div className="mx-auto max-w-[1120px] px-6 text-center md:px-12">
          <h2 className="font-heading text-3xl text-walnut">
            All {allDocs.length} documents. Your business details. Ready in minutes.
          </h2>
          <div className="mt-8">
            <RubberStampCTA href="/uk/generate/?industry=restaurant" size="large">
              Generate Your Document Pack — £49
            </RubberStampCTA>
          </div>
        </div>
      </section>
    </>
  );
}
