import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  // Get or create user in database
  let dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email!,
        name: user.user_metadata?.name || user.user_metadata?.full_name,
        avatarUrl: user.user_metadata?.avatar_url,
        plan: "FREE",
        responsesUsed: 0,
        responsesLimit: 5,
      },
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardNav user={dbUser} />
      <div className="lg:pl-64">
        <DashboardHeader user={dbUser} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
