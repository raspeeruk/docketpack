import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CategoryBadge } from "@/components/CategoryBadge";
import { RubberStampCTA } from "@/components/RubberStampCTA";
import {
  getDocumentBySlug,
  getUSFederalDocuments,
  getUSStateDocuments,
  getAllUSDocumentsForState,
  getCategoryBySlug,
} from "@/lib/data";
import { US_STATE_SLUGS, getStateBySlug, US_STATES } from "@/data/us-states";

const INDUSTRY = "salon";
const INDUSTRY_LABEL = "Salon & Barbershop";

// States with salon-specific docs
const SALON_STATE_SLUGS = new Set(["california", "texas", "florida", "new-york"]);

/**
 * Catch-all route for US salon pages:
 *   /salon/[slug]           → federal doc detail
 *   /salon/[state]          → state overview
 *   /salon/[state]/[slug]   → state doc detail
 */

export function generateStaticParams() {
  const params: { params: string[] }[] = [];

  for (const doc of getUSFederalDocuments(INDUSTRY)) {
    params.push({ params: [doc.slug] });
  }

  for (const state of US_STATES) {
    if (!SALON_STATE_SLUGS.has(state.slug)) continue;
    params.push({ params: [state.slug] });
    for (const doc of getUSStateDocuments(state.slug, INDUSTRY)) {
      params.push({ params: [state.slug, doc.slug] });
    }
  }

  return params;
}

type PageType =
  | { kind: "federal-doc"; doc: NonNullable<ReturnType<typeof getDocumentBySlug>> }
  | { kind: "state-overview"; stateSlug: string }
  | { kind: "state-doc"; stateSlug: string; doc: NonNullable<ReturnType<typeof getDocumentBySlug>> };

function resolveParams(segments: string[]): PageType | null {
  if (segments.length === 1) {
    const [first] = segments;
    if (SALON_STATE_SLUGS.has(first)) {
      return { kind: "state-overview", stateSlug: first };
    }
    const doc = getDocumentBySlug(first);
    if (doc && doc.region === "us" && doc.state === null && doc.industry === INDUSTRY) {
      return { kind: "federal-doc", doc };
    }
    return null;
  }

  if (segments.length === 2) {
    const [stateSlug, docSlug] = segments;
    if (!SALON_STATE_SLUGS.has(stateSlug)) return null;
    const doc = getDocumentBySlug(docSlug);
    if (doc && doc.region === "us" && doc.state === stateSlug && doc.industry === INDUSTRY) {
      return { kind: "state-doc", stateSlug, doc };
    }
    return null;
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ params: string[] }>;
}): Promise<Metadata> {
  const { params: segments } = await params;
  const resolved = resolveParams(segments);
  if (!resolved) return { title: "Not Found" };

  if (resolved.kind === "federal-doc" || resolved.kind === "state-doc") {
    return {
      title: resolved.doc.seoTitle,
      description: resolved.doc.seoDescription,
      openGraph: { title: resolved.doc.seoTitle, description: resolved.doc.seoDescription },
    };
  }

  const state = getStateBySlug(resolved.stateSlug);
  if (!state) return { title: "Not Found" };
  return {
    title: `${state.name} ${INDUSTRY_LABEL} Documents — State Compliance Requirements`,
    description: `Every compliance document your ${state.name} salon or barbershop needs. Cosmetology board licensing, sanitation standards, and labor law compliance.`,
  };
}

export default async function USSalonCatchAll({
  params,
}: {
  params: Promise<{ params: string[] }>;
}) {
  const { params: segments } = await params;
  const resolved = resolveParams(segments);
  if (!resolved) notFound();

  if (resolved.kind === "state-overview") {
    return <StateOverview stateSlug={resolved.stateSlug} />;
  }

  return <DocumentDetail doc={resolved.doc} stateSlug={resolved.kind === "state-doc" ? resolved.stateSlug : null} />;
}

// ── State Overview Component ──────────────────────────────────

