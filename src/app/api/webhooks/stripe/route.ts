import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe, getPlanFromPriceId, PLANS } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        if (!userId) {
          console.error("No user ID in checkout session");
          break;
        }

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const priceId = subscription.items.data[0]?.price.id;
        const planKey = getPlanFromPriceId(priceId);

        if (!planKey) {
          console.error("Unknown price ID:", priceId);
          break;
        }

        const plan = PLANS[planKey];

        // Update user
        await prisma.user.update({
          where: { id: userId },
          data: {
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
            stripePriceId: priceId,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            plan: planKey,
            responsesLimit: plan.limits.responses,
            responsesUsed: 0, // Reset on new subscription
          },
        });

        console.log(`User ${userId} subscribed to ${planKey}`);
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string;

        if (!subscriptionId) break;

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const priceId = subscription.items.data[0]?.price.id;
        const planKey = getPlanFromPriceId(priceId);

        // Find user by subscription ID
        const user = await prisma.user.findFirst({
          where: { stripeSubscriptionId: subscriptionId },
        });

        if (!user || !planKey) break;

        const plan = PLANS[planKey];

        // Reset monthly usage
        await prisma.user.update({
          where: { id: user.id },
          data: {
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            responsesUsed: 0,
            responsesLimit: plan.limits.responses,
          },
        });

        console.log(`Reset usage for user ${user.id}`);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const priceId = subscription.items.data[0]?.price.id;
        const planKey = getPlanFromPriceId(priceId);

        // Find user by subscription ID
        const user = await prisma.user.findFirst({
          where: { stripeSubscriptionId: subscription.id },
        });

        if (!user || !planKey) break;

        const plan = PLANS[planKey];

        // Update user plan
        await prisma.user.update({
          where: { id: user.id },
          data: {
            stripePriceId: priceId,
            plan: planKey,
            responsesLimit: plan.limits.responses,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });

        console.log(`Updated subscription for user ${user.id} to ${planKey}`);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        // Find user by subscription ID
        const user = await prisma.user.findFirst({
          where: { stripeSubscriptionId: subscription.id },
        });

        if (!user) break;

        // Downgrade to free plan
        await prisma.user.update({
          where: { id: user.id },
          data: {
            stripeSubscriptionId: null,
            stripePriceId: null,
            stripeCurrentPeriodEnd: null,
            plan: "FREE",
            responsesLimit: 5,
          },
        });

        console.log(`Cancelled subscription for user ${user.id}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
