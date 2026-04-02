import type { Metadata } from "next";
import { Suspense } from "react";
import { UKFormWizard } from "./FormWizard";

export const metadata: Metadata = {
  title: "Generate UK Documents",
  description:
    "Generate compliance documents customised to your UK business. Enter your details, select documents, and download your complete pack.",
};

export default function UKGeneratePage() {
  return (
    <section className="bg-cotton py-12 md:py-16">
      <div className="mx-auto max-w-[1120px] px-6 md:px-12">
        <Suspense fallback={<div className="font-body text-graphite">Loading...</div>}>
          <UKFormWizard />
        </Suspense>
      </div>
    </section>
  );
}
