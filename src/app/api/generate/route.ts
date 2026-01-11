import { NextResponse } from "next/server";
import { getUser } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { generateReviewResponse } from "@/lib/openai";
import { z } from "zod";

const generateSchema = z.object({
  reviewText: z.string().min(10),
  reviewerName: z.string().optional(),
  reviewRating: z.number().min(1).max(5).optional(),
  platform: z.string().optional(),
  businessName: z.string(),
  businessType: z.string().optional(),
  tone: z.enum(["professional", "friendly", "empathetic", "apologetic", "enthusiastic"]).default("professional"),
  customInstructions: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from database
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check usage limits
    const isUnlimited = dbUser.responsesLimit === -1;
    if (!isUnlimited && dbUser.responsesUsed >= dbUser.responsesLimit) {
      return NextResponse.json(
        { error: "Monthly response limit reached. Please upgrade your plan." },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = generateSchema.parse(body);

    // Generate response using OpenAI
    const startTime = Date.now();
    const { response, tokensUsed, modelUsed } = await generateReviewResponse({
      reviewText: validatedData.reviewText,
      reviewerName: validatedData.reviewerName,
      reviewRating: validatedData.reviewRating,
      businessName: validatedData.businessName,
      businessType: validatedData.businessType,
      tone: validatedData.tone,
      customInstructions: validatedData.customInstructions,
    });
    const generationTime = Date.now() - startTime;

    // Save response to database
    const savedResponse = await prisma.reviewResponse.create({
      data: {
        userId: dbUser.id,
        reviewText: validatedData.reviewText,
        reviewerName: validatedData.reviewerName,
        reviewRating: validatedData.reviewRating,
        reviewPlatform: validatedData.platform,
        responseText: response,
        responseTone: validatedData.tone,
        tokensUsed,
        modelUsed,
        generationTime,
      },
    });

    // Update user's response count
    await prisma.user.update({
      where: { id: dbUser.id },
      data: { responsesUsed: { increment: 1 } },
    });

    // Record usage
    await prisma.usageRecord.create({
      data: {
        userId: dbUser.id,
        action: "generate",
        tokensUsed,
        cost: (tokensUsed / 1000) * 0.01, // Approximate cost
        metadata: {
          responseId: savedResponse.id,
          tone: validatedData.tone,
          platform: validatedData.platform,
        },
      },
    });

    return NextResponse.json({
      success: true,
      response,
      responseId: savedResponse.id,
      tokensUsed,
      generationTime,
    });
  } catch (error) {
    console.error("Generate error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
