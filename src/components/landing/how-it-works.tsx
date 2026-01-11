"use client";

import { motion } from "framer-motion";
import { ClipboardPaste, Sparkles, Copy, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: ClipboardPaste,
    title: "Paste Your Review",
    description:
      "Copy any customer review from Google, Yelp, or any platform and paste it into ReplyFlow.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Sparkles,
    title: "AI Generates Response",
    description:
      "Our AI analyzes sentiment, context, and your brand voice to craft the perfect response.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Copy,
    title: "Copy & Post",
    description:
      "Review, edit if needed, and copy your response. Paste it back to the review platform.",
    color: "from-orange-500 to-red-500",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Get professional review responses in three simple steps.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-center">
                  {/* Step number */}
                  <div className="relative inline-flex">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                    >
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-sm font-bold text-gray-900 dark:text-white">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>

                {/* Arrow between steps - mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-6">
                    <ArrowRight className="w-6 h-6 text-gray-400 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Demo video placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-500 p-1"
        >
          <div className="bg-gray-900 rounded-xl aspect-video flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/20 transition-colors">
                <div className="w-0 h-0 border-l-[30px] border-l-white border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent ml-2" />
              </div>
              <p className="text-white/80 text-lg">Watch ReplyFlow in action</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
