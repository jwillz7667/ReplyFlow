"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does ReplyFlow generate responses?",
    answer:
      "ReplyFlow uses advanced AI (GPT-4) to analyze the sentiment, context, and specific details in each review. It then generates a personalized response that matches your brand voice and addresses the customer's feedback appropriately.",
  },
  {
    question: "Can I customize the tone of responses?",
    answer:
      "Yes! You can choose from preset tones (professional, friendly, empathetic, etc.) or create a custom brand voice. The AI learns your preferences and maintains consistency across all responses.",
  },
  {
    question: "Which review platforms are supported?",
    answer:
      "ReplyFlow works with all major platforms including Google Business, Yelp, Facebook, TripAdvisor, Trustpilot, G2, Capterra, and more. Simply copy the review text and paste it into ReplyFlow.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! Every new account gets 5 free responses to test the platform. When you're ready to upgrade, you'll get a 7-day free trial of any paid plan. No credit card required to start.",
  },
  {
    question: "Can I edit the AI-generated responses?",
    answer:
      "Absolutely! Every response can be edited before you use it. You can also regenerate with different tones or add custom instructions to get exactly what you need.",
  },
  {
    question: "How secure is my data?",
    answer:
      "We take security seriously. All data is encrypted at rest and in transit. We never share your data with third parties. Your reviews and responses are only accessible by your account.",
  },
  {
    question: "Can I manage multiple businesses?",
    answer:
      "Yes! Depending on your plan, you can manage 3 to unlimited business profiles. Each business can have its own brand voice, templates, and settings.",
  },
  {
    question: "What if I'm not satisfied?",
    answer:
      "We offer a 30-day money-back guarantee. If you're not completely satisfied with ReplyFlow, contact us within 30 days of your purchase for a full refund.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Everything you need to know about ReplyFlow.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Still have questions?{" "}
            <a
              href="mailto:support@replyflow.io"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
