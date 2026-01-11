import { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Cookie Policy | ReplyFlow",
  description:
    "Learn about how ReplyFlow uses cookies and similar technologies to improve your experience and provide our services.",
  keywords: ["cookie policy", "cookies", "tracking", "privacy", "ReplyFlow cookies"],
  openGraph: {
    title: "Cookie Policy | ReplyFlow",
    description: "How we use cookies and similar technologies",
    url: "https://replyflow.io/cookies",
    type: "website",
  },
  alternates: {
    canonical: "https://replyflow.io/cookies",
  },
};

const cookieTypes = [
  {
    name: "Essential Cookies",
    description:
      "Required for the website to function properly. These cannot be disabled.",
    examples: ["Authentication tokens", "Session management", "Security features"],
    canDisable: false,
  },
  {
    name: "Functional Cookies",
    description:
      "Remember your preferences and settings to enhance your experience.",
    examples: ["Language preferences", "Theme settings", "User preferences"],
    canDisable: true,
  },
  {
    name: "Analytics Cookies",
    description:
      "Help us understand how visitors interact with our website to improve it.",
    examples: ["Page views", "Feature usage", "Error tracking"],
    canDisable: true,
  },
  {
    name: "Marketing Cookies",
    description:
      "Used to deliver relevant advertisements and track campaign performance.",
    examples: ["Ad targeting", "Campaign attribution", "Remarketing"],
    canDisable: true,
  },
];

export default function CookiesPage() {
  const lastUpdated = "January 1, 2026";

  return (
    <article className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Cookie Policy" }]} />

        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: {lastUpdated}
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <p className="lead">
            This Cookie Policy explains how ReplyFlow uses cookies and similar tracking
            technologies when you visit our website or use our services.
          </p>

          <h2 id="what-are-cookies">What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website.
            They help websites remember your preferences and improve your experience.
            Similar technologies include pixels, local storage, and session storage.
          </p>

          <h2 id="why-we-use">Why We Use Cookies</h2>
          <p>We use cookies to:</p>
          <ul>
            <li>Keep you signed in to your account</li>
            <li>Remember your preferences and settings</li>
            <li>Understand how you use our service</li>
            <li>Improve our website and features</li>
            <li>Deliver relevant content and advertisements</li>
            <li>Protect against security threats</li>
          </ul>
        </div>

        {/* Cookie Types */}
        <section className="mb-12" aria-labelledby="cookie-types">
          <h2
            id="cookie-types"
            className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Types of Cookies We Use
          </h2>
          <div className="space-y-4">
            {cookieTypes.map((type) => (
              <Card key={type.name}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {type.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {type.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {type.examples.map((example) => (
                          <span
                            key={example}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        type.canDisable
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {type.canDisable ? "Optional" : "Required"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 id="third-party">Third-Party Cookies</h2>
          <p>We use cookies from the following third-party services:</p>
          <ul>
            <li>
              <strong>Supabase:</strong> Authentication and session management
            </li>
            <li>
              <strong>Stripe:</strong> Payment processing
            </li>
            <li>
              <strong>Vercel Analytics:</strong> Website analytics (if enabled)
            </li>
          </ul>

          <h2 id="managing">Managing Your Cookie Preferences</h2>
          <p>You can control cookies in several ways:</p>
          <ul>
            <li>
              <strong>Browser Settings:</strong> Most browsers allow you to block or
              delete cookies through settings
            </li>
            <li>
              <strong>Our Cookie Banner:</strong> Use our cookie consent banner to
              manage preferences
            </li>
            <li>
              <strong>Opt-Out Links:</strong> Some third-party services offer opt-out
              mechanisms
            </li>
          </ul>
          <p>
            Note: Blocking essential cookies may prevent you from using certain features
            of our service.
          </p>

          <h2 id="do-not-track">Do Not Track</h2>
          <p>
            We currently do not respond to "Do Not Track" browser signals. We will
            update this policy if we implement DNT support in the future.
          </p>

          <h2 id="updates">Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. We will notify you of
            significant changes by updating the "Last updated" date.
          </p>

          <h2 id="contact">Contact Us</h2>
          <p>
            If you have questions about our use of cookies, please contact us at{" "}
            <a href="mailto:privacy@replyflow.io">privacy@replyflow.io</a>.
          </p>
        </div>
      </div>
    </article>
  );
}
