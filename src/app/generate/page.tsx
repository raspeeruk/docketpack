import type { Metadata } from "next";
import { Suspense } from "react";
import { USFormWizard } from "./FormWizard";

export const metadata: Metadata = {
  title: "Generate Your Documents",
  description:
    "Generate compliance documents customised to your US business. Federal and state requirements. Enter your details, select documents, and download your complete pack.",
};

export default function GeneratePage() {
  return (
    <section className="bg-cotton py-12 md:py-16">
      <div className="mx-auto max-w-[1120px] px-6 md:px-12">
        <Suspense fallback={<div className="font-body text-graphite">Loading...</div>}>
          <USFormWizard />
        </Suspense>
      </div>
    </section>
  );
}
