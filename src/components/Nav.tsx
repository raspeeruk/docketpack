import Link from "next/link";

export function Nav() {
  return (
    <header className="border-b-2 border-walnut bg-cotton">
      <div className="mx-auto max-w-[1120px] px-6 md:px-12">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="group flex items-baseline gap-3">
            <span className="font-heading text-2xl text-walnut">
              DocketPack
            </span>
            <span className="font-mono text-xs tracking-wide text-graphite uppercase">
              Business Documents
            </span>
          </Link>
          <nav className="hidden items-center gap-6 font-body text-sm font-medium md:flex">
            <Link
              href="/restaurant/"
              className="text-graphite transition-colors hover:text-walnut"
            >
              US Docs
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
