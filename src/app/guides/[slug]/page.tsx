import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RubberStampCTA } from "@/components/RubberStampCTA";
import { getGuideBySlug, getGuidesByRegion } from "@/lib/data";

export function generateStaticParams() {
  return getGuidesByRegion("us").map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide || guide.region !== "us") return { title: "Not Found" };
  return {
    title: guide.seoTitle,
    description: guide.seoDescription,
    openGraph: { title: guide.seoTitle, description: guide.seoDescription },
  };
}

export default async function USGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide || guide.region !== "us") notFound();

  const contentHtml = guide.content
    .split("\n\n")
    .map((block) => {
      if (block.startsWith("## ")) {
        return `<h2 class="mt-10 font-heading text-2xl text-walnut">${block.slice(3)}</h2>`;
      }
      if (block.startsWith("### ")) {
        return `<h3 class="mt-8 font-heading text-xl text-walnut">${block.slice(4)}</h3>`;
      }
      if (block.startsWith("- ")) {
        const items = block
          .split("\n")
          .filter((l) => l.startsWith("- "))
          .map(
            (l) =>
              `<li class="flex gap-3"><span class="mt-1.5 h-3 w-3 flex-shrink-0 border border-fold bg-cotton"></span><span>${l.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</span></li>`
          )
          .join("");
        return `<ul class="mt-4 space-y-2 font-body text-sm text-walnut">${items}</ul>`;
      }
      if (block.match(/^\d+\./)) {
        const items = block
          .split("\n")
          .filter((l) => l.match(/^\d+\./))
          .map(
            (l) =>
              `<li class="font-body text-sm text-walnut">${l.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`
          )
          .join("");
        return `<ol class="mt-4 space-y-2 list-decimal list-inside">${items}</ol>`;
      }
      return `<p class="mt-4 font-body text-base font-light text-graphite leading-relaxed">${block.replace(/\*\*(.*?)\*\*/g, '<strong class="font-medium text-walnut">$1</strong>')}</p>`;
    })
    .join("");

  return (
    <>
      <section className="bg-cotton py-12 md:py-16">
        <div className="mx-auto max-w-[800px] px-6 md:px-12">
          <span className="font-mono text-xs font-bold tracking-wider text-burgundy uppercase">
            Guide
          </span>
          <h1 className="mt-3 font-heading text-3xl text-walnut md:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-4 font-body text-base font-light text-graphite leading-relaxed">
            {guide.description}
          </p>
        </div>
      </section>

      <section className="border-t-2 border-dashed border-fold bg-cotton py-12 md:py-16">
        <div
          className="mx-auto max-w-[800px] px-6 md:px-12"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </section>

      <section className="border-t-2 border-walnut bg-manila/30 py-12 md:py-16">
        <div className="mx-auto max-w-[800px] px-6 text-center md:px-12">
          <h2 className="font-heading text-2xl text-walnut">
            Generate your complete document pack
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-sm font-light text-graphite">
            Federal + state documents customised to your restaurant. Ready in minutes.
          </p>
          <div className="mt-8">
            <RubberStampCTA href="/generate/" size="large">
              Generate Your Documents — $79
            </RubberStampCTA>
          </div>
        </div>
      </section>
    </>
  );
}
