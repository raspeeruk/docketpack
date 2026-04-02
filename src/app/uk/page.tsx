import type { Metadata } from "next";
import Link from "next/link";
import { getUKDocuments, getCategoriesForRegion, getGuidesByRegion } from "@/lib/data";

export const metadata: Metadata = {
  title: "UK Restaurant Documents — Every Compliance Document You Need",
  description:
    "Generate every compliance, HR, legal, and health & safety document your UK restaurant needs. 51 documents across 8 categories. Complete pack for £49.",
};

export default function UKHubPage() {
  const ukDocs = getUKDocuments();
  const categories = getCategoriesForRegion("uk");
  const ukGuides = getGuidesByRegion("uk");

  return (
    <>
      {/* Hero */}
      <section className="bg-cotton py-16 md:py-20">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block border-2 border-walnut px-3 py-1 font-mono text-xs font-bold tracking-wider text-walnut uppercase">
              UK
            </span>
          </div>
          <h1 className="font-heading text-4xl text-walnut md:text-5xl lg:text-6xl">
            UK Restaurant Compliance Documents
          </h1>
          <p className="mt-4 max-w-2xl font-body text-base font-light text-graphite leading-relaxed">
            Every compliance, HR, legal, fire safety, and health &amp; safety document
            your UK restaurant needs. {ukDocs.length} documents covering {categories.length} regulatory
            categories — Environmental Health, HSE, Fire Service, Licensing Authority,
            Home Office, and ICO.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/uk/generate/"
              className="bg-burgundy px-8 py-4 font-body text-base font-medium text-cotton transition-colors hover:bg-burgundy-hover"
            >
              Generate All Documents — £49
            </Link>
            <Link
              href="/uk/restaurant/"
              className="border-2 border-walnut px-8 py-4 font-body text-base font-medium text-walnut transition-colors hover:bg-manila"
            >
              Browse Document Library
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-t-2 border-dashed border-fold bg-manila/50 py-16 md:py-20">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <h2 className="font-heading text-3xl text-walnut">
            {categories.length} regulatory categories covered
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {categories.map((cat) => {
              const count = ukDocs.filter((d) => d.category === cat.slug).length;
              return (
                <div key={cat.slug} className="border-2 border-walnut bg-cotton p-6">
                  <p className="font-heading text-lg text-walnut">{cat.name}</p>
                  <p className="mt-2 font-mono text-sm font-bold text-burgundy">
                    {count} documents
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guides */}
      {ukGuides.length > 0 && (
        <section className="border-t-2 border-walnut bg-cotton py-16 md:py-20">
          <div className="mx-auto max-w-[1120px] px-6 md:px-12">
            <h2 className="font-heading text-3xl text-walnut">UK Compliance Guides</h2>
            <div className="mt-8 space-y-4">
              {ukGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/uk/guides/${guide.slug}/`}
                  className="group block border border-fold bg-manila/40 p-6 transition-colors hover:bg-manila/70"
                >
                  <h3 className="font-heading text-xl text-walnut group-hover:text-burgundy transition-colors">
                    {guide.title}
                  </h3>
                  <p className="mt-2 font-body text-sm font-light text-graphite">
                    {guide.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t-2 border-walnut bg-manila/30 py-16 md:py-20">
        <div className="mx-auto max-w-[1120px] px-6 text-center md:px-12">
          <h2 className="font-heading text-3xl text-walnut">
            All {ukDocs.length} UK documents. Your business details. Ready in minutes.
          </h2>
          <Link
            href="/uk/generate/"
            className="mt-8 inline-block bg-burgundy px-10 py-4 font-body text-base font-medium text-cotton transition-colors hover:bg-burgundy-hover"
          >
            Generate Your UK Document Pack — £49
          </Link>
        </div>
      </section>
    </>
  );
}
