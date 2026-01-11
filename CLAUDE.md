# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build (runs prisma generate first)
npm run start        # Start production server
npm run lint         # ESLint
```

### Database Commands

```bash
npx prisma db push   # Push schema changes to database
npx prisma studio    # Open database GUI
npx prisma generate  # Regenerate Prisma client after schema changes
npm run db:seed      # Seed database (uses tsx prisma/seed.ts)
```

### Stripe Development

```bash
npm run stripe:listen  # Forward Stripe webhooks to localhost:3000/api/webhooks/stripe
```

## Architecture Overview

### Tech Stack
- **Next.js 14** with App Router
- **TypeScript** with path alias `@/*` mapping to `./src/*`
- **Supabase** for authentication (cookie-based SSR sessions)
- **Prisma** with PostgreSQL for data persistence
- **Stripe** for subscription billing
- **OpenAI GPT-4** for AI response generation
- **TailwindCSS + shadcn/ui** for styling

### Route Groups & Authentication

The app uses Next.js route groups with distinct layouts:

- `(marketing)/*` - Public pages (about, blog, contact, etc.)
- `(auth)/*` - Login, signup, forgot-password (redirects to dashboard if authenticated)
- `(dashboard)/*` - Protected routes requiring authentication

Authentication flow:
1. `src/middleware.ts` intercepts all requests
2. `lib/supabase/middleware.ts` validates session via Supabase SSR
3. Dashboard layout (`(dashboard)/layout.tsx`) syncs Supabase user to Prisma `users` table on first access

### API Routes

| Route | Purpose |
|-------|---------|
| `/api/generate` | AI response generation (validates usage limits, saves to DB) |
| `/api/webhooks/stripe` | Stripe webhook handler for subscription lifecycle |
| `/api/subscription` | Manage user subscription |
| `/api/user` | User profile operations |
| `/api/auth/callback` | OAuth callback handler |

### Data Models (Prisma)

- **User** - Linked to Supabase auth ID, stores Stripe subscription info and plan limits
- **Business** - User's business profiles with brand voice settings
- **ReviewResponse** - Generated responses with metadata (tokens, model, generation time)
- **Template** - User's custom response templates
- **UsageRecord** - Token and cost tracking per action

### Key Integrations

**Supabase Client Pattern:**
- `lib/supabase/client.ts` - Browser client
- `lib/supabase/server.ts` - Server Components/Actions (use `getUser()` helper)
- `lib/supabase/middleware.ts` - Request middleware

**Stripe Subscription Flow:**
1. User selects plan → `createCheckoutSession()` in `lib/stripe.ts`
2. Stripe redirects to checkout → completes payment
3. Webhook receives `checkout.session.completed` → updates user's plan in DB
4. Monthly `invoice.paid` → resets `responsesUsed` counter

**OpenAI Integration:**
- `lib/openai.ts` exports `generateReviewResponse()` - main generation function
- Supports 5 tone types: professional, friendly, empathetic, apologetic, enthusiastic
- Also exports `improveResponse()` for iterative editing

### Plan Limits

Defined in `lib/utils.ts` (`PLAN_LIMITS`) and `lib/stripe.ts` (`PLANS`):

| Plan | Responses/month | Businesses | Templates |
|------|-----------------|------------|-----------|
| FREE | 5 | 1 | 3 |
| STARTER | 100 | 3 | 10 |
| PRO | 500 | 10 | 50 |
| AGENCY | Unlimited (-1) | Unlimited | Unlimited |

### Component Structure

- `components/ui/*` - shadcn/ui primitives
- `components/landing/*` - Marketing page sections
- `components/dashboard/*` - Dashboard-specific components
- `components/shared/*` - Theme provider, breadcrumbs

### Environment Variables

Required variables (see `.env.example`):
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL` (Supabase PostgreSQL connection string)
- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- `STRIPE_STARTER_PRICE_ID`, `STRIPE_PRO_PRICE_ID`, `STRIPE_AGENCY_PRICE_ID`
- `OPENAI_API_KEY`
