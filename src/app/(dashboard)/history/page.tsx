import { getUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, Copy, Calendar } from "lucide-react";
import { formatRelativeTime, capitalize } from "@/lib/utils";
import { HistoryList } from "@/components/dashboard/history-list";

export default async function HistoryPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const responses = await prisma.reviewResponse.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const stats = {
    total: responses.length,
    thisWeek: responses.filter(
      (r) => r.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length,
    avgRating:
      responses.filter((r) => r.reviewRating).length > 0
        ? (
            responses.reduce((sum, r) => sum + (r.reviewRating || 0), 0) /
            responses.filter((r) => r.reviewRating).length
          ).toFixed(1)
        : "N/A",
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Response History
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          View and manage your generated responses.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Responses</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">This Week</p>
                <p className="text-2xl font-bold">{stats.thisWeek}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Review Rating</p>
                <p className="text-2xl font-bold">{stats.avgRating}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Response list */}
      <Card>
        <CardHeader>
          <CardTitle>All Responses</CardTitle>
          <CardDescription>
            Click on any response to copy it to your clipboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {responses.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No responses yet</p>
              <p className="text-sm">
                Generate your first response from the dashboard.
              </p>
            </div>
          ) : (
            <HistoryList responses={responses} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
