"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviewExamples = [
  {
    review: "The food was cold and service was slow. Very disappointed.",
    response: "Thank you for your feedback. We sincerely apologize that your experience didn't meet our standards. We'd love the opportunity to make it right - please reach out to us directly so we can address your concerns.",
    rating: 2,
  },
  {
    review: "Amazing experience! The staff went above and beyond.",
    response: "Thank you so much for your wonderful review! We're thrilled that our team could provide you with an exceptional experience. Comments like yours inspire us to keep raising the bar. We can't wait to welcome you back!",
    rating: 5,
  },
  {
    review: "Good product but shipping took longer than expected.",
    response: "Thank you for your honest feedback. While we're glad you enjoyed the product, we understand the frustration with shipping delays. We're working to improve our delivery times and appreciate your patience.",
    rating: 3,
  },
];

export function Hero() {
  const [currentExample, setCurrentExample] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayedResponse, setDisplayedResponse] = useState("");

  useEffect(() => {
    const example = reviewExamples[currentExample];
    let charIndex = 0;
    setIsTyping(true);
    setDisplayedResponse("");

    const typingInterval = setInterval(() => {
      if (charIndex <= example.response.length) {
        setDisplayedResponse(example.response.slice(0, charIndex));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentExample((prev) => (prev + 1) % reviewExamples.length);
        }, 3000);
      }
    }, 20);

    return () => clearInterval(typingInterval);
  }, [currentExample]);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden gradient-mesh">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-current" />
              Trusted by 2,000+ businesses
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Turn Reviews Into
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Customer Connections
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
              Generate personalized, professional responses to customer reviews in seconds.
              Save hours every week while building stronger relationships with your customers.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/signup">
                <Button variant="gradient" size="xl" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                5 free responses
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Cancel anytime
              </div>
            </div>
          </motion.div>

          {/* Right content - Demo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-card rounded-2xl p-6 space-y-6">
              {/* Review card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-semibold">
                    JD
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">John Doe</p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < reviewExamples[currentExample].rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  &quot;{reviewExamples[currentExample].review}&quot;
                </p>
              </div>

              {/* Generated response */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                    <span className="text-xs text-white font-bold">AI</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Generated Response
                  </span>
                  {isTyping && (
                    <span className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                      Generating...
                    </span>
                  )}
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                  <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                    {displayedResponse}
                    {isTyping && (
                      <span className="inline-block w-0.5 h-4 bg-blue-600 ml-0.5 animate-pulse" />
                    )}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <Button variant="gradient" size="sm" className="flex-1">
                  Copy Response
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Regenerate
                </Button>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">Response Ready</p>
                  <p className="text-xs text-gray-500">In 2.3 seconds</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["bg-blue-500", "bg-purple-500", "bg-pink-500"].map((color, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full ${color} border-2 border-white`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">500+</span> responses today
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
