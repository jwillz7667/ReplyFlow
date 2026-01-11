# ReplyFlow - AI Review Response Platform

**Generate professional, personalized responses to customer reviews in seconds.**

ReplyFlow is a production-ready SaaS application that helps businesses manage their online reputation by automatically generating high-quality responses to customer reviews using AI.

## Revenue Potential: $10,000/month

| Plan | Price | Customers Needed |
|------|-------|-----------------|
| Starter | $29/mo | ~345 customers |
| Pro | $79/mo | ~127 customers |
| Agency | $199/mo | ~50 customers |

**Realistic Mix:** 100-200 customers at various tiers = $10k/month

## Quick Start

```bash
# 1. Make setup script executable and run it
chmod +x setup.sh
./setup.sh

# 2. Configure your environment variables in .env.local

# 3. Push database schema
npx prisma db push

# 4. Start development server
npm run dev

# 5. Open http://localhost:3000
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS + shadcn/ui
- **Database:** PostgreSQL (via Supabase)
- **ORM:** Prisma
- **Auth:** Supabase Auth
- **Payments:** Stripe
- **AI:** OpenAI GPT-4

## Project Structure

```
replyflow/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Auth pages (login, signup)
│   │   ├── (dashboard)/       # Dashboard pages
│   │   ├── api/               # API routes
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   ├── landing/           # Landing page sections
│   │   ├── dashboard/         # Dashboard components
│   │   └── shared/            # Shared components
│   ├── lib/                   # Utilities and integrations
│   │   ├── supabase/          # Supabase client
│   │   ├── prisma.ts          # Prisma client
│   │   ├── stripe.ts          # Stripe integration
│   │   ├── openai.ts          # OpenAI integration
│   │   └── utils.ts           # Utility functions
│   ├── hooks/                 # Custom React hooks
│   └── types/                 # TypeScript types
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
└── .env.example               # Environment variables template
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase (https://supabase.com/dashboard)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=your_database_url

# Stripe (https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_STARTER_PRICE_ID=price_xxx
STRIPE_PRO_PRICE_ID=price_xxx
STRIPE_AGENCY_PRICE_ID=price_xxx

# OpenAI (https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-xxx
```

## Setup Instructions

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com/dashboard)
2. Go to **Settings > API** to get your keys
3. Go to **Settings > Database** to get the connection string
4. Enable **Email auth** in Authentication settings
5. (Optional) Enable **Google OAuth** in Authentication > Providers

### 2. Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from **Developers > API keys**
3. Create products and prices in **Products**:
   - Starter: $29/month
   - Pro: $79/month
   - Agency: $199/month
4. Set up webhook endpoint at **Developers > Webhooks**:
   - Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events to listen for:
     - `checkout.session.completed`
     - `invoice.paid`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`

### 3. OpenAI Setup

1. Create an account at [platform.openai.com](https://platform.openai.com)
2. Generate an API key in **API Keys**
3. Ensure you have GPT-4 access (may require payment)

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio
npx prisma studio
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in project settings
5. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Deploy to Other Platforms

The app is a standard Next.js application and can be deployed to:
- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify
- Any platform supporting Node.js

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open database GUI
npx prisma db push   # Push schema changes
```

## Features

### For Users
- AI-generated review responses
- Multiple tone options (professional, friendly, empathetic)
- Multi-platform support (Google, Yelp, Facebook, etc.)
- Response history
- Custom templates
- Usage analytics

### For Business
- Subscription tiers with Stripe
- Usage-based limits
- Team collaboration (Pro+)
- API access (Agency)
- White-label options (Agency)

## Marketing Strategy

### Customer Acquisition Channels

1. **SEO/Content Marketing**
   - Blog posts about review management
   - Target keywords: "how to respond to negative reviews", "review response templates"

2. **Social Media**
   - LinkedIn (B2B focus)
   - Twitter/X (startup community)
   - YouTube tutorials

3. **Partnerships**
   - Local business associations
   - Marketing agencies
   - POS/CRM integrations

4. **Paid Acquisition**
   - Google Ads (target business owner searches)
   - Facebook/Instagram ads
   - LinkedIn ads for agencies

### Conversion Optimization

- Free trial (5 responses, no credit card)
- Case studies with ROI data
- Live demo on landing page
- Money-back guarantee

## Support

For issues and feature requests, please open a GitHub issue.

## License

MIT License - feel free to use this for your own business!
