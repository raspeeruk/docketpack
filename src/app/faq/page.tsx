import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Common questions about DocketPack — document formats, generation time, legal validity, state support, and more.",
};

const faqs: { q: string; a: string }[] = [
  {
    q: "What format are the documents delivered in?",
    a: "Every document is generated as formatted text that you can download as a PDF. Each document is ready to print, file, or share with your accountant, attorney, or inspector.",
  },
  {
    q: "How long does generation take?",
    a: "Most individual documents generate in under 30 seconds. A complete pack (all documents for your business) typically takes 2-5 minutes depending on how many state-specific documents are included.",
  },
  {
    q: "Are these documents legally valid?",
    a: "Each document references the specific federal or state law it addresses (e.g., 29 CFR 1910 for OSHA, your state's labor code for wage policies). They are customised to your business details and designed to satisfy regulatory requirements. However, we always recommend having a qualified attorney review documents for your specific situation.",
  },
  {
    q: "Which US states are supported?",
    a: "We currently generate state-specific documents for 12 states: California, Texas, Florida, New York, Illinois, Pennsylvania, Ohio, Georgia, North Carolina, Washington, Massachusetts, and Virginia. These cover the majority of US restaurants. Federal documents (OSHA, ADA, FDA, EEOC, IRS, etc.) apply to all 50 states.",
  },
  {
    q: "What if my state isn't listed?",
    a: "You still get all 13 federal compliance documents, which cover the core requirements every US restaurant must meet. We're adding new states regularly — the next batch will cover the remaining top-20 states by restaurant count.",
  },
  {
    q: "Can I edit the documents after generation?",
    a: "Yes. Documents are delivered as downloadable files that you can edit in any word processor. Many business owners add their logo, adjust formatting, or have their attorney make specific modifications.",
  },
  {
    q: "Do I get federal AND state documents?",
    a: "Yes. When you select your state, your pack includes all 13 federal documents plus 10 state-specific documents tailored to your state's laws. That's 23+ documents in a single pack.",
  },
  {
    q: "How is this different from free templates online?",
    a: "Free templates are generic blanks with gaps to fill. DocketPack generates documents customised to your specific business — your name, address, employee count, and operational details are woven throughout. Every document cites the actual laws it satisfies, not placeholder text.",
  },
  {
    q: "What's included in the Complete Pack vs. Individual?",
    a: "The Complete Pack ($79) includes every document for your industry and state — federal and state-specific. An Individual Document ($9) is a single document of your choice. The pack is significantly better value if you need more than 8 documents.",
  },
  {
    q: "Do you offer refunds?",
    a: "If the generated documents don't meet the quality you expect, contact us within 7 days for a full refund. We stand behind the accuracy and completeness of every document.",
  },
  {
    q: "Can I regenerate documents if my business details change?",
    a: "Pack purchases include 90 days of regeneration access. Individual documents include 30 days. If you move locations, change employee count, or update other details, you can regenerate with the new information at no extra cost.",
  },
  {
    q: "Do I need to update these documents every year?",
    a: "Federal and state regulations change periodically — minimum wage adjustments, new sick leave laws, updated safety requirements. We recommend regenerating your pack annually to ensure all documents reflect current law.",
  },
  {
    q: "Is my business data stored?",
    a: "We don't store your business details after document generation. Your information is used only during the generation process and is not retained, shared, or sold. See our privacy policy for full details.",
  },
  {
    q: "Do you support industries other than restaurants?",
    a: "Restaurants are our first and most comprehensive industry, with 100+ documents across federal and state requirements. Salons, gyms, and construction are coming soon — each will have its own tailored document set.",
  },
  {
    q: "Can I use DocketPack for multiple locations?",
    a: "Each generation is tied to one business location and state. If you operate multiple locations in different states, you'll want a pack for each location to ensure state-specific compliance.",
  },
  {
    q: "Do you support UK businesses?",
    a: "Yes. DocketPack started in the UK and we have 51 restaurant compliance documents covering food safety, health & safety, employment law, licensing, fire safety, insurance, data protection, and operations. UK packs are £49.",
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="bg-cotton py-16 md:py-24">
        <div className="mx-auto max-w-[820px] px-6 md:px-12">
          <h1 className="font-heading text-4xl text-walnut md:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mt-4 font-body text-base font-light text-graphite">
            Everything you need to know about DocketPack. Can&apos;t find what
            you&apos;re looking for?{" "}
            <a
              href="mailto:hello@docketpack.com"
              className="text-burgundy underline underline-offset-4"
            >
              Get in touch
            </a>
            .
          </p>
        </div>
      </section>

      <section className="border-t-2 border-dashed border-fold bg-manila/30 py-16 md:py-24">
        <div className="mx-auto max-w-[820px] px-6 md:px-12">
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group border-b border-fold"
              >
                <summary className="flex cursor-pointer items-start gap-4 py-6 font-body text-base font-medium text-walnut transition-colors hover:text-burgundy [&::-webkit-details-marker]:hidden">
                  <span className="mt-0.5 font-mono text-xs text-burgundy">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">{faq.q}</span>
                  <span className="mt-1 font-mono text-sm text-graphite transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="pb-6 pl-10 font-body text-sm font-light text-graphite leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t-2 border-walnut bg-cotton py-16 md:py-20">
        <div className="mx-auto max-w-[820px] px-6 text-center md:px-12">
          <h2 className="font-heading text-3xl text-walnut">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-base font-light text-graphite">
            Generate every compliance document your business needs.
            Federal and state requirements. Ready in minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/generate/"
              className="bg-burgundy px-8 py-4 font-body text-base font-medium text-cotton transition-colors hover:bg-burgundy-hover"
            >
              Generate Your Documents
            </Link>
            <Link
              href="/pricing/"
              className="border-2 border-walnut px-8 py-4 font-body text-base font-medium text-walnut transition-colors hover:bg-manila"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
