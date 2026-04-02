import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CategoryBadge } from "@/components/CategoryBadge";
import { RubberStampCTA } from "@/components/RubberStampCTA";
import { getDocumentBySlug, getUKDocuments, getCategoryBySlug } from "@/lib/data";

export function generateStaticParams() {
  return getUKDocuments().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);
  if (!doc || doc.region !== "uk") return { title: "Not Found" };
  return {
    title: doc.seoTitle,
    description: doc.seoDescription,
    openGraph: { title: doc.seoTitle, description: doc.seoDescription },
  };
}

export default async function UKDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);
  if (!doc || doc.region !== "uk") notFound();

  const category = getCategoryBySlug(doc.category);
  const relatedDocs = doc.relatedDocuments
    .map((s) => getDocumentBySlug(s))
    .filter(Boolean);

  return (
    <>
      {/* Header */}
      <section className="bg-cotton py-12 md:py-16">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <div className="flex items-center gap-3">
            <span className="inline-block border-2 border-walnut px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-walnut uppercase">
              UK
            </span>
            <CategoryBadge category={doc.category} />
            {doc.required && (
              <span className="font-mono text-[10px] font-bold tracking-wider text-burgundy uppercase">
                Legally Required
              </span>
            )}
          </div>
          <h1 className="mt-4 font-heading text-4xl text-walnut md:text-5xl">
            {doc.name}
          </h1>
          <p className="mt-4 max-w-2xl font-body text-lg font-light text-graphite leading-relaxed">
            {doc.shortDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <RubberStampCTA href={`/uk/generate/?docs=${doc.slug}`}>
              Generate This Document — £9
            </RubberStampCTA>
            <RubberStampCTA href="/uk/generate/?industry=restaurant">
              Get All UK Documents — £49
            </RubberStampCTA>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="border-t-2 border-dashed border-fold bg-cotton py-12 md:py-16">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-5">
            <div className="md:col-span-3">
              <h2 className="font-heading text-2xl text-walnut">
                What this document covers
              </h2>
              <p className="mt-4 font-body text-base font-light text-graphite leading-relaxed">
                {doc.description}
              </p>

              <h3 className="mt-10 font-heading text-xl text-walnut">
                Key sections included
              </h3>
              <ul className="mt-4 space-y-2">
                {doc.keySections.map((section) => (
                  <li key={section} className="flex gap-3 font-body text-sm text-walnut">
                    <span className="mt-1.5 h-3 w-3 flex-shrink-0 border border-fold bg-cotton" />
                    {section}
                  </li>
                ))}
              </ul>

              {doc.faq.length > 0 && (
                <>
                  <h3 className="mt-12 font-heading text-xl text-walnut">
                    Frequently asked questions
                  </h3>
                  <div className="mt-6 space-y-6">
                    {doc.faq.map((item, i) => (
                      <div key={i}>
                        <h4 className="font-body text-base font-medium text-walnut">
                          {item.q}
                        </h4>
                        <p className="mt-2 font-body text-sm font-light text-graphite leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="md:col-span-2">
              <div className="border border-fold bg-manila p-6">
                <h4 className="font-mono text-xs font-bold tracking-wider text-graphite uppercase">
                  Document details
                </h4>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="font-mono text-[10px] tracking-wider text-graphite uppercase">Legal basis</dt>
                    <dd className="mt-1 font-body text-sm text-walnut">{doc.legalBasis}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] tracking-wider text-graphite uppercase">Enforced by</dt>
                    <dd className="mt-1 font-body text-sm text-walnut">{doc.authority}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] tracking-wider text-graphite uppercase">Penalty for absence</dt>
                    <dd className="mt-1 font-body text-sm text-walnut">{doc.penaltyForAbsence}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] tracking-wider text-graphite uppercase">Category</dt>
                    <dd className="mt-1 font-body text-sm text-walnut">{category?.name || doc.category}</dd>
                  </div>
                </dl>
              </div>

              {relatedDocs.length > 0 && (
                <div className="mt-6 border border-fold bg-cotton p-6">
                  <h4 className="font-mono text-xs font-bold tracking-wider text-graphite uppercase">
                    Related documents
                  </h4>
                  <ul className="mt-4 space-y-2">
                    {relatedDocs.map((rd) => (
                      <li key={rd!.slug}>
                        <Link
                          href={`/uk/restaurant/${rd!.slug}/`}
                          className="font-body text-sm text-walnut transition-colors hover:text-burgundy"
                        >
                          {rd!.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-walnut bg-manila/30 py-12 md:py-16">
        <div className="mx-auto max-w-[1120px] px-6 text-center md:px-12">
          <h2 className="font-heading text-2xl text-walnut md:text-3xl">
            Generate your {doc.name} in minutes
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-sm font-light text-graphite">
            Customised with your business name, address, and details.
            Legally referenced. Ready to print and file.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <RubberStampCTA href={`/uk/generate/?docs=${doc.slug}`}>
              Generate This Document — £9
            </RubberStampCTA>
          </div>
        </div>
      </section>
    </>
  );
}
