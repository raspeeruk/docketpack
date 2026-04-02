import type { Metadata } from "next";
import Link from "next/link";
import { getGuidesByRegion } from "@/lib/data";

export const metadata: Metadata = {
  title: "UK Restaurant Compliance Guides — Free Resources",
  description:
    "Free guides for UK restaurant owners covering compliance checklists, Environmental Health inspections, food hygiene ratings, and opening requirements.",
};

export default function UKGuidesPage() {
  const ukGuides = getGuidesByRegion("uk");

  return (
    <section className="bg-cotton py-16 md:py-20">
      <div className="mx-auto max-w-[1120px] px-6 md:px-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block border-2 border-walnut px-3 py-1 font-mono text-xs font-bold tracking-wider text-walnut uppercase">
            UK
          </span>
        </div>
        <h1 className="font-heading text-4xl text-walnut md:text-5xl">
          UK Compliance Guides
        </h1>
        <p className="mt-4 max-w-xl font-body text-base font-light text-graphite">
          Free resources to help you understand what your UK restaurant needs
          to stay compliant and pass inspections.
        </p>

        <div className="mt-12 space-y-6">
          {ukGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/uk/guides/${guide.slug}/`}
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
      </div>
    </section>
  );
}
