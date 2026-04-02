import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About DocketPack",
  description:
    "DocketPack generates every compliance document your business needs — federal, state, and industry-specific. Built because small business owners deserve simple, affordable compliance.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cotton py-16 md:py-24">
        <div className="mx-auto max-w-[820px] px-6 md:px-12">
          <h1 className="font-heading text-4xl text-walnut md:text-5xl">
            Compliance shouldn&apos;t be<br />
            the hard part
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg font-light text-graphite leading-relaxed">
            You opened a business to serve customers, not to become an
            expert in OSHA regulations, state labor codes, and fire
            marshal requirements. DocketPack handles the paperwork so
            you can handle the business.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="border-t-2 border-dashed border-fold bg-manila/30 py-16 md:py-24">
        <div className="mx-auto max-w-[820px] px-6 md:px-12">
          <h2 className="font-heading text-3xl text-walnut">
            The problem we solve
          </h2>
          <div className="mt-8 space-y-6 font-body text-base font-light text-graphite leading-relaxed">
            <p>
              A single restaurant in the US must comply with requirements from
              OSHA, the FDA, the EEOC, the IRS, the DOL, the ADA — and
              that&apos;s just federal. Add your state&apos;s health department,
              liquor authority, labor board, fire marshal, and workers&apos;
              compensation agency, and you&apos;re looking at 20+ documents
              you&apos;re supposed to have on file.
            </p>
            <p>
              Most business owners know they need &ldquo;paperwork&rdquo; but
              don&apos;t know which specific documents, what they should contain,
              or which laws they need to reference. So they Google templates,
              download generic PDFs with blanks to fill, and hope an inspector
              doesn&apos;t notice.
            </p>
            <p>
              The alternative — hiring a lawyer to draft everything — costs
              thousands. For a small restaurant or salon operating on thin
              margins, that&apos;s not realistic.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t-2 border-walnut bg-cotton py-16 md:py-24">
        <div className="mx-auto max-w-[820px] px-6 md:px-12">
          <h2 className="font-heading text-3xl text-walnut">
            What DocketPack does differently
          </h2>
          <div className="mt-8 space-y-6 font-body text-base font-light text-graphite leading-relaxed">
            <p>
              We generate every compliance document your business needs —
              customised with your specific details. Your business name,
              address, employee count, and operational specifics are woven
              throughout. Each document cites the exact federal or state law
              it satisfies.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                label: "Not templates",
                desc: "Your details are embedded throughout — not blanks with gaps to fill.",
              },
              {
                label: "Legally referenced",
                desc: "Every document cites the specific statute, code, or regulation it addresses.",
              },
              {
                label: "State-specific",
                desc: "Federal requirements plus your state's specific labor, health, and safety laws.",
              },
            ].map((item) => (
              <div key={item.label} className="border border-fold bg-manila p-6">
                <p className="font-mono text-xs font-bold tracking-wider text-burgundy uppercase">
                  {item.label}
                </p>
                <p className="mt-3 font-body text-sm font-light text-graphite leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="border-t-2 border-dashed border-fold bg-manila/30 py-16 md:py-24">
        <div className="mx-auto max-w-[820px] px-6 md:px-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { num: "100+", label: "Documents available" },
              { num: "12", label: "US states covered" },
              { num: "13", label: "Federal requirements" },
              { num: "8", label: "Compliance categories" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-3xl text-burgundy md:text-4xl">
                  {stat.num}
                </p>
                <p className="mt-2 font-body text-sm font-light text-graphite">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="border-t-2 border-walnut bg-cotton py-16 md:py-24">
        <div className="mx-auto max-w-[820px] px-6 md:px-12">
          <h2 className="font-heading text-3xl text-walnut">
            What we cover
          </h2>
          <p className="mt-4 font-body text-base font-light text-graphite leading-relaxed">
            We started with restaurants because they face the most complex
            web of compliance requirements — dozens of documents across multiple
            federal agencies and state regulators. More industries are coming.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="border border-fold bg-manila p-6">
              <p className="font-heading text-xl text-walnut">Restaurants</p>
              <p className="mt-1 font-mono text-xs text-burgundy">Available now</p>
              <p className="mt-3 font-body text-sm font-light text-graphite leading-relaxed">
                100+ documents covering food safety, workplace safety, employment law,
                fire codes, licensing, insurance, and more. US (federal + 12 states)
                and UK.
              </p>
            </div>
            <div className="border border-fold bg-cotton p-6 opacity-60">
              <p className="font-heading text-xl text-walnut">Salons &amp; Spas</p>
              <p className="mt-1 font-mono text-xs text-graphite">Coming soon</p>
              <p className="mt-3 font-body text-sm font-light text-graphite leading-relaxed">
                Cosmetology licensing, sanitation protocols, chemical safety,
                client consent forms, state board compliance.
              </p>
            </div>
            <div className="border border-fold bg-cotton p-6 opacity-60">
              <p className="font-heading text-xl text-walnut">Gyms &amp; Fitness</p>
              <p className="mt-1 font-mono text-xs text-graphite">Coming soon</p>
              <p className="mt-3 font-body text-sm font-light text-graphite leading-relaxed">
                Liability waivers, equipment safety, membership contracts,
                emergency procedures, AED compliance.
              </p>
            </div>
            <div className="border border-fold bg-cotton p-6 opacity-60">
              <p className="font-heading text-xl text-walnut">Construction</p>
              <p className="mt-1 font-mono text-xs text-graphite">Coming soon</p>
              <p className="mt-3 font-body text-sm font-light text-graphite leading-relaxed">
                OSHA construction standards, site safety plans, fall protection,
                scaffolding, confined spaces, hazard communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t-2 border-dashed border-fold bg-manila/30 py-16 md:py-24">
        <div className="mx-auto max-w-[820px] px-6 md:px-12">
          <h2 className="font-heading text-2xl text-walnut">
            Important: what DocketPack is not
          </h2>
          <div className="mt-6 space-y-4 font-body text-base font-light text-graphite leading-relaxed">
            <p>
              DocketPack is not legal advice. Our documents are generated by AI
              and reference current federal and state legislation, but they
              should be reviewed by a qualified professional before you rely on
              them for regulatory compliance.
            </p>
            <p>
              We provide the documents — you provide the professional review.
              Together, that&apos;s a fraction of the cost of having an attorney
              draft everything from scratch.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-walnut bg-cotton py-16 md:py-20">
        <div className="mx-auto max-w-[820px] px-6 text-center md:px-12">
          <h2 className="font-heading text-3xl text-walnut">
            Stop worrying about compliance
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-base font-light text-graphite">
            Generate every document your business needs. Federal and state
            requirements. Customised to your business. Ready in minutes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/generate/"
              className="bg-burgundy px-8 py-4 font-body text-base font-medium text-cotton transition-colors hover:bg-burgundy-hover"
            >
              Generate Your Documents
            </Link>
            <Link
              href="/restaurant/"
              className="border-2 border-walnut px-8 py-4 font-body text-base font-medium text-walnut transition-colors hover:bg-manila"
            >
              Browse Document Library
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
