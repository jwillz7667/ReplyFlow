import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Code,
  Zap,
  Settings,
  Webhook,
  Key,
  Terminal,
  FileJson,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation | ReplyFlow API & Developer Docs",
  description:
    "Complete documentation for the ReplyFlow API. Learn how to integrate AI review responses into your applications.",
  keywords: [
    "ReplyFlow API",
    "API documentation",
    "developer docs",
    "REST API",
    "integration guide",
  ],
  openGraph: {
    title: "Documentation | ReplyFlow API",
    description: "Developer documentation and API reference",
    url: "https://replyflow.io/docs",
    type: "website",
  },
  alternates: {
    canonical: "https://replyflow.io/docs",
  },
};

const sections = [
  {
    icon: Zap,
    title: "Quick Start",
    description: "Get up and running with ReplyFlow in 5 minutes",
    href: "/docs/quickstart",
    badge: "Start Here",
  },
  {
    icon: Key,
    title: "Authentication",
    description: "Learn how to authenticate API requests",
    href: "/docs/authentication",
  },
  {
    icon: Code,
    title: "API Reference",
    description: "Complete reference for all API endpoints",
    href: "/docs/api",
    badge: "v2.0",
  },
  {
    icon: Webhook,
    title: "Webhooks",
    description: "Receive real-time notifications for events",
    href: "/docs/webhooks",
  },
  {
    icon: FileJson,
    title: "SDKs & Libraries",
    description: "Official SDKs for popular languages",
    href: "/docs/sdks",
  },
  {
    icon: Settings,
    title: "Configuration",
    description: "Advanced configuration options",
    href: "/docs/configuration",
  },
];

const codeExample = `// Generate a review response
const response = await fetch('https://api.replyflow.io/v2/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    review: "Great service and friendly staff!",
    rating: 5,
    tone: "professional",
    business_name: "Acme Inc"
  })
});

const data = await response.json();
console.log(data.response);
// "Thank you so much for your wonderful feedback!..."`;

const endpoints = [
  {
    method: "POST",
    path: "/v2/generate",
    description: "Generate a review response",
  },
  {
    method: "GET",
    path: "/v2/responses",
    description: "List all generated responses",
  },
  {
    method: "GET",
    path: "/v2/responses/:id",
    description: "Get a specific response",
  },
  {
    method: "POST",
    path: "/v2/templates",
    description: "Create a response template",
  },
  {
    method: "GET",
    path: "/v2/usage",
    description: "Get account usage statistics",
  },
];

export default function DocsPage() {
  return (
    <article className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Documentation" }]} />

        <header className="max-w-3xl mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to integrate ReplyFlow into your applications. Our REST
            API makes it easy to generate AI-powered review responses programmatically.
          </p>
        </header>

        {/* Documentation Sections */}
        <section className="mb-16" aria-labelledby="sections">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((section) => (
              <Link key={section.title} href={section.href}>
                <Card className="h-full hover:shadow-lg transition-shadow group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      {section.badge && (
                        <Badge variant="secondary">{section.badge}</Badge>
                      )}
                    </div>
                    <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {section.title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {section.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Code Example */}
        <section className="mb-16" aria-labelledby="example">
          <h2 id="example" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Example
          </h2>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-0">
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">JavaScript</span>
                </div>
                <button className="text-xs text-gray-400 hover:text-white transition-colors">
                  Copy
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-sm">
                <code className="text-green-400">{codeExample}</code>
              </pre>
            </CardContent>
          </Card>
        </section>

        {/* API Endpoints */}
        <section className="mb-16" aria-labelledby="endpoints">
          <h2 id="endpoints" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            API Endpoints
          </h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {endpoints.map((endpoint) => (
                  <Link
                    key={endpoint.path}
                    href={`/docs/api#${endpoint.path.replace(/[/:]/g, "-")}`}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                          endpoint.method === "GET"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}
                      >
                        {endpoint.method}
                      </span>
                      <code className="text-sm text-gray-900 dark:text-white">
                        {endpoint.path}
                      </code>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">{endpoint.description}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* SDKs */}
        <section className="mb-16" aria-labelledby="sdks">
          <h2 id="sdks" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Official SDKs
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { name: "Node.js", version: "2.1.0", color: "bg-green-500" },
              { name: "Python", version: "2.0.3", color: "bg-blue-500" },
              { name: "Ruby", version: "1.2.0", color: "bg-red-500" },
              { name: "PHP", version: "1.1.0", color: "bg-purple-500" },
            ].map((sdk) => (
              <Card key={sdk.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${sdk.color} flex items-center justify-center`}>
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {sdk.name}
                    </p>
                    <p className="text-xs text-gray-500">v{sdk.version}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* API Access CTA */}
        <section className="text-center py-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl text-white">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-3">Ready to Build?</h2>
          <p className="text-blue-100 mb-6 max-w-md mx-auto">
            API access is available on Agency plans. Upgrade to start integrating
            ReplyFlow into your applications.
          </p>
          <Link href="/billing">
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              View Plans
            </button>
          </Link>
        </section>
      </div>
    </article>
  );
}
