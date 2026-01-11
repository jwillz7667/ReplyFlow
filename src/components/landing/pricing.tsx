"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: 29,
    description: "Perfect for small businesses just getting started.",
    features: [
      "100 AI responses/month",
      "3 business profiles",
      "10 custom templates",
      "Basic analytics",
      "Email support",
      "All review platforms",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: 79,
    description: "For growing businesses that need more power.",
    features: [
      "500 AI responses/month",
      "10 business profiles",
      "50 custom templates",
      "Advanced analytics",
      "Priority support",
      "Custom brand voice",
      "Response history export",
      "Team collaboration (3 users)",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Agency",
    price: 199,
    description: "For agencies managing multiple clients.",
    features: [
      "Unlimited AI responses",
      "Unlimited businesses",
      "Unlimited templates",
      "White-label options",
      "API access",
      "Dedicated support",
      "Custom integrations",
      "Team collaboration (10 users)",
      "Priority feature requests",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Start with a 7-day free trial. No credit card required. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl ${
                plan.popular
                  ? "bg-gradient-to-br from-blue-600 to-cyan-500 p-[2px]"
                  : "border border-gray-200 dark:border-gray-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full text-white text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`h-full rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-white dark:bg-gray-900"
                    : "bg-white dark:bg-gray-800"
                }`}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {plan.description}
                </p>

                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${plan.price}
                  </span>
                  <span className="ml-2 text-gray-500 dark:text-gray-400">/month</span>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/signup" className="block mt-8">
                  <Button
                    variant={plan.popular ? "gradient" : "outline"}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Money-back guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-50 dark:bg-green-900/20 rounded-full">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-green-800 dark:text-green-300 font-medium">
              30-day money-back guarantee. No questions asked.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
