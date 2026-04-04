import type { Metadata } from "next";
import Link from "next/link";
import { RequestForm } from "./RequestForm";

export const metadata: Metadata = {
  title: "Request a Document — DocketPack",
  description:
    "Can't find the compliance document you need? Tell us what's missing and we'll add it to DocketPack.",
};

export default function RequestPage() {
  return (
    <>
      <section className="bg-cotton py-16 md:py-20">
        <div className="mx-auto max-w-[680px] px-6 md:px-12">
          <h1 className="font-heading text-4xl text-walnut md:text-5xl">
            Request a document
          </h1>
          <p className="mt-4 font-body text-base font-light text-graphite leading-relaxed">
            Can&apos;t find what you need? Tell us which compliance document
            is missing and we&apos;ll prioritize adding it. We&apos;re expanding
            across industries every week.
          </p>
          <RequestForm />
        </div>
      </section>

      <section className="border-t-2 border-dashed border-fold bg-manila/20 py-12 md:py-16">
        <div className="mx-auto max-w-[680px] px-6 md:px-12">
          <h2 className="font-heading text-2xl text-walnut">
            Industries we cover
          </h2>
          <p className="mt-3 font-body text-sm font-light text-graphite leading-relaxed">
            DocketPack currently covers 6 industries with more coming soon.
            Your request helps us prioritize what to add next.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              { name: "Restaurant", href: "/restaurant/" },
              { name: "Salon & Barbershop", href: "/salon/" },
              { name: "Gym & Fitness", href: "/gym/" },
              { name: "Food Truck", href: "/food-truck/" },
              { name: "Retail Shop", href: "/retail/" },
              { name: "Tattoo & Piercing", href: "/tattoo/" },
            ].map((ind) => (
              <Link
                key={ind.name}
                href={ind.href}
                className="border border-fold bg-cotton px-4 py-3 font-body text-sm text-walnut hover:bg-manila transition-colors"
              >
                {ind.name}
              </Link>
            ))}
          </div>
          <p className="mt-4 font-body text-sm text-graphite">
            Coming soon: Construction, Healthcare, Manufacturing, Childcare, Professional Services
          </p>
        </div>
      </section>
    </>
  );
}
