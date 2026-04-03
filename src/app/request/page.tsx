import type { Metadata } from "next";

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

          <form
            name="document-request"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="mt-10 space-y-6"
          >
            <input type="hidden" name="form-name" value="document-request" />
            <p className="hidden">
              <label>
                Don&apos;t fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block font-mono text-xs font-bold tracking-wider text-graphite uppercase"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. John Smith"
                  className="mt-2 w-full border border-fold bg-cotton px-4 py-3 font-body text-sm text-walnut placeholder:text-graphite/50 focus:border-walnut focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-mono text-xs font-bold tracking-wider text-graphite uppercase"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 w-full border border-fold bg-cotton px-4 py-3 font-body text-sm text-walnut placeholder:text-graphite/50 focus:border-walnut focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="industry"
                  className="block font-mono text-xs font-bold tracking-wider text-graphite uppercase"
                >
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  required
                  className="mt-2 w-full border border-fold bg-cotton px-4 py-3 font-body text-sm text-walnut focus:border-walnut focus:outline-none"
                >
                  <option value="">Select your industry</option>
                  <option value="restaurant">Restaurant / Food Service</option>
                  <option value="retail">Retail</option>
                  <option value="construction">Construction</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="salon">Salon / Beauty</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="transportation">Transportation / Logistics</option>
                  <option value="professional-services">Professional Services</option>
                  <option value="childcare">Childcare / Education</option>
                  <option value="fitness">Fitness / Gym</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block font-mono text-xs font-bold tracking-wider text-graphite uppercase"
                >
                  State (optional)
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  placeholder="e.g. California"
                  className="mt-2 w-full border border-fold bg-cotton px-4 py-3 font-body text-sm text-walnut placeholder:text-graphite/50 focus:border-walnut focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="document"
                className="block font-mono text-xs font-bold tracking-wider text-graphite uppercase"
              >
                What document do you need?
              </label>
              <textarea
                id="document"
                name="document"
                required
                rows={4}
                placeholder="Describe the compliance document you're looking for. For example: 'I need an OSHA bloodborne pathogen exposure control plan for my tattoo parlor' or 'Fire safety evacuation plan for a daycare center in Texas'."
                className="mt-2 w-full border border-fold bg-cotton px-4 py-3 font-body text-sm text-walnut placeholder:text-graphite/50 focus:border-walnut focus:outline-none resize-y"
              />
            </div>

            <div>
              <label
                htmlFor="urgency"
                className="block font-mono text-xs font-bold tracking-wider text-graphite uppercase"
              >
                How urgent is this?
              </label>
              <select
                id="urgency"
                name="urgency"
                className="mt-2 w-full border border-fold bg-cotton px-4 py-3 font-body text-sm text-walnut focus:border-walnut focus:outline-none"
              >
                <option value="no-rush">No rush — just want it available</option>
                <option value="soon">Need it within a week</option>
                <option value="urgent">Urgent — inspection or deadline coming up</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-burgundy px-8 py-4 font-body text-base font-medium text-cotton transition-colors hover:bg-burgundy-hover"
            >
              Submit Request
            </button>
          </form>
        </div>
      </section>

      <section className="border-t-2 border-dashed border-fold bg-manila/20 py-12 md:py-16">
        <div className="mx-auto max-w-[680px] px-6 md:px-12">
          <h2 className="font-heading text-2xl text-walnut">
            Industries we&apos;re adding next
          </h2>
          <p className="mt-3 font-body text-sm font-light text-graphite leading-relaxed">
            We&apos;re actively expanding DocketPack. Your request helps us
            prioritize. Currently live: <strong>Restaurants</strong> (US &amp; UK).
            Coming soon:
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              "Retail",
              "Construction",
              "Healthcare",
              "Salon / Beauty",
              "Manufacturing",
              "Childcare",
              "Fitness / Gym",
              "Professional Services",
              "Transportation",
            ].map((industry) => (
              <div
                key={industry}
                className="border border-fold bg-cotton px-4 py-3 font-body text-sm text-walnut"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
