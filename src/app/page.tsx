import Link from "next/link";
import { industries } from "@/data/industries";

const activeIndustries = industries.filter((i) => i.active);
const comingSoon = industries.filter((i) => !i.active);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cotton py-20 md:py-28">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <h1 className="font-heading text-5xl text-walnut md:text-7xl lg:text-[80px]">
            Every document your<br />
            business needs to operate
          </h1>
          <p className="mt-6 max-w-2xl font-body text-lg font-light text-graphite leading-relaxed">
            Compliance, HR, legal, and health &amp; safety documents — generated
            for your specific business in minutes. Legally referenced. Covers
            federal, state, and local requirements. Stop worrying about
            what you&apos;re missing.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
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

      {/* Industries */}
      <section className="border-t-2 border-dashed border-fold bg-manila/50 py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <h2 className="font-heading text-3xl text-walnut md:text-4xl">
            Choose your industry
          </h2>
          <p className="mt-4 max-w-xl font-body text-base font-light text-graphite">
            Each industry has its own set of compliance requirements.
            We generate every document — federal, state, and industry-specific
            — tailored to your business.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {activeIndustries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/${ind.slug}/`}
                className="group border-2 border-walnut bg-cotton p-8 transition-colors hover:bg-manila"
              >
                <p className="font-heading text-2xl text-walnut group-hover:text-burgundy transition-colors">
                  {ind.name}
                </p>
                <p className="mt-2 font-body text-sm font-light text-graphite leading-relaxed">
                  {ind.description}
                </p>
                <p className="mt-4 font-mono text-xs text-burgundy">
                  {ind.documentCount}+ documents available &rarr;
                </p>
              </Link>
            ))}
          </div>
          {comingSoon.length > 0 && (
            <div className="mt-8">
              <p className="font-mono text-xs font-bold tracking-wider text-graphite uppercase">
                Coming soon
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {comingSoon.map((ind) => (
                  <span
                    key={ind.slug}
                    className="border border-fold bg-cotton px-4 py-2 font-body text-sm text-graphite"
                  >
                    {ind.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t-2 border-walnut bg-cotton py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <h2 className="font-heading text-3xl text-walnut md:text-4xl">
            How it works
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Pick your industry",
                desc: "Select your business type and state. We know exactly which federal and state documents apply to you.",
              },
              {
                step: "02",
                title: "Enter your business details",
                desc: "Name, address, employee count, and a few industry-specific details. Two minutes.",
              },
              {
                step: "03",
                title: "Download your complete pack",
                desc: "AI generates every document — customised, legally referenced, and ready to use. Print, file, done.",
              },
            ].map((item) => (
              <div key={item.step}>
                <span className="font-mono text-3xl font-bold text-burgundy">
                  {item.step}
                </span>
                <h3 className="mt-3 font-heading text-xl text-walnut">
                  {item.title}
                </h3>
                <p className="mt-2 font-body text-sm font-light text-graphite leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / What's Included */}
      <section className="border-t-2 border-dashed border-fold bg-manila/30 py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-5">
            <div className="md:col-span-3">
              <h2 className="font-heading text-3xl text-walnut md:text-4xl">
                Not generic templates.<br />
                Your documents.
              </h2>
              <p className="mt-6 font-body text-base font-light text-graphite leading-relaxed">
                Every document references the specific federal or state law it
                satisfies. Your business name, address, and operational details
                are woven throughout. These aren&apos;t blanks with gaps to
                fill — they&apos;re ready to use.
              </p>
              <p className="mt-4 font-body text-base font-light text-graphite leading-relaxed">
                Each pack covers every category regulators and inspectors check:
                workplace safety, employment law, health codes, fire codes,
                insurance, licensing, and industry-specific compliance.
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="border border-fold bg-manila p-6">
                <p className="font-mono text-xs font-bold tracking-wider text-graphite uppercase">
                  What&apos;s covered
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "OSHA workplace safety policies",
                    "Employment contracts & I-9 verification",
                    "State-specific compliance documents",
                    "Health & safety management plans",
                    "Fire code compliance & evacuation plans",
                    "Insurance & workers comp requirements",
                    "Wage & hour compliance (FLSA + state)",
                    "Industry-specific licensing & permits",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 font-body text-sm text-walnut">
                      <span className="mt-1 h-3 w-3 flex-shrink-0 border border-fold bg-cotton" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UK Link */}
      <section className="border-t-2 border-dashed border-fold bg-cotton py-12">
        <div className="mx-auto max-w-[1120px] px-6 text-center md:px-12">
          <p className="font-body text-base text-graphite">
            UK-based business?{" "}
            <Link href="/uk/" className="text-burgundy font-medium underline underline-offset-4 hover:text-walnut">
              View UK documents (&pound;49) &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t-2 border-walnut bg-cotton py-16 md:py-20">
        <div className="mx-auto max-w-[1120px] px-6 text-center md:px-12">
          <h2 className="font-heading text-3xl text-walnut md:text-4xl">
            Every document. One pack. Done.
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-base font-light text-graphite">
            Stop Googling templates. Stop worrying about what you&apos;re missing.
            Generate everything your business needs in minutes.
          </p>
          <Link
            href="/generate/"
            className="mt-8 inline-block bg-burgundy px-10 py-4 font-body text-base font-medium text-cotton transition-colors hover:bg-burgundy-hover"
          >
            Generate Your Document Pack
          </Link>
        </div>
      </section>
    </>
  );
}
