# ReplyFlow - Deployment Guide

This guide walks you through deploying ReplyFlow to production with zero coding required.

## Prerequisites

Before deploying, you'll need accounts on:
- [Supabase](https://supabase.com) (free tier available)
- [Stripe](https://stripe.com) (free to create products)
- [OpenAI](https://platform.openai.com) (pay-as-you-go)
- [Vercel](https://vercel.com) (free tier available)

## Step 1: Supabase Setup (Database & Auth)

### Create Project
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose organization and name your project (e.g., "replyflow")
4. Generate a strong database password (save it!)
5. Choose a region close to your users
6. Click "Create new project"

### Get API Keys
1. Wait for project to initialize (~2 minutes)
2. Go to **Settings > API**
3. Copy these values for your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` = Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY` = service_role key (keep secret!)

### Get Database URL
1. Go to **Settings > Database**
2. Find "Connection string" section
3. Copy the URI (starts with `postgresql://`)
4. Replace `[YOUR-PASSWORD]` with your database password
5. This is your `DATABASE_URL`

### Configure Auth
1. Go to **Authentication > Providers**
2. Email is enabled by default
3. (Optional) Enable Google OAuth:
   - Create Google Cloud OAuth credentials
   - Add Client ID and Secret to Supabase

## Step 2: Stripe Setup (Payments)

### Create Account
1. Go to [stripe.com](https://stripe.com) and sign up
2. Complete account verification

### Get API Keys
1. Go to **Developers > API keys**
2. Copy for your `.env.local`:
   - `STRIPE_SECRET_KEY` = Secret key (starts with `sk_`)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = Publishable key (starts with `pk_`)

### Create Products
1. Go to **Products > Add product**

**Starter Plan:**
- Name: "Starter"
- Description: "100 AI responses/month"
- Price: $29/month (recurring)
- Copy the Price ID → `STRIPE_STARTER_PRICE_ID`

**Pro Plan:**
- Name: "Pro"
- Description: "500 AI responses/month"
- Price: $79/month (recurring)
- Copy the Price ID → `STRIPE_PRO_PRICE_ID`

**Agency Plan:**
- Name: "Agency"
- Description: "Unlimited AI responses"
- Price: $199/month (recurring)
- Copy the Price ID → `STRIPE_AGENCY_PRICE_ID`

### Setup Webhook (after deploying)
1. Go to **Developers > Webhooks**
2. Click "Add endpoint"
3. URL: `https://your-domain.com/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `invoice.paid`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the Signing secret → `STRIPE_WEBHOOK_SECRET`

## Step 3: OpenAI Setup (AI)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up/login
3. Go to **API Keys**
4. Click "Create new secret key"
5. Copy the key → `OPENAI_API_KEY`
6. Add payment method under **Billing** (pay-as-you-go)

**Cost estimate:** ~$0.01-0.03 per response (GPT-4 Turbo)

## Step 4: Deploy to Vercel

### Option A: One-Click Deploy (Easiest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the deploy button
2. Import your GitHub repository
3. Vercel will auto-detect Next.js settings
4. Add environment variables (all from previous steps)
5. Click "Deploy"

### Option B: CLI Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
cd replyflow
vercel

# Follow prompts and add environment variables when asked
```

### Environment Variables in Vercel

Go to your project's **Settings > Environment Variables** and add:

```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
DATABASE_URL=postgresql://postgres:xxx@db.xxx.supabase.co:5432/postgres
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_STARTER_PRICE_ID=price_xxx
STRIPE_PRO_PRICE_ID=price_xxx
STRIPE_AGENCY_PRICE_ID=price_xxx
OPENAI_API_KEY=sk-xxx
```

## Step 5: Initialize Database

After deployment, the database schema needs to be pushed:

```bash
# Set DATABASE_URL environment variable locally
export DATABASE_URL="your-database-url"

# Push schema to production database
npx prisma db push
```

Or run this from your local machine with the production DATABASE_URL.

## Step 6: Configure Stripe Webhook

Now that your app is deployed:

1. Go to Stripe Dashboard > **Developers > Webhooks**
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select the events mentioned above
4. Copy the webhook signing secret
5. Update `STRIPE_WEBHOOK_SECRET` in Vercel environment variables
6. Redeploy the app

## Step 7: Custom Domain (Optional)

1. In Vercel, go to **Settings > Domains**
2. Add your domain (e.g., `replyflow.com`)
3. Configure DNS as instructed
4. Update `NEXT_PUBLIC_APP_URL` in environment variables

## Post-Deployment Checklist

- [ ] Landing page loads correctly
- [ ] Sign up flow works
- [ ] Login flow works
- [ ] Dashboard loads for authenticated users
- [ ] Review response generation works
- [ ] Stripe checkout works (use test mode first!)
- [ ] Webhook events are received
- [ ] Email notifications work

## Going Live with Stripe

When ready for real payments:

1. Complete Stripe account verification
2. Replace test API keys with live keys in Vercel
3. Create live products/prices (same process as test)
4. Update price IDs in environment variables
5. Create live webhook endpoint
6. Update webhook secret
7. Redeploy

## Monitoring & Analytics

### Recommended Tools
- **Vercel Analytics** - Built into Vercel
- **PostHog** - Product analytics (free tier)
- **Sentry** - Error tracking (free tier)
- **LogRocket** - Session replay

### Add PostHog (Optional)
1. Create account at [posthog.com](https://posthog.com)
2. Add to environment variables:
   ```
   NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```

## Scaling Considerations

- **Database:** Supabase Pro ($25/mo) for higher limits
- **OpenAI:** Consider GPT-3.5-turbo for cost savings
- **CDN:** Vercel includes global CDN
- **Rate Limiting:** Consider adding API rate limits

## Troubleshooting

### Auth Not Working
- Check Supabase URL and keys
- Verify redirect URLs in Supabase Auth settings
- Check browser console for errors

### Payments Not Working
- Verify Stripe keys (test vs live)
- Check webhook endpoint is correct
- View Stripe Dashboard > Developers > Logs

### AI Generation Failing
- Check OpenAI API key is valid
- Verify you have billing set up
- Check usage limits in OpenAI dashboard

### Database Errors
- Verify DATABASE_URL is correct
- Run `npx prisma db push` again
- Check Supabase logs

## Support

For technical issues, check:
1. Vercel deployment logs
2. Supabase logs
3. Stripe webhook logs
4. Browser console

For business questions about ReplyFlow, refer to README.md marketing section.
