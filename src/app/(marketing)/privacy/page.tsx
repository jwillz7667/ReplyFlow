import { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy | ReplyFlow",
  description:
    "Learn how ReplyFlow collects, uses, and protects your personal information. Our commitment to your privacy and data security.",
  keywords: ["privacy policy", "data protection", "GDPR", "data privacy", "ReplyFlow privacy"],
  openGraph: {
    title: "Privacy Policy | ReplyFlow",
    description: "How we collect, use, and protect your data",
    url: "https://replyflow.io/privacy",
    type: "website",
  },
  alternates: {
    canonical: "https://replyflow.io/privacy",
  },
};

export default function PrivacyPage() {
  const lastUpdated = "January 1, 2026";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description: "ReplyFlow Privacy Policy",
    url: "https://replyflow.io/privacy",
    dateModified: "2026-01-01",
    publisher: {
      "@type": "Organization",
      name: "ReplyFlow",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

          <header className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: {lastUpdated}
            </p>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead">
              At ReplyFlow, we take your privacy seriously. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when you use
              our service.
            </p>

            <h2 id="information-we-collect">1. Information We Collect</h2>

            <h3>Personal Information</h3>
            <p>We may collect personal information that you provide directly to us, including:</p>
            <ul>
              <li>Name and email address when you create an account</li>
              <li>Payment information when you subscribe to a paid plan</li>
              <li>Business information you provide for response customization</li>
              <li>Communications you send to us</li>
            </ul>

            <h3>Usage Information</h3>
            <p>We automatically collect certain information when you use our service:</p>
            <ul>
              <li>Log data (IP address, browser type, pages visited)</li>
              <li>Device information</li>
              <li>Usage patterns and feature interactions</li>
              <li>Generated responses and review content you input</li>
            </ul>

            <h2 id="how-we-use">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Train and improve our AI models (using anonymized data only)</li>
              <li>Detect, prevent, and address technical issues</li>
            </ul>

            <h2 id="data-sharing">3. Data Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share information:</p>
            <ul>
              <li>With service providers who assist in our operations</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With your consent or at your direction</li>
            </ul>

            <h3>Third-Party Services</h3>
            <p>We use the following third-party services:</p>
            <ul>
              <li><strong>Supabase:</strong> Database and authentication</li>
              <li><strong>Stripe:</strong> Payment processing</li>
              <li><strong>OpenAI:</strong> AI response generation</li>
              <li><strong>Vercel:</strong> Hosting and analytics</li>
            </ul>

            <h2 id="data-security">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect
              your personal information, including:
            </p>
            <ul>
              <li>Encryption of data in transit (TLS 1.3) and at rest</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Access controls and authentication requirements</li>
              <li>Employee security training</li>
            </ul>

            <h2 id="data-retention">5. Data Retention</h2>
            <p>
              We retain your personal information for as long as your account is active
              or as needed to provide services. You may request deletion of your data at
              any time. We retain anonymized usage data for analytics purposes.
            </p>

            <h2 id="your-rights">6. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Delete your personal information</li>
              <li>Export your data in a portable format</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent where applicable</li>
            </ul>

            <h2 id="cookies">7. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience. See our{" "}
              <a href="/cookies">Cookie Policy</a> for more details.
            </p>

            <h2 id="international">8. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other
              than your own. We ensure appropriate safeguards are in place for such
              transfers in compliance with applicable law.
            </p>

            <h2 id="children">9. Children's Privacy</h2>
            <p>
              Our service is not directed to individuals under 18. We do not knowingly
              collect personal information from children.
            </p>

            <h2 id="changes">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of
              significant changes by email or through the service.
            </p>

            <h2 id="contact">11. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our practices, please
              contact us at:
            </p>
            <ul>
              <li>Email: privacy@replyflow.io</li>
              <li>Address: ReplyFlow Inc., San Francisco, CA</li>
            </ul>
          </div>
        </div>
      </article>
    </>
  );
}
