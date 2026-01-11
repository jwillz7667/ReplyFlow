import { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Activity,
  Server,
  Database,
  Zap,
  Globe,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "System Status | ReplyFlow",
  description:
    "Check the current status of ReplyFlow services. View uptime, incidents, and scheduled maintenance.",
  keywords: [
    "ReplyFlow status",
    "system status",
    "uptime",
    "service status",
    "API status",
  ],
  openGraph: {
    title: "System Status | ReplyFlow",
    description: "Current status of all ReplyFlow services",
    url: "https://replyflow.io/status",
    type: "website",
  },
  alternates: {
    canonical: "https://replyflow.io/status",
  },
};

const services = [
  {
    name: "Web Application",
    description: "Main ReplyFlow dashboard and UI",
    icon: Globe,
    status: "operational",
    uptime: "99.99%",
  },
  {
    name: "API",
    description: "REST API for integrations",
    icon: Server,
    status: "operational",
    uptime: "99.98%",
  },
  {
    name: "AI Response Generation",
    description: "OpenAI-powered response generation",
    icon: Zap,
    status: "operational",
    uptime: "99.95%",
  },
  {
    name: "Database",
    description: "User data and response storage",
    icon: Database,
    status: "operational",
    uptime: "99.99%",
  },
  {
    name: "Authentication",
    description: "Login and user management",
    icon: Activity,
    status: "operational",
    uptime: "99.99%",
  },
];

const incidents = [
  {
    date: "January 5, 2026",
    title: "API Latency Increase",
    status: "resolved",
    description:
      "Elevated response times on the API. Issue identified and resolved within 15 minutes.",
    duration: "15 minutes",
  },
  {
    date: "December 28, 2025",
    title: "Scheduled Maintenance",
    status: "completed",
    description:
      "Database maintenance window for performance optimizations. No user impact.",
    duration: "2 hours",
  },
  {
    date: "December 15, 2025",
    title: "AI Service Degradation",
    status: "resolved",
    description:
      "Temporary slowdown in response generation due to upstream provider issues.",
    duration: "45 minutes",
  },
];

const statusConfig = {
  operational: {
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    label: "Operational",
  },
  degraded: {
    icon: AlertTriangle,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    label: "Degraded",
  },
  outage: {
    icon: XCircle,
    color: "text-red-500",
    bgColor: "bg-red-100 dark:bg-red-900/30",
    label: "Outage",
  },
  resolved: {
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    label: "Resolved",
  },
  completed: {
    icon: CheckCircle,
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    label: "Completed",
  },
};

export default function StatusPage() {
  const allOperational = services.every((s) => s.status === "operational");

  return (
    <article className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Status" }]} />

        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            System Status
          </h1>
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              allOperational
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
            }`}
          >
            {allOperational ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">All Systems Operational</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5" />
                <span className="font-medium">Some Systems Experiencing Issues</span>
              </>
            )}
          </div>
        </header>

        {/* Services */}
        <section className="mb-12" aria-labelledby="services">
          <h2 id="services" className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Services
          </h2>
          <Card>
            <CardContent className="p-0 divide-y divide-gray-200 dark:divide-gray-700">
              {services.map((service) => {
                const config = statusConfig[service.status as keyof typeof statusConfig];
                const StatusIcon = config.icon;
                return (
                  <div
                    key={service.name}
                    className="p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {service.name}
                        </h3>
                        <p className="text-sm text-gray-500">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">{service.uptime} uptime</span>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bgColor}`}>
                        <StatusIcon className={`w-4 h-4 ${config.color}`} />
                        <span className={`text-sm font-medium ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </section>

        {/* Uptime Chart Placeholder */}
        <section className="mb-12" aria-labelledby="uptime">
          <h2 id="uptime" className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            90-Day Uptime
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-1">
                {[...Array(90)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-8 rounded-sm ${
                      Math.random() > 0.02
                        ? "bg-green-400 dark:bg-green-500"
                        : "bg-yellow-400 dark:bg-yellow-500"
                    }`}
                    title={`Day ${90 - i}`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-3 text-sm text-gray-500">
                <span>90 days ago</span>
                <span>Today</span>
              </div>
              <div className="mt-4 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-green-400" />
                  <span className="text-gray-600 dark:text-gray-400">Operational</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-yellow-400" />
                  <span className="text-gray-600 dark:text-gray-400">Degraded</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-red-400" />
                  <span className="text-gray-600 dark:text-gray-400">Outage</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recent Incidents */}
        <section aria-labelledby="incidents">
          <h2 id="incidents" className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Incidents
          </h2>
          <div className="space-y-4">
            {incidents.map((incident, index) => {
              const config = statusConfig[incident.status as keyof typeof statusConfig];
              return (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {incident.title}
                      </h3>
                      <Badge className={config.bgColor}>
                        <span className={config.color}>{config.label}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {incident.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {incident.date}
                      </span>
                      <span>Duration: {incident.duration}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Subscribe */}
        <section className="mt-12 text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-2">
            Get Status Updates
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Subscribe to receive notifications about service incidents.
          </p>
          <form className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </article>
  );
}
