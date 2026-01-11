import { NextResponse } from "next/server";
import { getUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { createCheckoutSession, createBillingPortalSession, PLANS } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action, plan } = await request.json();

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Handle different actions
    switch (action) {
      case "checkout": {
        // Create checkout session for new subscription
        if (!plan || !PLANS[plan as keyof typeof PLANS]) {
          return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
        }

        const selectedPlan = PLANS[plan as keyof typeof PLANS];
        const session = await createCheckoutSession({
          userId: dbUser.id,
          email: dbUser.email,
          priceId: selectedPlan.priceId,
          returnUrl: `${appUrl}/billing`,
        });

        return NextResponse.json({ url: session.url });
      }

      case "portal": {
        // Create billing portal session for existing customers
        if (!dbUser.stripeCustomerId) {
          return NextResponse.json(
            { error: "No active subscription found" },
            { status: 400 }
          );
        }

        const session = await createBillingPortalSession({
          customerId: dbUser.stripeCustomerId,
          returnUrl: `${appUrl}/billing`,
        });

        return NextResponse.json({ url: session.url });
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        plan: true,
        stripeSubscriptionId: true,
        stripeCurrentPeriodEnd: true,
        responsesUsed: true,
        responsesLimit: true,
      },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      plan: dbUser.plan,
      hasActiveSubscription: !!dbUser.stripeSubscriptionId,
      currentPeriodEnd: dbUser.stripeCurrentPeriodEnd,
      responsesUsed: dbUser.responsesUsed,
      responsesLimit: dbUser.responsesLimit,
    });
  } catch (error) {
    console.error("Get subscription error:", error);
    return NextResponse.json(
      { error: "Failed to get subscription info" },
      { status: 500 }
    );
  }
}
