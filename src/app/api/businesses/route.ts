import { NextResponse } from "next/server";
import { getUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { PLAN_LIMITS, isUnlimited } from "@/lib/utils";

const createBusinessSchema = z.object({
  name: z.string().min(1).max(200),
  type: z.string().max(100).optional(),
  description: z.string().max(1000).optional(),
  address: z.string().max(500).optional(),
  phone: z.string().max(50).optional(),
  website: z.string().url().optional().or(z.literal("")),
  brandVoice: z.enum(["professional", "friendly", "empathetic", "apologetic", "enthusiastic"]).optional(),
  toneKeywords: z.array(z.string()).optional(),
  avoidKeywords: z.array(z.string()).optional(),
});

export async function GET(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const businesses = await prisma.business.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        type: true,
        description: true,
        address: true,
        phone: true,
        website: true,
        brandVoice: true,
        toneKeywords: true,
        avoidKeywords: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { responses: true },
        },
      },
    });

    return NextResponse.json({ businesses });
  } catch (error) {
    console.error("Get businesses error:", error);
    return NextResponse.json({ error: "Failed to get businesses" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's plan and current business count
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { plan: true },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const businessCount = await prisma.business.count({
      where: { userId: user.id },
    });

    const businessLimit = PLAN_LIMITS[dbUser.plan].businesses;
    if (!isUnlimited(businessLimit) && businessCount >= businessLimit) {
      return NextResponse.json(
        { error: `Business limit reached. Your ${dbUser.plan} plan allows ${businessLimit} business${businessLimit > 1 ? 'es' : ''}.` },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = createBusinessSchema.parse(body);

    // Handle empty website string
    const dataToCreate = {
      ...validatedData,
      website: validatedData.website || null,
    };

    const business = await prisma.business.create({
      data: {
        userId: user.id,
        ...dataToCreate,
      },
    });

    return NextResponse.json({ business }, { status: 201 });
  } catch (error) {
    console.error("Create business error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Failed to create business" }, { status: 500 });
  }
}
