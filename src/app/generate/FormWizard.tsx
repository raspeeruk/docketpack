"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { usDocuments } from "@/data/us-documents";
import { industries } from "@/data/industries";
import { categories } from "@/data/categories";
import { US_STATES } from "@/data/us-states";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface BusinessDetails {
  businessName: string;
  businessAddress: string;
  ownerName: string;
  employeeCount: string;
  cuisineType: string;
  seatingCapacity: string;
  servesAlcohol: string;
}

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
  "Download",
] as const;

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
    cuisineType: "",
    seatingCapacity: "",
    servesAlcohol: "Yes",
  });
  const [selectedDocs, setSelectedDocs] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [generatedDocs, setGeneratedDocs] = useState<GeneratedDoc[]>([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const docsParam = searchParams.get("docs");
    if (docsParam) {
      setSelectedDocs(new Set(docsParam.split(",")));
      setStep(3);
    }
    const industryParam = searchParams.get("industry");
    if (industryParam) {
      setSelectedIndustry(industryParam);
    }
    const stateParam = searchParams.get("state");
    if (stateParam) {
      setSelectedState(stateParam);
    }
  }, [searchParams]);

  // Get available docs based on selected state
  const getAvailableDocs = () => {
    if (selectedState) {
      // Federal + state-specific
      return usDocuments.filter(
        (d) =>
          d.industry === selectedIndustry &&
          (d.state === null || d.state === selectedState)
      );
    }
    // Federal only
    return usDocuments.filter(
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

  const handleGenerate = async () => {
    setGenerating(true);
    const docs = Array.from(selectedDocs).map((slug) => ({
      slug,
      name: usDocuments.find((d) => d.slug === slug)?.name || slug,
      content: "",
      status: "pending" as const,
    }));
    setGeneratedDocs(docs);

    try {
      const res = await fetch("/api/generate/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessDetails,
          documents: Array.from(selectedDocs),
          region: "us",
          state: selectedState || null,
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
    setStep(6);
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

  const handleCheckout = async () => {
    const type = selectedDocs.size >= availableDocs.length ? "pack" : "individual";
    try {
      const res = await fetch("/api/checkout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, documentCount: selectedDocs.size, region: "us" }),
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      // Checkout failed
    }
  };

  const isStep3Valid =
    businessDetails.businessName.trim() !== "" &&
    businessDetails.businessAddress.trim() !== "" &&
    businessDetails.ownerName.trim() !== "" &&
    businessDetails.employeeCount.trim() !== "" &&
    businessDetails.seatingCapacity.trim() !== "";

  const stateName = US_STATES.find((s) => s.slug === selectedState)?.name;

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
            {[
              { key: "businessName", label: "Business name", placeholder: "e.g. The Corner Kitchen", type: "text" },
              { key: "businessAddress", label: "Business address", placeholder: "e.g. 123 Main St, Los Angeles, CA 90001", type: "text" },
              { key: "ownerName", label: "Owner / responsible person", placeholder: "e.g. John Smith", type: "text" },
              { key: "employeeCount", label: "Number of employees", placeholder: "e.g. 15", type: "number" },
              { key: "cuisineType", label: "Cuisine type", placeholder: "e.g. American, Mexican, Italian", type: "text" },
              { key: "seatingCapacity", label: "Seating capacity", placeholder: "e.g. 80", type: "number" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block font-mono text-xs font-bold tracking-wider text-graphite uppercase">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={businessDetails[field.key as keyof BusinessDetails]}
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
            <div>
              <label className="block font-mono text-xs font-bold tracking-wider text-graphite uppercase">
                Serves alcohol
              </label>
              <select
                value={businessDetails.servesAlcohol}
                onChange={(e) =>
                  setBusinessDetails((prev) => ({
                    ...prev,
                    servesAlcohol: e.target.value,
                  }))
                }
                className="mt-2 w-full border border-fold bg-cotton px-4 py-3 font-body text-sm text-walnut focus:border-walnut focus:outline-none"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
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

      {/* Step 4: Select Documents */}
      {step === 4 && (
        <div>
          <h1 className="font-heading text-3xl text-walnut md:text-4xl">
            Select your documents
          </h1>
          <p className="mt-3 font-body text-base font-light text-graphite">
            Choose individual documents at $9 each, or select all {availableDocs.length} for $79.
            {stateName && ` Showing federal + ${stateName} state documents.`}
          </p>

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
                      <label
                        key={doc.slug}
                        className={`flex cursor-pointer items-center gap-4 border px-4 py-3 transition-colors ${
                          selectedDocs.has(doc.slug)
                            ? "border-burgundy/30 bg-manila/60"
                            : "border-fold bg-cotton hover:bg-manila/30"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedDocs.has(doc.slug)}
                          onChange={() => toggleDoc(doc.slug)}
                          className="h-4 w-4 accent-burgundy"
                        />
                        <span className="flex-1 font-body text-sm text-walnut">
                          {doc.name}
                        </span>
                        {doc.required && (
                          <span className="font-mono text-[10px] text-burgundy uppercase">
                            Required
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* State-specific docs by category */}
            {stateName && (() => {
              const stateSpecificDocs = availableDocs.filter((d) => d.state !== null);
              if (stateSpecificDocs.length === 0) return null;
              const stateCats = [...new Set(stateSpecificDocs.map((d) => d.category))];
              return (
                <div>
                  <h3 className="font-heading text-xl text-walnut">
                    {stateName} State Documents
                  </h3>
                  <div className="mt-3 space-y-1">
                    {stateSpecificDocs.map((doc) => (
                      <label
                        key={doc.slug}
                        className={`flex cursor-pointer items-center gap-4 border px-4 py-3 transition-colors ${
                          selectedDocs.has(doc.slug)
                            ? "border-burgundy/30 bg-manila/60"
                            : "border-fold bg-cotton hover:bg-manila/30"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedDocs.has(doc.slug)}
                          onChange={() => toggleDoc(doc.slug)}
                          className="h-4 w-4 accent-burgundy"
                        />
                        <span className="flex-1 font-body text-sm text-walnut">
                          {doc.name}
                        </span>
                        {doc.required && (
                          <span className="font-mono text-[10px] text-burgundy uppercase">
                            Required
                          </span>
                        )}
                      </label>
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
                  {selectedDocs.size >= availableDocs.length
                    ? "$79"
                    : `$${selectedDocs.size * 9}`}
                </span>
              </span>
              <button
                onClick={() => setStep(5)}
                disabled={selectedDocs.size === 0}
                className="bg-burgundy px-8 py-3 font-body text-sm font-medium text-cotton transition-colors hover:bg-burgundy-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Documents
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Generate */}
      {step === 5 && (
        <div>
          <h1 className="font-heading text-3xl text-walnut md:text-4xl">
            Generating your documents
          </h1>
          <p className="mt-3 font-body text-base font-light text-graphite">
            {generating
              ? "Creating each document customised to your business. This takes 2-5 minutes."
              : "Ready to generate. Click below to start."}
          </p>

          <div className="mt-8 space-y-2">
            {(generatedDocs.length > 0 ? generatedDocs : Array.from(selectedDocs).map((slug) => ({
              slug,
              name: usDocuments.find((d) => d.slug === slug)?.name || slug,
              content: "",
              status: "pending" as const,
            }))).map((doc) => (
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

          <div className="mt-8 flex gap-4">
            {!generating && generatedDocs.length === 0 && (
              <>
                <button
                  onClick={() => setStep(4)}
                  className="border border-fold px-6 py-3 font-body text-sm font-medium text-graphite transition-colors hover:bg-manila"
                >
                  Back
                </button>
                <button
                  onClick={handleGenerate}
                  className="bg-burgundy px-8 py-3 font-body text-sm font-medium text-cotton transition-colors hover:bg-burgundy-hover"
                >
                  Start Generation
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Step 6: Download */}
      {step === 6 && (
        <div>
          <h1 className="font-heading text-3xl text-walnut md:text-4xl">
            Your documents are ready
          </h1>
          <p className="mt-3 font-body text-base font-light text-graphite">
            {generatedDocs.filter((d) => d.status === "done").length} of{" "}
            {generatedDocs.length} documents generated successfully.
          </p>

          <div className="mt-8 space-y-2">
            {generatedDocs.map((doc) => (
              <div
                key={doc.slug}
                className={`border px-4 py-3 ${
                  doc.status === "done"
                    ? "border-walnut/20 bg-manila/40"
                    : "border-red-300 bg-red-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-walnut">
                    {doc.name}
                  </span>
                  <span className="font-mono text-xs text-graphite">
                    {doc.status === "done" ? "\u2713 Ready" : "Failed"}
                  </span>
                </div>
                {doc.status === "done" && doc.content && (
                  <div className="mt-3 max-h-32 overflow-hidden border-t border-fold pt-3">
                    <p className="font-body text-xs text-graphite line-clamp-4 blur-sm">
                      {doc.content.slice(0, 300)}...
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={handleCheckout}
              className="bg-burgundy px-8 py-4 font-body text-base font-medium text-cotton transition-colors hover:bg-burgundy-hover"
            >
              Pay &amp; Download — {selectedDocs.size >= availableDocs.length ? "$79" : `$${selectedDocs.size * 9}`}
            </button>
            <button
              onClick={handleDownloadPDF}
              className="border-2 border-walnut px-8 py-4 font-body text-base font-medium text-walnut transition-colors hover:bg-manila"
            >
              Download Preview PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
