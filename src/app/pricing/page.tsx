import type { Metadata } from "next";
import Link from "next/link";
import { RubberStampCTA } from "@/components/RubberStampCTA";

export const metadata: Metadata = {
  title: "Pricing — Business Compliance Document Packs from $79",
  description:
    "Complete compliance document packs from $79. Individual documents $9. Federal and state documents customised to your business, legally referenced, ready in minutes. 7-day money-back guarantee.",
};

const tiers = [
  {
    name: "Individual Document",
    price: "$9",
    period: "per document",
    description: "Generate a single document customised to your US business.",
    features: [
      "Any one federal or state document",
      "Customised with your business details",
      "Correct federal/state legal references",
      "PDF download",
      "Regenerate free for 30 days",
    ],
    cta: "Choose Your Document",
    href: "/restaurant/",
    featured: false,
  },
  {
    name: "Complete Pack",
    price: "$79",
    period: "one-time",
    description:
      "Every federal + state document your business needs. Best value.",
    features: [
      "All 13 federal compliance documents",
      "All state-specific documents for your state",
      "Customised with your business details",
      "Every legal reference cited",
      "Combined PDF + individual documents",
      "Regenerate free for 90 days",
      "7-day money-back guarantee",
    ],
    cta: "Generate Your Pack",
    href: "/generate/",
    featured: true,
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero + Tiers */}
      <section className="bg-cotton py-16 md:py-20">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <h1 className="font-heading text-4xl text-walnut md:text-5xl">
            Simple pricing. No subscriptions.
          </h1>
          <p className="mt-4 max-w-xl font-body text-base font-light text-graphite">
            One price. No monthly fees. No hidden charges. Your documents are
            yours to keep. Generate once, use forever.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`border p-8 ${
                  tier.featured
                    ? "border-2 border-burgundy bg-manila"
                    : "border-fold bg-manila/40"
                }`}
              >
                {tier.featured && (
                  <span className="mb-4 inline-block bg-burgundy px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-cotton uppercase">
                    Best Value
                  </span>
                )}
                <h2 className="font-heading text-2xl text-walnut">
                  {tier.name}
                </h2>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-mono text-4xl font-bold text-burgundy">
                    {tier.price}
                  </span>
                  <span className="font-body text-sm text-graphite">
                    {tier.period}
                  </span>
                </div>
                <p className="mt-3 font-body text-sm font-light text-graphite">
                  {tier.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 font-body text-sm text-walnut"
                    >
                      <span className="mt-1 h-3 w-3 flex-shrink-0 border border-fold bg-cotton" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <RubberStampCTA href={tier.href} size="large">
                    {tier.cta}
                  </RubberStampCTA>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="font-body text-sm text-graphite">
              UK business?{" "}
              <Link
                href="/uk/pricing/"
                className="text-burgundy underline underline-offset-4 hover:text-walnut"
              >
                View UK pricing (&pound;49/&pound;9) &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="border-t-2 border-dashed border-fold bg-manila/30 py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <h2 className="font-heading text-3xl text-walnut">
            How DocketPack compares
          </h2>
          <p className="mt-4 font-body text-base font-light text-graphite">
            The real cost of compliance documentation.
          </p>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b-2 border-walnut">
                  <th className="py-4 text-left font-body text-sm font-medium text-graphite" />
                  <th className="px-4 py-4 text-left font-body text-sm font-medium text-graphite">
                    Hire a Lawyer
                  </th>
                  <th className="px-4 py-4 text-left font-body text-sm font-medium text-graphite">
                    Free Templates
                  </th>
                  <th className="px-4 py-4 text-left font-body text-sm font-bold text-burgundy">
                    DocketPack
                  </th>
                </tr>
              </thead>
              <tbody className="font-body text-sm text-walnut">
                {[
                  {
                    label: "Cost for 20+ documents",
                    lawyer: "$3,000-$10,000+",
                    templates: "Free",
                    dp: "$79",
                  },
                  {
                    label: "Customised to your business",
                    lawyer: "Yes",
                    templates: "No — fill in blanks",
                    dp: "Yes — fully personalised",
                  },
                  {
                    label: "Cites specific laws",
                    lawyer: "Yes",
                    templates: "Rarely",
                    dp: "Yes — every document",
                  },
                  {
                    label: "State-specific content",
                    lawyer: "If you ask",
                    templates: "No — generic US",
                    dp: "Yes — 12 states",
                  },
                  {
                    label: "Time to receive",
                    lawyer: "2-6 weeks",
                    templates: "Instant",
                    dp: "Under 5 minutes",
                  },
                  {
                    label: "Easy to update",
                    lawyer: "Pay again",
                    templates: "Start over",
                    dp: "Regenerate free (30/90 days)",
                  },
                  {
                    label: "Covers all categories",
                    lawyer: "Depends on speciality",
                    templates: "Incomplete",
                    dp: "8 compliance categories",
                  },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-fold">
                    <td className="py-4 font-medium text-walnut">
                      {row.label}
                    </td>
                    <td className="px-4 py-4 font-light text-graphite">
                      {row.lawyer}
                    </td>
                    <td className="px-4 py-4 font-light text-graphite">
                      {row.templates}
                    </td>
                    <td className="px-4 py-4 font-medium text-burgundy">
                      {row.dp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="border-t-2 border-walnut bg-cotton py-16 md:py-20">
        <div className="mx-auto max-w-[820px] px-6 text-center md:px-12">
          <p className="font-mono text-xs font-bold tracking-wider text-burgundy uppercase">
            Risk-free guarantee
          </p>
          <h2 className="mt-4 font-heading text-3xl text-walnut">
            7-day money-back guarantee
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-base font-light text-graphite leading-relaxed">
            If the generated documents don&apos;t meet the quality you expect,
            email us within 7 days for a full refund. No questions asked. We
            stand behind the accuracy and completeness of every document.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t-2 border-dashed border-fold bg-manila/30 py-12 md:py-16">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <h2 className="font-heading text-2xl text-walnut">
            Common questions
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                q: "Are these documents legally valid?",
                a: "Each document references the specific federal or state laws it satisfies. They are generated by AI and should be reviewed by your attorney or compliance advisor before relying on them for regulatory purposes.",
              },
              {
                q: "Can I edit the documents after generation?",
                a: "Yes. Documents are delivered as downloadable files you can print, file, or edit in any word processor. Many owners add their logo and have their attorney review.",
              },
              {
                q: "Do I get federal AND state documents?",
                a: "Yes. The complete pack includes all 13 federal requirements (OSHA, FDA, EEOC, IRS, etc.) plus 10 state-specific documents covering minimum wage, food handler certs, liquor licensing, and more.",
              },
              {
                q: "Which states are supported?",
                a: "We have state-specific documents for 12 states: California, Texas, Florida, New York, Illinois, Pennsylvania, Ohio, Georgia, North Carolina, Washington, Massachusetts, and Virginia. Federal documents apply to all 50 states.",
              },
              {
                q: "What if I only need a few documents?",
                a: "Individual documents are $9 each. If you need more than 8 documents, the Complete Pack at $79 is better value.",
              },
              {
                q: "Can I use these for multiple locations?",
                a: "Each pack is generated for a specific business location and state. Multiple locations need separate packs to ensure state-specific accuracy.",
              },
              {
                q: "How long does generation take?",
                a: "Individual documents generate in under 30 seconds. A complete pack takes 2-5 minutes depending on state-specific document count.",
              },
              {
                q: "Do you store my business data?",
                a: "No. Your business details are used only during generation and are not retained, shared, or sold. See our privacy policy for details.",
              },
            ].map((item) => (
              <div key={item.q}>
                <h3 className="font-body text-base font-medium text-walnut">
                  {item.q}
                </h3>
                <p className="mt-2 font-body text-sm font-light text-graphite leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/faq/"
              className="font-body text-sm text-burgundy underline underline-offset-4 hover:text-walnut"
            >
              See all frequently asked questions &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-walnut bg-cotton py-16 md:py-20">
        <div className="mx-auto max-w-[1120px] px-6 text-center md:px-12">
          <h2 className="font-heading text-3xl text-walnut">
            Every document. One pack. Done.
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-base font-light text-graphite">
            Stop Googling templates. Generate everything your business needs.
          </p>
          <Link
            href="/generate/"
            className="mt-8 inline-block bg-burgundy px-10 py-4 font-body text-base font-medium text-cotton transition-colors hover:bg-burgundy-hover"
          >
            Generate Your Document Pack — $79
          </Link>
        </div>
      </section>
    </>
  );
}
