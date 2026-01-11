import { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Bug, Zap, Shield, ArrowUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Changelog | ReplyFlow Product Updates",
  description:
    "See what's new in ReplyFlow. Latest features, improvements, and bug fixes for our AI review response platform.",
  keywords: [
    "ReplyFlow changelog",
    "product updates",
    "new features",
    "release notes",
    "ReplyFlow updates",
  ],
  openGraph: {
    title: "Changelog | ReplyFlow Updates",
    description: "Latest features and improvements",
    url: "https://replyflow.io/changelog",
    type: "website",
  },
  alternates: {
    canonical: "https://replyflow.io/changelog",
  },
};

const releases = [
  {
    version: "2.4.0",
    date: "January 8, 2026",
    title: "Multi-language Response Generation",
    description:
      "Generate responses in 25+ languages with automatic language detection.",
    changes: [
      { type: "feature", text: "Added support for 25 new languages" },
      { type: "feature", text: "Automatic language detection from review text" },
      { type: "improvement", text: "Improved response quality for non-English reviews" },
      { type: "fix", text: "Fixed character encoding issues in exported responses" },
    ],
  },
  {
    version: "2.3.0",
    date: "December 15, 2025",
    title: "Team Collaboration Features",
    description: "Invite team members and collaborate on review responses together.",
    changes: [
      { type: "feature", text: "Team member invitations and role management" },
      { type: "feature", text: "Shared response templates across team" },
      { type: "feature", text: "Activity feed for team actions" },
      { type: "improvement", text: "Enhanced dashboard with team statistics" },
    ],
  },
  {
    version: "2.2.0",
    date: "November 28, 2025",
    title: "Advanced Analytics Dashboard",
    description:
      "Deeper insights into your review management performance.",
    changes: [
      { type: "feature", text: "Response time analytics" },
      { type: "feature", text: "Sentiment trend analysis" },
      { type: "feature", text: "Platform-wise performance breakdown" },
      { type: "improvement", text: "Faster dashboard loading times" },
      { type: "fix", text: "Fixed date range filter in analytics" },
    ],
  },
  {
    version: "2.1.0",
    date: "November 10, 2025",
    title: "Custom Templates System",
    description: "Create and save your own response templates for faster workflows.",
    changes: [
      { type: "feature", text: "Create unlimited custom templates" },
      { type: "feature", text: "Template categories and organization" },
      { type: "feature", text: "Quick-apply templates from dashboard" },
      { type: "improvement", text: "Template suggestions based on review type" },
    ],
  },
  {
    version: "2.0.0",
    date: "October 20, 2025",
    title: "ReplyFlow 2.0 - Complete Redesign",
    description:
      "Major update with new design, improved AI, and powerful new features.",
    changes: [
      { type: "feature", text: "Completely redesigned user interface" },
      { type: "feature", text: "GPT-4 Turbo for better response quality" },
      { type: "feature", text: "Multi-business management" },
      { type: "feature", text: "Brand voice customization" },
      { type: "improvement", text: "50% faster response generation" },
      { type: "security", text: "Enhanced data encryption" },
    ],
  },
];

const changeTypeConfig = {
  feature: { icon: Sparkles, color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  improvement: { icon: ArrowUp, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  fix: { icon: Bug, color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
  security: { icon: Shield, color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
};

export default function ChangelogPage() {
  return (
    <article className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Changelog" }]} />

        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Changelog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Stay up to date with the latest features, improvements, and fixes.
          </p>
        </header>

        {/* Subscribe to updates */}
        <Card className="mb-12 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Get notified of updates
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Subscribe to receive changelog updates in your inbox.
              </p>
            </div>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </CardContent>
        </Card>

        {/* Releases */}
        <div className="space-y-12">
          {releases.map((release) => (
            <article key={release.version} className="relative">
              {/* Version badge */}
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="default" className="text-sm">
                  v{release.version}
                </Badge>
                <time className="text-sm text-gray-500">{release.date}</time>
              </div>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {release.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {release.description}
                  </p>

                  <ul className="space-y-3">
                    {release.changes.map((change, index) => {
                      const config = changeTypeConfig[change.type as keyof typeof changeTypeConfig];
                      const Icon = config.icon;
                      return (
                        <li key={index} className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 p-1 rounded ${config.color}`}
                          >
                            <Icon className="w-3 h-3" />
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {change.text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>

        {/* Older releases link */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Looking for older releases?{" "}
            <a href="/changelog/archive" className="text-blue-600 hover:underline">
              View full archive
            </a>
          </p>
        </div>
      </div>
    </article>
  );
}
