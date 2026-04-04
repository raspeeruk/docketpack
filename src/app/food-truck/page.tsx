import type { Metadata } from "next";
import Link from "next/link";
import { RubberStampCTA } from "@/components/RubberStampCTA";
import { getUSFederalDocuments } from "@/lib/data";
import { US_STATES } from "@/data/us-states";

export const metadata: Metadata = {
  title: "Food Truck Compliance Documents — Federal & State Requirements",
  description:
    "Every compliance document your food truck needs. FDA food safety, fire suppression, commissary agreements, mobile vendor permits, and state-specific licensing.",
};

const STATES_WITH_DOCS = ["california", "texas", "florida", "new-york"];

export default function USFoodTruckPage() {
  const federalDocs = getUSFederalDocuments("food-truck");
  const activeStates = US_STATES.filter((s) => STATES_WITH_DOCS.includes(s.slug));

  return (
    <>
      <section className="bg-cotton py-16 md:py-20">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <h1 className="font-heading text-4xl text-walnut md:text-5xl lg:text-6xl">
            Food Truck Documents
          </h1>
          <p className="mt-4 max-w-2xl font-body text-base font-light text-graphite leading-relaxed">
            FDA food safety, HACCP for mobile operations, fire suppression plans,
            commissary agreements, mobile vendor permits, and event contracts —
            every document generated for your food truck, referencing the exact
            laws that apply to you.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <RubberStampCTA href="/generate/?industry=food-truck" size="large">
              Generate Your Documents — $79
            </RubberStampCTA>
          </div>
        </div>
      </section>

      <section className="border-t-2 border-walnut bg-cotton py-12 md:py-16">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <h2 className="font-heading text-3xl text-walnut">
            Federal Requirements
          </h2>
          <p className="mt-3 max-w-2xl font-body text-sm font-light text-graphite">
            These documents are required by federal law for every food truck and
            mobile food vendor in the United States, regardless of state.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
            {federalDocs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/food-truck/${doc.slug}/`}
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

      <section className="border-t-2 border-dashed border-fold bg-manila/50 py-16 md:py-20">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <h2 className="font-heading text-3xl text-walnut">
            State-Specific Documents
          </h2>
          <p className="mt-3 max-w-2xl font-body text-sm font-light text-graphite">
            Each state (and often each county) has its own mobile food vendor
            permits, commissary requirements, and health department regulations.
            Select your state for tailored documents.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {activeStates.map((state) => (
              <Link
                key={state.slug}
                href={`/food-truck/${state.slug}/`}
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
                  Mobile vendor permits + state docs
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
          <p className="mt-6 font-body text-sm text-graphite">
            More states coming soon.{" "}
            <Link href="/request/" className="text-burgundy underline underline-offset-2 hover:text-walnut">
              Request your state &rarr;
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t-2 border-walnut bg-cotton py-16 md:py-20">
        <div className="mx-auto max-w-[1120px] px-6 text-center md:px-12">
          <h2 className="font-heading text-3xl text-walnut">
            Federal + state documents. Your business details. Ready in minutes.
          </h2>
          <div className="mt-8">
            <RubberStampCTA href="/generate/?industry=food-truck" size="large">
              Generate Your Document Pack — $79
            </RubberStampCTA>
          </div>
        </div>
      </section>
    </>
  );
}
