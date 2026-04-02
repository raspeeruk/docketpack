import type { Metadata } from "next";
import Link from "next/link";
import { RubberStampCTA } from "@/components/RubberStampCTA";
import { getUSFederalDocuments, getCategoriesForRegion, getDocumentsByRegionAndCategory } from "@/lib/data";
import { US_STATES } from "@/data/us-states";

export const metadata: Metadata = {
  title: "US Restaurant Compliance Documents — Federal & State Requirements",
  description:
    "Every compliance document your US restaurant needs. Federal OSHA, FDA, EEOC, IRS requirements plus state-specific documents for California, Texas, Florida, and New York.",
};

export default function USRestaurantPage() {
  const federalDocs = getUSFederalDocuments();
  const categories = getCategoriesForRegion("us");

  return (
    <>
      {/* Hero */}
      <section className="bg-cotton py-16 md:py-20">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <h1 className="font-heading text-4xl text-walnut md:text-5xl lg:text-6xl">
            US Restaurant Documents
          </h1>
          <p className="mt-4 max-w-2xl font-body text-base font-light text-graphite leading-relaxed">
            Federal requirements from OSHA, FDA, EEOC, and the IRS — plus
            state-specific compliance documents. Every document generated for
            your restaurant, referencing the exact laws that apply to you.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <RubberStampCTA href="/generate/?industry=restaurant" size="large">
              Generate Your Documents — $79
            </RubberStampCTA>
          </div>
        </div>
      </section>

      {/* Federal Documents */}
      <section className="border-t-2 border-walnut bg-cotton py-12 md:py-16">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <h2 className="font-heading text-3xl text-walnut">
            Federal Requirements
          </h2>
          <p className="mt-3 max-w-2xl font-body text-sm font-light text-graphite">
            These documents are required by federal law for every restaurant in the United States,
            regardless of state.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
            {federalDocs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/restaurant/${doc.slug}/`}
                className="group block border border-fold bg-manila/40 p-6 transition-colors hover:bg-manila/70"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-block border border-fold bg-cotton px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-graphite uppercase">
                    Federal
                  </span>
                  {doc.required && (
                    <span className="font-mono text-[10px] font-bold tracking-wider text-burgundy uppercase">
                      Required
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-heading text-xl text-walnut group-hover:text-burgundy transition-colors">
                  {doc.name}
                </h3>
                <p className="mt-2 font-body text-sm font-light text-graphite leading-relaxed line-clamp-2">
                  {doc.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* State Selector */}
      <section className="border-t-2 border-dashed border-fold bg-manila/50 py-16 md:py-20">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <h2 className="font-heading text-3xl text-walnut">
            State-Specific Documents
          </h2>
          <p className="mt-3 max-w-2xl font-body text-sm font-light text-graphite">
            Each state has its own restaurant regulations covering minimum wage, food handler
            certifications, liquor licensing, and more. Select your state for documents
            tailored to your local requirements.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {US_STATES.map((state) => (
              <Link
                key={state.slug}
                href={`/restaurant/${state.slug}/`}
                className="group border-2 border-walnut bg-cotton p-6 transition-colors hover:bg-manila"
              >
                <div className="flex items-baseline justify-between">
                  <p className="font-heading text-xl text-walnut group-hover:text-burgundy transition-colors">
                    {state.name}
                  </p>
                  <span className="font-mono text-sm font-bold text-graphite">
                    {state.abbreviation}
                  </span>
                </div>
                <p className="mt-2 font-mono text-xs text-burgundy">
                  {state.restaurantCount} restaurants
                </p>
                <p className="mt-1 font-body text-xs text-graphite">
                  Min wage: {state.minWage}
                </p>
                <span className="mt-3 inline-block font-mono text-xs font-bold text-walnut underline underline-offset-4 group-hover:text-burgundy">
                  View documents &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-walnut bg-cotton py-16 md:py-20">
        <div className="mx-auto max-w-[1120px] px-6 text-center md:px-12">
          <h2 className="font-heading text-3xl text-walnut">
            Federal + state documents. Your business details. Ready in minutes.
          </h2>
          <div className="mt-8">
            <RubberStampCTA href="/generate/?industry=restaurant" size="large">
              Generate Your Document Pack — $79
            </RubberStampCTA>
          </div>
        </div>
      </section>
    </>
  );
}
