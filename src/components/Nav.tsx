import Link from "next/link";

export function Nav() {
  return (
    <header className="border-b-2 border-walnut bg-cotton">
      <div className="mx-auto max-w-[1120px] px-6 md:px-12">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="group flex items-center gap-3">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              {/* Clipboard body */}
              <rect x="5" y="6" width="26" height="28" rx="2" fill="#F6F2EB" stroke="#2C2418" strokeWidth="1.5" />
              {/* Clip at top */}
              <rect x="12" y="2" width="12" height="8" rx="2" fill="#7B2D3B" />
              <rect x="14" y="4" width="8" height="4" rx="1" fill="#F6F2EB" />
              {/* Text lines */}
              <line x1="10" y1="16" x2="26" y2="16" stroke="#C9BFA8" strokeWidth="1.5" />
              <line x1="10" y1="20" x2="23" y2="20" stroke="#C9BFA8" strokeWidth="1.5" />
              <line x1="10" y1="24" x2="26" y2="24" stroke="#C9BFA8" strokeWidth="1.5" />
              <line x1="10" y1="28" x2="19" y2="28" stroke="#C9BFA8" strokeWidth="1.5" />
              {/* Checkmark */}
              <path d="M20 26l2.5 2.5L27 24" stroke="#7B2D3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex items-baseline gap-2.5">
              <span className="font-heading text-2xl text-walnut">
                DocketPack
              </span>
              <span className="hidden font-mono text-xs tracking-wide text-graphite uppercase sm:inline">
                Business Documents
              </span>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 font-body text-sm font-medium md:flex">
            <Link
              href="/restaurant/"
              className="text-graphite transition-colors hover:text-walnut"
            >
              Restaurants
            </Link>
            <Link
              href="/salon/"
              className="text-graphite transition-colors hover:text-walnut"
            >
              Salons
            </Link>
            <Link
              href="/uk/restaurant/"
              className="text-graphite transition-colors hover:text-walnut"
            >
              UK Docs
            </Link>
            <Link
              href="/pricing/"
              className="text-graphite transition-colors hover:text-walnut"
            >
              Pricing
            </Link>
            <Link
              href="/guides/"
              className="text-graphite transition-colors hover:text-walnut"
            >
              Guides
            </Link>
            <Link
              href="/request/"
              className="text-graphite transition-colors hover:text-walnut"
            >
              Request
            </Link>
            <Link
              href="/generate/"
              className="bg-burgundy px-5 py-2.5 font-body text-sm font-medium text-cotton transition-colors hover:bg-burgundy-hover"
            >
              Generate Documents
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
