export async function createCheckoutSession(
  type: "pack" | "individual",
  documentCount: number,
  origin: string,
  region: "uk" | "us" = "us"
): Promise<{ url: string } | { error: string }> {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return { error: "Stripe not configured" };
  }

  let priceId: string | undefined;

  if (region === "uk") {
    priceId =
      type === "pack"
        ? process.env.STRIPE_PACK_PRICE_ID
        : process.env.STRIPE_INDIVIDUAL_PRICE_ID;
  } else {
    priceId =
      type === "pack"
        ? (process.env.STRIPE_US_PACK_PRICE_ID || process.env.STRIPE_PACK_PRICE_ID)
        : (process.env.STRIPE_US_INDIVIDUAL_PRICE_ID || process.env.STRIPE_INDIVIDUAL_PRICE_ID);
  }

  if (!priceId) {
    return { error: "Price not configured" };
  }

  const successPath = region === "uk" ? "/uk/generate/?paid=true" : "/generate/?paid=true";
  const cancelPath = region === "uk" ? "/uk/pricing/" : "/pricing/";

  const params = new URLSearchParams();
  params.set("mode", "payment");
  params.set("line_items[0][price]", priceId);
  params.set(
    "line_items[0][quantity]",
    type === "individual" ? String(documentCount) : "1"
  );
  params.set("success_url", `${origin}${successPath}`);
  params.set("cancel_url", `${origin}${cancelPath}`);

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!res.ok) {
    return { error: "Checkout failed" };
  }

  const session = await res.json();
  return { url: session.url };
}
