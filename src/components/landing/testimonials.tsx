"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    content:
      "ReplyFlow has completely transformed how we handle customer feedback. What used to take our team hours now takes minutes. Our response rate went from 30% to 95%.",
    author: "Sarah Chen",
    role: "Owner, Chen's Kitchen",
    avatar: "SC",
    color: "from-blue-500 to-cyan-500",
    rating: 5,
  },
  {
    content:
      "As a property manager with 12 locations, I was drowning in reviews. ReplyFlow lets me maintain a personal touch across all my properties without hiring extra staff.",
    author: "Michael Torres",
    role: "Regional Manager, SunStay Hotels",
    avatar: "MT",
    color: "from-purple-500 to-pink-500",
    rating: 5,
  },
  {
    content:
      "The AI understands context better than I expected. It picked up on our casual, friendly brand voice immediately. Our customers can't tell the difference.",
    author: "Emily Watson",
    role: "Marketing Director, FreshBite Cafe",
    avatar: "EW",
    color: "from-orange-500 to-red-500",
    rating: 5,
  },
  {
    content:
      "I was skeptical at first, but the quality of responses is impressive. It's saved me at least 10 hours a week. Best investment I've made for my business.",
    author: "David Kim",
    role: "Owner, Kim's Auto Service",
    avatar: "DK",
    color: "from-green-500 to-emerald-500",
    rating: 5,
  },
  {
    content:
      "Our Google rating improved from 4.1 to 4.7 stars after we started responding to every review with ReplyFlow. Customers appreciate the quick, thoughtful responses.",
    author: "Jessica Martinez",
    role: "Franchise Owner, Pizza Palace",
    avatar: "JM",
    color: "from-indigo-500 to-violet-500",
    rating: 5,
  },
  {
    content:
      "The multi-language support is a game-changer for our international clientele. We can now respond in Spanish, French, and Mandarin just as easily as English.",
    author: "Robert Zhang",
    role: "CEO, Global Dental Group",
    avatar: "RZ",
    color: "from-rose-500 to-pink-500",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-gray-50/50 dark:bg-gray-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Loved by Business Owners
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Join thousands of businesses that trust ReplyFlow to manage their online reputation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <Quote className="w-8 h-8 text-gray-200 dark:text-gray-700 mb-3" />

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                &quot;{testimonial.content}&quot;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-semibold`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "2,000+", label: "Active Businesses" },
            { value: "500K+", label: "Responses Generated" },
            { value: "4.9/5", label: "Customer Rating" },
            { value: "10hrs", label: "Saved Per Week" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
