import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  BookOpen,
  CreditCard,
  Settings,
  Zap,
  MessageSquare,
  Users,
  Shield,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Help Center | ReplyFlow Support",
  description:
    "Get help with ReplyFlow. Find answers to common questions, tutorials, and contact our support team.",
  keywords: [
    "ReplyFlow help",
    "ReplyFlow support",
    "FAQ",
    "customer support",
    "how to use ReplyFlow",
  ],
  openGraph: {
    title: "Help Center | ReplyFlow",
    description: "Find answers and get support",
    url: "https://replyflow.io/help",
    type: "website",
  },
  alternates: {
    canonical: "https://replyflow.io/help",
  },
};

const categories = [
  {
    icon: Zap,
    title: "Getting Started",
    description: "Learn the basics and set up your account",
    articles: 8,
    href: "/help/getting-started",
  },
  {
    icon: MessageSquare,
    title: "Response Generation",
    description: "Creating and customizing AI responses",
    articles: 12,
    href: "/help/responses",
  },
  {
    icon: CreditCard,
    title: "Billing & Plans",
    description: "Subscriptions, payments, and invoices",
    articles: 6,
    href: "/help/billing",
  },
  {
    icon: Settings,
    title: "Account Settings",
    description: "Profile, preferences, and security",
    articles: 9,
    href: "/help/account",
  },
  {
    icon: Users,
    title: "Team & Collaboration",
    description: "Managing team members and permissions",
    articles: 5,
    href: "/help/team",
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Data protection and account security",
    articles: 7,
    href: "/help/security",
  },
];

const popularArticles = [
  {
    title: "How to generate your first review response",
    category: "Getting Started",
    href: "/help/articles/first-response",
  },
  {
    title: "Customizing your brand voice settings",
    category: "Response Generation",
    href: "/help/articles/brand-voice",
  },
  {
    title: "Understanding your usage limits",
    category: "Billing & Plans",
    href: "/help/articles/usage-limits",
  },
  {
    title: "Connecting multiple business locations",
    category: "Account Settings",
    href: "/help/articles/multiple-locations",
  },
  {
    title: "Best practices for responding to negative reviews",
    category: "Response Generation",
    href: "/help/articles/negative-reviews",
  },
  {
    title: "How to export your response history",
    category: "Account Settings",
    href: "/help/articles/export-history",
  },
];

const faqs = [
  {
    question: "How many responses can I generate per month?",
    answer:
      "It depends on your plan. Free accounts get 5 responses, Starter gets 100, Pro gets 500, and Agency gets unlimited responses per month.",
  },
  {
    question: "Can I edit the AI-generated responses?",
    answer:
      "Yes! Every response can be edited before you copy it. You can also regenerate with different tones or provide custom instructions.",
  },
  {
    question: "Which review platforms are supported?",
    answer:
      "ReplyFlow works with all platforms - Google, Yelp, Facebook, TripAdvisor, Trustpilot, and more. Simply paste the review text.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel anytime from the Billing page in your dashboard. Your access continues until the end of your billing period.",
  },
];

export default function HelpPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Help Center" }]} />

          {/* Hero with Search */}
          <header className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              How can we help you?
            </h1>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for articles..."
                className="pl-12 h-14 text-lg"
              />
            </div>
          </header>

          {/* Categories */}
          <section className="mb-16" aria-labelledby="categories">
            <h2 id="categories" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Browse by Category
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Link key={category.title} href={category.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                          <category.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            {category.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {category.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {category.articles} articles
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Popular Articles */}
          <section className="mb-16" aria-labelledby="popular">
            <h2 id="popular" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Popular Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {popularArticles.map((article) => (
                <Link key={article.title} href={article.href}>
                  <Card className="hover:shadow-md transition-shadow group">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            {article.title}
                          </p>
                          <p className="text-xs text-gray-500">{article.category}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Quick FAQs */}
          <section className="mb-16" aria-labelledby="faqs">
            <h2 id="faqs" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Contact Support */}
          <section className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-2xl">
            <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Still need help?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Our support team is available Monday to Friday, 9am-6pm PST.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/contact">
                <Button variant="gradient">Contact Support</Button>
              </Link>
              <a href="mailto:support@replyflow.io">
                <Button variant="outline">Email Us</Button>
              </a>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
