import Anthropic from "@anthropic-ai/sdk";
import { getDocumentBySlug } from "./data";

interface BusinessDetails {
  businessName: string;
  businessAddress: string;
  ownerName: string;
  employeeCount: string;
  cuisineType: string;
  seatingCapacity: string;
  servesAlcohol: string;
}

interface GenerateResult {
  slug: string;
  name: string;
  content: string;
  status: "success" | "error";
}

export async function generateDocuments(
  businessDetails: BusinessDetails,
  documentSlugs: string[]
): Promise<GenerateResult[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return documentSlugs.map((slug) => ({
      slug,
      name: getDocumentBySlug(slug)?.name || slug,
      content: "",
      status: "error" as const,
    }));
  }

  const client = new Anthropic({ apiKey });
  const results: GenerateResult[] = [];

  // Process in batches of 5
  for (let i = 0; i < documentSlugs.length; i += 5) {
    const batch = documentSlugs.slice(i, i + 5);
    const batchResults = await Promise.all(
      batch.map(async (slug) => {
        const doc = getDocumentBySlug(slug);
        if (!doc) {
          return { slug, name: slug, content: "", status: "error" as const };
        }

        const prompt = doc.promptTemplate
          .replace(/\{\{businessName\}\}/g, businessDetails.businessName)
          .replace(/\{\{businessAddress\}\}/g, businessDetails.businessAddress)
          .replace(/\{\{ownerName\}\}/g, businessDetails.ownerName)
          .replace(/\{\{employeeCount\}\}/g, businessDetails.employeeCount)
          .replace(/\{\{cuisineType\}\}/g, businessDetails.cuisineType || "General")
          .replace(/\{\{seatingCapacity\}\}/g, businessDetails.seatingCapacity)
          .replace(/\{\{servesAlcohol\}\}/g, businessDetails.servesAlcohol);

        try {
          const message = await client.messages.create({
            model: "claude-sonnet-4-20250514",
            max_tokens: 4096,
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
          });

          const content =
            message.content[0].type === "text" ? message.content[0].text : "";

          return { slug, name: doc.name, content, status: "success" as const };
        } catch {
          return {
            slug,
            name: doc.name,
            content: "",
            status: "error" as const,
          };
        }
      })
    );
    results.push(...batchResults);
  }

  return results;
}
