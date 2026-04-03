import Link from "next/link";
import type { Document } from "@/data/documents";
import { CategoryBadge } from "./CategoryBadge";

export function DocumentCard({
  doc,
  baseUrl,
}: {
  doc: Document;
  baseUrl?: string;
}) {
  // URL pattern: /{industry}/{slug}/ for US, /uk/restaurant/{slug}/ for UK
  const industrySlug = doc.industry || "restaurant";
  const href = baseUrl
    ? `${baseUrl}/${doc.slug}/`
    : doc.region === "uk"
    ? `/uk/restaurant/${doc.slug}/`
    : doc.state
    ? `/${industrySlug}/${doc.state}/${doc.slug}/`
    : `/${industrySlug}/${doc.slug}/`;

  return (
    <Link
      href={href}
      className="group block border border-fold bg-manila/40 p-6 transition-colors hover:bg-manila/70"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <CategoryBadge category={doc.category} />
            {doc.required && (
              <span className="font-mono text-[10px] font-bold tracking-wider text-burgundy uppercase">
                Required
              </span>
            )}
          </div>
          <h3 className="mt-3 font-heading text-xl text-walnut group-hover:text-burgundy transition-colors">
            {doc.name}
          </h3>
          <p className="mt-2 font-body text-sm font-light text-graphite leading-relaxed line-clamp-2">
            {doc.shortDescription}
          </p>
        </div>
        <span className="mt-3 flex-shrink-0 font-mono text-xs text-graphite opacity-0 transition-opacity group-hover:opacity-100">
          View &rarr;
        </span>
      </div>
    </Link>
  );
}
