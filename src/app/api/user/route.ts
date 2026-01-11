import { NextResponse } from "next/server";
import { getUser, createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { createClient as createAdminClient } from "@supabase/supabase-js";

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  businessName: z.string().optional(),
  businessType: z.string().optional(),
  brandVoice: z.string().optional(),
});

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        businessName: true,
        businessType: true,
        brandVoice: true,
        plan: true,
        responsesUsed: true,
        responsesLimit: true,
      },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(dbUser);
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = updateSchema.parse(body);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Update user error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete user data from Prisma (cascade will handle related records)
    await prisma.user.delete({
      where: { id: user.id },
    });

    // Sign out the user from the current session
    const supabase = await createClient();
    await supabase.auth.signOut();

    // Delete user from Supabase Auth (requires service role key)
    // This is optional but recommended for complete cleanup
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const adminClient = createAdminClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );
        await adminClient.auth.admin.deleteUser(user.id);
      } catch (authError) {
        // Log but don't fail if Supabase auth deletion fails
        console.error("Failed to delete Supabase auth user:", authError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully"
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}
