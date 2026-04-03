"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { usDocuments } from "@/data/us-documents";
import { usSalonDocuments } from "@/data/us-salon-documents";
import { industries, type IndustryField } from "@/data/industries";
import { categories } from "@/data/categories";
import { US_STATES } from "@/data/us-states";
import { DocumentAccordion } from "@/components/DocumentAccordion";

type Step = 1 | 2 | 3 | 4 | 5;

// Dynamic business details: core fields + industry-specific fields
type BusinessDetails = Record<string, string>;

const allUSDocuments = [...usDocuments, ...usSalonDocuments];

const CORE_FIELDS = [
  { key: "businessName", label: "Business name", type: "text" as const, placeholder: "e.g. The Corner Kitchen", required: true },
  { key: "businessAddress", label: "Business address", type: "text" as const, placeholder: "e.g. 123 Main St, Los Angeles, CA 90001", required: true },
  { key: "ownerName", label: "Owner / responsible person", type: "text" as const, placeholder: "e.g. John Smith", required: true },
  { key: "employeeCount", label: "Number of employees", type: "number" as const, placeholder: "e.g. 15", required: true },
];

interface GeneratedDoc {
  slug: string;
  name: string;
  content: string;
  status: "pending" | "generating" | "done" | "error";
}

const STEPS = [
  "Industry",
  "State",
  "Business Details",
  "Select Documents",
  "Generate",
] as const;

const SESSION_KEY = "docketpack-wizard";

