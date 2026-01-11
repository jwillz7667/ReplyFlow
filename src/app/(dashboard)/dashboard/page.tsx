import { getUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewGenerator } from "@/components/dashboard/review-generator";
import {
  MessageSquare,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
  Zap,
} from "lucide-react";

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      responses: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      _count: {
        select: { responses: true },
      },
    },
  });

  if (!dbUser) redirect("/login");

  // Calculate stats
  const totalResponses = dbUser._count.responses;
  const thisMonthStart = new Date();
  thisMonthStart.setDate(1);
  thisMonthStart.setHours(0, 0, 0, 0);

  const responsesThisMonth = await prisma.reviewResponse.count({
    where: {
      userId: dbUser.id,
      createdAt: { gte: thisMonthStart },
    },
  });

  const avgRating = await prisma.reviewResponse.aggregate({
    where: { userId: dbUser.id, reviewRating: { not: null } },
    _avg: { reviewRating: true },
  });

  const stats = [
    {
      title: "Total Responses",
      value: totalResponses,
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "This Month",
      value: responsesThisMonth,
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Avg Review Rating",
      value: avgRating._avg.reviewRating?.toFixed(1) || "N/A",
      icon: Star,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Time Saved",
      value: `${Math.round(totalResponses * 5)}min`,
      icon: Clock,
      color: "from-green-500 to-emerald-500",
    },
  ];

  const isUnlimited = dbUser.responsesLimit === -1;
  const responsesRemaining = isUnlimited
    ? "Unlimited"
    : Math.max(0, dbUser.responsesLimit - dbUser.responsesUsed);

  return (
    <div className="space-y-8 pb-20 lg:pb-0">
      {/* Welcome section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {dbUser.name?.split(" ")[0] || "there"}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {typeof responsesRemaining === "number"
              ? `You have ${responsesRemaining} responses remaining this month.`
              : "You have unlimited responses this month."}
          </p>
        </div>
        <Link href="/dashboard/generate">
          <Button variant="gradient">
            <Zap className="w-4 h-4 mr-2" />
            New Response
          </Button>
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick response generator */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Response Generator</CardTitle>
              <CardDescription>
                Paste a review and get an AI-generated response instantly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReviewGenerator user={dbUser} />
            </CardContent>
          </Card>
        </div>

        {/* Recent responses */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Responses</CardTitle>
                <CardDescription>Your latest generated responses</CardDescription>
              </div>
              <Link href="/history">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {dbUser.responses.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No responses yet.</p>
                  <p className="text-sm">Generate your first response above!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {dbUser.responses.map((response) => (
                    <div
                      key={response.id}
                      className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {response.reviewRating && (
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < response.reviewRating!
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                        <span className="text-xs text-gray-500">
                          {new Date(response.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {response.reviewText}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upgrade banner for free users */}
      {dbUser.plan === "FREE" && (
        <Card className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Upgrade to Pro</h3>
                <p className="text-blue-100 mt-1">
                  Get 500 responses/month, custom templates, and more.
                </p>
              </div>
              <Link href="/billing">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  View Plans
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
