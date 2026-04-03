"use client";

import { useState } from "react";
import type { Document } from "@/data/documents";
import { CategoryBadge } from "./CategoryBadge";

interface DocumentAccordionProps {
  doc: Document;
  isSelected: boolean;
  onToggle: (slug: string) => void;
}

export function DocumentAccordion({
  doc,
  isSelected,
  onToggle,
}: DocumentAccordionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`border transition-colors ${
        isSelected
          ? "border-burgundy/30 bg-manila/60"
          : "border-fold bg-cotton hover:bg-manila/30"
      }`}
    >
      {/* Collapsed row */}
      <div className="flex items-center gap-3 px-4 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onToggle(doc.slug);
          }}
          className="h-4 w-4 shrink-0 accent-burgundy"
        />
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex flex-1 items-center gap-3 text-left"
        >
          <span className="flex-1 font-body text-sm text-walnut">
            {doc.name}
          </span>
          <CategoryBadge category={doc.category} />
          {doc.required && (
            <span className="inline-block border border-burgundy/30 bg-burgundy/10 px-2 py-0.5 font-mono text-xs font-bold tracking-wider text-burgundy uppercase">
              Required
            </span>
          )}
          <svg
            className={`h-4 w-4 shrink-0 text-graphite transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-fold px-4 py-5 space-y-5">
          {/* Description + why you need it */}
          <div>
            <p className="font-body text-sm text-walnut leading-relaxed">
              {doc.shortDescription}
            </p>
            <p className="mt-2 font-body text-sm text-graphite leading-relaxed">
              {doc.description.length > 250
                ? doc.description.slice(0, 250).trimEnd() + "..."
                : doc.description}
            </p>
          </div>

          {/* Penalty callout — the urgency driver */}
          <div className="border-2 border-burgundy/20 bg-burgundy/5 px-4 py-3">
            <div className="flex items-start gap-2">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="font-mono text-xs font-bold tracking-wider text-burgundy uppercase">
                  Without this document
                </p>
                <p className="mt-1 font-body text-sm text-burgundy">
                  {doc.penaltyForAbsence}
                </p>
              </div>
            </div>
          </div>

          {/* What's included — the value */}
          <div>
            <h4 className="font-mono text-xs font-bold tracking-wider text-walnut uppercase">
              {doc.keySections.length} sections included
            </h4>
            <div className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
              {doc.keySections.map((section) => (
                <div
                  key={section}
                  className="flex items-start gap-2 font-body text-sm text-graphite"
                >
                  <svg className="mt-1 h-3 w-3 shrink-0 text-walnut" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {section}
                </div>
              ))}
            </div>
          </div>

          {/* Legal basis + authority */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="border border-fold bg-cotton/80 px-3 py-2.5">
              <h4 className="font-mono text-[10px] font-bold tracking-wider text-graphite uppercase">
                Legal basis
              </h4>
              <p className="mt-1 font-body text-sm text-walnut">
                {doc.legalBasis}
              </p>
              <p className="mt-0.5 font-mono text-xs text-graphite">
                Enforced by {doc.authority}
              </p>
            </div>
            <div className="border border-fold bg-cotton/80 px-3 py-2.5">
              <h4 className="font-mono text-[10px] font-bold tracking-wider text-graphite uppercase">
                What you get
              </h4>
              <p className="mt-1 font-body text-sm text-walnut">
                Professional PDF, customized with your business name, address, and details. Ready to print and file.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
