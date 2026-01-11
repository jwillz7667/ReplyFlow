import { NextResponse } from "next/server";
import { getUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { PLAN_LIMITS, isUnlimited } from "@/lib/utils";

const createTemplateSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  category: z.enum(["positive", "negative", "neutral", "complaint"]).optional(),
  promptTemplate: z.string().min(1).max(5000),
  exampleOutput: z.string().max(2000).optional(),
  tone: z.enum(["professional", "friendly", "empathetic", "apologetic", "enthusiastic"]).optional(),
  isPublic: z.boolean().optional(),
});

const updateTemplateSchema = createTemplateSchema.partial();

export async function GET(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const includePublic = searchParams.get("includePublic") === "true";

    const whereClause = {
      OR: [
        { userId: user.id },
        ...(includePublic ? [{ isPublic: true }] : []),
      ],
      ...(category ? { category } : {}),
    };

    const templates = await prisma.template.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        promptTemplate: true,
        exampleOutput: true,
        tone: true,
        isPublic: true,
        useCount: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
      },
    });

    return NextResponse.json({ templates });
  } catch (error) {
    console.error("Get templates error:", error);
    return NextResponse.json({ error: "Failed to get templates" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's plan and current template count
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { plan: true },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const templateCount = await prisma.template.count({
      where: { userId: user.id },
    });

    const templateLimit = PLAN_LIMITS[dbUser.plan].templates;
    if (!isUnlimited(templateLimit) && templateCount >= templateLimit) {
      return NextResponse.json(
        { error: `Template limit reached. Your ${dbUser.plan} plan allows ${templateLimit} templates.` },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = createTemplateSchema.parse(body);

    const template = await prisma.template.create({
      data: {
        userId: user.id,
        ...validatedData,
      },
    });

    return NextResponse.json({ template }, { status: 201 });
  } catch (error) {
    console.error("Create template error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Failed to create template" }, { status: 500 });
  }
}