export function USFormWizard() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>(1);
  const [selectedIndustry, setSelectedIndustry] = useState("restaurant");
  const [selectedState, setSelectedState] = useState("");
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>({
    businessName: "",
    businessAddress: "",
    ownerName: "",
    employeeCount: "",
  });
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [generatedDocs, setGeneratedDocs] = useState<GeneratedDoc[]>([]);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = useCallback(async (
    docs: Set<string>,
    details: BusinessDetails,
    state: string
  ) => {
    setGenerating(true);
    const docList = Array.from(docs).map((slug) => ({
      slug,
      name: allUSDocuments.find((d) => d.slug === slug)?.name || slug,
      content: "",
      status: "pending" as const,
    }));
    setGeneratedDocs(docList);

    try {
      const res = await fetch("/api/generate/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessDetails: details,
          documents: Array.from(docs),
          region: "us",
          state: state || null,
        }),
      });

      if (!res.ok) {
        setGeneratedDocs((prev) =>
          prev.map((d) => ({ ...d, status: "error" as const }))
        );
        setGenerating(false);
        return;
      }

      const data = await res.json();
      setGeneratedDocs(
        data.results.map((r: { slug: string; name: string; content: string; status: string }) => ({
          slug: r.slug,
          name: r.name,
          content: r.content,
          status: r.status === "success" ? "done" : "error",
        }))
      );
    } catch {
      setGeneratedDocs((prev) =>
        prev.map((d) => ({ ...d, status: "error" as const }))
      );
    }

    setGenerating(false);
  }, []);

  useEffect(() => {
    const paid = searchParams.get("paid");

    if (paid === "true") {
      // Returning from Stripe — restore state and generate
      try {
        const saved = sessionStorage.getItem(SESSION_KEY);
        if (saved) {
          const state = JSON.parse(saved);
          const restoredDocs = new Set<string>(state.selectedDocs || []);
          setSelectedIndustry(state.selectedIndustry || "restaurant");
          setSelectedState(state.selectedState || "");
          setBusinessDetails(state.businessDetails || {
            businessName: "",
            businessAddress: "",
            ownerName: "",
            employeeCount: "",
          });
          setSelectedDocs(restoredDocs);
          setStep(5);
          sessionStorage.removeItem(SESSION_KEY);
          // Auto-trigger generation
          handleGenerate(restoredDocs, state.businessDetails, state.selectedState || "");
          return;
        }
      } catch {
        // sessionStorage unavailable
      }
    }

    const docsParam = searchParams.get("docs");
    const stateParam = searchParams.get("state");
    const industryParam = searchParams.get("industry");
    if (industryParam) {
      setSelectedIndustry(industryParam);
    }
    if (stateParam) {
      setSelectedState(stateParam);
    }
    if (docsParam) {
      setSelectedDocs(new Set(docsParam.split(",")));
      setStep(stateParam ? 3 : 2);
    }
  }, [searchParams, handleGenerate]);

  // Get current industry definition
  const currentIndustry = industries.find((i) => i.slug === selectedIndustry);
  const industryFields: IndustryField[] = currentIndustry?.fields || [];

  // Get available docs based on selected state and industry
  const getAvailableDocs = () => {
    if (selectedState) {
      return allUSDocuments.filter(
        (d) =>
          d.industry === selectedIndustry &&
          (d.state === null || d.state === selectedState)
      );
    }
    return allUSDocuments.filter(
      (d) => d.industry === selectedIndustry && d.state === null
    );
  };

  const availableDocs = getAvailableDocs();

  const toggleDoc = (slug: string) => {
    const next = new Set(selectedDocs);
    if (next.has(slug)) {
      next.delete(slug);
      setSelectAll(false);
    } else {
      next.add(slug);
      if (next.size === availableDocs.length) setSelectAll(true);
    }
    setSelectedDocs(next);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedDocs(new Set());
      setSelectAll(false);
    } else {
      setSelectedDocs(new Set(availableDocs.map((d) => d.slug)));
      setSelectAll(true);
    }
  };

  const handleDownloadPDF = async () => {
    const docsToExport = generatedDocs
      .filter((d) => d.status === "done")
      .map((d) => ({ name: d.name, content: d.content }));

    try {
      const res = await fetch("/api/export/pdf/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documents: docsToExport,
          businessName: businessDetails.businessName,
        }),
      });

      if (!res.ok) return;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${businessDetails.businessName.replace(/\s+/g, "-").toLowerCase()}-us-documents.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // PDF download failed
    }
  };

  const handleDownloadWord = async () => {
    const docsToExport = generatedDocs
      .filter((d) => d.status === "done")
      .map((d) => ({ name: d.name, content: d.content }));

    try {
      const res = await fetch("/api/export/docx/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documents: docsToExport,
          businessName: businessDetails.businessName,
        }),
      });

      if (!res.ok) return;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${businessDetails.businessName.replace(/\s+/g, "-").toLowerCase()}-us-documents.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // Word download failed
    }
  };

  // Stripe checkout — temporarily disabled for testing
  // const handleCheckout = async () => { ... };

  // Validate core fields + required industry-specific fields
  const isStep3Valid =
    (businessDetails.businessName || "").trim() !== "" &&
    (businessDetails.businessAddress || "").trim() !== "" &&
    (businessDetails.ownerName || "").trim() !== "" &&
    (businessDetails.employeeCount || "").trim() !== "" &&
    industryFields.filter((f) => f.required).every((f) => (businessDetails[f.key] || "").trim() !== "");

  const stateName = US_STATES.find((s) => s.slug === selectedState)?.name;

  const priceLabel =
    selectedDocs.size >= availableDocs.length
      ? "$79"
      : `$${selectedDocs.size * 9}`;

  return (
    <div>
      {/* Step indicator */}
      <div className="mb-12 flex items-center gap-2 flex-wrap">
        {STEPS.map((label, i) => {
          const stepNum = (i + 1) as Step;
          const isActive = stepNum === step;
          const isDone = stepNum < step;
          return (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center font-mono text-xs font-bold ${
                  isActive
                    ? "bg-burgundy text-cotton"
                    : isDone
                    ? "bg-walnut text-cotton"
                    : "border border-fold bg-cotton text-graphite"
                }`}
              >
                {isDone ? "\u2713" : stepNum}
              </div>
              <span
                className={`hidden font-mono text-xs tracking-wider uppercase md:inline ${
                  isActive ? "text-walnut font-bold" : "text-graphite"
                }`}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div className="mx-2 h-px w-6 bg-fold" />
              )}
            </div>
          );
        })}
      </div>

      {/* Step 1: Industry */}
      {step === 1 && (
        <div>
          <h1 className="font-heading text-3xl text-walnut md:text-4xl">
            Choose your industry
          </h1>
          <p className="mt-3 font-body text-base font-light text-graphite">
            Select the type of business you run. We&apos;ll show you every
            federal and state document you need.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {industries.map((ind) => (
              <button
                key={ind.slug}
                disabled={!ind.active}
                onClick={() => {
                  setSelectedIndustry(ind.slug);
                  setStep(2);
                }}
                className={`border p-6 text-left transition-colors ${
                  ind.active
                    ? "border-fold bg-manila/40 hover:bg-manila hover:border-walnut cursor-pointer"
                    : "border-fold/50 bg-cotton/50 cursor-not-allowed opacity-50"
                }`}
              >
                <span className="font-heading text-lg text-walnut">
                  {ind.name}
                </span>
                {ind.active ? (
                  <p className="mt-1 font-mono text-xs text-burgundy">
                    Federal + state docs
                  </p>
                ) : (
                  <p className="mt-1 font-mono text-xs text-graphite">
                    Coming soon
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: State Selection */}
      {step === 2 && (
        <div>
          <h1 className="font-heading text-3xl text-walnut md:text-4xl">
            Select your state
          </h1>
          <p className="mt-3 font-body text-base font-light text-graphite">
            Choose your state for state-specific documents, or skip for federal-only documents.
          </p>
          {selectedDocs.size > 0 && !selectedState && (
            <div className="mt-4 border border-fold bg-manila/50 px-4 py-3">
              <p className="font-body text-sm text-walnut">
                Your selected document is a federal requirement. Select your state to also include state-specific documents, or skip for federal only.
              </p>
            </div>
          )}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {US_STATES.map((state) => (
              <button
                key={state.slug}
                onClick={() => {
                  setSelectedState(state.slug);
                  setStep(3);
                }}
                className={`border-2 p-6 text-left transition-colors cursor-pointer ${
                  selectedState === state.slug
                    ? "border-burgundy bg-manila"
                    : "border-fold bg-manila/40 hover:bg-manila hover:border-walnut"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-heading text-lg text-walnut">
                    {state.name}
                  </span>
                  <span className="font-mono text-sm font-bold text-graphite">
                    {state.abbreviation}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-burgundy">
                  Min wage: {state.minWage}
                </p>
              </button>
            ))}
          </div>
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="border border-fold px-6 py-3 font-body text-sm font-medium text-graphite transition-colors hover:bg-manila"
            >
              Back
            </button>
            <button
              onClick={() => {
                setSelectedState("");
                setStep(3);
              }}
              className="border-2 border-walnut px-6 py-3 font-body text-sm font-medium text-walnut transition-colors hover:bg-manila"
            >
              Skip — Federal Documents Only
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Business Details */}
      {step === 3 && (
        <div>
          <h1 className="font-heading text-3xl text-walnut md:text-4xl">
            Your business details
          </h1>
          <p className="mt-3 font-body text-base font-light text-graphite">
            These details will be woven into every document we generate.
            {stateName && ` Documents will reference ${stateName} state regulations.`}
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Core fields (same for all industries) */}
            {CORE_FIELDS.map((field) => (
              <div key={field.key}>
                <label className="block font-mono text-xs font-bold tracking-wider text-graphite uppercase">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={businessDetails[field.key] || ""}
                  onChange={(e) =>
                    setBusinessDetails((prev) => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }
                  className="mt-2 w-full border border-fold bg-cotton px-4 py-3 font-body text-sm text-walnut placeholder:text-graphite/50 focus:border-walnut focus:outline-none"
                />
              </div>
            ))}

            {/* Industry-specific fields (from industries.ts) */}
            {industryFields.map((field) => (
              <div key={field.key}>
                <label className="block font-mono text-xs font-bold tracking-wider text-graphite uppercase">
                  {field.label}
                  {!field.required && <span className="text-graphite/40 normal-case"> (optional)</span>}
                </label>
                {field.type === "select" && field.options ? (
                  <select
                    value={businessDetails[field.key] || field.options[0] || ""}
                    onChange={(e) =>
                      setBusinessDetails((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                    className="mt-2 w-full border border-fold bg-cotton px-4 py-3 font-body text-sm text-walnut focus:border-walnut focus:outline-none"
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={businessDetails[field.key] || ""}
                    onChange={(e) =>
                      setBusinessDetails((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                    className="mt-2 w-full border border-fold bg-cotton px-4 py-3 font-body text-sm text-walnut placeholder:text-graphite/50 focus:border-walnut focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setStep(2)}
              className="border border-fold px-6 py-3 font-body text-sm font-medium text-graphite transition-colors hover:bg-manila"
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              disabled={!isStep3Valid}
              className="bg-burgundy px-8 py-3 font-body text-sm font-medium text-cotton transition-colors hover:bg-burgundy-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Choose Documents
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Select Documents (with Accordions) */}
      {step === 4 && (
        <div>
          <h1 className="font-heading text-3xl text-walnut md:text-4xl">
            Select your documents
          </h1>
          <p className="mt-3 font-body text-base font-light text-graphite">
            Choose individual documents at $9 each, or select all {availableDocs.length} for $79.
            {stateName && ` Showing federal + ${stateName} state documents.`}
            {" "}Expand any document to see exactly what&apos;s included.
          </p>

          {!selectedState && (
            <div className="mt-4 border border-fold bg-manila/50 px-4 py-3">
              <p className="font-body text-sm text-walnut">
                Showing federal documents only.{" "}
                <button
                  onClick={() => setStep(2)}
                  className="font-medium text-burgundy underline underline-offset-2 hover:text-burgundy-hover"
                >
                  Select your state &rarr;
                </button>
                {" "}to add state-specific requirements.
              </p>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={toggleSelectAll}
              className={`border-2 px-6 py-3 font-body text-sm font-medium transition-colors ${
                selectAll
                  ? "border-burgundy bg-burgundy text-cotton"
                  : "border-burgundy text-burgundy hover:bg-burgundy hover:text-cotton"
              }`}
            >
              {selectAll
                ? `\u2713 All ${availableDocs.length} Documents Selected — $79`
                : `Select All ${availableDocs.length} Documents — $79`}
            </button>
          </div>

          <div className="mt-8 space-y-8">
            {/* Federal docs */}
            {(() => {
              const federalDocs = availableDocs.filter((d) => d.state === null);
              if (federalDocs.length === 0) return null;
              return (
                <div>
                  <h3 className="font-heading text-xl text-walnut">
                    Federal Requirements
                  </h3>
                  <div className="mt-3 space-y-1">
                    {federalDocs.map((doc) => (
                      <DocumentAccordion
                        key={doc.slug}
                        doc={doc}
                        isSelected={selectedDocs.has(doc.slug)}
                        onToggle={toggleDoc}
                      />
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* State-specific docs */}
            {stateName && (() => {
              const stateSpecificDocs = availableDocs.filter((d) => d.state !== null);
              if (stateSpecificDocs.length === 0) return null;
              return (
                <div>
                  <h3 className="font-heading text-xl text-walnut">
                    {stateName} State Documents
                  </h3>
                  <div className="mt-3 space-y-1">
                    {stateSpecificDocs.map((doc) => (
                      <DocumentAccordion
                        key={doc.slug}
                        doc={doc}
                        isSelected={selectedDocs.has(doc.slug)}
                        onToggle={toggleDoc}
                      />
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => setStep(3)}
              className="border border-fold px-6 py-3 font-body text-sm font-medium text-graphite transition-colors hover:bg-manila"
            >
              Back
            </button>
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm text-graphite">
                {selectedDocs.size} selected
                {" \u2014 "}
                <span className="font-bold text-burgundy">
                  {priceLabel}
                </span>
              </span>
              <button
                onClick={() => {
                  setStep(5);
                  handleGenerate(selectedDocs, businessDetails, selectedState);
                }}
                disabled={selectedDocs.size === 0}
                className="bg-burgundy px-8 py-3 font-body text-sm font-medium text-cotton transition-colors hover:bg-burgundy-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Documents
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Generate + Download */}
      {step === 5 && (
        <div>
          <h1 className="font-heading text-3xl text-walnut md:text-4xl">
            {generating
              ? "Generating your documents"
              : generatedDocs.some((d) => d.status === "done")
              ? "Your documents are ready"
              : "Preparing your documents"}
          </h1>
          <p className="mt-3 font-body text-base font-light text-graphite">
            {generating
              ? "Creating each document customized to your business. This takes 2\u20135 minutes."
              : generatedDocs.some((d) => d.status === "done")
              ? `${generatedDocs.filter((d) => d.status === "done").length} of ${generatedDocs.length} documents generated successfully.`
              : "Starting generation..."}
          </p>

          <div className="mt-8 space-y-2">
            {(generatedDocs.length > 0
              ? generatedDocs
              : Array.from(selectedDocs).map((slug) => ({
                  slug,
                  name: allUSDocuments.find((d) => d.slug === slug)?.name || slug,
                  content: "",
                  status: "pending" as const,
                }))
            ).map((doc) => (
              <div
                key={doc.slug}
                className={`flex items-center justify-between border px-4 py-3 ${
                  doc.status === "done"
                    ? "border-walnut/20 bg-manila/40"
                    : doc.status === "generating"
                    ? "border-burgundy/30 bg-manila/20"
                    : doc.status === "error"
                    ? "border-red-300 bg-red-50"
                    : "border-fold bg-cotton"
                }`}
              >
                <span className="font-body text-sm text-walnut">
                  {doc.name}
                </span>
                <span className="font-mono text-xs text-graphite">
                  {doc.status === "done" && "\u2713 Done"}
                  {doc.status === "generating" && "Generating..."}
                  {doc.status === "error" && "Error"}
                  {doc.status === "pending" && "Pending"}
                </span>
              </div>
            ))}
          </div>

          {!generating && generatedDocs.some((d) => d.status === "done") && (
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={handleDownloadPDF}
                className="bg-burgundy px-8 py-4 font-body text-base font-medium text-cotton transition-colors hover:bg-burgundy-hover"
              >
                Download PDF
              </button>
              <button
                onClick={handleDownloadWord}
                className="border-2 border-walnut px-8 py-4 font-body text-base font-medium text-walnut transition-colors hover:bg-manila"
              >
                Download Word
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
