"use client";

import { useState, type FormEvent } from "react";

export function RequestForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("form-name", "document-request");

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-10 border-2 border-walnut bg-manila/50 p-8">
        <h2 className="font-heading text-2xl text-walnut">Request received</h2>
        <p className="mt-3 font-body text-base font-light text-graphite">
          Thanks for letting us know what you need. We&apos;ll prioritize adding
          this document and email you when it&apos;s available.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 border border-fold px-6 py-3 font-body text-sm font-medium text-graphite transition-colors hover:bg-manila"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
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
            <option value="salon">Salon / Beauty</option>
            <option value="gym">Gym / Fitness</option>
            <option value="food-truck">Food Truck</option>
            <option value="retail">Retail</option>
            <option value="tattoo">Tattoo / Piercing</option>
            <option value="construction">Construction</option>
            <option value="healthcare">Healthcare</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="childcare">Childcare / Education</option>
            <option value="professional-services">Professional Services</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="state"
            className="block font-mono text-xs font-bold tracking-wider text-graphite uppercase"
          >
            State <span className="text-graphite/40 normal-case">(optional)</span>
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

      {status === "error" && (
        <p className="font-body text-sm text-burgundy">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-burgundy px-8 py-4 font-body text-base font-medium text-cotton transition-colors hover:bg-burgundy-hover disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}
