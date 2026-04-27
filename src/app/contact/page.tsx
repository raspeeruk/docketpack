"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          business: data.get("business"),
          topic: data.get("topic"),
          message: data.get("message"),
        }),
      });
      if (res.ok) {
        router.push("/contact/thanks");
      } else {
        const j = await res.json().catch(() => ({}));
        setError(j.error || "Something went wrong. Please try again.");
        setSubmitting(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-cotton">
      <section className="mx-auto max-w-3xl px-6 py-16 md:px-12">
        <p className="font-mono text-xs uppercase tracking-widest text-walnut/60 mb-3">
          Contact
        </p>
        <h1 className="font-heading text-4xl md:text-5xl text-walnut mb-4">
          Talk to us.
        </h1>
        <p className="font-body text-lg leading-relaxed text-walnut/70 max-w-2xl">
          Question about a document pack, custom requirements, partnership, or
          press request? Send a message — we respond within one business day.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24 md:px-12">
        <form onSubmit={handleSubmit} className="space-y-6 border-t-2 border-walnut pt-12">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block font-mono text-xs font-bold uppercase tracking-widest text-walnut mb-2">
                Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full bg-white border-2 border-walnut/20 px-4 py-3 font-body text-walnut focus:border-walnut focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-mono text-xs font-bold uppercase tracking-widest text-walnut mb-2">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-white border-2 border-walnut/20 px-4 py-3 font-body text-walnut focus:border-walnut focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="business" className="block font-mono text-xs font-bold uppercase tracking-widest text-walnut mb-2">
                Business name
              </label>
              <input
                id="business"
                name="business"
                type="text"
                className="w-full bg-white border-2 border-walnut/20 px-4 py-3 font-body text-walnut focus:border-walnut focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="topic" className="block font-mono text-xs font-bold uppercase tracking-widest text-walnut mb-2">
                Topic
              </label>
              <select
                id="topic"
                name="topic"
                className="w-full bg-white border-2 border-walnut/20 px-4 py-3 font-body text-walnut focus:border-walnut focus:outline-none"
              >
                <option value="general">General enquiry</option>
                <option value="sales">Sales / pricing</option>
                <option value="custom">Custom document pack</option>
                <option value="support">Existing order support</option>
                <option value="partnership">Partnership / press</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block font-mono text-xs font-bold uppercase tracking-widest text-walnut mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="w-full bg-white border-2 border-walnut/20 px-4 py-3 font-body text-walnut focus:border-walnut focus:outline-none"
            />
          </div>

          {error && (
            <p className="font-body text-sm text-red-700">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="bg-walnut px-8 py-3 font-mono text-xs font-bold uppercase tracking-widest text-cotton hover:bg-walnut/90 disabled:opacity-60 transition-colors"
          >
            {submitting ? "Sending..." : "Send message"}
          </button>
        </form>
      </section>
    </main>
  );
}
