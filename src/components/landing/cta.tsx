"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600" />

          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Floating elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl" />

          <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6"
            >
              <Zap className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your
              <br />
              Review Management?
            </h2>

            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              Join thousands of businesses saving time and building better customer
              relationships with AI-powered review responses.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  size="xl"
                  className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#pricing">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  View Pricing
                </Button>
              </Link>
            </div>

            <p className="mt-6 text-sm text-blue-200">
              5 free responses included. No credit card required.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
