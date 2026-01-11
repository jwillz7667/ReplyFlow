export interface HelpArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  content: string;
  relatedArticles?: string[];
}

export interface HelpCategory {
  slug: string;
  title: string;
  description: string;
  icon: string;
}

export const helpCategories: HelpCategory[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description: "Learn the basics and set up your account",
    icon: "Zap",
  },
  {
    slug: "responses",
    title: "Response Generation",
    description: "Creating and customizing AI responses",
    icon: "MessageSquare",
  },
  {
    slug: "billing",
    title: "Billing & Plans",
    description: "Subscriptions, payments, and invoices",
    icon: "CreditCard",
  },
  {
    slug: "account",
    title: "Account Settings",
    description: "Profile, preferences, and security",
    icon: "Settings",
  },
  {
    slug: "team",
    title: "Team & Collaboration",
    description: "Managing team members and permissions",
    icon: "Users",
  },
  {
    slug: "security",
    title: "Security & Privacy",
    description: "Data protection and account security",
    icon: "Shield",
  },
];

export const helpArticles: HelpArticle[] = [
  {
    slug: "first-response",
    title: "How to generate your first review response",
    description: "A step-by-step guide to creating your first AI-powered review response with ReplyFlow.",
    category: "Getting Started",
    categorySlug: "getting-started",
    relatedArticles: ["brand-voice", "usage-limits"],
    content: `
Welcome to ReplyFlow! This guide will walk you through generating your first AI-powered review response in just a few minutes.

## Prerequisites

Before you begin, make sure you have:
- Created a ReplyFlow account
- Verified your email address
- Completed your basic profile setup

## Step 1: Navigate to the Generator

After logging in, click on **"Generate Response"** in the left sidebar or click the **"New Response"** button on your dashboard.

## Step 2: Paste the Review

In the text area labeled "Customer Review," paste the review you want to respond to. This could be a review from:
- Google Business Profile
- Yelp
- Facebook
- TripAdvisor
- Any other review platform

## Step 3: Configure Your Response

### Select the Star Rating

Choose the star rating that matches the original review. This helps our AI understand the sentiment and craft an appropriate response.

- **5 stars**: Grateful and enthusiastic tone
- **4 stars**: Appreciative with acknowledgment of feedback
- **3 stars**: Balanced and improvement-focused
- **2 stars**: Apologetic and solution-oriented
- **1 star**: Empathetic with clear resolution steps

### Choose Your Tone

Select from five tone options:
- **Professional**: Business-appropriate and formal
- **Friendly**: Warm and personable
- **Empathetic**: Understanding and compassionate
- **Apologetic**: Sincere and remorseful
- **Enthusiastic**: Upbeat and energetic

### Select the Platform (Optional)

Choosing the platform helps tailor the response to platform-specific best practices.

## Step 4: Generate and Review

Click the **"Generate Response"** button. Within seconds, you'll receive a customized response.

### Review the Output

- Read through the generated response
- Check that it addresses the specific points in the review
- Ensure the tone matches your brand voice

## Step 5: Edit and Copy

### Make Adjustments

Click anywhere in the response text to edit. Consider:
- Adding specific details about the reviewer's experience
- Including the reviewer's name if mentioned
- Adding your name or position for a personal touch

### Copy to Clipboard

Once satisfied, click the **"Copy"** button to copy the response. You can then paste it directly into the review platform.

## Tips for Best Results

1. **Include context**: The more details in the original review, the better the response
2. **Set your business name**: Configure this in Settings for personalized responses
3. **Experiment with tones**: Try different tones to find what works best for your brand
4. **Save time with templates**: Create templates for common scenarios

## What's Next?

- [Customize your brand voice settings](/help/articles/brand-voice)
- [Understanding your usage limits](/help/articles/usage-limits)
- [Best practices for negative reviews](/help/articles/negative-reviews)

Congratulations! You've generated your first response. With practice, you'll develop an efficient workflow for managing all your reviews.
    `.trim(),
  },
  {
    slug: "brand-voice",
    title: "Customizing your brand voice settings",
    description: "Learn how to configure ReplyFlow to match your unique brand personality and tone.",
    category: "Response Generation",
    categorySlug: "responses",
    relatedArticles: ["first-response", "negative-reviews"],
    content: `
Your brand voice is what makes your responses uniquely yours. This guide shows you how to customize ReplyFlow to consistently reflect your brand personality.

## What is Brand Voice?

Brand voice is the consistent personality and tone your business uses in all communications. It helps customers recognize and connect with your brand.

## Accessing Brand Voice Settings

1. Go to **Settings** in the left sidebar
2. Scroll to **Business Information**
3. Find the **Brand Voice** section

## Configuring Your Default Tone

### Available Tones

Choose your default tone preference:

**Professional**
Best for: Law firms, financial services, B2B companies
Characteristics: Formal, respectful, authoritative

**Friendly**
Best for: Retail, hospitality, consumer services
Characteristics: Warm, approachable, conversational

**Empathetic**
Best for: Healthcare, customer service, support roles
Characteristics: Understanding, caring, supportive

**Apologetic**
Best for: Service recovery, complaint responses
Characteristics: Sincere, accountable, solution-focused

**Enthusiastic**
Best for: Entertainment, fitness, youth brands
Characteristics: Energetic, positive, exciting

## Setting Your Business Name

Enter your business name exactly as you want it to appear in responses. The AI will naturally incorporate this into generated text.

**Examples:**
- "The Coffee House"
- "Dr. Smith's Dental"
- "Smith & Associates Law Firm"

## Business Type Configuration

Selecting your business type helps the AI understand industry context:

- Restaurant / Food Service
- Retail / Shopping
- Professional Services
- Healthcare
- Hospitality / Hotel
- Automotive
- Home Services
- Other

## Advanced Settings

### Custom Instructions

Add specific instructions that apply to all responses:

**Examples:**
- "Always mention our loyalty program"
- "Include our website URL in longer responses"
- "Never use contractions"
- "Always end with an invitation to visit again"

### Words to Avoid

List words or phrases you don't want in responses:
- Competitor names
- Problematic terminology
- Overused phrases

### Preferred Phrases

Words and phrases you want emphasized:
- Brand slogans
- Key differentiators
- Frequently used terminology

## Testing Your Settings

After configuring:

1. Generate a test response
2. Review for brand consistency
3. Adjust settings as needed
4. Generate another response to confirm

## Tips for Consistency

- Document your brand voice guidelines
- Review generated responses regularly
- Update settings as your brand evolves
- Train team members on brand standards

## Need Help?

If you're unsure about your brand voice settings, our support team can provide recommendations based on your industry and goals.
    `.trim(),
  },
  {
    slug: "usage-limits",
    title: "Understanding your usage limits",
    description: "Learn about response limits for each plan and how to track your usage.",
    category: "Billing & Plans",
    categorySlug: "billing",
    relatedArticles: ["first-response", "export-history"],
    content: `
Each ReplyFlow plan includes a monthly allowance of AI-generated responses. Here's everything you need to know about usage limits and tracking.

## Plan Limits Overview

### Free Plan
- **5 responses** per month
- 1 business location
- 3 custom templates
- Basic support

### Starter Plan - $29/month
- **100 responses** per month
- 3 business locations
- 10 custom templates
- Email support

### Pro Plan - $79/month
- **500 responses** per month
- 10 business locations
- 50 custom templates
- Priority support
- Analytics dashboard

### Agency Plan - $199/month
- **Unlimited responses**
- Unlimited locations
- Unlimited templates
- Dedicated support
- API access

## Checking Your Usage

### Dashboard View

Your current usage is displayed on:
- The main dashboard
- The sidebar (showing X/Y responses used)
- The Generate page header

### Detailed Usage Stats

For detailed usage information:
1. Go to **Billing** in the sidebar
2. Click **"View Usage"**
3. See breakdown by:
   - Day/Week/Month
   - Business location
   - Response type

## Billing Cycle

### When Does Usage Reset?

Usage resets on the first day of each billing cycle, not the calendar month. Your billing cycle date is:
- The day you first subscribed
- Visible in Billing settings

### Mid-Cycle Upgrades

If you upgrade mid-cycle:
- New limits apply immediately
- Previous usage counts toward new limit
- No prorated charges for response increases

## What Happens at the Limit?

### Free Plan

When you reach 5 responses:
- A upgrade prompt appears
- You cannot generate more responses
- Editing and copying existing responses still works

### Paid Plans

When approaching your limit:
- Warning at 80% usage
- Alert at 100% usage
- Option to upgrade or wait for reset

## Tips for Managing Usage

### Optimize Your Workflow

1. **Review before generating**: Make sure the review is ready
2. **Use templates**: Templates don't count against limits
3. **Edit effectively**: Make the most of each generation

### Track Trends

Monitor your usage patterns to:
- Predict monthly needs
- Identify peak times
- Plan for busy seasons

### Consider Upgrading

Signs you might need more responses:
- Consistently hitting limits
- Delaying response to reviews
- Multiple team members sharing account

## Frequently Asked Questions

**Do edited responses count as new responses?**
No, editing a generated response doesn't use additional quota.

**Can I purchase additional responses?**
Currently, additional responses aren't available a la carte. Consider upgrading to the next tier.

**Do unused responses roll over?**
No, unused responses don't roll over to the next month.

**What if I need a custom limit?**
Contact our sales team for custom enterprise plans.

## Need More Responses?

If you consistently need more responses, upgrading your plan provides:
- Higher limits
- Additional features
- Better support
- Long-term savings vs overage charges

[View pricing and upgrade options](/billing)
    `.trim(),
  },
  {
    slug: "multiple-locations",
    title: "Connecting multiple business locations",
    description: "How to set up and manage responses for multiple business locations.",
    category: "Account Settings",
    categorySlug: "account",
    relatedArticles: ["brand-voice", "usage-limits"],
    content: `
If you operate multiple business locations, ReplyFlow makes it easy to manage reviews for all of them from one account. This guide shows you how.

## Location Limits by Plan

| Plan | Locations |
|------|-----------|
| Free | 1 |
| Starter | 3 |
| Pro | 10 |
| Agency | Unlimited |

## Adding a New Location

### Step 1: Access Business Settings

1. Go to **Settings** in the sidebar
2. Click **"Businesses"** tab
3. Click **"Add Business"**

### Step 2: Enter Location Details

Fill in the following information:
- **Business Name**: e.g., "Joe's Coffee - Downtown"
- **Type**: Restaurant, Retail, Service, etc.
- **Address**: Full street address
- **Phone**: Local phone number
- **Website**: Location-specific website (if applicable)

### Step 3: Configure Brand Settings

Each location can have its own:
- **Brand Voice**: Match local preferences
- **Default Tone**: Professional, Friendly, etc.
- **Custom Instructions**: Location-specific notes

### Step 4: Save and Activate

Click **"Save Business"** to add the location. It will appear in your business selector.

## Switching Between Locations

### On the Generator Page

1. Find the **"Business"** dropdown
2. Select the relevant location
3. Generate responses specific to that location

### Quick Switching

Use keyboard shortcut **Ctrl/Cmd + B** to quickly switch businesses while generating responses.

## Location-Specific Settings

### Individual Brand Voice

Each location can have unique:
- Tone preferences
- Manager name/signature
- Local promotions to mention
- Specific instructions

### Shared vs. Individual Templates

Templates can be:
- **Account-wide**: Available for all locations
- **Location-specific**: Only show for selected business

## Managing Multiple Team Members

For agencies managing client locations:

1. Create separate businesses for each client
2. Assign team members to specific businesses
3. Set permission levels per business

## Best Practices

### Naming Conventions

Use consistent naming:
- "Brand Name - Neighborhood"
- "Brand Name - City, State"
- Include identifier for easy recognition

### Regular Audits

Monthly, review:
- Location information accuracy
- Brand voice consistency
- Response quality per location

### Response Consistency

Maintain brand standards across locations while allowing for local personality.

## Troubleshooting

### Can't Add More Locations?

You've reached your plan limit. Upgrade for more.

### Wrong Location in Responses?

Double-check your business selection before generating.

### Location Information Not Appearing?

Ensure all fields are filled in the business settings.

## Upgrading for More Locations

If you need more locations:
- Starter: Up to 3 locations
- Pro: Up to 10 locations
- Agency: Unlimited locations

[View upgrade options](/billing)
    `.trim(),
  },
  {
    slug: "negative-reviews",
    title: "Best practices for responding to negative reviews",
    description: "Expert strategies for handling negative feedback professionally and effectively.",
    category: "Response Generation",
    categorySlug: "responses",
    relatedArticles: ["first-response", "brand-voice"],
    content: `
Negative reviews are opportunities in disguise. This guide shares proven strategies for turning criticism into customer loyalty.

## Why Negative Reviews Matter

- 45% of consumers are more likely to visit a business that responds to negative reviews
- Your response is read by all potential customers
- Proper handling can convert critics into advocates

## The Anatomy of a Great Response

### 1. Respond Quickly

- Aim for within 24 hours
- Quick responses show you care
- Prevents negative sentiment from spreading

### 2. Start with Empathy

**Do say:**
- "I'm sorry to hear about your experience..."
- "Thank you for bringing this to our attention..."
- "I understand how frustrating this must have been..."

**Don't say:**
- "I'm sorry you feel that way..."
- "We've never had this complaint before..."
- "That's not our policy..."

### 3. Acknowledge the Issue

Be specific about what went wrong:
- Reference details from their review
- Show you actually read and understood
- Demonstrate genuine concern

### 4. Take Responsibility

Even if not entirely your fault:
- Avoid blame and excuses
- Own what you can
- Focus on solutions, not fault

### 5. Offer a Resolution

Provide concrete next steps:
- Specific actions you'll take
- Contact information for follow-up
- Timeline for resolution

### 6. Take It Offline

For complex issues:
- Invite private conversation
- Provide direct contact details
- Promise personal attention

## Using ReplyFlow for Negative Reviews

### Tone Settings

For negative reviews, consider:
- **Empathetic**: For service failures
- **Apologetic**: For clear mistakes
- **Professional**: For complex situations

### Custom Instructions

Add instructions like:
- "Include manager contact information"
- "Mention our service guarantee"
- "Invite them to discuss privately"

### Review AI Suggestions

Always edit AI responses to:
- Add specific details
- Personalize the message
- Include your own touch

## Common Scenarios

### Bad Service Experience

Focus on:
- Sincere apology
- Staff retraining mention
- Invitation to return

### Product Quality Issues

Include:
- Replacement/refund offer
- Quality commitment
- Direct contact for resolution

### Wait Times

Address with:
- Acknowledgment of inconvenience
- Explanation (if relevant)
- Improvement commitment

### Misunderstandings

Handle by:
- Gentle clarification
- Taking responsibility for confusion
- Offering to make things right

## What NOT to Do

### Never Get Defensive

Even if the customer is wrong, arguing publicly hurts your reputation.

### Don't Ignore Reviews

No response suggests you don't care. Always acknowledge feedback.

### Avoid Template-Sounding Responses

Generic responses feel insincere. Customize every reply.

### Never Reveal Private Information

Keep the conversation appropriate for public viewing.

## Measuring Success

Track these metrics:
- Response rate to negative reviews
- Average response time
- Review updates/removals
- Customer return rate

## Templates for Common Situations

ReplyFlow includes pre-built templates for:
- Service complaints
- Product issues
- Pricing concerns
- Staff behavior
- Wait times

Access these in your Templates section.

## Final Tips

1. See negative reviews as feedback, not attacks
2. Every response is a public marketing opportunity
3. Consistency builds trust
4. Follow up after resolution
5. Learn from patterns in negative feedback

Remember: Your response to a negative review tells potential customers more about your business than the review itself.
    `.trim(),
  },
  {
    slug: "export-history",
    title: "How to export your response history",
    description: "Export your generated responses for record-keeping, analysis, or backup.",
    category: "Account Settings",
    categorySlug: "account",
    relatedArticles: ["usage-limits", "multiple-locations"],
    content: `
Keep records of all your review responses with ReplyFlow's export feature. This guide shows you how to download your response history.

## Why Export Your History?

- **Record Keeping**: Maintain documentation of all communications
- **Analysis**: Review patterns and improve responses
- **Backup**: Keep a local copy of your data
- **Reporting**: Share metrics with stakeholders
- **Compliance**: Meet documentation requirements

## Export Options

### Available Formats

Choose from:
- **CSV**: For spreadsheet analysis
- **JSON**: For developers and data integration
- **PDF**: For formatted reports

### Data Included

Exports contain:
- Original review text
- Generated response text
- Date and time
- Star rating
- Platform
- Tone used
- Business location

## How to Export

### Full History Export

1. Go to **History** in the sidebar
2. Click the **Export** button (top right)
3. Select format (CSV, JSON, or PDF)
4. Choose date range
5. Click **Download**

### Filtered Export

Export specific responses:
1. Apply filters (date, rating, location)
2. Click **Export Filtered**
3. Select format
4. Download

### Individual Response Export

For single responses:
1. Open the response details
2. Click the **More** menu (three dots)
3. Select **Export**

## Export Filters

### By Date Range

- Last 7 days
- Last 30 days
- Last 90 days
- Custom range

### By Business

Select specific location(s) to include

### By Rating

Filter by original review rating

### By Platform

Google, Yelp, Facebook, etc.

## CSV Format Details

CSV exports include columns:
| Column | Description |
|--------|-------------|
| id | Unique response ID |
| created_at | Timestamp |
| review_text | Original review |
| response_text | Generated response |
| rating | Star rating |
| platform | Review source |
| tone | Response tone used |
| business_name | Location name |
| was_edited | If manually edited |

## JSON Format Details

JSON exports follow this structure:

\`\`\`json
{
  "export_date": "2026-01-08",
  "total_responses": 150,
  "responses": [
    {
      "id": "abc123",
      "created_at": "2026-01-08T10:30:00Z",
      "review": {...},
      "response": {...}
    }
  ]
}
\`\`\`

## PDF Reports

PDF exports include:
- Summary statistics
- Response by response details
- Formatted for printing
- Date range header

## Scheduled Exports

### Pro and Agency Plans

Set up automatic exports:
1. Go to Settings > Exports
2. Enable **Scheduled Exports**
3. Choose frequency (weekly/monthly)
4. Select format
5. Add email recipients

## Data Retention

### How Long Data is Kept

- All plans: 12 months of history
- Agency plan: Unlimited retention
- Deleted responses: 30-day recovery window

### Extending Retention

Agency plans can configure custom retention periods. Contact support for options.

## Privacy Considerations

Before sharing exports:
- Review for sensitive information
- Remove customer names if needed
- Comply with your privacy policy
- Consider data protection regulations

## Troubleshooting

### Export Not Downloading?

- Check popup blocker
- Try different browser
- Reduce date range for large exports

### Missing Data?

- Check filter settings
- Verify date range
- Ensure responses weren't deleted

### Format Issues?

- CSV: Use Excel or Google Sheets
- JSON: Use appropriate viewer
- PDF: Update PDF reader

## Need Help?

Contact support if you need:
- Custom export formats
- API access for data
- Large historical exports
- Data recovery

[Contact Support](/contact)
    `.trim(),
  },
];

export function getHelpArticle(slug: string): HelpArticle | undefined {
  return helpArticles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): HelpArticle[] {
  return helpArticles.filter((article) => article.categorySlug === categorySlug);
}

export function getAllHelpSlugs(): string[] {
  return helpArticles.map((article) => article.slug);
}

export function getHelpCategory(slug: string): HelpCategory | undefined {
  return helpCategories.find((category) => category.slug === slug);
}
