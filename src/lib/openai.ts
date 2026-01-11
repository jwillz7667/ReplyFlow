import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export type ToneType = "professional" | "friendly" | "empathetic" | "apologetic" | "enthusiastic";

export interface GenerateResponseParams {
  reviewText: string;
  reviewerName?: string;
  reviewRating?: number;
  businessName: string;
  businessType?: string;
  tone?: ToneType;
  customInstructions?: string;
  language?: string;
}

export interface GeneratedResponse {
  response: string;
  tokensUsed: number;
  modelUsed: string;
}

const TONE_INSTRUCTIONS: Record<ToneType, string> = {
  professional:
    "Write in a professional, courteous tone. Be formal but warm. Use proper grammar and avoid slang.",
  friendly:
    "Write in a warm, friendly tone. Be conversational and approachable. Use a casual but respectful style.",
  empathetic:
    "Write with deep empathy and understanding. Acknowledge the customer's feelings. Show genuine concern.",
  apologetic:
    "Write with sincere apology. Take responsibility where appropriate. Focus on making things right.",
  enthusiastic:
    "Write with genuine enthusiasm and gratitude. Be upbeat and positive. Show excitement about serving the customer.",
};

export async function generateReviewResponse({
  reviewText,
  reviewerName,
  reviewRating,
  businessName,
  businessType,
  tone = "professional",
  customInstructions,
  language = "English",
}: GenerateResponseParams): Promise<GeneratedResponse> {
  const ratingContext = reviewRating
    ? `This is a ${reviewRating}-star review (out of 5).`
    : "";

  const reviewerContext = reviewerName
    ? `The reviewer's name is ${reviewerName}.`
    : "The reviewer's name is not provided.";

  const businessContext = businessType
    ? `${businessName} is a ${businessType}.`
    : `The business is ${businessName}.`;

  const systemPrompt = `You are an expert at writing review responses for businesses. Your responses help businesses maintain excellent customer relationships and online reputation.

${TONE_INSTRUCTIONS[tone]}

Guidelines:
- Keep responses concise (2-4 sentences for positive reviews, 3-5 for negative)
- Address specific points mentioned in the review
- For negative reviews: acknowledge the issue, apologize if appropriate, offer to resolve
- For positive reviews: express genuine gratitude, mention specifics from their review
- Always invite them back or to continue the relationship
- Never be defensive or dismissive
- Don't use generic phrases like "valued customer" excessively
- Personalize based on review content
${customInstructions ? `\nAdditional instructions: ${customInstructions}` : ""}

Write the response in ${language}.`;

  const userPrompt = `Generate a response to this customer review:

Business: ${businessContext}
${ratingContext}
${reviewerContext}

Review:
"${reviewText}"

Write a ${tone} response that addresses their specific feedback.`;

  const startTime = Date.now();

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 500,
    presence_penalty: 0.1,
    frequency_penalty: 0.1,
  });

  const response = completion.choices[0]?.message?.content?.trim() || "";
  const tokensUsed = completion.usage?.total_tokens || 0;

  return {
    response,
    tokensUsed,
    modelUsed: "gpt-4-turbo-preview",
  };
}

export async function improveResponse({
  originalResponse,
  instruction,
}: {
  originalResponse: string;
  instruction: string;
}): Promise<GeneratedResponse> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content:
          "You are an expert editor who improves business review responses. Make the requested changes while maintaining professionalism and the core message.",
      },
      {
        role: "user",
        content: `Original response:\n"${originalResponse}"\n\nInstruction: ${instruction}\n\nProvide the improved version:`,
      },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  return {
    response: completion.choices[0]?.message?.content?.trim() || originalResponse,
    tokensUsed: completion.usage?.total_tokens || 0,
    modelUsed: "gpt-4-turbo-preview",
  };
}

export async function generateMultipleResponses({
  params,
  count = 3,
}: {
  params: GenerateResponseParams;
  count?: number;
}): Promise<GeneratedResponse[]> {
  const tones: ToneType[] = ["professional", "friendly", "empathetic"];
  const responses = await Promise.all(
    tones.slice(0, count).map((tone) =>
      generateReviewResponse({ ...params, tone })
    )
  );
  return responses;
}
