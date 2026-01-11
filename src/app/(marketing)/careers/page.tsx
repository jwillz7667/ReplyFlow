import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Briefcase,
  Clock,
  Heart,
  Zap,
  Users,
  Globe,
  Coffee,
  Laptop,
  Plane,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Careers at ReplyFlow | Join Our Team",
  description:
    "Join ReplyFlow and help businesses build better customer relationships. View open positions in engineering, product, marketing, and more.",
  keywords: [
    "ReplyFlow careers",
    "ReplyFlow jobs",
    "startup jobs",
    "AI jobs",
    "SaaS careers",
    "remote jobs",
  ],
  openGraph: {
    title: "Careers at ReplyFlow | Join Our Growing Team",
    description: "Help us transform how businesses connect with customers",
    url: "https://replyflow.io/careers",
    type: "website",
  },
  alternates: {
    canonical: "https://replyflow.io/careers",
  },
};

const benefits = [
  {
    icon: Laptop,
    title: "Remote-First",
    description: "Work from anywhere in the world. We're fully distributed.",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health, dental, and vision coverage.",
  },
  {
    icon: Plane,
    title: "Unlimited PTO",
    description: "Take the time you need to recharge and do your best work.",
  },
  {
    icon: Zap,
    title: "Equity",
    description: "Meaningful equity stake - we succeed together.",
  },
  {
    icon: Coffee,
    title: "Home Office",
    description: "$1,000 stipend to set up your perfect workspace.",
  },
  {
    icon: Users,
    title: "Team Retreats",
    description: "Annual company gatherings in amazing locations.",
  },
];

const openPositions = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote (US/Europe)",
    type: "Full-time",
    description:
      "Build and scale our core platform using Next.js, TypeScript, and PostgreSQL.",
  },
  {
    title: "Machine Learning Engineer",
    department: "AI/ML",
    location: "Remote (Worldwide)",
    type: "Full-time",
    description:
      "Improve our AI response generation and develop new NLP features.",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote (US)",
    type: "Full-time",
    description:
      "Design intuitive experiences that help businesses manage their reputation.",
  },
  {
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "Remote (US)",
    type: "Full-time",
    description:
      "Drive customer acquisition through SEO, content, and paid channels.",
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote (US/Europe)",
    type: "Full-time",
    description:
      "Help our customers succeed and maximize the value of ReplyFlow.",
  },
];

const values = [
  {
    title: "Move Fast, Stay Focused",
    description: "We ship quickly but never compromise on what matters.",
  },
  {
    title: "Customer Obsession",
    description: "Every decision starts with: How does this help our customers?",
  },
  {
    title: "Radical Transparency",
    description: "We share information openly and communicate honestly.",
  },
  {
    title: "Own the Outcome",
    description: "We take responsibility and see things through to completion.",
  },
];

export default function CareersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    hiringOrganization: {
      "@type": "Organization",
      name: "ReplyFlow",
      sameAs: "https://replyflow.io",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "US",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Careers" }]} />

          {/* Hero */}
          <header className="max-w-3xl mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Join Us in Transforming
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Customer Relationships
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We're building the future of business-customer communication. Join a
              passionate team working on challenging problems with real impact.
            </p>
          </header>

          {/* Values */}
          <section className="mb-16" aria-labelledby="our-values">
            <h2
              id="our-values"
              className="text-2xl font-bold text-gray-900 dark:text-white mb-8"
            >
              What We Believe
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <Card key={value.title}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-16 py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl px-8" aria-labelledby="benefits">
            <h2
              id="benefits"
              className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
            >
              Why Work at ReplyFlow?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Open Positions */}
          <section aria-labelledby="open-positions">
            <h2
              id="open-positions"
              className="text-2xl font-bold text-gray-900 dark:text-white mb-8"
            >
              Open Positions
            </h2>
            <div className="space-y-4">
              {openPositions.map((position) => (
                <Card
                  key={position.title}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {position.title}
                          </h3>
                          <Badge variant="secondary">{position.department}</Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                          {position.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {position.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {position.type}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" className="flex-shrink-0">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* No Position CTA */}
          <section className="mt-16 text-center py-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl text-white">
            <Globe className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-bold mb-3">Don't See Your Role?</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              We're always looking for talented people. Send us your resume and tell
              us how you can contribute.
            </p>
            <Link href="/contact">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                Get in Touch
              </Button>
            </Link>
          </section>
        </div>
      </article>
    </>
  );
}
