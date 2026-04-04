import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-2 border-walnut bg-walnut text-cotton/70">
      <div className="mx-auto max-w-[1120px] px-6 py-16 md:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <p className="font-heading text-xl text-cotton">
              DocketPack
            </p>
            <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-cotton/50">
              Every compliance, HR, legal, and safety document
              your business needs. AI-generated, legally referenced,
              customised to your business. Ready in minutes.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold tracking-widest text-cotton/40 uppercase">
              US Documents
            </h4>
            <ul className="mt-4 space-y-2 font-body text-sm">
              <li>
                <Link href="/restaurant/" className="hover:text-cotton">
                  Restaurant
                </Link>
              </li>
              <li>
                <Link href="/salon/" className="hover:text-cotton">
                  Salon & Barbershop
                </Link>
              </li>
              <li>
                <Link href="/gym/" className="hover:text-cotton">
                  Gym & Fitness
                </Link>
              </li>
              <li>
                <Link href="/food-truck/" className="hover:text-cotton">
                  Food Truck
                </Link>
              </li>
              <li>
                <Link href="/retail/" className="hover:text-cotton">
                  Retail Shop
                </Link>
              </li>
              <li>
                <Link href="/tattoo/" className="hover:text-cotton">
                  Tattoo & Piercing
                </Link>
              </li>
              <li>
                <Link href="/pricing/" className="hover:text-cotton">
                  Pricing ($79/$9)
                </Link>
              </li>
              <li>
                <Link href="/generate/" className="hover:text-cotton">
                  Generate Documents
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold tracking-widest text-cotton/40 uppercase">
              UK Documents
            </h4>
            <ul className="mt-4 space-y-2 font-body text-sm">
              <li>
                <Link href="/uk/restaurant/" className="hover:text-cotton">
                  Restaurant Documents
                </Link>
              </li>
              <li>
                <Link href="/uk/pricing/" className="hover:text-cotton">
                  Pricing (£49/£9)
                </Link>
              </li>
              <li>
                <Link href="/uk/guides/" className="hover:text-cotton">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/uk/generate/" className="hover:text-cotton">
                  Generate Documents
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold tracking-widest text-cotton/40 uppercase">
              Company
            </h4>
            <ul className="mt-4 space-y-2 font-body text-sm">
              <li>
                <Link href="/about/" className="hover:text-cotton">About</Link>
              </li>
              <li>
                <Link href="/privacy/" className="hover:text-cotton">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms/" className="hover:text-cotton">Terms</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-cotton/10 pt-8 font-mono text-xs text-cotton/30">
          &copy; {new Date().getFullYear()} DocketPack. All rights reserved.
          Documents are generated using AI and should be reviewed by a qualified professional before use.
        </div>
      </div>
    </footer>
  );
}
