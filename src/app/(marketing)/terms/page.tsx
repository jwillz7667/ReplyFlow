import { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service | ReplyFlow",
  description:
    "Read the Terms of Service for using ReplyFlow. Understand your rights and responsibilities when using our AI review response platform.",
  keywords: ["terms of service", "terms and conditions", "user agreement", "ReplyFlow terms"],
  openGraph: {
    title: "Terms of Service | ReplyFlow",
    description: "Terms and conditions for using ReplyFlow",
    url: "https://replyflow.io/terms",
    type: "website",
  },
  alternates: {
    canonical: "https://replyflow.io/terms",
  },
};

export default function TermsPage() {
  const lastUpdated = "January 1, 2026";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service",
    description: "ReplyFlow Terms of Service",
    url: "https://replyflow.io/terms",
    dateModified: "2026-01-01",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Terms of Service" }]} />

          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: {lastUpdated}
            </p>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead">
              Welcome to ReplyFlow. By accessing or using our service, you agree to be
              bound by these Terms of Service. Please read them carefully.
            </p>

            <h2 id="acceptance">1. Acceptance of Terms</h2>
            <p>
              By creating an account or using ReplyFlow, you agree to these Terms of
              Service and our Privacy Policy. If you do not agree, do not use our
              service.
            </p>

            <h2 id="description">2. Description of Service</h2>
            <p>
              ReplyFlow provides an AI-powered platform that helps businesses generate
              responses to customer reviews. Our service includes:
            </p>
            <ul>
              <li>AI-generated review response suggestions</li>
              <li>Response history and management</li>
              <li>Custom templates and brand voice settings</li>
              <li>Multi-business management capabilities</li>
            </ul>

            <h2 id="accounts">3. User Accounts</h2>
            <h3>Registration</h3>
            <p>
              You must provide accurate information when creating an account. You are
              responsible for maintaining the security of your account credentials.
            </p>
            <h3>Account Responsibility</h3>
            <p>
              You are responsible for all activities that occur under your account. You
              must notify us immediately of any unauthorized use.
            </p>

            <h2 id="subscriptions">4. Subscriptions and Payments</h2>
            <h3>Billing</h3>
            <p>
              Paid subscriptions are billed in advance on a monthly basis. Prices are
              subject to change with notice.
            </p>
            <h3>Cancellation</h3>
            <p>
              You may cancel your subscription at any time. Cancellation takes effect at
              the end of your current billing period.
            </p>
            <h3>Refunds</h3>
            <p>
              We offer a 30-day money-back guarantee for first-time subscribers. Contact
              support to request a refund.
            </p>

            <h2 id="usage">5. Acceptable Use</h2>
            <p>You agree not to use ReplyFlow to:</p>
            <ul>
              <li>Generate false, misleading, or fraudulent content</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Harass, abuse, or harm others</li>
              <li>Attempt to reverse-engineer our technology</li>
              <li>Access accounts that do not belong to you</li>
              <li>Overload or interfere with our systems</li>
            </ul>

            <h2 id="content">6. Content Ownership</h2>
            <h3>Your Content</h3>
            <p>
              You retain ownership of review content you input and the responses you
              generate. By using our service, you grant us a license to process this
              content to provide the service.
            </p>
            <h3>Our Content</h3>
            <p>
              ReplyFlow and its original content, features, and functionality are owned
              by ReplyFlow Inc. and are protected by intellectual property laws.
            </p>

            <h2 id="ai">7. AI-Generated Content</h2>
            <p>
              You understand that responses are generated by AI and should be reviewed
              before use. You are solely responsible for content you post using our
              service. We do not guarantee accuracy or appropriateness of generated
              content.
            </p>

            <h2 id="limitation">8. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, REPLYFLOW SHALL NOT BE LIABLE FOR
              ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
              INCLUDING LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES.
            </p>

            <h2 id="disclaimer">9. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
              IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR
              ERROR-FREE.
            </p>

            <h2 id="indemnification">10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless ReplyFlow and its officers,
              directors, employees, and agents from any claims arising from your use of
              the service or violation of these terms.
            </p>

            <h2 id="termination">11. Termination</h2>
            <p>
              We may terminate or suspend your account immediately for violations of
              these terms or for any other reason at our discretion. Upon termination,
              your right to use the service ceases immediately.
            </p>

            <h2 id="changes">12. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify you
              of material changes via email or through the service. Continued use after
              changes constitutes acceptance.
            </p>

            <h2 id="governing">13. Governing Law</h2>
            <p>
              These terms are governed by the laws of the State of California, without
              regard to conflict of law provisions. Any disputes shall be resolved in
              the courts of San Francisco County, California.
            </p>

            <h2 id="contact">14. Contact Information</h2>
            <p>For questions about these Terms, contact us at:</p>
            <ul>
              <li>Email: legal@replyflow.io</li>
              <li>Address: ReplyFlow Inc., San Francisco, CA</li>
            </ul>
          </div>
        </div>
      </article>
    </>
  );
}
