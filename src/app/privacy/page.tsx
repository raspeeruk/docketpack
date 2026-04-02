import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "DocketPack privacy policy. How we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <section className="bg-cotton py-16 md:py-20">
      <div className="mx-auto max-w-[800px] px-6 md:px-12">
        <h1 className="font-heading text-4xl text-walnut">Privacy Policy</h1>
        <p className="mt-4 font-mono text-xs text-graphite">Last updated: April 2026</p>

        <div className="mt-8 space-y-8 font-body text-sm font-light text-graphite leading-relaxed">
          <div>
            <h2 className="font-heading text-xl text-walnut">Who we are</h2>
            <p className="mt-3">
              DocketPack is operated by Baxter House Ltd. Our registered address is available on request.
              For data protection enquiries, contact us at privacy@docketpack.com.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl text-walnut">What data we collect</h2>
            <p className="mt-3">When you use DocketPack, we may collect:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Business details you enter into the document generator (business name, address, employee count, etc.)</li>
              <li>Payment information processed by Stripe (we do not store card details)</li>
              <li>Email address if you provide one</li>
              <li>Usage data via Google Analytics (anonymised)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl text-walnut">How we use your data</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>To generate documents customised to your business</li>
              <li>To process payments via Stripe</li>
              <li>To improve our service through anonymised analytics</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl text-walnut">Data retention</h2>
            <p className="mt-3">
              Business details entered for document generation are processed in real-time and not stored
              after your session ends. Payment records are retained as required by UK tax law (6 years).
              Analytics data is retained for 14 months.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl text-walnut">Third parties</h2>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              <li>Stripe — payment processing</li>
              <li>Anthropic — AI document generation</li>
              <li>Google Analytics — anonymised usage analytics</li>
              <li>Netlify — website hosting</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl text-walnut">Your rights</h2>
            <p className="mt-3">
              Under UK GDPR, you have the right to access, rectify, erase, restrict processing of,
              and port your personal data. You also have the right to object to processing and to
              complain to the ICO (ico.org.uk). Contact privacy@docketpack.com to exercise any of these rights.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl text-walnut">Cookies</h2>
            <p className="mt-3">
              We use Google Analytics cookies to understand how visitors use our site.
              These are anonymised and do not identify you personally.
              No marketing or advertising cookies are used.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
