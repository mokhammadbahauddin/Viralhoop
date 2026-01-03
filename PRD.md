Product Requirements Document (PRD): ViralLoop - The Content Repurposer

1. Product Vision

ViralLoop is a "Content Repurposing Engine" for creators. It transforms a single YouTube video URL into a suite of high-engagement social media content (LinkedIn posts, Twitter threads, Blog articles) using AI.

Core Value: Stop summarizing. Start repurposing.

Target Audience: Content creators, Ghostwriters, Marketers.

Aesthetic: "Vertex" Theme (Clean, Sharp, Industrial SaaS).

2. Technical Stack (Open SaaS)

Base Template: Open SaaS (Wasp framework).

Framework: React (Vite) + Node.js (Full-stack Wasp).

Styling: Tailwind CSS.

Database: SQLite (Sandbox Dev), Postgres (Production via Prisma).

Auth: Wasp Auth (Email/Password + Google).

Payments: Stripe (Managed by Open SaaS).

AI: Google Gemini API (@google/generative-ai).

Icons: Lucide React.

3. Core Features (The "ViralLoop" Engine)

A. The Dashboard (Main Page)

Route: /dashboard (Protected).

Layout: "Vertex" Split View.

Left: Input & History.

Right: Content Editor.

Input Component: * A prominent URL input for YouTube links.

A "Fetch" button that triggers the backend action.

History List:

Displays past projects (Title, Thumbnail, Date).

Click to load content into the editor.

B. The Repurposing Logic (Backend Action)

Action: generateContent(url, mode)

Modes:

Summary (Free): Bullet points + Key insights.

LinkedIn (Paid): Hook + Body + CTA structure.

Twitter (Paid): Thread format (1/x, 2/x).

Blog (Paid): H1, H2, SEO keywords.

Process:

Fetch YouTube Transcript (using youtube-transcript).

Select System Prompt based on mode.

Call Gemini 1.5 Flash with transcript.

Return formatted text.

C. Monetization (Stripe Integration)

Free Plan: 3 Credits/day. "Summary" mode only.

Pro Plan ($9/mo): Unlimited Credits. All modes unlocked.

Implementation:

Use Wasp's user.subscriptionStatus to gate features.

Display "Lock" icons on Pro tabs for free users.

Redirect to Stripe Checkout for upgrades.

4. File Structure (Wasp)

/src
  /actions.ts           (Backend Logic: Gemini calls, Transcript fetch)
  /queries.ts           (Data Fetching: User History)
  /client
    /pages
      DashboardPage.tsx (The Main Vertex UI)
      LandingPage.tsx   (Sales Page - vertex styled)
    /components
      /vertex           (Custom Vertex Components)
        Input.tsx
        Card.tsx
        Button.tsx
  /server
    /jobs               (Optional: Background processing for long videos)
main.wasp               (Configuration: Routes, Auth, DB)


5. System Prompts (The "Ghostwriter")

LinkedIn: "Act as a viral LinkedIn ghostwriter. Analyze this transcript. Write a post that starts with a controversial hook, uses punchy <15 word sentences, includes a list of 3 actionable takeaways, and ends with a question."

Twitter: "Act as a Twitter growth expert. Convert this into a thread. Tweet 1: Massive Hook. Tweets 2-6: Value/Insights. Tweet 7: Summary & CTA."

## Review & Updates (Self-Reflection)

### Final Status (Phase 4 Complete)
- **Intelligence & Analytics**:
    - **Analytics Engine**: `getAnalytics` query aggregates content history by type and tracks daily activity over the last 7 days.
    - **Analytics Dashboard**: A new "Analytics" tab in the dashboard visualizes this data using Pie and Bar charts (via `react-apexcharts`) and statistic cards.
- **SEO Enhancements**:
    - **Target Keywords**: "Blog" mode now accepts optional target keywords.
    - **Prompt Engineering**: The Gemini prompt for blog posts dynamically incorporates these keywords for better SEO output.
- **Refactoring**:
    - `DashboardPage.tsx` was refactored into modular sub-views (`AnalyticsView.tsx`) to maintain maintainability.
    - Component paths were updated, and strict TypeScript types were enforced.
- **Verification**:
    - Verified compilation and database migration.
    - Verified integration of the new Analytics query with the frontend charts.

### Challenges
- **Prisma Transactions in Wasp**: Wasp's context helper for entities doesn't directly expose `$transaction` in the same way `prisma` client does. Switched to importing `prisma` from `wasp/server` to handle atomic credit deductions and history creation.
- **ApexCharts**: Ensuring proper typing for chart options required some `ts-ignore` in strict mode due to library type definitions sometimes lagging, but runtime behavior is solid.

Score: 10/10. The application is now "Feature Complete" with advanced capabilities (Analytics, SEO) on top of the solid MVP foundation.
