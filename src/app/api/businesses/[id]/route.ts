import { NextResponse } from "next/server";
import { getUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateBusinessSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  type: z.string().max(100).optional().nullable(),
  description: z.string().max(1000).optional().nullable(),
  address: z.string().max(500).optional().nullable(),
  phone: z.string().max(50).optional().nullable(),
  website: z.string().url().optional().nullable().or(z.literal("")),
  brandVoice: z.enum(["professional", "friendly", "empathetic", "apologetic", "enthusiastic"]).optional().nullable(),
  toneKeywords: z.array(z.string()).optional(),
  avoidKeywords: z.array(z.string()).optional(),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const business = await prisma.business.findUnique({
      where: { id },
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
        userId: true,
        _count: {
          select: { responses: true },
        },
      },
    });

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    // Check ownership
    if (business.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    return NextResponse.json({ business });
  } catch (error) {
    console.error("Get business error:", error);
    return NextResponse.json({ error: "Failed to get business" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check ownership
    const existingBusiness = await prisma.business.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!existingBusiness) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    if (existingBusiness.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = updateBusinessSchema.parse(body);

    // Handle empty website string
    const dataToUpdate = {
      ...validatedData,
      website: validatedData.website === "" ? null : validatedData.website,
      updatedAt: new Date(),
    };

    const business = await prisma.business.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({ business });
  } catch (error) {
    console.error("Update business error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Failed to update business" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check ownership
    const existingBusiness = await prisma.business.findUnique({
      where: { id },
      select: { userId: true, _count: { select: { responses: true } } },
    });

    if (!existingBusiness) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 });
    }

    if (existingBusiness.userId !== user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    await prisma.business.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      deletedResponses: existingBusiness._count.responses,
    });
  } catch (error) {
    console.error("Delete business error:", error);
    return NextResponse.json({ error: "Failed to delete business" }, { status: 500 });
  }
}
