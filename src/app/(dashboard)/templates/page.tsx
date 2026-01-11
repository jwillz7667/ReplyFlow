import { getUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus } from "lucide-react";
import { TemplateList } from "@/components/dashboard/template-list";
import { PLAN_LIMITS, isUnlimited } from "@/lib/utils";

export default async function TemplatesPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true, plan: true },
  });

  if (!dbUser) redirect("/login");

  const templates = await prisma.template.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const templateLimit = PLAN_LIMITS[dbUser.plan].templates;
  const canCreateMore = isUnlimited(templateLimit) || templates.length < templateLimit;

  const stats = {
    total: templates.length,
    limit: isUnlimited(templateLimit) ? "Unlimited" : templateLimit,
    byCategory: {
      positive: templates.filter((t) => t.category === "positive").length,
      negative: templates.filter((t) => t.category === "negative").length,
      neutral: templates.filter((t) => t.category === "neutral").length,
      complaint: templates.filter((t) => t.category === "complaint").length,
    },
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Response Templates
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create and manage custom response templates.
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {stats.total} / {stats.limit} templates
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Positive</p>
            <p className="text-2xl font-bold text-green-600">{stats.byCategory.positive}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Negative</p>
            <p className="text-2xl font-bold text-red-600">{stats.byCategory.negative}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Neutral</p>
            <p className="text-2xl font-bold text-gray-600">{stats.byCategory.neutral}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Complaint</p>
            <p className="text-2xl font-bold text-orange-600">{stats.byCategory.complaint}</p>
          </CardContent>
        </Card>
      </div>

      {/* Templates list */}
      <Card>
        <CardHeader>
          <CardTitle>Your Templates</CardTitle>
          <CardDescription>
            Create custom templates to speed up your response generation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {templates.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No templates yet</p>
              <p className="text-sm mb-4">
                Create your first template to save time on common responses.
              </p>
            </div>
          ) : null}
          <TemplateList
            templates={templates}
            canCreateMore={canCreateMore}
            templateLimit={typeof stats.limit === 'number' ? stats.limit : -1}
          />
        </CardContent>
      </Card>
    </div>
  );
}
