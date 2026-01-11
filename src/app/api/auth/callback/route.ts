import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirect = searchParams.get("redirect") || "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Create or update user in database
      const user = data.user;

      try {
        await prisma.user.upsert({
          where: { id: user.id },
          update: {
            email: user.email!,
            name: user.user_metadata?.name || user.user_metadata?.full_name,
            avatarUrl: user.user_metadata?.avatar_url,
            updatedAt: new Date(),
          },
          create: {
            id: user.id,
            email: user.email!,
            name: user.user_metadata?.name || user.user_metadata?.full_name,
            avatarUrl: user.user_metadata?.avatar_url,
            plan: "FREE",
            responsesUsed: 0,
            responsesLimit: 5,
          },
        });
      } catch (dbError) {
        console.error("Error syncing user to database:", dbError);
        // Continue anyway - the user is authenticated
      }

      return NextResponse.redirect(`${origin}${redirect}`);
    }
  }

  // Auth failed, redirect to login with error
  return NextResponse.redirect(`${origin}/login?error=auth-failed`);
}
