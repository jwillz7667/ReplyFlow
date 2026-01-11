"use client";

import { useState, useEffect } from "react";
import { Check, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    key: "STARTER",
    name: "Starter",
    price: 29,
    description: "Perfect for small businesses",
    features: [
      "100 AI responses/month",
      "3 business profiles",
      "10 custom templates",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    key: "PRO",
    name: "Pro",
    price: 79,
    description: "For growing businesses",
    popular: true,
    features: [
      "500 AI responses/month",
      "10 business profiles",
      "50 custom templates",
      "Advanced analytics",
      "Priority support",
      "Custom brand voice",
    ],
  },
  {
    key: "AGENCY",
    name: "Agency",
    price: 199,
    description: "For agencies & enterprises",
    features: [
      "Unlimited AI responses",
      "Unlimited businesses",
      "Unlimited templates",
      "White-label options",
      "API access",
      "Dedicated support",
    ],
  },
];

interface SubscriptionInfo {
  plan: string;
  hasActiveSubscription: boolean;
  currentPeriodEnd: string | null;
  responsesUsed: number;
  responsesLimit: number;
}

export default function BillingPage() {
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await fetch("/api/subscription");
      const data = await response.json();
      setSubscription(data);
    } catch (error) {
      console.error("Failed to fetch subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planKey: string) => {
    setProcessingPlan(planKey);
    try {
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "checkout", plan: planKey }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to create checkout session");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      setProcessingPlan(null);
    }
  };

  const handleManageBilling = async () => {
    setProcessingPlan("manage");
    try {
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "portal" }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Failed to open billing portal");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      setProcessingPlan(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your subscription and billing information.
        </p>
      </div>

      {/* Current plan */}
      {subscription && (
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your current subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">
                      {subscription.plan === "FREE" ? "Free Plan" : `${subscription.plan} Plan`}
                    </h3>
                    {subscription.hasActiveSubscription && (
                      <Badge variant="success">Active</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {subscription.responsesLimit === -1
                      ? "Unlimited responses"
                      : `${subscription.responsesUsed} / ${subscription.responsesLimit} responses used`}
                  </p>
                  {subscription.currentPeriodEnd && (
                    <p className="text-sm text-gray-500">
                      Renews on {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              {subscription.hasActiveSubscription && (
                <Button
                  variant="outline"
                  onClick={handleManageBilling}
                  loading={processingPlan === "manage"}
                >
                  Manage Billing
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plans */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {subscription?.plan === "FREE" ? "Upgrade Your Plan" : "Available Plans"}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrentPlan = subscription?.plan === plan.key;

            return (
              <Card
                key={plan.key}
                className={`relative ${
                  plan.popular
                    ? "border-blue-500 shadow-lg"
                    : isCurrentPlan
                    ? "border-green-500"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500">
                      Most Popular
                    </Badge>
                  </div>
                )}
                {isCurrentPlan && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="success">Current Plan</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "gradient" : "outline"}
                    className="w-full"
                    disabled={isCurrentPlan || processingPlan !== null}
                    onClick={() => handleSubscribe(plan.key)}
                    loading={processingPlan === plan.key}
                  >
                    {isCurrentPlan ? "Current Plan" : "Subscribe"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Billing FAQ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium">Can I cancel anytime?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Yes, you can cancel your subscription at any time. You&apos;ll continue to have
              access until the end of your billing period.
            </p>
          </div>
          <div>
            <h4 className="font-medium">What happens to my data if I cancel?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your data is retained for 30 days after cancellation. You can export your
              response history before canceling.
            </p>
          </div>
          <div>
            <h4 className="font-medium">Do you offer refunds?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We offer a 30-day money-back guarantee. Contact support if you&apos;re not
              satisfied with your subscription.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