function StateOverview({ stateSlug }: { stateSlug: string }) {
  const state = getStateBySlug(stateSlug);
  if (!state) notFound();

  const stateDocs = getUSStateDocuments(stateSlug, INDUSTRY);
  const federalDocs = getUSFederalDocuments(INDUSTRY);
  const allDocs = getAllUSDocumentsForState(stateSlug, INDUSTRY);

  return (
    <>
      <section className="bg-cotton py-16 md:py-20">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block border-2 border-walnut px-3 py-1 font-mono text-xs font-bold tracking-wider text-walnut uppercase">
              {state.abbreviation}
            </span>
          </div>
          <h1 className="font-heading text-4xl text-walnut md:text-5xl lg:text-6xl">
            {state.name} {INDUSTRY_LABEL} Documents
          </h1>
          <p className="mt-4 max-w-2xl font-body text-base font-light text-graphite leading-relaxed">
            {stateDocs.length} state-specific documents plus {federalDocs.length} federal
            requirements. Everything your {state.name} salon needs for full compliance.
          </p>
          <div className="mt-8">
            <RubberStampCTA href={`/generate/?industry=${INDUSTRY}&state=${stateSlug}`} size="large">
              Generate All {allDocs.length} Documents — $79
            </RubberStampCTA>
          </div>
        </div>
      </section>

      {/* State quick facts */}
      <section className="border-t-2 border-dashed border-fold bg-manila/50 py-12 md:py-16">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <h2 className="font-heading text-2xl text-walnut">
            {state.name} at a Glance
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Minimum Wage", value: state.minWage },
              { label: "Tipped Wage", value: state.tippedWage },
              { label: "Workers' Comp", value: state.workersComp.split(";")[0] },
              { label: "Health Dept", value: state.healthDept },
            ].map((item) => (
              <div key={item.label} className="border border-fold bg-cotton p-4">
                <p className="font-mono text-[10px] tracking-wider text-graphite uppercase">
                  {item.label}
                </p>
                <p className="mt-1 font-body text-sm font-medium text-walnut">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* State-specific docs */}
      <section className="border-t-2 border-walnut bg-cotton py-12 md:py-16">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <h2 className="font-heading text-2xl text-walnut md:text-3xl">
            {state.name} State Documents
          </h2>
          <p className="mt-2 font-body text-sm font-light text-graphite">
            Documents specific to {state.name} cosmetology board and state regulations.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
            {stateDocs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/salon/${stateSlug}/${doc.slug}/`}
                className="group block border border-fold bg-manila/40 p-6 transition-colors hover:bg-manila/70"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <CategoryBadge category={doc.category} />
                  {doc.required && (
                    <span className="inline-block border border-burgundy/30 bg-burgundy/10 px-2 py-0.5 font-mono text-xs font-bold tracking-wider text-burgundy uppercase">
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

      {/* Federal docs */}
      <section className="border-t-2 border-dashed border-fold bg-cotton py-12 md:py-16">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <h2 className="font-heading text-2xl text-walnut md:text-3xl">
            Federal Requirements
          </h2>
          <p className="mt-2 font-body text-sm font-light text-graphite">
            These federal documents also apply to your {state.name} salon.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
            {federalDocs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/salon/${doc.slug}/`}
                className="group block border border-fold bg-manila/40 p-6 transition-colors hover:bg-manila/70"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-block border border-fold bg-cotton px-2 py-0.5 font-mono text-xs font-bold tracking-wider text-graphite uppercase">
                    Federal
                  </span>
                  {doc.required && (
                    <span className="inline-block border border-burgundy/30 bg-burgundy/10 px-2 py-0.5 font-mono text-xs font-bold tracking-wider text-burgundy uppercase">
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

      {/* CTA */}
      <section className="border-t-2 border-walnut bg-manila/30 py-16 md:py-20">
        <div className="mx-auto max-w-[1120px] px-6 text-center md:px-12">
          <h2 className="font-heading text-3xl text-walnut">
            All {allDocs.length} {state.name} documents. Ready in minutes.
          </h2>
          <div className="mt-8">
            <RubberStampCTA href={`/generate/?industry=${INDUSTRY}&state=${stateSlug}`} size="large">
              Generate Your {state.name} Pack — $79
            </RubberStampCTA>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Document Detail Component ─────────────────────────────────

function DocumentDetail({
  doc,
  stateSlug,
}: {
  doc: NonNullable<ReturnType<typeof getDocumentBySlug>>;
  stateSlug: string | null;
}) {
  const category = getCategoryBySlug(doc.category);
  const state = stateSlug ? getStateBySlug(stateSlug) : null;
  const relatedDocs = doc.relatedDocuments
    .map((s) => getDocumentBySlug(s))
    .filter(Boolean);

  const generateHref = stateSlug
    ? `/generate/?docs=${doc.slug}&state=${stateSlug}&industry=${INDUSTRY}`
    : `/generate/?docs=${doc.slug}&industry=${INDUSTRY}`;
  const packHref = stateSlug
    ? `/generate/?industry=${INDUSTRY}&state=${stateSlug}`
    : `/generate/?industry=${INDUSTRY}`;

  return (
    <>
      <section className="bg-cotton py-12 md:py-16">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <div className="flex flex-wrap items-center gap-3">
            {state ? (
              <span className="inline-block border-2 border-walnut px-3 py-1.5 font-mono text-sm font-bold tracking-wider text-walnut uppercase">
                {state.abbreviation}
              </span>
            ) : (
              <span className="inline-block border-2 border-fold bg-cotton px-3 py-1.5 font-mono text-sm font-bold tracking-wider text-graphite uppercase">
                Federal
              </span>
            )}
            <span className="inline-block border-2 border-fold bg-cotton px-3 py-1.5 font-mono text-xs font-bold tracking-wider text-graphite uppercase">
              {getCategoryBySlug(doc.category)?.name || doc.category}
            </span>
            {doc.required && (
              <span className="inline-block border-2 border-burgundy/40 bg-burgundy/10 px-3 py-1.5 font-mono text-xs font-bold tracking-wider text-burgundy uppercase">
                Required
              </span>
            )}
          </div>
          <p className="mt-3 font-mono text-sm tracking-wide text-graphite">
            {state
              ? `Required in ${state.name} — additional to federal requirements`
              : "Applies to all US salons and barbershops regardless of state"}
          </p>
          <h1 className="mt-4 font-heading text-4xl text-walnut md:text-5xl">
            {doc.name}
          </h1>
          <p className="mt-4 max-w-2xl font-body text-lg font-light text-graphite leading-relaxed">
            {doc.shortDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <RubberStampCTA href={generateHref}>
              Generate This Document — $9
            </RubberStampCTA>
            <RubberStampCTA href={packHref}>
              Get All Documents — $79
            </RubberStampCTA>
          </div>
        </div>
      </section>

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
                  {state && (
                    <div>
                      <dt className="font-mono text-[10px] tracking-wider text-graphite uppercase">State</dt>
                      <dd className="mt-1 font-body text-sm text-walnut">{state.name}</dd>
                    </div>
                  )}
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
                    {relatedDocs.map((rd) => {
                      const rdUrl = rd!.state
                        ? `/salon/${rd!.state}/${rd!.slug}/`
                        : `/salon/${rd!.slug}/`;
                      return (
                        <li key={rd!.slug}>
                          <Link
                            href={rdUrl}
                            className="font-body text-sm text-walnut transition-colors hover:text-burgundy"
                          >
                            {rd!.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Document Preview */}
      <section className="border-t-2 border-walnut bg-manila/20 py-12 md:py-16">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <h2 className="font-heading text-2xl text-walnut md:text-3xl">
            Document preview
          </h2>
          <p className="mt-2 font-body text-sm font-light text-graphite">
            Here&apos;s what your generated {doc.name} looks like. Each document is customized with your business details.
          </p>

          <div className="mt-8 mx-auto max-w-2xl">
            <div className="relative border border-fold bg-white shadow-lg overflow-hidden" style={{ aspectRatio: "8.5/11" }}>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <span
                  className="font-heading text-8xl font-bold text-burgundy/10 select-none md:text-9xl"
                  style={{ transform: "rotate(-35deg)" }}
                >
                  SAMPLE
                </span>
              </div>

              <div className="relative z-0 px-10 py-10 md:px-14 md:py-12">
                <div className="border-b-2 border-walnut pb-4">
                  <p className="font-mono text-[10px] tracking-widest text-graphite uppercase">
                    DocketPack &mdash; Generated Document
                  </p>
                  <h3 className="mt-3 font-heading text-2xl text-walnut md:text-3xl">
                    {doc.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[10px] text-graphite">
                    <span>Prepared for: <span className="text-walnut font-bold">[Your Business Name]</span></span>
                    <span>Date: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  <div>
                    <p className="font-mono text-[10px] tracking-wider text-graphite uppercase">
                      Legal Reference
                    </p>
                    <p className="mt-1 font-body text-xs text-walnut leading-relaxed">
                      {doc.legalBasis}. Enforced by {doc.authority}.
                    </p>
                  </div>

                  {doc.keySections.slice(0, 4).map((section, i) => (
                    <div key={section}>
                      <h4 className="font-heading text-base text-walnut">
                        {i + 1}. {section}
                      </h4>
                      <div className="mt-1.5 space-y-1.5">
                        <div className="h-2.5 rounded-sm bg-graphite/8 w-full" />
                        <div className="h-2.5 rounded-sm bg-graphite/8 w-full" />
                        <div className="h-2.5 rounded-sm bg-graphite/8 w-11/12" />
                        <div className="h-2.5 rounded-sm bg-graphite/6 w-4/5" />
                      </div>
                    </div>
                  ))}

                  {doc.keySections.length > 4 && (
                    <p className="font-mono text-xs text-graphite italic">
                      + {doc.keySections.length - 4} more sections...
                    </p>
                  )}
                </div>

                <div className="absolute bottom-8 left-10 right-10 md:left-14 md:right-14 border-t border-fold pt-3 flex justify-between">
                  <p className="font-mono text-[9px] text-graphite/60">
                    Generated by DocketPack &mdash; Review with a qualified professional before use
                  </p>
                  <p className="font-mono text-[9px] text-graphite/60">
                    Page 1
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t-2 border-walnut bg-manila/30 py-12 md:py-16">
        <div className="mx-auto max-w-[1120px] px-6 text-center md:px-12">
          <h2 className="font-heading text-2xl text-walnut md:text-3xl">
            Generate your {doc.name} in minutes
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-sm font-light text-graphite">
            Customized with your business name, address, and details.
            Legally referenced. Ready to print and file.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <RubberStampCTA href={generateHref}>
              Generate This Document — $9
            </RubberStampCTA>
          </div>
        </div>
      </section>
    </>
  );
}
