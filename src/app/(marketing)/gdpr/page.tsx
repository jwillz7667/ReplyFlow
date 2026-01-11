import { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Shield,
  Eye,
  Edit,
  Trash2,
  Download,
  Ban,
  UserCheck,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "GDPR Compliance | ReplyFlow",
  description:
    "Learn about ReplyFlow's commitment to GDPR compliance and how we protect the privacy rights of our European users.",
  keywords: [
    "GDPR",
    "data protection",
    "privacy rights",
    "European privacy",
    "data subject rights",
  ],
  openGraph: {
    title: "GDPR Compliance | ReplyFlow",
    description: "Our commitment to European data protection",
    url: "https://replyflow.io/gdpr",
    type: "website",
  },
  alternates: {
    canonical: "https://replyflow.io/gdpr",
  },
};

const rights = [
  {
    icon: Eye,
    title: "Right of Access",
    description:
      "You can request a copy of all personal data we hold about you at any time.",
  },
  {
    icon: Edit,
    title: "Right to Rectification",
    description:
      "You can request that we correct any inaccurate or incomplete personal data.",
  },
  {
    icon: Trash2,
    title: "Right to Erasure",
    description:
      "You can request that we delete your personal data (right to be forgotten).",
  },
  {
    icon: Download,
    title: "Right to Data Portability",
    description:
      "You can request your data in a structured, machine-readable format.",
  },
  {
    icon: Ban,
    title: "Right to Object",
    description:
      "You can object to processing of your personal data for certain purposes.",
  },
  {
    icon: UserCheck,
    title: "Right to Restrict Processing",
    description:
      "You can request that we limit how we use your personal data.",
  },
];

export default function GDPRPage() {
  const lastUpdated = "January 1, 2026";

  return (
    <article className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "GDPR" }]} />

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              GDPR Compliance
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Our commitment to protecting your privacy under the General Data Protection
            Regulation.
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Last updated: {lastUpdated}
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <h2>Our Commitment to GDPR</h2>
          <p>
            ReplyFlow is committed to complying with the General Data Protection
            Regulation (GDPR) for all users in the European Economic Area (EEA). We have
            implemented comprehensive measures to ensure your data is handled lawfully,
            fairly, and transparently.
          </p>

          <h2>Legal Basis for Processing</h2>
          <p>We process personal data under the following legal bases:</p>
          <ul>
            <li>
              <strong>Contract Performance:</strong> Processing necessary to provide our
              services to you
            </li>
            <li>
              <strong>Legitimate Interests:</strong> Improving our services, security,
              and fraud prevention
            </li>
            <li>
              <strong>Consent:</strong> For marketing communications and optional
              analytics
            </li>
            <li>
              <strong>Legal Obligation:</strong> Compliance with applicable laws
            </li>
          </ul>
        </div>

        {/* Your Rights */}
        <section className="mb-12" aria-labelledby="your-rights">
          <h2
            id="your-rights"
            className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Your Data Rights
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {rights.map((right) => (
              <Card key={right.title}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <right.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {right.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {right.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <h2>Data Processing Details</h2>

          <h3>Data We Collect</h3>
          <ul>
            <li>Account information (name, email)</li>
            <li>Business information you provide</li>
            <li>Review content you input for response generation</li>
            <li>Usage data and analytics</li>
            <li>Payment information (processed by Stripe)</li>
          </ul>

          <h3>Data Retention</h3>
          <p>
            We retain your personal data for as long as your account is active. Upon
            account deletion, we remove your personal data within 30 days, except where
            retention is required by law. Anonymized analytics data may be retained
            longer.
          </p>

          <h3>International Transfers</h3>
          <p>
            Your data may be transferred to and processed in the United States. We use
            Standard Contractual Clauses (SCCs) and other appropriate safeguards to
            ensure adequate protection for such transfers.
          </p>

          <h3>Sub-processors</h3>
          <p>We use the following sub-processors to deliver our services:</p>
          <ul>
            <li>
              <strong>Supabase (US):</strong> Database and authentication
            </li>
            <li>
              <strong>Stripe (US):</strong> Payment processing
            </li>
            <li>
              <strong>OpenAI (US):</strong> AI processing
            </li>
            <li>
              <strong>Vercel (US):</strong> Hosting
            </li>
          </ul>
        </div>

        {/* Exercise Rights CTA */}
        <Card className="bg-gradient-to-br from-blue-600 to-cyan-500 border-0 mb-12">
          <CardContent className="p-8 text-white text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-bold mb-3">Exercise Your Rights</h2>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              To exercise any of your data protection rights, submit a request to our
              Data Protection Officer. We will respond within 30 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  Submit Data Request
                </Button>
              </Link>
              <a href="mailto:dpo@replyflow.io">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Email DPO
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Data Protection Officer</h2>
          <p>
            For GDPR-related inquiries, you can contact our Data Protection Officer at:
          </p>
          <ul>
            <li>Email: dpo@replyflow.io</li>
            <li>Address: ReplyFlow Inc., San Francisco, CA, USA</li>
          </ul>

          <h2>Supervisory Authority</h2>
          <p>
            If you are not satisfied with our response to a privacy concern, you have
            the right to lodge a complaint with your local data protection authority.
          </p>

          <h2>Updates</h2>
          <p>
            We may update this page to reflect changes in our GDPR practices. Material
            changes will be communicated via email to affected users.
          </p>
        </div>
      </div>
    </article>
  );
}
