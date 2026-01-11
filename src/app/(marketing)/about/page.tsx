import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Zap, Users, Award, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About ReplyFlow | AI Review Response Platform for Businesses",
  description:
    "Learn about ReplyFlow's mission to help businesses build stronger customer relationships through AI-powered review responses. Meet our team and discover our story.",
  keywords: [
    "about ReplyFlow",
    "AI review response company",
    "customer review management",
    "business reputation software",
    "review response automation",
  ],
  openGraph: {
    title: "About ReplyFlow | Our Mission & Team",
    description:
      "Discover how ReplyFlow helps businesses save time and build customer loyalty with AI-powered review responses.",
    url: "https://replyflow.io/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About ReplyFlow",
    description: "Our mission to transform business-customer relationships",
  },
  alternates: {
    canonical: "https://replyflow.io/about",
  },
};

const values = [
  {
    icon: Target,
    title: "Customer First",
    description:
      "Every feature we build starts with one question: How does this help our customers succeed?",
  },
  {
    icon: Heart,
    title: "Authenticity",
    description:
      "We believe AI should enhance human connection, not replace it. Every response should feel genuine.",
  },
  {
    icon: Zap,
    title: "Speed & Quality",
    description:
      "Fast responses matter, but quality matters more. We never sacrifice one for the other.",
  },
  {
    icon: Users,
    title: "Small Business Champions",
    description:
      "We're passionate about leveling the playing field for small businesses competing with big brands.",
  },
];

const stats = [
  { value: "2M+", label: "Responses Generated" },
  { value: "10K+", label: "Active Businesses" },
  { value: "4.9/5", label: "Customer Rating" },
  { value: "50+", label: "Countries Served" },
];

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former restaurant owner who experienced the review management struggle firsthand.",
    initials: "SC",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Michael Torres",
    role: "CTO & Co-Founder",
    bio: "AI researcher with 10+ years experience in natural language processing.",
    initials: "MT",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Emily Watson",
    role: "Head of Product",
    bio: "Product leader focused on creating delightful experiences for small business owners.",
    initials: "EW",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "David Kim",
    role: "Head of Customer Success",
    bio: "Dedicated to ensuring every customer achieves their reputation management goals.",
    initials: "DK",
    color: "from-green-500 to-emerald-500",
  },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ReplyFlow",
    url: "https://replyflow.io",
    logo: "https://replyflow.io/logo.png",
    description:
      "AI-powered review response platform helping businesses build stronger customer relationships.",
    foundingDate: "2024",
    founders: [
      { "@type": "Person", name: "Sarah Chen" },
      { "@type": "Person", name: "Michael Torres" },
    ],
    sameAs: [
      "https://twitter.com/replyflow",
      "https://linkedin.com/company/replyflow",
      "https://github.com/replyflow",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "About" }]} />

          {/* Hero Section */}
          <header className="max-w-3xl mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Helping Businesses Build
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Lasting Customer Relationships
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We started ReplyFlow because we believe every business deserves the tools
              to respond to customers thoughtfully and efficiently, regardless of size.
            </p>
          </header>

          {/* Our Story */}
          <section className="mb-20" aria-labelledby="our-story">
            <h2
              id="our-story"
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Our Story
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                ReplyFlow was born from frustration. Our co-founder Sarah owned a small
                restaurant and spent hours each week responding to online reviews. She
                knew these responses were crucial for her reputation, but the time
                investment was unsustainable.
              </p>
              <p>
                She teamed up with Michael, an AI researcher, to build a solution. The
                result was ReplyFlow: an AI-powered platform that generates personalized,
                professional responses in seconds while maintaining the authentic voice
                that customers expect.
              </p>
              <p>
                Today, ReplyFlow helps thousands of businesses across 50+ countries save
                time and build stronger customer relationships. But our mission remains
                the same: empower every business to respond to every customer.
              </p>
            </div>
          </section>

          {/* Stats */}
          <section className="mb-20 py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl" aria-labelledby="impact">
            <h2 id="impact" className="sr-only">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Values */}
          <section className="mb-20" aria-labelledby="values">
            <h2
              id="values"
              className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
            >
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <Card key={value.title} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
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

          {/* Team */}
          <section className="mb-20" aria-labelledby="team">
            <h2
              id="team"
              className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
            >
              Meet the Team
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <Card key={member.name}>
                  <CardContent className="pt-6 text-center">
                    <div
                      className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold`}
                    >
                      {member.initials}
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              Join thousands of businesses using ReplyFlow to build better customer
              relationships.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/signup">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
