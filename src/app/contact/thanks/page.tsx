import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Message received — DocketPack",
  description: "Thanks for getting in touch. We'll respond shortly.",
};

export default function ContactThanks() {
  return (
    <main className="bg-cotton">
      <section className="mx-auto max-w-3xl px-6 py-24 text-center md:px-12">
        <p className="font-mono text-xs uppercase tracking-widest text-walnut/60 mb-3">
          Stamped &middot; Received &middot; Filed
        </p>
        <h1 className="font-heading text-4xl md:text-5xl text-walnut mb-4">
          On our desk.
        </h1>
        <p className="font-body text-lg leading-relaxed text-walnut/70 max-w-xl mx-auto mb-12">
          We&apos;ve got your message. Most enquiries get a response within
          one business day.
        </p>
        <Link
          href="/"
          className="inline-block bg-walnut px-8 py-3 font-mono text-xs font-bold uppercase tracking-widest text-cotton hover:bg-walnut/90 transition-colors"
        >
          Back to home
        </Link>
      </section>
    </main>
  );
}
