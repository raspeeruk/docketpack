import type { Metadata } from "next";
import Link from "next/link";
import { getGuidesByRegion } from "@/lib/data";

export const metadata: Metadata = {
  title: "US Restaurant Compliance Guides — Free Resources",
  description:
    "Free guides for US restaurant owners covering federal and state compliance, health department inspections, tip credit rules, food safety certifications, and opening requirements.",
};

export default function USGuidesPage() {
  const usGuides = getGuidesByRegion("us");

  return (
    <section className="bg-cotton py-16 md:py-20">
      <div className="mx-auto max-w-[1120px] px-6 md:px-12">
        <h1 className="font-heading text-4xl text-walnut md:text-5xl">
          Guides
        </h1>
        <p className="mt-4 max-w-xl font-body text-base font-light text-graphite">
          Free resources to help US restaurant owners understand federal and state
          compliance requirements.
        </p>

        <div className="mt-12 space-y-6">
          {usGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}/`}
              className="group block border border-fold bg-manila/40 p-8 transition-colors hover:bg-manila/70"
            >
              <h2 className="font-heading text-2xl text-walnut group-hover:text-burgundy transition-colors">
                {guide.title}
              </h2>
              <p className="mt-3 max-w-2xl font-body text-sm font-light text-graphite leading-relaxed">
                {guide.description}
              </p>
              <span className="mt-4 inline-block font-mono text-xs font-bold text-burgundy uppercase tracking-wider">
                Read guide &rarr;
              </span>
            </Link>
          ))}
        </div>

        {/* Link to UK guides */}
        <div className="mt-12 border-t border-fold pt-8">
          <p className="font-body text-sm text-graphite">
            Looking for UK compliance guides?{" "}
            <Link href="/uk/guides/" className="text-burgundy underline underline-offset-4 hover:text-walnut">
              View UK guides &rarr;
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
