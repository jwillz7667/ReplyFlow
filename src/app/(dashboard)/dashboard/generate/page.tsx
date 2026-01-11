import { getUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewGenerator } from "@/components/dashboard/review-generator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from "lucide-react";

export default async function GeneratePage() {
  const user = await getUser();
  if (!user) redirect("/login");

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) redirect("/login");

  const isUnlimited = dbUser.responsesLimit === -1;
  const usagePercent = isUnlimited
    ? 0
    : Math.min((dbUser.responsesUsed / dbUser.responsesLimit) * 100, 100);
  const responsesRemaining = isUnlimited
    ? Infinity
    : Math.max(0, dbUser.responsesLimit - dbUser.responsesUsed);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 lg:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Generate Response
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create AI-powered responses to customer reviews.
          </p>
        </div>

        {/* Usage indicator */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Monthly Usage</p>
            <p className="text-lg font-semibold">
              {isUnlimited ? (
                <span className="text-green-600">Unlimited</span>
              ) : (
                <>
                  {dbUser.responsesUsed}/{dbUser.responsesLimit}
                </>
              )}
            </p>
          </div>
          <Badge
            variant={
              usagePercent > 90
                ? "destructive"
                : usagePercent > 70
                ? "warning"
                : "success"
            }
          >
            {dbUser.plan}
          </Badge>
        </div>
      </div>

      {/* Usage warning */}
      {!isUnlimited && usagePercent >= 80 && (
        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-800 dark:text-yellow-200">
                    {usagePercent >= 100
                      ? "Usage limit reached!"
                      : `Only ${responsesRemaining} responses remaining`}
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Upgrade to get more responses and unlock additional features.
                  </p>
                </div>
              </div>
              <Link href="/billing">
                <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-700">
                  Upgrade
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main generator card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            AI Response Generator
          </CardTitle>
          <CardDescription>
            Paste a customer review below and our AI will generate a professional,
            personalized response tailored to your business.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReviewGenerator user={dbUser} />
        </CardContent>
      </Card>

      {/* Tips section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tips for Better Responses</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">1.</span>
              <span>
                Include the star rating for context-appropriate responses (apologetic
                for low ratings, grateful for high ratings).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">2.</span>
              <span>
                Select the appropriate tone based on your brand voice and the nature
                of the review.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">3.</span>
              <span>
                Set up your business name and type in Settings for more personalized
                responses.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">4.</span>
              <span>
                Always review and personalize the generated response before posting
                to maintain authenticity.
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
