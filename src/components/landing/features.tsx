"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Brain,
  Globe,
  Sparkles,
  Clock,
  Shield,
  Users,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Responses",
    description:
      "Our advanced AI understands context, sentiment, and nuance to craft perfect responses every time.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Clock,
    title: "Save 10+ Hours Weekly",
    description:
      "What used to take 15 minutes per review now takes seconds. Focus on running your business.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Sparkles,
    title: "Custom Brand Voice",
    description:
      "Train the AI to match your unique tone - professional, friendly, casual, or anything in between.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Globe,
    title: "Multi-Platform Support",
    description:
      "Works seamlessly with Google, Yelp, Facebook, TripAdvisor, and more review platforms.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Multi-Business Management",
    description:
      "Manage multiple business locations from a single dashboard with unique settings for each.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track response rates, sentiment trends, and customer satisfaction metrics over time.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Your data is encrypted at rest and in transit. SOC 2 compliant infrastructure.",
    color: "from-slate-500 to-gray-500",
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description:
      "Get professional responses in under 3 seconds. No more staring at blank screens.",
    color: "from-yellow-500 to-orange-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Master Review Management
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Powerful features designed to save you time and improve your online reputation.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-transparent"
            >
              {/* Gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />

              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
