import type { User, Business, ReviewResponse, Template, Plan } from "@prisma/client";

// Re-export Prisma types
export type { User, Business, ReviewResponse, Template, Plan };

// Extended types with relations
export interface UserWithRelations extends User {
  businesses?: Business[];
  responses?: ReviewResponse[];
  templates?: Template[];
}

export interface BusinessWithRelations extends Business {
  user?: User;
  responses?: ReviewResponse[];
}

export interface ReviewResponseWithRelations extends ReviewResponse {
  user?: User;
  business?: Business | null;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form types
export interface GenerateResponseForm {
  reviewText: string;
  reviewerName?: string;
  reviewRating?: number;
  reviewPlatform?: string;
  businessId?: string;
  tone?: ToneType;
}

export type ToneType = "professional" | "friendly" | "empathetic" | "apologetic" | "enthusiastic";

export const TONE_OPTIONS: { value: ToneType; label: string; description: string }[] = [
  {
    value: "professional",
    label: "Professional",
    description: "Formal and courteous",
  },
  {
    value: "friendly",
    label: "Friendly",
    description: "Warm and conversational",
  },
  {
    value: "empathetic",
    label: "Empathetic",
    description: "Understanding and caring",
  },
  {
    value: "apologetic",
    label: "Apologetic",
    description: "Sincere and solution-focused",
  },
  {
    value: "enthusiastic",
    label: "Enthusiastic",
    description: "Upbeat and grateful",
  },
];

export const PLATFORM_OPTIONS = [
  { value: "google", label: "Google Reviews" },
  { value: "yelp", label: "Yelp" },
  { value: "facebook", label: "Facebook" },
  { value: "tripadvisor", label: "TripAdvisor" },
  { value: "trustpilot", label: "Trustpilot" },
  { value: "other", label: "Other" },
];

export const BUSINESS_TYPE_OPTIONS = [
  { value: "restaurant", label: "Restaurant / Cafe" },
  { value: "retail", label: "Retail Store" },
  { value: "service", label: "Service Business" },
  { value: "healthcare", label: "Healthcare" },
  { value: "hospitality", label: "Hotel / Hospitality" },
  { value: "automotive", label: "Automotive" },
  { value: "professional", label: "Professional Services" },
  { value: "fitness", label: "Fitness / Wellness" },
  { value: "beauty", label: "Beauty / Salon" },
  { value: "other", label: "Other" },
];

// Dashboard stats
export interface DashboardStats {
  totalResponses: number;
  responsesThisMonth: number;
  responsesRemaining: number;
  averageRating: number;
  topPlatform: string;
  recentActivity: RecentActivity[];
}

export interface RecentActivity {
  id: string;
  type: "response" | "template" | "business";
  action: string;
  description: string;
  createdAt: Date;
}

// Subscription types
export interface SubscriptionInfo {
  plan: Plan;
  status: "active" | "canceled" | "past_due" | "trialing";
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  responsesUsed: number;
  responsesLimit: number;
}
