import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // In production, you would:
    // 1. Send an email notification to support team
    // 2. Store the message in a database
    // 3. Send a confirmation email to the user
    // 4. Integrate with a ticketing system (Zendesk, Intercom, etc.)

    // For now, we'll log the message and simulate success
    console.log("Contact form submission:", {
      ...validatedData,
      timestamp: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || "unknown",
    });

    // Map subject to human-readable category
    const subjectLabels: Record<string, string> = {
      sales: "Sales Inquiry",
      support: "Technical Support",
      billing: "Billing Question",
      partnership: "Partnership Opportunity",
      press: "Press & Media",
      other: "Other",
    };

    // Return success with ticket ID (simulated)
    const ticketId = `RF-${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      message: "Your message has been received. We'll respond within 24 hours.",
      ticketId,
      category: subjectLabels[validatedData.subject] || validatedData.subject,
    });
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to submit contact form. Please try again." },
      { status: 500 }
    );
  }
}
