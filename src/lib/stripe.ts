import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export const PLANS = {
  STARTER: {
    name: "Starter",
    description: "Perfect for small businesses",
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    price: 29,
    features: [
      "100 AI responses/month",
      "3 business profiles",
      "10 custom templates",
      "Basic analytics",
      "Email support",
    ],
    limits: {
      responses: 100,
      businesses: 3,
      templates: 10,
    },
  },
  PRO: {
    name: "Pro",
    description: "For growing businesses",
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    price: 79,
    popular: true,
    features: [
      "500 AI responses/month",
      "10 business profiles",
      "50 custom templates",
      "Advanced analytics",
      "Priority support",
      "Custom brand voice",
      "Response history export",
    ],
    limits: {
      responses: 500,
      businesses: 10,
      templates: 50,
    },
  },
  AGENCY: {
    name: "Agency",
    description: "For agencies & enterprises",
    priceId: process.env.STRIPE_AGENCY_PRICE_ID!,
    price: 199,
    features: [
      "Unlimited AI responses",
      "Unlimited business profiles",
      "Unlimited templates",
      "White-label options",
      "API access",
      "Dedicated support",
      "Custom integrations",
      "Team collaboration",
    ],
    limits: {
      responses: -1,
      businesses: -1,
      templates: -1,
    },
  },
} as const;

export type PlanKey = keyof typeof PLANS;

export async function createCheckoutSession({
  userId,
  email,
  priceId,
  returnUrl,
}: {
  userId: string;
  email: string;
  priceId: string;
  returnUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    client_reference_id: userId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${returnUrl}?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${returnUrl}?canceled=true`,
    subscription_data: {
      metadata: {
        userId,
      },
    },
    metadata: {
      userId,
    },
  });

  return session;
}

export async function createBillingPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session;
}

export async function getSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return subscription;
}

export async function cancelSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
  return subscription;
}

export async function reactivateSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  });
  return subscription;
}

export function getPlanFromPriceId(priceId: string): PlanKey | null {
  for (const [key, plan] of Object.entries(PLANS)) {
    if (plan.priceId === priceId) {
      return key as PlanKey;
    }
  }
  return null;
}
